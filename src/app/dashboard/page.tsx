// src/app/dashboard/page.tsx

"use client";

import { useState } from "react";
import { BookingManagement } from "./DashboardComponents/BookingManagement";
import  RoomManagement  from "./DashboardComponents/RoomManagement";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("analytics");

  const tabs = [
    { id: "analytics", label: "Dashboard Overview", icon: "📊" },
    { id: "bookings", label: "Booking Management", icon: "📅" },
    { id: "rooms", label: "Room Management", icon: "🏠" },
    { id: "guests", label: "Guest Management", icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-nero">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-gilda text-lion mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`
                p-4 rounded-lg transition-all duration-300
                ${selectedTab === tab.id 
                  ? 'bg-lion text-white' 
                  : 'bg-nero-dark text-platinum hover:bg-lion-dark'}
                flex items-center justify-center gap-2
                font-barlow
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-nero-dark rounded-lg p-6">
          {selectedTab === "bookings" && <BookingManagement />}
          {selectedTab === "rooms" && <RoomManagement />}
        </div>
      </div>
    </div>
  );
}