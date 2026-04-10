import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type Result__3 = {
    __kind__: "ok";
    ok: Invoice;
} | {
    __kind__: "err";
    err: string;
};
export type Result__1 = {
    __kind__: "ok";
    ok: Room;
} | {
    __kind__: "err";
    err: string;
};
export interface Room {
    id: bigint;
    status: RoomStatus;
    createdAt: Timestamp;
    pricePerDay: number;
    number: string;
    roomType: RoomType;
}
export type Result_1 = {
    __kind__: "ok";
    ok: StaffUser;
} | {
    __kind__: "err";
    err: string;
};
export interface Invoice {
    id: bigint;
    paymentStatus: PaymentStatus;
    paymentMethod?: PaymentMethod;
    bookingId: bigint;
    roomCharges: number;
    createdAt: bigint;
    totalAmount: number;
    advancePaid: number;
    discount: number;
    extraCharges: number;
    dueAmount: number;
}
export interface DashboardStats {
    occupiedRooms: bigint;
    availableRooms: bigint;
    todayCheckIns: bigint;
    todayRevenue: number;
    maintenanceRooms: bigint;
    totalRooms: bigint;
}
export type UserId = Principal;
export interface StaffUser {
    principal: UserId;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    isActive: boolean;
    email: string;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type Result__2 = {
    __kind__: "ok";
    ok: Booking;
} | {
    __kind__: "err";
    err: string;
};
export interface Booking {
    id: bigint;
    status: BookingStatus;
    guestIdProof?: string;
    createdAt: Timestamp;
    createdBy: UserId;
    checkInDate: Timestamp;
    guestName: string;
    pricePerDay: number;
    expectedCheckOutDate: Timestamp;
    actualCheckOutDate?: Timestamp;
    advancePayment: number;
    guestPhone: string;
    roomId: bigint;
}
export enum BookingStatus {
    Active = "Active",
    Cancelled = "Cancelled",
    CheckedOut = "CheckedOut"
}
export enum PaymentMethod {
    UPI = "UPI",
    Cash = "Cash"
}
export enum PaymentStatus {
    PartiallyPaid = "PartiallyPaid",
    Paid = "Paid",
    Pending = "Pending"
}
export enum RoomStatus {
    Available = "Available",
    Maintenance = "Maintenance",
    Occupied = "Occupied"
}
export enum RoomType {
    AcDouble = "AcDouble",
    AcDeluxe = "AcDeluxe",
    Double = "Double",
    AcSingle = "AcSingle",
    Deluxe = "Deluxe",
    Single = "Single"
}
export enum UserRole {
    Staff = "Staff",
    Admin = "Admin"
}
export interface backendInterface {
    addRoom(number: string, roomType: RoomType, pricePerDay: number): Promise<Result__1>;
    addUser(principal: Principal, name: string, email: string, role: UserRole): Promise<Result_1>;
    cancelBooking(id: bigint, reason: string): Promise<Result>;
    checkout(bookingId: bigint, actualCheckOutDate: bigint, extraCharges: number, discount: number, paymentMethod: PaymentMethod, amountPaid: number): Promise<Result__3>;
    createBooking(guestName: string, guestPhone: string, guestIdProof: string | null, roomId: bigint, checkInDate: bigint, expectedCheckOutDate: bigint, advancePayment: number): Promise<Result__2>;
    deactivateUser(principal: Principal): Promise<Result>;
    deleteRoom(id: bigint): Promise<Result>;
    getActiveBookings(): Promise<Array<Booking>>;
    getAvailableRooms(): Promise<Array<Room>>;
    getBookingById(id: bigint): Promise<Booking | null>;
    getBookingHistory(startDate: bigint | null, endDate: bigint | null): Promise<Array<Booking>>;
    getBookings(status: BookingStatus | null): Promise<Array<Booking>>;
    getDailyRevenue(date: bigint): Promise<number>;
    getDashboardStats(): Promise<DashboardStats>;
    getInvoice(bookingId: bigint): Promise<Invoice | null>;
    getInvoices(): Promise<Array<Invoice>>;
    getInvoicesByDateRange(startDate: bigint, endDate: bigint): Promise<Array<Invoice>>;
    getPendingInvoices(): Promise<Array<Invoice>>;
    getRoomById(id: bigint): Promise<Room | null>;
    getRooms(): Promise<Array<Room>>;
    getUserRole(principal: Principal): Promise<UserRole | null>;
    getUsers(): Promise<Array<StaffUser>>;
    isAdminQuery(principal: Principal): Promise<boolean>;
    updateBooking(id: bigint, expectedCheckOutDate: bigint | null, advancePayment: number | null): Promise<Result__2>;
    updateRoom(id: bigint, number: string | null, roomType: RoomType | null, pricePerDay: number | null, status: RoomStatus | null): Promise<Result__1>;
    updateUserRole(principal: Principal, role: UserRole): Promise<Result>;
}
