// src/utils/firebaseUtils.js
import { db } from "../firebase"; 
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"; 

// Fetch rooms
export const fetchRooms = async () => {
  try {
    const roomsRef = collection(db, "rooms");
    const snapshot = await getDocs(roomsRef);
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

// Add a room
export const addRoom = async (roomData) => {
  try {
    const docRef = await addDoc(collection(db, "rooms"), roomData);
    return { ...roomData, id: docRef.id };
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

// Delete a room
export const deleteRoom = async (roomID) => {
  try {
    await deleteDoc(doc(db, "rooms", roomID));
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};
