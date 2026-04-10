import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  BedDouble,
  BookOpen,
  CheckCircle2,
  Clock,
  Printer,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { BookingStatusBadge } from "../components/ui/BookingStatusBadge";
import { CurrencyDisplay } from "../components/ui/CurrencyDisplay";
import { EmptyState } from "../components/ui/EmptyState";
import { TableSkeleton } from "../components/ui/LoadingSkeleton";
import { PageHeader } from "../components/ui/PageHeader";
import {
  useBookingHistory,
  useBookings,
  useDailyRevenue,
  useInvoicesByDateRange,
  usePendingInvoices,
  useRooms,
} from "../lib/hooks";
import {
  type Booking,
  type Invoice,
  PaymentStatus,
  type Room,
  RoomType,
} from "../lib/types";
import {
  calcNights,
  dateToTimestamp,
  formatCurrency,
  formatDate,
  timestampToDate,
} from "../lib/utils-hotel";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayInputValue(): string {
  return new Date().toISOString().split("T")[0];
}

function inputToTimestampRange(
  dateStr: string,
): { start: bigint; end: bigint } | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  const start = dateToTimestamp(
    new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0),
  );
  const end = dateToTimestamp(
    new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59),
  );
  return { start, end };
}

function dateRangeTimestamps(
  startStr: string,
  endStr: string,
): { start: bigint; end: bigint } | null {
  if (!startStr || !endStr) return null;
  const s = new Date(startStr);
  const e = new Date(endStr);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return null;
  const start = dateToTimestamp(
    new Date(s.getFullYear(), s.getMonth(), s.getDate(), 0, 0, 0),
  );
  const end = dateToTimestamp(
    new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59),
  );
  return { start, end };
}

function roomTypeLabel(rt: RoomType): string {
  const map: Record<RoomType, string> = {
    [RoomType.Single]: "Single",
    [RoomType.Double]: "Double",
    [RoomType.Deluxe]: "Deluxe",
    [RoomType.AcSingle]: "AC Single",
    [RoomType.AcDouble]: "AC Double",
    [RoomType.AcDeluxe]: "AC Deluxe",
  };
  return map[rt] ?? rt;
}

