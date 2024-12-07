import React from "react";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { TbLogs } from "react-icons/tb";
import { Link } from "react-router-dom";

const AsideBar = () => {
  return (
    <aside
      className={`sidebar fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform  lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto px-4 hidden md:block`}
    >
      <div className="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <Link
          to="/"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
        >
          <span className="material-icons-outlined mr-2">
            <HiHome />
          </span>
          Home
          <span className="material-icons-outlined ml-auto">
            <IoIosArrowForward />
          </span>
        </Link>
        <Link
          to="/logs"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
        >
          <span className="material-icons-outlined mr-2">
            <TbLogs />
          </span>
          Logs
          <span className="material-icons-outlined ml-auto">
            <IoIosArrowForward />
          </span>
        </Link>
        <Link
          href="#"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
        >
          <span className="material-icons-outlined mr-2">file_copy</span>
          Another menu item
          <span className="material-icons-outlined ml-auto">
            <IoIosArrowForward />
          </span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <Link
          href="#"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
        >
          <span className="material-icons-outlined mr-2">face</span>
          Profile
          <span className="material-icons-outlined ml-auto">
            <IoIosArrowForward />
          </span>
        </Link>
        <Link
          href="#"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
        >
          <span className="material-icons-outlined mr-2">settings</span>
          Settings
          <span className="material-icons-outlined ml-auto">
            <IoIosArrowForward />
          </span>
        </Link>
        <Link
          href="#"
          className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
        >
          <span className="material-icons-outlined mr-2">
            <MdPowerSettingsNew />
          </span>
          Log out
          <span className="material-icons-outlined ml-auto">
            <IoIosArrowForward />
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default AsideBar;
