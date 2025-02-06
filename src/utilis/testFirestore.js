import { db } from '../firebase'; 
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Function to store booking data in Firestore
export const storeBookingData = async (bookingData) => {
  try {
    // Add a new document to the bookings collection with a default status of 'pending'
    const bookingWithStatus = {
      ...bookingData,
      status: 'pending', // Add the status field with a default value
    };

    const docRef = await addDoc(collection(db, 'bookings'), bookingWithStatus);
    console.log('Booking stored with ID: ', docRef.id);
  } catch (e) {
    console.error('Error storing booking data: ', e);
  }
};

// Fetch bookings from Firestore
export const fetchBookings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'bookings'));
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings: ', error);
    return [];
  }
};

// Function to update booking status in Firestore
export const updateBookingStatus = async (bookingId, newStatus) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, { status: newStatus });
    console.log('Booking status updated to: ', newStatus);
  } catch (e) {
    console.error('Error updating booking status: ', e);
  }
};

// Function to delete booking data from Firestore
export const deleteBookingData = async (bookingId) => {
  try {
    await deleteDoc(doc(db, 'bookings', bookingId));
    console.log('Booking deleted with ID: ', bookingId);
  } catch (e) {
    console.error('Error deleting booking: ', e);
  }
};
