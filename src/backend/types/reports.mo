module {
  public type DashboardStats = {
    totalRooms : Nat;
    availableRooms : Nat;
    occupiedRooms : Nat;
    maintenanceRooms : Nat;
    todayCheckIns : Nat;
    todayRevenue : Float;
  };

  public type OccupancyReport = {
    date : Text;
    totalRooms : Nat;
    occupiedRooms : Nat;
    occupancyPercent : Float;
    revenue : Float;
  };
};
