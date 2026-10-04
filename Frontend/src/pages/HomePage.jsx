import React, { useState, useEffect } from 'react';
import { hotelService } from '../services/hotelService';
import { HotelCard } from '../components/hotel/HotelCard';
import { HotelFilter } from '../components/hotel/HotelFilter';
import { HotelCardSkeleton } from '../components/common/LoadingSkeleton';
import { Sparkles, Compass, Building, ShieldCheck, MapPin, HeartHandshake } from 'lucide-react';

export const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      let data;
      if (searchQuery || selectedRating) {
        data = await hotelService.searchHotels(searchQuery, selectedRating);
      } else {
        data = await hotelService.getHotels();
      }
      setHotels(data || []);
    } catch (error) {
      console.error('Error loading hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchHotels();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedRating]);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[420px] flex items-center shadow-2xl mx-4 sm:mx-6 lg:mx-8 mt-4">
        {/* Background Image with Gradient Overlay */}
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Resort"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl px-8 sm:px-12 py-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Luxury Stays & Verified Reviews
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Discover Hotels That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-teal-200 to-coral-400">
              Redefine Hospitality
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
            Read verified guest reviews, explore high-end retreats, and experience seamless microservices architecture in action.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Verified Reviews
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-coral-400" /> Pan-India Luxury Stays
            </span>
            <span className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-400" /> Real-time Ratings
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search & Filter Component */}
        <HotelFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
          totalHotels={hotels.length}
        />

        {/* Hotels Grid */}
        <div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <HotelCardSkeleton key={i} />
              ))}
            </div>
          ) : hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-12 text-center max-w-lg mx-auto space-y-4 my-12">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No Hotels Found</h3>
              <p className="text-slate-500 text-sm">
                We couldn't find any hotels matching "<span className="font-semibold text-slate-700">{searchQuery}</span>" with the selected rating filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRating(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
