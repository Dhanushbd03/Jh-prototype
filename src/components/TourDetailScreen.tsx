import React, { useState } from 'react';
import { HOLIDAY_PACKAGES, TourPackage } from '../data/holidays';

interface TourDetailScreenProps {
  tourId: string;
  onNavigate: (view: string, payload?: any) => void;
  onStartBooking: (config: {
    tour: TourPackage;
    departureDate: string;
    roomType: string;
    adults: number;
    children: number;
    infants: number;
  }) => void;
  onOpenConcierge: () => void;
  onOpenPdfModal: (tour: TourPackage) => void;
}

export const TourDetailScreen: React.FC<TourDetailScreenProps> = ({
  tourId,
  onNavigate,
  onStartBooking,
  onOpenConcierge,
  onOpenPdfModal,
}) => {
  const tour = HOLIDAY_PACKAGES.find((p) => p.id === tourId) || HOLIDAY_PACKAGES[0];

  // Booking widget states
  const [selectedDeparture, setSelectedDeparture] = useState(tour.departureDates[0] || '05 Dec – 08 Dec 2025');
  const [selectedRoom, setSelectedRoom] = useState('1x Heritage Double Room (Grand Hotel Bohemia)');
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(1);
  const [infantCount, setInfantCount] = useState(0);

  // Accordion state
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const toggleAllDays = () => {
    if (expandedDays.length === tour.itinerary.length) {
      setExpandedDays([]);
    } else {
      setExpandedDays(tour.itinerary.map((it) => it.day));
    }
  };

  // Calculations
  const adultTotal = adultCount * tour.pricePerPerson;
  const childRate = 675; // Concession rate
  const childTotal = childCount * childRate;
  const holidayTotal = adultTotal + childTotal;

  const depositRate = tour.depositPerPerson; // £450
  const depositTotal = (adultCount + childCount) * depositRate;

  const handleBookNow = () => {
    onStartBooking({
      tour,
      departureDate: selectedDeparture,
      roomType: selectedRoom,
      adults: adultCount,
      children: childCount,
      infants: infantCount,
    });
  };

  return (
    <div className="w-full flex flex-col bg-[#f8f9fa] pt-20">
      {/* Sub-header Breadcrumb & Rating */}
      <section className="w-full bg-[#f0f3ff]/70 py-3.5 border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-[#525f71]">
            <button onClick={() => onNavigate('home')} className="hover:text-[#00677d]">Home</button>
            <span className="text-[#bcc9ce]">›</span>
            <button onClick={() => onNavigate('holidays')} className="hover:text-[#00677d]">Holidays</button>
            <span className="text-[#bcc9ce]">›</span>
            <span className="text-[#525f71]">Europe</span>
            <span className="text-[#bcc9ce]">›</span>
            <span className="text-[#525f71]">{tour.country}</span>
            <span className="text-[#bcc9ce]">›</span>
            <span className="text-[#00677d] font-bold truncate">{tour.title}</span>
          </nav>
          <div className="flex items-center gap-4 text-[12px] font-semibold text-[#525f71]">
            <span className="flex items-center gap-1 text-[#00677d]">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              ATOL Protected #9822
            </span>
            <span className="flex items-center gap-1 text-[#111c2c]">
              <span className="material-symbols-outlined text-[16px] text-[#ffba27] fill-1">star</span>
              4.94 / 5 (128 verified travellers)
            </span>
          </div>
        </div>
      </section>

      {/* Hero Banner with Key Facts Bar (Matching Image_7) */}
      <section className="relative w-full bg-[#002727] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#002727] via-transparent to-black/60 pointer-events-none z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${tour.image})` }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-20 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {tour.badge && (
              <span className="px-3 py-1 rounded-full bg-[#ffdea9] text-[#271900] text-[11px] font-bold uppercase tracking-wider">
                {tour.badge}
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold">
              {tour.duration}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold">
              Christmas Markets & Heritage
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold">
              Boutique Small Group
            </span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="font-display text-[40px] md:text-[52px] font-bold leading-tight tracking-tight text-white">
              {tour.title}
            </h1>
            <p className="text-[17px] md:text-[19px] text-[#dee9ff] leading-relaxed">
              Immerse yourself in fairy-tale Gothic spires, traditional wooden chalets, spiced mulled wine, and evening classical concerts in Prague’s historic Old Town.
            </p>
          </div>

          {/* Quick Facts Bar */}
          <div className="bg-white text-[#111c2c] rounded-2xl p-4 lg:p-6 shadow-xl grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-0.5 border-r border-[#e2e8f0]/80 pr-2">
              <span className="text-[10px] uppercase tracking-wider text-[#525f71] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#00677d]">location_on</span>
                Destination
              </span>
              <p className="text-[14px] font-bold truncate">Prague, Czechia</p>
            </div>
            <div className="space-y-0.5 border-r border-[#e2e8f0]/80 pr-2">
              <span className="text-[10px] uppercase tracking-wider text-[#525f71] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#00677d]">schedule</span>
                Duration
              </span>
              <p className="text-[14px] font-bold">{tour.duration}</p>
            </div>
            <div className="space-y-0.5 border-r border-[#e2e8f0]/80 pr-2">
              <span className="text-[10px] uppercase tracking-wider text-[#525f71] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#00677d]">groups</span>
                Group Size
              </span>
              <p className="text-[14px] font-bold">Max 16 Guests</p>
            </div>
            <div className="space-y-0.5 border-r border-[#e2e8f0]/80 pr-2">
              <span className="text-[10px] uppercase tracking-wider text-[#525f71] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#00677d]">hotel</span>
                Accommodation
              </span>
              <p className="text-[14px] font-bold truncate">4★ Grand Bohemia</p>
            </div>
            <div className="space-y-0.5 col-span-2 md:col-span-1">
              <span className="text-[10px] uppercase tracking-wider text-[#525f71] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#00677d]">calendar_month</span>
                Departures
              </span>
              <p className="text-[14px] font-bold">Nov – Dec 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Content Layout (Matching Image_7) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (8 Cols): Narrative, Inclusions, Itinerary, Lodging, Gallery */}
          <div className="lg:col-span-8 space-y-12">
            {/* Tour Overview */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#e2e8f0] space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#00677d] font-bold">
                  Tour Overview
                </span>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-[#111c2c]">
                  A Winter Fairy Tale Along the Vltava
                </h2>
              </div>
              <div className="text-[15px] text-[#404848] leading-relaxed space-y-4">
                <p>
                  Prague during Christmastime transforms into an authentic jewel of Central Europe. The city of a hundred spires softens under gentle winter snowfalls, while the vibrant aromas of roasted chestnuts, cinnamon-dusted trdelník pastries, and spiced <em>svařák</em> wine drift from hand-carved pine stalls.
                </p>
                <p>
                  Crafted specifically for discerning UK holidaymakers seeking both heritage immersion and unhurried comfort, this signature 4-day tour blends private executive airport logistics with private boutique accommodation in the historic centre. You will experience curated walking excursions led by senior historians, reserve premium seats for an evening classical performance in a baroque landmark, and retain ample private leisure to savour Prague’s atmospheric tea rooms and craft artisan squares.
                </p>
              </div>

              {/* 4 Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#f0f3ff] border border-[#e2e8f0] flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#00677d] shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">hotel</span>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#111c2c]">Exclusive Old Town Hotel</h4>
                    <p className="text-[12px] text-[#525f71] mt-0.5">
                      Steps from the Astronomical Clock and Týn Church; return to warmth within minutes.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#f0f3ff] border border-[#e2e8f0] flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#00677d] shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">directions_car</span>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#111c2c]">Private Executive Transfers</h4>
                    <p className="text-[12px] text-[#525f71] mt-0.5">
                      Door-to-door Mercedes-Benz airport transfers from Prague Václav Havel Airport.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#f0f3ff] border border-[#e2e8f0] flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#00677d] shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">music_note</span>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#111c2c]">Classical Advent Concert</h4>
                    <p className="text-[12px] text-[#525f71] mt-0.5">
                      Reserved Category A nave seating for Vivaldi & Mozart in St. Nicholas Church.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#f0f3ff] border border-[#e2e8f0] flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#00677d] shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">local_cafe</span>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#111c2c]">Festive Tasting Journey</h4>
                    <p className="text-[12px] text-[#525f71] mt-0.5">
                      Curated sampler of local artisan delicacies, Bohemia ciders, and historic market lore.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inclusions & Value Card */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#e2e8f0] space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#00677d] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Clarity & Value
                </span>
                <h2 className="font-display text-[26px] font-bold text-[#111c2c]">
                  What Is Included In Your Escape
                </h2>
                <span className="text-[12px] text-[#525f71] block">
                  🛡️ Guaranteed British Tour Operator Standards
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Included Features */}
                <div className="space-y-3">
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#1E7E34] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    All Included Features
                  </h3>
                  <div className="space-y-2.5 text-[13px] text-[#111c2c]">
                    {tour.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#1E7E34] shrink-0 mt-0.5">
                          done
                        </span>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Not Included / Optional */}
                <div className="space-y-3">
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#525f71] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">info</span>
                    Not Included / Optional
                  </h3>
                  <div className="space-y-2.5 text-[13px] text-[#525f71]">
                    {tour.excluded.map((exc, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#707978] shrink-0 mt-0.5">
                          close
                        </span>
                        <span>{exc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Day-by-Day Itinerary with Accordion */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#e2e8f0] space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#00677d] font-bold">
                    Curated Journey
                  </span>
                  <h2 className="font-display text-[26px] font-bold text-[#111c2c]">
                    Day-by-Day Itinerary
                  </h2>
                </div>
                <button
                  onClick={toggleAllDays}
                  className="text-[12px] font-bold text-[#00677d] hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">unfold_more</span>
                  {expandedDays.length === tour.itinerary.length ? 'Collapse All' : 'Expand All Days'}
                </button>
              </div>

              <div className="space-y-4">
                {tour.itinerary.map((it) => {
                  const isOpen = expandedDays.includes(it.day);
                  return (
                    <div
                      key={it.day}
                      className="rounded-xl border border-[#e2e8f0] overflow-hidden transition-all bg-[#f8f9fa]"
                    >
                      <button
                        onClick={() => toggleDay(it.day)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-[#f0f3ff] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#002727] text-white font-bold text-[13px] flex items-center justify-center shrink-0">
                            0{it.day}
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase tracking-wider text-[#525f71] font-bold">
                              Day 0{it.day}
                            </span>
                            <span className="font-headline-sm text-[16px] font-bold text-[#111c2c]">
                              {it.title}
                            </span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-[20px] text-[#525f71] transition-transform duration-200">
                          {isOpen ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="p-5 pt-0 bg-white border-t border-[#e2e8f0] space-y-3">
                          <p className="text-[14px] text-[#404848] leading-relaxed pt-3">
                            {it.description}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {it.inclusions.map((inc, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e7eeff] text-[#002727] text-[11px] font-semibold"
                              >
                                <span className="material-symbols-outlined text-[14px] text-[#00677d]">check</span>
                                {inc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lodging & Logistics Card */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#e2e8f0] space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#00677d] font-bold">
                  Featured Sanctuary
                </span>
                <h2 className="font-display text-[26px] font-bold text-[#111c2c]">
                  Your Hotel & Travel Logistics
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 h-56 rounded-xl overflow-hidden relative">
                  <img
                    src={tour.secondaryImage || tour.image}
                    alt={tour.hotel}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#002727]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    4★ Superior Heritage
                  </span>
                </div>
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center gap-1 text-[#ffba27]">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px] fill-1">star</span>
                    ))}
                    <span className="text-[12px] text-[#525f71] ml-2 font-semibold">Selected Accommodation</span>
                  </div>
                  <h3 className="font-display text-[22px] font-bold text-[#111c2c]">
                    {tour.hotel}
                  </h3>
                  <p className="text-[13px] text-[#525f71]">
                    {tour.hotelAddress} — Only 180 metres from the Powder Gate and 5 minutes on foot to the Old Town Square Christmas market.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[12px] text-[#111c2c] pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#00677d]">wifi</span>
                      <span>Free High-speed Wi-Fi</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#00677d]">restaurant</span>
                      <span>Neo-Baroque Breakfast Hall</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#00677d]">bed</span>
                      <span>Hypnos Luxury Mattresses</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#00677d]">dry_cleaning</span>
                      <span>Valet & Laundry Services</span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-[#f0f3ff] rounded-lg text-[12px] text-[#00677d] font-semibold">
                    ✨ Complimentary room upgrade to Executive Heritage floor (subject to availability).
                  </div>
                </div>
              </div>

              {/* 3 Logistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#e2e8f0] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#525f71] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#00677d]">badge</span>
                    Passports & Visas
                  </span>
                  <p className="text-[12px] text-[#404848] leading-snug">
                    Valid UK passport with 3+ months remaining. No visa required for stays under 90 days.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#e2e8f0] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#525f71] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#00677d]">payments</span>
                    Currency & Cards
                  </span>
                  <p className="text-[12px] text-[#404848] leading-snug">
                    Czech Koruna (CZK). Contactless cards widely accepted across 95% of Christmas chalets.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#e2e8f0] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#525f71] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#00677d]">ac_unit</span>
                    Winter Attire
                  </span>
                  <p className="text-[12px] text-[#404848] leading-snug">
                    Expect 0°C to 4°C. We suggest warm thermal layering, insulated gloves, and sturdy tread boots.
                  </p>
                </div>
              </div>
            </div>

            {/* Winter in Prague Photo Gallery */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#e2e8f0] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#00677d] font-bold">
                    Atmosphere
                  </span>
                  <h2 className="font-display text-[26px] font-bold text-[#111c2c]">
                    Winter in Prague
                  </h2>
                </div>
                <span className="text-[12px] text-[#525f71] font-semibold">4 Curated Highlights</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tour.gallery.map((g, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden group shadow-sm">
                    <img
                      src={g.image}
                      alt={g.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <span className="absolute bottom-3 left-3 text-white text-[13px] font-semibold">
                      {g.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 Cols): Sticky Booking Widget (Matching Image_7) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#e2e8f0] space-y-6">
              {/* Allocation status */}
              <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
                <span className="px-2.5 py-1 rounded-full bg-[#f0f3ff] text-[#00677d] text-[11px] font-bold uppercase tracking-wider">
                  Festive 2025 Allocation
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#1E7E34]">
                  <span className="w-2 h-2 rounded-full bg-[#1E7E34] animate-pulse"></span>
                  Live Availability
                </span>
              </div>

              {/* Title & Group Size */}
              <div className="space-y-1">
                <h3 className="font-display text-[22px] font-bold text-[#111c2c]">
                  {tour.title}
                </h3>
                <p className="text-[12px] text-[#525f71]">Small boutique group (16 guests max)</p>
              </div>

              {/* Price Banner with Split Deposit Note */}
              <div className="bg-[#f0f3ff] p-4 rounded-xl space-y-1">
                <span className="block text-[11px] uppercase tracking-wider text-[#525f71]">
                  Total Package Price
                </span>
                <div className="text-[32px] font-bold text-[#111c2c]">
                  £{tour.pricePerPerson} <span className="text-[13px] font-normal text-[#525f71]">/ person</span>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-[#c59b27] font-semibold pt-1">
                  <span className="material-symbols-outlined text-[16px]">payments</span>
                  <span>Flexible split deposit: Pay £{tour.depositPerPerson} today (0% interest)</span>
                </div>
              </div>

              {/* Select Guaranteed Departure */}
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase tracking-wider text-[#525f71] font-bold">
                  Select Guaranteed Departure
                </label>
                <div className="relative">
                  <select
                    value={selectedDeparture}
                    onChange={(e) => setSelectedDeparture(e.target.value)}
                    className="w-full appearance-none bg-[#f8f9fa] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-[#111c2c] focus:outline-none focus:ring-2 focus:ring-[#00677d] cursor-pointer"
                  >
                    {tour.departureDates.map((date) => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#525f71] pointer-events-none text-[18px]">
                    calendar_month
                  </span>
                </div>
              </div>

              {/* Room Configuration */}
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase tracking-wider text-[#525f71] font-bold">
                  Room Configuration
                </label>
                <div className="relative">
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full appearance-none bg-[#f8f9fa] border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-[#111c2c] focus:outline-none focus:ring-2 focus:ring-[#00677d] cursor-pointer"
                  >
                    <option>1x Heritage Double Room (Grand Hotel Bohemia)</option>
                    <option>1x Heritage Twin Beds Room (Separate beds)</option>
                    <option>1x Executive Heritage Family Suite (Triple)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#525f71] pointer-events-none text-[18px]">
                    hotel
                  </span>
                </div>
              </div>

              {/* Number of Travellers Steppers */}
              <div className="space-y-3 pt-1">
                <span className="block text-[11px] uppercase tracking-wider text-[#525f71] font-bold">
                  Number of Travellers
                </span>

                {/* Adults Stepper */}
                <div className="flex items-center justify-between p-2.5 bg-[#f8f9fa] rounded-xl border border-[#e2e8f0]">
                  <div>
                    <span className="text-[13px] font-bold text-[#111c2c] block">Adults</span>
                    <span className="text-[11px] text-[#525f71]">Ages 12+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdultCount((c) => Math.max(1, c - 1))}
                      className="w-8 h-8 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center font-bold text-lg hover:bg-[#dee9ff]"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-bold text-[15px]">{adultCount}</span>
                    <button
                      type="button"
                      onClick={() => setAdultCount((c) => Math.min(10, c + 1))}
                      className="w-8 h-8 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center font-bold text-lg hover:bg-[#dee9ff]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children Stepper */}
                <div className="flex items-center justify-between p-2.5 bg-[#f8f9fa] rounded-xl border border-[#e2e8f0]">
                  <div>
                    <span className="text-[13px] font-bold text-[#111c2c] block">Children</span>
                    <span className="text-[11px] text-[#525f71]">2–11 yrs (£675)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildCount((c) => Math.max(0, c - 1))}
                      className="w-8 h-8 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center font-bold text-lg hover:bg-[#dee9ff]"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-bold text-[15px]">{childCount}</span>
                    <button
                      type="button"
                      onClick={() => setChildCount((c) => Math.min(6, c + 1))}
                      className="w-8 h-8 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center font-bold text-lg hover:bg-[#dee9ff]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time Calculation Ledger */}
              <div className="pt-2 border-t border-[#e2e8f0] space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#525f71]">Holiday Package ({adultCount} Adults × £{tour.pricePerPerson})</span>
                  <span className="font-semibold">£{adultTotal.toLocaleString()}</span>
                </div>
                {childCount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#525f71]">Child Concession ({childCount} × £{childRate})</span>
                    <span className="font-semibold">£{childTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#525f71]">Airport Executive Chauffeur (Return)</span>
                  <span className="font-semibold text-[#1E7E34]">Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#525f71]">Advent Concert Category A Tickets</span>
                  <span className="font-semibold text-[#1E7E34]">Included</span>
                </div>

                <div className="pt-3 border-t border-[#e2e8f0] flex items-baseline justify-between">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-[#525f71] font-bold">
                      Payable Deposit Today:
                    </span>
                    <span className="text-[11px] text-[#525f71]">
                      Remaining £{(holidayTotal - depositTotal).toLocaleString()} balance due 45 days prior to travel.
                    </span>
                  </div>
                  <span className="text-[26px] font-bold text-[#002727]">
                    £{depositTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* BOOK NOW CTA Button */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={handleBookNow}
                  className="w-full flex items-center justify-center gap-2 bg-[#002727] hover:bg-[#0f3e3d] text-white py-3.5 px-4 rounded-xl text-[14px] font-bold shadow-lg transition-all active:scale-98"
                >
                  <span>BOOK NOW — SELECT TRAVELLERS</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>

                <button
                  onClick={() => onOpenPdfModal(tour)}
                  className="w-full flex items-center justify-center gap-2 bg-[#f0f3ff] hover:bg-[#dee9ff] text-[#111c2c] py-2.5 px-4 rounded-xl text-[13px] font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Download Full Itinerary (PDF)</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 border-t border-[#e2e8f0] space-y-2 text-[12px] text-[#525f71]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#00677d]">verified_user</span>
                  <span>100% Financial Protection via ATOL (#9822) & ABTA Trust Account.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#00677d]">event_available</span>
                  <span>Flexible cancellation: Full refund up to 45 days before departure.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#00677d]">lock</span>
                  <span>No hidden card fees or currency surcharge guarantees.</span>
                </div>
              </div>

              {/* Tailored Flights Helpline Widget */}
              <div className="p-4 bg-[#dee9ff]/60 rounded-xl space-y-2 border border-[#bcc9ce]/40">
                <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#002727] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px] text-[#00677d]">support_agent</span>
                  <span>Need Tailored Flights or Dates?</span>
                </div>
                <p className="text-[12px] text-[#404848] leading-snug">
                  Our UK travel designers can pair this itinerary with direct British Airways flights from your local airport.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <a
                    href="tel:08004567890"
                    className="text-[12px] font-bold text-[#00677d] hover:underline"
                  >
                    Call UK Concierge on 0800 456 7890 ›
                  </a>
                  <button
                    onClick={onOpenConcierge}
                    className="text-[11px] font-bold text-[#0f3e3d] bg-white px-2.5 py-1 rounded-md shadow-sm"
                  >
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
