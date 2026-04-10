import { c as createLucideIcon, a as useNavigate, d as useDashboardStats, e as useRooms, f as useActiveBookings, g as BookingStatus, j as jsxRuntimeExports, h as BedDouble, C as CalendarCheck, R as RoomStatus, i as RoomType } from "./index-DkGMr7Y2.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card--EfZ0PrJ.js";
import { P as PageHeader, S as Skeleton } from "./PageHeader-DWaItQZG.js";
import { C as CurrencyDisplay } from "./CurrencyDisplay-JCQ6x6JQ.js";
import { E as EmptyState } from "./EmptyState-ZjNAd_UQ.js";
import { S as StatusBadge } from "./StatusBadge-C6WwwJE-.js";
import { I as IndianRupee } from "./indian-rupee-Bkde-BqG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m14 14-4 4", key: "rymu2i" }],
  ["path", { d: "m10 14 4 4", key: "3sz06r" }]
];
const CalendarX = createLucideIcon("calendar-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M11 20H2", key: "nlcfvz" }],
  [
    "path",
    {
      d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
      key: "au4z13"
    }
  ],
  ["path", { d: "M11 4H8a2 2 0 0 0-2 2v14", key: "74r1mk" }],
  ["path", { d: "M14 12h.01", key: "1jfl7z" }],
  ["path", { d: "M22 20h-3", key: "vhrsz" }]
];
const DoorOpen = createLucideIcon("door-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi"
    }
  ]
];
const Wrench = createLucideIcon("wrench", __iconNode);
function formatRoomType(type) {
  const labels = {
    [RoomType.Single]: "Single",
    [RoomType.Double]: "Double",
    [RoomType.Deluxe]: "Deluxe",
    [RoomType.AcSingle]: "AC Single",
    [RoomType.AcDouble]: "AC Double",
    [RoomType.AcDeluxe]: "AC Deluxe"
  };
  return labels[type] ?? type;
}
function toDate(ts) {
  return new Date(Number(ts) / 1e6);
}
function isToday(ts) {
  const d = toDate(ts);
  const now = /* @__PURE__ */ new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
}
function isTodayOrTomorrow(ts) {
  const d = toDate(ts);
  const now = /* @__PURE__ */ new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  return sameDay(d, now) || sameDay(d, tomorrow);
}
function diffDays(a, b) {
  return Math.round(Math.abs(Number(b) - Number(a)) / (1e6 * 864e5));
}
function formatTime(ts) {
  return toDate(ts).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatDate(ts) {
  return toDate(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
  });
}
const accentStyles = {
  green: "bg-emerald-50 border-emerald-200 text-emerald-700",
  red: "bg-red-50 border-red-200 text-red-700",
  amber: "bg-amber-50 border-amber-200 text-amber-700",
  gold: "bg-yellow-50 border-yellow-200 text-yellow-700",
  blue: "bg-sky-50 border-sky-200 text-sky-700",
  default: "bg-muted border-border text-muted-foreground"
};
function MetricCard({
  label,
  value,
  icon,
  accent = "default",
  loading,
  dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "relative overflow-hidden shadow-subtle hover:shadow-elevated transition-smooth",
      "data-ocid": dataOcid ?? "metric-card",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2", children: label }),
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-foreground tabular-nums", children: value })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border ${accentStyles[accent]}`,
            children: icon
          }
        )
      ] }) })
    }
  );
}
const roomBorderAccent = {
  [RoomStatus.Available]: "border-l-4 border-l-emerald-400",
  [RoomStatus.Occupied]: "border-l-4 border-l-red-400",
  [RoomStatus.Maintenance]: "border-l-4 border-l-amber-400"
};
function RoomCard({ room, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: `w-full text-left bg-card border border-border rounded-lg p-3 hover:shadow-elevated transition-smooth cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${roomBorderAccent[room.status]}`,
      "data-ocid": `room-card-${room.number}`,
      "aria-label": `Room ${room.number}, ${formatRoomType(room.roomType)}, ${room.status}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-foreground", children: [
            "#",
            room.number
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: room.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatRoomType(room.roomType) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-foreground mt-0.5", children: [
          "₹",
          room.pricePerDay.toLocaleString("en-IN"),
          "/day"
        ] })
      ]
    }
  );
}
function CheckInRow({ booking, roomMap, onClick }) {
  const room = roomMap.get(booking.roomId.toString());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border last:border-0 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-ring",
      "data-ocid": `checkin-row-${booking.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: booking.guestName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: room ? `Room ${room.number} · ${formatRoomType(room.roomType)}` : `Room ID ${booking.roomId}` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: formatTime(booking.checkInDate) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Check-in" })
        ] })
      ]
    }
  );
}
function CheckoutRow({ booking, roomMap, onClick }) {
  const room = roomMap.get(booking.roomId.toString());
  const days = diffDays(booking.checkInDate, booking.expectedCheckOutDate);
  const isToday_ = isToday(booking.expectedCheckOutDate);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border last:border-0 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-ring",
      "data-ocid": `checkout-row-${booking.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isToday_ ? "bg-red-100" : "bg-amber-100"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CalendarX,
              {
                className: `w-4 h-4 ${isToday_ ? "text-red-600" : "text-amber-600"}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: booking.guestName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            room ? `Room ${room.number}` : `Room ID ${booking.roomId}`,
            " · ",
            days,
            " ",
            "night",
            days !== 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-xs font-semibold ${isToday_ ? "text-red-600" : "text-amber-600"}`,
              children: isToday_ ? "Today" : "Tomorrow"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(booking.expectedCheckOutDate) })
        ] })
      ]
    }
  );
}
function SectionLink({
  label,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:underline",
      children: [
        label,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
      ]
    }
  );
}
function DashboardPage() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: rooms = [], isLoading: roomsLoading } = useRooms();
  const { data: activeBookings = [], isLoading: bookingsLoading } = useActiveBookings();
  const roomMap = new Map(rooms.map((r) => [r.id.toString(), r]));
  const todayCheckIns = activeBookings.filter(
    (b) => b.status === BookingStatus.Active && isToday(b.checkInDate)
  );
  const upcomingCheckouts = activeBookings.filter(
    (b) => b.status === BookingStatus.Active && isTodayOrTomorrow(b.expectedCheckOutDate)
  );
  const displayRooms = rooms.slice(0, 20);
  const hasMoreRooms = rooms.length > 20;
  const typedStats = stats;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full", "data-ocid": "dashboard-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Dashboard",
        description: "Live overview of hotel operations",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground tabular-nums", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-6 space-y-6 bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-label": "Key metrics", "data-ocid": "metrics-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Total Rooms",
            value: typedStats ? Number(typedStats.totalRooms) : "—",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
            accent: "default",
            loading: statsLoading,
            dataOcid: "metric-total-rooms"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Available",
            value: typedStats ? Number(typedStats.availableRooms) : "—",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DoorOpen, { className: "w-4 h-4" }),
            accent: "green",
            loading: statsLoading,
            dataOcid: "metric-available-rooms"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Occupied",
            value: typedStats ? Number(typedStats.occupiedRooms) : "—",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-4 h-4" }),
            accent: "red",
            loading: statsLoading,
            dataOcid: "metric-occupied-rooms"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Maintenance",
            value: typedStats ? Number(typedStats.maintenanceRooms) : "—",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-4 h-4" }),
            accent: "amber",
            loading: statsLoading,
            dataOcid: "metric-maintenance-rooms"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Today's Check-ins",
            value: typedStats ? Number(typedStats.todayCheckIns) : "—",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
            accent: "blue",
            loading: statsLoading,
            dataOcid: "metric-today-checkins"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Today's Revenue",
            value: typedStats ? /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: typedStats.todayRevenue, size: "lg" }) : "—",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4" }),
            accent: "gold",
            loading: statsLoading,
            dataOcid: "metric-today-revenue"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            "aria-label": "Room status grid",
            className: "xl:col-span-2",
            "data-ocid": "room-grid-section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-subtle h-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-row items-center justify-between border-b border-border pb-4 pt-5 px-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Room Status" }),
                hasMoreRooms && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionLink,
                  {
                    label: `View all ${rooms.length} rooms`,
                    onClick: () => navigate({ to: "/rooms" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: roomsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2", children: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].map(
                (k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Skeleton,
                  {
                    className: "h-20 rounded-lg"
                  },
                  `room-skel-${k}`
                )
              ) }) : displayRooms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                EmptyState,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-6 h-6" }),
                  title: "No rooms added yet",
                  description: "Add rooms to start accepting bookings.",
                  action: {
                    label: "Manage Rooms",
                    onClick: () => navigate({ to: "/rooms" }),
                    dataOcid: "room-grid-manage-btn"
                  },
                  className: "py-10"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2", children: displayRooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                RoomCard,
                {
                  room,
                  onClick: () => navigate({ to: "/rooms" })
                },
                room.id.toString()
              )) }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "section",
            {
              "aria-label": "Today's check-ins",
              "data-ocid": "checkins-section",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-subtle", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-row items-center justify-between border-b border-border pb-4 pt-5 px-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground", children: [
                    "Today's Check-ins",
                    !bookingsLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs font-normal text-muted-foreground", children: [
                      "(",
                      todayCheckIns.length,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionLink,
                    {
                      label: "All bookings",
                      onClick: () => navigate({ to: "/bookings" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: bookingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Skeleton,
                  {
                    className: "h-12 rounded-md"
                  },
                  `ci-skel-${k}`
                )) }) : todayCheckIns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EmptyState,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-5 h-5" }),
                    title: "No check-ins today",
                    description: "Guests checking in today will appear here.",
                    className: "py-8"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "checkins-list", children: [
                  todayCheckIns.slice(0, 6).map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CheckInRow,
                    {
                      booking,
                      roomMap,
                      onClick: () => navigate({
                        to: "/bookings/$id",
                        params: { id: booking.id.toString() }
                      })
                    },
                    booking.id.toString()
                  )),
                  todayCheckIns.length > 6 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionLink,
                    {
                      label: `+${todayCheckIns.length - 6} more`,
                      onClick: () => navigate({ to: "/bookings" })
                    }
                  ) })
                ] }) })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "section",
            {
              "aria-label": "Upcoming checkouts",
              "data-ocid": "checkouts-section",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-subtle", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-row items-center justify-between border-b border-border pb-4 pt-5 px-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground", children: [
                    "Upcoming Checkouts",
                    !bookingsLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs font-normal text-muted-foreground", children: [
                      "(",
                      upcomingCheckouts.length,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionLink,
                    {
                      label: "Checkout",
                      onClick: () => navigate({ to: "/checkout" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: bookingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Skeleton,
                  {
                    className: "h-12 rounded-md"
                  },
                  `co-skel-${k}`
                )) }) : upcomingCheckouts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EmptyState,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarX, { className: "w-5 h-5" }),
                    title: "No checkouts due",
                    description: "Guests due today or tomorrow will appear here.",
                    className: "py-8"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "checkouts-list", children: [
                  upcomingCheckouts.slice(0, 6).map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CheckoutRow,
                    {
                      booking,
                      roomMap,
                      onClick: () => navigate({
                        to: "/checkout/$bookingId",
                        params: { bookingId: booking.id.toString() }
                      })
                    },
                    booking.id.toString()
                  )),
                  upcomingCheckouts.length > 6 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionLink,
                    {
                      label: `+${upcomingCheckouts.length - 6} more`,
                      onClick: () => navigate({ to: "/checkout" })
                    }
                  ) })
                ] }) })
              ] })
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  DashboardPage as default
};
