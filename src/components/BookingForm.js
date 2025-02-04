"use client"; // Required for Next.js App Router

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

const BookingForm = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [rooms, setRooms] = useState("");

  return (
    <form className="font-barlow mt-16 bg-white w-full grid sm:grid-cols-2 lg:grid-cols-6">
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
          <option>1 Room</option>
          <option>2 Rooms</option>
          <option>3 Rooms</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-lion font-barlow h-full min-h-[52px] flex items-center justify-center uppercase text-white transition duration-300 ease-in-out hover:bg-lion-dark"
      >
        Check Now
      </button>
    </form>
  );
};

export default BookingForm;
