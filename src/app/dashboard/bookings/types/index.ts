// src/app/dashboard/DashboardComponents/Bookings/types/index.ts

export interface Booking {
    id: string;
    customerName: string;
    phoneNumber: string;
    email: string;
    gender?: string;
    nationality?: string;
    idNumber?: string;
    checkInDate: { seconds: number };
    checkOutDate: { seconds: number };
    bookingDate: { seconds: number };
    adults: number;
    children: number;
    rooms: string[] | string | undefined;
    status: "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled";
    specialRequests?: string;
    totalAmount: number;
    paymentStatus: "pending" | "partial" | "paid";
    notes?: string;
    roomDetails?: {
      id: string;
      name: string;
      price: number;
      imageURL: string;
    };
    totalNights?: number;
  }
  
  export interface FilterOptions {
    dateRange: [Date | null, Date | null];
    status: string;
    searchTerm: string;
  }
  
  export type BookingView = "list" | "calendar";