import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  BedDouble,
  Calendar,
  IndianRupee,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { FormSkeleton } from "../components/ui/LoadingSkeleton";
import { PageHeader } from "../components/ui/PageHeader";
import { RoomTypeLabel } from "../components/ui/RoomTypeLabel";
import { useAvailableRooms } from "../lib/hooks";
import { useCreateBooking } from "../lib/mutations";
import type { CreateBookingFormData } from "../lib/types";
import { dateToTimestamp, formatCurrency } from "../lib/utils-hotel";

interface FormErrors {
  guestName?: string;
  guestPhone?: string;
  roomId?: string;
  checkInDate?: string;
  expectedCheckOutDate?: string;
}

function toLocalDatetimeValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function toLocalDateValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export default function NewBookingPage() {
  const navigate = useNavigate();
  const { data: availableRooms = [], isLoading: roomsLoading } =
    useAvailableRooms();
  const createBooking = useCreateBooking();

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [form, setForm] = useState<{
    guestName: string;
    guestPhone: string;
    guestIdProof: string;
    roomId: string;
    checkInDate: string;
    expectedCheckOutDate: string;
    advancePayment: string;
  }>({
    guestName: "",
    guestPhone: "",
    guestIdProof: "",
    roomId: "",
    checkInDate: toLocalDatetimeValue(now),
    expectedCheckOutDate: toLocalDateValue(tomorrow),
    advancePayment: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const selectedRoom = useMemo(
    () => availableRooms.find((r) => r.id.toString() === form.roomId) ?? null,
    [availableRooms, form.roomId],
  );

  const nights = useMemo(() => {
    if (!form.checkInDate || !form.expectedCheckOutDate) return 0;
    const checkIn = new Date(form.checkInDate);
    const checkOut = new Date(`${form.expectedCheckOutDate}T12:00:00`);
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [form.checkInDate, form.expectedCheckOutDate]);

  const estimatedTotal = selectedRoom ? selectedRoom.pricePerDay * nights : 0;

  // Auto-set tomorrow's check-out when check-in changes
  useEffect(() => {
    if (form.checkInDate) {
      const checkIn = new Date(form.checkInDate);
      const nextDay = new Date(checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setForm((prev) => ({
        ...prev,
        expectedCheckOutDate: toLocalDateValue(nextDay),
      }));
    }
  }, [form.checkInDate]);

  function validate(): FormErrors {
    const errs: FormErrors = {};
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

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) setErrors(validate());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      Object.keys(form).map((k) => [k, true]),
    );
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const checkIn = new Date(form.checkInDate);
    const checkOut = new Date(`${form.expectedCheckOutDate}T12:00:00`);

    const data: Parameters<typeof createBooking.mutateAsync>[0] = {
      guestName: form.guestName.trim(),
      guestPhone: form.guestPhone.trim(),
      guestIdProof: form.guestIdProof.trim() || null,
      roomId: BigInt(form.roomId),
      checkInDate: dateToTimestamp(checkIn),
      expectedCheckOutDate: dateToTimestamp(checkOut),
      advancePayment: form.advancePayment ? Number(form.advancePayment) : 0,
    };

    try {
      const booking = await createBooking.mutateAsync(data);
      toast.success("Booking created successfully!");
      navigate({ to: "/bookings/$id", params: { id: booking.id.toString() } });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create booking",
      );
    }
  }

  if (roomsLoading) {
    return (
      <div>
        <PageHeader
          title="New Booking"
          description="Create a walk-in booking"
          breadcrumbs={[
            { label: "Bookings", href: "/bookings" },
            { label: "New Booking" },
          ]}
        />
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        title="New Booking"
        description="Create a walk-in guest booking"
        breadcrumbs={[
          { label: "Bookings", href: "/bookings" },
          { label: "New Booking" },
        ]}
      />

      <div className="p-6">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="max-w-2xl"
          data-ocid="new-booking-form"
        >
          {/* Guest Information */}
          <section className="bg-card border border-border rounded-xl p-6 mb-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 rounded-lg bg-primary/10">
                <User size={16} className="text-primary" />
              </div>
              <h2 className="font-display font-semibold text-base text-foreground">
                Guest Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="guestName">
                  Guest Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="guestName"
                  value={form.guestName}
                  onChange={(e) => handleChange("guestName", e.target.value)}
                  onBlur={() => handleBlur("guestName")}
                  placeholder="Full name"
                  data-ocid="input-guest-name"
                  aria-invalid={!!errors.guestName}
                  aria-describedby={
                    errors.guestName ? "guestName-error" : undefined
                  }
                />
                {touched.guestName && errors.guestName && (
                  <FieldError id="guestName-error" message={errors.guestName} />
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="guestPhone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="guestPhone"
                  type="tel"
                  value={form.guestPhone}
                  onChange={(e) =>
                    handleChange(
                      "guestPhone",
                      e.target.value.replace(/\D/g, "").slice(0, 10),
                    )
                  }
                  onBlur={() => handleBlur("guestPhone")}
                  placeholder="10-digit mobile number"
                  data-ocid="input-guest-phone"
                  aria-invalid={!!errors.guestPhone}
                  aria-describedby={
                    errors.guestPhone ? "guestPhone-error" : undefined
                  }
                />
                {touched.guestPhone && errors.guestPhone && (
                  <FieldError
                    id="guestPhone-error"
                    message={errors.guestPhone}
                  />
                )}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="guestIdProof">ID Proof</Label>
                <Input
                  id="guestIdProof"
                  value={form.guestIdProof}
                  onChange={(e) => handleChange("guestIdProof", e.target.value)}
                  placeholder="Aadhar / PAN / Passport number (optional)"
                  data-ocid="input-guest-id-proof"
                />
              </div>
            </div>
          </section>

          {/* Room & Stay Details */}
          <section className="bg-card border border-border rounded-xl p-6 mb-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 rounded-lg bg-primary/10">
                <BedDouble size={16} className="text-primary" />
              </div>
              <h2 className="font-display font-semibold text-base text-foreground">
                Room & Stay Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="roomId">
                  Room <span className="text-destructive">*</span>
                </Label>
                <select
                  id="roomId"
                  value={form.roomId}
                  onChange={(e) => handleChange("roomId", e.target.value)}
                  onBlur={() => handleBlur("roomId")}
                  data-ocid="select-room"
                  aria-invalid={!!errors.roomId}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                >
                  <option value="">Select an available room…</option>
                  {availableRooms.map((room) => (
                    <option key={room.id.toString()} value={room.id.toString()}>
                      Room {room.number} —{" "}
                      {room.roomType.replace(/([A-Z])/g, " $1").trim()} —{" "}
                      {formatCurrency(room.pricePerDay)}/day
                    </option>
                  ))}
                </select>
                {touched.roomId && errors.roomId && (
                  <FieldError id="roomId-error" message={errors.roomId} />
                )}
                {availableRooms.length === 0 && (
                  <p className="text-xs text-destructive">
                    No rooms available at the moment.
                  </p>
                )}
              </div>

              {selectedRoom && (
                <div className="sm:col-span-2 flex items-center gap-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      Room {selectedRoom.number} ·{" "}
                      <RoomTypeLabel type={selectedRoom.roomType} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Price per day
                    </div>
                  </div>
                  <div className="text-lg font-semibold font-mono text-primary">
                    {formatCurrency(selectedRoom.pricePerDay)}
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="checkInDate">
                  Check-in Date & Time{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="checkInDate"
                  type="datetime-local"
                  value={form.checkInDate}
                  onChange={(e) => handleChange("checkInDate", e.target.value)}
                  onBlur={() => handleBlur("checkInDate")}
                  data-ocid="input-checkin-date"
                  aria-invalid={!!errors.checkInDate}
                />
                {touched.checkInDate && errors.checkInDate && (
                  <FieldError
                    id="checkInDate-error"
                    message={errors.checkInDate}
                  />
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="expectedCheckOutDate">
                  Expected Check-out Date{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="expectedCheckOutDate"
                  type="date"
                  value={form.expectedCheckOutDate}
                  onChange={(e) =>
                    handleChange("expectedCheckOutDate", e.target.value)
                  }
                  onBlur={() => handleBlur("expectedCheckOutDate")}
                  data-ocid="input-checkout-date"
                  aria-invalid={!!errors.expectedCheckOutDate}
                  min={
                    form.checkInDate
                      ? toLocalDateValue(
                          new Date(
                            new Date(form.checkInDate).getTime() +
                              24 * 60 * 60 * 1000,
                          ),
                        )
                      : undefined
                  }
                />
                {touched.expectedCheckOutDate &&
                  errors.expectedCheckOutDate && (
                    <FieldError
                      id="expectedCheckOutDate-error"
                      message={errors.expectedCheckOutDate}
                    />
                  )}
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="bg-card border border-border rounded-xl p-6 mb-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 rounded-lg bg-primary/10">
                <IndianRupee size={16} className="text-primary" />
              </div>
              <h2 className="font-display font-semibold text-base text-foreground">
                Payment
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="advancePayment">Advance Payment</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    ₹
                  </span>
                  <Input
                    id="advancePayment"
                    type="number"
                    min="0"
                    step="1"
                    value={form.advancePayment}
                    onChange={(e) =>
                      handleChange("advancePayment", e.target.value)
                    }
                    placeholder="0"
                    className="pl-7"
                    data-ocid="input-advance-payment"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Optional advance collection
                </p>
              </div>

              {selectedRoom && (
                <div className="flex flex-col justify-end">
                  <div className="p-3 rounded-lg bg-muted/60 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatCurrency(selectedRoom.pricePerDay)} × {nights}{" "}
                        night
                        {nights !== 1 ? "s" : ""}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(estimatedTotal)}
                      </span>
                    </div>
                    {form.advancePayment && Number(form.advancePayment) > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Advance paid
                        </span>
                        <span className="font-medium text-primary">
                          − {formatCurrency(Number(form.advancePayment))}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-border pt-2 flex justify-between text-sm font-semibold">
                      <span>Estimated Total</span>
                      <span className="text-foreground font-mono">
                        {formatCurrency(
                          estimatedTotal -
                            (form.advancePayment
                              ? Number(form.advancePayment)
                              : 0),
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Submit */}
          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={createBooking.isPending}
              data-ocid="submit-new-booking"
              size="lg"
              className="min-w-36"
            >
              {createBooking.isPending ? (
                <>
                  <Calendar size={15} className="mr-2 animate-pulse" />
                  Creating…
                </>
              ) : (
                <>
                  <Calendar size={15} className="mr-2" />
                  Create Booking
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate({ to: "/bookings" })}
              data-ocid="cancel-new-booking"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1 text-xs text-destructive mt-1"
    >
      <AlertCircle size={11} aria-hidden="true" />
      {message}
    </p>
  );
}
