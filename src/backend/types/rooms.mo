import Common "common";

module {
  public type RoomStatus = {
    #Available;
    #Occupied;
    #Maintenance;
  };

  public type RoomType = {
    #Single;
    #Double;
    #Deluxe;
    #AcSingle;
    #AcDouble;
    #AcDeluxe;
  };

  public type Room = {
    id : Nat;
    number : Text;
    roomType : RoomType;
    pricePerDay : Float;
    status : RoomStatus;
    createdAt : Common.Timestamp;
  };
};
