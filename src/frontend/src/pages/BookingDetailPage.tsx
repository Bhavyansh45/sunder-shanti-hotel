import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BedDouble,
  Calendar,
  CreditCard,
  Edit2,
  FileText,
  Loader2,
  Phone,
  ReceiptText,
  ShieldAlert,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BookingStatus, PaymentStatus } from "../backend";
import { BookingStatusBadge } from "../components/ui/BookingStatusBadge";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { CurrencyDisplay } from "../components/ui/CurrencyDisplay";
import { PageHeader } from "../components/ui/PageHeader";
import { RoomTypeLabel } from "../components/ui/RoomTypeLabel";
import { useBooking, useInvoice } from "../lib/hooks";
import { useCancelBooking, useUpdateBooking } from "../lib/mutations";
import type { Booking, Invoice } from "../lib/types";
import {
  calcNights,
  dateToTimestamp,
  formatCurrency,
  formatDate,
  formatDateTime,
} from "../lib/utils-hotel";

export default function BookingDetailPage() {
  const { id } = useParams({ from: "/app/bookings/$id" });
  const navigate = useNavigate();
  const bookingId = id ? BigInt(id) : null;

  const { data: booking, isLoading: bookingLoading } = useBooking(bookingId);
  const { data: invoice, isLoading: invoiceLoading } = useInvoice(bookingId);
  const cancelBooking = useCancelBooking();
  const updateBooking = useUpdateBooking();

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editCheckOut, setEditCheckOut] = useState("");
  const [editAdvance, setEditAdvance] = useState("");

  const isActive = booking?.status === BookingStatus.Active;

  function openEdit() {
    if (!booking) return;
    const d = new Date(Number(booking.expectedCheckOutDate / 1_000_000n));
    const pad = (n: number) => String(n).padStart(2, "0");
    setEditCheckOut(
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    );
    setEditAdvance(booking.advancePayment.toString());
    setEditMode(true);
  }

  async function handleSaveEdit() {
    if (!booking) return;
    try {
      const checkOut = new Date(`${editCheckOut}T12:00:00`);
      await updateBooking.mutateAsync({
        id: booking.id,
        expectedCheckOutDate: dateToTimestamp(checkOut),
        advancePayment: editAdvance ? Number(editAdvance) : null,
      });
      toast.success("Booking updated");
      setEditMode(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  }

  async function handleCancel() {
    if (!booking) return;
    try {
      await cancelBooking.mutateAsync({
        id: booking.id,
        reason: "Cancelled by staff",
      });
      toast.success("Booking cancelled");
      setCancelDialogOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Cancellation failed");
    }
  }

  if (bookingLoading) {
    return (
      <div>
        <PageHeader
          title={`Booking #${id}`}
          breadcrumbs={[
            { label: "Bookings", href: "/bookings" },
            { label: `#${id}` },
          ]}
        />
        <div className="p-6 space-y-4 max-w-4xl">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div>
        <PageHeader
          title="Booking Not Found"
          breadcrumbs={[
            { label: "Bookings", href: "/bookings" },
            { label: "Not Found" },
          ]}
        />
        <div className="p-6 flex flex-col items-center justify-center py-20 gap-4">
          <ShieldAlert size={40} className="text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            This booking does not exist or could not be loaded.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/bookings" })}
            data-ocid="back-to-bookings"
          >
            <ArrowLeft size={15} className="mr-1.5" />
            Back to Bookings
          </Button>
        </div>
      </div>
    );
  }

  const nights = calcNights(booking.checkInDate, booking.expectedCheckOutDate);
  const totalEstimate = booking.pricePerDay * nights;

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        title={`Booking #${booking.id.toString().padStart(4, "0")}`}
        breadcrumbs={[
          { label: "Bookings", href: "/bookings" },
          { label: `#${booking.id.toString().padStart(4, "0")}` },
        ]}
        action={
          <div className="flex items-center gap-2 flex-wrap">
            {isActive && !editMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={openEdit}
                data-ocid="edit-booking-btn"
              >
                <Edit2 size={14} className="mr-1.5" />
                Edit Booking
              </Button>
            )}
            {isActive && (
              <Button
                size="sm"
                onClick={() =>
                  navigate({
                    to: "/checkout/$bookingId",
                    params: { bookingId: booking.id.toString() },
                  })
                }
                data-ocid="proceed-checkout-btn"
              >
                <ReceiptText size={14} className="mr-1.5" />
                Proceed to Checkout
              </Button>
            )}
            {isActive && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setCancelDialogOpen(true)}
                data-ocid="cancel-booking-btn"
              >
                <X size={14} className="mr-1.5" />
                Cancel Booking
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/bookings" })}
              data-ocid="back-btn"
            >
              <ArrowLeft size={14} className="mr-1.5" />
              Back
            </Button>
          </div>
        }
      />

      <div className="p-6 space-y-4 max-w-4xl">
        {/* Status Banner */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border">
          <BookingStatusBadge status={booking.status} />
          <span className="text-sm text-muted-foreground">
            Created {formatDateTime(booking.createdAt)}
          </span>
        </div>

        {/* Edit mode overlay */}
        {editMode && (
          <div
            className="bg-primary/5 border border-primary/20 rounded-xl p-5"
            data-ocid="inline-edit-form"
          >
            <h3 className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
              <Edit2 size={14} />
              Edit Booking Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="edit-checkout">Expected Check-out Date</Label>
                <Input
                  id="edit-checkout"
                  type="date"
                  value={editCheckOut}
                  onChange={(e) => setEditCheckOut(e.target.value)}
                  data-ocid="edit-checkout-date"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-advance">Advance Payment (₹)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    ₹
                  </span>
                  <Input
                    id="edit-advance"
                    type="number"
                    min="0"
                    value={editAdvance}
                    onChange={(e) => setEditAdvance(e.target.value)}
                    className="pl-7"
                    data-ocid="edit-advance-payment"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                onClick={handleSaveEdit}
                disabled={updateBooking.isPending}
                data-ocid="save-edit-btn"
              >
                {updateBooking.isPending ? (
                  <Loader2 size={14} className="mr-1.5 animate-spin" />
                ) : null}
                Save Changes
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setEditMode(false)}
                data-ocid="cancel-edit-btn"
              >
                Discard
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Guest Information */}
          <DetailCard icon={<User size={15} />} title="Guest Information">
            <DetailRow label="Name" value={booking.guestName} />
            <DetailRow
              label="Phone"
              value={
                <a
                  href={`tel:${booking.guestPhone}`}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Phone size={12} />
                  {booking.guestPhone}
                </a>
              }
            />
            <DetailRow
              label="ID Proof"
              value={
                booking.guestIdProof ?? (
                  <span className="text-muted-foreground italic text-xs">
                    Not provided
                  </span>
                )
              }
            />
          </DetailCard>

          {/* Room Information */}
          <DetailCard icon={<BedDouble size={15} />} title="Room Information">
            <DetailRow
              label="Room"
              value={
                <span className="font-medium">
                  Room {booking.roomId.toString()}
                </span>
              }
            />
            <DetailRow
              label="Price / Day"
              value={<CurrencyDisplay amount={booking.pricePerDay} size="sm" />}
            />
          </DetailCard>
        </div>

        {/* Stay Details */}
        <DetailCard icon={<Calendar size={15} />} title="Stay Details">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Check-in</p>
              <p className="text-sm font-medium">
                {formatDateTime(booking.checkInDate)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Expected Check-out
              </p>
              <p className="text-sm font-medium">
                {formatDate(booking.expectedCheckOutDate)}
              </p>
            </div>
            {booking.actualCheckOutDate !== undefined &&
              booking.actualCheckOutDate !== null && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Actual Check-out
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {formatDateTime(booking.actualCheckOutDate)}
                  </p>
                </div>
              )}
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Nights</p>
              <p className="text-sm font-semibold">{nights}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Total Estimate
              </p>
              <p className="text-sm font-semibold">
                <CurrencyDisplay amount={totalEstimate} size="sm" />
              </p>
            </div>
          </div>
        </DetailCard>

        {/* Payment Summary */}
        <DetailCard icon={<CreditCard size={15} />} title="Payment Summary">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Advance Paid
              </p>
              <CurrencyDisplay amount={booking.advancePayment} size="sm" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Balance Due
              </p>
              <CurrencyDisplay
                amount={Math.max(0, totalEstimate - booking.advancePayment)}
                size="sm"
                className={
                  totalEstimate - booking.advancePayment > 0
                    ? "text-destructive"
                    : "text-primary"
                }
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Payment Status
              </p>
              <PaymentStatusBadge
                advancePaid={booking.advancePayment}
                total={totalEstimate}
                isCheckedOut={booking.status === BookingStatus.CheckedOut}
              />
            </div>
          </div>
        </DetailCard>

        {/* Invoice (if exists) */}
        {booking.status === BookingStatus.CheckedOut && (
          <InvoiceSection
            invoice={invoice ?? null}
            isLoading={invoiceLoading}
          />
        )}
      </div>

      <ConfirmDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        title="Cancel this booking?"
        description={`Are you sure you want to cancel the booking for ${booking.guestName}? This action cannot be undone.`}
        confirmLabel="Yes, Cancel Booking"
        variant="destructive"
        onConfirm={handleCancel}
        loading={cancelBooking.isPending}
      />
    </div>
  );
}

