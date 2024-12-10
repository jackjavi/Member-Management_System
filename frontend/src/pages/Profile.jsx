import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import AsideBar from "../components/AsideBar";
import { AuthContext } from "../context/AuthContextWrapper";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isLoading } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-red-500">
          Failed to load profile data.
        </p>
      </div>
    );
  }

  const { name, email, role, profilePicture, dateOfBirth } = user;
  const showCompleteProfileButton = !profilePicture || !dateOfBirth;

  return (
    <div className="bg-indigo-50 min-h-screen">
      <div className="pt-32 max-w-7xl mx-auto flex lg:gap-[10%] ">
        <AsideBar />
        <div className="flex flex-col flex-auto px-6 lg:px-12 ">
          <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
          <p className="mt-2 text-gray-500 text-sm">
            Account details and preferences.
          </p>

          <div className="mt-8 bg-indigo-100 rounded-xl shadow-md p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
            {/* Left Section: Profile Details */}
            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <p className="mt-1 text-lg text-gray-800 font-semibold">
                  {name || "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-lg text-gray-800 font-semibold">
                  {email || "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <p className="mt-1 text-lg text-gray-800 font-semibold">
                  {role || "N/A"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <p className="mt-1 text-lg text-gray-800 font-semibold">
                  {dateOfBirth || "N/A"}
                </p>
              </div>

              {showCompleteProfileButton && (
                <div className="mt-6">
                  <p className="text-sm text-red-500 mb-2">
                    Your profile is incomplete. Please complete your profile for
                    a better experience.
                  </p>
                  <Link
                    to="/profile/add"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Complete Profile
                  </Link>
                </div>
              )}
            </div>

            {/* Right Section: Profile Picture */}
            <div className="flex-shrink-0 lg:w-48 flex md:flex-col md:justify-between gap-8 md:gap-0 items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md">
                {profilePicture ? (
                  <img
                    src={
                      profilePicture.includes("githubusercontent.com")
                        ? profilePicture
                        : `${process.env.REACT_APP_BACKEND_URL}/${profilePicture}`
                    }
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                    <CgProfile size={64} />
                  </div>
                )}
              </div>
              {/* Admin Actions */}
              {isAdmin && (
                <div className="mt-6">
                  <Link
                    to="/admin/users"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Manage Users
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
