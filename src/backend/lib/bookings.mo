import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import BookingTypes "../types/bookings";
import RoomTypes "../types/rooms";

module {
  public type Booking = BookingTypes.Booking;
  public type BookingStatus = BookingTypes.BookingStatus;
  public type Result<T, E> = Common.Result<T, E>;

  public func getBookings(bookings : List.List<Booking>, status : ?BookingStatus) : [Booking] {
    switch (status) {
      case null { bookings.toArray() };
      case (?s) {
        bookings.filter(func(b) { b.status == s }).toArray()
      };
    }
  };

  public func getBookingById(bookings : List.List<Booking>, id : Nat) : ?Booking {
    bookings.find(func(b) { b.id == id })
  };

  public func getActiveBookings(bookings : List.List<Booking>) : [Booking] {
    bookings.filter(func(b) { b.status == #Active }).toArray()
  };

  public func createBooking(
    bookings : List.List<Booking>,
    rooms : List.List<RoomTypes.Room>,
    nextId : Nat,
    guestName : Text,
    guestPhone : Text,
    guestIdProof : ?Text,
    roomId : Nat,
    checkInDate : Int,
    expectedCheckOutDate : Int,
    advancePayment : Float,
    caller : Principal,
  ) : Result<Booking, Text> {
    // Find room and check availability
    let roomOpt = rooms.find(func(r) { r.id == roomId });
    switch (roomOpt) {
      case null { #err("Room not found") };
      case (?room) {
        if (room.status != #Available) {
          return #err("Room is not available")
        };
        let booking : Booking = {
          id = nextId;
          guestName;
          guestPhone;
          guestIdProof;
          roomId;
          checkInDate;
          expectedCheckOutDate;
          actualCheckOutDate = null;
          pricePerDay = room.pricePerDay;
          advancePayment;
          status = #Active;
          createdAt = Time.now();
          createdBy = caller;
        };
        bookings.add(booking);
        #ok(booking)
      };
    }
  };

  public func updateBooking(
    bookings : List.List<Booking>,
    id : Nat,
    expectedCheckOutDate : ?Int,
    advancePayment : ?Float,
  ) : Result<Booking, Text> {
    let idx = bookings.findIndex(func(b) { b.id == id });
    switch (idx) {
      case null { #err("Booking not found") };
      case (?i) {
        let existing = bookings.at(i);
        let updated : Booking = {
          existing with
          expectedCheckOutDate = switch (expectedCheckOutDate) {
            case (?d) d;
            case null existing.expectedCheckOutDate;
          };
          advancePayment = switch (advancePayment) {
            case (?a) a;
            case null existing.advancePayment;
          };
        };
        bookings.put(i, updated);
        #ok(updated)
      };
    }
  };

  public func cancelBooking(
    bookings : List.List<Booking>,
    rooms : List.List<RoomTypes.Room>,
    id : Nat,
  ) : Result<(), Text> {
    let idx = bookings.findIndex(func(b) { b.id == id });
    switch (idx) {
      case null { #err("Booking not found") };
      case (?i) {
        let existing = bookings.at(i);
        if (existing.status != #Active) {
          return #err("Booking is not active")
        };
        bookings.put(i, { existing with status = #Cancelled });
        // Set room back to available
        let roomIdx = rooms.findIndex(func(r) { r.id == existing.roomId });
        switch (roomIdx) {
          case null {};
          case (?ri) {
            let room = rooms.at(ri);
            rooms.put(ri, { room with status = #Available });
          };
        };
        #ok(())
      };
    }
  };

  public func getBookingHistory(
    bookings : List.List<Booking>,
    startDate : ?Int,
    endDate : ?Int,
  ) : [Booking] {
    bookings.filter(func(b) {
      let afterStart = switch (startDate) {
        case null true;
        case (?s) b.checkInDate >= s;
      };
      let beforeEnd = switch (endDate) {
        case null true;
        case (?e) b.checkInDate <= e;
      };
      afterStart and beforeEnd
    }).toArray()
  };
};
