import axios from "axios";

/**
 * Fetches system-wide logs from the backend.
 * @returns {Promise<Object[]>} An array of logs containing User and ActivityLog details.
 */
export const fetchSystemWideLogs = async (page) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/system-logs?page=${page}&limit=5`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching system-wide logs:", error);
    throw error;
  }
};
