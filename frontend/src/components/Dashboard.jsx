import React, { useContext } from "react";
import { LogsContext } from "../context/LogsContextWrapper";
import { HiHome } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { MdPowerSettingsNew } from "react-icons/md";
import { TbLogs } from "react-icons/tb";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { totalLogs } = useContext(LogsContext);
  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden  pt-16">
      <div className="pt-16 max-w-7xl mx-auto flex">
        <aside
          className={`sidebar fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform  lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4 hidden md:block`}
        >
          <div className="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link
              to="#"
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

        <main className="flex-1 p-4">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">
              <h2 className="text-4xl md:text-5xl text-blue-900">
                Welcome <br />
                <strong>Dash</strong>
              </h2>
              <span className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800">
                01:51
              </span>
            </div>

            <div className="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in">
              <h2 className="text-4xl md:text-5xl text-blue-900">
                Total Logs <br />
                <strong>{totalLogs}</strong>
              </h2>
              <Link
                to="/logs"
                className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105"
              >
                See logs
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h3 className="text-xl font-bold text-indigo-800">
                Stats Card 1
              </h3>
            </div>
            <div
              className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-xl font-bold text-indigo-800">
                Stats Card 2
              </h3>
            </div>
            <div
              className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="text-xl font-bold text-indigo-800">
                Stats Card 3
              </h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
