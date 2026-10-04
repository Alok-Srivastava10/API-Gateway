import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hotelService } from '../services/hotelService';
import { useAuth } from '../context/AuthContext';
import { StarRating } from '../components/common/StarRating';
import { ReviewModal } from '../components/hotel/ReviewModal';
import { 
  MapPin, 
  Star, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  MessageSquarePlus, 
  User, 
  Calendar,
  CheckCircle2,
  LogIn
} from 'lucide-react';

export const HotelDetailPage = () => {
  const { hotelId } = useParams();
  const { isAuthenticated, currentUser } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const fetchHotelData = async () => {
    setLoading(true);
    try {
      const data = await hotelService.getHotelById(hotelId);
      setHotel(data);
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, [hotelId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
        <div className="h-6 bg-slate-200 rounded-lg w-32" />
        <div className="h-[400px] bg-slate-200 rounded-3xl w-full" />
        <div className="h-24 bg-slate-200 rounded-2xl w-full" />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-3xl border border-slate-100 shadow-card space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Hotel Not Found</h3>
        <p className="text-slate-500 text-sm">The hotel you are looking for does not exist or has been removed.</p>
        <Link to="/hotels" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-700 text-white rounded-xl font-bold text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Hotels
        </Link>
      </div>
    );
  }

  const ratings = hotel.ratings || [];
  const avgRating = hotel.averageRating ? Number(hotel.averageRating).toFixed(1) : '0.0';
  const amenities = hotel.amenities || [
    "Free High-Speed WiFi",
    "Infinity Pool",
    "Spa & Wellness Center",
    "Fine Dining Restaurant",
    "24/7 Room Service",
    "Airport Pickup"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      
      {/* Back Button */}
      <div>
        <Link
          to="/hotels"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all hotels
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[460px] flex flex-col justify-end p-8 sm:p-12 shadow-2xl">
        <img
          src={hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80'}
          alt={hotel.name}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        {/* Floating Content */}
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/30 text-brand-200 border border-brand-400/30 text-xs font-bold backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-coral-400" />
              {hotel.location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Luxury Stay
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {hotel.name}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            {/* Rating pill */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center text-base shadow-sm">
                ⭐ {avgRating}
              </div>
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider">Overall Score</span>
                <span className="text-xs text-slate-300 font-medium">Based on {ratings.length} verified {ratings.length === 1 ? 'review' : 'reviews'}</span>
              </div>
            </div>

            {/* Price pill */}
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15">
              <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider">Tariff</span>
              <span className="text-lg font-extrabold text-white">
                ₹{hotel.price ? hotel.price.toLocaleString('en-IN') : '14,500'}{' '}
                <span className="text-xs font-normal text-slate-300">/ night</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Details + Amenities + Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols: About & Customer Reviews */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* About Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-8 space-y-4">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              About This Experience
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {hotel.about || 'Offering iconic architecture, panoramic natural vistas, and unmatched bespoke hospitality.'}
            </p>
          </div>

          {/* Amenities Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-8 space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Featured Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  Guest Reviews
                  <span className="text-sm font-bold bg-brand-50 text-brand-800 px-3 py-1 rounded-full border border-brand-100">
                    {ratings.length}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Aggregated from RatingService & UserService</p>
              </div>

              {/* Write review trigger button */}
              {isAuthenticated ? (
                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-md shadow-brand-700/20 hover:shadow-lg transition-all"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  Write a Review
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-brand-800 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In to Review
                </Link>
              )}
            </div>

            {/* Reviews List */}
            {ratings.length > 0 ? (
              <div className="space-y-4">
                {ratings.map((rev) => (
                  <div
                    key={rev.ratingId || Math.random()}
                    className="p-6 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* User details from Microservice Aggregation */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-700 to-teal-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                          {rev.user?.name ? rev.user.name.charAt(0).toUpperCase() : 'G'}
                        </div>
                        <div>
                          <span className="block text-sm font-bold text-slate-900">
                            {rev.user?.name || rev.userId || 'Guest Reviewer'}
                          </span>
                          <span className="block text-[11px] text-slate-500 font-medium">
                            {rev.user?.about || rev.user?.email || 'Verified Guest'}
                          </span>
                        </div>
                      </div>

                      {/* Star Rating Badge */}
                      <div className="shrink-0 flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-amber-900">{rev.rating}/5</span>
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="text-slate-700 text-sm leading-relaxed pl-13 pt-1">
                      "{rev.remarks || rev.feedback || 'Wonderful experience!'}"
                    </p>

                    {/* Timestamp */}
                    {rev.createdAt && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                        <Calendar className="w-3 h-3" />
                        Posted {rev.createdAt}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
                <p className="text-sm font-bold text-slate-700">No Reviews Yet</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Be the first traveler to share your stay experience and review {hotel.name}!
                </p>
                {isAuthenticated && (
                  <button
                    onClick={() => setReviewModalOpen(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors"
                  >
                    Leave First Review
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Booking Summary & Microservices Badge */}
        <div className="space-y-6">
          
          {/* Quick Book Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-8 space-y-6 sticky top-28">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Book This Stay</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">
                  ₹{hotel.price ? hotel.price.toLocaleString('en-IN') : '14,500'}
                </span>
                <span className="text-sm text-slate-400">/ night</span>
              </div>
            </div>

            <div className="p-4 bg-brand-50/50 rounded-2xl border border-brand-100/60 space-y-2">
              <span className="text-xs font-bold text-brand-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-600" /> Best Price Guarantee
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Includes complimentary breakfast, high-speed WiFi, and free cancellation up to 24h before arrival.
              </p>
            </div>

            {isAuthenticated ? (
              <button
                onClick={() => setReviewModalOpen(true)}
                className="w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-lg shadow-brand-700/25 transition-all text-center flex items-center justify-center gap-2"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Review This Hotel
              </button>
            ) : (
              <Link
                to="/login"
                className="w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-lg shadow-brand-700/25 transition-all text-center block"
              >
                Sign In to Post Review
              </Link>
            )}

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 space-y-2">
              <div className="flex justify-between">
                <span>Microservice</span>
                <span className="font-semibold text-slate-700">HotelService (Port 8082)</span>
              </div>
              <div className="flex justify-between">
                <span>Reviews Provider</span>
                <span className="font-semibold text-slate-700">RatingService (Port 8083)</span>
              </div>
              <div className="flex justify-between">
                <span>User Resolver</span>
                <span className="font-semibold text-slate-700">UserService (Port 8081)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        hotel={hotel}
        onReviewAdded={fetchHotelData}
      />
    </div>
  );
};
