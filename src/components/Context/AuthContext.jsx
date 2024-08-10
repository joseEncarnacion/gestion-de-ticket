import React, { createContext, useState, useEffect } from 'react';
import api_handler from '../Controllers/api_handler';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the authenticated user info from local storage or an API
    console.log("localStored: "+localStorage.getItem('user'));
    const fetchUser = async () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Optionally, you could add a call to an API to validate the user's session
        console.log('Please enter your session before creating a new user account');
      }
    };

    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api_handler.login(username, password);
      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
       
      }
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const logout = async () => {
    try {
      await api_handler.logout();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };



  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
