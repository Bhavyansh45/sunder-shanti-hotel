import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BedDouble,
  Building2,
  CalendarCheck,
  CalendarX,
  DoorOpen,
  IndianRupee,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import { BookingStatus, RoomStatus, RoomType } from "../backend";
import { CurrencyDisplay } from "../components/ui/CurrencyDisplay";
import { EmptyState } from "../components/ui/EmptyState";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useActiveBookings, useDashboardStats, useRooms } from "../lib/hooks";
import type { Booking, DashboardStats, Room } from "../lib/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatRoomType(type: RoomType): string {
  const labels: Record<RoomType, string> = {
    [RoomType.Single]: "Single",
    [RoomType.Double]: "Double",
    [RoomType.Deluxe]: "Deluxe",
    [RoomType.AcSingle]: "AC Single",
    [RoomType.AcDouble]: "AC Double",
    [RoomType.AcDeluxe]: "AC Deluxe",
  };
  return labels[type] ?? type;
}

function toDate(ts: bigint): Date {
  return new Date(Number(ts) / 1_000_000);
}

function isToday(ts: bigint): boolean {
  const d = toDate(ts);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function isTodayOrTomorrow(ts: bigint): boolean {
  const d = toDate(ts);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  return sameDay(d, now) || sameDay(d, tomorrow);
}

function diffDays(a: bigint, b: bigint): number {
  return Math.round(Math.abs(Number(b) - Number(a)) / (1_000_000 * 86_400_000));
}

function formatTime(ts: bigint): string {
  return toDate(ts).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(ts: bigint): string {
  return toDate(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

// ─── KPI Metric Card ────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  accent?: "green" | "red" | "amber" | "gold" | "blue" | "default";
  loading?: boolean;
  dataOcid?: string;
}

const accentStyles: Record<string, string> = {
  green: "bg-emerald-50 border-emerald-200 text-emerald-700",
  red: "bg-red-50 border-red-200 text-red-700",
  amber: "bg-amber-50 border-amber-200 text-amber-700",
  gold: "bg-yellow-50 border-yellow-200 text-yellow-700",
  blue: "bg-sky-50 border-sky-200 text-sky-700",
  default: "bg-muted border-border text-muted-foreground",
};

function MetricCard({
  label,
  value,
  icon,
  accent = "default",
  loading,
  dataOcid,
}: MetricCardProps) {
  return (
    <Card
      className="relative overflow-hidden shadow-subtle hover:shadow-elevated transition-smooth"
      data-ocid={dataOcid ?? "metric-card"}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {label}
            </p>
            {loading ? (
              <Skeleton className="h-8 w-24 mb-1" />
            ) : (
              <div className="text-2xl font-bold text-foreground tabular-nums">
                {value}
              </div>
            )}
          </div>
          <div
            className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border ${accentStyles[accent]}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Room Grid Card ──────────────────────────────────────────────────────────

interface RoomCardProps {
  room: Room;
  onClick: () => void;
}

const roomBorderAccent: Record<RoomStatus, string> = {
  [RoomStatus.Available]: "border-l-4 border-l-emerald-400",
  [RoomStatus.Occupied]: "border-l-4 border-l-red-400",
  [RoomStatus.Maintenance]: "border-l-4 border-l-amber-400",
};

function RoomCard({ room, onClick }: RoomCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left bg-card border border-border rounded-lg p-3 hover:shadow-elevated transition-smooth cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${roomBorderAccent[room.status]}`}
      data-ocid={`room-card-${room.number}`}
      aria-label={`Room ${room.number}, ${formatRoomType(room.roomType)}, ${room.status}`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-bold text-foreground">
          #{room.number}
        </span>
        <StatusBadge status={room.status} />
      </div>
      <p className="text-xs text-muted-foreground">
        {formatRoomType(room.roomType)}
      </p>
      <p className="text-xs font-medium text-foreground mt-0.5">
        ₹{room.pricePerDay.toLocaleString("en-IN")}/day
      </p>
    </button>
  );
}

// ─── Check-in Row ────────────────────────────────────────────────────────────

interface CheckInRowProps {
  booking: Booking;
  roomMap: Map<string, Room>;
  onClick: () => void;
}

function CheckInRow({ booking, roomMap, onClick }: CheckInRowProps) {
  const room = roomMap.get(booking.roomId.toString());
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border last:border-0 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-ring"
      data-ocid={`checkin-row-${booking.id}`}
    >
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <CalendarCheck className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {booking.guestName}
        </p>
        <p className="text-xs text-muted-foreground">
          {room
            ? `Room ${room.number} · ${formatRoomType(room.roomType)}`
            : `Room ID ${booking.roomId}`}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-medium text-foreground">
          {formatTime(booking.checkInDate)}
        </p>
        <p className="text-xs text-muted-foreground">Check-in</p>
      </div>
    </button>
  );
}

// ─── Checkout Row ────────────────────────────────────────────────────────────

interface CheckoutRowProps {
  booking: Booking;
  roomMap: Map<string, Room>;
  onClick: () => void;
}

function CheckoutRow({ booking, roomMap, onClick }: CheckoutRowProps) {
  const room = roomMap.get(booking.roomId.toString());
  const days = diffDays(booking.checkInDate, booking.expectedCheckOutDate);
  const isToday_ = isToday(booking.expectedCheckOutDate);
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border last:border-0 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-ring"
      data-ocid={`checkout-row-${booking.id}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isToday_ ? "bg-red-100" : "bg-amber-100"}`}
      >
        <CalendarX
          className={`w-4 h-4 ${isToday_ ? "text-red-600" : "text-amber-600"}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {booking.guestName}
        </p>
        <p className="text-xs text-muted-foreground">
          {room ? `Room ${room.number}` : `Room ID ${booking.roomId}`} · {days}{" "}
          night{days !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p
          className={`text-xs font-semibold ${isToday_ ? "text-red-600" : "text-amber-600"}`}
        >
          {isToday_ ? "Today" : "Tomorrow"}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDate(booking.expectedCheckOutDate)}
        </p>
      </div>
    </button>
  );
}

// ─── Section Link ─────────────────────────────────────────────────────────────

function SectionLink({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:underline"
    >
      {label}
      <ArrowRight className="w-3 h-3" />
    </button>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: rooms = [], isLoading: roomsLoading } = useRooms();
  const { data: activeBookings = [], isLoading: bookingsLoading } =
    useActiveBookings();

  const roomMap = new Map<string, Room>(rooms.map((r) => [r.id.toString(), r]));

  // Derive today's check-ins from active bookings created today
  const todayCheckIns = activeBookings.filter(
    (b) => b.status === BookingStatus.Active && isToday(b.checkInDate),
  );

  // Upcoming checkouts: active bookings due today or tomorrow
  const upcomingCheckouts = activeBookings.filter(
    (b) =>
      b.status === BookingStatus.Active &&
      isTodayOrTomorrow(b.expectedCheckOutDate),
  );

  // Room grid — max 20 visible rooms
  const displayRooms = rooms.slice(0, 20);
  const hasMoreRooms = rooms.length > 20;

  const typedStats = stats as DashboardStats | null | undefined;

  return (
    <div className="flex flex-col min-h-full" data-ocid="dashboard-page">
      <PageHeader
        title="Dashboard"
        description="Live overview of hotel operations"
        action={
          <span className="text-xs text-muted-foreground tabular-nums">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        }
      />

      <div className="flex-1 p-6 space-y-6 bg-background">
        {/* ── KPI Metrics Row ── */}
        <section aria-label="Key metrics" data-ocid="metrics-section">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <MetricCard
              label="Total Rooms"
              value={typedStats ? Number(typedStats.totalRooms) : "—"}
              icon={<Building2 className="w-4 h-4" />}
              accent="default"
              loading={statsLoading}
              dataOcid="metric-total-rooms"
            />
            <MetricCard
              label="Available"
              value={typedStats ? Number(typedStats.availableRooms) : "—"}
              icon={<DoorOpen className="w-4 h-4" />}
              accent="green"
              loading={statsLoading}
              dataOcid="metric-available-rooms"
            />
            <MetricCard
              label="Occupied"
              value={typedStats ? Number(typedStats.occupiedRooms) : "—"}
              icon={<BedDouble className="w-4 h-4" />}
              accent="red"
              loading={statsLoading}
              dataOcid="metric-occupied-rooms"
            />
            <MetricCard
              label="Maintenance"
              value={typedStats ? Number(typedStats.maintenanceRooms) : "—"}
              icon={<Wrench className="w-4 h-4" />}
              accent="amber"
              loading={statsLoading}
              dataOcid="metric-maintenance-rooms"
            />
            <MetricCard
              label="Today's Check-ins"
              value={typedStats ? Number(typedStats.todayCheckIns) : "—"}
              icon={<CalendarCheck className="w-4 h-4" />}
              accent="blue"
              loading={statsLoading}
              dataOcid="metric-today-checkins"
            />
            <MetricCard
              label="Today's Revenue"
              value={
                typedStats ? (
                  <CurrencyDisplay amount={typedStats.todayRevenue} size="lg" />
                ) : (
                  "—"
                )
              }
              icon={<IndianRupee className="w-4 h-4" />}
              accent="gold"
              loading={statsLoading}
              dataOcid="metric-today-revenue"
            />
          </div>
        </section>

        {/* ── Room Status Grid + Activity Panels ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Room Status Grid — 2/3 width on xl */}
          <section
            aria-label="Room status grid"
            className="xl:col-span-2"
            data-ocid="room-grid-section"
          >
            <Card className="shadow-subtle h-full">
              <CardHeader className="flex-row items-center justify-between border-b border-border pb-4 pt-5 px-5">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Room Status
                </CardTitle>
                {hasMoreRooms && (
                  <SectionLink
                    label={`View all ${rooms.length} rooms`}
                    onClick={() => navigate({ to: "/rooms" })}
                  />
                )}
              </CardHeader>
              <CardContent className="p-4">
                {roomsLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].map(
                      (k) => (
                        <Skeleton
                          key={`room-skel-${k}`}
                          className="h-20 rounded-lg"
                        />
                      ),
                    )}
                  </div>
                ) : displayRooms.length === 0 ? (
                  <EmptyState
                    icon={<Building2 className="w-6 h-6" />}
                    title="No rooms added yet"
                    description="Add rooms to start accepting bookings."
                    action={{
                      label: "Manage Rooms",
                      onClick: () => navigate({ to: "/rooms" }),
                      dataOcid: "room-grid-manage-btn",
                    }}
                    className="py-10"
                  />
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {displayRooms.map((room) => (
                      <RoomCard
                        key={room.id.toString()}
                        room={room}
                        onClick={() => navigate({ to: "/rooms" })}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Right column: check-in + checkout panels */}
          <div className="flex flex-col gap-6">
            {/* Today's Check-ins */}
            <section
              aria-label="Today's check-ins"
              data-ocid="checkins-section"
            >
              <Card className="shadow-subtle">
                <CardHeader className="flex-row items-center justify-between border-b border-border pb-4 pt-5 px-5">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Today's Check-ins
                    {!bookingsLoading && (
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        ({todayCheckIns.length})
                      </span>
                    )}
                  </CardTitle>
                  <SectionLink
                    label="All bookings"
                    onClick={() => navigate({ to: "/bookings" })}
                  />
                </CardHeader>
                <CardContent className="p-0">
                  {bookingsLoading ? (
                    <div className="p-4 space-y-2">
                      {["a", "b", "c"].map((k) => (
                        <Skeleton
                          key={`ci-skel-${k}`}
                          className="h-12 rounded-md"
                        />
                      ))}
                    </div>
                  ) : todayCheckIns.length === 0 ? (
                    <EmptyState
                      icon={<CalendarCheck className="w-5 h-5" />}
                      title="No check-ins today"
                      description="Guests checking in today will appear here."
                      className="py-8"
                    />
                  ) : (
                    <div data-ocid="checkins-list">
                      {todayCheckIns.slice(0, 6).map((booking) => (
                        <CheckInRow
                          key={booking.id.toString()}
                          booking={booking}
                          roomMap={roomMap}
                          onClick={() =>
                            navigate({
                              to: "/bookings/$id",
                              params: { id: booking.id.toString() },
                            })
                          }
                        />
                      ))}
                      {todayCheckIns.length > 6 && (
                        <div className="px-4 py-3 text-center">
                          <SectionLink
                            label={`+${todayCheckIns.length - 6} more`}
                            onClick={() => navigate({ to: "/bookings" })}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Upcoming Checkouts */}
            <section
              aria-label="Upcoming checkouts"
              data-ocid="checkouts-section"
            >
              <Card className="shadow-subtle">
                <CardHeader className="flex-row items-center justify-between border-b border-border pb-4 pt-5 px-5">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Upcoming Checkouts
                    {!bookingsLoading && (
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        ({upcomingCheckouts.length})
                      </span>
                    )}
                  </CardTitle>
                  <SectionLink
                    label="Checkout"
                    onClick={() => navigate({ to: "/checkout" })}
                  />
                </CardHeader>
                <CardContent className="p-0">
                  {bookingsLoading ? (
                    <div className="p-4 space-y-2">
                      {["a", "b", "c"].map((k) => (
                        <Skeleton
                          key={`co-skel-${k}`}
                          className="h-12 rounded-md"
                        />
                      ))}
                    </div>
                  ) : upcomingCheckouts.length === 0 ? (
                    <EmptyState
                      icon={<CalendarX className="w-5 h-5" />}
                      title="No checkouts due"
                      description="Guests due today or tomorrow will appear here."
                      className="py-8"
                    />
                  ) : (
                    <div data-ocid="checkouts-list">
                      {upcomingCheckouts.slice(0, 6).map((booking) => (
                        <CheckoutRow
                          key={booking.id.toString()}
                          booking={booking}
                          roomMap={roomMap}
                          onClick={() =>
                            navigate({
                              to: "/checkout/$bookingId",
                              params: { bookingId: booking.id.toString() },
                            })
                          }
                        />
                      ))}
                      {upcomingCheckouts.length > 6 && (
                        <div className="px-4 py-3 text-center">
                          <SectionLink
                            label={`+${upcomingCheckouts.length - 6} more`}
                            onClick={() => navigate({ to: "/checkout" })}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