/* ─── Sub-components ─── */

function DetailCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-5"
      data-ocid={`detail-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="font-display font-semibold text-sm text-foreground">
          {title}
        </h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 min-w-0">
      <span className="text-xs text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm text-foreground text-right min-w-0 break-words">
        {value}
      </span>
    </div>
  );
}

function PaymentStatusBadge({
  advancePaid,
  total,
  isCheckedOut,
}: {
  advancePaid: number;
  total: number;
  isCheckedOut: boolean;
}) {
  if (isCheckedOut) {
    return (
      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100 text-xs">
        Settled
      </Badge>
    );
  }
  if (advancePaid >= total) {
    return (
      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100 text-xs">
        Paid
      </Badge>
    );
  }
  if (advancePaid > 0) {
    return (
      <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 text-xs">
        Partial
      </Badge>
    );
  }
  return (
    <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100 text-xs">
      Pending
    </Badge>
  );
}

function InvoiceSection({
  invoice,
  isLoading,
}: {
  invoice: Invoice | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-5">
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!invoice) return null;

  const isPaid = invoice.paymentStatus === PaymentStatus.Paid;

  return (
    <div
      className="bg-card border border-border rounded-xl p-5"
      data-ocid="invoice-section"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <FileText size={15} />
          </div>
          <h3 className="font-display font-semibold text-sm text-foreground">
            Invoice #{invoice.id.toString().padStart(4, "0")}
          </h3>
        </div>
        <Badge
          className={
            isPaid
              ? "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
              : invoice.paymentStatus === PaymentStatus.PartiallyPaid
                ? "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100"
                : "bg-red-100 text-red-800 border-red-200 hover:bg-red-100"
          }
        >
          {invoice.paymentStatus}
        </Badge>
      </div>

      <div className="space-y-2 text-sm">
        <InvoiceLine label="Room Charges" amount={invoice.roomCharges} />
        {invoice.extraCharges > 0 && (
          <InvoiceLine label="Extra Charges" amount={invoice.extraCharges} />
        )}
        {invoice.discount > 0 && (
          <InvoiceLine
            label="Discount"
            amount={-invoice.discount}
            className="text-primary"
          />
        )}
        <div className="border-t border-border pt-2">
          <InvoiceLine label="Total Amount" amount={invoice.totalAmount} bold />
        </div>
        <InvoiceLine
          label="Advance Paid"
          amount={-invoice.advancePaid}
          className="text-primary"
        />
        <div className="border-t border-border pt-2">
          <InvoiceLine
            label="Due Amount"
            amount={invoice.dueAmount}
            bold
            className={
              invoice.dueAmount > 0 ? "text-destructive" : "text-primary"
            }
          />
        </div>
        {invoice.paymentMethod !== undefined && (
          <div className="flex justify-between items-center pt-1">
            <span className="text-muted-foreground">Payment Method</span>
            <Badge variant="outline" className="text-xs">
              {invoice.paymentMethod}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}

function InvoiceLine({
  label,
  amount,
  bold,
  className = "",
}: {
  label: string;
  amount: number;
  bold?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex justify-between items-center ${bold ? "font-semibold" : ""}`}
    >
      <span
        className={`text-muted-foreground ${bold ? "text-foreground font-semibold" : ""}`}
      >
        {label}
      </span>
      <CurrencyDisplay
        amount={Math.abs(amount)}
        size="sm"
        showSign={amount < 0}
        className={className}
      />
    </div>
  );
}
