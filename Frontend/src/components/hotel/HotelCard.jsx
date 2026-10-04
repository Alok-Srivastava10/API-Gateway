import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { StarRating } from '../common/StarRating';

export const HotelCard = ({ hotel }) => {
  const ratingCount = hotel.ratings ? hotel.ratings.length : 0;
  const avgRating = hotel.averageRating ? Number(hotel.averageRating).toFixed(1) : '0.0';

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1">
      {/* Image Banner */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Rating Floating Pill */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/50">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="font-extrabold text-xs text-slate-900">{avgRating}</span>
          <span className="text-[10px] text-slate-400 font-medium">({ratingCount})</span>
        </div>

        {/* Location Badge */}
        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
          <MapPin className="w-3.5 h-3.5 text-coral-400" />
          {hotel.location}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-1">
            {hotel.name}
          </h3>
          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
            {hotel.about || 'A luxurious escape offering signature hospitality, premium comfort, and refined dining.'}
          </p>
        </div>

        {/* Footer & CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Starting From</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-slate-900">
                ₹{hotel.price ? hotel.price.toLocaleString('en-IN') : '12,500'}
              </span>
              <span className="text-xs text-slate-400">/ night</span>
            </div>
          </div>

          <Link
            to={`/hotels/${hotel.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-md shadow-brand-700/20 group-hover:shadow-lg transition-all"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
