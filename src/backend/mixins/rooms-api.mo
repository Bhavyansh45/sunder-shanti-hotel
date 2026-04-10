import List "mo:core/List";
import RoomTypes "../types/rooms";
import RoomLib "../lib/rooms";

mixin (
  rooms : List.List<RoomTypes.Room>,
  nextRoomId : Nat,
) {

  public query func getRooms() : async [RoomTypes.Room] {
    RoomLib.getRooms(rooms)
  };

  public query func getRoomById(id : Nat) : async ?RoomTypes.Room {
    RoomLib.getRoomById(rooms, id)
  };

  public query func getAvailableRooms() : async [RoomTypes.Room] {
    RoomLib.getAvailableRooms(rooms)
  };

  public shared func addRoom(
    number : Text,
    roomType : RoomTypes.RoomType,
    pricePerDay : Float,
  ) : async RoomLib.Result<RoomTypes.Room, Text> {
    RoomLib.addRoom(rooms, nextRoomId, number, roomType, pricePerDay)
  };

  public shared func updateRoom(
    id : Nat,
    number : ?Text,
    roomType : ?RoomTypes.RoomType,
    pricePerDay : ?Float,
    status : ?RoomTypes.RoomStatus,
  ) : async RoomLib.Result<RoomTypes.Room, Text> {
    RoomLib.updateRoom(rooms, id, number, roomType, pricePerDay, status)
  };

  public shared func deleteRoom(id : Nat) : async RoomLib.Result<(), Text> {
    RoomLib.deleteRoom(rooms, id)
  };
};
