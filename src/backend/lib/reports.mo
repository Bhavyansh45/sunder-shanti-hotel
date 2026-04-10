import List "mo:core/List";
import ReportTypes "../types/reports";
import RoomTypes "../types/rooms";
import BookingTypes "../types/bookings";
import InvoiceTypes "../types/invoices";

module {
  public type DashboardStats = ReportTypes.DashboardStats;
  public type OccupancyReport = ReportTypes.OccupancyReport;

  // One day in nanoseconds (86400 * 1_000_000_000)
  let dayNs : Int = 86_400_000_000_000;

  public func getDashboardStats(
    rooms : List.List<RoomTypes.Room>,
    bookings : List.List<BookingTypes.Booking>,
    invoices : List.List<InvoiceTypes.Invoice>,
    now : Int,
  ) : DashboardStats {
    let todayStart : Int = (now / dayNs) * dayNs;
    let todayEnd : Int = todayStart + dayNs;

    let totalRooms = rooms.size();
    let availableRooms = rooms.filter(func(r) { r.status == #Available }).size();
    let occupiedRooms = rooms.filter(func(r) { r.status == #Occupied }).size();
    let maintenanceRooms = rooms.filter(func(r) { r.status == #Maintenance }).size();

    let todayCheckIns = bookings.filter(func(b) {
      b.checkInDate >= todayStart and b.checkInDate < todayEnd
    }).size();

    let todayRevenue = invoices.foldLeft(
      0.0,
      func(acc : Float, inv : InvoiceTypes.Invoice) : Float {
        if (inv.createdAt >= todayStart and inv.createdAt < todayEnd) {
          acc + inv.totalAmount
        } else {
          acc
        }
      },
    );

    {
      totalRooms;
      availableRooms;
      occupiedRooms;
      maintenanceRooms;
      todayCheckIns;
      todayRevenue;
    }
  };

  public func getDailyRevenue(
    invoices : List.List<InvoiceTypes.Invoice>,
    date : Int,
  ) : Float {
    let dayStart : Int = (date / dayNs) * dayNs;
    let dayEnd : Int = dayStart + dayNs;
    invoices.foldLeft(
      0.0,
      func(acc : Float, inv : InvoiceTypes.Invoice) : Float {
        if (inv.createdAt >= dayStart and inv.createdAt < dayEnd) {
          acc + inv.totalAmount
        } else {
          acc
        }
      },
    )
  };
};
