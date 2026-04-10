import { RoomType } from "../../backend";

interface RoomTypeLabelProps {
  type: RoomType;
  className?: string;
}

const roomTypeLabels: Record<RoomType, string> = {
  [RoomType.Single]: "Single",
  [RoomType.Double]: "Double",
  [RoomType.Deluxe]: "Deluxe",
  [RoomType.AcSingle]: "AC Single",
  [RoomType.AcDouble]: "AC Double",
  [RoomType.AcDeluxe]: "AC Deluxe",
};

export function RoomTypeLabel({ type, className = "" }: RoomTypeLabelProps) {
  return <span className={className}>{roomTypeLabels[type]}</span>;
}

export function getRoomTypeLabel(type: RoomType): string {
  return roomTypeLabels[type];
}

export const ALL_ROOM_TYPES = Object.entries(roomTypeLabels).map(
  ([value, label]) => ({
    value: value as RoomType,
    label,
  }),
);
