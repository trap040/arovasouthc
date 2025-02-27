// src/components/BookingSection.tsx

"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchRooms, createBooking } from '../utilis/firebaseUtils';
import { Room } from '../types/room';

interface BookingFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  nationality: string;
  idNumber: string;
  specialRequests: string;
  adults: string;
  children: string;
  acceptTerms: boolean;
}

const BookingSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get query parameters
  const roomId = searchParams.get('roomId');
  const checkInStr = searchParams.get('checkIn');
  const checkOutStr = searchParams.get('checkOut');
  const adultsParam = searchParams.get('adults') || "1";
  const childrenParam = searchParams.get('children') || "0";

  // Parse dates from query parameters
  const checkInDate = checkInStr ? new Date(checkInStr) : null;
  const checkOutDate = checkOutStr ? new Date(checkOutStr) : null;

  // State for selected room and booking info
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Form state
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    nationality: "",
    idNumber: "",
    specialRequests: "",
    adults: adultsParam,
    children: childrenParam,
    acceptTerms: false
  });

  // Fetch room data
  useEffect(() => {
    const loadRoomData = async () => {
      if (!roomId) {
        setError("No room selected. Please go back and select a room.");
        setIsLoading(false);
        return;
      }

      if (!checkInDate || !checkOutDate) {
        setError("Invalid dates. Please go back and select valid dates.");
        setIsLoading(false);
        return;
      }

      try {
        const rooms = await fetchRooms();
        const room = rooms.find(r => r.id === roomId);
        
        if (!room) {
          setError("Selected room not found. Please try again.");
          setIsLoading(false);
          return;
        }

        setSelectedRoom(room);
        
        // Calculate total nights and price
        const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        setTotalNights(nights);
        setTotalPrice(room.price * nights);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading room data:", error);
        setError("Failed to load room data. Please try again.");
        setIsLoading(false);
      }
    };

    loadRoomData();
  }, [roomId, checkInDate, checkOutDate]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

// Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.fullName || !formData.phoneNumber) {
    setError("Please fill in required fields.");
    return;
  }

  if (!formData.acceptTerms) {
    setError("Please accept terms and conditions.");
    return;
  }

  setIsSubmitting(true);
  setError("");

  try {
    const bookingData = {
      customerName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      gender: formData.gender,
      nationality: formData.nationality,
      idNumber: formData.idNumber,
      checkInDate: checkInDate?.toISOString(),
      checkOutDate: checkOutDate?.toISOString(),
      adults: parseInt(formData.adults),
      children: parseInt(formData.children),
      rooms: [roomId],
      roomDetails: {
        id: selectedRoom?.id,
        name: selectedRoom?.name,
        price: selectedRoom?.price,
        imageURL: selectedRoom?.imageURL
      },
      status: "confirmed",
      specialRequests: formData.specialRequests,
      totalAmount: totalPrice,
      totalNights: totalNights,
      paymentStatus: "pending",
      bookingDate: new Date().toISOString(),
    };

    // Create the booking in Firebase
    const bookingId = await createBooking(bookingData);
    
    // Update the path to match your folder structure
    router.push(`/dashboard/bookings/booking-confirmation?bookingId=${bookingId}`);
  } catch (error) {
    console.error("Error creating booking:", error);
    setError("Failed to create booking. Please try again.");
    setIsSubmitting(false);
  }
};

  // Format date to string
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return date.toLocaleDateString("en-US", {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 px-3 bg-booking-image bg-center bg-cover bg-no-repeat">
        <div className="container max-w-[1200px] mx-auto text-center">
          <div className="text-white text-lg">Loading booking information...</div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && !selectedRoom) {
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
          Complete Your Booking
        </h2>
        <div className="flex items-center justify-center">
          <Image src="/decorated-pattern.svg" alt="decorated pattern" width={500} height={500} />
        </div>

        {/* Room Summary */}
        {selectedRoom && (
          <div className="my-8 max-w-[824px] mx-auto bg-black bg-opacity-50 p-6 rounded">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={selectedRoom.imageURL}
                  alt={selectedRoom.name}
                  className="w-full h-48 object-cover rounded"
                />
              </div>
              <div className="md:w-2/3 text-white">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-gilda">{selectedRoom.name}</h3>
                    <p className="text-sm opacity-90">{selectedRoom.category} • {selectedRoom.type}</p>
                  </div>
                  <div className="text-xl font-bold">${selectedRoom.price}<span className="text-sm">/night</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm opacity-70">Check-in</p>
                    <p className="font-medium">{formatDate(checkInDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Check-out</p>
                    <p className="font-medium">{formatDate(checkOutDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Guests</p>
                    <p className="font-medium">{formData.adults} Adults, {formData.children} Children</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Stay</p>
                    <p className="font-medium">{totalNights} {totalNights === 1 ? 'Night' : 'Nights'}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedRoom.amenities?.slice(0, 4).map((amenity, index) => (
                    <span key={index} className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                  {selectedRoom.amenities && selectedRoom.amenities.length > 4 && (
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                      +{selectedRoom.amenities.length - 4} more
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                  <div className="flex justify-between text-lg">
                    <span>Total Price:</span>
                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="my-8 max-w-[824px] mx-auto">
         {error && (
            <div className="bg-red-500 bg-opacity-70 text-white p-3 rounded mb-6 text-center">
              {error}
            </div>
         )}
  
         <div className="my-3">
           <input
             type="text"
             name="fullName"
             value={formData.fullName}
             onChange={handleInputChange}
             className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full"
             placeholder="Full Name *"
             required
           />
         </div>
  
         <div className="grid md:grid-cols-2 md:my-3 md:gap-x-10">
           <input
             type="tel"
             name="phoneNumber"
             value={formData.phoneNumber}
             onChange={handleInputChange}
             className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full my-3"
             placeholder="Phone Number *"
             required
           />
            <input
             type="email"
             name="email"
             value={formData.email}
             onChange={handleInputChange}
             className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full my-3"
             placeholder="Email Address"
           />
         </div>
  
         <div className="grid md:grid-cols-2 md:my-3 md:gap-x-10">
           <div className="my-3">
             <select
               name="gender"
               value={formData.gender}
               onChange={handleInputChange}
               className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full appearance-none"
               required
             >
               <option value="" disabled className="text-gray-700">Select Gender *</option>
               <option value="male" className="text-gray-700">Male</option>
               <option value="female" className="text-gray-700">Female</option>
               <option value="other" className="text-gray-700">Other</option>
               <option value="prefer-not-to-say" className="text-gray-700">Prefer not to say</option>
             </select>
           </div>
           <div className="my-3">
             <input
               type="text"
               name="nationality"
               value={formData.nationality}
               onChange={handleInputChange}
               className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full"
               placeholder="Nationality *"
               required
             />
           </div>
         </div>
  
         <div className="my-3">
           <input
             type="text"
             name="idNumber"
             value={formData.idNumber}
             onChange={handleInputChange}
             className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full"
             placeholder="ID/Passport Number *"
             required
           />
         </div>
  
         <div className="my-3">
           <textarea
             name="specialRequests"
             value={formData.specialRequests}
              onChange={handleInputChange}
             className="outline-none py-4 px-5 bg-transparent caret-white text-white text-lg tracking-[.04em] font-light font-barlow placeholder:text-white border-white border-solid border-b-[1px] w-full h-32 resize-none"
              placeholder="Special Requests (optional)"
            />
          </div>
  
          <div className="my-6">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              <span className="text-sm">
               I accept the <a href="#" className="underline">terms and conditions</a> and the <a href="#" className="underline">privacy policy</a>
             </span>
           </label>
         </div>
       
         <div className="flex items-center justify-center">
           <button
             type="submit"
             disabled={isSubmitting}
             className="bg-white font-barlow px-4 min-w-[158px] min-h-[48px] inline-flex items-center justify-center uppercase text-eerie-black transition duration-300 ease-in-out hover:bg-eerie-black hover:text-white mt-8 tracking-widest disabled:opacity-70"
           >
             {isSubmitting ? "Processing..." : "Complete Booking"}
           </button>
         </div>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;