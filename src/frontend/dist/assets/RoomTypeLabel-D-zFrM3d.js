import { j as jsxRuntimeExports, i as RoomType } from "./index-DkGMr7Y2.js";
const roomTypeLabels = {
  [RoomType.Single]: "Single",
  [RoomType.Double]: "Double",
  [RoomType.Deluxe]: "Deluxe",
  [RoomType.AcSingle]: "AC Single",
  [RoomType.AcDouble]: "AC Double",
  [RoomType.AcDeluxe]: "AC Deluxe"
};
function RoomTypeLabel({ type, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className, children: roomTypeLabels[type] });
}
const ALL_ROOM_TYPES = Object.entries(roomTypeLabels).map(
  ([value, label]) => ({
    value,
    label
  })
);
export {
  ALL_ROOM_TYPES as A,
  RoomTypeLabel as R
};
