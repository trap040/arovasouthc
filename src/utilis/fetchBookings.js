import { db } from '../firebase'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore';

// Function to fetch all bookings
export const fetchBookings = async () => {
  try {
    const bookingsCollection = collection(db, 'bookings');
    const bookingsSnapshot = await getDocs(bookingsCollection);
    const bookingsList = bookingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return bookingsList;
  } catch (error) {
    console.error('Error fetching bookings: ', error);
    return [];
  }
};
