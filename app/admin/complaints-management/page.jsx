'use client'
import React, { useState } from 'react';
import LoadMoreButton from '@/components/LoadMoreButton';

const complaintsData = [
  { id: 1, hostelName: 'Hostel A', managerEmail: 'john@example.com', description: 'No hot water in room', resolved: false },
  { id: 2, hostelName: 'Hostel C', managerEmail: 'alice@example.com', description: 'Loud noises during night', resolved: false },
  { id: 3, hostelName: 'Hostel D', managerEmail: 'bob@example.com', description: 'Internet connectivity issues', resolved: false },
  { id: 4, hostelName: 'Hostel E', managerEmail: 'eva@example.com', description: 'Broken furniture in common area', resolved: false },
  { id: 5, hostelName: 'Hostel F', managerEmail: 'frank@example.com', description: 'Pest infestation in the kitchen', resolved: false },
  { id: 6, hostelName: 'Hostel G', managerEmail: 'grace@example.com', description: 'Heating not working in winter', resolved: false },
  { id: 7, hostelName: 'Hostel H', managerEmail: 'henry@example.com', description: 'Leaky roof during rains', resolved: false },
  { id: 8, hostelName: 'Hostel I', managerEmail: 'ivy@example.com', description: 'Issues with laundry service', resolved: false },
  { id: 9, hostelName: 'Hostel J', managerEmail: 'jack@example.com', description: 'Unresponsive staff members', resolved: false },
  { id: 10, hostelName: 'Hostel K', managerEmail: 'karen@example.com', description: 'Security concerns in the vicinity', resolved: false },
  { id: 11, hostelName: 'Hostel L', managerEmail: 'larry@example.com', description: 'HVAC system malfunction', resolved: false },
  { id: 12, hostelName: 'Hostel M', managerEmail: 'mary@example.com', description: 'Inadequate cleaning services', resolved: false },
  { id: 13, hostelName: 'Hostel N', managerEmail: 'nancy@example.com', description: 'Noisy neighbors disturbing sleep', resolved: false },
  { id: 14, hostelName: 'Hostel O', managerEmail: 'oliver@example.com', description: 'Issues with water supply', resolved: false },
  { id: 15, hostelName: 'Hostel P', managerEmail: 'peter@example.com', description: 'Unreliable electricity supply', resolved: false },
  { id: 16, hostelName: 'Hostel Q', managerEmail: 'quinn@example.com', description: 'Insufficient parking space', resolved: false },
  { id: 17, hostelName: 'Hostel R', managerEmail: 'rachel@example.com', description: 'Damaged windows in rooms', resolved: false },
  { id: 18, hostelName: 'Hostel S', managerEmail: 'steve@example.com', description: 'Issues with garbage disposal', resolved: false },
  { id: 19, hostelName: 'Hostel T', managerEmail: 'tina@example.com', description: 'Uncomfortable mattresses in rooms', resolved: false },
  { id: 20, hostelName: 'Hostel U', managerEmail: 'ursula@example.com', description: 'Problems with the heating system', resolved: false },
];


const AdminPanel = () => {
  const [complaints, setComplaints] = useState(complaintsData);

  const handleResolveComplaint = (complaintId) => {
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.id === complaintId) {
        return { ...complaint, resolved: true };
      }
      return complaint;
    });
    setComplaints(updatedComplaints);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Complaint Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border rounded-lg overflow-hidden">
          <thead className="text-blue-400">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Hostel Name</th>
              <th className="py-3 px-4 text-left">Manager Email</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Resolved</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(complaint => (
              <tr key={complaint.id} className='hover:bg-white hover:text-black'>
                <td className="py-3 px-4">{complaint.id}</td>
                <td className="py-3 px-4">{complaint.hostelName}</td>
                <td className="py-3 px-4">{complaint.managerEmail}</td>
                <td className="py-3 px-4">{complaint.description}</td>
                <td className={`py-3 px-4 ${complaint.resolved ? 'text-green-500' : 'text-red-500'}`}>
                  {complaint.resolved ? 'Yes' : 'No'}
                </td>
                <td className="py-3 px-4">
                  {!complaint.resolved && (
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                      onClick={() => handleResolveComplaint(complaint.id)}
                    >
                      Resolve
                    </button>
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
