"use client";
import LoadMoreButton from "@/components/LoadMoreButton";
import React, { useState } from "react";

const roomsData = [
  { id: 1, roomNumber: "101", status: "Reserved", userId: 1 },
  { id: 2, roomNumber: "102", status: "Not Reserved", userId: null },
  { id: 3, roomNumber: "103", status: "Reserved", userId: 2 },
  { id: 4, roomNumber: "104", status: "Not Reserved", userId: null },
  { id: 5, roomNumber: "105", status: "Reserved", userId: 3 },
  { id: 6, roomNumber: "106", status: "Not Reserved", userId: null },
  // Add more rooms as needed
];

const RoomManagementPage = () => {
  const [rooms, setRooms] = useState(roomsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoomNumber, setNewRoomNumber] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // 'All', 'Reserved', 'Not Reserved'
  const [searchUserId, setSearchUserId] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleCreateRoom = () => {
    // Assuming you have a function to add a new room
    // For example:
    // setRooms([...rooms, { id: rooms.length + 1, roomNumber: newRoomNumber, status: 'Not Reserved', userId: null }]);
    // Close the modal
    setIsModalOpen(false);
    // Clear the input field
    setNewRoomNumber("");
  };

  const handleStatusChange = (roomId) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        return {
          ...room,
          status: room.status === "Reserved" ? "Not Reserved" : "Reserved",
        };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  const handleDeleteRoom = (roomId) => {
    const updatedRooms = rooms.filter((room) => room.id !== roomId);
    setRooms(updatedRooms);
  };

  const handleSearch = () => {
    const filteredRooms = rooms.filter((room) => {
      const matchesStatus = statusFilter === "All" || room.status === statusFilter;
      const matchesUserId =
        searchUserId === "" || (room.userId !== null && room.userId.toString().includes(searchUserId));
      return matchesStatus && matchesUserId;
    });
    setSearchResults(filteredRooms);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Room Management</h1>
      <div className="mb-4">
        <label className="text-black mr-2">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-black"
        >
          <option value="All">All</option>
          <option value="Reserved">Reserved</option>
          <option value="Not Reserved">Not Reserved</option>
        </select>
      </div>
      <div className="mb-4 flex items-center">
        <label className="text-black mr-2">Search by User ID:</label>
        <input
          type="text"
          placeholder="Enter User ID"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create Room
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border rounded-lg overflow-hidden">
          <thead className="text-blue-400">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Room Number</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">User ID</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-white hover:text-black">
                <td className="py-3 px-4">{room.id}</td>
                <td className="py-3 px-4">{room.roomNumber}</td>
                <td
                  className={`py-3 px-4 ${
                    room.status === "Reserved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {room.status}
                </td>
                <td
                  className={`py-3 px-4 ${
                    room.status === "Reserved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {room.status === "Reserved"
                    ? `Reserved (User ID: ${room.userId})`
                    : "Not Reserved"}
                </td>
                <td className="py-3 px-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded mr-2"
                    onClick={() => handleStatusChange(room.id)}
                  >
                    Change Status
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
          <div className="modal-container bg-white w-64 p-6 rounded shadow-lg z-50">
            <h2 className="text-2xl font-bold mb-4">Create Room</h2>
            <input
              type="text"
              placeholder="Enter room number"
              className="border border-gray-300 rounded px-2 py-1 mb-4 w-full"
              value={newRoomNumber}
              onChange={(e) => setNewRoomNumber(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
              onClick={handleCreateRoom}
            >
              Create Room
            </button>
            <button
              className="text-sm text-gray-600 mt-2 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <LoadMoreButton />
    </div>
  );
};

export default RoomManagementPage;
