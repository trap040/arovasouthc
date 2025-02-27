// src/components/dashboard/rooms/CategoryStats.tsx

"use client";

import React from 'react';
import { CategoryStats as CategoryStatsType, getCategoryColor } from '../../../types/room';

interface CategoryStatsProps {
  categoryStats: Record<string, CategoryStatsType>;
}

const CategoryStats: React.FC<CategoryStatsProps> = ({ categoryStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(categoryStats).map(([category, stats]) => (
        <div key={category} className="bg-nero-dark rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-lion capitalize">{category} Rooms</h3>
            <span className={`px-2 py-1 rounded text-white text-xs ${getCategoryColor(category)}`}>
              {stats.total} rooms
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-platinum">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Available: {stats.available}
            </div>
            <div className="text-platinum">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Occupied: {stats.occupied}
            </div>
            <div className="text-platinum">
              <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              Maintenance: {stats.maintenance}
            </div>
            <div className="text-platinum">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Cleaning: {stats.cleaning}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryStats;