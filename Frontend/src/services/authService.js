import api from '../api/axios';
import { jwtDecode } from 'jwt-decode';

export const authService = {
  // Login: POST /auth/login
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      if (token) {
        localStorage.setItem('jwt_token', token);
        const decoded = jwtDecode(token);
        
        let user = {
          email: decoded.sub || email,
          role: decoded.role || 'USER',
          name: (decoded.sub || email).split('@')[0].toUpperCase(),
          userId: decoded.sub || email
        };

        // Try to fetch real user details & UUID from UserService
        try {
          const usersRes = await api.get('/Users');
          if (Array.isArray(usersRes.data)) {
            const matchedUser = usersRes.data.find(
              u => u.email?.toLowerCase() === (decoded.sub || email).toLowerCase()
            );
            if (matchedUser) {
              user.userId = matchedUser.userID || matchedUser.userId || user.userId;
              user.name = matchedUser.name || user.name;
              user.about = matchedUser.about || '';
            }
          }
        } catch (e) {
          console.warn('Could not enrich user profile from UserService:', e.message);
        }

        localStorage.setItem('user_info', JSON.stringify(user));
        return { success: true, token, user };
      }
      return { success: false, message: 'No authentication token received' };
    } catch (error) {
      const message = error.response?.data?.error || 
                      error.response?.data?.message || 
                      (typeof error.response?.data === 'string' ? error.response.data : null) || 
                      'Invalid email or password';
      
      throw new Error(message);
    }
  },

  // Register: POST /auth/register and POST /Users
  register: async (userData) => {
    const chosenRole = userData.role || 'USER';

    try {
      // 1. Register with AuthService (Authentication DB)
      const authResponse = await api.post('/auth/register', {
        email: userData.email,
        password: userData.password,
        role: chosenRole
      });

      // 2. Also register user entity in UserService (Users DB)
      try {
        await api.post('/Users', {
          name: userData.name || userData.email.split('@')[0],
          email: userData.email,
          about: userData.about || 'Hotel enthusiast & reviewer'
        });
      } catch (userErr) {
        console.warn('UserService registration note:', userErr.response?.data || userErr.message);
      }

      return { success: true, data: authResponse.data };
    } catch (error) {
      const message = error.response?.data?.error || 
                      error.response?.data?.message || 
                      (typeof error.response?.data === 'string' ? error.response.data : null) || 
                      'Registration failed';
      throw new Error(message);
    }
  },

  // Validate Token
  validateToken: async () => {
    try {
      const response = await api.get('/auth/validate');
      return response.data;
    } catch (error) {
      return false;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_info');
  },

  // Get current user from storage
  getCurrentUser: () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) return null;
    try {
      const stored = localStorage.getItem('user_info');
      if (stored) {
        return JSON.parse(stored);
      }
      const decoded = jwtDecode(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_info');
        return null;
      }
      return {
        email: decoded.sub,
        role: decoded.role || 'USER',
        name: decoded.sub.split('@')[0],
        userId: decoded.sub
      };
    } catch (e) {
      return null;
    }
  }
};
