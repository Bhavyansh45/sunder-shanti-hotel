import { useActor as useCaffeineActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { PaymentMethod, RoomStatus, RoomType, UserRole } from "../backend";
import { unwrapResult } from "./utils-hotel";

function useActor() {
  return useCaffeineActor(createActor);
}

export function useCreateRoom() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      number: string;
      roomType: RoomType;
      pricePerDay: number;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.addRoom(
        data.number,
        data.roomType,
        data.pricePerDay,
      );
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rooms"] });
      qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useUpdateRoom() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      number?: string | null;
      roomType?: RoomType | null;
      pricePerDay?: number | null;
      status?: RoomStatus | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateRoom(
        data.id,
        data.number ?? null,
        data.roomType ?? null,
        data.pricePerDay ?? null,
        data.status ?? null,
      );
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rooms"] });
      qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useDeleteRoom() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteRoom(id);
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rooms"] });
      qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useCreateBooking() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      guestName: string;
      guestPhone: string;
      guestIdProof: string | null;
      roomId: bigint;
      checkInDate: bigint;
      expectedCheckOutDate: bigint;
      advancePayment: number;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createBooking(
        data.guestName,
        data.guestPhone,
        data.guestIdProof,
        data.roomId,
        data.checkInDate,
        data.expectedCheckOutDate,
        data.advancePayment,
      );
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
      qc.invalidateQueries({ queryKey: ["rooms"] });
      qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useUpdateBooking() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      expectedCheckOutDate?: bigint | null;
      advancePayment?: number | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateBooking(
        data.id,
        data.expectedCheckOutDate ?? null,
        data.advancePayment ?? null,
      );
      return unwrapResult(result);
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["booking", variables.id.toString()] });
      qc.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useCancelBooking() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: bigint; reason: string }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.cancelBooking(data.id, data.reason);
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
      qc.invalidateQueries({ queryKey: ["rooms"] });
      qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useCheckout() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      bookingId: bigint;
      actualCheckOutDate: bigint;
      extraCharges: number;
      discount: number;
      paymentMethod: PaymentMethod;
      amountPaid: number;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.checkout(
        data.bookingId,
        data.actualCheckOutDate,
        data.extraCharges,
        data.discount,
        data.paymentMethod,
        data.amountPaid,
      );
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
      qc.invalidateQueries({ queryKey: ["invoices"] });
      qc.invalidateQueries({ queryKey: ["rooms"] });
      qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useAddUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      principal: Principal;
      name: string;
      email: string;
      role: UserRole;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.addUser(
        data.principal,
        data.name,
        data.email,
        data.role,
      );
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUserRole() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { principal: Principal; role: UserRole }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateUserRole(data.principal, data.role);
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["userRole"] });
      qc.invalidateQueries({ queryKey: ["isAdmin"] });
    },
  });
}

export function useDeactivateUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deactivateUser(principal);
      return unwrapResult(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
