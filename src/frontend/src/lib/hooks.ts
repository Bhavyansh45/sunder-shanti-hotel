import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor as useCaffeineActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { BookingStatus, UserRole } from "../backend";

function useActor() {
  return useCaffeineActor(createActor);
}

export function useAuth() {
  const { identity, loginStatus, login, clear, isInitializing } =
    useInternetIdentity();
  const isAuthenticated = loginStatus === "success" && !!identity;
  const principal = identity?.getPrincipal() ?? null;
  return {
    isAuthenticated,
    identity,
    login,
    logout: clear,
    principal,
    loginStatus,
    isInitializing,
  };
}

export function useUserRole() {
  const { actor, isFetching } = useActor();
  const { principal } = useAuth();
  return useQuery<UserRole | null>({
    queryKey: ["userRole", principal?.toText()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getUserRole(principal);
    },
    enabled: !!actor && !isFetching && !!principal,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  const { principal } = useAuth();
  return useQuery<boolean>({
    queryKey: ["isAdmin", principal?.toText()],
    queryFn: async () => {
      if (!actor || !principal) return false;
      return actor.isAdminQuery(principal);
    },
    enabled: !!actor && !isFetching && !!principal,
    initialData: false,
  });
}

export function useRooms() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRooms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAvailableRooms() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["rooms", "available"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAvailableRooms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBookings(status?: BookingStatus | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["bookings", status ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookings(status ?? null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBooking(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["booking", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getBookingById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useInvoice(bookingId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["invoice", bookingId?.toString()],
    queryFn: async () => {
      if (!actor || bookingId === null) return null;
      return actor.getInvoice(bookingId);
    },
    enabled: !!actor && !isFetching && bookingId !== null,
  });
}

export function useInvoices() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInvoices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDashboardStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useUsers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useActiveBookings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["bookings", "active"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePendingInvoices() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["invoices", "pending"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingInvoices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBookingHistory(
  startDate?: bigint | null,
  endDate?: bigint | null,
) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["bookingHistory", startDate?.toString(), endDate?.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookingHistory(startDate ?? null, endDate ?? null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDailyRevenue(date: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["dailyRevenue", date?.toString()],
    queryFn: async () => {
      if (!actor || date === null) return 0;
      return actor.getDailyRevenue(date);
    },
    enabled: !!actor && !isFetching && date !== null,
  });
}

export function useInvoicesByDateRange(
  startDate: bigint | null,
  endDate: bigint | null,
) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["invoices", "range", startDate?.toString(), endDate?.toString()],
    queryFn: async () => {
      if (!actor || startDate === null || endDate === null) return [];
      return actor.getInvoicesByDateRange(startDate, endDate);
    },
    enabled: !!actor && !isFetching && startDate !== null && endDate !== null,
  });
}
