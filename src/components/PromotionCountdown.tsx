import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PromotionCountdownProps {
  compact?: boolean;
  label?: string;
}

const PROMO_END_TIMESTAMP =
  Date.now() + ((2 * 24 + 14) * 3600 + 38 * 60 + 45) * 1000;

function getTimeRemaining() {
  const diff = Math.max(0, PROMO_END_TIMESTAMP - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function PromotionCountdown({
  compact = false,
  label = 'Offer ends in',
}: PromotionCountdownProps) {
  const [time, setTime] = useState(getTimeRemaining);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (compact) {
    return (
      <div
        className="bg-[#FAF5EC] border border-[#DEC9A4] rounded-sm px-3 py-2 flex items-center justify-between gap-2"
        aria-live="off"
      >
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A592E]">
          <Clock className="w-3.5 h-3.5 text-[#9E7B4F] shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-xs font-semibold text-[#1B1918] tabular-nums">
          <span className="bg-[#1B1918] text-[#FAF9F6] px-1.5 py-0.5 rounded-xs">
            {pad2(time.days)}d
          </span>
          <span className="text-[#9E7B4F]">:</span>
          <span className="bg-[#1B1918] text-[#FAF9F6] px-1.5 py-0.5 rounded-xs">
            {pad2(time.hours)}h
          </span>
          <span className="text-[#9E7B4F]">:</span>
          <span className="bg-[#1B1918] text-[#FAF9F6] px-1.5 py-0.5 rounded-xs">
            {pad2(time.minutes)}m
          </span>
          <span className="text-[#9E7B4F]">:</span>
          <span className="bg-[#9E7B4F] text-white px-1.5 py-0.5 rounded-xs">
            {pad2(time.seconds)}s
          </span>
        </div>
      </div>
    );
  }

  const units = [
    { value: pad2(time.days), unit: 'DAYS' },
    { value: pad2(time.hours), unit: 'HRS' },
    { value: pad2(time.minutes), unit: 'MIN' },
    { value: pad2(time.seconds), unit: 'SEC', accent: true },
  ];

  return (
    <div
      className="bg-[#1B1918] text-[#FAF9F6] border border-[#9E7B4F]/50 rounded-sm p-4 space-y-3"
      aria-live="off"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#C9A97E]">
          <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </div>
        <span className="text-[11px] text-[#A8A29B]">Limited Time</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {units.map((item) => (
          <div
            key={item.unit}
            className={`rounded-sm py-2 px-1 text-center border ${
              item.accent
                ? 'bg-[#9E7B4F] border-[#B28D5E] text-white'
                : 'bg-[#282523] border-white/10 text-[#FAF9F6]'
            }`}
          >
            <div className="font-mono text-lg sm:text-xl font-semibold leading-none tabular-nums">
              {item.value}
            </div>
            <div
              className={`text-[10px] font-medium tracking-[0.12em] mt-1 ${
                item.accent ? 'text-white/90' : 'text-[#A8A29B]'
              }`}
            >
              {item.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
