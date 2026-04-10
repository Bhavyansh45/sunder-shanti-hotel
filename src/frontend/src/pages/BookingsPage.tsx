import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { CalendarCheck, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { BookingStatus } from "../backend";
import { BookingStatusBadge } from "../components/ui/BookingStatusBadge";
import { CurrencyDisplay } from "../components/ui/CurrencyDisplay";
import { EmptyState } from "../components/ui/EmptyState";
import { TableSkeleton } from "../components/ui/LoadingSkeleton";
import { PageHeader } from "../components/ui/PageHeader";
import { useBookings, useRooms } from "../lib/hooks";
import type { Booking } from "../lib/types";
import { calcNights, formatDate } from "../lib/utils-hotel";

const STATUS_TABS: { label: string; value: BookingStatus | null }[] = [
  { label: "All", value: null },
  { label: "Active", value: BookingStatus.Active },
  { label: "Checked Out", value: BookingStatus.CheckedOut },
  { label: "Cancelled", value: BookingStatus.Cancelled },
];

export default function BookingsPage() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<BookingStatus | null>(null);
  const [search, setSearch] = useState("");

  const { data: bookings = [], isLoading } = useBookings(activeStatus);
  const { data: rooms = [] } = useRooms();

  const roomMap = useMemo(
    () => new Map(rooms.map((r) => [r.id, r.number])),
    [rooms],
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return bookings;
    const q = search.toLowerCase();
    return bookings.filter(
      (b) =>
        b.guestName.toLowerCase().includes(q) ||
        b.guestPhone.toLowerCase().includes(q),
    );
  }, [bookings, search]);

  const handleRowClick = (booking: Booking) => {
    navigate({ to: "/bookings/$id", params: { id: booking.id.toString() } });
  };

  const handleNewBooking = () => navigate({ to: "/bookings/new" });

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        title="Bookings"
        description="Manage all guest bookings"
        action={
          <Button onClick={handleNewBooking} data-ocid="new-booking-btn">
            <Plus size={16} className="mr-1.5" />
            New Booking
          </Button>
        }
      />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div
            className="flex gap-1.5 flex-wrap"
            role="tablist"
            aria-label="Filter bookings by status"
          >
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={activeStatus === tab.value}
                onClick={() => setActiveStatus(tab.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setActiveStatus(tab.value);
                }}
                data-ocid={`status-filter-${tab.label.toLowerCase().replace(" ", "-")}`}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  activeStatus === tab.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <Input
              placeholder="Search by name or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-8"
              data-ocid="bookings-search"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSearch("");
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden flex-1">
          {isLoading ? (
            <TableSkeleton rows={6} cols={8} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<CalendarCheck size={32} />}
              title={
                search ? "No bookings match your search" : "No bookings found"
              }
              description={
                search
                  ? "Try a different name or phone number."
                  : "Create your first booking to get started."
              }
              action={
                !search
                  ? {
                      label: "New Booking",
                      onClick: handleNewBooking,
                      dataOcid: "empty-new-booking-btn",
                    }
                  : undefined
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-ocid="bookings-table">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">
                      Booking ID
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">
                      Guest
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">
                      Room
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">
                      Check-in
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">
                      Check-out
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">
                      Nights
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">
                      Status
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">
                      Est. Amount
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((booking) => (
                    <BookingRow
                      key={booking.id.toString()}
                      booking={booking}
                      roomMap={roomMap}
                      onClick={() => handleRowClick(booking)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!isLoading && filtered.length > 0 && (
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} booking{filtered.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
}

function BookingRow({
  booking,
  roomMap,
  onClick,
}: {
  booking: Booking;
  roomMap: Map<bigint, string>;
  onClick: () => void;
}) {
  const navigate = useNavigate();
  const nights = calcNights(booking.checkInDate, booking.expectedCheckOutDate);
  const estimatedAmount = booking.pricePerDay * nights;
  const isActive = booking.status === BookingStatus.Active;

  const handleCheckout = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate({
      to: "/checkout/$bookingId",
      params: { bookingId: booking.id.toString() },
    });
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate({ to: "/bookings/$id", params: { id: booking.id.toString() } });
  };

  return (
    <tr
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      tabIndex={0}
      data-ocid={`booking-row-${booking.id}`}
      className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
        <Badge variant="outline" className="font-mono text-xs">
          #{booking.id.toString().padStart(4, "0")}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <div className="font-medium text-foreground truncate max-w-[140px]">
          {booking.guestName}
        </div>
        <div className="text-xs text-muted-foreground">
          {booking.guestPhone}
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="font-medium">
          Room {roomMap.get(booking.roomId) ?? booking.roomId.toString()}
        </span>
      </td>
      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
        {formatDate(booking.checkInDate)}
      </td>
      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
        {formatDate(booking.expectedCheckOutDate)}
      </td>
      <td className="px-4 py-3 text-center">
        <span className="text-sm font-medium">{nights}</span>
      </td>
      <td className="px-4 py-3">
        <BookingStatusBadge status={booking.status} />
      </td>
      <td className="px-4 py-3 text-right">
        <CurrencyDisplay amount={estimatedAmount} size="sm" />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleView}
            data-ocid={`booking-view-${booking.id}`}
            className="h-7 px-2 text-xs"
          >
            View
          </Button>
          {isActive && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCheckout}
              data-ocid={`booking-checkout-${booking.id}`}
              className="h-7 px-2 text-xs"
            >
              Checkout
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}
