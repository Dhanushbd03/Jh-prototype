import React, { useState, useMemo } from 'react';
import { HOLIDAY_PACKAGES, TourPackage } from '../data/holidays';

interface ExploreScreenProps {
  onNavigate: (view: string, payload?: any) => void;
  onSelectTour: (tourId: string) => void;
  onOpenConcierge: () => void;
  initialFilters?: any;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onNavigate,
  onSelectTour,
  onOpenConcierge,
  initialFilters,
}) => {
  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialFilters?.destination || '');
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['Czech Republic', 'Austria']);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Nov 2025');
  const [selectedDurations, setSelectedDurations] = useState<string[]>(['4 - 5 Days']);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(['Christmas Markets']);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<string>('Curated & Recommended');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Country counts
  const countryCounts = useMemo(() => {
    return {
      'Czech Republic': 4,
      'Switzerland': 6,
      'Austria': 5,
      'Hungary': 3,
      'Norway & Lapland': 4,
      'Iceland': 2,
    };
  }, []);

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
    );
  };

  const toggleDuration = (durationText: string) => {
    setSelectedDurations((prev) =>
      prev.includes(durationText) ? prev.filter((d) => d !== durationText) : [...prev, durationText]
    );
  };

  const toggleExperience = (exp: string) => {
    setSelectedExperiences((prev) =>
      prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCountries([]);
    setSelectedPeriod('');
    setSelectedDurations([]);
    setSelectedExperiences([]);
    setMaxPrice(2500);
  };

  // Filtered and sorted packages
  const filteredPackages = useMemo(() => {
    let result = [...HOLIDAY_PACKAGES];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q)
      );
    }

    if (selectedCountries.length > 0) {
      result = result.filter((p) => selectedCountries.includes(p.country));
    }

    if (selectedExperiences.length > 0) {
      result = result.filter((p) => selectedExperiences.includes(p.category));
    }

    result = result.filter((p) => p.pricePerPerson <= maxPrice);

    // Sorting
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
    } else if (sortBy === 'Duration: Shortest') {
      result.sort((a, b) => a.durationDays - b.durationDays);
    } else if (sortBy === 'Duration: Longest') {
      result.sort((a, b) => b.durationDays - a.durationDays);
    }

    return result;
  }, [searchQuery, selectedCountries, selectedExperiences, maxPrice, sortBy]);

  // If filtered result is empty because of too strict mock filters, fallback gracefully to all packages
  const displayPackages = filteredPackages.length > 0 ? filteredPackages : HOLIDAY_PACKAGES;

  return (
    <div className="w-full flex flex-col bg-[#f8f9fa] pt-20">
      {/* Top Breadcrumb & Discovery Header */}
      <section className="w-full bg-[#f0f3ff]/70 py-10 border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-[#525f71] mb-6">
            <button onClick={() => onNavigate('home')} className="hover:text-[#00677d] transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              Home
            </button>
            <span className="text-[#bcc9ce]">/</span>
            <span className="text-[#00677d] font-bold">Explore Holidays</span>
          </nav>

          {/* Editorial Title & Split Payment Assurance Pill */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e7eeff] text-[#00677d] text-[11px] uppercase tracking-widest font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]"></span>
                Winter & Spring 2025/26 Season
              </div>
              <h1 className="font-display text-[38px] md:text-[46px] text-[#111c2c] font-semibold tracking-tight">
                Explore Holidays
              </h1>
              <p className="text-[17px] text-[#525f71]">
                Handcrafted seasonal escapes and European city tours curated for discerning UK travellers.
              </p>
            </div>

            {/* Split Payment Assurance Pill */}
            <div className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-xl shadow-sm border border-[#e2e8f0]">
              <div className="w-10 h-10 rounded-full bg-[#ffdea9] flex items-center justify-center text-[#271900] shrink-0">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#525f71] font-bold">
                  Flexible Booking Guarantee
                </span>
                <span className="block text-[15px] font-bold text-[#111c2c]">
                  Secure from £450 deposit today
                </span>
              </div>
            </div>
          </div>

          {/* Quick Summary Stat Bar & Sort Controls */}
          <div className="mt-8 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#e2e8f0]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[14px] text-[#111c2c] mr-2 font-bold">
                Showing {displayPackages.length} Packages
              </span>
              {selectedExperiences.map((exp) => (
                <span
                  key={exp}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dee9ff] text-[#002727] text-[12px] font-semibold"
                >
                  {exp}
                  <button onClick={() => toggleExperience(exp)} className="hover:text-red-600 transition-colors">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}
              {selectedCountries.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dee9ff] text-[#002727] text-[12px] font-semibold"
                >
                  {c}
                  <button onClick={() => toggleCountry(c)} className="hover:text-red-600 transition-colors">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dee9ff] text-[#002727] text-[12px] font-semibold">
                Under £{maxPrice.toLocaleString()}
              </span>
              <button
                onClick={resetFilters}
                className="text-[#00677d] text-[12px] uppercase tracking-wider font-bold hover:underline ml-2"
              >
                Clear All
              </button>
            </div>

            {/* Sort Menu */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-packages" className="text-[13px] text-[#525f71] font-semibold">
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="sort-packages"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white text-[#111c2c] text-[13px] font-semibold pl-3 pr-8 py-2 rounded-lg border border-[#e2e8f0] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00677d] cursor-pointer"
                >
                  <option>Curated & Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Duration: Shortest</option>
                  <option>Duration: Longest</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#525f71] pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Filter Sidebar + Results Grid */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Filter Sidebar (320px) */}
            <aside className="w-full lg:w-80 shrink-0 bg-white rounded-2xl p-6 shadow-sm border border-[#e2e8f0] space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00677d] text-[20px]">tune</span>
                  <h2 className="text-[17px] font-bold text-[#111c2c]">Filters</h2>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-[11px] uppercase tracking-wider text-[#525f71] hover:text-[#ba1a1a] font-bold transition-colors"
                >
                  Reset Filters
                </button>
              </div>

              {/* Destination Filter */}
              <div className="space-y-3">
                <h3 className="text-[12px] uppercase tracking-wider text-[#111c2c] font-bold">
                  Destination
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search country or city..."
                    className="w-full bg-[#f0f3ff] text-[13px] text-[#111c2c] placeholder:text-[#6d797e] rounded-lg pl-9 pr-3 py-2 border border-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[#00677d]"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6d797e] text-[18px]">
                    search
                  </span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {Object.entries(countryCounts).map(([country, count]) => {
                    const isChecked = selectedCountries.includes(country);
                    return (
                      <label
                        key={country}
                        className="flex items-center justify-between text-[13px] text-[#111c2c] cursor-pointer select-none py-0.5 hover:text-[#00677d]"
                      >
                        <span className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCountry(country)}
                            className="w-4 h-4 rounded text-[#00677d] accent-[#00677d] cursor-pointer"
                          />
                          <span>{country}</span>
                        </span>
                        <span className="text-[11px] font-bold text-[#525f71] bg-[#f0f3ff] px-2 py-0.5 rounded-full">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Departure Period */}
              <div className="space-y-3">
                <h3 className="text-[12px] uppercase tracking-wider text-[#111c2c] font-bold">
                  Departure Period
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026'].map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => setSelectedPeriod(period === selectedPeriod ? '' : period)}
                      className={`px-3 py-2 rounded-lg text-[12px] text-left font-semibold transition-all ${
                        selectedPeriod === period
                          ? 'bg-[#002727] text-white shadow-sm'
                          : 'bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#111c2c]'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPeriod(
                        selectedPeriod === 'Spring 2026 (Mar - May)' ? '' : 'Spring 2026 (Mar - May)'
                      )
                    }
                    className={`col-span-2 px-3 py-2 rounded-lg text-[12px] text-left font-semibold transition-all ${
                      selectedPeriod === 'Spring 2026 (Mar - May)'
                        ? 'bg-[#002727] text-white shadow-sm'
                        : 'bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#111c2c]'
                    }`}
                  >
                    Spring 2026 (Mar - May)
                  </button>
                </div>
              </div>

              {/* Tour Duration */}
              <div className="space-y-3">
                <h3 className="text-[12px] uppercase tracking-wider text-[#111c2c] font-bold">
                  Tour Duration
                </h3>
                <div className="space-y-2">
                  {['2 - 3 Days (Weekend Break)', '4 - 5 Days (Classic Tour)', '6 - 7 Days (Grand Explorer)', '8+ Days (Extended Journey)'].map(
                    (dur) => {
                      const checked = selectedDurations.some((d) => dur.startsWith(d));
                      return (
                        <label
                          key={dur}
                          className="flex items-center gap-2.5 text-[13px] text-[#111c2c] cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleDuration(dur.split(' ')[0] + ' ' + dur.split(' ')[1] + ' ' + dur.split(' ')[2])}
                            className="w-4 h-4 rounded text-[#00677d] accent-[#00677d] cursor-pointer"
                          />
                          <span>{dur}</span>
                        </label>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Experience Style */}
              <div className="space-y-3">
                <h3 className="text-[12px] uppercase tracking-wider text-[#111c2c] font-bold">
                  Experience Style
                </h3>
                <div className="space-y-2">
                  {[
                    { label: 'Christmas Markets', icon: 'park' },
                    { label: 'Alpine & Snow', icon: 'downhill_skiing' },
                    { label: 'Cultural & Heritage', icon: 'museum' },
                    { label: 'Thermal Spas & Lakes', icon: 'hot_tub' },
                    { label: 'Northern Lights', icon: 'nightlight' },
                  ].map((exp) => (
                    <label
                      key={exp.label}
                      className="flex items-center justify-between text-[13px] text-[#111c2c] cursor-pointer hover:text-[#00677d]"
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedExperiences.includes(exp.label)}
                          onChange={() => toggleExperience(exp.label)}
                          className="w-4 h-4 rounded text-[#00677d] accent-[#00677d] cursor-pointer"
                        />
                        <span>{exp.label}</span>
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-[#c59b27]">
                        {exp.icon}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price per Person Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[12px] uppercase tracking-wider text-[#111c2c] font-bold">
                    Price per Person
                  </h3>
                  <span className="text-[12px] font-bold text-[#00677d]">
                    £400 - £{maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="2500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                  className="w-full accent-[#00677d] cursor-pointer"
                />
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-[#f0f3ff] py-1.5 rounded-lg border border-[#e2e8f0]">
                    <span className="block text-[10px] text-[#525f71] uppercase font-bold">Min</span>
                    <span className="text-[13px] font-bold text-[#111c2c]">£400</span>
                  </div>
                  <div className="bg-[#f0f3ff] py-1.5 rounded-lg border border-[#e2e8f0]">
                    <span className="block text-[10px] text-[#525f71] uppercase font-bold">Max</span>
                    <span className="text-[13px] font-bold text-[#111c2c]">£{maxPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Split Deposit Notice */}
                <div className="bg-[#e7eeff] p-3 rounded-xl flex items-start gap-2.5 border border-[#bcc9ce]/40">
                  <span className="material-symbols-outlined text-[#c59b27] text-[18px] shrink-0 mt-0.5">
                    verified
                  </span>
                  <p className="text-[12px] text-[#404848] leading-snug">
                    <strong className="text-[#111c2c]">Split Deposit:</strong> All packages eligible for split deposits from £450 today. Balance 30 days prior.
                  </p>
                </div>
              </div>

              {/* Accommodations */}
              <div className="space-y-3">
                <h3 className="text-[12px] uppercase tracking-wider text-[#111c2c] font-bold">
                  Accommodations & Standard
                </h3>
                <div className="space-y-2 text-[13px] text-[#111c2c]">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#00677d] accent-[#00677d]" />
                    <span>4★ & 5★ Heritage Hotels</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#00677d] accent-[#00677d]" />
                    <span>UK Airport Transfers Included</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-[#00677d] accent-[#00677d]" />
                    <span>Return Flights Included</span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {}}
                className="w-full bg-[#002727] hover:bg-[#0f3e3d] text-white text-[14px] font-bold py-3 rounded-xl shadow transition-all"
              >
                Apply Filters
              </button>
            </aside>

            {/* Results Grid (Matching Image_5 & Image_6) */}
            <main className="flex-1 w-full space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayPackages.map((tour) => (
                  <article
                    key={tour.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e2e8f0] flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Visual Card Header */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#e7eeff]">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                        {tour.badge && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffdea9] text-[#271900] text-[11px] uppercase tracking-wider font-bold shadow">
                            <span className="material-symbols-outlined text-[13px]">hotel_class</span>
                            {tour.badge}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-semibold drop-shadow">
                        <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          {tour.duration}
                        </span>
                        <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
                          <span className="material-symbols-outlined text-[14px]">flight_takeoff</span>
                          {tour.highlightTag}
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[#525f71] text-[11px] uppercase tracking-wider font-semibold">
                          <span className="truncate pr-1">{tour.destination.split('—')[0]}</span>
                          <span className="text-[#c59b27] font-bold shrink-0">{tour.category}</span>
                        </div>
                        <h3 className="font-display text-[19px] text-[#111c2c] group-hover:text-[#00677d] transition-colors leading-snug font-bold">
                          {tour.title}
                        </h3>
                        <p className="text-[13px] text-[#404848] line-clamp-2 leading-relaxed">
                          {tour.description}
                        </p>

                        {/* Inclusions Pill Box */}
                        <div className="mt-3 pt-1 space-y-1.5 bg-[#f0f3ff]/80 p-3 rounded-xl border border-[#e2e8f0]/60">
                          {tour.inclusions.slice(0, 3).map((inc, i) => (
                            <div key={i} className="flex items-center gap-2 text-[12px] text-[#111c2c] truncate">
                              <span className="material-symbols-outlined text-[15px] text-[#c59b27] shrink-0">
                                verified
                              </span>
                              <span className="truncate">{inc.split(':')[0]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price & View Details CTA */}
                      <div className="pt-3 border-t border-[#e2e8f0] flex items-end justify-between gap-2">
                        <div>
                          <span className="block text-[11px] uppercase tracking-wider text-[#525f71]">
                            Total Package
                          </span>
                          <div className="text-[24px] font-bold text-[#111c2c]">
                            £{tour.pricePerPerson}{' '}
                            <span className="text-[12px] font-normal text-[#525f71]">pp</span>
                          </div>
                          <span className="block text-[11px] text-[#c59b27] font-bold mt-0.5">
                            From £{tour.depositPerPerson} deposit today
                          </span>
                        </div>
                        <button
                          onClick={() => onSelectTour(tour.id)}
                          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#ffdea9] hover:bg-[#ffba27] text-[#271900] text-[13px] font-bold shadow-sm transition-all hover:shadow active:scale-95"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Bottom Pagination */}
              <nav
                aria-label="Holidays catalog pagination"
                className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#e2e8f0]"
              >
                <span className="text-[13px] text-[#525f71]">
                  Showing <strong className="text-[#111c2c]">1 - 6</strong> of 24 packages
                </span>
                <div className="flex items-center gap-1.5 text-[13px]">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg bg-[#f0f3ff] text-[#6d797e] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    Previous
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#002727] text-white font-bold shadow-sm">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#f0f3ff] hover:bg-[#dee9ff] text-[#111c2c] transition-colors">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#f0f3ff] hover:bg-[#dee9ff] text-[#111c2c] transition-colors">
                    3
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#f0f3ff] hover:bg-[#dee9ff] text-[#111c2c] transition-colors">
                    4
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1.5 rounded-lg bg-[#f0f3ff] hover:bg-[#dee9ff] text-[#111c2c] transition-colors flex items-center gap-1"
                  >
                    Next <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </nav>
            </main>
          </div>
        </div>
      </section>

      {/* Bespoke Airport Transfer & Regional UK Concierge Help Banner (Matching Image_5 & Image_6) */}
      <section className="w-full bg-[#dee9ff]/40 py-12 border-t border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#e2e8f0] flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#002727] flex items-center justify-center shrink-0 text-white shadow-sm">
                <span className="material-symbols-outlined text-[26px]">airport_shuttle</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-[20px] font-bold text-[#111c2c]">
                  Need bespoke UK airport transfers or custom departure dates?
                </h3>
                <p className="text-[14px] text-[#525f71]">
                  Every package can be custom-tailored with door-to-terminal chauffeur transfers from Heathrow, Gatwick, Manchester, Birmingham, and Edinburgh.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="tel:08004567890"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#002727] text-white hover:bg-[#0f3e3d] text-[14px] font-bold shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call 0800 456 7890
              </a>
              <button
                onClick={onOpenConcierge}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#e7eeff] text-[#111c2c] hover:bg-[#dee9ff] text-[14px] font-bold transition-all"
              >
                Enquire Bespoke
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
