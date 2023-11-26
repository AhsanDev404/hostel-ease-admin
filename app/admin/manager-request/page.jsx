'use client'
import LoadMoreButton from '@/components/LoadMoreButton';
import Link from 'next/link';
import React, { useState } from 'react';

const usersData = [
  { id: 1, name: 'John Doe', email: 'user1@example.com' },
  { id: 2, name: 'Alice Smith', email: 'user2@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'user3@example.com' },
  // Add more user data
];

const Page = () => {
  const [users, setUsers] = useState(usersData);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const searchQuery = searchInput.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
    );
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Manager Request</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-2 py-1 text-black"
          placeholder="Search by name or email..."
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border rounded-lg overflow-hidden">
          <thead className="text-blue-400">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Contact Number</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-white hover:text-black">
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">123-456-7890</td>
                <td className="py-3 px-4">
                  <Link href={`/admin/users-management/${user.id}`}>
                    <button className="bg-blue-500 ml-3 hover:bg-blue-600 text-white py-1 px-4 rounded">
                      Approve
                    </button>
                  </Link>
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

export default Page;
