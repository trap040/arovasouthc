// src/components/dashboard/rooms/RoomCard.tsx

"use client";

import React from 'react';
import { Room, getStatusColor, getCategoryColor } from '../../../types/room';

interface RoomCardProps {
  room: Room;
  viewMode: 'grid' | 'list';
  onEdit: (room: Room) => void;
  onDelete: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, viewMode, onEdit, onDelete }) => {
  return (
    <div className={`bg-nero-dark rounded-lg overflow-hidden ${viewMode === 'list' ? 'flex gap-6' : ''}`}>
      {/* Image Section */}
      <div className={`relative ${viewMode === 'list' ? 'w-64' : 'w-full'}`}>
        <img
          src={room.imageURL}
          alt={room.name}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded text-white text-sm ${getStatusColor(room.status)}`}>
          {room.status}
        </div>
        {room.category && (
          <div className={`absolute top-2 left-2 px-2 py-1 rounded text-white text-xs ${getCategoryColor(room.category)}`}>
            {room.category}
          </div>
        )}
        {room.roomNumber && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-70 rounded text-white text-sm">
            Room {room.roomNumber}
          </div>
        )}
      </div>

      {/* Room Details */}
      <div className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-lion">{room.name}</h3>
            <p className="text-sm text-platinum">{room.type}</p>
          </div>
          <div className="text-lg font-bold text-lion">
            ${room.price}/night
          </div>
        </div>

        <div className="text-sm text-platinum mb-2">
          Capacity: {room.capacity} persons
        </div>

        <div className="text-sm text-platinum mb-4 line-clamp-2">
          {room.description}
        </div>

        {/* Amenities */}
        {room.amenities && room.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {room.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded text-xs bg-nero text-platinum"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="px-2 py-1 rounded text-xs bg-nero text-platinum">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(room)}
            className="px-3 py-1 rounded bg-lion text-white text-sm hover:bg-lion-dark"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(room.id)}
            className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;