import api from '../api/axios';

export const ratingService = {
  // GET /ratings
  getRatings: async () => {
    try {
      const response = await api.get('/ratings');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching /ratings:', error.message);
      return [];
    }
  },

  // GET /ratings/hotels/:hotelId
  getRatingsByHotelId: async (hotelId) => {
    try {
      const response = await api.get(`/ratings/hotels/${hotelId}`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(`Error fetching ratings for hotel ${hotelId}:`, error.message);
      return [];
    }
  },

  // GET /ratings/users/:userId
  getRatingsByUserId: async (userId) => {
    try {
      const response = await api.get(`/ratings/users/${userId}`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(`Error fetching ratings for user ${userId}:`, error.message);
      return [];
    }
  },

  // POST /ratings
  createRating: async (ratingData) => {
    try {
      const response = await api.post('/ratings', ratingData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Failed to submit rating';
      throw new Error(message);
    }
  },

  // DELETE /ratings/:ratingId
  deleteRating: async (ratingId) => {
    try {
      const response = await api.delete(`/ratings/${ratingId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Failed to delete rating';
      throw new Error(message);
    }
  }
};
