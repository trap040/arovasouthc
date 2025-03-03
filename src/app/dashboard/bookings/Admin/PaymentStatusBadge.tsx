// src/app/dashboard/DashboardComponents/Bookings/components/PaymentStatusBadge.tsx

import React from "react";
import { Booking } from "../types";

interface PaymentStatusBadgeProps {
  status: Booking["paymentStatus"];
  onStatusChange?: (newStatus: Booking["paymentStatus"]) => void;
}

const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status, onStatusChange }) => {
  // Determine the badge color based on status
  const getBadgeColor = (status: Booking["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return "bg-green-500";
      case "partial":
        return "bg-yellow-500";
      case "pending":
      default:
        return "bg-red-500";
    }
  };

  // If no change handler, just display the status
  if (!onStatusChange) {
    return (
      <span className={`px-2 py-1 rounded text-sm ${getBadgeColor(status)} text-white`}>
        {status ? status.toUpperCase() : "PENDING"}
      </span>
    );
  }

  // If change handler provided, render a select dropdown
  return (
    <select
      value={status}
      onChange={(e) => onStatusChange(e.target.value as Booking["paymentStatus"])}
      className={`px-2 py-1 rounded text-sm ${getBadgeColor(status)} text-white`}
    >
      <option value="pending">PENDING</option>
      <option value="partial">PARTIAL</option>
      <option value="paid">PAID</option>
    </select>
  );
};

export default PaymentStatusBadge;  