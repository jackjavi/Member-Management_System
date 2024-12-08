import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { editProfile } from "../api/api";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userId: user.id,
    name: user?.name || "",
    email: user?.email || "",
    dateOfBirth: user?.dateOfBirth || "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", formData.userId);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("file", formData.profilePicture);

    try {
      const response = await editProfile(data);
      if (response.status === 200) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-indigo-50">
      <div className="pt-32 max-w-7xl mx-auto flex flex-col px-4 min-h-screen">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Edit Profile
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your account information below.
        </p>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
            />
          </div>

          {/* Role 
        <div>
          <label
            htmlFor="roleId"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            name="roleId"
            id="roleId"
            value={formData.roleId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          >
            <option value="">Select Role</option>
            <option value="1">Admin</option>
            <option value="2">Member</option>
            <option value="3">Viewer</option>
          </select>
        </div>
        */}

          {user.profilePIcture ||
            (user.dateOfBirth && (
              /* Date of Birth */
              <>
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  />
                </div>

                {/* Profile Picture */}
                <div>
                  <label
                    htmlFor="profilePicture"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
                  />
                  {formData.profilePicture &&
                    typeof formData.profilePicture === "string" && (
                      <img
                        src={formData.profilePicture}
                        alt="Profile"
                        className="mt-2 h-20 w-20 rounded-full"
                      />
                    )}
                </div>
              </>
            ))}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
