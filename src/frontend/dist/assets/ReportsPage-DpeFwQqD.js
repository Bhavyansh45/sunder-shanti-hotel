import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, l as cn, e as useRooms, q as useBookings, h as BedDouble, A as useDailyRevenue, D as useInvoicesByDateRange, p as Badge, B as Button, E as usePendingInvoices, P as PaymentStatus, F as useBookingHistory, i as RoomType } from "./index-DkGMr7Y2.js";
import { C as Card, c as CardContent } from "./card--EfZ0PrJ.js";
import { I as Input } from "./input-BLwqETdS.js";
import { L as Label } from "./label-BJHkssmg.js";
import { u as useControllableState, a as Primitive, f as useId, c as composeEventHandlers, P as Presence, b as createContextScope } from "./index-DDLz35mE.js";
import { R as Root, I as Item, c as createRovingFocusGroupScope } from "./index-B2287EBg.js";
import { u as useDirection } from "./index-CKEwVOdo.js";
import { B as BookingStatusBadge } from "./BookingStatusBadge-CUP_IjQi.js";
import { C as CurrencyDisplay } from "./CurrencyDisplay-JCQ6x6JQ.js";
import { E as EmptyState } from "./EmptyState-ZjNAd_UQ.js";
import { T as TableSkeleton } from "./LoadingSkeleton-HBICWUiF.js";
import { P as PageHeader, a as formatCurrency, c as calcNights, f as formatDate, d as dateToTimestamp } from "./PageHeader-DWaItQZG.js";
import { C as CircleCheck, P as Printer } from "./printer-BwxMmAZe.js";
import { C as CircleAlert } from "./circle-alert-CksiG1jg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function todayInputValue() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function inputToTimestampRange(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  const start = dateToTimestamp(
    new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0)
  );
  const end = dateToTimestamp(
    new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59)
  );
  return { start, end };
}
function dateRangeTimestamps(startStr, endStr) {
  if (!startStr || !endStr) return null;
  const s = new Date(startStr);
  const e = new Date(endStr);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return null;
  const start = dateToTimestamp(
    new Date(s.getFullYear(), s.getMonth(), s.getDate(), 0, 0, 0)
  );
  const end = dateToTimestamp(
    new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59)
  );
  return { start, end };
}
function roomTypeLabel(rt) {
  const map = {
    [RoomType.Single]: "Single",
    [RoomType.Double]: "Double",
    [RoomType.Deluxe]: "Deluxe",
    [RoomType.AcSingle]: "AC Single",
    [RoomType.AcDouble]: "AC Double",
    [RoomType.AcDeluxe]: "AC Deluxe"
  };
  return map[rt] ?? rt;
}
function paymentStatusLabel(ps) {
  const map = {
    [PaymentStatus.Paid]: "Paid",
    [PaymentStatus.PartiallyPaid]: "Partially Paid",
    [PaymentStatus.Pending]: "Pending"
  };
  return map[ps] ?? ps;
}
function PaymentStatusBadge({ status }) {
  const configs = {
    [PaymentStatus.Paid]: {
      cls: "bg-emerald-100 text-emerald-800 border-emerald-200",
      dot: "bg-emerald-500"
    },
    [PaymentStatus.PartiallyPaid]: {
      cls: "bg-amber-100 text-amber-800 border-amber-200",
      dot: "bg-amber-500"
    },
    [PaymentStatus.Pending]: {
      cls: "bg-red-100 text-red-800 border-red-200",
      dot: "bg-red-500"
    }
  };
  const cfg = configs[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: `font-medium text-xs ${cfg.cls}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${cfg.dot}`,
        "aria-hidden": "true"
      }
    ),
    paymentStatusLabel(status)
  ] });
}
function SummaryCard({
  label,
  value,
  sub,
  icon,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `border-border ${accent ? "hotel-accent-border" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `mt-1 font-display font-semibold tracking-tight ${accent ? "text-primary text-2xl" : "text-xl text-foreground"}`,
          children: value
        }
      ),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `p-2 rounded-lg shrink-0 ${accent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
        children: icon
      }
    )
  ] }) }) });
}
function DailyRevenueTab({
  bookingsMap,
  roomsMap
}) {
  const [selectedDate, setSelectedDate] = reactExports.useState(todayInputValue());
  const range = inputToTimestampRange(selectedDate);
  const { data: dailyRevenue = 0, isLoading: revLoading } = useDailyRevenue(
    (range == null ? void 0 : range.start) ?? null
  );
  const { data: invoices = [], isLoading: invLoading } = useInvoicesByDateRange(
    (range == null ? void 0 : range.start) ?? null,
    (range == null ? void 0 : range.end) ?? null
  );
  const isLoading = revLoading || invLoading;
  const displayDate = selectedDate ? new Date(selectedDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }) : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "tab-daily-revenue", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-end gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rev-date", className: "text-sm font-medium", children: "Select Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "rev-date",
          type: "date",
          value: selectedDate,
          onChange: (e) => setSelectedDate(e.target.value),
          className: "w-44",
          "data-ocid": "daily-revenue-date"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryCard,
        {
          label: `Total Revenue — ${displayDate}`,
          value: formatCurrency(dailyRevenue),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18 }),
          accent: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryCard,
        {
          label: "Checkouts Today",
          value: String(invoices.length),
          sub: "invoices generated",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18 })
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 4, cols: 7 }) : invoices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 28 }),
        title: "No invoices found for this date",
        description: "Try selecting a different date to see revenue data."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "daily-revenue-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Invoice #" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Booking #" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Guest Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Room" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Method" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: invoices.map((inv) => {
        const booking = bookingsMap.get(inv.bookingId);
        const room = booking ? roomsMap.get(booking.roomId) : void 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "bg-card hover:bg-muted/30 transition-colors",
            "data-ocid": "daily-revenue-row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
                "#",
                inv.id.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
                "#",
                inv.bookingId.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: (booking == null ? void 0 : booking.guestName) ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: room ? `${room.number}` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CurrencyDisplay,
                {
                  amount: inv.totalAmount,
                  size: "sm",
                  className: "text-foreground"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: inv.paymentMethod ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: inv.paymentMethod }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentStatusBadge, { status: inv.paymentStatus }) })
            ]
          },
          inv.id.toString()
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "td",
          {
            colSpan: 4,
            className: "px-4 py-3 text-sm font-semibold text-foreground",
            children: [
              "Total (",
              invoices.length,
              " invoices)"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CurrencyDisplay,
          {
            amount: invoices.reduce((s, i) => s + i.totalAmount, 0),
            size: "sm",
            className: "font-semibold text-primary"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 2 })
      ] }) })
    ] }) }) })
  ] });
}
function RoomOccupancyTab({
  bookingsMap: _bookingsMap,
  roomsMap,
  allBookings
}) {
  const oneMonthAgo = reactExports.useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().split("T")[0];
  }, []);
  const [startDate, setStartDate] = reactExports.useState(oneMonthAgo);
  const [endDate, setEndDate] = reactExports.useState(todayInputValue());
  const [appliedRange, setAppliedRange] = reactExports.useState({
    start: startDate,
    end: endDate
  });
  function handleApply() {
    setAppliedRange({ start: startDate, end: endDate });
  }
  const rooms = reactExports.useMemo(() => Array.from(roomsMap.values()), [roomsMap]);
  const totalRooms = rooms.length;
  const range = reactExports.useMemo(
    () => dateRangeTimestamps(appliedRange.start, appliedRange.end),
    [appliedRange]
  );
  const roomStats = reactExports.useMemo(() => {
    if (!range) return [];
    const filtered = allBookings.filter((b) => {
      const checkIn = b.checkInDate;
      const checkOut = b.actualCheckOutDate ?? b.expectedCheckOutDate;
      return checkIn <= range.end && checkOut >= range.start;
    });
    return rooms.map((room) => {
      const roomBookings = filtered.filter((b) => b.roomId === room.id);
      const totalNights = roomBookings.reduce((sum, b) => {
        const checkIn = b.checkInDate;
        const checkOut = b.actualCheckOutDate ?? b.expectedCheckOutDate;
        return sum + calcNights(checkIn, checkOut);
      }, 0);
      const revenue = roomBookings.reduce(
        (sum, b) => sum + calcNights(
          b.checkInDate,
          b.actualCheckOutDate ?? b.expectedCheckOutDate
        ) * b.pricePerDay,
        0
      );
      return { room, bookingCount: roomBookings.length, totalNights, revenue };
    });
  }, [rooms, allBookings, range]);
  const periodDays = reactExports.useMemo(() => {
    if (!appliedRange.start || !appliedRange.end) return 1;
    const s = new Date(appliedRange.start);
    const e = new Date(appliedRange.end);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1e3 * 60 * 60 * 24)) + 1;
    return Math.max(1, diff);
  }, [appliedRange]);
  const avgOccupancy = reactExports.useMemo(() => {
    if (totalRooms === 0) return 0;
    const totalNightsAll = roomStats.reduce((s, r) => s + r.totalNights, 0);
    return Math.round(totalNightsAll / (totalRooms * periodDays) * 100);
  }, [roomStats, totalRooms, periodDays]);
  const busiestType = reactExports.useMemo(() => {
    const byType = {};
    for (const { room, bookingCount } of roomStats) {
      const t = roomTypeLabel(room.roomType);
      byType[t] = (byType[t] ?? 0) + bookingCount;
    }
    const entries = Object.entries(byType);
    if (entries.length === 0) return "—";
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }, [roomStats]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "tab-room-occupancy", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "occ-start", className: "text-sm font-medium", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "occ-start",
            type: "date",
            value: startDate,
            onChange: (e) => setStartDate(e.target.value),
            className: "w-44",
            "data-ocid": "occupancy-start-date"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "occ-end", className: "text-sm font-medium", children: "To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "occ-end",
            type: "date",
            value: endDate,
            onChange: (e) => setEndDate(e.target.value),
            className: "w-44",
            "data-ocid": "occupancy-end-date"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleApply, "data-ocid": "occupancy-apply", children: "Apply" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryCard,
        {
          label: "Total Rooms",
          value: String(totalRooms),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryCard,
        {
          label: "Avg Occupancy",
          value: `${avgOccupancy}%`,
          sub: `over ${periodDays} days`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18 }),
          accent: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryCard,
        {
          label: "Busiest Room Type",
          value: busiestType,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { size: 18 })
        }
      )
    ] }),
    rooms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { size: 28 }),
        title: "No rooms found",
        description: "Add rooms to see occupancy data."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "occupancy-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Room #" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium", children: "Price/Night" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium", children: "Bookings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium", children: "Nights Occupied" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium", children: "Revenue" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: roomStats.map(
        ({ room, bookingCount, totalNights, revenue }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "bg-card hover:bg-muted/30 transition-colors",
            "data-ocid": "occupancy-row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-foreground", children: room.number }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: roomTypeLabel(room.roomType) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: room.pricePerDay, size: "sm" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono tabular-nums", children: bookingCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono tabular-nums", children: totalNights }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CurrencyDisplay,
                {
                  amount: revenue,
                  size: "sm",
                  className: revenue > 0 ? "text-primary font-medium" : ""
                }
              ) })
            ]
          },
          room.id.toString()
        )
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 3,
            className: "px-4 py-3 text-sm font-semibold text-foreground",
            children: "Totals"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-semibold tabular-nums", children: roomStats.reduce((s, r) => s + r.bookingCount, 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-semibold tabular-nums", children: roomStats.reduce((s, r) => s + r.totalNights, 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CurrencyDisplay,
          {
            amount: roomStats.reduce((s, r) => s + r.revenue, 0),
            size: "sm",
            className: "font-semibold text-primary"
          }
        ) })
      ] }) })
    ] }) }) })
  ] });
}
function PendingPaymentsTab({
  bookingsMap,
  roomsMap
}) {
  const { data: pending = [], isLoading } = usePendingInvoices();
  const [filter, setFilter] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => {
    if (filter === "all") return pending;
    return pending.filter((inv) => inv.paymentStatus === filter);
  }, [pending, filter]);
  const totalPending = reactExports.useMemo(
    () => pending.reduce((s, inv) => s + inv.dueAmount, 0),
    [pending]
  );
  const filterOptions = [
    { value: "all", label: "All Pending" },
    { value: PaymentStatus.PartiallyPaid, label: "Partially Paid" },
    { value: PaymentStatus.Pending, label: "Unpaid" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", "data-ocid": "tab-pending-payments", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 5, cols: 8 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: pending.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    EmptyState,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 32 }),
      title: "All payments are settled!",
      description: "There are no outstanding payments at this time."
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CircleAlert,
          {
            size: 16,
            className: "text-destructive shrink-0"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-semibold", children: formatCurrency(totalPending) }),
          " ",
          "pending across",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: pending.length }),
          " ",
          "invoice",
          pending.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center gap-1.5 bg-muted rounded-lg p-1",
          "data-ocid": "pending-filter",
          children: filterOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFilter(opt.value),
              className: `px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${filter === opt.value ? "bg-card text-foreground shadow-subtle" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `pending-filter-${opt.value}`,
              children: opt.label
            },
            opt.value
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "table",
      {
        className: "w-full text-sm",
        "data-ocid": "pending-payments-table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 text-muted-foreground border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Invoice #" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Booking #" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Guest Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Room" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium", children: "Amount Due" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Date" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((inv) => {
            const booking = bookingsMap.get(inv.bookingId);
            const room = booking ? roomsMap.get(booking.roomId) : void 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "bg-card hover:bg-muted/30 transition-colors",
                "data-ocid": "pending-payment-row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
                    "#",
                    inv.id.toString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
                    "#",
                    inv.bookingId.toString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: (booking == null ? void 0 : booking.guestName) ?? "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: (room == null ? void 0 : room.number) ?? "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CurrencyDisplay,
                    {
                      amount: inv.totalAmount,
                      size: "sm"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CurrencyDisplay,
                    {
                      amount: inv.dueAmount,
                      size: "sm",
                      className: "text-destructive font-semibold"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentStatusBadge, { status: inv.paymentStatus }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: formatDate(inv.createdAt) })
                ]
              },
              inv.id.toString()
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "td",
              {
                colSpan: 5,
                className: "px-4 py-3 text-sm font-semibold text-foreground",
                children: [
                  "Total Due (",
                  filtered.length,
                  " invoice",
                  filtered.length !== 1 ? "s" : "",
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CurrencyDisplay,
              {
                amount: filtered.reduce(
                  (s, i) => s + i.dueAmount,
                  0
                ),
                size: "sm",
                className: "font-semibold text-destructive"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 2 })
          ] }) })
        ]
      }
    ) }) })
  ] }) }) });
}
const MAX_ROWS = 50;
function BookingHistoryTab({ roomsMap }) {
  const oneMonthAgo = reactExports.useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().split("T")[0];
  }, []);
  const [startDate, setStartDate] = reactExports.useState(oneMonthAgo);
  const [endDate, setEndDate] = reactExports.useState(todayInputValue());
  const [guestSearch, setGuestSearch] = reactExports.useState("");
  const range = reactExports.useMemo(
    () => dateRangeTimestamps(startDate, endDate),
    [startDate, endDate]
  );
  const { data: history = [], isLoading } = useBookingHistory(
    (range == null ? void 0 : range.start) ?? null,
    (range == null ? void 0 : range.end) ?? null
  );
  const filtered = reactExports.useMemo(() => {
    if (!guestSearch.trim()) return history;
    const q = guestSearch.toLowerCase();
    return history.filter(
      (b) => b.guestName.toLowerCase().includes(q) || b.guestPhone.includes(q)
    );
  }, [history, guestSearch]);
  const displayed = filtered.slice(0, MAX_ROWS);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "tab-booking-history", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hist-start", className: "text-sm font-medium", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "hist-start",
            type: "date",
            value: startDate,
            onChange: (e) => setStartDate(e.target.value),
            className: "w-44",
            "data-ocid": "history-start-date"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hist-end", className: "text-sm font-medium", children: "To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "hist-end",
            type: "date",
            value: endDate,
            onChange: (e) => setEndDate(e.target.value),
            className: "w-44",
            "data-ocid": "history-end-date"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hist-search", className: "text-sm font-medium", children: "Guest Name / Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "hist-search",
            type: "text",
            placeholder: "Search guest...",
            value: guestSearch,
            onChange: (e) => setGuestSearch(e.target.value),
            className: "max-w-xs",
            "data-ocid": "history-search"
          }
        )
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 6, cols: 9 }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 28 }),
        title: "No bookings found",
        description: "Try adjusting the date range or search term."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-sm text-muted-foreground",
            "data-ocid": "history-count",
            children: [
              "Showing",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: displayed.length }),
              " ",
              "of",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
              " ",
              "bookings",
              filtered.length > MAX_ROWS && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-amber-600", children: [
                "(first ",
                MAX_ROWS,
                " shown)"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 rounded px-3 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 13 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Print this page to save booking history" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "table",
        {
          className: "w-full text-sm",
          "data-ocid": "booking-history-table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 text-muted-foreground border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Booking #" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Guest Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Room" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Check-in" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Check-out" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium", children: "Nights" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium", children: "Amount" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: displayed.map((b) => {
              const room = roomsMap.get(b.roomId);
              const checkOut = b.actualCheckOutDate ?? b.expectedCheckOutDate;
              const nights = calcNights(b.checkInDate, checkOut);
              const amount = nights * b.pricePerDay;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "bg-card hover:bg-muted/30 transition-colors",
                  "data-ocid": "history-row",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: [
                      "#",
                      b.id.toString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: b.guestName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground font-mono text-xs", children: b.guestPhone }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: (room == null ? void 0 : room.number) ?? "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: formatDate(b.checkInDate) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: formatDate(checkOut) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono tabular-nums", children: nights }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: b.status }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount, size: "sm" }) })
                  ]
                },
                b.id.toString()
              );
            }) })
          ]
        }
      ) }) })
    ] })
  ] });
}
function ReportsPage() {
  const { data: rooms = [], isLoading: roomsLoading } = useRooms();
  const { data: allBookings = [], isLoading: bookingsLoading } = useBookings();
  const roomsMap = reactExports.useMemo(
    () => new Map(rooms.map((r) => [r.id, r])),
    [rooms]
  );
  const bookingsMap = reactExports.useMemo(
    () => new Map(allBookings.map((b) => [b.id, b])),
    [allBookings]
  );
  const isBaseLoading = roomsLoading || bookingsLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "reports-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Reports",
        description: "Revenue analytics, occupancy data, and booking history",
        breadcrumbs: [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports" }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: isBaseLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 6, cols: 6 }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "daily-revenue", "data-ocid": "reports-tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsList,
        {
          className: "mb-6 h-auto flex-wrap gap-0.5",
          "data-ocid": "reports-tabs-list",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "daily-revenue",
                className: "gap-1.5",
                "data-ocid": "tab-trigger-daily",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14 }),
                  "Daily Revenue"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "occupancy",
                className: "gap-1.5",
                "data-ocid": "tab-trigger-occupancy",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { size: 14 }),
                  "Room Occupancy"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "pending",
                className: "gap-1.5",
                "data-ocid": "tab-trigger-pending",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
                  "Pending Payments"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "history",
                className: "gap-1.5",
                "data-ocid": "tab-trigger-history",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 14 }),
                  "Booking History"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "daily-revenue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DailyRevenueTab, { bookingsMap, roomsMap }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "occupancy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        RoomOccupancyTab,
        {
          bookingsMap,
          roomsMap,
          allBookings
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PendingPaymentsTab,
        {
          bookingsMap,
          roomsMap
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookingHistoryTab, { roomsMap }) })
    ] }) })
  ] });
}
export {
  ReportsPage as default
};
