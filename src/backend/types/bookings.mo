import Common "common";

module {
  public type BookingStatus = {
    #Active;
    #CheckedOut;
    #Cancelled;
  };

  public type Booking = {
    id : Nat;
    guestName : Text;
    guestPhone : Text;
    guestIdProof : ?Text;
    roomId : Nat;
    checkInDate : Common.Timestamp;
    expectedCheckOutDate : Common.Timestamp;
    actualCheckOutDate : ?Common.Timestamp;
    pricePerDay : Float;
    advancePayment : Float;
    status : BookingStatus;
    createdAt : Common.Timestamp;
    createdBy : Common.UserId;
  };
};
