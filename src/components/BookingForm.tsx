// src/components/BookingForm.tsx

"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchRooms } from "../utilis/firebaseUtils";
import { Room } from "../types/room";

interface AvailableRoom extends Room {
  totalCapacity: number;
}

const BookingForm = () => {
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState<string>("1");
  const [children, setChildren] = useState<string>("0");
  const [error, setError] = useState<string>("");
  const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showRooms, setShowRooms] = useState<boolean>(false);

  // Generate options for capacity selection
  const capacityOptions = {
    adults: Array.from({ length: 6 }, (_, i) => i + 1),
    children: Array.from({ length: 5 }, (_, i) => i)
  };

  // Check room availability
  const handleCheckAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (!checkInDate || !checkOutDate) {
      setError("Please select check-in and check-out dates");
      return;
    }

    if (checkOutDate <= checkInDate) {
      setError("Check-out date must be after check-in date");
      return;
    }

    const totalGuests = parseInt(adults) + parseInt(children);
    if (totalGuests > 6) {
      setError("Maximum capacity is 6 guests per room");
      return;
    }

    try {
      setIsLoading(true);
      // Fetch available rooms
      const allRooms = await fetchRooms();
      
      // Filter rooms based on:
      // 1. Status (available only)
      // 2. Capacity (must accommodate total guests)
      const available = allRooms
        .filter(room => 
          room.status === 'available' && 
          room.capacity >= totalGuests
        )
        .map(room => ({
          ...room,
          totalCapacity: room.capacity
        }));

      setAvailableRooms(available);
      setShowRooms(true);
      setError("");
    } catch (error) {
      console.error("Error checking room availability:", error);
      setError("Error checking room availability");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle room selection
  const handleRoomSelect = (roomId: string) => {
    // Update the path to match your folder structure
    router.push(`/dashboard/bookings/booking-details?roomId=${roomId}&checkIn=${checkInDate?.toISOString()}&checkOut=${checkOutDate?.toISOString()}&adults=${adults}&children=${children}`);
  };

  return (
    <div className="font-barlow mt-16">
      {!showRooms ? (
        // Initial Search Form
        <form onSubmit={handleCheckAvailability} className="bg-nero w-full grid sm:grid-cols-2 lg:grid-cols-5">
          {error && (
            <div className="col-span-full text-red-500 text-center bg-red-50 border border-red-200 p-2">
              {error}
            </div>
          )}

          {/* Check-in Date */}
          <div className="flex items-center justify-between px-3 py-4 border">
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              placeholderText="Check In"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              className="placeholder:text-white bg-nero placeholder:uppercase text-sm outline-none border-none w-full"
            />
            <span className="cursor-pointer">
              <Image src="/icons/calendar.svg" width={20} height={20} alt="calendar" />
            </span>
          </div>

          {/* Check-out Date */}
          <div className="flex items-center justify-between px-3 py-4 border">
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              placeholderText="Check Out"
              dateFormat="dd/MM/yyyy"
              minDate={checkInDate ? new Date(checkInDate.getTime() + 86400000) : new Date()}
              className="placeholder:text-white bg-nero placeholder:uppercase text-sm outline-none border-none w-full"
            />
            <span className="cursor-pointer">
              <Image src="/icons/calendar.svg" width={20} height={20} alt="calendar" />
            </span>
          </div>
           

          {/* Adults */}
          <div className="px-2 py-4 border ">
            <select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="min-w-full uppercase text-white bg-nero outline-none"
            >
              <option disabled value="">Adults</option>
              {capacityOptions.adults.map(num => (
                <option key={`adult-${num}`} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Children */}
          <div className="px-2 py-4 border">
            <select
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className="min-w-full uppercase text-white bg-nero outline-none"
            >
              <option disabled value="">Children</option>
              {capacityOptions.children.map(num => (
                <option key={`child-${num}`} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Check Availability Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-lion font-barlow h-full min-h-[52px] flex items-center justify-center uppercase text-white transition duration-300 ease-in-out hover:bg-lion-dark disabled:opacity-50"
          >
            {isLoading ? "Checking..." : "Check Availability"}
          </button>
        </form>
      ) : (
        // Available Rooms Display
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-gilda text-lion">Available Rooms</h2>
            <button
              onClick={() => setShowRooms(false)}
              className="text-lion hover:text-lion-dark"
            >
              ← Back to Search
            </button>
          </div>

          {availableRooms.length === 0 ? (
            <div className="bg-light-gray p-8 text-center rounded">
              <h3 className="text-lg font-bold mb-2">No Available Rooms</h3>
              <p>We couldn&apos;t find any rooms matching your criteria for the selected dates.</p>
              <p className="mt-2">Please try different dates or guest count.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableRooms.map((room) => (
                <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-48 w-full">
                    <Image 
                      src={room.imageURL}
                      alt={room.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {room.category && (
                      <div className="absolute top-2 left-2 bg-lion text-white px-2 py-1 rounded text-xs uppercase">
                        {room.category}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{room.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{room.type}</p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-700">Capacity:</span>
                      <span className="flex items-center">
                        {Array.from({ length: room.totalCapacity }).map((_, i) => (
                          <span key={i} className="text-lion">👤</span>
                        ))}
                      </span>
                    </div>
                    
                    <p className="text-sm mb-4 line-clamp-2">{room.description}</p>
                    
                    {/* Amenities */}
                    {room.amenities && room.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {room.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="text-xs bg-light-gray px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                        {room.amenities.length > 3 && (
                          <span className="text-xs bg-light-gray px-2 py-1 rounded">
                            +{room.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-lion font-bold text-xl">${room.price}<span className="text-sm text-gray-600">/night</span></div>
                      <button
                        onClick={() => handleRoomSelect(room.id)}
                        className="bg-lion text-white px-4 py-2 rounded hover:bg-lion-dark"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingForm;