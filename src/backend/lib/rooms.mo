import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import RoomTypes "../types/rooms";

module {
  public type Room = RoomTypes.Room;
  public type RoomStatus = RoomTypes.RoomStatus;
  public type RoomType = RoomTypes.RoomType;
  public type Result<T, E> = Common.Result<T, E>;

  public func getRooms(rooms : List.List<Room>) : [Room] {
    rooms.toArray()
  };

  public func getRoomById(rooms : List.List<Room>, id : Nat) : ?Room {
    rooms.find(func(r) { r.id == id })
  };

  public func getAvailableRooms(rooms : List.List<Room>) : [Room] {
    rooms.filter(func(r) { r.status == #Available }).toArray()
  };

  public func addRoom(
    rooms : List.List<Room>,
    nextId : Nat,
    number : Text,
    roomType : RoomType,
    pricePerDay : Float,
  ) : Result<Room, Text> {
    let exists = rooms.find(func(r) { r.number == number });
    switch (exists) {
      case (?_) { #err("Room number already exists") };
      case null {
        let room : Room = {
          id = nextId;
          number;
          roomType;
          pricePerDay;
          status = #Available;
          createdAt = Time.now();
        };
        rooms.add(room);
        #ok(room)
      };
    }
  };

  public func updateRoom(
    rooms : List.List<Room>,
    id : Nat,
    number : ?Text,
    roomType : ?RoomType,
    pricePerDay : ?Float,
    status : ?RoomStatus,
  ) : Result<Room, Text> {
    let idx = rooms.findIndex(func(r) { r.id == id });
    switch (idx) {
      case null { #err("Room not found") };
      case (?i) {
        let existing = rooms.at(i);
        let updated : Room = {
          existing with
          number = switch (number) { case (?n) n; case null existing.number };
          roomType = switch (roomType) { case (?t) t; case null existing.roomType };
          pricePerDay = switch (pricePerDay) { case (?p) p; case null existing.pricePerDay };
          status = switch (status) { case (?s) s; case null existing.status };
        };
        rooms.put(i, updated);
        #ok(updated)
      };
    }
  };

  public func deleteRoom(rooms : List.List<Room>, id : Nat) : Result<(), Text> {
    let idx = rooms.findIndex(func(r) { r.id == id });
    switch (idx) {
      case null { #err("Room not found") };
      case (?i) {
        let existing = rooms.at(i);
        if (existing.status == #Occupied) {
          #err("Cannot delete an occupied room")
        } else {
          let filtered = rooms.filter(func(r) { r.id != id });
          rooms.clear();
          rooms.append(filtered);
          #ok(())
        }
      };
    }
  };

  public func updateRoomStatus(rooms : List.List<Room>, id : Nat, status : RoomStatus) {
    let idx = rooms.findIndex(func(r) { r.id == id });
    switch (idx) {
      case null {};
      case (?i) {
        let existing = rooms.at(i);
        rooms.put(i, { existing with status });
      };
    }
  };
};
