// src/app/dashboard/DashboardComponents/Bookings/components/BookingDetailsModal.tsx

import React, { useState } from "react";
import { Booking } from "../types";
import { formatRooms } from "../../../../utilis/firebaseUtils";
import StatusBadge from "./StatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";
import Image from "next/image";


interface BookingDetailsModalProps {
  booking: Booking;
  onClose: () => void;
  onSave?: (updatedBooking: Booking) => void;
  onStatusChange?: (bookingId: string, newStatus: Booking["status"]) => void;
  onPaymentStatusChange?: (bookingId: string, newStatus: Booking["paymentStatus"]) => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  onClose,
  onSave,
  onStatusChange,
  onPaymentStatusChange,
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
                  <p className="text-sm text-lion text-platinum-light">Full Name</p>
                  <p className="text-platinum font-medium">{booking.customerName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-lion text-platinum-light">Phone Number</p>
                    <p className="text-platinum">{booking.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-lion text-platinum-light">Email</p>
                    <p className="text-platinum">{booking.email || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-lion text-platinum-light">Gender</p>
                    <p className="text-platinum">{booking.gender || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-lion text-platinum-light">Nationality</p>
                    <p className="text-platinum">{booking.nationality || "Not provided"}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-lion text-platinum-light">ID/Passport Number</p>
                  <p className="text-platinum">{booking.idNumber || "Not provided"}</p>
                </div>
              </div>
            </div>
            
            {/* Status Management Card */}
            <div className="bg-nero p-4 rounded-lg">
              <h3 className="text-lion font-semibold text-lg mb-3 border-b border-gray-700 pb-2">
                Status Management
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-lion text-platinum-light mb-2">Booking Status</p>
                  {onStatusChange ? (
                    <StatusBadge 
                      status={booking.status} 
                      onStatusChange={(newStatus) => onStatusChange(booking.id, newStatus)}
                    />
                  ) : (
                    <StatusBadge status={booking.status} />
                  )}
                </div>
                
                <div>
                  <p className="text-sm text-lion text-platinum-light mb-2">Payment Status</p>
                  {onPaymentStatusChange ? (
                    <PaymentStatusBadge 
                      status={booking.paymentStatus || "pending"} 
                      onStatusChange={(newStatus) => onPaymentStatusChange(booking.id, newStatus)}
                    />
                  ) : (
                    <PaymentStatusBadge status={booking.paymentStatus || "pending"} />
                  )}
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
                    <p className="text-sm text-lion text-platinum-light">Total Amount</p>
                    <p className="text-platinum font-medium">${booking.totalAmount?.toFixed(2) || "0.00"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-lion text-platinum-light">Payment Method</p>
                    <p className="text-platinum">Not specified</p>
                  </div>
                </div>
                
                {booking.totalNights && (
                  <div>
                    <p className="text-sm text-lion text-platinum-light">Price Calculation</p>
                    <p className="text-platinum">
                      ${booking.roomDetails?.price || 0} × {booking.totalNights} nights = ${booking.totalAmount?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                )}
              </div>
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
                    <p className="text-sm text-lion text-platinum-light">Check-in Date</p>
                    <p className="text-platinum">{formatDate(booking.checkInDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-lion text-platinum-light">Check-out Date</p>
                    <p className="text-platinum">{formatDate(booking.checkOutDate)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-lion text-platinum-light">Adults</p>
                    <p className="text-platinum">{booking.adults || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-lion text-platinum-light">Children</p>
                    <p className="text-platinum">{booking.children || 0}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-lion text-platinum-light">Total Nights</p>
                    <p className="text-platinum">{booking.totalNights || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-lion text-platinum-light">Booking Date</p>
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
                      height={144} // Adjust to match the aspect ratio
                      className="h-36 w-full object-cover rounded"
                    />
                  </div>
                )}
              
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-lion text-platinum-light">Room Name</p>
                      <p className="text-platinum">{booking.roomDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-lion text-platinum-light">Room Price</p>
                      <p className="text-platinum">${booking.roomDetails.price}/night</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-lion text-platinum-light">Room IDs</p>
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
            
            {/* Special Requests */}
            <div className="bg-nero p-4 rounded-lg">
              <h3 className="text-lion font-semibold text-lg mb-3 border-b border-gray-700 pb-2">
                Special Requests
              </h3>
              <p className="text-platinum">
                {booking.specialRequests || "No special requests"}
              </p>
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