import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import UserTypes "../types/users";
import Principal "mo:core/Principal";

module {
  public type StaffUser = UserTypes.StaffUser;
  public type UserRole = UserTypes.UserRole;
  public type Result<T, E> = Common.Result<T, E>;

  public func getUsers(users : List.List<StaffUser>) : [StaffUser] {
    users.toArray()
  };

  public func addUser(
    users : List.List<StaffUser>,
    principal : Principal,
    name : Text,
    email : Text,
    role : UserRole,
  ) : Result<StaffUser, Text> {
    let exists = users.find(func(u) { Principal.equal(u.principal, principal) });
    switch (exists) {
      case (?_) { #err("User already exists") };
      case null {
        let user : StaffUser = {
          principal;
          name;
          email;
          role;
          isActive = true;
          createdAt = Time.now();
        };
        users.add(user);
        #ok(user)
      };
    }
  };

  public func updateUserRole(
    users : List.List<StaffUser>,
    principal : Principal,
    role : UserRole,
  ) : Result<(), Text> {
    let idx = users.findIndex(func(u) { Principal.equal(u.principal, principal) });
    switch (idx) {
      case null { #err("User not found") };
      case (?i) {
        let existing = users.at(i);
        users.put(i, { existing with role });
        #ok(())
      };
    }
  };

  public func deactivateUser(
    users : List.List<StaffUser>,
    principal : Principal,
  ) : Result<(), Text> {
    let idx = users.findIndex(func(u) { Principal.equal(u.principal, principal) });
    switch (idx) {
      case null { #err("User not found") };
      case (?i) {
        let existing = users.at(i);
        users.put(i, { existing with isActive = false });
        #ok(())
      };
    }
  };

  public func getUserRole(users : List.List<StaffUser>, principal : Principal) : ?UserRole {
    // Bootstrap: if no users exist, treat any caller as Admin for initial setup
    if (users.isEmpty()) {
      return ?#Admin
    };
    switch (users.find(func(u) { Principal.equal(u.principal, principal) })) {
      case (?u) if (u.isActive) ?u.role else null;
      case null null;
    }
  };

  public func isAdmin(users : List.List<StaffUser>, principal : Principal) : Bool {
    // Bootstrap: if no users exist, treat caller as Admin
    if (users.isEmpty()) {
      return true
    };
    switch (users.find(func(u) { Principal.equal(u.principal, principal) })) {
      case (?u) u.isActive and u.role == #Admin;
      case null false;
    }
  };
};
