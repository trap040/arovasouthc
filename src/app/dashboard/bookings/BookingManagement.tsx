// src/app/dashboard/DashboardComponents/Bookings/BookingManagement.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { collection, onSnapshot, query, orderBy, limit, where, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { fetchBookings, updateBookingStatus, updateBookingPaymentStatus } from "../../../utilis/firebaseUtils";
import { Booking, FilterOptions, BookingView } from "./types";
import BookingFilters from "../bookings/Admin/BookingFilters";
import BookingList from "../bookings/Admin/BookingList";
import BookingCalendar from "../bookings/Admin/BookingCalendar";
import BookingDetailsModal from "../bookings/Admin/BookingDetailsModal";

const ITEMS_PER_PAGE = 10; // Number of bookings to show per page

const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [view, setView] = useState<BookingView>("list");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasNewBooking, setHasNewBooking] = useState(false);
  const [newBookingNotification, setNewBookingNotification] = useState<Booking | null>(null);
  const notificationSound = useRef<HTMLAudioElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: [null, null],
    status: "all",
    searchTerm: "",
  });

  // Initialize notification sound
  useEffect(() => {
    try {
      notificationSound.current = new Audio('/notification-sound.mp3');
    } catch (error) {
      console.warn("Failed to initialize notification sound:", error);
    }
    
    // Clean up on unmount
    return () => {
      if (notificationSound.current) {
        notificationSound.current.pause();
        notificationSound.current = null;
      }
    };
  }, []);

  // Load initial bookings
  useEffect(() => {
    const loadBookings = async () => {
      try {
        setIsLoading(true);
        const bookingsData = await fetchBookings();
        
        // Sort bookings by date (newest first)
        const sortedBookings = [...bookingsData].sort((a, b) => {
          // First try to sort by bookingDate if available
          if (a.bookingDate && b.bookingDate) {
            return b.bookingDate.seconds - a.bookingDate.seconds;
          }
          // Fallback to checkInDate if bookingDate is not available
          else if (a.checkInDate && b.checkInDate) {
            return b.checkInDate.seconds - a.checkInDate.seconds;
          }
          // If neither exists, keep original order
          return 0;
        });
        
        setBookings(sortedBookings);
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

  // Set up real-time listener for new bookings
  useEffect(() => {
    // Only set up the listener after initial loading is complete
    if (isLoading) return;

    // Query for recent bookings
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    try {
      const bookingsQuery = query(
        collection(db, "bookings"), 
        where("createdAt", ">=", Timestamp.fromDate(twentyFourHoursAgo)),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      
      const unsubscribe = onSnapshot(bookingsQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // Check if this is truly a new booking that wasn't in our initial data load
            const newBookingData = { id: change.doc.id, ...change.doc.data() } as Booking;
            const isExistingBooking = bookings.some(booking => booking.id === newBookingData.id);
            
            if (!isExistingBooking) {
              console.log("New booking detected:", newBookingData.id);
              
              // Play notification sound
              if (notificationSound.current) {
                notificationSound.current.play().catch(e => {
                  console.warn("Failed to play notification sound:", e);
                });
              }
              
              // Set notification state
              setHasNewBooking(true);
              setNewBookingNotification(newBookingData);
              
              // Add new booking to the beginning of the list to maintain newest first order
              setBookings(prevBookings => [newBookingData, ...prevBookings]);
              
              // Go to first page to show the new booking
              setCurrentPage(1);
            }
          }
        });
      }, (error) => {
        console.error("Error in real-time bookings listener:", error);
      });
      
      // Clean up listener on component unmount
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error("Error setting up real-time listener:", error);
    }
  }, [isLoading, bookings]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const filteredBookings = bookings.filter(booking => {
    const [startDate, endDate] = filters.dateRange;
    
    let dateMatch = true;
    if (startDate && endDate && booking.checkInDate) {
      const bookingDate = new Date(booking.checkInDate.seconds * 1000);
      dateMatch = bookingDate >= startDate && bookingDate <= endDate;
    }
    
    const statusMatch = filters.status === "all" || 
      booking.status === filters.status;
    
    const searchMatch = !filters.searchTerm || 
      (booking.customerName && booking.customerName.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
      (booking.phoneNumber && booking.phoneNumber.includes(filters.searchTerm)) ||
      (booking.email && booking.email.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
      (booking.idNumber && booking.idNumber.includes(filters.searchTerm));

    return dateMatch && statusMatch && searchMatch;
  });

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / ITEMS_PER_PAGE));
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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

  const handlePaymentStatusChange = async (bookingId: string, newStatus: Booking["paymentStatus"]) => {
    try {
      await updateBookingPaymentStatus(bookingId, newStatus);
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, paymentStatus: newStatus } : booking
      ));
    } catch (error) {
      console.error("Error updating payment status:", error);
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
    console.log("Saving updated booking:", updatedBooking);
  };

  const handleDismissNotification = () => {
    setHasNewBooking(false);
    setNewBookingNotification(null);
  };

  const viewNewBooking = () => {
    if (newBookingNotification) {
      handleViewDetails(newBookingNotification);
      handleDismissNotification();
    }
  };

  return (
    <div className="space-y-6">
      {hasNewBooking && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-4 flex justify-between items-center">
          <div>
            <p className="font-bold">New booking received!</p>
            <p className="text-sm">
              {newBookingNotification ? `${newBookingNotification.customerName} (${newBookingNotification.status})` : 'A new booking has been received'}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={viewNewBooking}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
            >
              View Details
            </button>
            <button 
              onClick={handleDismissNotification}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

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
              bookings={paginatedBookings}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
              onPaymentStatusChange={handlePaymentStatusChange}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
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
          onPaymentStatusChange={handlePaymentStatusChange}
        />
      )}
    </div>
  );
};

export default BookingManagement;