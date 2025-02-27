// src/app/dashboard/DashboardComponents/Bookings/components/BookingList.tsx

import React from "react";
import { Booking } from "../types";
import StatusBadge from "./StatusBadge";
import { formatRooms } from "../../../../utilis/firebaseUtils";

interface BookingListProps {
  bookings: Booking[];
  onViewDetails: (booking: Booking) => void;
  onStatusChange: (bookingId: string, newStatus: Booking["status"]) => void;
}

const BookingList: React.FC<BookingListProps> = ({
  bookings,
  onViewDetails,
  onStatusChange,
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

  return (
    <div className="bg-nero-dark rounded-lg overflow-hidden">
      {bookings.length === 0 ? (
        <div className="text-platinum text-center p-8">
          No bookings found matching your filters.
        </div>
      ) : (
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
                   <div className="text-platinum">${booking.totalAmount ? booking.totalAmount.toFixed(2) : "0.00"}</div>
                   <div className={`text-sm ${
                     booking.paymentStatus === "paid" ? "text-green-500" :
                     booking.paymentStatus === "partial" ? "text-yellow-500" :
                     "text-red-500"
                   }`}>
                     {booking.paymentStatus ? booking.paymentStatus.toUpperCase() : "PENDING"}
                   </div>
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
      )}
    </div>
  );
};

export default BookingList;