'use client'
import React, { useState } from 'react';

const citiesData = [
  { id: 1, name: 'New York' },
  { id: 2, name: 'Los Angeles' },
  { id: 3, name: 'Chicago' },
  { id: 4, name: 'Houston' },
  { id: 5, name: 'San Francisco' },
  // Add more cities as needed
];

const AdminPanel = () => {
  const [cities, setCities] = useState(citiesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState('');

  const handleAddCity = () => {
    // Assuming you have a function to add a new city to the list
    // For example:
    // setCities([...cities, { id: cities.length + 1, name: newCityName }]);
    // Close the modal
    setIsModalOpen(false);
    // Clear the input field
    setNewCityName('');
  };

  const handleDeleteCity = (id) => {
    const updatedCities = cities.filter(city => city.id !== id);
    setCities(updatedCities);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">City Management</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add City
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border rounded-lg overflow-hidden">
          <thead className="text-blue-400">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">City Name</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.map(city => (
              <tr key={city.id} className='hover:bg-white hover:text-black'>
                <td className="py-3 px-4">{city.id}</td>
                <td className="py-3 px-4">{city.name}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded mr-2"
                    onClick={() => handleDeleteCity(city.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
          <div className="modal-container bg-white w-64 p-6 rounded shadow-lg z-50">
            <h2 className="text-2xl font-bold mb-4">Add City</h2>
            <input
              type="text"
              placeholder="Enter city name"
              className="border border-gray-300 rounded px-2 py-1 mb-4 w-full"
              value={newCityName}
              onChange={e => setNewCityName(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
              onClick={handleAddCity}
            >
              Add City
            </button>
            <button
              className="text-sm text-gray-600 mt-2 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
