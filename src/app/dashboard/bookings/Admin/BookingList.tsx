// src/app/dashboard/DashboardComponents/Bookings/components/BookingList.tsx

import React from "react";
import { Booking } from "../types";
import StatusBadge from "./StatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { formatRooms } from "../../../../utilis/firebaseUtils";

interface BookingListProps {
  bookings: Booking[];
  onViewDetails: (booking: Booking) => void;
  onStatusChange: (bookingId: string, newStatus: Booking["status"]) => void;
  onPaymentStatusChange: (bookingId: string, newStatus: Booking["paymentStatus"]) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const BookingList: React.FC<BookingListProps> = ({
  bookings,
  onViewDetails,
  onStatusChange,
  onPaymentStatusChange,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage
}) => {
  const formatDate = (timestamp: { seconds: number }) => {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  };

  // Check if booking has special requirements or additional details
  const hasAdditionalDetails = (booking: Booking) => {
    return (
      booking.specialRequests || 
      booking.gender || 
      booking.nationality || 
      booking.idNumber ||
      booking.notes
    );
  };

  // Generate page numbers array for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show a subset of pages with ellipsis
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // In the middle
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="bg-nero-dark rounded-lg overflow-hidden flex flex-col">
      {bookings.length === 0 ? (
        <div className="text-platinum text-center p-8">
          No bookings found matching your filters.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-nero">
                <tr>
                  <th className="px-4 py-3 text-left text-platinum">Guest</th>
                  <th className="px-4 py-3 text-left text-platinum">Dates</th>
                  <th className="px-4 py-3 text-left text-platinum">Rooms</th>
                  <th className="px-4 py-3 text-left text-platinum">Status</th>
                  <th className="px-4 py-3 text-left text-platinum">Payment</th>
                  <th className="px-4 py-3 text-center text-platinum">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-nero hover:bg-nero">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div>
                          <div className="text-lion">{booking.customerName || "Guest"}</div>
                          <div className="text-sm text-platinum">{booking.phoneNumber || "No phone"}</div>
                          {booking.email && (
                            <div className="text-xs text-platinum-light truncate max-w-[200px]">
                              {booking.email}
                            </div>
                          )}
                        </div>
                        {hasAdditionalDetails(booking) && (
                          <div className="ml-2 text-xs bg-lion text-white px-1 py-0.5 rounded">
                            +info
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-platinum">
                        {booking.checkInDate ? formatDate(booking.checkInDate) : "N/A"} - {booking.checkOutDate ? formatDate(booking.checkOutDate) : "N/A"}
                      </div>
                      {booking.totalNights && (
                        <div className="text-xs text-platinum-light">
                          {booking.totalNights} {booking.totalNights === 1 ? "night" : "nights"}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-platinum">
                        {booking.roomDetails ? booking.roomDetails.name : formatRooms(booking.rooms)}
                      </div>
                      <div className="text-sm text-platinum">
                        Adults: {booking.adults || 0} | Children: {booking.children || 0}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge 
                        status={booking.status} 
                        onStatusChange={(newStatus) => onStatusChange(booking.id, newStatus)} 
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-platinum mb-1">${booking.totalAmount ? booking.totalAmount.toFixed(2) : "0.00"}</div>
                      <PaymentStatusBadge
                        status={booking.paymentStatus || "pending"}
                        onStatusChange={(newStatus) => onPaymentStatusChange(booking.id, newStatus)}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => onViewDetails(booking)}
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
          
          {/* Pagination */}
          <div className="bg-nero p-4 flex items-center justify-between mt-auto">
            <div className="text-sm text-platinum">
              Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, bookings.length)}</span> to{" "}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, bookings.length)}</span> of{" "}
              <span className="font-medium">{bookings.length}</span> bookings
            </div>
            
            <div className="flex space-x-1">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1 
                    ? "bg-nero-dark text-gray-500 cursor-not-allowed" 
                    : "bg-nero-dark text-platinum hover:bg-lion hover:text-white"
                }`}
              >
                Previous
              </button>
              
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === "number" && onPageChange(page)}
                  className={`px-3 py-1 rounded ${
                    page === currentPage
                      ? "bg-lion text-white"
                      : page === "..."
                      ? "bg-nero-dark text-platinum cursor-default"
                      : "bg-nero-dark text-platinum hover:bg-lion hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-nero-dark text-gray-500 cursor-not-allowed"
                    : "bg-nero-dark text-platinum hover:bg-lion hover:text-white"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingList;