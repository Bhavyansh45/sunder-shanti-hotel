import Common "common";

module {
  public type UserRole = {
    #Admin;
    #Staff;
  };

  public type StaffUser = {
    principal : Common.UserId;
    name : Text;
    email : Text;
    role : UserRole;
    isActive : Bool;
    createdAt : Common.Timestamp;
  };
};
