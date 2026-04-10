import type { Principal } from "@icp-sdk/core/principal";
export type {
  Booking,
  DashboardStats,
  Invoice,
  Room,
  StaffUser,
} from "../backend";

export {
  BookingStatus,
  PaymentMethod,
  PaymentStatus,
  RoomStatus,
  RoomType,
  UserRole,
} from "../backend";

export type { Principal };

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  adminOnly?: boolean;
}

export interface CheckoutFormData {
  actualCheckOutDate: Date;
  extraCharges: number;
  discount: number;
  paymentMethod: "Cash" | "UPI";
  amountPaid: number;
}

export interface CreateRoomFormData {
  number: string;
  roomType: string;
  pricePerDay: number;
}

export interface CreateBookingFormData {
  guestName: string;
  guestPhone: string;
  guestIdProof?: string;
  roomId: bigint;
  checkInDate: Date;
  expectedCheckOutDate: Date;
  advancePayment: number;
}
