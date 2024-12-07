import React from "react";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";

const Sidebar = ({ mobileMenuOpen, toggleMobileMenu }) => {
  return (
    <aside
      className={`fixed top-0 left-0 w-[240px] h-full bg-indigo-50 transform ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50 mt-20 shadow-lg`}
    >
      <div className="p-4">
        <button
          className="text-gray-500 hover:text-indigo-800 transition-transform duration-300"
          onClick={toggleMobileMenu}
        >
          <span className="material-icons-outlined">
            <FaWindowClose />
          </span>
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg mb-6 p-4">
        <Link
          href="#"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4"
        >
          <HiHome className="mr-2" />
          Home
          <IoIosArrowForward className="ml-auto" />
        </Link>
        <Link
          href="#"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4"
        >
          <span className="material-icons-outlined mr-2">tune</span>
          Some menu item
          <IoIosArrowForward className="ml-auto" />
        </Link>
        <Link
          href="#"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4"
        >
          <span className="material-icons-outlined mr-2">file_copy</span>
          Another menu item
          <IoIosArrowForward className="ml-auto" />
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-4">
        <Link
          href="#"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4"
        >
          <span className="material-icons-outlined mr-2">face</span>
          Profile
          <IoIosArrowForward className="ml-auto" />
        </Link>
        <Link
          href="#"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4"
        >
          <span className="material-icons-outlined mr-2">settings</span>
          Settings
          <IoIosArrowForward className="ml-auto" />
        </Link>
        <Link
          href="#"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4"
        >
          <MdPowerSettingsNew className="mr-2" />
          Log out
          <IoIosArrowForward className="ml-auto" />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
