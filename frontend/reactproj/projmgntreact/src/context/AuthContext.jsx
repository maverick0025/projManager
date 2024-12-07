import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext(null);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  // State for tracking authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to validate the token with your backend here
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (token) => {
    setIsAuthenticated(true);
    // setUser(userData);
    localStorage.setItem('token', token);
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    // setUser(null);
    localStorage.removeItem('token');
  };

  // Value to be provided to consumers
  const value = {
    isAuthenticated,
    // user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};