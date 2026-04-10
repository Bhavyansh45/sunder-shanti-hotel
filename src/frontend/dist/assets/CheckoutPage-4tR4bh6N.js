import { a as useNavigate, f as useActiveBookings, e as useRooms, r as reactExports, j as jsxRuntimeExports, x as CreditCard, B as Button, y as LogOut } from "./index-DkGMr7Y2.js";
import { I as Input } from "./input-BLwqETdS.js";
import { C as CurrencyDisplay } from "./CurrencyDisplay-JCQ6x6JQ.js";
import { E as EmptyState } from "./EmptyState-ZjNAd_UQ.js";
import { T as TableSkeleton } from "./LoadingSkeleton-HBICWUiF.js";
import { P as PageHeader, c as calcNights, f as formatDate } from "./PageHeader-DWaItQZG.js";
import { S as Search } from "./search-D-kgKWjV.js";
function CheckoutPage() {
  const navigate = useNavigate();
  const { data: bookings, isLoading } = useActiveBookings();
  const { data: rooms = [] } = useRooms();
  const [search, setSearch] = reactExports.useState("");
  const roomMap = reactExports.useMemo(
    () => new Map(rooms.map((r) => [r.id, r.number])),
    [rooms]
  );
  const filtered = (bookings ?? []).filter(
    (b) => b.guestName.toLowerCase().includes(search.toLowerCase())
  );
  function handleCheckout(bookingId) {
    navigate({
      to: "/checkout/$bookingId",
      params: { bookingId: bookingId.toString() }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Checkout",
        description: "Process guest checkouts and generate invoices"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              size: 15,
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search by guest name...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "checkout-search",
              "aria-label": "Search active bookings"
            }
          )
        ] }),
        search && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          filtered.length,
          " result",
          filtered.length !== 1 ? "s" : ""
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows: 5, cols: 8 }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 32 }),
          title: search ? `No bookings found for "${search}"` : "No active bookings",
          description: search ? "Try a different guest name." : "All guests have checked out."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "checkout-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Booking ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Guest Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Room #" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Check-In" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Expected Check-Out" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Nights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Est. Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((booking) => {
          const nights = calcNights(
            booking.checkInDate,
            booking.expectedCheckOutDate
          );
          const estimatedTotal = booking.pricePerDay * nights;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
              "data-ocid": `checkout-row-${booking.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded", children: [
                  "#",
                  booking.id.toString()
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3.5 px-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: booking.guestName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: booking.guestPhone })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: roomMap.get(booking.roomId) ?? booking.roomId.toString() }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 text-foreground", children: formatDate(booking.checkInDate) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 text-foreground", children: formatDate(booking.expectedCheckOutDate) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 text-right tabular-nums font-medium", children: nights }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CurrencyDisplay,
                  {
                    amount: estimatedTotal,
                    size: "sm",
                    className: "text-foreground"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    onClick: () => handleCheckout(booking.id),
                    className: "gap-1.5",
                    "data-ocid": `checkout-btn-${booking.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 13 }),
                      "Checkout"
                    ]
                  }
                ) })
              ]
            },
            booking.id.toString()
          );
        }) })
      ] }) }) })
    ] })
  ] });
}
export {
  CheckoutPage as default
};
