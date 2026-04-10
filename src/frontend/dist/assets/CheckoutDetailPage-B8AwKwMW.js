import { c as createLucideIcon, t as useParams, v as useBooking, w as useInvoice, r as reactExports, j as jsxRuntimeExports, B as Button, x as CreditCard, z as PaymentMethod, L as LogoLight } from "./index-DkGMr7Y2.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, i as AlertDialogAction } from "./alert-dialog-CW2Sxwww.js";
import { I as Input } from "./input-BLwqETdS.js";
import { L as Label } from "./label-BJHkssmg.js";
import { C as CurrencyDisplay } from "./CurrencyDisplay-JCQ6x6JQ.js";
import { F as FormSkeleton } from "./LoadingSkeleton-HBICWUiF.js";
import { P as PageHeader, b as formatDateTime, f as formatDate, a as formatCurrency, d as dateToTimestamp, c as calcNights } from "./PageHeader-DWaItQZG.js";
import { f as useCheckout } from "./mutations-CwTLAjvd.js";
import { C as CircleCheck, P as Printer } from "./printer-BwxMmAZe.js";
import "./index-DDLz35mE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
const Banknote = createLucideIcon("banknote", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode$1);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function toLocalDatetimeValue(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
function calcBill(booking, actualCheckOut, extraCharges, discountPct) {
  const checkOutTs = dateToTimestamp(actualCheckOut);
  const nights = calcNights(booking.checkInDate, checkOutTs);
  const roomCharges = booking.pricePerDay * nights;
  const extra = Math.max(0, extraCharges);
  const subtotal = roomCharges + extra;
  const discountAmt = Math.round(
    subtotal * (Math.min(100, Math.max(0, discountPct)) / 100)
  );
  const total = Math.max(0, subtotal - discountAmt);
  const amountDue = Math.max(0, total - booking.advancePayment);
  return {
    nights,
    roomCharges,
    extra,
    subtotal,
    discountAmt,
    total,
    amountDue
  };
}
function InvoiceDisplay({
  invoice,
  booking
}) {
  const nights = calcNights(
    booking.checkInDate,
    invoice.totalAmount > 0 ? booking.actualCheckOutDate ?? booking.expectedCheckOutDate : booking.expectedCheckOutDate
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl overflow-hidden shadow-elevated print:shadow-none print:border-0",
      "data-ocid": "invoice-display",
      id: "invoice-print-area",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border-b border-border px-8 py-6 flex items-start justify-between print:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogoLight, { size: "lg", variant: "full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs text-muted-foreground space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Sector 12, Near City Center, India" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tel: +91 98765 43210 | info@sundershanti.com" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1", children: "Tax Invoice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-foreground", children: [
              "#",
              invoice.id.toString().padStart(5, "0")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: formatDate(invoice.createdAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Booking #",
              booking.id.toString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2", children: "Billed To" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: booking.guestName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: booking.guestPhone }),
              booking.guestIdProof && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                "ID: ",
                booking.guestIdProof
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2", children: "Stay Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-24 shrink-0", children: "Check-In" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: formatDate(booking.checkInDate) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-24 shrink-0", children: "Check-Out" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: booking.actualCheckOutDate ? formatDate(booking.actualCheckOutDate) : formatDate(booking.expectedCheckOutDate) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-24 shrink-0", children: "Duration" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                    nights,
                    " night",
                    nights !== 1 ? "s" : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-24 shrink-0", children: "Room" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                    "#",
                    booking.roomId.toString()
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 text-xs uppercase tracking-wide text-muted-foreground font-semibold", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-xs uppercase tracking-wide text-muted-foreground font-semibold", children: "Rate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-xs uppercase tracking-wide text-muted-foreground font-semibold", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-xs uppercase tracking-wide text-muted-foreground font-semibold", children: "Amount" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 text-foreground", children: [
                  "Room #",
                  booking.roomId.toString(),
                  " — Accommodation"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 text-right tabular-nums text-muted-foreground", children: [
                  formatCurrency(booking.pricePerDay),
                  "/night"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-right tabular-nums text-muted-foreground", children: nights }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-right tabular-nums font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: invoice.roomCharges }) })
              ] }),
              invoice.extraCharges > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-foreground", children: "Damages / Room Service" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-right tabular-nums font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: invoice.extraCharges }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-64 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CurrencyDisplay,
                {
                  amount: invoice.roomCharges + invoice.extraCharges
                }
              )
            ] }),
            invoice.discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: -invoice.discount, showSign: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Advance Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: -invoice.advancePaid, showSign: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-base font-bold text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CurrencyDisplay,
                {
                  amount: invoice.totalAmount,
                  size: "lg",
                  className: "text-primary"
                }
              )
            ] }),
            invoice.dueAmount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-destructive font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Amount Due" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: invoice.dueAmount })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-emerald-700 font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Amount Due" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono tabular-nums", children: "Nil" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-muted/40 rounded-lg px-4 py-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Payment Method: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: invoice.paymentMethod ?? "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold uppercase text-xs tracking-wide px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800", children: invoice.paymentStatus }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-6", children: "Thank you for staying at Sunder Shanti Hotel. We hope to see you again!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-8 pb-6 print:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => window.print(),
            className: "gap-2",
            "data-ocid": "invoice-print-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 15 }),
              "Print Invoice"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media print {
          body > *:not(#invoice-print-area) { display: none !important; }
          #invoice-print-area { position: fixed; top: 0; left: 0; width: 100%; }
        }
      ` })
      ]
    }
  );
}
function CheckoutDetailPage() {
  const { bookingId: bookingIdStr } = useParams({
    from: "/app/checkout/$bookingId"
  });
  const bookingId = BigInt(bookingIdStr);
  const { data: bookingOpt, isLoading: bookingLoading } = useBooking(bookingId);
  const { data: existingInvoice } = useInvoice(bookingId);
  const checkoutMutation = useCheckout();
  const booking = bookingOpt ?? null;
  const [checkoutDateTime, setCheckoutDateTime] = reactExports.useState(
    toLocalDatetimeValue(/* @__PURE__ */ new Date())
  );
  const [extraCharges, setExtraCharges] = reactExports.useState("");
  const [discountPct, setDiscountPct] = reactExports.useState("");
  const [paymentMethod, setPaymentMethod] = reactExports.useState("Cash");
  const [amountReceivedStr, setAmountReceivedStr] = reactExports.useState("");
  const [checkoutSuccess, setCheckoutSuccess] = reactExports.useState(false);
  const [completedInvoice, setCompletedInvoice] = reactExports.useState(
    existingInvoice ?? null
  );
  const successBannerRef = reactExports.useRef(null);
  const actualCheckOut = checkoutDateTime ? new Date(checkoutDateTime) : /* @__PURE__ */ new Date();
  const extra = Number.parseFloat(extraCharges) || 0;
  const discount = Number.parseFloat(discountPct) || 0;
  const prefillRef = reactExports.useRef(false);
  const bill = booking ? calcBill(booking, actualCheckOut, extra, discount) : null;
  if (bill && !prefillRef.current && !amountReceivedStr) {
    prefillRef.current = true;
    setAmountReceivedStr(String(bill.amountDue));
  }
  const amountReceived = Number.parseFloat(amountReceivedStr) || 0;
  const isPartial = bill ? amountReceived < bill.amountDue : false;
  const pendingAmount = bill ? bill.amountDue - amountReceived : 0;
  async function handleConfirmCheckout() {
    if (!booking || !bill) return;
    try {
      const invoice = await checkoutMutation.mutateAsync({
        bookingId: booking.id,
        actualCheckOutDate: dateToTimestamp(actualCheckOut),
        extraCharges: extra,
        discount: bill.discountAmt,
        paymentMethod: paymentMethod === "Cash" ? PaymentMethod.Cash : PaymentMethod.UPI,
        amountPaid: amountReceived
      });
      setCompletedInvoice(invoice);
      setCheckoutSuccess(true);
      setTimeout(() => {
        var _a;
        (_a = successBannerRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (_err) {
    }
  }
  if (bookingLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageHeader,
        {
          title: `Checkout — Booking #${bookingIdStr}`,
          breadcrumbs: [
            { label: "Checkout", href: "/checkout" },
            { label: `#${bookingIdStr}` }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 max-w-3xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormSkeleton, {}) })
    ] });
  }
  if (!booking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageHeader,
        {
          title: "Booking Not Found",
          breadcrumbs: [{ label: "Checkout", href: "/checkout" }]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 text-center text-muted-foreground", children: [
        "Booking #",
        bookingIdStr,
        " could not be found."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: `Checkout — ${booking.guestName}`,
        description: `Room #${booking.roomId} · Booking #${booking.id}`,
        breadcrumbs: [
          { label: "Checkout", href: "/checkout" },
          { label: booking.guestName }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-4xl mx-auto space-y-6", children: [
      checkoutSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "output",
        {
          ref: successBannerRef,
          className: "flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-5 py-4",
          "data-ocid": "checkout-success-banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 20, className: "shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Checkout Complete!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-80", children: [
                booking.guestName,
                " has been checked out. Invoice generated successfully."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm uppercase tracking-wide text-muted-foreground", children: "Booking Summary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5 grid grid-cols-2 sm:grid-cols-3 gap-5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Guest Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: booking.guestName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: booking.guestPhone })
          ] }),
          booking.guestIdProof && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "ID Proof" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: booking.guestIdProof })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Room" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground text-lg", children: [
              "#",
              booking.roomId.toString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Check-In" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: formatDateTime(booking.checkInDate) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Expected Check-Out" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: formatDate(booking.expectedCheckOutDate) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Price / Night" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: formatCurrency(booking.pricePerDay) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Advance Paid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-primary", children: formatCurrency(booking.advancePayment) })
          ] }),
          bill && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Nights So Far" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
              bill.nights,
              " night",
              bill.nights !== 1 ? "s" : ""
            ] })
          ] })
        ] })
      ] }),
      !checkoutSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm uppercase tracking-wide text-muted-foreground", children: "Checkout Details" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5 grid grid-cols-1 sm:grid-cols-3 gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "checkout-datetime",
                  className: "text-sm font-medium",
                  children: [
                    "Actual Check-Out Date & Time",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "checkout-datetime",
                  type: "datetime-local",
                  value: checkoutDateTime,
                  onChange: (e) => setCheckoutDateTime(e.target.value),
                  required: true,
                  "data-ocid": "checkout-datetime-input",
                  className: "text-sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "extra-charges",
                  className: "text-sm font-medium",
                  children: [
                    "Extra Charges (₹)",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs ml-1", children: "Damages / Room Service" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "extra-charges",
                  type: "number",
                  min: "0",
                  step: "1",
                  placeholder: "0",
                  value: extraCharges,
                  onChange: (e) => setExtraCharges(e.target.value),
                  "data-ocid": "checkout-extra-charges-input",
                  className: "text-sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "discount-pct", className: "text-sm font-medium", children: [
                "Discount (%)",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs ml-1", children: "e.g. 10 = 10% off" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "discount-pct",
                  type: "number",
                  min: "0",
                  max: "100",
                  step: "0.5",
                  placeholder: "0",
                  value: discountPct,
                  onChange: (e) => setDiscountPct(e.target.value),
                  "data-ocid": "checkout-discount-input",
                  className: "text-sm"
                }
              )
            ] })
          ] })
        ] }),
        bill && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm uppercase tracking-wide text-muted-foreground", children: "Bill Preview" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm ml-auto space-y-2.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "Room Charges (",
                bill.nights,
                " night",
                bill.nights !== 1 ? "s" : "",
                " ×",
                " ",
                formatCurrency(booking.pricePerDay),
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: bill.roomCharges })
            ] }),
            bill.extra > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Extra Charges" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: bill.extra })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-border pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: bill.subtotal })
            ] }),
            bill.discountAmt > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Discount (",
                discountPct,
                "%)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: -bill.discountAmt, showSign: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Advance Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CurrencyDisplay,
                {
                  amount: -booking.advancePayment,
                  showSign: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center border-t border-border pt-3 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-foreground", children: "Total Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CurrencyDisplay,
                {
                  amount: bill.total,
                  size: "xl",
                  className: "text-primary"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-muted/40 rounded-lg px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Amount Due" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CurrencyDisplay,
                {
                  amount: bill.amountDue,
                  size: "lg",
                  className: bill.amountDue > 0 ? "text-destructive" : "text-emerald-700"
                }
              )
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm uppercase tracking-wide text-muted-foreground", children: "Payment Recording" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-3 block", children: "Payment Method" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex gap-3",
                  role: "radiogroup",
                  "aria-label": "Payment method",
                  children: [
                    { value: "Cash", label: "Cash", Icon: Banknote },
                    { value: "UPI", label: "UPI", Icon: Smartphone }
                  ].map(({ value, label, Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: `flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-smooth flex-1 justify-center cursor-pointer ${paymentMethod === value ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"}`,
                      "data-ocid": `payment-method-${value.toLowerCase()}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "radio",
                            name: "paymentMethod",
                            value,
                            checked: paymentMethod === value,
                            onChange: () => setPaymentMethod(value),
                            className: "sr-only"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, "aria-hidden": "true" }),
                        label
                      ]
                    },
                    value
                  ))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "amount-received",
                  className: "text-sm font-medium",
                  children: "Amount Received (₹)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "amount-received",
                  type: "number",
                  min: "0",
                  step: "1",
                  value: amountReceivedStr,
                  onChange: (e) => setAmountReceivedStr(e.target.value),
                  className: "text-sm max-w-xs",
                  "data-ocid": "checkout-amount-received-input"
                }
              )
            ] }),
            isPartial && pendingAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2.5 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3",
                role: "alert",
                "data-ocid": "partial-payment-warning",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16, className: "shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Partial Payment" }),
                    " —",
                    " ",
                    formatCurrency(pendingAmount),
                    " still pending"
                  ] })
                ]
              }
            ),
            checkoutMutation.error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2.5 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3",
                role: "alert",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16, className: "shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: checkoutMutation.error instanceof Error ? checkoutMutation.error.message : "Checkout failed. Please try again." })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "gap-2 min-w-[220px]",
              disabled: !checkoutDateTime || checkoutMutation.isPending,
              "data-ocid": "checkout-submit-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 16 }),
                checkoutMutation.isPending ? "Processing..." : "Complete Checkout & Generate Invoice"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Confirm Checkout" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                "Checkout",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: booking.guestName }),
                " ",
                "from",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                  "Room #",
                  booking.roomId.toString()
                ] }),
                "? This will generate the final invoice and mark the room as available."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "checkout-confirm-cancel", children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AlertDialogAction,
                {
                  onClick: handleConfirmCheckout,
                  "data-ocid": "checkout-confirm-proceed",
                  children: "Yes, Complete Checkout"
                }
              )
            ] })
          ] })
        ] }) })
      ] }),
      checkoutSuccess && completedInvoice && /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceDisplay, { invoice: completedInvoice, booking })
    ] })
  ] });
}
export {
  CheckoutDetailPage as default
};
