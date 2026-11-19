import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronRight,
  Coffee,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useState } from 'react';
import {
  BUNDLE_PIECES,
  CapsuleUpsell,
  EXTRACTION_PROFILES,
  GALLERY_FRAMES,
  ORIGINAL_SLEEVES,
  SWAROVSKI_EDITIONS,
  TECHNICAL_SPECS,
  computeDiscountPct,
  formatSgd,
} from '../data/catalog';
import { BagItem } from './CartDrawer';
import { PromotionCountdown } from './PromotionCountdown';
import { ResilientImage } from './ResilientImage';
import { StarRating } from './StarRating';

interface SwarovskiPdpViewProps {
  onBackToStorefront: () => void;
  onAddToBag: (item: BagItem) => void;
}

const CUSTOMER_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Rachel Lim',
    location: 'Singapore · Verified Buyer',
    rating: 5,
    date: 'Nov 2026',
    title: 'Stunning countertop centerpiece',
    body: 'The brushed steel with the Swarovski crystal inlay looks understated yet luminous in morning sunlight. Heats up in 25 seconds and pulls rich crema on Arpeggio.',
  },
  {
    id: 'rev-2',
    author: 'Marcus Tan',
    location: 'Singapore · Verified Buyer',
    rating: 4,
    date: 'Nov 2026',
    title: 'Dedicated Americano button is a daily time-saver',
    body: 'Having separate Americano and Americano XL presets alongside regular Espresso makes mornings effortless. Same-day courier arrived right on schedule.',
  },
  {
    id: 'rev-3',
    author: 'Priya Nair',
    location: 'Singapore · Verified Buyer',
    rating: 3,
    date: 'Oct 2026',
    title: 'Great gift bundle, wish water tank were slightly larger',
    body: 'Bought the Shine Bundle as a housewarming gift—the travel mug and crystal ornament packaging are lovely, though we refill the 1.0 L tank every couple of days.',
  },
];

