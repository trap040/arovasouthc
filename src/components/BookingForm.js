"use client"; // Required for Next.js App Router

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { storeBookingData } from "../utilis/testFirestore"; // Import the function to store booking data
import { auth } from "../firebase"; // Import Firebase auth (optional for linking booking to user)

const BookingForm = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [rooms, setRooms] = useState("");
  const [error, setError] = useState(""); // For storing error messages
  const [successMessage, setSuccessMessage] = useState(""); // For storing success message

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check that checkOutDate is after checkInDate
    if (checkOutDate <= checkInDate) {
      setError("Check-out date must be after check-in date");
      return;
    }

    // Validation: Check if at least one adult is selected
    if (!adults || parseInt(adults) === 0) {
      setError("At least one adult must be selected");
      return;
    }

    // Validation: Check if a room is selected
    if (!rooms) {
      setError("Please select a room");
      return;
    }

    // Get the current user's UID (if logged in)
    const user = auth.currentUser;

    // Create the booking data
    const bookingData = {
      checkInDate,
      checkOutDate,
      adults,
      children,
      rooms,
      userId: user ? user.uid : null, // Store UID if logged in, otherwise null (guest)
    };

    // Call the function to store the booking data in Firestore
    try {
      await storeBookingData(bookingData);
      setError(""); // Reset error message
      setSuccessMessage("Booking successful!"); // Display success message
      // Optionally reset the form
      setCheckInDate(null);
      setCheckOutDate(null);
      setAdults("");
      setChildren("");
      setRooms("");
    } catch (error) {
      setError("There was an error storing the booking.");
      console.error("Error storing booking: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="font-barlow mt-16 bg-white w-full grid sm:grid-cols-2 lg:grid-cols-6">
      {/* Error message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Success message */}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

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
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>

      {/* Rooms */}
      <div className="px-2 py-4 border">
        <select
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          className="min-w-full uppercase text-eerie-black outline-none"
        >
          <option value="">Select Room</option>
          <option>Deluxe</option>
          <option>Single Room</option>
          <option>Double Rooms</option>
          <option>VIP Rooms</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-lion font-barlow h-full min-h-[52px] flex items-center justify-center uppercase text-white transition duration-300 ease-in-out hover:bg-lion-dark"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
