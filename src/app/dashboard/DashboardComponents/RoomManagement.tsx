// src/app/dashboard/DashboardComponents/RoomManagement.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchRooms, deleteRoom, addRoom, updateRoom } from "../../../utilis/firebaseUtils";
import Image from "next/image";

interface Room {
  id: string;
  name: string;
  imageURL: string;
  price: number;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  description: string;
  amenities?: string[];
  type: string;
  capacity: number;
  category?: 'single' | 'comfort' | 'vip';
  roomNumber?: string;
}

interface RoomFormData {
  name: string;
  imageURL: string;
  price: string;
  type: string;
  description: string;
  status: Room['status'];
  capacity: string;
  amenities: string[];
  category: 'single' | 'comfort' | 'vip';
  roomNumber: string;
}

interface CategoryStats {
  total: number;
  available: number;
  occupied: number;
  maintenance: number;
  cleaning: number;
}

export const RoomManagement = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState<RoomFormData>({
    name: '',
    imageURL: '',
    price: '',
    type: '',
    description: '',
    status: 'available',
    capacity: '',
    amenities: [],
    category: 'single',
    roomNumber: ''
  });
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'single' | 'comfort' | 'vip'>('all');
  const [categoryStats, setCategoryStats] = useState<Record<string, CategoryStats>>({
    single: { total: 0, available: 0, occupied: 0, maintenance: 0, cleaning: 0 },
    comfort: { total: 0, available: 0, occupied: 0, maintenance: 0, cleaning: 0 },
    vip: { total: 0, available: 0, occupied: 0, maintenance: 0, cleaning: 0 }
  });

  // Room types
  const roomTypes = [
    "Standard",
    "Deluxe",
    "Suite",
    "Executive Suite",
    "Family Room",
    "Single Room",
    "Double Room",
    "Twin Room",
  ];

  // Available amenities by category
  const categoryAmenities = {
    single: ["Wi-Fi", "TV", "Air Conditioning", "Private Bathroom"],
    comfort: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Coffee Maker", "Safe", "Private Bathroom"],
    vip: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Coffee Maker", "Safe", "Balcony", "Sea View", "Room Service", "Refrigerator", "Private Bathroom", "Jacuzzi"]
  };

  // Available amenities (all)
  const availableAmenities = [
    "Wi-Fi",
    "TV",
    "Mini Bar",
    "Air Conditioning",
    "Safe",
    "Balcony",
    "Sea View",
    "Room Service",
    "Coffee Maker",
    "Refrigerator",
    "Private Bathroom",
    "Jacuzzi"
  ];

  const loadRooms = useCallback(async () => {
    try {
      setIsLoading(true);
      const roomData = await fetchRooms();
      setRooms(roomData);
  
      // Calculate category statistics
      calculateCategoryStats(roomData);
    } catch (error) {
      console.error("Error loading rooms:", error);
    } finally {
      setIsLoading(false);
    }
  }, []); //  Empty dependency array prevents re-creation
  
  useEffect(() => {
    loadRooms(); //  No warning since loadRooms is stable
  }, [loadRooms]);

  const calculateCategoryStats = (roomData: Room[]) => {
    const stats = {
      single: { total: 0, available: 0, occupied: 0, maintenance: 0, cleaning: 0 },
      comfort: { total: 0, available: 0, occupied: 0, maintenance: 0, cleaning: 0 },
      vip: { total: 0, available: 0, occupied: 0, maintenance: 0, cleaning: 0 }
    };

    roomData.forEach(room => {
      const category = room.category || 'single';
      
      stats[category].total++;
      stats[category][room.status]++;
    });

    setCategoryStats(stats);
  };

  const getStatusColor = (status: Room['status']) => {
    const colors = {
      available: 'bg-green-500',
      occupied: 'bg-red-500',
      maintenance: 'bg-yellow-500',
      cleaning: 'bg-blue-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getCategoryColor = (category: string): string => {
    if (category === 'single') return 'bg-blue-600';
    if (category === 'comfort') return 'bg-purple-600';
    if (category === 'vip') return 'bg-amber-600';
    return 'bg-gray-500';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // If category changes, update amenities and suggest room number
    if (name === 'category') {
      // Make sure value is one of the allowed category types
      const categoryValue = (value === 'single' || value === 'comfort' || value === 'vip') 
        ? value 
        : 'single';
        
      const defaultAmenities = categoryAmenities[categoryValue] || [];
      const suggestedRoomNumber = suggestRoomNumber(categoryValue);
      
      setFormData({ 
        ...formData, 
        category: categoryValue, 
        amenities: defaultAmenities,
        roomNumber: suggestedRoomNumber
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const suggestRoomNumber = (category: 'single' | 'comfort' | 'vip') => {
    // Room number format: Single (101-110), Comfort (201-210), VIP (301-310)
    const prefix = category === 'single' ? '1' : category === 'comfort' ? '2' : '3';
    
    // Find existing room numbers in this category
    const existingNumbers = rooms
      .filter(room => room.category === category && room.roomNumber)
      .map(room => parseInt(room.roomNumber || '0'))
      .sort((a, b) => a - b);
    
    // Find the lowest available number between 01-10
    for (let i = 1; i <= 10; i++) {
      const roomNumber = parseInt(`${prefix}0${i < 10 ? i : i}`);
      if (!existingNumbers.includes(roomNumber)) {
        return roomNumber.toString();
      }
    }
    
    // If all numbers are taken, just return the next one
    return `${prefix}${existingNumbers.length + 1 < 10 ? '0' : ''}${existingNumbers.length + 1}`;
  };

  const handleAmenityToggle = (amenity: string) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(a => a !== amenity)
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity]
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      imageURL: '',
      price: '',
      type: '',
      description: '',
      status: 'available',
      capacity: '',
      amenities: [],
      category: 'single',
      roomNumber: suggestRoomNumber('single')
    });
    setError('');
  };

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.type || !formData.imageURL || !formData.price || !formData.capacity || !formData.roomNumber) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const newRoom = {
        name: formData.name,
        type: formData.type,
        imageURL: formData.imageURL,
        price: parseFloat(formData.price),
        status: formData.status,
        description: formData.description,
        capacity: parseInt(formData.capacity),
        amenities: formData.amenities,
        category: formData.category,
        roomNumber: formData.roomNumber
      };

      const addedRoom = await addRoom(newRoom);
      const updatedRooms = [...rooms, addedRoom];
      setRooms(updatedRooms);
      calculateCategoryStats(updatedRooms);
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error("Error adding room:", error);
      setError('Failed to add room. Please try again.');
    }
  };

  const handleEditRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!editingRoom) return;

    // Validation
    if (!formData.name || !formData.type || !formData.imageURL || !formData.price || !formData.capacity) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // Make sure all fields have valid values
      const updatedRoom: Partial<Room> = {};
      
      // Only add fields that have valid values
      if (formData.name) updatedRoom.name = formData.name;
      if (formData.type) updatedRoom.type = formData.type;
      if (formData.imageURL) updatedRoom.imageURL = formData.imageURL;
      if (formData.price) updatedRoom.price = parseFloat(formData.price);
      if (formData.status) updatedRoom.status = formData.status;
      if (formData.description !== undefined) updatedRoom.description = formData.description;
      if (formData.capacity) updatedRoom.capacity = parseInt(formData.capacity);
      if (formData.amenities) updatedRoom.amenities = formData.amenities;
      if (formData.category) updatedRoom.category = formData.category;
      if (formData.roomNumber) updatedRoom.roomNumber = formData.roomNumber;

      await updateRoom(editingRoom.id, updatedRoom);
      
      // Update local state
      const updatedRooms = rooms.map(room => 
        room.id === editingRoom.id ? { ...room, ...updatedRoom } : room
      );
      
      setRooms(updatedRooms);
      calculateCategoryStats(updatedRooms);
      setShowEditForm(false);
      setEditingRoom(null);
      resetForm();
    } catch (error) {
      console.error("Error updating room:", error);
      setError('Failed to update room. Please try again.');
    }
  };

  const openEditForm = (room: Room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      type: room.type,
      imageURL: room.imageURL,
      price: room.price.toString(),
      status: room.status,
      description: room.description || '',
      capacity: room.capacity?.toString() || '',
      amenities: room.amenities || [],
      category: room.category || 'single',
      roomNumber: room.roomNumber || ''
    });
    setShowEditForm(true);
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(roomId);
        const updatedRooms = rooms.filter(room => room.id !== roomId);
        setRooms(updatedRooms);
        calculateCategoryStats(updatedRooms);
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  const filteredRooms = rooms.filter(room => 
    categoryFilter === 'all' || room.category === categoryFilter
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lion text-xl">Loading rooms...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Stats Dashboard */}
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

      {/* Header with View Toggle, Filters and Add Room Button */}
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
            onClick={() => {
              resetForm();
              setShowAddForm(true);
            }}
            className="px-4 py-2 rounded bg-lion text-white hover:bg-lion-dark"
          >
            Add New Room
          </button>
        </div>
      </div>

      {/* Add Room Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-nero-dark p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-gilda text-lion">Add New Room</h2>
              <button onClick={() => setShowAddForm(false)} className="text-platinum hover:text-white">
                ✕
              </button>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 text-red-500 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleAddRoom} className="space-y-4">
              {/* Room Category */}
              <div>
                <label className="block text-platinum mb-1">Room Category*</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
                >
                  <option value="">Select Room Type</option>
                  {roomTypes.map(type => (
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
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="w-full bg-nero p-2 rounded text-platinum border border-gray-700 h-24"
                  placeholder="Enter room description here..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-platinum mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableAmenities.map(amenity => (
                    <label key={amenity} className="flex items-center text-platinum">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
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
                  onClick={() => setShowAddForm(false)}
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
      )}

      {/* Edit Room Form Modal */}
      {showEditForm && editingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-nero-dark p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-gilda text-lion">Edit Room</h2>
              <button onClick={() => setShowEditForm(false)} className="text-platinum hover:text-white">
                ✕
              </button>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 text-red-500 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleEditRoom} className="space-y-4">
              {/* Room Category */}
              <div>
                <label className="block text-platinum mb-1">Room Category*</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-platinum mb-1">Room Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-platinum mb-1">Room Type*</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
                >
                  <option value="">Select Room Type</option>
                  {roomTypes.map(type => (
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
                  onChange={handleInputChange}
                  className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-platinum mb-1">Price per Night*</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
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
                    onChange={handleInputChange}
                    className="w-full bg-nero p-2 rounded text-platinum border border-gray-700"
                    min="1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-platinum mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="w-full bg-nero p-2 rounded text-platinum border border-gray-700 h-24"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-platinum mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableAmenities.map(amenity => (
                    <label key={amenity} className="flex items-center text-platinum">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
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
                  onClick={() => setShowEditForm(false)}
                  className="px-4 py-2 bg-nero text-platinum rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lion text-white rounded hover:bg-lion-dark"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rooms Display */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredRooms.length === 0 ? (
          <div className="col-span-full text-center py-10 text-platinum">
            No rooms found in this category. Add a new room to get started.
          </div>
        ) : (
          filteredRooms.map((room) => (
            <div
              key={room.id}
              className={`bg-nero-dark rounded-lg overflow-hidden ${
                viewMode === 'list' ? 'flex gap-6' : ''
              }`}
            >
              {/* Image Section */}
              <div className={`relative ${viewMode === 'list' ? 'w-64' : 'w-full'}`}>
              <Image
                src={room.imageURL}
                alt={room.name}
                width={400} 
                height={200} 
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
                    onClick={() => openEditForm(room)}
                    className="px-3 py-1 rounded bg-lion text-white text-sm hover:bg-lion-dark"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteRoom(room.id)}
                    className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomManagement;