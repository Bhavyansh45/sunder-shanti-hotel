import { j as jsxRuntimeExports, p as Badge, R as RoomStatus } from "./index-DkGMr7Y2.js";
const statusConfig = {
  [RoomStatus.Available]: {
    label: "Available",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
  },
  [RoomStatus.Occupied]: {
    label: "Occupied",
    className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100"
  },
  [RoomStatus.Maintenance]: {
    label: "Maintenance",
    className: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100"
  }
};
function StatusBadge({ status, className = "" }) {
  const config = statusConfig[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: `font-medium text-xs ${config.className} ${className}`,
      "data-ocid": `room-status-${status.toLowerCase()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${status === RoomStatus.Available ? "bg-emerald-500" : status === RoomStatus.Occupied ? "bg-red-500" : "bg-amber-500"}`,
            "aria-hidden": "true"
          }
        ),
        config.label
      ]
    }
  );
}
export {
  StatusBadge as S
};
