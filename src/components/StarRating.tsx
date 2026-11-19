import { Star } from 'lucide-react';

interface StarRatingProps {
  rating?: number;
  maxStars?: number;
  reviewCount?: number;
  onClick?: () => void;
  compact?: boolean;
}

export function StarRating({
  rating = 4,
  maxStars = 5,
  reviewCount = 42,
  onClick,
  compact = false,
}: StarRatingProps) {
  const filledCount = Math.round(rating);

  const starsContent = (
    <div className="inline-flex items-center gap-2">
      <div
        className="inline-flex items-center gap-0.5"
        role="img"
        aria-label={`${rating} out of ${maxStars} stars`}
      >
        {Array.from({ length: maxStars }).map((_, index) => {
          const isFilled = index < filledCount;
          return (
            <Star
              key={index}
              className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${
                isFilled
                  ? 'fill-[#9E7B4F] text-[#9E7B4F]'
                  : 'fill-transparent text-[#C7C0B6]'
              }`}
              aria-hidden="true"
            />
          );
        })}
      </div>

      <span
        className={`${
          compact ? 'text-xs' : 'text-xs sm:text-[13px]'
        } text-[#4A4642] tabular-nums`}
      >
        <span className="font-semibold text-[#1B1918]">{rating}.0</span> / {maxStars}{' '}
        <span className="text-[#6B6560]">({reviewCount} reviews)</span>
      </span>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center hover:opacity-80 transition-opacity cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#9E7B4F] rounded-xs"
      >
        {starsContent}
      </button>
    );
  }

  return starsContent;
}
