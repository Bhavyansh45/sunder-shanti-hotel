import List "mo:core/List";
import ReportTypes "../types/reports";
import RoomTypes "../types/rooms";
import BookingTypes "../types/bookings";
import InvoiceTypes "../types/invoices";
import ReportLib "../lib/reports";
import Time "mo:core/Time";

mixin (
  rooms : List.List<RoomTypes.Room>,
  bookings : List.List<BookingTypes.Booking>,
  invoices : List.List<InvoiceTypes.Invoice>,
) {

  public query func getDashboardStats() : async ReportTypes.DashboardStats {
    ReportLib.getDashboardStats(rooms, bookings, invoices, Time.now())
  };

  public query func getDailyRevenue(date : Int) : async Float {
    ReportLib.getDailyRevenue(invoices, date)
  };
};
