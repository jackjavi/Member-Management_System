import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const UsersContext = createContext();

function UsersContextWrapper({ children }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    role: "",
    limit: 7,
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setUsers([]);
        setIsLoading(false);
        setError("Not authorized");
        return;
      }
      const query = new URLSearchParams({ ...filters, page }).toString();
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/details?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  function handlePrevPage() {
    if (page > 1) setPage(page - 1);
  }

  function handleNextPage() {
    if (page < totalPages) setPage(page + 1);
  }

  const contextValues = {
    users,
    isLoading,
    error,
    filters,
    setFilters,
    page,
    totalPages,
    handlePrevPage,
    handleNextPage,
    fetchUsers,
  };

  return (
    <UsersContext.Provider value={contextValues}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersContextWrapper;
