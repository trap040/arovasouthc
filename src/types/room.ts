// src/types/room.ts

export interface Room {
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
  
  export interface RoomFormData {
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
  
  export interface CategoryStats {
    total: number;
    available: number;
    occupied: number;
    maintenance: number;
    cleaning: number;
  }
  
  // Constants
  export const ROOM_TYPES = [
    "Standard",
    "Deluxe",
    "Suite",
    "Executive Suite",
    "Family Room",
    "Single Room",
    "Double Room",
    "Twin Room",
  ];
  
  export const AVAILABLE_AMENITIES = [
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
  
  export const CATEGORY_AMENITIES = {
    single: ["Wi-Fi", "TV", "Air Conditioning", "Private Bathroom"],
    comfort: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Coffee Maker", "Safe", "Private Bathroom"],
    vip: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Coffee Maker", "Safe", "Balcony", "Sea View", "Room Service", "Refrigerator", "Private Bathroom", "Jacuzzi"]
  };
  
  // Helper functions
  export const getStatusColor = (status: Room['status']): string => {
    const colors = {
      available: 'bg-green-500',
      occupied: 'bg-red-500',
      maintenance: 'bg-yellow-500',
      cleaning: 'bg-blue-500'
    };
    return colors[status] || 'bg-gray-500';
  };
  
  export const getCategoryColor = (category: string): string => {
    if (category === 'single') return 'bg-blue-600';
    if (category === 'comfort') return 'bg-purple-600';
    if (category === 'vip') return 'bg-amber-600';
    return 'bg-gray-500';
  };