import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  Banknote,
  CheckCircle2,
  CreditCard,
  Printer,
  Smartphone,
} from "lucide-react";
import { useRef, useState } from "react";
import { LogoLight } from "../components/Logo";
import { CurrencyDisplay } from "../components/ui/CurrencyDisplay";
import { FormSkeleton } from "../components/ui/LoadingSkeleton";
import { PageHeader } from "../components/ui/PageHeader";
import { useBooking, useInvoice } from "../lib/hooks";
import { useCheckout } from "../lib/mutations";
import { PaymentMethod } from "../lib/types";
import type { Booking, Invoice } from "../lib/types";
import {
  calcNights,
  dateToTimestamp,
  formatCurrency,
  formatDate,
  formatDateTime,
  timestampToDate,
} from "../lib/utils-hotel";

// ─── helpers ────────────────────────────────────────────────────────────────

function toLocalDatetimeValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

function calcBill(
  booking: Booking,
  actualCheckOut: Date,
  extraCharges: number,
  discountPct: number,
): {
  nights: number;
  roomCharges: number;
  extra: number;
  subtotal: number;
  discountAmt: number;
  total: number;
  amountDue: number;
} {
  const checkOutTs = dateToTimestamp(actualCheckOut);
  const nights = calcNights(booking.checkInDate, checkOutTs);
  const roomCharges = booking.pricePerDay * nights;
  const extra = Math.max(0, extraCharges);
  const subtotal = roomCharges + extra;
  const discountAmt = Math.round(
    subtotal * (Math.min(100, Math.max(0, discountPct)) / 100),
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
    amountDue,
  };
}

// ─── Invoice display (shown post-checkout) ──────────────────────────────────

