import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    const user = authService.getCurrentUser();
    const storedToken = localStorage.getItem('jwt_token');
    if (user && storedToken) {
      setCurrentUser(user);
      setRole(user.role || 'USER');
      setToken(storedToken);
    }
    setLoading(false);

    // Global listener for 401 logout
    const handleLogout = () => {
      setCurrentUser(null);
      setRole(null);
      setToken(null);
      toast.error('Session expired. Please log in again.');
    };

    window.addEventListener('auth-logout', handleLogout);
    return () => window.removeEventListener('auth-logout', handleLogout);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authService.login(email, password);
      if (res.success) {
        setCurrentUser(res.user);
        setRole(res.user.role);
        setToken(res.token);
        toast.success(`Welcome back, ${res.user.name || 'User'}!`, {
          icon: res.user.role === 'ADMIN' ? '👑' : '👋',
          style: { borderRadius: '12px', background: '#0F766E', color: '#fff' }
        });
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message };
    } catch (error) {
      const errorMsg = error.message || 'Invalid email or password';
      toast.error(errorMsg, {
        style: { borderRadius: '12px', background: '#991B1B', color: '#fff' }
      });
      return { success: false, message: errorMsg };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authService.register(userData);
      toast.success(`Registration successful as ${userData.role || 'USER'}! You can now log in.`, {
        icon: '🎉',
        style: { borderRadius: '12px', background: '#0F766E', color: '#fff' }
      });
      return { success: true };
    } catch (error) {
      const errorMsg = error.message || 'Registration failed';
      toast.error(errorMsg, {
        style: { borderRadius: '12px', background: '#991B1B', color: '#fff' }
      });
      return { success: false, message: errorMsg };
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setRole(null);
    setToken(null);
    toast.success('Logged out successfully');
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = role === 'ADMIN';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
