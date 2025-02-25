{/*"use client";

import React, { useEffect, useState } from "react";
import { fetchBookings } from "../utilis/fetchBookings";
import { updateBookingStatus } from "../utilis/testFirestore";

export const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [expandedBooking, setExpandedBooking] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      const bookingsData = await fetchBookings();
      setBookings(bookingsData);
    }; 

    loadBookings();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status: ", error);
    }
  };

  const handleViewMore = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  return (
    <div className="booking-table">
      {bookings.length === 0 ? (
        <p>No bookings available</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Booking ID</th>
              <th className="border px-4 py-2">Check-In Date</th>
              <th className="border px-4 py-2">Check-Out Date</th>
              <th className="border px-4 py-2">Adults</th>
              <th className="border px-4 py-2">Children</th>
              <th className="border px-4 py-2">Room</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Update Status</th>
              <th className="border px-4 py-2">View More</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <React.Fragment key={booking.id}>
                <tr>
                  <td className="border px-4 py-2">{booking.id}</td>
                  <td className="border px-4 py-2">
                    {booking.checkInDate?.seconds
                      ? new Date(booking.checkInDate.seconds * 1000).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {booking.checkOutDate?.seconds
                      ? new Date(booking.checkOutDate.seconds * 1000).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2">{booking.adults || "N/A"}</td>
                  <td className="border px-4 py-2">{booking.children || "N/A"}</td>
                  <td className="border px-4 py-2">{booking.rooms || "N/A"}</td>
                  <td className="border px-4 py-2">{booking.status || "N/A"}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className="p-1 border rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleViewMore(booking.id)}
                      className="text-blue-500 underline"
                    >
                      {expandedBooking === booking.id ? "View Less" : "View More"}
                    </button>
                  </td>
                </tr>

                {expandedBooking === booking.id && (
                  <tr>
                    <td colSpan={9} className="border-t">
                      <div className="p-4 bg-gray-100">
                        <p>
                          <strong>Customer Name:</strong> {booking.customerName || "N/A"}
                        </p>
                        <p>
                          <strong>Phone Number:</strong> {booking.phoneNumber || "N/A"}
                        </p>
                        <p>
                          <strong>Booking Date:</strong>{" "}
                          {booking.bookingDate?.seconds
                            ? new Date(booking.bookingDate.seconds * 1000).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};*/}
