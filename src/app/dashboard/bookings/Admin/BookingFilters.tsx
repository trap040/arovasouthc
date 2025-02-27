// src/app/dashboard/DashboardComponents/Bookings/components/BookingFilters.tsx

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FilterOptions, BookingView } from "../types";

interface BookingFiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  view: BookingView;
  setView: React.Dispatch<React.SetStateAction<BookingView>>;
}

const BookingFilters: React.FC<BookingFiltersProps> = ({
  filters,
  setFilters,
  view,
  setView,
}) => {
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
    </div>
  );
};

export default BookingFilters;