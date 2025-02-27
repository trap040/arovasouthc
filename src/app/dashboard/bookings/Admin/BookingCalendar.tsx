// src/app/dashboard/DashboardComponents/Bookings/components/BookingCalendar.tsx

import React from "react";
import { Booking } from "../types";

interface BookingCalendarProps {
  bookings: Booking[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ bookings }) => {
  return (
    <div className="bg-nero-dark p-6 rounded-lg">
      <div className="text-platinum text-center mb-4">
        Calendar view implementation coming soon...
      </div>
      {/* Placeholder for actual calendar implementation */}
      <div className="text-sm text-platinum opacity-70">
        This view will display a calendar with {bookings.length} bookings.
      </div>
    </div>
  );
};

export default BookingCalendar;