// src/app/dashboard/DashboardComponents/RoomManagement.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchRooms, deleteRoom, addRoom, updateRoom } from "../../../utilis/firebaseUtils";
import { Room, RoomFormData, CategoryStats as CategoryStatsType } from "../../../types/room";

// Import components
import CategoryStats from "../rooms/CategoryStats";
import RoomFilters from "../rooms/RoomFilters";
import RoomCard from "../rooms/RoomCard";
import AddRoomForm from "../rooms/RoomForms/AddRoomForm";
import EditRoomForm from "../rooms/RoomForms/EditRoomForm";

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
  const [categoryStats, setCategoryStats] = useState<Record<string, CategoryStatsType>>({
    single: { total: 0, available: 0, occupied: 0, maintenance: 0, cleaning: 0 },
    comfort: { total: 0, available: 0, occupied: 0, maintenance: 0, cleaning: 0 },
    vip: { total: 0, available: 0, occupied: 0, maintenance: 0, cleaning: 0 }
  });

  const calculateCategoryStats = useCallback((roomData: Room[]) => {
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
  }, []);

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
  }, [calculateCategoryStats]);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // If category changes, update amenities and suggest room number
    if (name === 'category') {
      const categoryValue = (value === 'single' || value === 'comfort' || value === 'vip') 
        ? value 
        : 'single';
        
      const defaultAmenities = getCategoryAmenities(categoryValue);
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

  const getCategoryAmenities = (category: 'single' | 'comfort' | 'vip') => {
    const amenities = {
      single: ["Wi-Fi", "TV", "Air Conditioning", "Private Bathroom"],
      comfort: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Coffee Maker", "Safe", "Private Bathroom"],
      vip: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Coffee Maker", "Safe", "Balcony", "Sea View", "Room Service", "Refrigerator", "Private Bathroom", "Jacuzzi"]
    };
    
    return amenities[category] || [];
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

  const handleOpenEditForm = (room: Room) => {
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
      <CategoryStats categoryStats={categoryStats} />

      {/* Filters and Actions */}
      <RoomFilters
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onAddRoomClick={() => {
          resetForm();
          setShowAddForm(true);
        }}
      />

      {/* Room Form Modals */}
      {showAddForm && (
        <AddRoomForm
          formData={formData}
          error={error}
          onClose={() => setShowAddForm(false)}
          onInputChange={handleInputChange}
          onAmenityToggle={handleAmenityToggle}
          onSubmit={handleAddRoom}
        />
      )}

      {showEditForm && editingRoom && (
        <EditRoomForm
          formData={formData}
          error={error}
          onClose={() => setShowEditForm(false)}
          onInputChange={handleInputChange}
          onAmenityToggle={handleAmenityToggle}
          onSubmit={handleEditRoom}
        />
      )}

      {/* Rooms Display */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredRooms.length === 0 ? (
          <div className="col-span-full text-center py-10 text-platinum">
            No rooms found in this category. Add a new room to get started.
          </div>
        ) : (
          filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              viewMode={viewMode}
              onEdit={handleOpenEditForm}
              onDelete={handleDeleteRoom}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RoomManagement;