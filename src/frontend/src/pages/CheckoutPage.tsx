import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { CreditCard, LogOut, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CurrencyDisplay } from "../components/ui/CurrencyDisplay";
import { EmptyState } from "../components/ui/EmptyState";
import { TableSkeleton } from "../components/ui/LoadingSkeleton";
import { PageHeader } from "../components/ui/PageHeader";
import { useActiveBookings, useRooms } from "../lib/hooks";
import type { Booking } from "../lib/types";
import { calcNights, formatDate } from "../lib/utils-hotel";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { data: bookings, isLoading } = useActiveBookings();
  const { data: rooms = [] } = useRooms();
  const [search, setSearch] = useState("");

  const roomMap = useMemo(
    () => new Map(rooms.map((r) => [r.id, r.number])),
    [rooms],
  );

  const filtered = (bookings ?? []).filter((b: Booking) =>
    b.guestName.toLowerCase().includes(search.toLowerCase()),
  );

  function handleCheckout(bookingId: bigint) {
    navigate({
      to: "/checkout/$bookingId",
      params: { bookingId: bookingId.toString() },
    });
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Checkout"
        description="Process guest checkouts and generate invoices"
      />

      <div className="p-6 flex-1">
        {/* Search bar */}
        <div className="mb-5 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              placeholder="Search by guest name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-ocid="checkout-search"
              aria-label="Search active bookings"
            />
          </div>
          {search && (
            <span className="text-sm text-muted-foreground">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <TableSkeleton rows={5} cols={8} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<CreditCard size={32} />}
            title={
              search
                ? `No bookings found for "${search}"`
                : "No active bookings"
            }
            description={
              search
                ? "Try a different guest name."
                : "All guests have checked out."
            }
          />
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-ocid="checkout-table">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Booking ID
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Guest Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Room #
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Check-In
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Expected Check-Out
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Nights
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Est. Total
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((booking: Booking) => {
                    const nights = calcNights(
                      booking.checkInDate,
                      booking.expectedCheckOutDate,
                    );
                    const estimatedTotal = booking.pricePerDay * nights;
                    return (
                      <tr
                        key={booking.id.toString()}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`checkout-row-${booking.id}`}
                      >
                        <td className="py-3.5 px-4">
                          <span className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            #{booking.id.toString()}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-foreground">
                            {booking.guestName}
                          </span>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {booking.guestPhone}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-foreground">
                            {roomMap.get(booking.roomId) ??
                              booking.roomId.toString()}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-foreground">
                          {formatDate(booking.checkInDate)}
                        </td>
                        <td className="py-3.5 px-4 text-foreground">
                          {formatDate(booking.expectedCheckOutDate)}
                        </td>
                        <td className="py-3.5 px-4 text-right tabular-nums font-medium">
                          {nights}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <CurrencyDisplay
                            amount={estimatedTotal}
                            size="sm"
                            className="text-foreground"
                          />
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Button
                            size="sm"
                            onClick={() => handleCheckout(booking.id)}
                            className="gap-1.5"
                            data-ocid={`checkout-btn-${booking.id}`}
                          >
                            <LogOut size={13} />
                            Checkout
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
