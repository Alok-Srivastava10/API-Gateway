import React from 'react';

export const HotelCardSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-pulse flex flex-col">
      {/* Image Skeleton */}
      <div className="h-56 bg-slate-200 w-full relative" />
      {/* Content Skeleton */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-slate-200 rounded-full w-24" />
            <div className="h-4 bg-slate-200 rounded-full w-16" />
          </div>
          <div className="h-6 bg-slate-200 rounded-xl w-3/4" />
          <div className="h-4 bg-slate-200 rounded-lg w-full" />
          <div className="h-4 bg-slate-200 rounded-lg w-4/5" />
        </div>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="h-5 bg-slate-200 rounded-lg w-20" />
          <div className="h-9 bg-slate-200 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
};

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full space-y-3 animate-pulse">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="h-14 bg-slate-100 rounded-2xl w-full" />
      ))}
    </div>
  );
};
