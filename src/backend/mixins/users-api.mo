import List "mo:core/List";
import UserTypes "../types/users";
import UserLib "../lib/users";

mixin (users : List.List<UserTypes.StaffUser>) {

  public query func getUsers() : async [UserTypes.StaffUser] {
    UserLib.getUsers(users)
  };

  public shared ({ caller }) func addUser(
    principal : Principal,
    name : Text,
    email : Text,
    role : UserTypes.UserRole,
  ) : async UserLib.Result<UserTypes.StaffUser, Text> {
    if (not UserLib.isAdmin(users, caller)) return #err("Unauthorized");
    UserLib.addUser(users, principal, name, email, role)
  };

  public shared ({ caller }) func updateUserRole(
    principal : Principal,
    role : UserTypes.UserRole,
  ) : async UserLib.Result<(), Text> {
    if (not UserLib.isAdmin(users, caller)) return #err("Unauthorized");
    UserLib.updateUserRole(users, principal, role)
  };

  public shared ({ caller }) func deactivateUser(principal : Principal) : async UserLib.Result<(), Text> {
    if (not UserLib.isAdmin(users, caller)) return #err("Unauthorized");
    UserLib.deactivateUser(users, principal)
  };

  public query func getUserRole(principal : Principal) : async ?UserTypes.UserRole {
    UserLib.getUserRole(users, principal)
  };

  public query func isAdmin(principal : Principal) : async Bool {
    UserLib.isAdmin(users, principal)
  };
};
