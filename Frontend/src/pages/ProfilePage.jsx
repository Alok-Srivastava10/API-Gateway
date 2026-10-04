import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ratingService } from '../services/ratingService';
import { ConfirmDialog } from '../components/admin/ConfirmDialog';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  User, 
  Mail, 
  Shield, 
  Star, 
  MapPin, 
  Building, 
  Trash2, 
  Sparkles, 
  Heart,
  MessageSquare,
  Award,
  ArrowRight
} from 'lucide-react';

export const ProfilePage = () => {
  const { currentUser, role } = useAuth();
  const [userRatings, setUserRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUserHistory = async () => {
    setLoading(true);
    try {
      if (currentUser?.email) {
        const ratings = await ratingService.getRatingsByUserId(currentUser.email);
        setUserRatings(ratings || []);
      }
    } catch (error) {
      console.error('Error fetching user history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserHistory();
  }, [currentUser]);

  const handleDeleteReview = async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      await ratingService.deleteRating(deleteTargetId);
      toast.success('Review deleted successfully');
      setDeleteTargetId(null);
      fetchUserHistory();
    } catch (error) {
      toast.error('Failed to delete review');
    } finally {
      setDeleting(false);
    }
  };

  const avgGiven = userRatings.length > 0
    ? (userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length).toFixed(1)
    : '0.0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24">
      
      {/* Profile Header Card */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-card p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          {/* Avatar & User Details */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-800 via-brand-700 to-teal-500 text-white font-extrabold flex items-center justify-center text-3xl shadow-lg shadow-brand-700/20">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {currentUser?.name || currentUser?.email?.split('@')[0]}
                </h1>
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                  role === 'ADMIN'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-brand-100 text-brand-900 border border-brand-200'
                }`}>
                  {role || 'USER'}
                </span>
              </div>
              <p className="text-slate-500 text-sm flex items-center gap-1.5 font-medium">
                <Mail className="w-4 h-4 text-slate-400" />
                {currentUser?.email}
              </p>
              <p className="text-slate-600 text-xs sm:text-sm font-medium pt-1">
                {currentUser?.about || 'Avid traveler & verified reviewer on HotelVerse.'}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 w-full sm:w-auto justify-around sm:justify-start">
            <div className="text-center px-4">
              <span className="block text-2xl font-extrabold text-brand-800">{userRatings.length}</span>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Reviews Given</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-center px-4">
              <span className="block text-2xl font-extrabold text-amber-600">⭐ {avgGiven}</span>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Rating</span>
            </div>
          </div>

        </div>
      </section>

      {/* Review History Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-brand-700" />
              My Rated Hotels & History
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Aggregated from RatingService & HotelService via Feign Client
            </p>
          </div>

          <span className="text-xs font-bold text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200">
            {userRatings.length} {userRatings.length === 1 ? 'Entry' : 'Entries'}
          </span>
        </div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 bg-slate-100 rounded-3xl w-full" />
            ))}
          </div>
        ) : userRatings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userRatings.map((item) => (
              <div
                key={item.ratingId || Math.random()}
                className="bg-white rounded-3xl border border-slate-100 shadow-card p-6 flex flex-col justify-between space-y-4 hover:shadow-card-hover transition-all"
              >
                {/* Hotel Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1">
                      {item.hotel?.name || `Hotel (ID: ${item.hotelId})`}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-coral-500" />
                      {item.hotel?.location || 'India'}
                    </div>
                  </div>

                  {/* Rating Given */}
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full shrink-0">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-amber-900">{item.rating}/5</span>
                  </div>
                </div>

                {/* Review Remark */}
                <p className="text-slate-600 text-sm italic bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  "{item.remarks || item.feedback || 'Great experience!'}"
                </p>

                {/* Card Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <Link
                    to={`/hotels/${item.hotelId}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:text-brand-800 transition-colors"
                  >
                    View Hotel <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => setDeleteTargetId(item.ratingId)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Reviews state */
          <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No Reviews Written Yet</h3>
            <p className="text-slate-500 text-sm">
              You haven't reviewed any hotels yet. Browse our curated collection and share your stay experience!
            </p>
            <Link
              to="/hotels"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-md transition-all"
            >
              Explore Hotels
            </Link>
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteReview}
        title="Delete Review"
        message="Are you sure you want to delete this rating and review? It will be permanently removed from RatingService (MongoDB)."
        confirmText="Delete Review"
        loading={deleting}
      />
    </div>
  );
};
