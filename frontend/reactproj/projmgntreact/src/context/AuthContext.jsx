import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext(null);

const baseUrl="http://www.localhost:5454/api/users/profile"

// AuthProvider component
export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsAuthenticated(true);
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = ( async (token)=>{
    try {
      const response = await fetch(baseUrl, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userEmail', data.email);
        // console.log('User details fetched:', data);
      } else {
        console.error('Failed to fetch user details:', response.status);
        logout(); // Logout if token is invalid
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      logout(); // Logout in case of an error
    }
  })

  // Login function
  const login = async (token) => {
  
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
    await fetchUserProfile(token);
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail')
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