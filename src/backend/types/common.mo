module {
  public type Timestamp = Int;
  public type UserId = Principal;

  public type Result<T, E> = { #ok : T; #err : E };
};
