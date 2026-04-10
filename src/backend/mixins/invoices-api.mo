import List "mo:core/List";
import InvoiceTypes "../types/invoices";
import BookingTypes "../types/bookings";
import RoomTypes "../types/rooms";
import InvoiceLib "../lib/invoices";

mixin (
  invoices : List.List<InvoiceTypes.Invoice>,
  bookings : List.List<BookingTypes.Booking>,
  rooms : List.List<RoomTypes.Room>,
  nextInvoiceId : Nat,
) {

  public shared func checkout(
    bookingId : Nat,
    actualCheckOutDate : Int,
    extraCharges : Float,
    discount : Float,
    paymentMethod : InvoiceTypes.PaymentMethod,
    amountPaid : Float,
  ) : async InvoiceLib.Result<InvoiceTypes.Invoice, Text> {
    InvoiceLib.checkout(
      bookings, rooms, invoices, nextInvoiceId,
      bookingId, actualCheckOutDate,
      extraCharges, discount, paymentMethod, amountPaid,
    )
  };

  public query func getInvoice(bookingId : Nat) : async ?InvoiceTypes.Invoice {
    InvoiceLib.getInvoice(invoices, bookingId)
  };

  public query func getInvoices() : async [InvoiceTypes.Invoice] {
    InvoiceLib.getInvoices(invoices)
  };

  public query func getInvoicesByDateRange(
    startDate : Int,
    endDate : Int,
  ) : async [InvoiceTypes.Invoice] {
    InvoiceLib.getInvoicesByDateRange(invoices, startDate, endDate)
  };

  public query func getPendingInvoices() : async [InvoiceTypes.Invoice] {
    InvoiceLib.getPendingInvoices(invoices)
  };
};
