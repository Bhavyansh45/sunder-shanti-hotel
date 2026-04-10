import type { backendInterface } from "../backend";
import {
  BookingStatus,
  PaymentMethod,
  PaymentStatus,
  RoomStatus,
  RoomType,
  UserRole,
} from "../backend";

const NOW = BigInt(Date.now()) * BigInt(1_000_000);
const DAY = BigInt(86_400_000_000_000);

const sampleRooms = [
  {
    id: BigInt(1),
    number: "101",
    roomType: RoomType.Single,
    pricePerDay: 1500,
    status: RoomStatus.Available,
    createdAt: NOW - DAY * BigInt(30),
  },
  {
    id: BigInt(2),
    number: "102",
    roomType: RoomType.Double,
    pricePerDay: 2500,
    status: RoomStatus.Occupied,
    createdAt: NOW - DAY * BigInt(30),
  },
  {
    id: BigInt(3),
    number: "201",
    roomType: RoomType.Deluxe,
    pricePerDay: 3500,
    status: RoomStatus.Available,
    createdAt: NOW - DAY * BigInt(30),
  },
  {
    id: BigInt(4),
    number: "202",
    roomType: RoomType.AcDeluxe,
    pricePerDay: 4500,
    status: RoomStatus.Maintenance,
    createdAt: NOW - DAY * BigInt(30),
  },
  {
    id: BigInt(5),
    number: "301",
    roomType: RoomType.AcSingle,
    pricePerDay: 2000,
    status: RoomStatus.Available,
    createdAt: NOW - DAY * BigInt(30),
  },
  {
    id: BigInt(6),
    number: "302",
    roomType: RoomType.AcDouble,
    pricePerDay: 3000,
    status: RoomStatus.Occupied,
    createdAt: NOW - DAY * BigInt(30),
  },
];

const sampleBookings = [
  {
    id: BigInt(1),
    guestName: "Rajesh Kumar",
    guestPhone: "9876543210",
    guestIdProof: "AADHAR-1234-5678",
    roomId: BigInt(2),
    checkInDate: NOW - DAY * BigInt(2),
    expectedCheckOutDate: NOW + DAY * BigInt(3),
    actualCheckOutDate: undefined,
    advancePayment: 2500,
    pricePerDay: 2500,
    status: BookingStatus.Active,
    createdAt: NOW - DAY * BigInt(2),
    createdBy: { toText: () => "admin" } as any,
  },
  {
    id: BigInt(2),
    guestName: "Priya Sharma",
    guestPhone: "9123456789",
    guestIdProof: undefined,
    roomId: BigInt(6),
    checkInDate: NOW - DAY * BigInt(1),
    expectedCheckOutDate: NOW + DAY * BigInt(2),
    actualCheckOutDate: undefined,
    advancePayment: 3000,
    pricePerDay: 3000,
    status: BookingStatus.Active,
    createdAt: NOW - DAY * BigInt(1),
    createdBy: { toText: () => "staff1" } as any,
  },
  {
    id: BigInt(3),
    guestName: "Amit Verma",
    guestPhone: "9988776655",
    guestIdProof: "PAN-ABCDE1234F",
    roomId: BigInt(1),
    checkInDate: NOW - DAY * BigInt(5),
    expectedCheckOutDate: NOW - DAY * BigInt(1),
    actualCheckOutDate: NOW - DAY * BigInt(1),
    advancePayment: 1500,
    pricePerDay: 1500,
    status: BookingStatus.CheckedOut,
    createdAt: NOW - DAY * BigInt(5),
    createdBy: { toText: () => "admin" } as any,
  },
];

const sampleInvoices = [
  {
    id: BigInt(1),
    bookingId: BigInt(3),
    roomCharges: 6000,
    extraCharges: 500,
    discount: 200,
    advancePaid: 1500,
    totalAmount: 6300,
    dueAmount: 4800,
    paymentStatus: PaymentStatus.Paid,
    paymentMethod: PaymentMethod.Cash,
    createdAt: NOW - DAY * BigInt(1),
  },
];

