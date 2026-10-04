import React from 'react';
import { Search, MapPin, Star, X, SlidersHorizontal } from 'lucide-react';

const QUICK_LOCATIONS = ['All Cities', 'New Delhi', 'Goa', 'Mumbai', 'Shimla', 'Jaipur', 'Kerala'];

const RATING_OPTIONS = [
  { label: 'All Ratings', value: null },
  { label: '⭐ 4.5+ Top Rated', value: 4.5 },
  { label: '⭐ 4.0+ Great', value: 4.0 },
  { label: '⭐ 3.0+ Good', value: 3.0 }
];

export const HotelFilter = ({
  searchQuery,
  onSearchChange,
  selectedRating,
  onRatingChange,
  totalHotels = 0
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-8 space-y-6">
      
      {/* Top Bar: Search Input */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by hotel name or city (e.g. Delhi, Goa, Taj, Oberoi)..."
            className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap bg-slate-50 px-4 py-3.5 rounded-2xl border border-slate-100">
          Showing <span className="text-brand-700 font-extrabold">{totalHotels}</span> {totalHotels === 1 ? 'Hotel' : 'Hotels'}
        </div>
      </div>

      {/* Quick Location Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          Cities:
        </span>
        {QUICK_LOCATIONS.map((loc) => {
          const isAll = loc === 'All Cities';
          const isSelected = isAll ? !searchQuery : searchQuery.toLowerCase() === loc.toLowerCase();
          return (
            <button
              key={loc}
              onClick={() => onSearchChange(isAll ? '' : loc)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? 'bg-brand-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {loc}
            </button>
          );
        })}
      </div>

      {/* Rating Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          Rating:
        </span>
        {RATING_OPTIONS.map((opt) => {
          const isSelected = selectedRating === opt.value;
          return (
            <button
              key={opt.label}
              onClick={() => onRatingChange(opt.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
