// src/components/dashboard/rooms/RoomFilters.tsx

"use client";

import React from 'react';

interface RoomFiltersProps {
  categoryFilter: 'all' | 'single' | 'comfort' | 'vip';
  setCategoryFilter: (category: 'all' | 'single' | 'comfort' | 'vip') => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  onAddRoomClick: () => void;
}

const RoomFilters: React.FC<RoomFiltersProps> = ({
  categoryFilter,
  setCategoryFilter,
  viewMode,
  setViewMode,
  onAddRoomClick
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex flex-wrap gap-2">
        {/* Category Filter */}
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-1 rounded ${categoryFilter === 'all' ? 'bg-lion text-white' : 'bg-nero text-platinum'}`}
        >
          All Categories
        </button>
        <button
          onClick={() => setCategoryFilter('single')}
          className={`px-3 py-1 rounded ${categoryFilter === 'single' ? 'bg-blue-600 text-white' : 'bg-nero text-platinum'}`}
        >
          Single
        </button>
        <button
          onClick={() => setCategoryFilter('comfort')}
          className={`px-3 py-1 rounded ${categoryFilter === 'comfort' ? 'bg-purple-600 text-white' : 'bg-nero text-platinum'}`}
        >
          Comfort
        </button>
        <button
          onClick={() => setCategoryFilter('vip')}
          className={`px-3 py-1 rounded ${categoryFilter === 'vip' ? 'bg-amber-600 text-white' : 'bg-nero text-platinum'}`}
        >
          VIP
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-lion text-white' : 'bg-nero text-platinum'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-lion text-white' : 'bg-nero text-platinum'}`}
          >
            List
          </button>
        </div>
        <button 
          onClick={onAddRoomClick}
          className="px-4 py-2 rounded bg-lion text-white hover:bg-lion-dark"
        >
          Add New Room
        </button>
      </div>
    </div>
  );
};

export default RoomFilters;