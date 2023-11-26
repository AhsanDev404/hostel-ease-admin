// BookingPage.js
'use client'
import React, { useState } from 'react';

const bookingsData = [
  { 
    id: 1, 
    roomNumber: '101', 
    guestName: 'Alice Johnson', 
    checkIn: '2023-11-15', 
    checkOut: '2023-11-18'
  },
  { 
    id: 2, 
    roomNumber: '102', 
    guestName: 'Bob Brown', 
    checkIn: '2023-11-20', 
    checkOut: '2023-11-25'
  },
  { 
    id: 3, 
    roomNumber: '103', 
    guestName: 'Eva White', 
    checkIn: '2023-12-01', 
    checkOut: '2023-12-05'
  },
];

const hostelInfo = {
  contactNumber: '123-456-7890',
  address: '123 Main St, City, Country'
};

const BookingPage = () => {
  // State for booking data
  const [bookings, setBookings] = useState([...bookingsData]);

  // Function to determine room status
  const getRoomStatus = (checkIn, checkOut) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format

    if (currentDate >= checkIn && currentDate <= checkOut) {
      return 'Occupied';
    } else {
      return 'Vacant';
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Booking Management</h1>
      {/* Display hostel contact number and address */}
      <div className="mb-4">
        <p>Contact Number: {hostelInfo.contactNumber}</p>
        <p>Address: {hostelInfo.address}</p>
      </div>
      {/* Display booking information */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border rounded-lg overflow-hidden">
          <thead className="text-blue-400">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Room Number</th>
              <th className="py-3 px-4 text-left">Guest Name</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through bookings data */}
            {bookings.map(booking => (
              <tr key={booking.id} className='hover:bg-white hover:text-black'>
                <td className="py-3 px-4">{booking.id}</td>
                <td className="py-3 px-4">{booking.roomNumber}</td>
                <td className="py-3 px-4">{booking.guestName}</td>
                <td className="py-3 px-4">
                  {getRoomStatus(booking.checkIn, booking.checkOut)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingPage;
