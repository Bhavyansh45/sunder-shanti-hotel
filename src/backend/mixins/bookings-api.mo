import List "mo:core/List";
import BookingTypes "../types/bookings";
import RoomTypes "../types/rooms";
import BookingLib "../lib/bookings";

mixin (
  bookings : List.List<BookingTypes.Booking>,
  rooms : List.List<RoomTypes.Room>,
  nextBookingId : Nat,
) {

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
    BookingLib.createBooking(
      bookings, rooms, nextBookingId,
      guestName, guestPhone, guestIdProof,
      roomId, checkInDate, expectedCheckOutDate,
      advancePayment, caller,
    )
  };

  public shared func updateBooking(
    id : Nat,
    expectedCheckOutDate : ?Int,
    advancePayment : ?Float,
  ) : async BookingLib.Result<BookingTypes.Booking, Text> {
    BookingLib.updateBooking(bookings, id, expectedCheckOutDate, advancePayment)
  };

  public shared func cancelBooking(id : Nat, reason : Text) : async BookingLib.Result<(), Text> {
    let _ = reason;
    BookingLib.cancelBooking(bookings, rooms, id)
  };

  public query func getBookingHistory(
    startDate : ?Int,
    endDate : ?Int,
  ) : async [BookingTypes.Booking] {
    BookingLib.getBookingHistory(bookings, startDate, endDate)
  };
};