function InvoiceDisplay({
  invoice,
  booking,
}: {
  invoice: Invoice;
  booking: Booking;
}) {
  const nights = calcNights(
    booking.checkInDate,
    invoice.totalAmount > 0
      ? (booking.actualCheckOutDate ?? booking.expectedCheckOutDate)
      : booking.expectedCheckOutDate,
  );

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden shadow-elevated print:shadow-none print:border-0"
      data-ocid="invoice-display"
      id="invoice-print-area"
    >
      {/* Invoice header */}
      <div className="bg-primary/10 border-b border-border px-8 py-6 flex items-start justify-between print:bg-transparent">
        <div>
          <LogoLight size="lg" variant="full" />
          <div className="mt-3 text-xs text-muted-foreground space-y-0.5">
            <p>Sector 12, Near City Center, India</p>
            <p>Tel: +91 98765 43210 | info@sundershanti.com</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
            Tax Invoice
          </p>
          <p className="text-2xl font-display font-bold text-foreground">
            #{invoice.id.toString().padStart(5, "0")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDate(invoice.createdAt)}
          </p>
          <p className="text-xs text-muted-foreground">
            Booking #{booking.id.toString()}
          </p>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Guest details */}
        <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-border">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
              Billed To
            </p>
            <p className="font-semibold text-foreground">{booking.guestName}</p>
            <p className="text-sm text-muted-foreground">
              {booking.guestPhone}
            </p>
            {booking.guestIdProof && (
              <p className="text-xs text-muted-foreground mt-1">
                ID: {booking.guestIdProof}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
              Stay Details
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex gap-2">
                <span className="text-muted-foreground w-24 shrink-0">
                  Check-In
                </span>
                <span className="font-medium text-foreground">
                  {formatDate(booking.checkInDate)}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground w-24 shrink-0">
                  Check-Out
                </span>
                <span className="font-medium text-foreground">
                  {booking.actualCheckOutDate
                    ? formatDate(booking.actualCheckOutDate)
                    : formatDate(booking.expectedCheckOutDate)}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground w-24 shrink-0">
                  Duration
                </span>
                <span className="font-medium text-foreground">
                  {nights} night{nights !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground w-24 shrink-0">
                  Room
                </span>
                <span className="font-medium text-foreground">
                  #{booking.roomId.toString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Itemized charges */}
        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                Description
              </th>
              <th className="text-right py-2 text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                Rate
              </th>
              <th className="text-right py-2 text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                Qty
              </th>
              <th className="text-right py-2 text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50">
              <td className="py-3 text-foreground">
                Room #{booking.roomId.toString()} — Accommodation
              </td>
              <td className="py-3 text-right tabular-nums text-muted-foreground">
                {formatCurrency(booking.pricePerDay)}/night
              </td>
              <td className="py-3 text-right tabular-nums text-muted-foreground">
                {nights}
              </td>
              <td className="py-3 text-right tabular-nums font-medium">
                <CurrencyDisplay amount={invoice.roomCharges} />
              </td>
            </tr>
            {invoice.extraCharges > 0 && (
              <tr className="border-b border-border/50">
                <td className="py-3 text-foreground">Damages / Room Service</td>
                <td className="py-3" />
                <td className="py-3" />
                <td className="py-3 text-right tabular-nums font-medium">
                  <CurrencyDisplay amount={invoice.extraCharges} />
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end mb-6">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <CurrencyDisplay
                amount={invoice.roomCharges + invoice.extraCharges}
              />
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-primary">
                <span>Discount</span>
                <CurrencyDisplay amount={-invoice.discount} showSign />
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Advance Paid</span>
              <CurrencyDisplay amount={-invoice.advancePaid} showSign />
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between text-base font-bold text-foreground">
              <span>Total Amount</span>
              <CurrencyDisplay
                amount={invoice.totalAmount}
                size="lg"
                className="text-primary"
              />
            </div>
            {invoice.dueAmount > 0 ? (
              <div className="flex justify-between text-destructive font-medium">
                <span>Amount Due</span>
                <CurrencyDisplay amount={invoice.dueAmount} />
              </div>
            ) : (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Amount Due</span>
                <span className="font-mono tabular-nums">Nil</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment recorded */}
        <div className="flex items-center justify-between bg-muted/40 rounded-lg px-4 py-3 text-sm">
          <div>
            <span className="text-muted-foreground">Payment Method: </span>
            <span className="font-medium text-foreground">
              {invoice.paymentMethod ?? "—"}
            </span>
          </div>
          <div>
            <span className="font-semibold uppercase text-xs tracking-wide px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {invoice.paymentStatus}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Thank you for staying at Sunder Shanti Hotel. We hope to see you
          again!
        </p>
      </div>

      {/* Print button (hidden on print) */}
      <div className="px-8 pb-6 print:hidden">
        <Button
          variant="outline"
          onClick={() => window.print()}
          className="gap-2"
          data-ocid="invoice-print-btn"
        >
          <Printer size={15} />
          Print Invoice
        </Button>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body > *:not(#invoice-print-area) { display: none !important; }
          #invoice-print-area { position: fixed; top: 0; left: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function CheckoutDetailPage() {
  const { bookingId: bookingIdStr } = useParams({
    from: "/app/checkout/$bookingId",
  });
  const bookingId = BigInt(bookingIdStr);

  const { data: bookingOpt, isLoading: bookingLoading } = useBooking(bookingId);
  const { data: existingInvoice } = useInvoice(bookingId);
  const checkoutMutation = useCheckout();

  const booking = bookingOpt ?? null;

  // Form state
  const [checkoutDateTime, setCheckoutDateTime] = useState<string>(
    toLocalDatetimeValue(new Date()),
  );
  const [extraCharges, setExtraCharges] = useState<string>("");
  const [discountPct, setDiscountPct] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "UPI">("Cash");
  const [amountReceivedStr, setAmountReceivedStr] = useState<string>("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [completedInvoice, setCompletedInvoice] = useState<Invoice | null>(
    existingInvoice ?? null,
  );

  const successBannerRef = useRef<HTMLOutputElement>(null);

  // Derived
  const actualCheckOut = checkoutDateTime
    ? new Date(checkoutDateTime)
    : new Date();
  const extra = Number.parseFloat(extraCharges) || 0;
  const discount = Number.parseFloat(discountPct) || 0;

  const prefillRef = useRef(false);

  const bill = booking
    ? calcBill(booking, actualCheckOut, extra, discount)
    : null;

  // Pre-fill amount received once when bill first becomes available
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
        paymentMethod:
          paymentMethod === "Cash" ? PaymentMethod.Cash : PaymentMethod.UPI,
        amountPaid: amountReceived,
      });
      setCompletedInvoice(invoice);
      setCheckoutSuccess(true);
      setTimeout(() => {
        successBannerRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (_err) {
      // error is shown via mutation state
    }
  }

  if (bookingLoading) {
    return (
      <div>
        <PageHeader
          title={`Checkout — Booking #${bookingIdStr}`}
          breadcrumbs={[
            { label: "Checkout", href: "/checkout" },
            { label: `#${bookingIdStr}` },
          ]}
        />
        <div className="p-6 max-w-3xl mx-auto">
          <FormSkeleton />
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div>
        <PageHeader
          title="Booking Not Found"
          breadcrumbs={[{ label: "Checkout", href: "/checkout" }]}
        />
        <div className="p-6 text-center text-muted-foreground">
          Booking #{bookingIdStr} could not be found.
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={`Checkout — ${booking.guestName}`}
        description={`Room #${booking.roomId} · Booking #${booking.id}`}
        breadcrumbs={[
          { label: "Checkout", href: "/checkout" },
          { label: booking.guestName },
        ]}
      />

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* SUCCESS BANNER */}
        {checkoutSuccess && (
          <output
            ref={successBannerRef}
            className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-5 py-4"
            data-ocid="checkout-success-banner"
          >
            <CheckCircle2 size={20} className="shrink-0" />
            <div>
              <p className="font-semibold">Checkout Complete!</p>
              <p className="text-sm opacity-80">
                {booking.guestName} has been checked out. Invoice generated
                successfully.
              </p>
            </div>
          </output>
        )}

        {/* ── SECTION 1: Booking Summary ── */}
        <section className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle">
          <div className="px-5 py-4 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Booking Summary
            </h2>
          </div>
          <div className="px-5 py-5 grid grid-cols-2 sm:grid-cols-3 gap-5 text-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Guest Name</p>
              <p className="font-semibold text-foreground">
                {booking.guestName}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Phone</p>
              <p className="font-medium text-foreground">
                {booking.guestPhone}
              </p>
            </div>
            {booking.guestIdProof && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">ID Proof</p>
                <p className="font-medium text-foreground">
                  {booking.guestIdProof}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground mb-1">Room</p>
              <p className="font-bold text-foreground text-lg">
                #{booking.roomId.toString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Check-In</p>
              <p className="font-medium text-foreground">
                {formatDateTime(booking.checkInDate)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Expected Check-Out
              </p>
              <p className="font-medium text-foreground">
                {formatDate(booking.expectedCheckOutDate)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Price / Night
              </p>
              <p className="font-semibold text-foreground">
                {formatCurrency(booking.pricePerDay)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Advance Paid</p>
              <p className="font-semibold text-primary">
                {formatCurrency(booking.advancePayment)}
              </p>
            </div>
            {bill && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Nights So Far
                </p>
                <p className="font-semibold text-foreground">
                  {bill.nights} night{bill.nights !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Only show form if not yet checked out */}
        {!checkoutSuccess && (
          <>
            {/* ── SECTION 2: Checkout Details Form ── */}
            <section className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle">
              <div className="px-5 py-4 border-b border-border bg-muted/30">
                <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Checkout Details
                </h2>
              </div>
              <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="checkout-datetime"
                    className="text-sm font-medium"
                  >
                    Actual Check-Out Date & Time
                    <span className="text-destructive ml-1">*</span>
                  </Label>
                  <Input
                    id="checkout-datetime"
                    type="datetime-local"
                    value={checkoutDateTime}
                    onChange={(e) => setCheckoutDateTime(e.target.value)}
                    required
                    data-ocid="checkout-datetime-input"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="extra-charges"
                    className="text-sm font-medium"
                  >
                    Extra Charges (₹)
                    <span className="text-muted-foreground text-xs ml-1">
                      Damages / Room Service
                    </span>
                  </Label>
                  <Input
                    id="extra-charges"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                    value={extraCharges}
                    onChange={(e) => setExtraCharges(e.target.value)}
                    data-ocid="checkout-extra-charges-input"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="discount-pct" className="text-sm font-medium">
                    Discount (%)
                    <span className="text-muted-foreground text-xs ml-1">
                      e.g. 10 = 10% off
                    </span>
                  </Label>
                  <Input
                    id="discount-pct"
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    placeholder="0"
                    value={discountPct}
                    onChange={(e) => setDiscountPct(e.target.value)}
                    data-ocid="checkout-discount-input"
                    className="text-sm"
                  />
                </div>
              </div>
            </section>

            {/* ── SECTION 3: Bill Preview ── */}
            {bill && (
              <section className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle">
                <div className="px-5 py-4 border-b border-border bg-muted/30">
                  <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Bill Preview
                  </h2>
                </div>
                <div className="px-5 py-5">
                  <div className="max-w-sm ml-auto space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Room Charges ({bill.nights} night
                        {bill.nights !== 1 ? "s" : ""} ×{" "}
                        {formatCurrency(booking.pricePerDay)})
                      </span>
                      <CurrencyDisplay amount={bill.roomCharges} />
                    </div>
                    {bill.extra > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Extra Charges
                        </span>
                        <CurrencyDisplay amount={bill.extra} />
                      </div>
                    )}
                    <div className="flex justify-between border-t border-border pt-2">
                      <span className="text-muted-foreground">Subtotal</span>
                      <CurrencyDisplay amount={bill.subtotal} />
                    </div>
                    {bill.discountAmt > 0 && (
                      <div className="flex justify-between text-primary">
                        <span>Discount ({discountPct}%)</span>
                        <CurrencyDisplay amount={-bill.discountAmt} showSign />
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Advance Paid
                      </span>
                      <CurrencyDisplay
                        amount={-booking.advancePayment}
                        showSign
                      />
                    </div>
                    <div className="flex justify-between items-center border-t border-border pt-3 mt-1">
                      <span className="text-base font-bold text-foreground">
                        Total Amount
                      </span>
                      <CurrencyDisplay
                        amount={bill.total}
                        size="xl"
                        className="text-primary"
                      />
                    </div>
                    <div className="flex justify-between items-center bg-muted/40 rounded-lg px-3 py-2">
                      <span className="font-semibold text-foreground">
                        Amount Due
                      </span>
                      <CurrencyDisplay
                        amount={bill.amountDue}
                        size="lg"
                        className={
                          bill.amountDue > 0
                            ? "text-destructive"
                            : "text-emerald-700"
                        }
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ── SECTION 4: Payment Recording ── */}
            <section className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle">
              <div className="px-5 py-4 border-b border-border bg-muted/30">
                <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Payment Recording
                </h2>
              </div>
              <div className="px-5 py-5 space-y-5">
                {/* Payment method selector */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Payment Method
                  </Label>
                  <div
                    className="flex gap-3"
                    role="radiogroup"
                    aria-label="Payment method"
                  >
                    {(
                      [
                        { value: "Cash", label: "Cash", Icon: Banknote },
                        { value: "UPI", label: "UPI", Icon: Smartphone },
                      ] as const
                    ).map(({ value, label, Icon }) => (
                      <label
                        key={value}
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-smooth flex-1 justify-center cursor-pointer ${
                          paymentMethod === value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                        data-ocid={`payment-method-${value.toLowerCase()}`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={value}
                          checked={paymentMethod === value}
                          onChange={() => setPaymentMethod(value)}
                          className="sr-only"
                        />
                        <Icon size={18} aria-hidden="true" />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amount received */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="amount-received"
                    className="text-sm font-medium"
                  >
                    Amount Received (₹)
                  </Label>
                  <Input
                    id="amount-received"
                    type="number"
                    min="0"
                    step="1"
                    value={amountReceivedStr}
                    onChange={(e) => setAmountReceivedStr(e.target.value)}
                    className="text-sm max-w-xs"
                    data-ocid="checkout-amount-received-input"
                  />
                </div>

                {/* Partial payment warning */}
                {isPartial && pendingAmount > 0 && (
                  <div
                    className="flex items-center gap-2.5 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3"
                    role="alert"
                    data-ocid="partial-payment-warning"
                  >
                    <AlertTriangle size={16} className="shrink-0" />
                    <span>
                      <strong>Partial Payment</strong> —{" "}
                      {formatCurrency(pendingAmount)} still pending
                    </span>
                  </div>
                )}

                {/* Error */}
                {checkoutMutation.error && (
                  <div
                    className="flex items-center gap-2.5 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
                    role="alert"
                  >
                    <AlertTriangle size={16} className="shrink-0" />
                    <span>
                      {checkoutMutation.error instanceof Error
                        ? checkoutMutation.error.message
                        : "Checkout failed. Please try again."}
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* ── SUBMIT ── */}
            <div className="flex justify-end">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="lg"
                    className="gap-2 min-w-[220px]"
                    disabled={!checkoutDateTime || checkoutMutation.isPending}
                    data-ocid="checkout-submit-btn"
                  >
                    <CreditCard size={16} />
                    {checkoutMutation.isPending
                      ? "Processing..."
                      : "Complete Checkout & Generate Invoice"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Checkout</AlertDialogTitle>
                    <AlertDialogDescription>
                      Checkout{" "}
                      <strong className="text-foreground">
                        {booking.guestName}
                      </strong>{" "}
                      from{" "}
                      <strong className="text-foreground">
                        Room #{booking.roomId.toString()}
                      </strong>
                      ? This will generate the final invoice and mark the room
                      as available.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-ocid="checkout-confirm-cancel">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleConfirmCheckout}
                      data-ocid="checkout-confirm-proceed"
                    >
                      Yes, Complete Checkout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </>
        )}

        {/* ── INVOICE DISPLAY (shown after success) ── */}
        {checkoutSuccess && completedInvoice && (
          <InvoiceDisplay invoice={completedInvoice} booking={booking} />
        )}
      </div>
    </div>
  );
}
