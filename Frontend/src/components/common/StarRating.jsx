import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Outstanding!'
};

export const StarRating = ({
  value = 0,
  onChange,
  size = 'md',
  showLabel = false,
  readOnly = true,
  count
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const currentVal = hoverValue || value;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= currentVal;
          return (
            <button
              key={star}
              type={readOnly ? 'button' : 'button'}
              disabled={readOnly}
              onClick={() => onChange && onChange(star)}
              onMouseEnter={() => !readOnly && setHoverValue(star)}
              onMouseLeave={() => !readOnly && setHoverValue(0)}
              className={`transition-transform duration-150 ${
                readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-125 focus:outline-none'
              }`}
            >
              <Star
                className={`${starSizes[size] || starSizes.md} ${
                  isFilled
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-200 fill-slate-100'
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>

      {/* Label or score */}
      {showLabel && !readOnly && (
        <span className="text-sm font-semibold text-amber-700 min-w-[80px] pl-1">
          {RATING_LABELS[currentVal] || 'Select stars'}
        </span>
      )}

      {showLabel && readOnly && (
        <span className="text-sm font-bold text-slate-800 ml-1">
          {Number(value).toFixed(1)}
          {count !== undefined && (
            <span className="text-xs font-normal text-slate-500 ml-1">
              ({count} {count === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </span>
      )}
    </div>
  );
};
