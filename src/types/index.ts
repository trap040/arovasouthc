// src/types/index.ts

export interface Room {
    id: string;
    name: string;
    type: string;
    imageURL: string;
    price: number;  // Note: this is number, not string
    status: "available" | "occupied" | "maintenance" | "cleaning";
    description: string;
    amenities: string[];
    capacity: number;  // Note: this is number, not string
    maintenanceSchedule?: {
      lastMaintenance: Date;
      nextMaintenance: Date;
      notes: string;
    };
  }
  
  export interface NewRoom extends Omit<Room, 'id'> {
    id?: string;
  }