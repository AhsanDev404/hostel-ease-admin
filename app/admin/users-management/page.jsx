'use client'
import LoadMoreButton from '@/components/LoadMoreButton';
import Link from 'next/link';
import React, { useState } from 'react';

const usersData = [
  { id: 1, email: 'user1@example.com' },
  { id: 2, email: 'user2@example.com' },
  { id: 3, email: 'user3@example.com' },
  { id: 4, email: 'user4@example.com' },
  { id: 5, email: 'user5@example.com' },
  { id: 6, email: 'user6@example.com' },
  { id: 7, email: 'user7@example.com' },
  { id: 8, email: 'user8@example.com' },
  { id: 9, email: 'user9@example.com' },
  { id: 10, email: 'user10@example.com' },
  { id: 11, email: 'user11@example.com' },
  { id: 12, email: 'user12@example.com' }
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
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Contact Number</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className='hover:bg-white hover:text-black'>
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">123-456-7890</td>
                <td className="py-3 px-4">
                  <Link href={'/admin/users-management/1'}>
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
