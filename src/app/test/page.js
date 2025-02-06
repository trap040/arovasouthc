"use client"
import { useEffect } from 'react';
import { storeBookingData } from '../../utilis/testFirestore'; 

const TestFirestore = () => {
  useEffect(() => {
    fetchBookings(); 
  }, []);

  return ( 
    <div>
      <h1>Test Firestore</h1>
      <p>Check your console for the booking data!</p>
    </div>
  );
};

export default TestFirestore;
