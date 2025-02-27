// src/app/dashboard/DashboardComponents/Bookings/components/StatusBadge.tsx

import React from "react";
import { Booking } from "../types";

interface StatusBadgeProps {
  status: Booking["status"];
  onStatusChange?: (newStatus: Booking["status"]) => void;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, onStatusChange }) => {
  // Determine the badge color based on status
  const getBadgeColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      case "checked-in":
        return "bg-blue-500";
      case "checked-out":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  // If no change handler, just display the status
  if (!onStatusChange) {
    return (
      <span className={`px-2 py-1 rounded text-sm ${getBadgeColor(status)} text-white`}>
        {status}
      </span>
    );
  }

  // If change handler provided, render a select dropdown
  return (
    <select
      value={status}
      onChange={(e) => onStatusChange(e.target.value as Booking["status"])}
      className={`px-2 py-1 rounded text-sm ${getBadgeColor(status)} text-white`}
    >
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="checked-in">Checked In</option>
      <option value="checked-out">Checked Out</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
};

export default StatusBadge;