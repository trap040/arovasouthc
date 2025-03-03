// src/utilis/firebaseUtils.ts

import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, Timestamp, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

// Room Interfaces
export interface RoomAmenity {
  id: string;  
  name: string;
  category: string;
  status: 'working' | 'not-working';
  icon?: string;
}

// Current Room interface (matching your existing data)
export interface Room {
  id: string;
  name: string;
  type: string;
  imageURL: string;  // Keeping as string for now
  price: number;
  status: "available" | "occupied" | "maintenance" | "cleaning";
  description: string;
  amenities: string[];  // Keeping as string[] for now
  capacity: number;
}

// Future enhanced Room interface (for later use)
export interface EnhancedRoom {
  id: string;
  name: string;
  roomNumber: string;
  type: string;
  imageURL: string[];
  price: number;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  description: string;
  amenities: RoomAmenity[];
  capacity: {
    adults: number;
    children: number;
  };
  details: {
    size: number;
    floor: number;
    view: string;
    bedConfiguration: string;
  };
}

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
  rooms: string[];
  status: "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled";
  specialRequests?: string;
  totalAmount: number;
  paymentStatus: "pending" | "partial" | "paid";
  notes?: string;
  // Room details for the booking confirmation
  roomDetails?: {
    id: string;
    name: string;
    price: number;
    imageURL: string;
  };
  // Total nights for the stay
  totalNights?: number;
}

// Define a dedicated interface for booking creation data
export interface BookingCreateData {
  customerName: string;
  phoneNumber: string;
  email?: string;
  gender?: string;
  nationality?: string;
  idNumber?: string;
  checkInDate: string | { seconds: number } | undefined;
  checkOutDate: string | { seconds: number } | undefined;
  adults: number;
  children: number;
  rooms: string[];
  status: "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled";
  specialRequests?: string;
  totalAmount: number;
  totalNights?: number;
  paymentStatus: "pending" | "partial" | "paid";
  notes?: string;
  roomDetails?: {
    id?: string;
    name?: string;
    price?: number;
    imageURL?: string;
  };
}

