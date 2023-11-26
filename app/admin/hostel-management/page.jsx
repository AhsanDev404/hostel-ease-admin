"use client"
import React, { useState } from "react";
import LoadMoreButton from "@/components/LoadMoreButton";
import Link from "next/link";
import { FaInfoCircle, FaPowerOff } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const hostelsData = [
  {
    id: 1,
    name: "Male Hostel A",
    managerName: "John Doe",
    managerEmail: "john@example.com",
    status: "Active",
    category: "Male",
    city: "Islamabad",
  },
  {
    id: 2,
    name: "Female Hostel B",
    managerName: "Jane Smith",
    managerEmail: "jane@example.com",
    status: "Inactive",
    category: "Female",
    city: "Lahore",
  },
  // ... (add more hostel records)
];

const AdminPanel = () => {
  const [hostels, setHostels] = useState(hostelsData);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [hostelCategoryFilter, setHostelCategoryFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");


  const handleStatusChange = (hostelId, newStatus) => {
    const updatedHostels = hostels.map((hostel) => {
      if (hostel.id === hostelId) {
        return { ...hostel, status: newStatus };
      }
      return hostel;
    });
    setHostels(updatedHostels);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleHostelCategoryFilterChange = (e) => {
    setHostelCategoryFilter(e.target.value);
  };
  const handleCityFilterChange = (e) => {
    setCityFilter(e.target.value);
  };

  const filteredHostels = hostels.filter((hostel) => {
    if (statusFilter !== "All" && hostel.status !== statusFilter) {
      return false;
    }
    if (searchInput.trim() !== "") {
      const searchQuery = searchInput.toLowerCase();
      return (
        hostel.name.toLowerCase().includes(searchQuery) ||
        hostel.managerName.toLowerCase().includes(searchQuery) ||
        hostel.managerEmail.toLowerCase().includes(searchQuery)
      );
    }
    if (hostelCategoryFilter !== "All" && hostel.category !== hostelCategoryFilter) {
      return false;
    }
    if (cityFilter !== "All" && hostel.city !== cityFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Hostel Management</h1>
      <div className="flex mb-4">
        <div className="mr-4">
          <label className="text-black mr-2">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="border border-gray-300 rounded px-2 py-1 text-black"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="mr-4">
          <label className="text-black mr-2">Search:</label>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-2 py-1 text-black"
            placeholder="Search by name or email..."
          />
        </div>
        <div className="mr-4">
          <label className="text-black mr-2">Hostel Category:</label>
          <select
            value={hostelCategoryFilter}
            onChange={handleHostelCategoryFilterChange}
            className="border border-gray-300 rounded px-2 py-1 text-black"
          >
            <option value="All">All</option>
            <option value="Male">Male Hostels</option>
            <option value="Female">Female Hostels</option>
          </select>
        </div>
        <div className="mr-4">
          <label className="text-black mr-2">City:</label>
          <select
            value={cityFilter}
            onChange={handleCityFilterChange}
            className="border border-gray-300 rounded px-2 py-1 text-black"
          >
            <option value="All">All</option>
            {/* Add options for cities */}
            <option value="Islamabad">Islamabad</option>
            <option value="Lahore">Lahore</option>
            {/* Add more cities as needed */}
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
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">City</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHostels.map((hostel) => (
              <tr key={hostel.id} className="hover:bg-white hover:text-black">
                <td className="py-3 px-4">{hostel.id}</td>
                <td className="py-3 px-4">{hostel.name}</td>
                <td className="py-3 px-4">{hostel.managerName}</td>
                <td className="py-3 px-4">{hostel.managerEmail}</td>
                <td className="py-3 px-4">{hostel.category}</td>
                <td className="py-3 px-4">{hostel.city}</td>
                <td
                  className={`py-3 px-4 ${
                    hostel.status === "Active" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {hostel.status}
                </td>
                <td className="py-3 px-4 flex">
                  <FaPowerOff
                    data-tooltip-id={`status-${hostel.id}`}
                    data-tooltip-content="Change Status"
                    fontSize={20}
                    className="cursor-pointer text-blue-500 ml-3 hover:text-blue-600"
                    onClick={() =>
                      handleStatusChange(
                        hostel.id,
                        hostel.status === "Active" ? "Inactive" : "Active"
                      )
                    }
                  />
                  <Link href={`/admin/hostel-management/${hostel.id}`}>
                    <FaInfoCircle
                      data-tooltip-id={`details-${hostel.id}`}
                      data-tooltip-content="Details"
                      fontSize={20}
                      className="cursor-pointer text-blue-500 ml-3 hover:text-blue-600"
                    />
                  </Link>
                  <Tooltip id={`details-${hostel.id}`} />
                  <Tooltip id={`status-${hostel.id}`} />
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
