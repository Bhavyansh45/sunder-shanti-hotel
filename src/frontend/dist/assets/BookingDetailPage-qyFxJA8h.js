import { c as createLucideIcon, t as useParams, a as useNavigate, v as useBooking, w as useInvoice, r as reactExports, g as BookingStatus, j as jsxRuntimeExports, B as Button, X, b as LoaderCircle, h as BedDouble, x as CreditCard, o as ue, p as Badge, P as PaymentStatus } from "./index-DkGMr7Y2.js";
import { I as Input } from "./input-BLwqETdS.js";
import { L as Label } from "./label-BJHkssmg.js";
import { P as PageHeader, S as Skeleton, c as calcNights, b as formatDateTime, f as formatDate, d as dateToTimestamp } from "./PageHeader-DWaItQZG.js";
import { B as BookingStatusBadge } from "./BookingStatusBadge-CUP_IjQi.js";
import { C as ConfirmDialog } from "./ConfirmDialog-zlDuC272.js";
import { C as CurrencyDisplay } from "./CurrencyDisplay-JCQ6x6JQ.js";
import { d as useCancelBooking, e as useUpdateBooking } from "./mutations-CwTLAjvd.js";
import { S as ShieldAlert } from "./shield-alert-Bkg7jJ6R.js";
import { U as User, C as Calendar } from "./user-3Buw2jQ0.js";
import "./alert-dialog-CW2Sxwww.js";
import "./index-DDLz35mE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M14 8H8", key: "1l3xfs" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  ["path", { d: "M13 16H8", key: "wsln4y" }]
];
const ReceiptText = createLucideIcon("receipt-text", __iconNode);
function BookingDetailPage() {
  const { id } = useParams({ from: "/app/bookings/$id" });
  const navigate = useNavigate();
  const bookingId = id ? BigInt(id) : null;
  const { data: booking, isLoading: bookingLoading } = useBooking(bookingId);
  const { data: invoice, isLoading: invoiceLoading } = useInvoice(bookingId);
  const cancelBooking = useCancelBooking();
  const updateBooking = useUpdateBooking();
  const [cancelDialogOpen, setCancelDialogOpen] = reactExports.useState(false);
  const [editMode, setEditMode] = reactExports.useState(false);
  const [editCheckOut, setEditCheckOut] = reactExports.useState("");
  const [editAdvance, setEditAdvance] = reactExports.useState("");
  const isActive = (booking == null ? void 0 : booking.status) === BookingStatus.Active;
  function openEdit() {
    if (!booking) return;
    const d = new Date(Number(booking.expectedCheckOutDate / 1000000n));
    const pad = (n) => String(n).padStart(2, "0");
    setEditCheckOut(
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    );
    setEditAdvance(booking.advancePayment.toString());
    setEditMode(true);
  }
  async function handleSaveEdit() {
    if (!booking) return;
    try {
      const checkOut = /* @__PURE__ */ new Date(`${editCheckOut}T12:00:00`);
      await updateBooking.mutateAsync({
        id: booking.id,
        expectedCheckOutDate: dateToTimestamp(checkOut),
        advancePayment: editAdvance ? Number(editAdvance) : null
      });
      ue.success("Booking updated");
      setEditMode(false);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Update failed");
    }
  }
  async function handleCancel() {
    if (!booking) return;
    try {
      await cancelBooking.mutateAsync({
        id: booking.id,
        reason: "Cancelled by staff"
      });
      ue.success("Booking cancelled");
      setCancelDialogOpen(false);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Cancellation failed");
    }
  }
  if (bookingLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageHeader,
        {
          title: `Booking #${id}`,
          breadcrumbs: [
            { label: "Bookings", href: "/bookings" },
            { label: `#${id}` }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-4 max-w-4xl", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-xl" }, i)) })
    ] });
  }
  if (!booking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageHeader,
        {
          title: "Booking Not Found",
          breadcrumbs: [
            { label: "Bookings", href: "/bookings" },
            { label: "Not Found" }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col items-center justify-center py-20 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 40, className: "text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This booking does not exist or could not be loaded." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => navigate({ to: "/bookings" }),
            "data-ocid": "back-to-bookings",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15, className: "mr-1.5" }),
              "Back to Bookings"
            ]
          }
        )
      ] })
    ] });
  }
  const nights = calcNights(booking.checkInDate, booking.expectedCheckOutDate);
  const totalEstimate = booking.pricePerDay * nights;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: `Booking #${booking.id.toString().padStart(4, "0")}`,
        breadcrumbs: [
          { label: "Bookings", href: "/bookings" },
          { label: `#${booking.id.toString().padStart(4, "0")}` }
        ],
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          isActive && !editMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: openEdit,
              "data-ocid": "edit-booking-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 14, className: "mr-1.5" }),
                "Edit Booking"
              ]
            }
          ),
          isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => navigate({
                to: "/checkout/$bookingId",
                params: { bookingId: booking.id.toString() }
              }),
              "data-ocid": "proceed-checkout-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptText, { size: 14, className: "mr-1.5" }),
                "Proceed to Checkout"
              ]
            }
          ),
          isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "destructive",
              size: "sm",
              onClick: () => setCancelDialogOpen(true),
              "data-ocid": "cancel-booking-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "mr-1.5" }),
                "Cancel Booking"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => navigate({ to: "/bookings" }),
              "data-ocid": "back-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14, className: "mr-1.5" }),
                "Back"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: booking.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "Created ",
          formatDateTime(booking.createdAt)
        ] })
      ] }),
      editMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-primary/5 border border-primary/20 rounded-xl p-5",
          "data-ocid": "inline-edit-form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 14 }),
              "Edit Booking Details"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-checkout", children: "Expected Check-out Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "edit-checkout",
                    type: "date",
                    value: editCheckOut,
                    onChange: (e) => setEditCheckOut(e.target.value),
                    "data-ocid": "edit-checkout-date"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-advance", children: "Advance Payment (₹)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm", children: "₹" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "edit-advance",
                      type: "number",
                      min: "0",
                      value: editAdvance,
                      onChange: (e) => setEditAdvance(e.target.value),
                      className: "pl-7",
                      "data-ocid": "edit-advance-payment"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: handleSaveEdit,
                  disabled: updateBooking.isPending,
                  "data-ocid": "save-edit-btn",
                  children: [
                    updateBooking.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "mr-1.5 animate-spin" }) : null,
                    "Save Changes"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => setEditMode(false),
                  "data-ocid": "cancel-edit-btn",
                  children: "Discard"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 15 }), title: "Guest Information", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Name", value: booking.guestName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Phone",
              value: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${booking.guestPhone}`,
                  className: "flex items-center gap-1 hover:text-primary transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12 }),
                    booking.guestPhone
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "ID Proof",
              value: booking.guestIdProof ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic text-xs", children: "Not provided" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { size: 15 }), title: "Room Information", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Room",
              value: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                "Room ",
                booking.roomId.toString()
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Price / Day",
              value: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: booking.pricePerDay, size: "sm" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 15 }), title: "Stay Details", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Check-in" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: formatDateTime(booking.checkInDate) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Expected Check-out" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: formatDate(booking.expectedCheckOutDate) })
        ] }),
        booking.actualCheckOutDate !== void 0 && booking.actualCheckOutDate !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Actual Check-out" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: formatDateTime(booking.actualCheckOutDate) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Nights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: nights })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Total Estimate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: totalEstimate, size: "sm" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 15 }), title: "Payment Summary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Advance Paid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { amount: booking.advancePayment, size: "sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Balance Due" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CurrencyDisplay,
            {
              amount: Math.max(0, totalEstimate - booking.advancePayment),
              size: "sm",
              className: totalEstimate - booking.advancePayment > 0 ? "text-destructive" : "text-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Payment Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PaymentStatusBadge,
            {
              advancePaid: booking.advancePayment,
              total: totalEstimate,
              isCheckedOut: booking.status === BookingStatus.CheckedOut
            }
          )
        ] })
      ] }) }),
      booking.status === BookingStatus.CheckedOut && /* @__PURE__ */ jsxRuntimeExports.jsx(
        InvoiceSection,
        {
          invoice: invoice ?? null,
          isLoading: invoiceLoading
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: cancelDialogOpen,
        onOpenChange: setCancelDialogOpen,
        title: "Cancel this booking?",
        description: `Are you sure you want to cancel the booking for ${booking.guestName}? This action cannot be undone.`,
        confirmLabel: "Yes, Cancel Booking",
        variant: "destructive",
        onConfirm: handleCancel,
        loading: cancelBooking.isPending
      }
    )
  ] });
}
function DetailCard({
  icon,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5",
      "data-ocid": `detail-card-${title.toLowerCase().replace(/\s+/g, "-")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-primary/10 text-primary", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children })
      ]
    }
  );
}
function DetailRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground text-right min-w-0 break-words", children: value })
  ] });
}
function PaymentStatusBadge({
  advancePaid,
  total,
  isCheckedOut
}) {
  if (isCheckedOut) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100 text-xs", children: "Settled" });
  }
  if (advancePaid >= total) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100 text-xs", children: "Paid" });
  }
  if (advancePaid > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 text-xs", children: "Partial" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100 text-xs", children: "Pending" });
}
function InvoiceSection({
  invoice,
  isLoading
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }, i)) })
    ] });
  }
  if (!invoice) return null;
  const isPaid = invoice.paymentStatus === PaymentStatus.Paid;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5",
      "data-ocid": "invoice-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 15 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground", children: [
              "Invoice #",
              invoice.id.toString().padStart(4, "0")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: isPaid ? "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100" : invoice.paymentStatus === PaymentStatus.PartiallyPaid ? "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100" : "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
              children: invoice.paymentStatus
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceLine, { label: "Room Charges", amount: invoice.roomCharges }),
          invoice.extraCharges > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceLine, { label: "Extra Charges", amount: invoice.extraCharges }),
          invoice.discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            InvoiceLine,
            {
              label: "Discount",
              amount: -invoice.discount,
              className: "text-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceLine, { label: "Total Amount", amount: invoice.totalAmount, bold: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InvoiceLine,
            {
              label: "Advance Paid",
              amount: -invoice.advancePaid,
              className: "text-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InvoiceLine,
            {
              label: "Due Amount",
              amount: invoice.dueAmount,
              bold: true,
              className: invoice.dueAmount > 0 ? "text-destructive" : "text-primary"
            }
          ) }),
          invoice.paymentMethod !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Payment Method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: invoice.paymentMethod })
          ] })
        ] })
      ]
    }
  );
}
function InvoiceLine({
  label,
  amount,
  bold,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex justify-between items-center ${bold ? "font-semibold" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-muted-foreground ${bold ? "text-foreground font-semibold" : ""}`,
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CurrencyDisplay,
          {
            amount: Math.abs(amount),
            size: "sm",
            showSign: amount < 0,
            className
          }
        )
      ]
    }
  );
}
export {
  BookingDetailPage as default
};