// Room Management Functions
export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const roomsCollection = collection(db, "rooms");
    const roomSnapshot = await getDocs(roomsCollection);
    return roomSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Room[];
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const fetchRoomById = async (roomId: string): Promise<Room | null> => {
  try {
    const roomRef = doc(db, "rooms", roomId);
    const roomSnapshot = await getDoc(roomRef);
    
    if (roomSnapshot.exists()) {
      return {
        id: roomSnapshot.id,
        ...roomSnapshot.data()
      } as Room;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching room:", error);
    throw error;
  }
};

export const addRoom = async (roomData: Omit<Room, 'id'>): Promise<Room> => {
  try {
    const roomsCollection = collection(db, "rooms");
    const docRef = await addDoc(roomsCollection, {
      ...roomData,
      createdAt: Timestamp.now()
    });
    return {
      id: docRef.id,
      ...roomData
    };
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

export const updateRoom = async (roomId: string, roomData: Partial<Room>): Promise<Room> => {
  try {
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, {
      ...roomData,
      updatedAt: Timestamp.now()
    });
    return {
      id: roomId,
      ...roomData
    } as Room;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

export const updateRoomStatus = async (
  roomId: string, 
  status: Room["status"]
): Promise<void> => {
  try {
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, {
      status,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating room status:", error);
    throw error;
  }
};

export const deleteRoom = async (roomId: string): Promise<void> => {
  try {
    const roomRef = doc(db, "rooms", roomId);
    await deleteDoc(roomRef);
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};

// Booking Management Functions
export const fetchBookings = async (): Promise<Booking[]> => {
  try {
    const bookingsCollection = collection(db, "bookings");
    const bookingSnapshot = await getDocs(bookingsCollection);
    return bookingSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Booking[];
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const createBooking = async (bookingData: BookingCreateData): Promise<string> => {
  try {
    const bookingsCollection = collection(db, "bookings");
    
    // Add timestamps for database consistency
    const dataWithTimestamps = {
      ...bookingData,
      createdAt: serverTimestamp(),
      bookingDate: serverTimestamp(),
      // Convert string dates to Firestore timestamps if they're not already
      checkInDate: bookingData.checkInDate ? 
        (typeof bookingData.checkInDate === 'string' ? 
          Timestamp.fromDate(new Date(bookingData.checkInDate)) : 
          bookingData.checkInDate) : 
        null,
      checkOutDate: bookingData.checkOutDate ? 
        (typeof bookingData.checkOutDate === 'string' ? 
          Timestamp.fromDate(new Date(bookingData.checkOutDate)) : 
          bookingData.checkOutDate) : 
        null,
    };
    
    const docRef = await addDoc(bookingsCollection, dataWithTimestamps);
    
    // Update room status to occupied
    if (bookingData.rooms && bookingData.rooms.length > 0) {
      for (const roomId of bookingData.rooms) {
        const roomRef = doc(db, "rooms", roomId);
        await updateDoc(roomRef, {
          status: 'occupied',
          updatedAt: serverTimestamp()
        });
      }
    }
    
    return docRef.id;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const updateBookingStatus = async (
  bookingId: string, 
  status: Booking["status"]
): Promise<void> => {
  try {
    // Get the booking first to access its rooms
    const bookingRef = doc(db, "bookings", bookingId);
    const bookingSnap = await getDoc(bookingRef);
    
    if (!bookingSnap.exists()) {
      throw new Error("Booking not found");
    }
    
    const bookingData = bookingSnap.data() as Booking;
    
    // Update booking status
    await updateDoc(bookingRef, {
      status,
      updatedAt: Timestamp.now()
    });
    
    // If status is "checked-out", update all associated rooms to "available"
    if (status === "checked-out" && bookingData.rooms) {
      const roomIds = Array.isArray(bookingData.rooms) ? bookingData.rooms : [bookingData.rooms];
      
      for (const roomId of roomIds) {
        const roomRef = doc(db, "rooms", roomId);
        await updateDoc(roomRef, {
          status: 'available',
          updatedAt: Timestamp.now()
        });
      }
    }
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

export const getBookingsByDateRange = async (
  startDate: Date,
  endDate: Date
): Promise<Booking[]> => {
  try {
    const bookingsCollection = collection(db, "bookings");
    const bookingSnapshot = await getDocs(bookingsCollection);
    
    // Convert dates to timestamps for comparison
    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);
    
    // Filter bookings by date range
    return bookingSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as Booking)
      .filter(booking => {
        const bookingCheckIn = new Timestamp(booking.checkInDate.seconds, 0);
        const bookingCheckOut = new Timestamp(booking.checkOutDate.seconds, 0);
        
        // A booking overlaps with the date range if:
        // 1. Check-in date falls within the range, or
        // 2. Check-out date falls within the range, or
        // 3. Booking spans the entire range
        return (
          (bookingCheckIn.toMillis() >= startTimestamp.toMillis() && 
           bookingCheckIn.toMillis() <= endTimestamp.toMillis()) ||
          (bookingCheckOut.toMillis() >= startTimestamp.toMillis() && 
           bookingCheckOut.toMillis() <= endTimestamp.toMillis()) ||
          (bookingCheckIn.toMillis() <= startTimestamp.toMillis() && 
           bookingCheckOut.toMillis() >= endTimestamp.toMillis())
        );
      });
  } catch (error) {
    console.error("Error fetching bookings by date range:", error);
    throw error;
  }
};

export const updateBookingPaymentStatus = async (
  bookingId: string,
  paymentStatus: Booking["paymentStatus"]
): Promise<void> => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, {
      paymentStatus,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating booking payment status:", error);
    throw error;
  }
};

export const formatRooms = (rooms: string[] | string | undefined): string => {
  if (Array.isArray(rooms)) {
    return rooms.join(", ");
  }
  if (typeof rooms === 'string') {
    return rooms;
  }
  return 'No rooms specified';
};

