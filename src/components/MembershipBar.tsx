import { Award } from 'lucide-react';

interface MembershipBarProps {
  isLoggedIn: boolean;
  onSignIn: () => void;
}

export function MembershipBar({ isLoggedIn, onSignIn }: MembershipBarProps) {
  const currentSpend = 400;
  const nextTierSpend = 500;
  const remaining = nextTierSpend - currentSpend; // $100 away
  const progressPct = Math.round((currentSpend / nextTierSpend) * 100);

  return (
    <div
      role="region"
      aria-label="Nespresso Club Membership Status"
      className="bg-[#F2EFE9] border-b border-[#E7E4DF]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-2.5 text-[#1B1918] min-w-0">
              <Award className="w-4 h-4 text-[#9E7B4F] shrink-0" aria-hidden="true" />
              <p className="truncate">
                <span className="font-semibold">Connoisseur Tier</span>
                <span className="mx-2 text-[#8E8882]" aria-hidden="true">
                  ·
                </span>
                <span className="text-[#4A4642]">
                  You are{' '}
                  <span className="font-semibold text-[#1B1918] tabular-nums">
                    ${remaining}
                  </span>{' '}
                  away from <span className="font-medium text-[#1B1918]">Ambassador Tier</span>
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3 sm:w-72 shrink-0">
              <div
                className="flex-1 h-2 bg-[#DFDAD1] rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={currentSpend}
                aria-valuemin={0}
                aria-valuemax={nextTierSpend}
                aria-label={`Membership progress: $${currentSpend} of $${nextTierSpend} toward Ambassador Tier`}
              >
                <div
                  className="h-full bg-[#9E7B4F] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="font-mono text-[11px] font-medium text-[#4A4642] tabular-nums shrink-0">
                ${currentSpend} / ${nextTierSpend}
              </span>
            </div>
          </>
        ) : (
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#4A4642]">
              <Award className="w-4 h-4 text-[#9E7B4F] shrink-0" aria-hidden="true" />
              <span>Sign in to view your Nespresso Club tier progress and member rewards.</span>
            </div>
            <button
              type="button"
              onClick={onSignIn}
              className="font-semibold text-[#1B1918] underline underline-offset-4 decoration-[#9E7B4F] hover:text-[#9E7B4F] transition-colors shrink-0 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
