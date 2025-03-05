"use client";

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../../../../firebase'; 

interface BookingData extends DocumentData {
  id: string;
  customerName?: string;
  phoneNumber?: string;
  email?: string;
  gender?: string;
  nationality?: string;
  idNumber?: string;
  checkInDate?: { seconds: number };
  checkOutDate?: { seconds: number };
  bookingDate?: { seconds: number };
  adults?: number;
  children?: number;
  rooms?: string[] | string;
  status?: string;
  specialRequests?: string;
  totalAmount?: number;
  totalNights?: number;
  paymentStatus?: string;
  roomDetails?: {
    id?: string;
    name?: string;
    price?: number;
    imageURL?: string;
  };
}

interface TimestampData {
  seconds: number;
  nanoseconds?: number;
}

// This component uses useSearchParams, so it needs to be wrapped in Suspense
function BookingDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('bookingId');
  
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) {
        setError("Booking ID not found");
        setIsLoading(false);
        return;
      }

      try {
        const bookingRef = doc(db, 'bookings', bookingId);
        const bookingSnapshot = await getDoc(bookingRef);

        if (bookingSnapshot.exists()) {
          setBooking({
            id: bookingSnapshot.id,
            ...bookingSnapshot.data()
          });
        } else {
          setError("Booking not found");
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
        setError("Error fetching booking details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  // Format Firebase Timestamp to string
  const formatTimestamp = (timestamp: TimestampData | undefined) => {
    if (!timestamp) return "N/A";
    // Check if it's a Firestore Timestamp
    if (timestamp.seconds !== undefined) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString("en-US", {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
    // Handle string dates
    return "N/A";
  };

  if (isLoading) {
    return (
      <section className="py-16 px-3 bg-booking-image bg-center bg-cover bg-no-repeat">
        <div className="container max-w-[1200px] mx-auto text-center">
          <div className="text-white text-lg">Loading booking details...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-3 bg-booking-image bg-center bg-cover bg-no-repeat">
        <div className="container max-w-[1200px] mx-auto text-center">
          <div className="bg-black bg-opacity-80 text-white p-4 rounded max-w-[824px] mx-auto">
            <p>{error}</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-white text-gray-500 px-4 py-2 mt-4 rounded"
            >
              Return to Home
            </button>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 px-3 bg-booking-image bg-center bg-cover bg-no-repeat">
      <div className="container max-w-[1200px] mx-auto">
        <h2 className="font-gilda font-normal text-3xl sm:text-[46px] tracking-[.04em] text-center text-white mb-3">
          Booking Confirmed
        </h2>
        <div className="flex items-center justify-center mb-8">
          <Image src="/decorated-pattern.svg" alt="decorated pattern" width={500} height={500} />
        </div>
        
        <div className="max-w-[824px] mx-auto bg-black bg-opacity-50 p-8 rounded">
          <div className="bg-green-500 bg-opacity-20 border border-green-500 rounded-lg p-4 mb-6 text-center">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl text-white font-bold">Thank You for Your Booking!</h3>
            <p className="text-white mt-2">Booking ID: {booking?.id}</p>
          </div>
          
          {booking?.roomDetails && booking.roomDetails.imageURL && (
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="md:w-1/3 relative h-48">
                <Image
                  src={booking.roomDetails.imageURL}
                  alt={booking.roomDetails.name || "Room image"}
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="md:w-2/3 text-white">
                <h3 className="text-2xl font-gilda">{booking.roomDetails.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 my-4">
                  <div>
                    <p className="text-sm opacity-70">Check-in</p>
                    <p className="font-medium">{formatTimestamp(booking.checkInDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Check-out</p>
                    <p className="font-medium">{formatTimestamp(booking.checkOutDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Guests</p>
                    <p className="font-medium">{booking.adults || 0} Adults, {booking.children || 0} Children</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Stay</p>
                    <p className="font-medium">{booking.totalNights} {booking.totalNights === 1 ? 'Night' : 'Nights'}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                  <div className="flex justify-between text-lg">
                    <span>Total Price:</span>
                    <span className="font-bold">${booking.totalAmount ? booking.totalAmount.toFixed(2) : "0.00"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white bg-opacity-10 p-6 rounded">
            <h4 className="text-white text-lg font-bold mb-4">Guest Information</h4>
            
            <div className="grid md:grid-cols-2 gap-4 text-white">
              <div>
                <p className="text-sm opacity-70">Name</p>
                <p className="font-medium">{booking?.customerName}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Phone</p>
                <p className="font-medium">{booking?.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Email</p>
                <p className="font-medium">{booking?.email || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Gender</p>
                <p className="font-medium">{booking?.gender || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Nationality</p>
                <p className="font-medium">{booking?.nationality || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">ID/Passport</p>
                <p className="font-medium">{booking?.idNumber || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Booking Date</p>
                <p className="font-medium">{formatTimestamp(booking?.bookingDate)}</p>
              </div>
            </div>
            
            {booking?.specialRequests && (
              <div className="mt-4 text-white">
                <p className="text-sm opacity-70">Special Requests</p>
                <p className="font-medium">{booking.specialRequests}</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={() => router.push('/')}
              className="bg-white font-barlow px-4 min-w-[158px] min-h-[48px] inline-flex items-center justify-center uppercase text-eerie-black transition duration-300 ease-in-out hover:bg-eerie-black hover:text-white tracking-widest"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main component that wraps BookingDetails with Suspense
const BookingConfirmation = () => {
  return (
    <Suspense fallback={
      <section className="py-16 px-3 bg-booking-image bg-center bg-cover bg-no-repeat">
        <div className="container max-w-[1200px] mx-auto text-center">
          <div className="text-white text-lg">Loading booking details...</div>
        </div>
      </section>
    }>
      <BookingDetails />
    </Suspense>
  );
};

export default BookingConfirmation;