import { createContext, useContext, useState, useEffect } from 'react';
import { users } from './mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user from storage
    const storedUser = localStorage.getItem('infaira_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      // Default to admin for demo
      setCurrentUser(users.admin);
      localStorage.setItem('infaira_user', JSON.stringify(users.admin));
    }
    setIsLoading(false);
  }, []);

  const login = (userType) => {
    const user = users[userType];
    setCurrentUser(user);
    localStorage.setItem('infaira_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('infaira_user');
  };

  const hasPermission = (solution) => {
    if (!currentUser) return false;
    return currentUser.permissions.includes(solution);
  };

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