const sampleUsers = [
  {
    principal: { toText: () => "admin-principal" } as any,
    name: "Admin User",
    email: "admin@sunderShanti.com",
    role: UserRole.Admin,
    isActive: true,
    createdAt: NOW - DAY * BigInt(60),
  },
  {
    principal: { toText: () => "staff-principal" } as any,
    name: "Reception Staff",
    email: "staff@sunderShanti.com",
    role: UserRole.Staff,
    isActive: true,
    createdAt: NOW - DAY * BigInt(30),
  },
];

export const mockBackend: backendInterface = {
  getRooms: async () => sampleRooms,
  getRoomById: async (id) => sampleRooms.find((r) => r.id === id) ?? null,
  getAvailableRooms: async () =>
    sampleRooms.filter((r) => r.status === RoomStatus.Available),
  addRoom: async (_number, _roomType, _pricePerDay) => ({
    __kind__: "ok",
    ok: sampleRooms[0],
  }),
  updateRoom: async (_id, _number, _roomType, _pricePerDay, _status) => ({
    __kind__: "ok",
    ok: sampleRooms[0],
  }),
  deleteRoom: async (_id) => ({ __kind__: "ok", ok: null }),

  getBookings: async (_status) =>
    _status ? sampleBookings.filter((b) => b.status === _status) : sampleBookings,
  getBookingById: async (id) =>
    sampleBookings.find((b) => b.id === id) ?? null,
  getActiveBookings: async () =>
    sampleBookings.filter((b) => b.status === BookingStatus.Active),
  getBookingHistory: async (_start, _end) => sampleBookings,
  createBooking: async (
    guestName,
    guestPhone,
    _guestIdProof,
    roomId,
    checkInDate,
    expectedCheckOutDate,
    advancePayment
  ) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(99),
      guestName,
      guestPhone,
      guestIdProof: undefined,
      roomId,
      checkInDate,
      expectedCheckOutDate,
      actualCheckOutDate: undefined,
      advancePayment,
      pricePerDay: 2500,
      status: BookingStatus.Active,
      createdAt: NOW,
      createdBy: { toText: () => "admin" } as any,
    },
  }),
  updateBooking: async (_id, _checkOut, _advance) => ({
    __kind__: "ok",
    ok: sampleBookings[0],
  }),
  cancelBooking: async (_id, _reason) => ({ __kind__: "ok", ok: null }),

  checkout: async (_bookingId, _checkOut, _extra, _discount, _method, _paid) => ({
    __kind__: "ok",
    ok: sampleInvoices[0],
  }),

  getInvoice: async (bookingId) =>
    sampleInvoices.find((i) => i.bookingId === bookingId) ?? null,
  getInvoices: async () => sampleInvoices,
  getInvoicesByDateRange: async (_start, _end) => sampleInvoices,
  getPendingInvoices: async () =>
    sampleInvoices.filter(
      (i) =>
        i.paymentStatus === PaymentStatus.Pending ||
        i.paymentStatus === PaymentStatus.PartiallyPaid
    ),

  getDashboardStats: async () => ({
    totalRooms: BigInt(6),
    availableRooms: BigInt(3),
    occupiedRooms: BigInt(2),
    maintenanceRooms: BigInt(1),
    todayCheckIns: BigInt(2),
    todayRevenue: 5500,
  }),
  getDailyRevenue: async (_date) => 5500,

  getUsers: async () => sampleUsers,
  getUserRole: async (_principal) => UserRole.Admin,
  isAdminQuery: async (_principal) => true,
  addUser: async (_principal, name, email, role) => ({
    __kind__: "ok",
    ok: {
      principal: { toText: () => "new-user" } as any,
      name,
      email,
      role,
      isActive: true,
      createdAt: NOW,
    },
  }),
  updateUserRole: async (_principal, _role) => ({ __kind__: "ok", ok: null }),
  deactivateUser: async (_principal) => ({ __kind__: "ok", ok: null }),
};
