// src/utilis/firebaseUtils.ts

import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, Timestamp } from "firebase/firestore";
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

export const updateBookingStatus = async (
  bookingId: string, 
  status: Booking["status"]
): Promise<void> => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, {
      status,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
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