function paymentStatusLabel(ps: PaymentStatus): string {
  const map: Record<PaymentStatus, string> = {
    [PaymentStatus.Paid]: "Paid",
    [PaymentStatus.PartiallyPaid]: "Partially Paid",
    [PaymentStatus.Pending]: "Pending",
  };
  return map[ps] ?? ps;
}

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const configs: Record<PaymentStatus, { cls: string; dot: string }> = {
    [PaymentStatus.Paid]: {
      cls: "bg-emerald-100 text-emerald-800 border-emerald-200",
      dot: "bg-emerald-500",
    },
    [PaymentStatus.PartiallyPaid]: {
      cls: "bg-amber-100 text-amber-800 border-amber-200",
      dot: "bg-amber-500",
    },
    [PaymentStatus.Pending]: {
      cls: "bg-red-100 text-red-800 border-red-200",
      dot: "bg-red-500",
    },
  };
  const cfg = configs[status];
  return (
    <Badge variant="outline" className={`font-medium text-xs ${cfg.cls}`}>
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${cfg.dot}`}
        aria-hidden="true"
      />
      {paymentStatusLabel(status)}
    </Badge>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Card className={`border-border ${accent ? "hotel-accent-border" : ""}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {label}
            </p>
            <p
              className={`mt-1 font-display font-semibold tracking-tight ${accent ? "text-primary text-2xl" : "text-xl text-foreground"}`}
            >
              {value}
            </p>
            {sub && (
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            )}
          </div>
          <div
            className={`p-2 rounded-lg shrink-0 ${accent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Tab 1: Daily Revenue ─────────────────────────────────────────────────────

function DailyRevenueTab({
  bookingsMap,
  roomsMap,
}: {
  bookingsMap: Map<bigint, Booking>;
  roomsMap: Map<bigint, Room>;
}) {
  const [selectedDate, setSelectedDate] = useState(todayInputValue());

  const range = inputToTimestampRange(selectedDate);
  const { data: dailyRevenue = 0, isLoading: revLoading } = useDailyRevenue(
    range?.start ?? null,
  );
  const { data: invoices = [], isLoading: invLoading } = useInvoicesByDateRange(
    range?.start ?? null,
    range?.end ?? null,
  );

  const isLoading = revLoading || invLoading;
  const displayDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div className="space-y-5" data-ocid="tab-daily-revenue">
      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="rev-date" className="text-sm font-medium">
            Select Date
          </Label>
          <Input
            id="rev-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-44"
            data-ocid="daily-revenue-date"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SummaryCard
          label={`Total Revenue — ${displayDate}`}
          value={formatCurrency(dailyRevenue)}
          icon={<TrendingUp size={18} />}
          accent
        />
        <SummaryCard
          label="Checkouts Today"
          value={String(invoices.length)}
          sub="invoices generated"
          icon={<CheckCircle2 size={18} />}
        />
      </div>

      {isLoading ? (
        <TableSkeleton rows={4} cols={7} />
      ) : invoices.length === 0 ? (
        <EmptyState
          icon={<TrendingUp size={28} />}
          title="No invoices found for this date"
          description="Try selecting a different date to see revenue data."
        />
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="daily-revenue-table">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                  <th className="px-4 py-3 text-left font-medium">Invoice #</th>
                  <th className="px-4 py-3 text-left font-medium">Booking #</th>
                  <th className="px-4 py-3 text-left font-medium">
                    Guest Name
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Room</th>
                  <th className="px-4 py-3 text-right font-medium">Total</th>
                  <th className="px-4 py-3 text-left font-medium">Method</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((inv) => {
                  const booking = bookingsMap.get(inv.bookingId);
                  const room = booking
                    ? roomsMap.get(booking.roomId)
                    : undefined;
                  return (
                    <tr
                      key={inv.id.toString()}
                      className="bg-card hover:bg-muted/30 transition-colors"
                      data-ocid="daily-revenue-row"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        #{inv.id.toString()}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        #{inv.bookingId.toString()}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {booking?.guestName ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {room ? `${room.number}` : "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <CurrencyDisplay
                          amount={inv.totalAmount}
                          size="sm"
                          className="text-foreground"
                        />
                      </td>
                      <td className="px-4 py-3">
                        {inv.paymentMethod ? (
                          <Badge variant="outline" className="text-xs">
                            {inv.paymentMethod}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <PaymentStatusBadge status={inv.paymentStatus} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-muted/30 border-t border-border">
                  <td
                    colSpan={4}
                    className="px-4 py-3 text-sm font-semibold text-foreground"
                  >
                    Total ({invoices.length} invoices)
                  </td>
                  <td className="px-4 py-3 text-right">
                    <CurrencyDisplay
                      amount={invoices.reduce((s, i) => s + i.totalAmount, 0)}
                      size="sm"
                      className="font-semibold text-primary"
                    />
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab 2: Room Occupancy ────────────────────────────────────────────────────

function RoomOccupancyTab({
  bookingsMap: _bookingsMap,
  roomsMap,
  allBookings,
}: {
  bookingsMap: Map<bigint, Booking>;
  roomsMap: Map<bigint, Room>;
  allBookings: Booking[];
}) {
  const oneMonthAgo = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().split("T")[0];
  }, []);

  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(todayInputValue());
  const [appliedRange, setAppliedRange] = useState({
    start: startDate,
    end: endDate,
  });

  function handleApply() {
    setAppliedRange({ start: startDate, end: endDate });
  }

  const rooms = useMemo(() => Array.from(roomsMap.values()), [roomsMap]);
  const totalRooms = rooms.length;

  const range = useMemo(
    () => dateRangeTimestamps(appliedRange.start, appliedRange.end),
    [appliedRange],
  );

  const roomStats = useMemo(() => {
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
        (sum, b) =>
          sum +
          calcNights(
            b.checkInDate,
            b.actualCheckOutDate ?? b.expectedCheckOutDate,
          ) *
            b.pricePerDay,
        0,
      );
      return { room, bookingCount: roomBookings.length, totalNights, revenue };
    });
  }, [rooms, allBookings, range]);

  const periodDays = useMemo(() => {
    if (!appliedRange.start || !appliedRange.end) return 1;
    const s = new Date(appliedRange.start);
    const e = new Date(appliedRange.end);
    const diff =
      Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, diff);
  }, [appliedRange]);

  const avgOccupancy = useMemo(() => {
    if (totalRooms === 0) return 0;
    const totalNightsAll = roomStats.reduce((s, r) => s + r.totalNights, 0);
    return Math.round((totalNightsAll / (totalRooms * periodDays)) * 100);
  }, [roomStats, totalRooms, periodDays]);

  const busiestType = useMemo(() => {
    const byType: Record<string, number> = {};
    for (const { room, bookingCount } of roomStats) {
      const t = roomTypeLabel(room.roomType);
      byType[t] = (byType[t] ?? 0) + bookingCount;
    }
    const entries = Object.entries(byType);
    if (entries.length === 0) return "—";
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }, [roomStats]);

  return (
    <div className="space-y-5" data-ocid="tab-room-occupancy">
      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="occ-start" className="text-sm font-medium">
            From
          </Label>
          <Input
            id="occ-start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-44"
            data-ocid="occupancy-start-date"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="occ-end" className="text-sm font-medium">
            To
          </Label>
          <Input
            id="occ-end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-44"
            data-ocid="occupancy-end-date"
          />
        </div>
        <Button onClick={handleApply} data-ocid="occupancy-apply">
          Apply
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Total Rooms"
          value={String(totalRooms)}
          icon={<BedDouble size={18} />}
        />
        <SummaryCard
          label="Avg Occupancy"
          value={`${avgOccupancy}%`}
          sub={`over ${periodDays} days`}
          icon={<TrendingUp size={18} />}
          accent
        />
        <SummaryCard
          label="Busiest Room Type"
          value={busiestType}
          icon={<BedDouble size={18} />}
        />
      </div>

      {rooms.length === 0 ? (
        <EmptyState
          icon={<BedDouble size={28} />}
          title="No rooms found"
          description="Add rooms to see occupancy data."
        />
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="occupancy-table">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                  <th className="px-4 py-3 text-left font-medium">Room #</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-right font-medium">
                    Price/Night
                  </th>
                  <th className="px-4 py-3 text-right font-medium">Bookings</th>
                  <th className="px-4 py-3 text-right font-medium">
                    Nights Occupied
                  </th>
                  <th className="px-4 py-3 text-right font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {roomStats.map(
                  ({ room, bookingCount, totalNights, revenue }) => (
                    <tr
                      key={room.id.toString()}
                      className="bg-card hover:bg-muted/30 transition-colors"
                      data-ocid="occupancy-row"
                    >
                      <td className="px-4 py-3 font-semibold text-foreground">
                        {room.number}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {roomTypeLabel(room.roomType)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <CurrencyDisplay amount={room.pricePerDay} size="sm" />
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums">
                        {bookingCount}
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums">
                        {totalNights}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <CurrencyDisplay
                          amount={revenue}
                          size="sm"
                          className={
                            revenue > 0 ? "text-primary font-medium" : ""
                          }
                        />
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
              <tfoot>
                <tr className="bg-muted/30 border-t border-border">
                  <td
                    colSpan={3}
                    className="px-4 py-3 text-sm font-semibold text-foreground"
                  >
                    Totals
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold tabular-nums">
                    {roomStats.reduce((s, r) => s + r.bookingCount, 0)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold tabular-nums">
                    {roomStats.reduce((s, r) => s + r.totalNights, 0)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <CurrencyDisplay
                      amount={roomStats.reduce((s, r) => s + r.revenue, 0)}
                      size="sm"
                      className="font-semibold text-primary"
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab 3: Pending Payments ──────────────────────────────────────────────────

type PendingFilter =
  | "all"
  | PaymentStatus.PartiallyPaid
  | PaymentStatus.Pending;

function PendingPaymentsTab({
  bookingsMap,
  roomsMap,
}: {
  bookingsMap: Map<bigint, Booking>;
  roomsMap: Map<bigint, Room>;
}) {
  const { data: pending = [], isLoading } = usePendingInvoices();
  const [filter, setFilter] = useState<PendingFilter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return pending;
    return pending.filter((inv) => inv.paymentStatus === filter);
  }, [pending, filter]);

  const totalPending = useMemo(
    () => pending.reduce((s, inv) => s + inv.dueAmount, 0),
    [pending],
  );

  const filterOptions: { value: PendingFilter; label: string }[] = [
    { value: "all", label: "All Pending" },
    { value: PaymentStatus.PartiallyPaid, label: "Partially Paid" },
    { value: PaymentStatus.Pending, label: "Unpaid" },
  ];

  return (
    <div className="space-y-5" data-ocid="tab-pending-payments">
      {isLoading ? (
        <TableSkeleton rows={5} cols={8} />
      ) : (
        <>
          {pending.length === 0 ? (
            <EmptyState
              icon={<CheckCircle2 size={32} />}
              title="All payments are settled!"
              description="There are no outstanding payments at this time."
            />
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2.5">
                  <AlertCircle
                    size={16}
                    className="text-destructive shrink-0"
                  />
                  <span className="text-sm text-foreground font-medium">
                    <span className="text-destructive font-semibold">
                      {formatCurrency(totalPending)}
                    </span>{" "}
                    pending across{" "}
                    <span className="font-semibold">{pending.length}</span>{" "}
                    invoice{pending.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div
                  className="flex items-center gap-1.5 bg-muted rounded-lg p-1"
                  data-ocid="pending-filter"
                >
                  {filterOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setFilter(opt.value)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                        filter === opt.value
                          ? "bg-card text-foreground shadow-subtle"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      data-ocid={`pending-filter-${opt.value}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm"
                    data-ocid="pending-payments-table"
                  >
                    <thead>
                      <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                        <th className="px-4 py-3 text-left font-medium">
                          Invoice #
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          Booking #
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          Guest Name
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          Room
                        </th>
                        <th className="px-4 py-3 text-right font-medium">
                          Total
                        </th>
                        <th className="px-4 py-3 text-right font-medium">
                          Amount Due
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filtered.map((inv) => {
                        const booking = bookingsMap.get(inv.bookingId);
                        const room = booking
                          ? roomsMap.get(booking.roomId)
                          : undefined;
                        return (
                          <tr
                            key={inv.id.toString()}
                            className="bg-card hover:bg-muted/30 transition-colors"
                            data-ocid="pending-payment-row"
                          >
                            <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                              #{inv.id.toString()}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                              #{inv.bookingId.toString()}
                            </td>
                            <td className="px-4 py-3 font-medium text-foreground">
                              {booking?.guestName ?? "—"}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {room?.number ?? "—"}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <CurrencyDisplay
                                amount={inv.totalAmount}
                                size="sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-right">
                              <CurrencyDisplay
                                amount={inv.dueAmount}
                                size="sm"
                                className="text-destructive font-semibold"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <PaymentStatusBadge status={inv.paymentStatus} />
                            </td>
                            <td className="px-4 py-3 text-muted-foreground text-xs">
                              {formatDate(inv.createdAt)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-muted/30 border-t border-border">
                        <td
                          colSpan={5}
                          className="px-4 py-3 text-sm font-semibold text-foreground"
                        >
                          Total Due ({filtered.length} invoice
                          {filtered.length !== 1 ? "s" : ""})
                        </td>
                        <td className="px-4 py-3 text-right">
                          <CurrencyDisplay
                            amount={filtered.reduce(
                              (s, i) => s + i.dueAmount,
                              0,
                            )}
                            size="sm"
                            className="font-semibold text-destructive"
                          />
                        </td>
                        <td colSpan={2} />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

// ─── Tab 4: Booking History ───────────────────────────────────────────────────

const MAX_ROWS = 50;

function BookingHistoryTab({ roomsMap }: { roomsMap: Map<bigint, Room> }) {
  const oneMonthAgo = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().split("T")[0];
  }, []);

  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(todayInputValue());
  const [guestSearch, setGuestSearch] = useState("");

  const range = useMemo(
    () => dateRangeTimestamps(startDate, endDate),
    [startDate, endDate],
  );
  const { data: history = [], isLoading } = useBookingHistory(
    range?.start ?? null,
    range?.end ?? null,
  );

  const filtered = useMemo(() => {
    if (!guestSearch.trim()) return history;
    const q = guestSearch.toLowerCase();
    return history.filter(
      (b) => b.guestName.toLowerCase().includes(q) || b.guestPhone.includes(q),
    );
  }, [history, guestSearch]);

  const displayed = filtered.slice(0, MAX_ROWS);

  return (
    <div className="space-y-5" data-ocid="tab-booking-history">
      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="hist-start" className="text-sm font-medium">
            From
          </Label>
          <Input
            id="hist-start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-44"
            data-ocid="history-start-date"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="hist-end" className="text-sm font-medium">
            To
          </Label>
          <Input
            id="hist-end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-44"
            data-ocid="history-end-date"
          />
        </div>
        <div className="space-y-1.5 flex-1 min-w-[200px]">
          <Label htmlFor="hist-search" className="text-sm font-medium">
            Guest Name / Phone
          </Label>
          <Input
            id="hist-search"
            type="text"
            placeholder="Search guest..."
            value={guestSearch}
            onChange={(e) => setGuestSearch(e.target.value)}
            className="max-w-xs"
            data-ocid="history-search"
          />
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton rows={6} cols={9} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<BookOpen size={28} />}
          title="No bookings found"
          description="Try adjusting the date range or search term."
        />
      ) : (
        <>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p
              className="text-sm text-muted-foreground"
              data-ocid="history-count"
            >
              Showing{" "}
              <span className="font-semibold text-foreground">
                {displayed.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              bookings
              {filtered.length > MAX_ROWS && (
                <span className="ml-1 text-amber-600">
                  (first {MAX_ROWS} shown)
                </span>
              )}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 rounded px-3 py-1.5">
              <Printer size={13} />
              <span>Print this page to save booking history</span>
            </div>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm"
                data-ocid="booking-history-table"
              >
                <thead>
                  <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                    <th className="px-4 py-3 text-left font-medium">
                      Booking #
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Guest Name
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Phone</th>
                    <th className="px-4 py-3 text-left font-medium">Room</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Check-in
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Check-out
                    </th>
                    <th className="px-4 py-3 text-right font-medium">Nights</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {displayed.map((b) => {
                    const room = roomsMap.get(b.roomId);
                    const checkOut =
                      b.actualCheckOutDate ?? b.expectedCheckOutDate;
                    const nights = calcNights(b.checkInDate, checkOut);
                    const amount = nights * b.pricePerDay;
                    return (
                      <tr
                        key={b.id.toString()}
                        className="bg-card hover:bg-muted/30 transition-colors"
                        data-ocid="history-row"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                          #{b.id.toString()}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          {b.guestName}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                          {b.guestPhone}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {room?.number ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">
                          {formatDate(b.checkInDate)}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">
                          {formatDate(checkOut)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums">
                          {nights}
                        </td>
                        <td className="px-4 py-3">
                          <BookingStatusBadge status={b.status} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <CurrencyDisplay amount={amount} size="sm" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const { data: rooms = [], isLoading: roomsLoading } = useRooms();
  const { data: allBookings = [], isLoading: bookingsLoading } = useBookings();

  const roomsMap = useMemo(
    () => new Map<bigint, Room>(rooms.map((r) => [r.id, r])),
    [rooms],
  );
  const bookingsMap = useMemo(
    () => new Map<bigint, Booking>(allBookings.map((b) => [b.id, b])),
    [allBookings],
  );

  const isBaseLoading = roomsLoading || bookingsLoading;

  return (
    <div data-ocid="reports-page">
      <PageHeader
        title="Reports"
        description="Revenue analytics, occupancy data, and booking history"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports" },
        ]}
      />

      <div className="p-6">
        {isBaseLoading ? (
          <TableSkeleton rows={6} cols={6} />
        ) : (
          <Tabs defaultValue="daily-revenue" data-ocid="reports-tabs">
            <TabsList
              className="mb-6 h-auto flex-wrap gap-0.5"
              data-ocid="reports-tabs-list"
            >
              <TabsTrigger
                value="daily-revenue"
                className="gap-1.5"
                data-ocid="tab-trigger-daily"
              >
                <TrendingUp size={14} />
                Daily Revenue
              </TabsTrigger>
              <TabsTrigger
                value="occupancy"
                className="gap-1.5"
                data-ocid="tab-trigger-occupancy"
              >
                <BedDouble size={14} />
                Room Occupancy
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="gap-1.5"
                data-ocid="tab-trigger-pending"
              >
                <Clock size={14} />
                Pending Payments
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="gap-1.5"
                data-ocid="tab-trigger-history"
              >
                <BookOpen size={14} />
                Booking History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="daily-revenue">
              <DailyRevenueTab bookingsMap={bookingsMap} roomsMap={roomsMap} />
            </TabsContent>

            <TabsContent value="occupancy">
              <RoomOccupancyTab
                bookingsMap={bookingsMap}
                roomsMap={roomsMap}
                allBookings={allBookings}
              />
            </TabsContent>

            <TabsContent value="pending">
              <PendingPaymentsTab
                bookingsMap={bookingsMap}
                roomsMap={roomsMap}
              />
            </TabsContent>

            <TabsContent value="history">
              <BookingHistoryTab roomsMap={roomsMap} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
