'use client'
import LoadMoreButton from '@/components/LoadMoreButton';
import React, { useState } from 'react';

const reservationsData = [
  { id: 1, userId: 1, startDate: '2023-12-01', endDate: '2023-12-05', status: 'Active' },
  { id: 2, userId: 2, startDate: '2023-12-03', endDate: '2023-12-08', status: 'Inactive' },
  { id: 3, userId: 3, startDate: '2023-12-06', endDate: '2023-12-10', status: 'Active' },
  // Add more reservations as needed
];

const ReservationManagementPage = () => {
  const [reservations, setReservations] = useState(reservationsData);
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Active', 'Inactive'
  const [userIdFilter, setUserIdFilter] = useState('');
  const [searchUserId, setSearchUserId] = useState("");
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
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
  const handleUserIdFilterChange = (e) => {
    setUserIdFilter(e.target.value);
  };

  const filteredReservations = reservations.filter((reservation) => {
    const matchesStatus = statusFilter === 'All' || reservation.status === statusFilter;
    const matchesUserId = userIdFilter === '' || reservation.userId.toString().includes(userIdFilter);
    return matchesStatus && matchesUserId;
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Reservation Management</h1>
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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border rounded-lg overflow-hidden">
          <thead className="text-blue-400">
            <tr>
              <th className="py-3 px-4 text-left">Reservation ID</th>
              <th className="py-3 px-4 text-left">User ID</th>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">End Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-white hover:text-black">
                <td className="py-3 px-4">{reservation.id}</td>
                <td className="py-3 px-4">{reservation.userId}</td>
                <td className="py-3 px-4">{reservation.startDate}</td>
                <td className="py-3 px-4">{reservation.endDate}</td>
                <td className={`py-3 px-4 ${reservation.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                  {reservation.status}
                </td>
                <td className="py-3 px-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">
                    Change Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <LoadMoreButton />
    </div>
  );
};

export default ReservationManagementPage;
