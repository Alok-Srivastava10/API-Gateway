import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-3xl border border-slate-100 shadow-card space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-4xl font-extrabold text-brand-800 block">404</span>
        <h2 className="text-xl font-bold text-slate-900">Page Not Found</h2>
        <p className="text-slate-500 text-sm">
          The page you are looking for doesn't exist or has moved to another location.
        </p>
        <div className="pt-2">
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hotels
          </Link>
        </div>
      </div>
    </div>
  );
};
