import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import AsideBar from "../components/AsideBar";
import { AuthContext } from "../context/AuthContextWrapper";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Failed to load profile data.</p>;
  }

  const { name, email, role, profilePicture, dateOfBirth } = user;
  const showCompleteProfileButton = !profilePicture && !dateOfBirth;

  return (
    <div className="bg-indigo-50">
      <div className="pt-32 max-w-7xl mx-auto flex min-h-screen">
        <AsideBar />
        <div className="flex flex-auto flex-col px-4">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500"></p>

          <div className="mt-6 flex flex-col lg:flex-row">
            <div className="flex-grow space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name || ""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  disabled
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email || ""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  disabled
                />
              </div>

              {/* Role Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={role || ""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  disabled
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="text"
                  value={dateOfBirth || "N/A"}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  disabled
                />
              </div>

              {/* Button to complete member profile */}
              {showCompleteProfileButton && (
                <div className="mt-6">
                  <p className="text-sm text-red-500">
                    Your profile is incomplete. Please complete your member
                    profile.
                  </p>
                  <Link
                    to="/profile/add"
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Complete Profile
                  </Link>
                </div>
              )}
            </div>

            {/* Profile Picture */}
            <div className="mt-6 lg:mt-0 lg:ml-6 flex-auto justify-start md:justify-end flex">
              <div className="relative overflow-hidden rounded-full lg:block">
                {profilePicture ? (
                  <img
                    src={
                      profilePicture.includes("githubusercontent.com")
                        ? user.profilePicture
                        : `${process.env.REACT_APP_BACKEND_URL}/${user.profilePicture}`
                    }
                    alt={name}
                    className="w-20 h-20 rounded-full transition-transform duration-300 hover:scale-110 object-cover"
                  />
                ) : (
                  <CgProfile className="w-10 h-10" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
