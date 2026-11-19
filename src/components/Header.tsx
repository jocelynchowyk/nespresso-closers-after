import { LogOut, Menu, ShoppingBag, User, UserCheck, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ProductCategory } from '../data/catalog';

interface HeaderProps {
  currentView: 'home' | 'pdp';
  bagCount: number;
  isLoggedIn: boolean;
  onToggleAuth: () => void;
  onNavigateHome: (sectionId?: string, category?: ProductCategory | 'all') => void;
  onNavigatePdp: () => void;
  onOpenBag: () => void;
}

export function Header({
  currentView,
  bagCount,
  isLoggedIn,
  onToggleAuth,
  onNavigateHome,
  onNavigatePdp,
  onOpenBag,
}: HeaderProps) {
  const [showNotice, setShowNotice] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const runAndCloseMobile = (fn: () => void) => {
    setMobileOpen(false);
    fn();
  };

  return (
    <div className="sticky top-0 z-40 w-full">
      {showNotice && (
        <div className="bg-[#1B1918] text-[#FAF9F6] h-9 px-4 flex items-center justify-between gap-4 text-xs border-b border-white/10">
          <div className="w-6 shrink-0" aria-hidden="true" />
          <p className="text-center truncate font-medium tracking-wide">
            Complimentary delivery across Singapore on orders above SGD 80 · Same-day dispatch before 2:30 PM
          </p>
          <button
            type="button"
            onClick={() => setShowNotice(false)}
            className="text-[#FAF9F6]/70 hover:text-white p-1 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Dismiss delivery notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E7E4DF]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 -ml-2 text-[#1B1918] hover:text-[#9E7B4F] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                runAndCloseMobile(() => onNavigateHome('top', 'all'));
              }}
              className="font-serif text-2xl font-semibold tracking-[0.18em] text-[#1B1918] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#9E7B4F]"
            >
              NESPRESSO
            </a>
          </div>

          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A4642]"
          >
            <button
              type="button"
              onClick={() => onNavigateHome('catalog', 'capsules')}
              className="hover:text-[#1B1918] hover:underline underline-offset-4 decoration-[#9E7B4F] transition-colors whitespace-nowrap shrink-0 py-2 cursor-pointer"
            >
              Coffee
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome('catalog', 'machines')}
              className="hover:text-[#1B1918] hover:underline underline-offset-4 decoration-[#9E7B4F] transition-colors whitespace-nowrap shrink-0 py-2 cursor-pointer"
            >
              Machines
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome('catalog', 'accessories')}
              className="hover:text-[#1B1918] hover:underline underline-offset-4 decoration-[#9E7B4F] transition-colors whitespace-nowrap shrink-0 py-2 cursor-pointer"
            >
              Accessories
            </button>
            <button
              type="button"
              onClick={onNavigatePdp}
              className={`hover:text-[#1B1918] hover:underline underline-offset-4 decoration-[#9E7B4F] transition-colors whitespace-nowrap shrink-0 py-2 cursor-pointer ${
                currentView === 'pdp'
                  ? 'text-[#1B1918] underline decoration-[#9E7B4F] font-semibold'
                  : ''
              }`}
            >
              Swarovski Shine
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome('catalog', 'bundles')}
              className="hover:text-[#1B1918] hover:underline underline-offset-4 decoration-[#9E7B4F] transition-colors whitespace-nowrap shrink-0 py-2 cursor-pointer"
            >
              Bundle Sets
            </button>
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative" ref={accountRef}>
              <button
                type="button"
                onClick={() => {
                  if (isLoggedIn) {
                    setAccountOpen((prev) => !prev);
                  } else {
                    onToggleAuth();
                  }
                }}
                aria-expanded={isLoggedIn ? accountOpen : undefined}
                aria-label={
                  isLoggedIn
                    ? 'Signed in as Jocelyn Chow, open account details'
                    : 'Sign in to Nespresso account'
                }
                className="inline-flex items-center gap-2 px-3 py-2 border border-[#DDD8D0] hover:border-[#1B1918] bg-[#FFFFFF] text-[#1B1918] text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E7B4F]"
              >
                {isLoggedIn ? (
                  <>
                    <UserCheck
                      className="w-3.5 h-3.5 text-[#9E7B4F]"
                      aria-hidden="true"
                    />
                    <span className="hidden sm:inline">Jocelyn C.</span>
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5 text-[#57524E]" aria-hidden="true" />
                    <span className="hidden sm:inline">Sign In</span>
                  </>
                )}
              </button>

              {isLoggedIn && accountOpen && (
                <div
                  role="dialog"
                  aria-label="Customer Account Summary"
                  className="absolute right-0 mt-2 w-64 bg-[#FFFFFF] border border-[#E7E4DF] rounded-sm shadow-lg p-4 space-y-3 z-50"
                >
                  <div className="space-y-0.5 border-b border-[#F0EDE7] pb-3">
                    <div className="text-xs font-semibold text-[#1B1918]">
                      Signed in · Jocelyn Chow
                    </div>
                    <div className="text-[11px] text-[#6B6560] truncate">
                      jocelynchowyk@gmail.com
                    </div>
                  </div>

                  <div className="text-xs space-y-1 text-[#4A4642]">
                    <div className="flex justify-between">
                      <span>Club Tier</span>
                      <span className="font-semibold text-[#9E7B4F]">
                        Connoisseur
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Tier</span>
                      <span className="tabular-nums font-medium text-[#1B1918]">
                        $100 away
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      onToggleAuth();
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-[#DDD8D0] hover:border-[#1B1918] text-xs font-medium text-[#1B1918] rounded-sm transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onOpenBag}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1B1918] text-[#FAF9F6] text-xs font-semibold tracking-wider uppercase rounded-sm hover:bg-[#332F2D] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E7B4F]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="tabular-nums">Cart ({bagCount})</span>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[#FAF9F6] border-t border-[#E7E4DF] px-4 py-4 space-y-1">
            <button
              type="button"
              onClick={() =>
                runAndCloseMobile(() => onNavigateHome('catalog', 'capsules'))
              }
              className="block w-full text-left px-3 py-3 text-sm font-medium text-[#1B1918] hover:bg-[#F1EEE8] rounded-sm"
            >
              Coffee Capsules
            </button>
            <button
              type="button"
              onClick={() =>
                runAndCloseMobile(() => onNavigateHome('catalog', 'machines'))
              }
              className="block w-full text-left px-3 py-3 text-sm font-medium text-[#1B1918] hover:bg-[#F1EEE8] rounded-sm"
            >
              Machines
            </button>
            <button
              type="button"
              onClick={() =>
                runAndCloseMobile(() => onNavigateHome('catalog', 'accessories'))
              }
              className="block w-full text-left px-3 py-3 text-sm font-medium text-[#1B1918] hover:bg-[#F1EEE8] rounded-sm"
            >
              Accessories
            </button>
            <button
              type="button"
              onClick={() =>
                runAndCloseMobile(() => onNavigateHome('catalog', 'bundles'))
              }
              className="block w-full text-left px-3 py-3 text-sm font-medium text-[#1B1918] hover:bg-[#F1EEE8] rounded-sm"
            >
              Bundle Sets
            </button>
            <button
              type="button"
              onClick={() => runAndCloseMobile(onNavigatePdp)}
              className="block w-full text-left px-3 py-3 text-sm font-semibold text-[#9E7B4F] hover:bg-[#F1EEE8] rounded-sm"
            >
              Nespresso × Swarovski Shine Bundle
            </button>
          </div>
        )}
      </header>
    </div>
  );
}
