import { a as useNavigate, r as reactExports, q as useBookings, e as useRooms, j as jsxRuntimeExports, B as Button, g as BookingStatus, X, C as CalendarCheck, p as Badge } from "./index-DkGMr7Y2.js";
import { I as Input } from "./input-BLwqETdS.js";
import { B as BookingStatusBadge } from "./BookingStatusBadge-CUP_IjQi.js";
import { C as CurrencyDisplay } from "./CurrencyDisplay-JCQ6x6JQ.js";
import { E as EmptyState } from "./EmptyState-ZjNAd_UQ.js";
import { T as TableSkeleton } from "./LoadingSkeleton-HBICWUiF.js";
import { P as PageHeader, c as calcNights, f as formatDate } from "./PageHeader-DWaItQZG.js";
import { P as Plus } from "./plus-BvSF33zb.js";
import { S as Search } from "./search-D-kgKWjV.js";
const STATUS_TABS = [
  { label: "All", value: null },
  { label: "Active", value: BookingStatus.Active },
  { label: "Checked Out", value: BookingStatus.CheckedOut },
  { label: "Cancelled", value: BookingStatus.Cancelled }
];
function BookingsPage() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const { data: bookings = [], isLoading } = useBookings(activeStatus);
  const { data: rooms = [] } = useRooms();
  const roomMap = reactExports.useMemo(
    () => new Map(rooms.map((r) => [r.id, r.number])),
    [rooms]
  );
  const filtered = reactExports.useMemo(() => {
    if (!search.trim()) return bookings;
    const q = search.toLowerCase();
    return bookings.filter(
      (b) => b.guestName.toLowerCase().includes(q) || b.guestPhone.toLowerCase().includes(q)
    );
  }, [bookings, search]);
  const handleRowClick = (booking) => {
    navigate({ to: "/bookings/$id", params: { id: booking.id.toString() } });
  };
  const handleNewBooking = () => navigate({ to: "/bookings/new" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Bookings",
        description: "Manage all guest bookings",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleNewBooking, "data-ocid": "new-booking-btn", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "mr-1.5" }),
          "New Booking"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col gap-4 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1.5 flex-wrap",
            role: "tablist",
            "aria-label": "Filter bookings by status",
            children: STATUS_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": activeStatus === tab.value,
                onClick: () => setActiveStatus(tab.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setActiveStatus(tab.value);
                },
                "data-ocid": `status-filter-${tab.label.toLowerCase().replace(" ", "-")}`,
                className: `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors border ${activeStatus === tab.value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted"}`,
                children: tab.label
              },
              tab.label
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              size: 15,
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search by name or phone…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-8 pr-8",
              "data-ocid": "bookings-search"
            }
          ),
          search && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearch(""),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") setSearch("");
              },
              className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden flex-1", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 6, cols: 8 }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { size: 32 }),
          title: search ? "No bookings match your search" : "No bookings found",
          description: search ? "Try a different name or phone number." : "Create your first booking to get started.",
          action: !search ? {
            label: "New Booking",
            onClick: handleNewBooking,
            dataOcid: "empty-new-booking-btn"
          } : void 0
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "bookings-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap", children: "Booking ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap", children: "Guest" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap", children: "Room" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap", children: "Check-in" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap", children: "Check-out" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap", children: "Nights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap", children: "Est. Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          BookingRow,
          {
            booking,
            roomMap,
            onClick: () => handleRowClick(booking)
          },
          booking.id.toString()
        )) })
      ] }) }) }),
      !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Showing ",
        filtered.length,
        " booking",
        filtered.length !== 1 ? "s" : ""
      ] })
    ] })
  ] });
}
function BookingRow({
  booking,
  roomMap,
  onClick
}) {
  const navigate = useNavigate();
  const nights = calcNights(booking.checkInDate, booking.expectedCheckOutDate);
  const estimatedAmount = booking.pricePerDay * nights;
  const isActive = booking.status === BookingStatus.Active;
  const handleCheckout = (e) => {
    e.stopPropagation();
    navigate({
      to: "/checkout/$bookingId",
      params: { bookingId: booking.id.toString() }
    });
  };
  const handleView = (e) => {
    e.stopPropagation();
    navigate({ to: "/bookings/$id", params: { id: booking.id.toString() } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      onClick,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      },
      tabIndex: 0,
      "data-ocid": `booking-row-${booking.id}`,
      className: "border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "font-mono text-xs", children: [
          "#",
          booking.id.toString().padStart(4, "0")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground truncate max-w-[140px]", children: booking.guestName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: booking.guestPhone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
          "Room ",
          roomMap.get(booking.roomId) ?? booking.roomId.toString()
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: formatDate(booking.checkInDate) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: formatDate(booking.expectedCheckOutDate) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: nights }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: booking.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: estimatedAmount, size: "sm" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: handleView,
              "data-ocid": `booking-view-${booking.id}`,
              className: "h-7 px-2 text-xs",
              children: "View"
            }
          ),
          isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleCheckout,
              "data-ocid": `booking-checkout-${booking.id}`,
              className: "h-7 px-2 text-xs",
              children: "Checkout"
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  BookingsPage as default
};
