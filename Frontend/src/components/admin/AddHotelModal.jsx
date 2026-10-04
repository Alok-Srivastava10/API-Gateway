import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { hotelService } from '../../services/hotelService';
import toast from 'react-hot-toast';
import { Plus, Building, MapPin, AlignLeft, DollarSign, Image } from 'lucide-react';

export const AddHotelModal = ({ isOpen, onClose, onHotelCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    about: '',
    price: 15000,
    image: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim() || !formData.about.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await hotelService.createHotel({
        ...formData,
        price: Number(formData.price) || 12000,
        image: formData.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
      });
      toast.success('Hotel created successfully!', {
        icon: '🏨',
        style: { borderRadius: '12px', background: '#0F766E', color: '#fff' }
      });
      setFormData({ name: '', location: '', about: '', price: 15000, image: '' });
      if (onHotelCreated) onHotelCreated();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create hotel');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Luxury Hotel">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Hotel Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Hotel Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. The Leela Palace"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
              required
            />
          </div>
        </div>

        {/* Location & Price Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              City / Location <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Udaipur, Rajasthan"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Starting Price (₹/night)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="15000"
                className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
              />
            </div>
          </div>
        </div>

        {/* Image URL */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Image URL (Unsplash or CDN)
          </label>
          <div className="relative">
            <Image className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
            />
          </div>
        </div>

        {/* About / Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            About Hotel & Amenities <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows="3"
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="A lakeside luxury palace with private courtyards, spa retreats, and world-class dining..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700 resize-none"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-md shadow-brand-700/20 disabled:opacity-50 transition-all"
          >
            {submitting ? 'Creating...' : 'Create Hotel'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
