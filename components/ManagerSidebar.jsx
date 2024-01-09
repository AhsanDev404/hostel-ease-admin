import { setUser } from "@/redux/slices/authSlice";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useDispatch } from "react-redux";


const ManagerSidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const logout = async () => {
    try {
      const auth  = getAuth()
      await signOut(auth);
      dispatch(setUser(null));
      router.push('/'); 
     
    } catch (authStateChangedError) {
      console.error('Error in onAuthStateChanged:', authStateChangedError);
    }
  };
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
          <Link href="/manager/notifications">
            <p className="flex items-center text-white hover:text-gray-300">
              <FaBell className="mr-2" /> Notifications
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
          <button onClick={()=>logout()} className="flex items-center text-white hover:text-gray-300">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
};

export default ManagerSidebar;
