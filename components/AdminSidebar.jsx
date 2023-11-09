import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaUsers,
  FaBed,
  FaStar,
  FaBook,
  FaExclamationCircle,
  FaCity,
  FaComments,
  FaClipboardList,
  FaCommentsDollar,
  FaImages,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="w-80 h-screen bg-gray-800 text-white sticky top-0 left-0  flex flex-col items-center p-6">
      <div className="text-2xl font-bold mb-8">Admin Panel</div>
      <ul className="w-full">
        <li className="mb-4">
          <Link href="/admin">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaHome className="mr-2" /> Dashboard
            </p>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/users-management">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaUsers className="mr-2" /> Users Management
            </p>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/manager-management">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaCog className="mr-2" /> Manager Management
            </p>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/hostel-management">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaBed className="mr-2" /> Hostel Management
            </p>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/ratings-management">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaStar className="mr-2" /> Ratings Management
            </p>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/booking-management">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaBook className="mr-2" /> Booking Management
            </p>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/complaints-management">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaExclamationCircle className="mr-2" /> Complaints Management
            </p>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/cities-management">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaCity className="mr-2" /> Cities Management
            </p>
          </Link>
        </li>
        
        <li className="mb-4">
          <Link href="/admin/carousel-management">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaClipboardList className="mr-2" /> Carousel Management
            </p>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/profile">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaUserCircle className="mr-2" /> Profile
            </p>
          </Link>
        </li>
        <li className="mb-4">
          
            <button className="flex items-center text-white hover:text-gray-300">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
      
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
};

export default AdminSidebar;
