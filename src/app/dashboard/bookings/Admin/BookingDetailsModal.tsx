// src/app/dashboard/DashboardComponents/Bookings/components/BookingDetailsModal.tsx

import React, { useState } from "react";
import { Booking } from "../types";
import { formatRooms } from "../../../../utilis/firebaseUtils";
import StatusBadge from "./StatusBadge";
import Image from "next/image";

interface BookingDetailsModalProps {
  booking: Booking;
  onClose: () => void;
  onSave?: (updatedBooking: Booking) => void;
  onStatusChange?: (bookingId: string, newStatus: Booking["status"]) => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  onClose,
  onSave,
  onStatusChange,
}) => {
  const [notes, setNotes] = useState(booking.notes || "");
  
  const handleSave = () => {
    if (onSave) {
      onSave({
        ...booking,
        notes,
      });
    }
    onClose();
  };

  const formatDate = (timestamp: { seconds: number }) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-nero-dark p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-gilda text-lion">Booking Details</h2>
            <p className="text-platinum text-sm">Booking ID: {booking.id}</p>
          </div>
          
          <div className="flex items-center gap-3">
            {onStatusChange && (
              <div className="flex items-center gap-2">
                <span className="text-platinum text-sm">Status:</span>
                <StatusBadge 
                  status={booking.status}
                  onStatusChange={(newStatus) => onStatusChange(booking.id, newStatus)}
                />
              </div>
            )}
            <button
              onClick={onClose}
              className="text-platinum hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Guest Information */}
          <div className="space-y-6">
            {/* Guest Details Card */}
            <div className="bg-nero p-4 rounded-lg">
              <h3 className="text-lion font-semibold text-lg mb-3 border-b border-gray-700 pb-2">
                Guest Information
              </h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-lion text-sm text-platinum-light">Full Name</p>
                  <p className="text-platinum font-medium">{booking.customerName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-lion text-sm text-platinum-light">Phone Number</p>
                    <p className="text-platinum">{booking.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-lion text-sm text-platinum-light">Email</p>
                    <p className="text-platinum">{booking.email || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-lion text-sm text-platinum-light">Gender</p>
                    <p className="text-platinum">{booking.gender || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-lion text-sm text-platinum-light">Nationality</p>
                    <p className="text-platinum">{booking.nationality || "Not provided"}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-lion text-sm text-platinum-light">ID/Passport Number</p>
                  <p className="text-platinum">{booking.idNumber || "Not provided"}</p>
                </div>
              </div>
            </div>
            
           {/* Payment Information Card */}
            <div className="bg-nero p-4 rounded-lg">
             <h3 className="text-lion font-semibold text-lg mb-3 border-b border-gray-700 pb-2">
               Payment Information
             </h3>
  
             <div className="space-y-3">
               <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-lion  text-sm text-platinum-light">Total Amount</p>
                   <p className="text-platinum font-medium">${booking.totalAmount ? booking.totalAmount.toFixed(2) : "0.00"}</p>
                 </div>
                  <div>
                    <p className="text-lion  text-sm text-platinum-light">Payment Status</p>
                    <p className={`${
                      booking.paymentStatus === "paid" ? "text-green-500" :
                      booking.paymentStatus === "partial" ? "text-yellow-500" :
                      "text-red-500"
                    } font-medium`}>
                      {booking.paymentStatus ? booking.paymentStatus.toUpperCase() : "PENDING"}
                    </p>
                  </div>
                </div>
    
                {booking.totalNights && (
                  <div>
                    <p className="text-lion  text-sm text-platinum-light">Price Calculation</p>
                    <p className="text-platinum">
                      ${booking.roomDetails?.price || 0} × {booking.totalNights} nights = ${booking.totalAmount ? booking.totalAmount.toFixed(2) : "0.00"}
                    </p>
                  </div>
                )}
             </div>
            </div>
            
            {/* Special Requests */}
            <div className="bg-nero p-4 rounded-lg">
              <h3 className="text-lion font-semibold text-lg mb-3 border-b border-gray-700 pb-2">
                Special Requests
              </h3>
              <p className="text-platinum">
                {booking.specialRequests || "No special requests"}
              </p>
            </div>
          </div>
          
          {/* Right Column - Booking & Room Details */}
          <div className="space-y-6">
            {/* Booking Details Card */}
            <div className="bg-nero p-4 rounded-lg">
              <h3 className="text-lion font-semibold text-lg mb-3 border-b border-gray-700 pb-2">
                Booking Details
              </h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-lion underline text-sm text-platinum-light">Check-in Date</p>
                    <p className="text-platinum">{formatDate(booking.checkInDate)}</p>
                  </div>
                  <div>
                    <p className="text-lion underline text-sm text-platinum-light">Check-out Date</p>
                    <p className="text-platinum">{formatDate(booking.checkOutDate)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-lion underline text-sm text-platinum-light">Adults</p>
                    <p className="text-platinum">{booking.adults}</p>
                  </div>
                  <div>
                    <p className="text-lion underline text-sm text-platinum-light">Children</p>
                    <p className="text-platinum">{booking.children}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-lion underline text-sm text-platinum-light">Total Nights</p>
                    <p className="text-platinum">{booking.totalNights || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-lion underline text-sm text-platinum-light">Booking Date</p>
                    <p className="text-platinum">{formatDate(booking.bookingDate)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Room Details Card */}
            <div className="bg-nero p-4 rounded-lg">
              <h3 className="text-lion font-semibold text-lg mb-3 border-b border-gray-700 pb-2">
                Room Information
              </h3>
              
              {booking.roomDetails ? (
                <div className="space-y-4">
                  {booking.roomDetails.imageURL && (
                    <div className="w-full">
                      <Image 
                        src={booking.roomDetails.imageURL} 
                        alt={booking.roomDetails.name}
                        width={500} // Adjust as needed
                        height={144} // Matches h-36 (36 * 4px)
                        className="w-full object-cover rounded"
                        priority
                      />
                    </div>
                    
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-lion  text-sm text-platinum-light">Room Name</p>
                      <p className="text-platinum">{booking.roomDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-lion  text-sm text-platinum-light">Room Price</p>
                      <p className="text-platinum">${booking.roomDetails.price}/night</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-platinum-light">Room IDs</p>
                  <div className="flex flex-wrap gap-2">
                    {formatRooms(booking.rooms).split(", ").map((room, index) => (
                      <span key={index} className="bg-nero-dark px-3 py-1 rounded text-platinum">
                        {room}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Notes Section */}
            <div className="bg-nero p-4 rounded-lg">
              <h3 className="text-lion font-semibold text-lg mb-3 border-b border-gray-700 pb-2">
                Staff Notes
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-nero-dark text-platinum px-4 py-2 rounded h-32 resize-none"
                placeholder="Add booking notes or reminders for staff..."
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-nero text-platinum px-4 py-2 rounded hover:bg-nero-dark"
          >
            Close
          </button>
          {onSave && (
            <button
              onClick={handleSave}
              className="bg-lion hover:bg-lion-dark text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;