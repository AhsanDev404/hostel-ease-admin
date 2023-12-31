'use client'
import LoadMoreButton from '@/components/LoadMoreButton';
import React, { useState } from 'react';

const usersData = [
  { id: 1, name: 'John Doe', email: 'user1@example.com', role: 'Manager', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'user2@example.com', role: 'Manager', status: 'Inactive' },
  { id: 3, name: 'Alice Johnson', email: 'user3@example.com', role: 'Manager', status: 'Active' },
  { id: 4, name: 'Bob Wilson', email: 'user4@example.com', role: 'Manager', status: 'Inactive' },
  { id: 5, name: 'Charlie Brown', email: 'user5@example.com', role: 'Manager', status: 'Active' },
  { id: 6, name: 'David Lee', email: 'user6@example.com', role: 'Manager', status: 'Inactive' },
  { id: 7, name: 'Emma Davis', email: 'user7@example.com', role: 'Manager', status: 'Active' },
  { id: 8, name: 'Frank Miller', email: 'user8@example.com', role: 'Manager', status: 'Inactive' },
  { id: 9, name: 'Grace Wilson', email: 'user9@example.com', role: 'Manager', status: 'Active' },
  { id: 10, name: 'Henry Johnson', email: 'user10@example.com', role: 'Manager', status: 'Inactive' },
  { id: 11, name: 'Isabella Taylor', email: 'user11@example.com', role: 'Manager', status: 'Active' },
  { id: 12, name: 'Jack Smith', email: 'user12@example.com', role: 'Manager', status: 'Inactive' },
];


const Page = () => {
  const [users, setUsers] = useState(usersData);
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Active', 'Inactive'
  const [roleFilter, setRoleFilter] = useState('All'); // 'All', 'User', 'Admin', 'Manager'

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleStatusChange = (userId, newStatus) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, status: newStatus };
      }
      return user;
    });
    setUsers(updatedUsers);
  };
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    if (statusFilter !== 'All' && user.status !== statusFilter) {
      return false;
    }
    if (roleFilter !== 'All' && user.role !== roleFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Manager Management</h1>
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
        <div>
          <label className="text-black mr-2">Filter by Role:</label>
          <select
            value={roleFilter}
            onChange={handleRoleFilterChange}
            className="border border-gray-300 rounded px-2 py-1 text-black"
          >
            <option value="All">All</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white  border rounded-lg overflow-hidden">
          <thead className=" text-blue-400">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className='hover:bg-white hover:text-black'>
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className={`py-3 px-4 ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                  {user.status}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user.id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-black"
                  >
                    <option value="Manger">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                 
                  <button className="bg-blue-500 ml-3 hover:bg-blue-600 text-white py-1 px-4 rounded">
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

export default Page;
