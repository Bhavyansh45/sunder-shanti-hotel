module {
  public type PaymentMethod = {
    #Cash;
    #UPI;
  };

  public type PaymentStatus = {
    #Paid;
    #PartiallyPaid;
    #Pending;
  };

  public type Invoice = {
    id : Nat;
    bookingId : Nat;
    roomCharges : Float;
    extraCharges : Float;
    discount : Float;
    advancePaid : Float;
    totalAmount : Float;
    dueAmount : Float;
    paymentMethod : ?PaymentMethod;
    paymentStatus : PaymentStatus;
    createdAt : Int;
  };
};
