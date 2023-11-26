"use client"
import StackedLineChart from '@/graphs/StackLineChart'
import React, { useState } from 'react'

export default function Page() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleFilterByDate = () => {
    // Perform filtering logic based on fromDate and toDate
    // This logic will filter the data based on the selected date range
    console.log('Filtering from:', fromDate, 'to:', toDate);
  };

  return (
    <div className='bg-gray-900 m-5 rounded-lg p-5'>
      <div>
        <h1 className='text-4xl text-white mb-5 font-semibold'>Bookings</h1>
        <div className="flex mb-4">
          <label className="text-white mr-2">From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
            className="border border-gray-300 rounded px-2 py-1 text-black"
          />
          <label className="text-white ml-4 mr-2">To:</label>
          <input
            type="date"
            value={toDate}
            onChange={handleToDateChange}
            className="border border-gray-300 rounded px-2 py-1 text-black"
          />
          <button onClick={handleFilterByDate} className="bg-blue-500 text-white px-3 py-1 rounded ml-4">
            Filter by Date
          </button>
        </div>
      </div>
      <StackedLineChart />
    </div>
  )
}
