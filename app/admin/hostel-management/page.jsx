'use client'
import React, { useState } from 'react';
import LoadMoreButton from '@/components/LoadMoreButton';
import Link from 'next/link';
import { FaInfoCircle, FaPowerOff } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip'
const hostelsData = [
  { id: 1, name: 'Hostel A', managerName: 'John Doe', managerEmail: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Hostel B', managerName: 'Jane Smith', managerEmail: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Hostel C', managerName: 'Alice Johnson', managerEmail: 'alice@example.com', status: 'Active' },
  { id: 4, name: 'Hostel D', managerName: 'Bob Brown', managerEmail: 'bob@example.com', status: 'Inactive' },
  { id: 5, name: 'Hostel E', managerName: 'Eva White', managerEmail: 'eva@example.com', status: 'Active' },
  { id: 6, name: 'Hostel F', managerName: 'Frank Wilson', managerEmail: 'frank@example.com', status: 'Inactive' },
  { id: 7, name: 'Hostel G', managerName: 'Grace Davis', managerEmail: 'grace@example.com', status: 'Active' },
  { id: 8, name: 'Hostel H', managerName: 'Henry Lee', managerEmail: 'henry@example.com', status: 'Inactive' },
  { id: 9, name: 'Hostel I', managerName: 'Ivy Martin', managerEmail: 'ivy@example.com', status: 'Active' },
  { id: 10, name: 'Hostel J', managerName: 'Jack Johnson', managerEmail: 'jack@example.com', status: 'Inactive' },
  { id: 11, name: 'Hostel K', managerName: 'Karen Smith', managerEmail: 'karen@example.com', status: 'Active' },
  { id: 12, name: 'Hostel L', managerName: 'Larry Brown', managerEmail: 'larry@example.com', status: 'Inactive' },
  // Add more hostels as needed
];

const AdminPanel = () => {
  const [hostels, setHostels] = useState(hostelsData);
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Active', 'Inactive'
  const [searchInput, setSearchInput] = useState('');

  const handleStatusChange = (hostelId, newStatus) => {
    const updatedHostels = hostels.map(hostel => {
      if (hostel.id === hostelId) {
        return { ...hostel, status: newStatus };
      }
      return hostel;
    });
    setHostels(updatedHostels);
  };

  const handleStatusFilterChange = e => {
    setStatusFilter(e.target.value);
  };

  const handleSearchChange = e => {
    setSearchInput(e.target.value);
  };

  const filteredHostels = hostels.filter(hostel => {
    if (statusFilter !== 'All' && hostel.status !== statusFilter) {
      return false;
    }
    if (searchInput.trim() !== '') {
      const searchQuery = searchInput.toLowerCase();
      return (
        hostel.name.toLowerCase().includes(searchQuery) ||
        hostel.managerName.toLowerCase().includes(searchQuery) ||
        hostel.managerEmail.toLowerCase().includes(searchQuery)
      );
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
      </div>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white border rounded-lg overflow-hidden">
          <thead className="text-blue-400">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Hostel Name</th>
              <th className="py-3 px-4 text-left">Manager Name</th>
              <th className="py-3 px-4 text-left">Manager Email</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHostels.map(hostel => (
              <tr key={hostel.id} className='hover:bg-white hover:text-black'>
                <td className="py-3 px-4">{hostel.id}</td>
                <td className="py-3 px-4">{hostel.name}</td>
                <td className="py-3 px-4">{hostel.managerName}</td>
                <td className="py-3 px-4">{hostel.managerEmail}</td>
                <td className={`py-3 px-4 ${hostel.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                  {hostel.status}
                </td>
                <td className="py-3 px-4 flex">
                <FaPowerOff
                data-tooltip-id={`status-${hostel.id}`} data-tooltip-content="Change Status"
                fontSize={20}
              className="cursor-pointer text-blue-500 ml-3 hover:text-blue-600"
              onClick={() =>
                handleStatusChange(
                  hostel.id,
                  hostel.status === 'Active' ? 'Inactive' : 'Active'
                )
              }
            />
            <Link href={`/admin/hostel-management/${hostel.id}`}>
              <FaInfoCircle
              data-tooltip-id={`details-${hostel.id}`} data-tooltip-content="Details"
                 fontSize={20}
                className="cursor-pointer text-blue-500 ml-3 hover:text-blue-600"
              />
            </Link>
            <Tooltip id={`details-${hostel.id}`} />
            <Tooltip id={`status-${hostel.id}`}  />
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
