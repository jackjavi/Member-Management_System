import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

function AuthContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storeToken = (token) => localStorage.setItem("authToken", token);
  const removeToken = () => localStorage.removeItem("authToken");

  useEffect(() => {
    authenticateUser();
  }, []);

  async function authenticateUser() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
        return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/verify-token`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
      setIsLoading(false);
      setIsLoggedIn(true);

      console.log(response);
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);

      console.log(error);
    }
  }
  function disconnect() {
    removeToken();
    authenticateUser();
  }

  const contextValues = {
    user,
    storeToken,
    removeToken,
    authenticateUser,
    isLoading,
    isLoggedIn,
    disconnect,
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;