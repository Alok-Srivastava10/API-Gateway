import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { StarRating } from '../common/StarRating';
import { useAuth } from '../../context/AuthContext';
import { ratingService } from '../../services/ratingService';
import toast from 'react-hot-toast';
import { Send, Sparkles } from 'lucide-react';

export const ReviewModal = ({ isOpen, onClose, hotel, onReviewAdded }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [remarks, setRemarks] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error('Please select a star rating');
      return;
    }
    if (!remarks.trim()) {
      toast.error('Please enter your written review feedback');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        userId: currentUser?.userId || currentUser?.userID || currentUser?.email,
        hotelId: hotel.id,
        rating: Number(rating),
        remarks: remarks.trim()
      };

      await ratingService.createRating(payload);
      toast.success('Review submitted successfully!', {
        icon: '🌟',
        style: { borderRadius: '12px', background: '#0F766E', color: '#fff' }
      });
      setRemarks('');
      setRating(5);
      if (onReviewAdded) onReviewAdded();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Review ${hotel?.name || 'Hotel'}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* User Badge */}
        <div className="flex items-center gap-3 p-3.5 bg-brand-50/70 rounded-2xl border border-brand-100">
          <div className="w-10 h-10 rounded-full bg-brand-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-800">
              Posting publicly as <span className="text-brand-800">{currentUser?.name || currentUser?.email}</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Verified Guest Review</span>
          </div>
        </div>

        {/* Interactive Star Picker */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            How would you rate your stay? <span className="text-rose-500">*</span>
          </label>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <StarRating
              value={rating}
              onChange={(val) => setRating(val)}
              size="lg"
              readOnly={false}
              showLabel={true}
            />
          </div>
        </div>

        {/* Written Review */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Your Review & Experience <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows="4"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Tell future travelers about the room quality, cleanliness, food, location, and staff hospitality..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700 transition-all resize-none"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-md shadow-brand-700/20 hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Review
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
