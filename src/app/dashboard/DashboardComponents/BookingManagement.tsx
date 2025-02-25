// src/app/dashboard/DashboardComponents/BookingManagement.tsx

"use client";

import { useState, useEffect } from "react";
import { fetchBookings, updateBookingStatus, formatRooms } from "../../../utilis/firebaseUtils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Booking {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  checkInDate: { seconds: number };
  checkOutDate: { seconds: number };
  bookingDate: { seconds: number };
  adults: number;
  children: number;
  rooms: string[] | string | undefined;
  status: "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled";
  specialRequests?: string;
  totalAmount: number;
  paymentStatus: "pending" | "partial" | "paid";
  notes?: string;
}

interface FilterOptions {
  dateRange: [Date | null, Date | null];
  status: string;
  searchTerm: string;
}

export const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: [null, null],
    status: "all",
    searchTerm: "",
  });

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const bookingsData = await fetchBookings();
        console.log("Fetched bookings:", bookingsData); // Debug log
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error loading bookings:", error);
      }
    };
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const [startDate, endDate] = filters.dateRange;
    const bookingDate = new Date(booking.checkInDate.seconds * 1000);
    
    const dateMatch = !startDate || !endDate || 
      (bookingDate >= startDate && bookingDate <= endDate);
    
    const statusMatch = filters.status === "all" || 
      booking.status === filters.status;
    
    const searchMatch = !filters.searchTerm || 
      booking.customerName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      booking.phoneNumber.includes(filters.searchTerm);

    return dateMatch && statusMatch && searchMatch;
  });

  const handleStatusChange = async (bookingId: string, newStatus: Booking["status"]) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded ${
              view === "list" ? "bg-lion text-white" : "bg-nero text-platinum"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded ${
              view === "calendar" ? "bg-lion text-white" : "bg-nero text-platinum"
            }`}
          >
            Calendar View
          </button>
        </div>
        
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search bookings..."
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            className="bg-nero-dark text-platinum px-4 py-2 rounded"
          />
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="bg-nero-dark text-platinum px-4 py-2 rounded"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked-in">Checked In</option>
            <option value="checked-out">Checked Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="bg-nero p-4 rounded flex gap-4 items-center">
        <span className="text-platinum">Date Range:</span>
        <DatePicker
          selectsRange={true}
          startDate={filters.dateRange[0]}
          endDate={filters.dateRange[1]}
          onChange={(update) => setFilters({ ...filters, dateRange: update })}
          className="bg-nero-dark text-platinum px-4 py-2 rounded"
          placeholderText="Select date range"
        />
      </div>

      {/* Bookings List View */}
      {view === "list" && (
        <div className="bg-nero-dark rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-nero">
              <tr>
                <th className="px-4 py-3 text-left text-platinum">Guest</th>
                <th className="px-4 py-3 text-left text-platinum">Dates</th>
                <th className="px-4 py-3 text-left text-platinum">Rooms</th>
                <th className="px-4 py-3 text-left text-platinum">Status</th>
                <th className="px-4 py-3 text-left text-platinum">Payment</th>
                <th className="px-4 py-3 text-left text-platinum">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-t border-nero">
                  <td className="px-4 py-3">
                    <div className="text-lion">{booking.customerName}</div>
                    <div className="text-sm text-platinum">{booking.phoneNumber}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-platinum">
                      {new Date(booking.checkInDate.seconds * 1000).toLocaleDateString()} -
                      {new Date(booking.checkOutDate.seconds * 1000).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-platinum">
                      {formatRooms(booking.rooms)}
                    </div>
                    <div className="text-sm text-platinum">
                      Adults: {booking.adults} | Children: {booking.children}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value as Booking["status"])}
                      className={`px-2 py-1 rounded text-sm ${
                        booking.status === "confirmed" ? "bg-green-500" :
                        booking.status === "pending" ? "bg-yellow-500" :
                        booking.status === "cancelled" ? "bg-red-500" :
                        booking.status === "checked-in" ? "bg-blue-500" :
                        "bg-gray-500"
                      } text-white`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="checked-in">Checked In</option>
                      <option value="checked-out">Checked Out</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-platinum">${booking.totalAmount}</div>
                    <div className={`text-sm ${
                      booking.paymentStatus === "paid" ? "text-green-500" :
                      booking.paymentStatus === "partial" ? "text-yellow-500" :
                      "text-red-500"
                    }`}>
                      {booking.paymentStatus}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setIsDetailsOpen(true);
                      }}
                      className="bg-lion hover:bg-lion-dark text-white px-3 py-1 rounded text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Calendar View */}
      {view === "calendar" && (
        <div className="bg-nero-dark p-6 rounded-lg">
          <div className="text-platinum text-center mb-4">
            Calendar view implementation coming soon...
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {isDetailsOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-nero-dark p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-gilda text-lion">Booking Details</h2>
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="text-platinum hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-platinum font-semibold mb-2">Guest Information</h3>
                  <p className="text-platinum">Name: {selectedBooking.customerName}</p>
                  <p className="text-platinum">Phone: {selectedBooking.phoneNumber}</p>
                  <p className="text-platinum">Email: {selectedBooking.email}</p>
                </div>
                <div>
                  <h3 className="text-platinum font-semibold mb-2">Booking Details</h3>
                  <p className="text-platinum">
                    Check-in: {new Date(selectedBooking.checkInDate.seconds * 1000).toLocaleDateString()}
                  </p>
                  <p className="text-platinum">
                    Check-out: {new Date(selectedBooking.checkOutDate.seconds * 1000).toLocaleDateString()}
                  </p>
                  <p className="text-platinum">
                    Guests: {selectedBooking.adults} Adults, {selectedBooking.children} Children
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-platinum font-semibold mb-2">Rooms</h3>
                <div className="flex flex-wrap gap-2">
                  {formatRooms(selectedBooking.rooms).split(", ").map((room, index) => (
                    <span key={index} className="bg-nero px-3 py-1 rounded text-platinum">
                      {room}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-platinum font-semibold mb-2">Special Requests</h3>
                <p className="text-platinum">
                  {selectedBooking.specialRequests || "No special requests"}
                </p>
              </div>

              <div>
                <h3 className="text-platinum font-semibold mb-2">Payment Information</h3>
                <p className="text-platinum">Total Amount: ${selectedBooking.totalAmount}</p>
                <p className="text-platinum">Payment Status: {selectedBooking.paymentStatus}</p>
              </div>

              <div>
                <h3 className="text-platinum font-semibold mb-2">Notes</h3>
                <textarea
                  value={selectedBooking.notes || ""}
                  onChange={(e) => {
                    // Implement notes update functionality
                  }}
                  className="w-full bg-nero text-platinum px-4 py-2 rounded h-24"
                  placeholder="Add booking notes..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="bg-nero text-platinum px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Implement save changes functionality
                }}
                className="bg-lion hover:bg-lion-dark text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;