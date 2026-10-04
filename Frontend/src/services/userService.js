import api from '../api/axios';

export const userService = {
  // GET /Users
  getAllUsers: async () => {
    try {
      const response = await api.get('/Users');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching /Users from microservices:', error.message);
      return [];
    }
  },

  // GET /Users/:userId
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/Users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching /Users/${userId}:`, error.message);
      return null;
    }
  },

  // DELETE /Users/:userId (Admin)
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/Users/${userId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Failed to delete user';
      throw new Error(message);
    }
  }
};
