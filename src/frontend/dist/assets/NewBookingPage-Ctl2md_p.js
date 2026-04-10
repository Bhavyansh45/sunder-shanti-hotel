import { a as useNavigate, s as useAvailableRooms, r as reactExports, j as jsxRuntimeExports, h as BedDouble, B as Button, o as ue } from "./index-DkGMr7Y2.js";
import { I as Input } from "./input-BLwqETdS.js";
import { L as Label } from "./label-BJHkssmg.js";
import { F as FormSkeleton } from "./LoadingSkeleton-HBICWUiF.js";
import { P as PageHeader, a as formatCurrency, d as dateToTimestamp } from "./PageHeader-DWaItQZG.js";
import { R as RoomTypeLabel } from "./RoomTypeLabel-D-zFrM3d.js";
import { c as useCreateBooking } from "./mutations-CwTLAjvd.js";
import { U as User, C as Calendar } from "./user-3Buw2jQ0.js";
import { I as IndianRupee } from "./indian-rupee-Bkde-BqG.js";
import { C as CircleAlert } from "./circle-alert-CksiG1jg.js";
function toLocalDatetimeValue(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
function toLocalDateValue(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
function NewBookingPage() {
  const navigate = useNavigate();
  const { data: availableRooms = [], isLoading: roomsLoading } = useAvailableRooms();
  const createBooking = useCreateBooking();
  const now = /* @__PURE__ */ new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [form, setForm] = reactExports.useState({
    guestName: "",
    guestPhone: "",
    guestIdProof: "",
    roomId: "",
    checkInDate: toLocalDatetimeValue(now),
    expectedCheckOutDate: toLocalDateValue(tomorrow),
    advancePayment: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  const selectedRoom = reactExports.useMemo(
    () => availableRooms.find((r) => r.id.toString() === form.roomId) ?? null,
    [availableRooms, form.roomId]
  );
  const nights = reactExports.useMemo(() => {
    if (!form.checkInDate || !form.expectedCheckOutDate) return 0;
    const checkIn = new Date(form.checkInDate);
    const checkOut = /* @__PURE__ */ new Date(`${form.expectedCheckOutDate}T12:00:00`);
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.max(1, Math.ceil(diff / (1e3 * 60 * 60 * 24)));
  }, [form.checkInDate, form.expectedCheckOutDate]);
  const estimatedTotal = selectedRoom ? selectedRoom.pricePerDay * nights : 0;
  reactExports.useEffect(() => {
    if (form.checkInDate) {
      const checkIn = new Date(form.checkInDate);
      const nextDay = new Date(checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setForm((prev) => ({
        ...prev,
        expectedCheckOutDate: toLocalDateValue(nextDay)
      }));
    }
  }, [form.checkInDate]);
  function validate() {
    const errs = {};
    if (!form.guestName.trim()) errs.guestName = "Guest name is required";
    if (!form.guestPhone.trim()) {
      errs.guestPhone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.guestPhone.trim())) {
      errs.guestPhone = "Enter a valid 10-digit phone number";
    }
    if (!form.roomId) errs.roomId = "Please select a room";
    if (!form.checkInDate) errs.checkInDate = "Check-in date is required";
    if (!form.expectedCheckOutDate) {
      errs.expectedCheckOutDate = "Check-out date is required";
    } else {
      const checkIn = new Date(form.checkInDate);
      const checkOut = new Date(form.expectedCheckOutDate);
      if (checkOut <= checkIn) {
        errs.expectedCheckOutDate = "Check-out must be after check-in";
      }
    }
    return errs;
  }
  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) setErrors(validate());
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      Object.keys(form).map((k) => [k, true])
    );
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const checkIn = new Date(form.checkInDate);
    const checkOut = /* @__PURE__ */ new Date(`${form.expectedCheckOutDate}T12:00:00`);
    const data = {
      guestName: form.guestName.trim(),
      guestPhone: form.guestPhone.trim(),
      guestIdProof: form.guestIdProof.trim() || null,
      roomId: BigInt(form.roomId),
      checkInDate: dateToTimestamp(checkIn),
      expectedCheckOutDate: dateToTimestamp(checkOut),
      advancePayment: form.advancePayment ? Number(form.advancePayment) : 0
    };
    try {
      const booking = await createBooking.mutateAsync(data);
      ue.success("Booking created successfully!");
      navigate({ to: "/bookings/$id", params: { id: booking.id.toString() } });
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to create booking"
      );
    }
  }
  if (roomsLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageHeader,
        {
          title: "New Booking",
          description: "Create a walk-in booking",
          breadcrumbs: [
            { label: "Bookings", href: "/bookings" },
            { label: "New Booking" }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormSkeleton, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "New Booking",
        description: "Create a walk-in guest booking",
        breadcrumbs: [
          { label: "Bookings", href: "/bookings" },
          { label: "New Booking" }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        noValidate: true,
        className: "max-w-2xl",
        "data-ocid": "new-booking-form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-6 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Guest Information" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "guestName", children: [
                  "Guest Name ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "guestName",
                    value: form.guestName,
                    onChange: (e) => handleChange("guestName", e.target.value),
                    onBlur: () => handleBlur("guestName"),
                    placeholder: "Full name",
                    "data-ocid": "input-guest-name",
                    "aria-invalid": !!errors.guestName,
                    "aria-describedby": errors.guestName ? "guestName-error" : void 0
                  }
                ),
                touched.guestName && errors.guestName && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { id: "guestName-error", message: errors.guestName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "guestPhone", children: [
                  "Phone Number ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "guestPhone",
                    type: "tel",
                    value: form.guestPhone,
                    onChange: (e) => handleChange(
                      "guestPhone",
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    ),
                    onBlur: () => handleBlur("guestPhone"),
                    placeholder: "10-digit mobile number",
                    "data-ocid": "input-guest-phone",
                    "aria-invalid": !!errors.guestPhone,
                    "aria-describedby": errors.guestPhone ? "guestPhone-error" : void 0
                  }
                ),
                touched.guestPhone && errors.guestPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FieldError,
                  {
                    id: "guestPhone-error",
                    message: errors.guestPhone
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "guestIdProof", children: "ID Proof" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "guestIdProof",
                    value: form.guestIdProof,
                    onChange: (e) => handleChange("guestIdProof", e.target.value),
                    placeholder: "Aadhar / PAN / Passport number (optional)",
                    "data-ocid": "input-guest-id-proof"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-6 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { size: 16, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Room & Stay Details" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "roomId", children: [
                  "Room ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "roomId",
                    value: form.roomId,
                    onChange: (e) => handleChange("roomId", e.target.value),
                    onBlur: () => handleBlur("roomId"),
                    "data-ocid": "select-room",
                    "aria-invalid": !!errors.roomId,
                    className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select an available room…" }),
                      availableRooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: room.id.toString(), children: [
                        "Room ",
                        room.number,
                        " —",
                        " ",
                        room.roomType.replace(/([A-Z])/g, " $1").trim(),
                        " —",
                        " ",
                        formatCurrency(room.pricePerDay),
                        "/day"
                      ] }, room.id.toString()))
                    ]
                  }
                ),
                touched.roomId && errors.roomId && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { id: "roomId-error", message: errors.roomId }),
                availableRooms.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "No rooms available at the moment." })
              ] }),
              selectedRoom && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 flex items-center gap-4 p-3 rounded-lg bg-primary/5 border border-primary/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium text-foreground", children: [
                    "Room ",
                    selectedRoom.number,
                    " ·",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RoomTypeLabel, { type: selectedRoom.roomType })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: "Price per day" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold font-mono text-primary", children: formatCurrency(selectedRoom.pricePerDay) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "checkInDate", children: [
                  "Check-in Date & Time",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "checkInDate",
                    type: "datetime-local",
                    value: form.checkInDate,
                    onChange: (e) => handleChange("checkInDate", e.target.value),
                    onBlur: () => handleBlur("checkInDate"),
                    "data-ocid": "input-checkin-date",
                    "aria-invalid": !!errors.checkInDate
                  }
                ),
                touched.checkInDate && errors.checkInDate && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FieldError,
                  {
                    id: "checkInDate-error",
                    message: errors.checkInDate
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "expectedCheckOutDate", children: [
                  "Expected Check-out Date",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "expectedCheckOutDate",
                    type: "date",
                    value: form.expectedCheckOutDate,
                    onChange: (e) => handleChange("expectedCheckOutDate", e.target.value),
                    onBlur: () => handleBlur("expectedCheckOutDate"),
                    "data-ocid": "input-checkout-date",
                    "aria-invalid": !!errors.expectedCheckOutDate,
                    min: form.checkInDate ? toLocalDateValue(
                      new Date(
                        new Date(form.checkInDate).getTime() + 24 * 60 * 60 * 1e3
                      )
                    ) : void 0
                  }
                ),
                touched.expectedCheckOutDate && errors.expectedCheckOutDate && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FieldError,
                  {
                    id: "expectedCheckOutDate-error",
                    message: errors.expectedCheckOutDate
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-6 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 16, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Payment" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "advancePayment", children: "Advance Payment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium", children: "₹" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "advancePayment",
                      type: "number",
                      min: "0",
                      step: "1",
                      value: form.advancePayment,
                      onChange: (e) => handleChange("advancePayment", e.target.value),
                      placeholder: "0",
                      className: "pl-7",
                      "data-ocid": "input-advance-payment"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Optional advance collection" })
              ] }),
              selectedRoom && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-muted/60 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    formatCurrency(selectedRoom.pricePerDay),
                    " × ",
                    nights,
                    " ",
                    "night",
                    nights !== 1 ? "s" : ""
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatCurrency(estimatedTotal) })
                ] }),
                form.advancePayment && Number(form.advancePayment) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Advance paid" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-primary", children: [
                    "− ",
                    formatCurrency(Number(form.advancePayment))
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-2 flex justify-between text-sm font-semibold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Estimated Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono", children: formatCurrency(
                    estimatedTotal - (form.advancePayment ? Number(form.advancePayment) : 0)
                  ) })
                ] })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: createBooking.isPending,
                "data-ocid": "submit-new-booking",
                size: "lg",
                className: "min-w-36",
                children: createBooking.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 15, className: "mr-2 animate-pulse" }),
                  "Creating…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 15, className: "mr-2" }),
                  "Create Booking"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                onClick: () => navigate({ to: "/bookings" }),
                "data-ocid": "cancel-new-booking",
                children: "Cancel"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
function FieldError({ id, message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "p",
    {
      id,
      role: "alert",
      className: "flex items-center gap-1 text-xs text-destructive mt-1",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 11, "aria-hidden": "true" }),
        message
      ]
    }
  );
}
export {
  NewBookingPage as default
};
