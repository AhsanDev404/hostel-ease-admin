'use client'
import LoadMoreButton from '@/components/LoadMoreButton';
import Link from 'next/link';
import React, { useState } from 'react';

const usersData = [
  { id: 1, name: 'John Doe', email: 'user1@example.com' },
  { id: 2, name: 'Jane Smith', email: 'user2@example.com' },
  // Add names to other users
  // ...
];

const Page = () => {
  const [users] = useState(usersData);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">User Management</h1>
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
            {users.map(user => (
              <tr key={user.id} className='hover:bg-white hover:text-black'>
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">123-456-7890</td>
                <td className="py-3 px-4">
                  <Link href={`/admin/users-management/${user.id}`}>
                    <button className="bg-blue-500 ml-3 hover:bg-blue-600 text-white py-1 px-4 rounded">
                      Details
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