export function SwarovskiPdpView({
  onBackToStorefront,
  onAddToBag,
}: SwarovskiPdpViewProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [editionId, setEditionId] = useState(SWAROVSKI_EDITIONS[0].id);
  const [quantity, setQuantity] = useState(1);
  const [addedMain, setAddedMain] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(
    EXTRACTION_PROFILES[0].id
  );
  const [addedSleeveId, setAddedSleeveId] = useState<string | null>(null);

  const selectedEdition =
    SWAROVSKI_EDITIONS.find((e) => e.id === editionId) ?? SWAROVSKI_EDITIONS[0];
  const activeFrame = GALLERY_FRAMES[frameIndex] ?? GALLERY_FRAMES[0];
  const activeProfile =
    EXTRACTION_PROFILES.find((p) => p.id === activeProfileId) ??
    EXTRACTION_PROFILES[0];

  const savingsSgd = selectedEdition.compareAtSgd - selectedEdition.priceSgd;
  const savingsPct = computeDiscountPct(
    selectedEdition.priceSgd,
    selectedEdition.compareAtSgd
  );

  const handleAddMain = () => {
    onAddToBag({
      id: selectedEdition.id,
      name: selectedEdition.label,
      subtitle: `${selectedEdition.subtitle} · SKU ${selectedEdition.sku}`,
      priceSgd: selectedEdition.priceSgd,
      image: GALLERY_FRAMES[0].src,
      quantity,
      itemType: 'machine',
      line: 'Original',
    });
    setAddedMain(true);
    window.setTimeout(() => setAddedMain(false), 1800);
  };

  const handleAddSleeve = (sleeve: CapsuleUpsell) => {
    onAddToBag({
      id: sleeve.id,
      name: `${sleeve.name} (10 Capsules)`,
      subtitle: 'Original Line Sleeve',
      priceSgd: sleeve.priceSgd,
      image: sleeve.image,
      quantity: 1,
      itemType: 'capsule',
      line: 'Original',
    });
    setAddedSleeveId(sleeve.id);
    window.setTimeout(() => {
      setAddedSleeveId((prev) => (prev === sleeve.id ? null : prev));
    }, 1500);
  };

  return (
    <main className="bg-[#FAF9F6] pb-24 md:pb-16">
      <div className="border-b border-[#E7E4DF] bg-[#FFFFFF]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#6B655F]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={onBackToStorefront}
              className="hover:text-[#1B1918] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#A8A29B]" />
            <button
              type="button"
              onClick={onBackToStorefront}
              className="hover:text-[#1B1918] transition-colors cursor-pointer"
            >
              Machines
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#A8A29B]" />
            <span>Original</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#A8A29B]" />
            <span className="text-[#1B1918] font-medium">
              Swarovski Shine Bundle
            </span>
          </nav>

          <button
            type="button"
            onClick={onBackToStorefront}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1B1918] hover:text-[#9E7B4F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Nespresso Singapore</span>
          </button>
        </div>
      </div>

      {/* Product Showcase Split */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 pt-8 lg:pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-[#E7E4DF] bg-[#F2EFE9]">
              <ResilientImage
                src={activeFrame.src}
                alt={activeFrame.caption}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                fallbackTitle={activeFrame.label}
              />
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? 'Reset image zoom' : 'Zoom in on product image'}
                className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-2 bg-[#1B1918]/85 hover:bg-[#1B1918] text-white text-xs font-medium rounded-sm backdrop-blur-xs transition-colors cursor-pointer"
              >
                {zoomed ? (
                  <>
                    <ZoomOut className="w-3.5 h-3.5" />
                    <span>Reset Zoom</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Inspect Finish</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 text-xs text-[#6B655F]">
              <span>{activeFrame.caption}</span>
              <span className="tabular-nums shrink-0">
                0{frameIndex + 1} / 0{GALLERY_FRAMES.length}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3 pt-1">
              {GALLERY_FRAMES.map((frame, idx) => (
                <button
                  key={frame.id}
                  type="button"
                  onClick={() => {
                    setFrameIndex(idx);
                    setZoomed(false);
                  }}
                  className={`aspect-[4/3] overflow-hidden rounded-sm border transition-all cursor-pointer ${
                    idx === frameIndex
                      ? 'border-[#9E7B4F] ring-1 ring-[#9E7B4F]'
                      : 'border-[#E7E4DF] opacity-75 hover:opacity-100'
                  }`}
                  aria-label={`View ${frame.label}`}
                >
                  <ResilientImage
                    src={frame.src}
                    alt={frame.label}
                    className="w-full h-full object-cover"
                    fallbackTitle={frame.label}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Module */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 bg-[#FFFFFF] border border-[#E7E4DF] rounded-sm p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#7A746E] tracking-wide">
                <span className="uppercase tracking-[0.12em] font-medium text-[#9E7B4F]">
                  Original Line
                </span>
                <span aria-hidden="true">·</span>
                <span>Limited Holiday Edition</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#2C4C3E] font-medium">
                  In Stock in Singapore
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1B1918] leading-tight [text-wrap:balance]">
                {selectedEdition.label}
              </h1>

              <StarRating
                rating={4}
                maxStars={5}
                reviewCount={42}
                onClick={() =>
                  document
                    .getElementById('customer-reviews')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              />

              <p className="text-sm text-[#57524E] leading-relaxed">
                Brushed stainless steel CitiZ Platinum espresso craftsmanship elevated with hand-applied Swarovski crystal brilliance—designed for festive hosting and timeless daily espresso rituals.
              </p>

              <p className="text-xs font-medium text-[#1B1918] tabular-nums">
                Join the <span className="text-[#9E7B4F] font-semibold">1,000+</span> coffee lovers in Singapore who have already purchased this edition.
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0EDE7] space-y-2">
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-[#1B1918] tabular-nums">
                    {formatSgd(selectedEdition.priceSgd)}
                  </span>
                  <span className="text-sm text-[#8E8882] line-through tabular-nums">
                    {formatSgd(selectedEdition.compareAtSgd)}
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#9E7B4F] tabular-nums">
                  Save {formatSgd(savingsSgd)}
                  {savingsPct === null ? '' : ` (${savingsPct}% Off)`}
                </span>
              </div>

              <PromotionCountdown label="Holiday promotion ends in" />

              <div
                role="status"
                className="bg-[#FDF7F0] border border-[#DFC197] rounded-sm px-4 py-3 flex items-start gap-2.5 text-xs"
              >
                <AlertCircle
                  className="w-4 h-4 text-[#9E5B24] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#7A4419]">
                    Limited Quantities Available · Stock is Low
                  </div>
                  <p className="text-[#57524E] leading-relaxed tabular-nums">
                    Only 6 units remaining in our Singapore festive allocation. Order now to secure same-day courier dispatch.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#1B1918]">
                  Select Edition
                </span>
                <span className="text-[#7A746E] font-mono text-[11px]">
                  {selectedEdition.sku}
                </span>
              </div>

              <div className="space-y-2">
                {SWAROVSKI_EDITIONS.map((edition) => {
                  const selected = edition.id === editionId;
                  return (
                    <button
                      key={edition.id}
                      type="button"
                      onClick={() => setEditionId(edition.id)}
                      className={`w-full text-left px-4 py-3 rounded-sm border transition-colors cursor-pointer flex items-center justify-between gap-4 ${
                        selected
                          ? 'border-[#1B1918] bg-[#FAF9F6]'
                          : 'border-[#E7E4DF] bg-[#FFFFFF] hover:border-[#C7C0B6]'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#1B1918] truncate">
                          {edition.label}
                        </div>
                        <div className="text-xs text-[#6B655F] truncate mt-0.5">
                          {edition.subtitle}
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#1B1918] tabular-nums shrink-0">
                        {formatSgd(edition.priceSgd)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#FAF9F6] border border-[#EDEAE3] rounded-sm p-4 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#57524E]">
                Included in Your Box
              </div>
              <ul className="space-y-1.5">
                {selectedEdition.includes.map((inc) => (
                  <li
                    key={inc}
                    className="flex items-start gap-2 text-xs text-[#3B3734]"
                  >
                    <Check className="w-3.5 h-3.5 text-[#9E7B4F] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-stretch gap-3 pt-1">
              <div
                className="inline-flex items-center border border-[#DDD8D0] rounded-sm bg-[#FFFFFF]"
                aria-label="Quantity selector"
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-3 text-[#4A4642] hover:text-[#1B1918] transition-colors cursor-pointer min-h-[44px]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-[#1B1918] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-3 py-3 text-[#4A4642] hover:text-[#1B1918] transition-colors cursor-pointer min-h-[44px]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddMain}
                className={`flex-1 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] rounded-sm transition-colors cursor-pointer min-h-[44px] inline-flex items-center justify-center gap-2 ${
                  addedMain
                    ? 'bg-[#2C4C3E] text-white'
                    : 'bg-[#1B1918] hover:bg-[#9E7B4F] text-[#FAF9F6]'
                }`}
              >
                {addedMain ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO CART</span>
                  </>
                ) : (
                  <span className="tabular-nums">
                    ADD TO CART — {formatSgd(selectedEdition.priceSgd * quantity)}
                  </span>
                )}
              </button>
            </div>

            <div className="pt-4 border-t border-[#F0EDE7] space-y-2.5 text-xs text-[#57524E]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#9E7B4F] shrink-0" />
                <span>
                  Complimentary same-day Singapore delivery (orders before 2:30 PM)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#9E7B4F] shrink-0" />
                <span>2-year official Nespresso Singapore warranty &amp; Type G 230V plug</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Coffee className="w-4 h-4 text-[#9E7B4F] shrink-0" />
                <span>Includes 14-capsule Original tasting assortment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four-Piece Ensemble */}
      <section className="bg-[#FFFFFF] border-y border-[#E7E4DF] py-16 lg:py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs tracking-[0.14em] uppercase text-[#9E7B4F]">
              Curated Four-Piece Ensemble
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1B1918] [text-wrap:balance]">
              Inside the Nespresso × Swarovski Shine Bundle
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUNDLE_PIECES.map((piece) => (
              <div
                key={piece.index}
                className="bg-[#FAF9F6] border border-[#E7E4DF] rounded-sm overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] w-full bg-[#EFECE6]">
                  <ResilientImage
                    src={piece.image}
                    alt={piece.title}
                    className="w-full h-full object-cover"
                    fallbackTitle={piece.title}
                  />
                </div>
                <div className="p-5 space-y-2 flex-1">
                  <div className="text-xs font-medium text-[#9E7B4F] tabular-nums">
                    {piece.index}. Bundle Piece
                  </div>
                  <h3 className="text-base font-semibold text-[#1B1918] leading-snug">
                    {piece.title}
                  </h3>
                  <p className="text-xs text-[#57524E] leading-relaxed">
                    {piece.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extraction Profiles + Technical Specs */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="text-xs tracking-[0.14em] uppercase text-[#7A746E]">
                One-Touch Versatility
              </div>
              <h2 className="font-serif text-3xl font-medium text-[#1B1918] [text-wrap:balance]">
                Five Programmable Extraction Profiles
              </h2>
              <p className="text-sm text-[#57524E] leading-relaxed">
                Select a preparation button on the CitiZ Platinum chassis to inspect its calibrated volume, brew duration, and thermal target.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {EXTRACTION_PROFILES.map((profile) => {
                const active = profile.id === activeProfileId;
                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => setActiveProfileId(profile.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded-sm border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#1B1918] text-[#FAF9F6] border-[#1B1918]'
                        : 'bg-[#FFFFFF] text-[#4A4642] border-[#DDD8D0] hover:border-[#1B1918]'
                    }`}
                  >
                    {profile.name} ({profile.volumeMl} ml)
                  </button>
                );
              })}
            </div>

            <div className="bg-[#FFFFFF] border border-[#E7E4DF] rounded-sm p-6 space-y-5">
              <div className="flex items-baseline justify-between border-b border-[#F0EDE7] pb-4">
                <h3 className="font-serif text-2xl font-medium text-[#1B1918]">
                  {activeProfile.name}
                </h3>
                <span className="text-sm font-semibold text-[#9E7B4F] tabular-nums">
                  {activeProfile.volumeMl} ml Output
                </span>
              </div>

              <p className="text-sm text-[#4A4642] leading-relaxed">
                {activeProfile.description}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#F0EDE7]">
                <div>
                  <div className="text-xs text-[#7A746E]">Cup Volume</div>
                  <div className="text-base font-semibold text-[#1B1918] tabular-nums mt-0.5">
                    {activeProfile.volumeMl} ml
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7A746E]">Brew Time</div>
                  <div className="text-base font-semibold text-[#1B1918] tabular-nums mt-0.5">
                    {activeProfile.brewTimeSec} sec
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#7A746E]">Extraction Temp</div>
                  <div className="text-base font-semibold text-[#1B1918] tabular-nums mt-0.5">
                    {activeProfile.temperatureC} °C
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="text-xs tracking-[0.14em] uppercase text-[#7A746E]">
                Engineering &amp; Dimensions
              </div>
              <h2 className="font-serif text-3xl font-medium text-[#1B1918]">
                Technical Specifications
              </h2>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E7E4DF] rounded-sm divide-y divide-[#F0EDE7]">
              {TECHNICAL_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="px-5 py-3.5 flex items-center justify-between gap-4 text-sm"
                >
                  <span className="text-[#57524E]">{spec.label}</span>
                  <span className="font-medium text-[#1B1918] tabular-nums text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section
        id="customer-reviews"
        className="max-w-[1320px] mx-auto px-4 sm:px-8 pb-16"
      >
        <div className="border-t border-[#E7E4DF] pt-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs tracking-[0.14em] uppercase text-[#7A746E]">
                Verified Singapore Buyers
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1B1918]">
                Customer Reviews
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <StarRating rating={4} maxStars={5} reviewCount={42} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((review) => (
              <article
                key={review.id}
                className="bg-[#FFFFFF] border border-[#E7E4DF] rounded-sm p-6 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <StarRating
                      rating={review.rating}
                      maxStars={5}
                      reviewCount={1}
                      compact
                    />
                    <span className="text-xs text-[#7A746E] tabular-nums">
                      {review.date}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#1B1918]">
                    {review.title}
                  </h3>
                  <p className="text-xs text-[#57524E] leading-relaxed">
                    {review.body}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0EDE7] text-xs text-[#6B6560]">
                  <span className="font-medium text-[#1B1918]">
                    {review.author}
                  </span>
                  <span className="mx-1.5" aria-hidden="true">
                    ·
                  </span>
                  <span>{review.location}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Sleeves */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-8 pt-4">
        <div className="border-t border-[#E7E4DF] pt-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-xs tracking-[0.14em] uppercase text-[#7A746E]">
                Complete Your Tasting
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1B1918]">
                Recommended Original Coffee Sleeves
              </h2>
            </div>
            <span className="text-xs text-[#6B655F]">
              10 recyclable aluminium capsules per sleeve
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ORIGINAL_SLEEVES.map((sleeve) => {
              const isAdded = addedSleeveId === sleeve.id;
              return (
                <div
                  key={sleeve.id}
                  className="bg-[#FFFFFF] border border-[#E7E4DF] rounded-sm p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 rounded-sm overflow-hidden bg-[#F2EFE9] shrink-0">
                      <ResilientImage
                        src={sleeve.image}
                        alt={sleeve.name}
                        className="w-full h-full object-cover"
                        fallbackTitle={sleeve.name}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[#1B1918] truncate">
                        {sleeve.name}
                      </h3>
                      <p className="text-xs text-[#6B655F] truncate mt-0.5">
                        {sleeve.notes}
                      </p>
                      <div className="text-xs font-semibold text-[#1B1918] tabular-nums mt-1.5">
                        {formatSgd(sleeve.priceSgd)}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddSleeve(sleeve)}
                    className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] rounded-sm transition-colors shrink-0 cursor-pointer min-h-[38px] ${
                      isAdded
                        ? 'bg-[#2C4C3E] text-white'
                        : 'bg-[#FAF9F6] border border-[#DDD8D0] hover:border-[#1B1918] text-[#1B1918]'
                    }`}
                  >
                    {isAdded ? 'ADDED' : 'ADD TO CART'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E7E4DF] px-4 py-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs text-[#6B655F] truncate">
            {selectedEdition.label}
          </div>
          <div className="text-sm font-semibold text-[#1B1918] tabular-nums">
            {formatSgd(selectedEdition.priceSgd * quantity)}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddMain}
          className="px-5 py-2.5 bg-[#1B1918] text-[#FAF9F6] text-xs font-semibold uppercase tracking-[0.12em] rounded-sm shrink-0 min-h-[42px]"
        >
          {addedMain ? 'ADDED TO CART' : 'ADD TO CART'}
        </button>
      </div>
    </main>
  );
}
