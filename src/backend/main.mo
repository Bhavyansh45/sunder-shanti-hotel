import List "mo:core/List";
import Time "mo:core/Time";
import RoomTypes "types/rooms";
import BookingTypes "types/bookings";
import InvoiceTypes "types/invoices";
import UserTypes "types/users";
import ReportTypes "types/reports";
import RoomLib "lib/rooms";
import BookingLib "lib/bookings";
import InvoiceLib "lib/invoices";
import UserLib "lib/users";
import ReportLib "lib/reports";

actor {
  let rooms = List.empty<RoomTypes.Room>();
  let bookings = List.empty<BookingTypes.Booking>();
  let invoices = List.empty<InvoiceTypes.Invoice>();
  let users = List.empty<UserTypes.StaffUser>();
  var nextRoomId : Nat = 1;
  var nextBookingId : Nat = 1;
  var nextInvoiceId : Nat = 1;

  // ── Rooms ──────────────────────────────────────────────────────────────

  public query func getRooms() : async [RoomTypes.Room] {
    RoomLib.getRooms(rooms)
  };

  public query func getRoomById(id : Nat) : async ?RoomTypes.Room {
    RoomLib.getRoomById(rooms, id)
  };

  public query func getAvailableRooms() : async [RoomTypes.Room] {
    RoomLib.getAvailableRooms(rooms)
  };

  public shared ({ caller }) func addRoom(
    number : Text,
    roomType : RoomTypes.RoomType,
    pricePerDay : Float,
  ) : async RoomLib.Result<RoomTypes.Room, Text> {
    if (not UserLib.isAdmin(users, caller)) return #err("Unauthorized");
    let result = RoomLib.addRoom(rooms, nextRoomId, number, roomType, pricePerDay);
    switch (result) {
      case (#ok(_)) { nextRoomId += 1 };
      case (#err(_)) {};
    };
    result
  };

  public shared ({ caller }) func updateRoom(
    id : Nat,
    number : ?Text,
    roomType : ?RoomTypes.RoomType,
    pricePerDay : ?Float,
    status : ?RoomTypes.RoomStatus,
  ) : async RoomLib.Result<RoomTypes.Room, Text> {
    if (not UserLib.isAdmin(users, caller)) return #err("Unauthorized");
    RoomLib.updateRoom(rooms, id, number, roomType, pricePerDay, status)
  };

  public shared ({ caller }) func deleteRoom(id : Nat) : async RoomLib.Result<(), Text> {
    if (not UserLib.isAdmin(users, caller)) return #err("Unauthorized");
    RoomLib.deleteRoom(rooms, id)
  };

  // ── Bookings ───────────────────────────────────────────────────────────

  public query func getBookings(status : ?BookingTypes.BookingStatus) : async [BookingTypes.Booking] {
    BookingLib.getBookings(bookings, status)
  };

  public query func getBookingById(id : Nat) : async ?BookingTypes.Booking {
    BookingLib.getBookingById(bookings, id)
  };

  public query func getActiveBookings() : async [BookingTypes.Booking] {
    BookingLib.getActiveBookings(bookings)
  };

  public shared ({ caller }) func createBooking(
    guestName : Text,
    guestPhone : Text,
    guestIdProof : ?Text,
    roomId : Nat,
    checkInDate : Int,
    expectedCheckOutDate : Int,
    advancePayment : Float,
  ) : async BookingLib.Result<BookingTypes.Booking, Text> {
    let result = BookingLib.createBooking(
      bookings, rooms, nextBookingId,
      guestName, guestPhone, guestIdProof,
      roomId, checkInDate, expectedCheckOutDate,
      advancePayment, caller,
    );
    switch (result) {
      case (#ok(_)) {
        nextBookingId += 1;
        // Mark room as Occupied
        RoomLib.updateRoomStatus(rooms, roomId, #Occupied);
      };
      case (#err(_)) {};
    };
    result
  };

  public shared func updateBooking(
    id : Nat,
    expectedCheckOutDate : ?Int,
    advancePayment : ?Float,
  ) : async BookingLib.Result<BookingTypes.Booking, Text> {
    BookingLib.updateBooking(bookings, id, expectedCheckOutDate, advancePayment)
  };

  public shared func cancelBooking(id : Nat, reason : Text) : async BookingLib.Result<(), Text> {
    let _ = reason; // reason stored in booking status narrative — kept for API compatibility
    BookingLib.cancelBooking(bookings, rooms, id)
  };

  public query func getBookingHistory(startDate : ?Int, endDate : ?Int) : async [BookingTypes.Booking] {
    BookingLib.getBookingHistory(bookings, startDate, endDate)
  };

  // ── Checkout & Invoices ────────────────────────────────────────────────

  public shared func checkout(
    bookingId : Nat,
    actualCheckOutDate : Int,
    extraCharges : Float,
    discount : Float,
    paymentMethod : InvoiceTypes.PaymentMethod,
    amountPaid : Float,
  ) : async InvoiceLib.Result<InvoiceTypes.Invoice, Text> {
    let result = InvoiceLib.checkout(
      bookings, rooms, invoices, nextInvoiceId,
      bookingId, actualCheckOutDate,
      extraCharges, discount, paymentMethod, amountPaid,
    );
    switch (result) {
      case (#ok(_)) { nextInvoiceId += 1 };
      case (#err(_)) {};
    };
    result
  };

  public query func getInvoice(bookingId : Nat) : async ?InvoiceTypes.Invoice {
    InvoiceLib.getInvoice(invoices, bookingId)
  };

  public query func getInvoices() : async [InvoiceTypes.Invoice] {
    InvoiceLib.getInvoices(invoices)
  };

  public query func getInvoicesByDateRange(startDate : Int, endDate : Int) : async [InvoiceTypes.Invoice] {
    InvoiceLib.getInvoicesByDateRange(invoices, startDate, endDate)
  };

  public query func getPendingInvoices() : async [InvoiceTypes.Invoice] {
    InvoiceLib.getPendingInvoices(invoices)
  };

  // ── Reports ────────────────────────────────────────────────────────────

  public query func getDashboardStats() : async ReportTypes.DashboardStats {
    ReportLib.getDashboardStats(rooms, bookings, invoices, Time.now())
  };

  public query func getDailyRevenue(date : Int) : async Float {
    ReportLib.getDailyRevenue(invoices, date)
  };

  // ── Users ──────────────────────────────────────────────────────────────

  public query func getUsers() : async [UserTypes.StaffUser] {
    UserLib.getUsers(users)
  };

  public shared ({ caller }) func addUser(
    principal : Principal,
    name : Text,
    email : Text,
    role : UserTypes.UserRole,
  ) : async UserLib.Result<UserTypes.StaffUser, Text> {
    if (not UserLib.isAdmin(users, caller)) return #err("Unauthorized");
    UserLib.addUser(users, principal, name, email, role)
  };

  public shared ({ caller }) func updateUserRole(
    principal : Principal,
    role : UserTypes.UserRole,
  ) : async UserLib.Result<(), Text> {
    if (not UserLib.isAdmin(users, caller)) return #err("Unauthorized");
    UserLib.updateUserRole(users, principal, role)
  };

  public shared ({ caller }) func deactivateUser(principal : Principal) : async UserLib.Result<(), Text> {
    if (not UserLib.isAdmin(users, caller)) return #err("Unauthorized");
    UserLib.deactivateUser(users, principal)
  };

  public query func getUserRole(principal : Principal) : async ?UserTypes.UserRole {
    UserLib.getUserRole(users, principal)
  };

  public query func isAdminQuery(principal : Principal) : async Bool {
    UserLib.isAdmin(users, principal)
  };
};
