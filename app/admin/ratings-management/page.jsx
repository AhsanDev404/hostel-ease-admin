"use client";
import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import LoadMoreButton from "@/components/LoadMoreButton";

const hostelsData = [
  {
    id: 1,
    name: "Hostel A",
    managerName: "John Doe",
    managerEmail: "john@example.com",
    status: "Active",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Hostel B",
    managerName: "Jane Smith",
    managerEmail: "jane@example.com",
    status: "Active",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Hostel C",
    managerName: "Alice Johnson",
    managerEmail: "alice@example.com",
    status: "Inactive",
    rating: 3.8,
  },
  {
    id: 4,
    name: "Hostel D",
    managerName: "Bob Brown",
    managerEmail: "bob@example.com",
    status: "Active",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Hostel E",
    managerName: "Eva White",
    managerEmail: "eva@example.com",
    status: "Active",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Hostel F",
    managerName: "Frank Wilson",
    managerEmail: "frank@example.com",
    status: "Inactive",
    rating: 3.5,
  },
  {
    id: 7,
    name: "Hostel G",
    managerName: "Grace Davis",
    managerEmail: "grace@example.com",
    status: "Active",
    rating: 4.1,
  },
  {
    id: 8,
    name: "Hostel H",
    managerName: "Henry Lee",
    managerEmail: "henry@example.com",
    status: "Inactive",
    rating: 3.9,
  },
  {
    id: 9,
    name: "Hostel I",
    managerName: "Ivy Martin",
    managerEmail: "ivy@example.com",
    status: "Active",
    rating: 4.3,
  },
  {
    id: 10,
    name: "Hostel J",
    managerName: "Jack Johnson",
    managerEmail: "jack@example.com",
    status: "Active",
    rating: 4.6,
  },
  // Add more hostels as needed
];


const AdminPanel = () => {
  const [hostels, setHostels] = useState(hostelsData);
  const [ratingFilter, setRatingFilter] = useState('All'); // 'All', 1, 2, 3, 4, 5

  const handleRatingFilterChange = (rating) => {
    setRatingFilter(rating);
  };

  const filteredHostels = hostels.filter((hostel) => {
    if (ratingFilter !== 'All' && hostel.rating < parseFloat(ratingFilter)) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Hostel Management</h1>
      <div className="flex mb-4">
       
        <div>
          <label className="text-black mr-2">Filter by Rating:</label>
          <select
            value={ratingFilter}
            onChange={(e) => handleRatingFilterChange(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-black"
          >
            <option value="All">All</option>
            <option value="5">5</option>
            <option value="4.5">4.5</option>
            <option value="4">4</option>
            <option value="3.5">3.5</option>
            <option value="3">3</option>
            <option value="2.5">2.5</option>
            <option value="2">2</option>
            <option value="1.5">1.5</option>
            <option value="1">1</option>
            <option value="0.5">0.5</option>
            
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border rounded-lg overflow-hidden">
          <thead className="text-blue-400">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Hostel Name</th>
              <th className="py-3 px-4 text-left">Manager Name</th>
              <th className="py-3 px-4 text-left">Manager Email</th>
              <th className="py-3 px-4 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredHostels.map((hostel) => (
              <tr key={hostel.id} className="hover:bg-white hover:text-black">
                <td className="py-3 px-4">{hostel.id}</td>
                <td className="py-3 px-4">{hostel.name}</td>
                <td className="py-3 px-4">{hostel.managerName}</td>
                <td className="py-3 px-4">{hostel.managerEmail}</td>
                
                <td className="py-3 px-4 flex gap-1">
                  {[...Array(Math.floor(hostel.rating))].map((_, index) => (
                    <FaStar key={index} className="text-yellow-500" />
                  ))}
                  {hostel.rating % 1 !== 0 && (
                    <FaStarHalfAlt className="text-yellow-500" />
                  )}
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

export default AdminPanel;
