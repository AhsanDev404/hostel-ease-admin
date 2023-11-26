import React from 'react';

const userData = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  hostel: 'Hostel A',
  complaints: [
    { id: 1, issue: 'Room cleanliness issue' },
    { id: 2, issue: 'Noisy neighbors' },
    // Add more complaints
  ],
};

const UserPage = () => {
  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">User Information</h1>
      <div className="bg-white shadow-md p-6 rounded-lg mb-8">
        <p className="text-lg">
          <strong>Name:</strong> {userData.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="text-lg">
          <strong>Hostel:</strong> {userData.hostel}
        </p>
      </div>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Complaints</h2>
        <ul className="list-disc list-inside">
          {userData.complaints.map(complaint => (
            <li key={complaint.id} className="text-lg mb-2">
              {complaint.issue}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
