"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { fetchRooms } from "../utilis/firebaseUtils"; // Import fetchRooms instead

interface AvailableRoom {
  id: string;
  name: string;
  type: string;
  price: number;
  imageURL: string;
  description: string;
  capacity: number;
}

const BookingForm = () => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [error, setError] = useState("");
  const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
  const [showRooms, setShowRooms] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);


  // Check room availability
  const handleCheckAvailability = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!checkInDate || !checkOutDate) {
      setError("Please select check-in and check-out dates");
      return;
    }

    if (checkOutDate <= checkInDate) {
      setError("Check-out date must be after check-in date");
      return;
    }

    if (!adults || parseInt(adults) === 0) {
      setError("At least one adult must be selected");
      return;
    }

    try {
      // Fetch available rooms
      const rooms = await fetchRooms();
      // Filter rooms based on capacity and availability
      const availableRooms = rooms.filter(room => 
        room.status === 'available' && 
        room.capacity >= (parseInt(adults) + (parseInt(children) || 0))
      );

      setAvailableRooms(availableRooms);
      setShowRooms(true);
      setError("");
    } catch (error) {
      setError("Error checking room availability");
      console.error("Error:", error);
    }
  };

  // Handle room selection
  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
    // Navigate to booking section with room and date details
    window.location.href = `/booking-section?roomId=${roomId}&checkIn=${checkInDate?.toISOString()}&checkOut=${checkOutDate?.toISOString()}&adults=${adults}&children=${children}`;
  };

  return (
    <div className="font-barlow mt-16">
      {/* Initial Search Form */}
      {!showRooms && (
        <form onSubmit={handleCheckAvailability} className="bg-white w-full grid sm:grid-cols-2 lg:grid-cols-5">
          {error && <p className="text-red-500 text-center col-span-full">{error}</p>}

          {/* Check-in Date */}
          <div className="flex items-center justify-between px-3 py-4 border">
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              placeholderText="Check In"
              dateFormat="dd/MM/yyyy"
              className="placeholder:text-eerie-black placeholder:uppercase text-sm outline-none border-none w-full"
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
              className="placeholder:text-eerie-black placeholder:uppercase text-sm outline-none border-none w-full"
            />
            <span className="cursor-pointer">
              <Image src="/icons/calendar.svg" width={20} height={20} alt="calendar" />
            </span>
          </div>

          {/* Adults */}
          <div className="px-2 py-4 border">
            <select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="min-w-full uppercase text-eerie-black outline-none"
            >
              <option disabled value="">Adult</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          {/* Children */}
          <div className="px-2 py-4 border">
            <select
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className="min-w-full uppercase text-eerie-black outline-none"
            >
              <option disabled value="">Children</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          {/* Check Availability Button */}
          <button
            type="submit"
            className="bg-lion font-barlow h-full min-h-[52px] flex items-center justify-center uppercase text-white transition duration-300 ease-in-out hover:bg-lion-dark"
          >
            Check Availability
          </button>
        </form>
      )}

      {/* Available Rooms Display */}
      {showRooms && (
        <div className="mt-8">
          <h2 className="text-2xl font-gilda text-lion mb-6">Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRooms.map((room) => (
              <div key={room.id} className="bg-nero-dark rounded-lg overflow-hidden">
                <Image 
                  src={room.imageURL} 
                  alt={room.name}
                  width={400}  
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-lion">{room.name}</h3>
                  <p className="text-sm text-platinum mb-2">{room.type}</p>
                  <p className="text-platinum mb-4">{room.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lion font-bold">${room.price}/night</span>
                    <button
                      onClick={() => handleRoomSelect(room.id)}
                      className="bg-lion text-white px-4 py-2 rounded hover:bg-lion-dark transition-colors"
                    >
                      Select Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowRooms(false)}
            className="mt-6 text-lion hover:text-lion-dark"
          >
            ← Back to Search
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;