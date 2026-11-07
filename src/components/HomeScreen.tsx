import React, { useState } from 'react';
import { HOLIDAY_PACKAGES, TourPackage } from '../data/holidays';

interface HomeScreenProps {
  onNavigate: (view: string, payload?: any) => void;
  onSelectTour: (tourId: string) => void;
  onOpenConcierge: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectTour,
  onOpenConcierge,
}) => {
  const [destinationSearch, setDestinationSearch] = useState('Prague, Czech Republic');
  const [departureDate, setDepartureDate] = useState('Nov - Dec 2025');
  const [duration, setDuration] = useState('4 - 7 Days');
  const [experienceType, setExperienceType] = useState('Christmas & Winter');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailVal, setEmailVal] = useState('');

  const featuredTour = HOLIDAY_PACKAGES.find((p) => p.id === 'prague-christmas') || HOLIDAY_PACKAGES[0];
  const gridTours: TourPackage[] = HOLIDAY_PACKAGES.slice(1, 4);

  const handleSearch = () => {
    onNavigate('holidays', {
      destination: destinationSearch,
      date: departureDate,
      duration,
      experience: experienceType,
    });
  };

  const handleTrendingClick = (term: string, tourId?: string) => {
    if (tourId) {
      onSelectTour(tourId);
    } else {
      setDestinationSearch(term);
      onNavigate('holidays', { destination: term });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailVal.trim()) {
      setEmailSubscribed(true);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Top Hero Section */}
      <section className="relative w-full bg-[#0A1628] text-white pt-28 pb-20 overflow-hidden">
        {/* Subtle background atmospheric gradient & luxury styling */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0f213a] to-[#0A1628] opacity-95"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity"
          style={{
            backgroundImage: `url(${featuredTour.image})`,
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B4D8]/20 backdrop-blur-md text-[#00B4D8] text-[12px] uppercase tracking-wider font-extrabold border border-[#00B4D8]/30">
              <span className="w-2 h-2 rounded-full bg-[#00B4D8] animate-pulse"></span>
              Winter &amp; Spring 2025/26 Collections • Southampton &amp; London
            </div>
            <h1 className="font-display text-[44px] md:text-[56px] leading-[1.1] font-semibold tracking-tight text-white">
              Discover Your <span className="italic font-normal text-[#FFB703]">Next Holiday</span>
            </h1>
            <p className="text-[17px] md:text-[19px] text-[#dee9ff] max-w-2xl leading-relaxed">
              <span className="font-display italic text-[#FFB703] font-medium block mb-1 text-[20px]">
                We move Southampton.
              </span>
              Handcrafted European holiday packages, seamless Southampton docks &amp; airport transfers, and unforgettable getaways with ATOL protection.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('holidays')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#00B4D8] hover:bg-[#0096B4] text-[#0A1628] font-extrabold text-[15px] shadow-[0_4px_16px_rgba(0,180,216,0.35)] transition-all hover:scale-102 active:scale-98"
              >
                <span>Explore Holidays</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Trust Guarantees Bar */}
          <div className="mt-12 pt-6 border-t border-[#00B4D8]/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-[13px] text-[#dee9ff]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FFB703] text-[20px]">verified_user</span>
              <span>ATOL Protected (#9822)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FFB703] text-[20px]">shield</span>
              <span>100% Financial Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FFB703] text-[20px]">support_agent</span>
              <span>24/7 UK Concierge</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FFB703] text-[20px] fill-1">star</span>
              <span>4.9/5 TrustScore</span>
            </div>
          </div>

          {/* Interactive Search Bar Panel */}
          <div className="mt-8 bg-white text-[#111c2c] p-4 lg:p-6 rounded-2xl shadow-2xl border border-[#e2e8f0]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {/* Destination */}
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-[#525f71] font-bold">
                  Destination
                </label>
                <div className="flex items-center gap-2 bg-[#f0f3ff] px-3 py-2.5 rounded-xl border border-[#e2e8f0]">
                  <span className="material-symbols-outlined text-[18px] text-[#00677d]">location_on</span>
                  <input
                    type="text"
                    value={destinationSearch}
                    onChange={(e) => setDestinationSearch(e.target.value)}
                    placeholder="Where would you like to travel?"
                    className="w-full bg-transparent text-[14px] text-[#111c2c] font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Departure Date */}
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-[#525f71] font-bold">
                  Departure Date
                </label>
                <div className="flex items-center gap-2 bg-[#f0f3ff] px-3 py-2.5 rounded-xl border border-[#e2e8f0]">
                  <span className="material-symbols-outlined text-[18px] text-[#00677d]">calendar_month</span>
                  <select
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-transparent text-[14px] text-[#111c2c] font-semibold focus:outline-none cursor-pointer"
                  >
                    <option>Nov - Dec 2025</option>
                    <option>Jan 2026</option>
                    <option>Feb 2026</option>
                    <option>Spring 2026 (Mar - May)</option>
                  </select>
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-[#525f71] font-bold">
                  Duration
                </label>
                <div className="flex items-center gap-2 bg-[#f0f3ff] px-3 py-2.5 rounded-xl border border-[#e2e8f0]">
                  <span className="material-symbols-outlined text-[18px] text-[#00677d]">schedule</span>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-transparent text-[14px] text-[#111c2c] font-semibold focus:outline-none cursor-pointer"
                  >
                    <option>4 - 7 Days</option>
                    <option>2 - 3 Days (Weekend Break)</option>
                    <option>8+ Days (Extended)</option>
                  </select>
                </div>
              </div>

              {/* Experience Type */}
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-[#525f71] font-bold">
                  Experience Type
                </label>
                <div className="flex items-center gap-2 bg-[#f0f3ff] px-3 py-2.5 rounded-xl border border-[#e2e8f0]">
                  <span className="material-symbols-outlined text-[18px] text-[#00677d]">park</span>
                  <select
                    value={experienceType}
                    onChange={(e) => setExperienceType(e.target.value)}
                    className="w-full bg-transparent text-[14px] text-[#111c2c] font-semibold focus:outline-none cursor-pointer"
                  >
                    <option>Christmas & Winter</option>
                    <option>Alpine & Snow</option>
                    <option>Cultural & Heritage</option>
                    <option>Thermal Spas & Lakes</option>
                    <option>Northern Lights</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Trending pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-[#525f71] uppercase tracking-wider font-bold">
                  Trending:
                </span>
                <button
                  onClick={() => handleTrendingClick('Prague Christmas', 'prague-christmas')}
                  className="px-2.5 py-1 rounded-full bg-[#f0f3ff] hover:bg-[#dee9ff] text-[12px] text-[#111c2c] font-medium transition-colors"
                >
                  ✨ Prague Christmas
                </button>
                <button
                  onClick={() => handleTrendingClick('Lapland', 'lapland-auroras')}
                  className="px-2.5 py-1 rounded-full bg-[#f0f3ff] hover:bg-[#dee9ff] text-[12px] text-[#111c2c] font-medium transition-colors"
                >
                  Lapland Escapes
                </button>
                <button
                  onClick={() => handleTrendingClick('Vienna', 'vienna-strauss')}
                  className="px-2.5 py-1 rounded-full bg-[#f0f3ff] hover:bg-[#dee9ff] text-[12px] text-[#111c2c] font-medium transition-colors"
                >
                  Vienna Markets
                </button>
                <button
                  onClick={() => handleTrendingClick('Budapest', 'budapest-thermal')}
                  className="px-2.5 py-1 rounded-full bg-[#f0f3ff] hover:bg-[#dee9ff] text-[12px] text-[#111c2c] font-medium transition-colors"
                >
                  Budapest Lights
                </button>
              </div>

              <button
                onClick={handleSearch}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00B4D8] hover:bg-[#0096B4] text-[#0A1628] font-extrabold text-[14px] shadow-[0_2px_8px_rgba(0,180,216,0.3)] transition-all shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Search Holidays</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top European Holidays Section (Matching Image_9) */}
      <section className="w-full py-16 bg-[#f8f9fa] border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e7eeff] text-[#00677d] text-[11px] uppercase tracking-widest font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]"></span>
                Curated Seasonal Collections
              </div>
              <h2 className="font-display text-[32px] sm:text-[40px] font-semibold text-[#111c2c] tracking-tight">
                Top European Holidays
              </h2>
              <p className="text-[15px] text-[#525f71]">
                Handcrafted packages featuring guaranteed flights, 4★ &amp; 5★ heritage hotels, and executive private transfers.
              </p>
            </div>
            <button
              onClick={() => onNavigate('holidays')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#f0f3ff] text-[#002727] border border-[#bcc9ce]/60 text-[13px] font-bold transition-all shadow-sm shrink-0 self-start md:self-end"
            >
              <span>View All 24 Packages</span>
              <span className="material-symbols-outlined text-[18px] text-[#c59b27]">arrow_forward</span>
            </button>
          </div>

          {/* Featured Holiday Large Banner Card (Prague Christmas Tour) */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#e2e8f0] grid grid-cols-1 lg:grid-cols-12 transition-all hover:shadow-xl group">
            <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
              <img
                src={featuredTour.image}
                alt={featuredTour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3.5 py-1 rounded-full bg-[#002727]/90 backdrop-blur-md text-[#ffba27] text-[11px] font-bold uppercase tracking-wider shadow">
                  ⭐ {featuredTour.badge || 'Featured Festive Special'}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#002727] text-[11px] font-bold shadow">
                  {featuredTour.duration}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold shadow flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">flight_takeoff</span>
                  <span>Flights &amp; Transfers Included</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[12px] text-[#525f71]">
                  <span className="flex items-center gap-1 font-semibold text-[#00677d]">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {featuredTour.destination}
                  </span>
                  <span className="flex items-center gap-1 text-[#ffba27] font-bold">
                    <span className="material-symbols-outlined text-[16px] fill-1">star</span>
                    4.94 (128)
                  </span>
                </div>

                <h3 className="font-display text-[26px] sm:text-[30px] font-bold text-[#111c2c] leading-tight group-hover:text-[#00677d] transition-colors">
                  {featuredTour.title}
                </h3>

                <p className="text-[13.5px] text-[#525f71] leading-relaxed line-clamp-2">
                  {featuredTour.description}
                </p>

                <div className="pt-2 border-t border-[#f0f3ff] space-y-1.5 text-[12px] text-[#525f71]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#00677d]">hotel</span>
                    <span className="font-medium text-[#111c2c]">{featuredTour.hotel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#c59b27]">local_taxi</span>
                    <span className="font-medium">Private Mercedes V-Class Transfers Included</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#525f71] tracking-wider block">
                    All-Inclusive Total
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[28px] font-bold text-[#002727]">
                      £{featuredTour.pricePerPerson}
                    </span>
                    <span className="text-[11px] text-[#525f71]">/ person</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold block">
                    Deposit from £{featuredTour.depositPerPerson} today
                  </span>
                </div>

                <button
                  onClick={() => onSelectTour(featuredTour.id)}
                  className="px-6 py-3 rounded-xl bg-[#002727] hover:bg-[#003838] text-white font-bold text-[13.5px] shadow-md transition-all flex items-center gap-2 group-hover:bg-[#c59b27]"
                >
                  <span>View Itinerary</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Top Companion Holiday Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {gridTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#e2e8f0] flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#002727]/85 backdrop-blur-md text-white text-[11px] font-bold">
                      {tour.duration}
                    </span>
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-[#002727] text-[10px] font-bold uppercase tracking-wider">
                      {tour.country}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-[#525f71]">
                      <span className="font-semibold text-[#00677d] truncate max-w-[180px]">
                        {tour.destination}
                      </span>
                      <span className="flex items-center gap-1 text-[#c59b27] font-bold">
                        <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                        4.9
                      </span>
                    </div>

                    <h4 className="font-display text-[18px] font-bold text-[#111c2c] group-hover:text-[#00677d] transition-colors leading-snug">
                      {tour.title}
                    </h4>

                    <p className="text-[12.5px] text-[#525f71] line-clamp-2 leading-relaxed">
                      {tour.description}
                    </p>

                    <div className="pt-2 text-[11.5px] text-[#525f71] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-[#00677d]">hotel</span>
                      <span className="truncate">{tour.hotel}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#f0f3ff] mt-2">
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#525f71] block">
                        From
                      </span>
                      <span className="font-display text-[22px] font-bold text-[#002727]">
                        £{tour.pricePerPerson}
                      </span>
                      <span className="text-[10px] text-[#525f71]"> / person</span>
                    </div>
                    <button
                      onClick={() => onSelectTour(tour.id)}
                      className="px-4 py-2 rounded-xl bg-[#f0f3ff] hover:bg-[#002727] hover:text-white text-[#002727] text-[12px] font-bold transition-all flex items-center gap-1 border border-[#bcc9ce]/40"
                    >
                      <span>Explore</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Travel With Us Pillars (Matching Image_9) */}
      <section className="w-full py-16 bg-white border-y border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[12px] text-[#00677d] uppercase tracking-wider font-bold">
              The JILIT Distinction
            </span>
            <h2 className="font-display text-[32px] md:text-[38px] text-[#111c2c] font-semibold">
              Why Travel With Us
            </h2>
            <p className="text-[15px] text-[#525f71]">
              Engineered for UK travellers who seek uncompromised refinement, full consumer protection, and seamless door-to-door coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-[#f8f9fa] border border-[#e2e8f0] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#dee9ff] flex items-center justify-center text-[#00677d]">
                <span className="material-symbols-outlined text-[26px]">verified_user</span>
              </div>
              <h3 className="text-[17px] font-bold text-[#111c2c]">ATOL & ABTA Protected</h3>
              <p className="text-[13px] text-[#525f71] leading-relaxed">
                Complete financial reassurance on every flight, hotel, and escorted tour booking under UK travel regulations.
              </p>
              <span className="block text-[11px] text-[#00677d] font-bold uppercase tracking-wider pt-1">
                Licence #9822 & #Y6841
              </span>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-[#f8f9fa] border border-[#e2e8f0] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#dee9ff] flex items-center justify-center text-[#00677d]">
                <span className="material-symbols-outlined text-[26px]">payments</span>
              </div>
              <h3 className="text-[17px] font-bold text-[#111c2c]">Flexible Payment Schemes</h3>
              <p className="text-[13px] text-[#525f71] leading-relaxed">
                Split your holiday investment into transparent instalments. Secure your departure from just £450 initial deposit.
              </p>
              <span className="block text-[11px] text-[#00677d] font-bold uppercase tracking-wider pt-1">
                0% Interest Schemes
              </span>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-[#f8f9fa] border border-[#e2e8f0] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#dee9ff] flex items-center justify-center text-[#00677d]">
                <span className="material-symbols-outlined text-[26px]">hotel_class</span>
              </div>
              <h3 className="text-[17px] font-bold text-[#111c2c]">Handpicked Accommodation</h3>
              <p className="text-[13px] text-[#525f71] leading-relaxed">
                Personally inspected 4★ and 5★ boutique, heritage, and central properties located within walking distance of landmarks.
              </p>
              <span className="block text-[11px] text-[#00677d] font-bold uppercase tracking-wider pt-1">
                Strict Quality Audited
              </span>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-[#f8f9fa] border border-[#e2e8f0] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#dee9ff] flex items-center justify-center text-[#00677d]">
                <span className="material-symbols-outlined text-[26px]">support_agent</span>
              </div>
              <h3 className="text-[17px] font-bold text-[#111c2c]">UK Dedicated Support</h3>
              <p className="text-[13px] text-[#525f71] leading-relaxed">
                Your personal travel manager is available around the clock via direct London phone line and messaging until your return.
              </p>
              <span className="block text-[11px] text-[#00677d] font-bold uppercase tracking-wider pt-1">
                London Pall Mall Desk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Editorial Callouts: Airport Transfers & Winter Europe Guides */}
      <section className="w-full py-16 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Airport Transfers */}
          <div className="relative rounded-2xl overflow-hidden bg-[#002727] text-white p-8 flex flex-col justify-between min-h-[300px] shadow-lg group">
            <div className="space-y-3 max-w-md z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#4cd6fb] text-[11px] font-bold uppercase tracking-wider">
                Executive Fleet Service
              </span>
              <h3 className="font-display text-[26px] font-bold leading-tight">
                Punctual UK Airport Transfers
              </h3>
              <p className="text-[14px] text-[#d8e3f9] leading-relaxed">
                Heathrow, Gatwick, Stansted, Manchester and Birmingham. Fixed pricing, live flight tracking, and complimentary 60-minute wait time.
              </p>
            </div>
            <div className="pt-6 z-10">
              <button
                onClick={() => onNavigate('airport-transfers')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c59b27] hover:bg-[#AC8419] text-white font-bold text-[14px] shadow transition-all"
              >
                <span>Book Private Transfer</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Card 2: Travel Journal */}
          <div className="relative rounded-2xl overflow-hidden bg-white border border-[#e2e8f0] p-8 flex flex-col justify-between min-h-[300px] shadow-sm">
            <div className="space-y-3 max-w-md">
              <span className="inline-block px-3 py-1 rounded-full bg-[#dee9ff] text-[#002727] text-[11px] font-bold uppercase tracking-wider">
                Travel Journal & Guides
              </span>
              <h3 className="font-display text-[26px] font-bold text-[#111c2c] leading-tight">
                Winter Europe: Insider Guides
              </h3>
              <p className="text-[14px] text-[#525f71] leading-relaxed">
                Discover secret artisan squares in Prague, how to reserve prime seats on the Glacier Express, and classical concert etiquette in Vienna.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('blog')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f3e3d] hover:bg-[#002727] text-white font-bold text-[14px] shadow transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                <span>Read Journal Articles</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Banner */}
      <section className="w-full pb-16 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-2xl bg-gradient-to-r from-[#00b4d8] to-[#00677d] p-8 md:p-12 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#ffdea9]">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span>The JILIT Private Dispatch</span>
              </div>
              <h3 className="font-display text-[28px] md:text-[34px] font-bold tracking-tight">
                Get Exclusive Seasonal Escapes
              </h3>
              <p className="text-[15px] text-[#dee9ff] leading-relaxed">
                Receive priority notifications for limited departure Christmas market bookings, private member rates, and expert destination guides.
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              {emailSubscribed ? (
                <div className="p-4 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px] text-[#ffdea9]">task_alt</span>
                  <div>
                    <span className="font-bold block text-[15px]">You're Subscribed!</span>
                    <span className="text-[12px] text-[#dee9ff]">
                      Check your inbox for our latest European winter collection.
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={emailVal}
                      onChange={(e) => setEmailVal(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-white text-[#111c2c] placeholder:text-[#707978] text-[14px] flex-1 focus:outline-none focus:ring-2 focus:ring-[#ffdea9]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#002727] hover:bg-[#0f3e3d] text-white font-bold text-[14px] shadow transition-all shrink-0"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="text-[11px] text-[#d8e3f9]">
                    We respect your privacy. Strictly no spam. Unsubscribe with one click anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
