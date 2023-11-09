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

const ManagerSidebar = () => {
  return (
    <div className="w-80 h-screen bg-gray-800 text-white sticky top-0 left-0  flex flex-col items-center p-6">
      <div className="text-2xl font-bold mb-8">Manager Panel</div>
      <ul className="w-full">
        <li className="mb-4">
          <Link href="/manager">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaHome className="mr-2" /> Dashboard
            </p>
          </Link>
        </li>

        <li className="mb-4">
          <Link href="/manager/room-management">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaBed className="mr-2" /> Room Management
            </p>
          </Link>
        </li>

        <li className="mb-4">
          <Link href="/manager/reservation-management">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaBook className="mr-2" /> Reservation Management
            </p>
          </Link>
        </li>

        <li className="mb-4">
          <Link href="/manager/profile">
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

export default ManagerSidebar;
