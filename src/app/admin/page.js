"use client";

import React, { useState } from "react";
import { BookingTable } from "../../models/BookingTable"; // Import the booking table component
import ManageRooms from "../../models/ManageRooms";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(null); // Start with no tab selected

  const handleTabChange = (tab) => {
    // If the same tab is clicked, it will toggle visibility
    setSelectedTab(selectedTab === tab ? null : tab);
  };

  return (
    <div className="dashboard-container p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="tabs-container grid grid-cols-3 gap-4 mb-4">
        <button
          className={`tab p-4 border border-gray-300 rounded-md ${selectedTab === "bookings" ? "bg-gray-200" : ""}`}
          onClick={() => handleTabChange("bookings")}
        >
          Bookings
        </button>
        <button
          className={`tab p-4 border border-gray-300 rounded-md ${selectedTab === "managebookings" ? "bg-gray-200" : ""}`}
          onClick={() => handleTabChange("managebookings")}
        >
          Manage Rooms
        </button>
        {/* Add more tabs here */}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {selectedTab === "bookings" && <BookingTable />}
        {selectedTab === "managebookings" && <ManageRooms />}
        {/* You can add other tab contents here */}
      </div>
    </div>
  );
};

export default Dashboard;
