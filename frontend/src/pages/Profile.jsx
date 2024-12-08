import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../context/AuthContextWrapper";

const Profile = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Failed to load profile data.</p>;
  }

  const { name, email, role, profilePicture, dateOfBirth } = user;

  return (
    <div className="pt-32 max-w-7xl mx-auto flex flex-col px-4">
      <h2 className="text-lg font-medium leading-6 text-gray-900">Profile</h2>
      <p className="mt-1 text-sm text-gray-500">
        This information will be displayed publicly, so be careful what you
        share.
      </p>

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
        </div>

        {/* Profile Picture */}
        <div className="mt-6 lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
          <p className="text-sm font-medium text-gray-700">Photo</p>
          <div className="relative overflow-hidden rounded-full lg:block">
            {profilePicture ? (
              <img
                src={
                  profilePicture.includes("githubusercontent.com")
                    ? user.profilePicture
                    : `${process.env.REACT_APP_BACKEND_URL}/${user.profilePicture}`
                }
                alt={name}
                className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover"
              />
            ) : (
              <CgProfile className="w-10 h-10" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
