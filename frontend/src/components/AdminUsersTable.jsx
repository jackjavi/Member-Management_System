import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import dayjs from "dayjs";
import AsideBar from "./AsideBar";

const AdminUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/details`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setUsers(response.data.users);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete user
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/users/${userId}`); // Replace with your API endpoint
        setUsers(users.filter((user) => user.id !== userId));
      } catch (err) {
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden pt-36">
      <div className="max-w-7xl mx-auto flex">
        <AsideBar />

        <div className="bg-gray-50 flex-1 p-4 rounded-xl h-[60vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-indigo-800">
                Manage Users
              </h1>
              <button
                onClick={fetchUsers}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                <FiEdit className="text-lg" />
                <span>Refresh</span>
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-10 text-gray-600">Loading...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-600">{error}</div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="table-auto w-full text-left">
                  <thead className="bg-indigo-100">
                    <tr>
                      <th className="px-4 py-2 text-indigo-800">ID</th>
                      <th className="px-4 py-2 text-indigo-800">Name</th>
                      <th className="px-4 py-2 text-indigo-800">Email</th>
                      <th className="px-4 py-2 text-indigo-800">Role</th>
                      <th className="px-4 py-2 text-indigo-800">Joined</th>
                      <th className="px-4 py-2 text-indigo-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-indigo-50 transition-colors duration-200`}
                      >
                        <td className="px-4 py-2">{user.id}</td>
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2 capitalize">
                          {user.role.name}
                        </td>
                        <td className="px-4 py-2">
                          {dayjs(user.createdAt).format("YYYY-MM-DD")}
                        </td>
                        <td className="px-4 py-2 flex space-x-2">
                          <button
                            onClick={() =>
                              (window.location.href = `/users/edit/${user.id}`)
                            }
                            className="text-indigo-600 hover:text-indigo-800 transition duration-300"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800 transition duration-300"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersTable;
