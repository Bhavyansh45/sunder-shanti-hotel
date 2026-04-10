import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Common "../types/common";
import InvoiceTypes "../types/invoices";
import BookingTypes "../types/bookings";
import RoomTypes "../types/rooms";

module {
  public type Invoice = InvoiceTypes.Invoice;
  public type PaymentMethod = InvoiceTypes.PaymentMethod;
  public type PaymentStatus = InvoiceTypes.PaymentStatus;
  public type Result<T, E> = Common.Result<T, E>;

  public func checkout(
    bookings : List.List<BookingTypes.Booking>,
    rooms : List.List<RoomTypes.Room>,
    invoices : List.List<Invoice>,
    nextInvoiceId : Nat,
    bookingId : Nat,
    actualCheckOutDate : Int,
    extraCharges : Float,
    discount : Float,
    paymentMethod : PaymentMethod,
    amountPaid : Float,
  ) : Result<Invoice, Text> {
    let bookingIdx = bookings.findIndex(func(b) { b.id == bookingId });
    switch (bookingIdx) {
      case null { #err("Booking not found") };
      case (?bi) {
        let booking = bookings.at(bi);
        if (booking.status != #Active) {
          return #err("Booking is not active")
        };

        // Calculate days stayed (nanoseconds -> days, minimum 1)
        let durationNs : Int = actualCheckOutDate - booking.checkInDate;
        let nsPerDay : Int = 86400 * 1_000_000_000;
        let daysInt : Int = if (durationNs <= 0) 1 else {
          let d = durationNs / nsPerDay;
          if (d < 1) 1 else d
        };
        let days : Float = daysInt.toFloat();

        let roomCharges : Float = days * booking.pricePerDay;
        // discount is a percentage
        let totalBeforeDiscount : Float = roomCharges + extraCharges;
        let discountAmount : Float = totalBeforeDiscount * (discount / 100.0);
        let totalAmount : Float = totalBeforeDiscount - discountAmount;
        let dueAmount : Float = totalAmount - booking.advancePayment - amountPaid;

        let paymentStatus : PaymentStatus = if (dueAmount <= 0.0) {
          #Paid
        } else if (booking.advancePayment + amountPaid > 0.0) {
          #PartiallyPaid
        } else {
          #Pending
        };

        // Update booking: set actualCheckOutDate and status
        bookings.put(bi, {
          booking with
          actualCheckOutDate = ?actualCheckOutDate;
          status = #CheckedOut;
        });

        // Set room back to Available
        let roomIdx = rooms.findIndex(func(r) { r.id == booking.roomId });
        switch (roomIdx) {
          case null {};
          case (?ri) {
            let room = rooms.at(ri);
            rooms.put(ri, { room with status = #Available });
          };
        };

        let invoice : Invoice = {
          id = nextInvoiceId;
          bookingId;
          roomCharges;
          extraCharges;
          discount;
          advancePaid = booking.advancePayment;
          totalAmount;
          dueAmount;
          paymentMethod = ?paymentMethod;
          paymentStatus;
          createdAt = Time.now();
        };
        invoices.add(invoice);
        #ok(invoice)
      };
    }
  };

  public func getInvoice(invoices : List.List<Invoice>, bookingId : Nat) : ?Invoice {
    invoices.find(func(inv) { inv.bookingId == bookingId })
  };

  public func getInvoices(invoices : List.List<Invoice>) : [Invoice] {
    invoices.toArray()
  };

  public func getInvoicesByDateRange(
    invoices : List.List<Invoice>,
    startDate : Int,
    endDate : Int,
  ) : [Invoice] {
    invoices.filter(func(inv) {
      inv.createdAt >= startDate and inv.createdAt <= endDate
    }).toArray()
  };

  public func getPendingInvoices(invoices : List.List<Invoice>) : [Invoice] {
    invoices.filter(func(inv) { inv.paymentStatus != #Paid }).toArray()
  };
};
