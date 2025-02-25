

{/*"use client";

import { useState, useEffect } from "react";
import { fetchRooms, addRoom, deleteRoom } from "../utilis/ManageRooms"; // Import utilities

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [description, setDescription] = useState("");

  // Fetch rooms from Firestore
  useEffect(() => {
    const getRooms = async () => {
      try {
        const roomData = await fetchRooms();
        setRooms(roomData);
      } catch (error) {
        setError("Error fetching rooms.");
      }
    };
    getRooms();
  }, []);

  // Handle delete room
  const handleDeleteRoom = async (roomID) => {
    try {
      await deleteRoom(roomID);
      setRooms(rooms.filter((room) => room.id !== roomID));
      alert("Room deleted successfully.");
    } catch (error) {
      alert("Error deleting room.");
    }
  };

  // Handle add room
  const handleAddRoom = async (e) => {
    e.preventDefault();

    if (!name || !imageURL || !price || !description) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const newRoom = await addRoom({ name, imageURL, price, available, description });
      setRooms([...rooms, newRoom]);
      setError("");
      alert("Room added successfully!");

      // Reset form
      setName("");
      setImageURL("");
      setPrice("");
      setAvailable(true);
      setDescription("");
    } catch (error) {
      setError("Error adding room. Please try again.");
    }
  };

  return (
    <div className="manage-rooms p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Rooms</h2>

      {/* Add Room Form */}{/*
      <div className="add-room-form border p-4 rounded-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Add New Room</h3>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleAddRoom} className="space-y-2">
          <input
            type="text"
            placeholder="Room Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={available}
              onChange={() => setAvailable(!available)}
            />
            <span>Available</span>
          </label>
          <button type="submit" className="bg-gray-600 text-gray px-4 py-2 rounded">
            Add Room
          </button>
        </form>
      </div>

      {/* Room List */}{/*
      <div>
        <h3 className="text-lg font-semibold mb-2">Room List</h3>
        {rooms.length === 0 ? (
          <p>No rooms available.</p>
        ) : (
          <ul className="space-y-4">
            {rooms.map((room) => (
              <li key={room.id} className="border p-4 rounded-md flex items-center space-x-4">
                <img src={room.imageURL} alt={room.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h3 className="font-bold">{room.name}</h3>
                  <p>{room.description}</p>
                  <p className="text-gray-600">Price: ${room.price}</p>
                  <button
                    onClick={() => handleDeleteRoom(room.id)}
                    className="bg-gray-600 text-white px-2 py-1 mt-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageRooms; */}
