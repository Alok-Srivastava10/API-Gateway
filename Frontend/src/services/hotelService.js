import api from '../api/axios';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';

export const hotelService = {
  // GET /hotels
  getHotels: async () => {
    try {
      const response = await api.get('/hotels');
      if (Array.isArray(response.data)) {
        return response.data.map((hotel, index) => ({
          ...hotel,
          image: hotel.image || DEFAULT_IMAGE,
          price: hotel.price || (12000 + (index * 2500))
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching /hotels from microservices:', error.message);
      return [];
    }
  },

  // GET /hotels/:id
  getHotelById: async (id) => {
    try {
      const response = await api.get(`/hotels/${id}`);
      if (response.data) {
        return {
          ...response.data,
          image: response.data.image || DEFAULT_IMAGE,
          price: response.data.price || 15000,
          amenities: response.data.amenities || [
            "Free High-Speed WiFi",
            "Infinity Pool",
            "Spa & Wellness Center",
            "Fine Dining Restaurant",
            "24/7 Room Service",
            "Airport Pickup"
          ]
        };
      }
      return null;
    } catch (error) {
      console.error(`Error fetching /hotels/${id}:`, error.message);
      return null;
    }
  },

  // GET /hotels/search?location=...&minRating=...
  searchHotels: async (location = '', minRating = null) => {
    try {
      let query = [];
      if (location) query.push(`location=${encodeURIComponent(location)}`);
      if (minRating) query.push(`minRating=${minRating}`);
      const queryString = query.length > 0 ? `?${query.join('&')}` : '';

      const response = await api.get(`/hotels/search${queryString}`);
      if (Array.isArray(response.data)) {
        return response.data.map((hotel, index) => ({
          ...hotel,
          image: hotel.image || DEFAULT_IMAGE,
          price: hotel.price || (12000 + (index * 2500))
        }));
      }
      return [];
    } catch (error) {
      console.error('Error searching /hotels:', error.message);
      return [];
    }
  },

  // POST /hotels (Admin)
  createHotel: async (hotelData) => {
    try {
      const response = await api.post('/hotels', hotelData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Failed to create hotel';
      throw new Error(message);
    }
  },

  // PUT /hotels/:id (Admin)
  updateHotel: async (id, hotelData) => {
    try {
      const response = await api.put(`/hotels/${id}`, hotelData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Failed to update hotel';
      throw new Error(message);
    }
  },

  // DELETE /hotels/:id (Admin)
  deleteHotel: async (id) => {
    try {
      const response = await api.delete(`/hotels/${id}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || 'Failed to delete hotel';
      throw new Error(message);
    }
  }
};
