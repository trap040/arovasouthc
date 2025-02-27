// src/app/dashboard/DashboardComponents/Bookings/BookingManagement.tsx

"use client";

import { useState, useEffect } from "react";
import { fetchBookings, updateBookingStatus } from "../../../utilis/firebaseUtils";
import { Booking, FilterOptions, BookingView } from "./types";
import BookingFilters from "../../dashboard/bookings/Admin/BookingFilters";
import BookingList from "../../dashboard/bookings/Admin/BookingList";
import BookingCalendar from "../../dashboard/bookings/Admin/BookingCalendar";
import BookingDetailsModal from "../../dashboard/bookings/Admin/BookingDetailsModal";

const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [view, setView] = useState<BookingView>("list");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: [null, null],
    status: "all",
    searchTerm: "",
  });

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setIsLoading(true);
        const bookingsData = await fetchBookings();
        setBookings(bookingsData);
        setError("");
      } catch (error) {
        console.error("Error loading bookings:", error);
        setError("Failed to load bookings. Please refresh and try again.");
      } finally {
        setIsLoading(false);
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
      booking.phoneNumber.includes(filters.searchTerm) ||
      (booking.email && booking.email.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
      (booking.idNumber && booking.idNumber.includes(filters.searchTerm));

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

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const handleSaveBooking = (updatedBooking: Booking) => {
    // Update the booking in state
    setBookings(bookings.map(booking => 
      booking.id === updatedBooking.id ? updatedBooking : booking
    ));
    
    // Here you would typically update the booking in the database
    // For now, we're just updating it in state
    console.log("Saving updated booking:", updatedBooking);
  };

  return (
    <div className="space-y-6">
      <BookingFilters 
        filters={filters}
        setFilters={setFilters}
        view={view}
        setView={setView}
      />

      {isLoading ? (
        <div className="text-center p-8 bg-nero-dark rounded-lg">
          <p className="text-platinum">Loading bookings...</p>
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-nero-dark rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <>
          {view === "list" && (
            <BookingList 
              bookings={filteredBookings}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
            />
          )}

          {view === "calendar" && (
            <BookingCalendar bookings={filteredBookings} />
          )}
        </>
      )}

      {isDetailsOpen && selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setIsDetailsOpen(false)}
          onSave={handleSaveBooking}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default BookingManagement;