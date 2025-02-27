// src/app/dashboard/rooms/RoomForms/AddRoomForm.tsx

"use client";

import React from 'react';
import { 
  RoomFormData, 
  ROOM_TYPES, 
  AVAILABLE_AMENITIES 
} from '../../../../types/room';

interface AddRoomFormProps {
  formData: RoomFormData;
  error: string;
  onClose: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onAmenityToggle: (amenity: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddRoomForm: React.FC<AddRoomFormProps> = ({
  formData,
  error,
  onClose,
  onInputChange,
  onAmenityToggle,
  onSubmit
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-nero-dark p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-gilda text-lion">Add New Room</h2>
          <button onClick={onClose} className="text-platinum hover:text-white">
            ✕
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 text-red-500 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Room Category */}
          <div>
            <label className="block text-platinum mb-1">Room Category*</label>
            <select
              name="category"
              value={formData.category}
              onChange={onInputChange}
              className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
            >
              <option value="single">Single</option>
              <option value="comfort">Comfort</option>
              <option value="vip">VIP</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-platinum mb-1">Room Number*</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={onInputChange}
                className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
                placeholder="101"
              />
            </div>
            
            <div>
              <label className="block text-platinum mb-1">Room Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
                placeholder="Deluxe King Room"
              />
            </div>
          </div>
            
          <div>
            <label className="block text-platinum mb-1">Room Type*</label>
            <select
              name="type"
              value={formData.type}
              onChange={onInputChange}
              className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
            >
              <option value="">Select Room Type</option>
              {ROOM_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-platinum mb-1">Image URL*</label>
            <input
              type="text"
              name="imageURL"
              value={formData.imageURL}
              onChange={onInputChange}
              className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
              placeholder="https://example.com/room-image.jpg"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-platinum mb-1">Price per Night*</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={onInputChange}
                className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
                placeholder="199.99"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-platinum mb-1">Capacity*</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={onInputChange}
                className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
                placeholder="2"
                min="1"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-platinum mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={onInputChange}
              className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </div>
          
          <div>
            <label className="block text-platinum mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              className="w-full bg-nero p-2 rounded text-platinum border border-gray-700 h-24"
              placeholder="Enter room description here..."
            ></textarea>
          </div>
          
          <div>
            <label className="block text-platinum mb-2">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {AVAILABLE_AMENITIES.map(amenity => (
                <label key={amenity} className="flex items-center text-platinum">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => onAmenityToggle(amenity)}
                    className="mr-2"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-nero text-platinum rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-lion text-white rounded hover:bg-lion-dark"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomForm;