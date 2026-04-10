import { j as jsxRuntimeExports, p as Badge, g as BookingStatus } from "./index-DkGMr7Y2.js";
const statusConfig = {
  [BookingStatus.Active]: {
    label: "Active",
    className: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
    dot: "bg-blue-500"
  },
  [BookingStatus.CheckedOut]: {
    label: "Checked Out",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100",
    dot: "bg-emerald-500"
  },
  [BookingStatus.Cancelled]: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
    dot: "bg-red-500"
  }
};
function BookingStatusBadge({
  status,
  className = ""
}) {
  const config = statusConfig[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: `font-medium text-xs ${config.className} ${className}`,
      "data-ocid": `booking-status-${status.toLowerCase()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${config.dot}`,
            "aria-hidden": "true"
          }
        ),
        config.label
      ]
    }
  );
}
export {
  BookingStatusBadge as B
};
