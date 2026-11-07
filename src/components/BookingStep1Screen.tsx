import React, { useState } from 'react';
import { TourPackage } from '../data/holidays';

export interface BookingConfiguration {
  tour: TourPackage;
  departureDate: string;
  roomType: string;
  adults: number;
  children: number;
  infants: number;
  paymentScheme: 'full' | 'split';
  specialRequests: string;
}

interface BookingStep1ScreenProps {
  initialConfig: BookingConfiguration;
  onNavigate: (view: string, payload?: any) => void;
  onContinueToGuests: (config: BookingConfiguration) => void;
}

export const BookingStep1Screen: React.FC<BookingStep1ScreenProps> = ({
  initialConfig,
  onNavigate,
  onContinueToGuests,
}) => {
  const [adults, setAdults] = useState<number>(initialConfig.adults || 2);
  const [children, setChildren] = useState<number>(initialConfig.children ?? 1);
  const [infants, setInfants] = useState<number>(initialConfig.infants || 0);
  const [scheme, setScheme] = useState<'full' | 'split'>(initialConfig.paymentScheme || 'full');
  const [specialRequests, setSpecialRequests] = useState<string>(
    initialConfig.specialRequests ||
      '1 Double Bed + 1 Premium Rollaway Bed confirmed in Family Suite. 1 Vegetarian menu profile noted for Prague Castle festive banquet.'
  );

  const tour = initialConfig.tour;

  // Rate constants
  const adultFullPrice = tour.pricePerPerson || 700;
  const childFullPrice = 675;
  const adultDeposit = 450;
  const childDeposit = 450;

  // Total Calculations
  const adultTotal = adults * adultFullPrice;
  const childTotal = children * childFullPrice;
  const grandTotal = adultTotal + childTotal;

  const totalDeposit = adults * adultDeposit + children * childDeposit;
  const totalBalanceDue = grandTotal - totalDeposit;

  const payableToday = scheme === 'full' ? grandTotal : totalDeposit;
  const remainingBalance = scheme === 'full' ? 0 : totalBalanceDue;

  const handleAppendTag = (tag: string) => {
    setSpecialRequests((prev) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed}\n• ${tag}` : `• ${tag}`;
    });
  };

  const handleContinue = () => {
    onContinueToGuests({
      tour,
      departureDate: initialConfig.departureDate || '05 Dec – 08 Dec 2025',
      roomType: initialConfig.roomType || 'Grand Hotel Bohemia Executive Suite',
      adults,
      children,
      infants,
      paymentScheme: scheme,
      specialRequests,
    });
  };

  return (
    <div className="w-full flex flex-col bg-[#f8f9fa] pt-20">
      {/* Progress & Breadcrumb Sub-Header */}
      <section className="w-full bg-[#f0f3ff]/70 py-4 border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-[#525f71]">
            <button onClick={() => onNavigate('home')} className="hover:text-[#00677d]">Home</button>
            <span className="text-[#bcc9ce]">›</span>
            <button onClick={() => onNavigate('holidays')} className="hover:text-[#00677d]">Holidays</button>
            <span className="text-[#bcc9ce]">›</span>
            <button onClick={() => onNavigate('holiday-detail', { tourId: tour.id })} className="hover:text-[#00677d]">
              {tour.title}
            </button>
            <span className="text-[#bcc9ce]">›</span>
            <span className="text-[#111c2c] font-bold">Book Your Holiday</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1 rounded-full shadow-sm text-[12px] font-bold text-[#00677d] border border-[#e2e8f0]">
            <span className="material-symbols-outlined text-[16px] text-[#c59b27]">verified_user</span>
            <span>ATOL Protected #9822 & ABTA Bonded</span>
          </div>
        </div>
      </section>

      {/* Step Process Meter Bar (Matching Image_3 & Image_4) */}
      <section className="w-full bg-white shadow-sm border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {/* Step 1: Active */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#002727] text-white flex items-center justify-center font-bold text-[15px] shadow-md ring-4 ring-[#00677d]/20">
                1
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#00677d] uppercase tracking-wider font-bold">
                  Step 1 · Current
                </span>
                <span className="text-[14px] font-bold text-[#111c2c] truncate">
                  Travellers & Payment
                </span>
              </div>
            </div>

            {/* Step 2: Upcoming */}
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-9 h-9 rounded-full bg-[#e7eeff] text-[#404848] flex items-center justify-center font-bold text-[14px]">
                2
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#6d797e] uppercase tracking-wider font-semibold">
                  Step 2
                </span>
                <span className="text-[14px] font-medium text-[#111c2c] truncate">
                  Guest Details
                </span>
              </div>
            </div>

            {/* Step 3: Upcoming */}
            <div className="hidden lg:flex items-center gap-3 opacity-60">
              <div className="w-9 h-9 rounded-full bg-[#e7eeff] text-[#404848] flex items-center justify-center font-bold text-[14px]">
                3
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#6d797e] uppercase tracking-wider font-semibold">
                  Step 3
                </span>
                <span className="text-[14px] font-medium text-[#111c2c] truncate">
                  Secure Settlement
                </span>
              </div>
            </div>

            {/* Step 4: Upcoming */}
            <div className="hidden lg:flex items-center gap-3 opacity-60">
              <div className="w-9 h-9 rounded-full bg-[#e7eeff] text-[#404848] flex items-center justify-center font-bold text-[14px]">
                4
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#6d797e] uppercase tracking-wider font-semibold">
                  Step 4
                </span>
                <span className="text-[14px] font-medium text-[#111c2c] truncate">
                  Voucher Issued
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar track */}
          <div className="w-full bg-[#e7eeff] h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#002727] h-full rounded-full transition-all duration-500 w-1/4"></div>
          </div>
        </div>
      </section>

      {/* Main Booking Workspace */}
      <section className="w-full py-10 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (8 Cols): Configurator Forms */}
            <div className="lg:col-span-8 space-y-8">
              {/* Heading */}
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00677d]/10 text-[#00677d] text-[11px] tracking-wider uppercase font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#00677d] animate-pulse"></span>
                  Step 1 of 3 · Booking Configuration
                </div>
                <h1 className="font-display text-[32px] md:text-[38px] text-[#111c2c] font-bold tracking-tight">
                  Customise Party & Payment
                </h1>
                <p className="text-[14px] text-[#525f71]">
                  Set your party headcount and select an upfront or 0% APR split payment schedule tailored to your schedule.
                </p>
              </div>

              {/* Part A: Package Summary Context Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e2e8f0] flex flex-col sm:flex-row gap-5 items-stretch">
                <div className="sm:w-52 h-44 sm:h-auto rounded-xl overflow-hidden shrink-0 relative bg-[#e7eeff]">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#0f1c2c]/90 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {tour.duration}
                  </span>
                </div>
                <div className="flex flex-col justify-between py-1 grow space-y-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[#c59b27] text-[11px] uppercase tracking-wide font-bold">
                        Festive Season 2025
                      </span>
                      <span className="text-[#bcc9ce]">•</span>
                      <span className="text-[#525f71] text-[11px] font-semibold">Boutique Group (Max 16)</span>
                    </div>
                    <h2 className="font-display text-[22px] font-bold text-[#111c2c] leading-snug">
                      {tour.title}
                    </h2>
                    <p className="text-[13px] text-[#525f71] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-[#00677d]">location_on</span>
                      {tour.destination}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 bg-[#f0f3ff]/60 p-3 rounded-xl border border-[#e2e8f0]">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-[#00677d]">calendar_month</span>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#525f71] uppercase font-bold">Tour Dates</span>
                        <span className="text-[13px] text-[#111c2c] font-bold">
                          {initialConfig.departureDate || '05 Dec – 08 Dec 2025'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-[#00677d]">hotel</span>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#525f71] uppercase font-bold">Lodging</span>
                        <span className="text-[13px] text-[#111c2c] font-bold truncate">
                          {tour.hotel.split('(')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part B: Section 1 - Traveller Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e2e8f0] space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#e2e8f0] gap-2">
                  <div>
                    <h3 className="text-[18px] font-bold text-[#111c2c] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#00677d]/10 text-[#00677d] text-[12px] font-bold flex items-center justify-center">
                        1
                      </span>
                      Select Travellers
                    </h3>
                    <p className="text-[13px] text-[#525f71] mt-0.5">
                      Children must be accompanied by at least one adult. Age verified on departure day.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[#00677d] text-[11px] font-bold bg-[#e7eeff] px-3 py-1 rounded-full self-start sm:self-auto">
                    <span className="material-symbols-outlined text-[16px]">group</span>
                    Group Capacity: 8 seats left
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Stepper 1: Adults */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#f8f9fa] border border-[#e2e8f0] hover:bg-[#f0f3ff]/50 transition-colors gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-[#111c2c]">Adults</span>
                        <span className="text-[11px] text-[#525f71] bg-[#e7eeff] px-2 py-0.5 rounded font-semibold">
                          Ages 12+
                        </span>
                      </div>
                      <p className="text-[12px] text-[#525f71]">
                        Standard boutique hotel twin/double occupancy & private touring.
                      </p>
                      <p className="text-[16px] text-[#002727] font-bold pt-0.5">
                        £{adultFullPrice} <span className="text-[12px] text-[#525f71] font-normal">/ adult</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => setAdults((a) => Math.max(1, a - 1))}
                        className="w-10 h-10 rounded-full bg-white border border-[#e2e8f0] hover:bg-[#dee9ff] active:scale-95 text-[#111c2c] flex items-center justify-center font-bold text-lg transition-all shadow-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-[18px] font-bold text-[#111c2c]">
                        {adults}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAdults((a) => Math.min(12, a + 1))}
                        className="w-10 h-10 rounded-full bg-white border border-[#e2e8f0] hover:bg-[#dee9ff] active:scale-95 text-[#111c2c] flex items-center justify-center font-bold text-lg transition-all shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Stepper 2: Children */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#f8f9fa] border border-[#e2e8f0] hover:bg-[#f0f3ff]/50 transition-colors gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-[#111c2c]">Children</span>
                        <span className="text-[11px] text-[#7d5800] bg-[#ffdea9]/40 px-2 py-0.5 rounded font-bold">
                          2–11 years
                        </span>
                      </div>
                      <p className="text-[12px] text-[#525f71]">
                        Reduced tariff; includes Advent concert gift box & bespoke treats.
                      </p>
                      <p className="text-[16px] text-[#002727] font-bold pt-0.5">
                        £{childFullPrice} <span className="text-[12px] text-[#525f71] font-normal">/ child</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => setChildren((c) => Math.max(0, c - 1))}
                        className="w-10 h-10 rounded-full bg-white border border-[#e2e8f0] hover:bg-[#dee9ff] active:scale-95 text-[#111c2c] flex items-center justify-center font-bold text-lg transition-all shadow-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-[18px] font-bold text-[#111c2c]">
                        {children}
                      </span>
                      <button
                        type="button"
                        onClick={() => setChildren((c) => Math.min(8, c + 1))}
                        className="w-10 h-10 rounded-full bg-white border border-[#e2e8f0] hover:bg-[#dee9ff] active:scale-95 text-[#111c2c] flex items-center justify-center font-bold text-lg transition-all shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Stepper 3: Infants */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#f8f9fa] border border-[#e2e8f0] hover:bg-[#f0f3ff]/50 transition-colors gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-[#111c2c]">Infants</span>
                        <span className="text-[11px] text-[#525f71] bg-[#e7eeff] px-2 py-0.5 rounded font-semibold">
                          Under 2 years
                        </span>
                      </div>
                      <p className="text-[12px] text-[#525f71]">
                        Travels complimentary on lap; travel cot reserved at hotel on request.
                      </p>
                      <p className="text-[16px] text-[#1E7E34] font-bold pt-0.5">
                        Complimentary <span className="text-[12px] text-[#525f71] font-normal">(£0)</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => setInfants((inf) => Math.max(0, inf - 1))}
                        className="w-10 h-10 rounded-full bg-white border border-[#e2e8f0] hover:bg-[#dee9ff] active:scale-95 text-[#111c2c] flex items-center justify-center font-bold text-lg transition-all shadow-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-[18px] font-bold text-[#111c2c]">
                        {infants}
                      </span>
                      <button
                        type="button"
                        onClick={() => setInfants((inf) => Math.min(4, inf + 1))}
                        className="w-10 h-10 rounded-full bg-white border border-[#e2e8f0] hover:bg-[#dee9ff] active:scale-95 text-[#111c2c] flex items-center justify-center font-bold text-lg transition-all shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part C: Section 2 - Payment Scheme Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e2e8f0] space-y-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00677d]/10 text-[#00677d] text-[12px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <h3 className="text-[18px] font-bold text-[#111c2c]">Choose Payment Scheme</h3>
                  </div>
                  <p className="text-[13px] text-[#525f71] mt-0.5">
                    Select your settlement schedule. All schemes are 0% APR interest-free, protected under UK ATOL Bond #9822.
                  </p>
                </div>

                {/* Option A: Full Payment Today */}
                <div
                  onClick={() => setScheme('full')}
                  className={`rounded-2xl p-5 cursor-pointer transition-all border-2 ${
                    scheme === 'full'
                      ? 'bg-[#00677d]/5 border-[#00677d] shadow-md ring-2 ring-[#00677d]/20'
                      : 'bg-[#f8f9fa] border-[#e2e8f0] hover:bg-[#f0f3ff]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            scheme === 'full' ? 'bg-[#002727] text-white' : 'bg-[#e2e8f0] text-transparent'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[13px]">check</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-[16px] font-bold text-[#111c2c]">
                            Option A: Full Payment Today
                          </h4>
                          <span className="bg-[#002727] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Most Convenient · Instant ATOL Voucher
                          </span>
                        </div>
                        <p className="text-[13px] text-[#525f71] leading-relaxed">
                          Settle your entire party balance now. Immediate definitive booking confirmation, zero remaining balance worries.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-1.5 text-[12px]">
                          <span className="flex items-center gap-1.5 text-[#111c2c]">
                            <span className="w-2 h-2 rounded-full bg-[#00677d]"></span>
                            Adult: <strong className="text-[#00677d]">£{adultFullPrice}</strong> / person
                          </span>
                          <span className="flex items-center gap-1.5 text-[#111c2c]">
                            <span className="w-2 h-2 rounded-full bg-[#00677d]"></span>
                            Kids (2–11 yrs): <strong className="text-[#00677d]">£{childFullPrice}</strong> / child
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#525f71] font-bold block">
                        Payable Today
                      </span>
                      <span className="text-[24px] font-bold text-[#002727] block">
                        £{grandTotal.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-[#1E7E34] font-semibold">
                        Balance due: £0
                      </span>
                    </div>
                  </div>
                </div>

                {/* Option B: 1st Part Payment (Deposit Today) */}
                <div
                  onClick={() => setScheme('split')}
                  className={`rounded-2xl p-5 cursor-pointer transition-all border-2 ${
                    scheme === 'split'
                      ? 'bg-[#00677d]/5 border-[#00677d] shadow-md ring-2 ring-[#00677d]/20'
                      : 'bg-[#f8f9fa] border-[#e2e8f0] hover:bg-[#f0f3ff]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            scheme === 'split' ? 'bg-[#002727] text-white' : 'bg-[#e2e8f0] text-transparent'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[13px]">check</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-[16px] font-bold text-[#111c2c]">
                            Option B: 1st Part Payment (Deposit Today)
                          </h4>
                          <span className="bg-[#ffdea9] text-[#271900] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Flexible Split Scheme · 0% APR
                          </span>
                        </div>
                        <p className="text-[13px] text-[#525f71] leading-relaxed">
                          Lock in current early-winter room rates and boutique allocation with just a deposit. The rest is due closer to travel.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-1.5 text-[12px]">
                          <span className="flex items-center gap-1.5 text-[#111c2c]">
                            <span className="w-2 h-2 rounded-full bg-[#c59b27]"></span>
                            Adult Deposit: <strong className="text-[#111c2c]">£{adultDeposit}</strong> / person
                          </span>
                          <span className="flex items-center gap-1.5 text-[#111c2c]">
                            <span className="w-2 h-2 rounded-full bg-[#c59b27]"></span>
                            Kids Deposit: <strong className="text-[#111c2c]">£{childDeposit}</strong> / child
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#525f71] font-bold block">
                        Payable Today
                      </span>
                      <span className="text-[24px] font-bold text-[#111c2c] block">
                        £{totalDeposit.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-[#525f71] font-semibold">
                        Remainder: £{totalBalanceDue.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Installment Timeline details for Option B */}
                  {scheme === 'split' && (
                    <div className="mt-4 pt-4 border-t border-[#e2e8f0]/80">
                      <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#111c2c]">
                            Installment Timeline
                          </span>
                          <span className="text-[11px] text-[#00677d] font-semibold">
                            Automated balance reminder
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 bg-[#f0f3ff] rounded-xl border border-[#e2e8f0]">
                            <span className="text-[10px] uppercase tracking-wider text-[#525f71] font-bold block">
                              1st Part Payment (Today)
                            </span>
                            <span className="text-[18px] font-bold text-[#002727]">
                              £{totalDeposit.toLocaleString()}.00
                            </span>
                            <p className="text-[11px] text-[#525f71] mt-0.5">
                              Instant booking confirmation & ATOL certificate.
                            </p>
                          </div>
                          <div className="p-3 bg-[#f0f3ff] rounded-xl border border-[#e2e8f0]">
                            <span className="text-[10px] uppercase tracking-wider text-[#525f71] font-bold block">
                              2nd & Final Payment (21 Oct 2025)
                            </span>
                            <span className="text-[18px] font-bold text-[#111c2c]">
                              £{totalBalanceDue.toLocaleString()}.00
                            </span>
                            <p className="text-[11px] text-[#525f71] mt-0.5">
                              Due 45 days before departure (£250/adult, £225/child).
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Protection Guarantee callout */}
                <div className="p-4 rounded-xl bg-[#f0f3ff]/70 border border-[#e2e8f0] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#00677d] text-[12px] font-bold">
                    <span className="material-symbols-outlined text-[18px]">info</span>
                    <span>Payment Protection Guarantee</span>
                  </div>
                  <p className="text-[12px] text-[#525f71] leading-relaxed">
                    Whether settling in full or splitting across instalments, your funds are held in secure ring-fenced British trust accounts. Full invoices and ATOL confirmation vouchers are generated immediately upon initial transaction completion.
                  </p>
                </div>
              </div>

              {/* Part D: Special Requests & Guest Notes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e2e8f0] space-y-4">
                <div>
                  <h3 className="text-[18px] font-bold text-[#111c2c] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#00677d]">room_service</span>
                    Special Requests & Dietary Requirements
                  </h3>
                  <p className="text-[13px] text-[#525f71] mt-0.5">
                    Twin bed configurations, Advent concert accessibility, festive banquet allergies, or celebration surprises.
                  </p>
                </div>

                <div>
                  <textarea
                    rows={3}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="E.g., We require 1 double bed and 1 single rollaway bed. One guest is vegetarian for the Christmas Eve banquet."
                    className="w-full rounded-xl bg-[#f8f9fa] border border-[#e2e8f0] p-4 text-[13px] text-[#111c2c] placeholder:text-[#6d797e] focus:outline-none focus:ring-2 focus:ring-[#00677d] transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAppendTag('Twin Bed Preference')}
                    className="px-3 py-1 rounded-full bg-[#f0f3ff] hover:bg-[#dee9ff] text-[12px] text-[#525f71] transition-colors"
                  >
                    + Twin Beds
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAppendTag('Vegetarian / Halal Meals')}
                    className="px-3 py-1 rounded-full bg-[#f0f3ff] hover:bg-[#dee9ff] text-[12px] text-[#525f71] transition-colors"
                  >
                    + Vegetarian / Halal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAppendTag('Airport Transfer Child Booster Seat')}
                    className="px-3 py-1 rounded-full bg-[#f0f3ff] hover:bg-[#dee9ff] text-[12px] text-[#525f71] transition-colors"
                  >
                    + Booster / Child Car Seat
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAppendTag('Anniversary / Birthday Surprise')}
                    className="px-3 py-1 rounded-full bg-[#f0f3ff] hover:bg-[#dee9ff] text-[12px] text-[#525f71] transition-colors"
                  >
                    + Special Occasion
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column (4 Cols): Sticky Summary Panel */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#e2e8f0] space-y-5">
                {/* Summary Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider text-[#00677d] font-bold">
                      Investment Ledger
                    </span>
                    <h3 className="font-display text-[22px] font-bold text-[#111c2c]">
                      Booking Summary
                    </h3>
                  </div>
                  <span className="material-symbols-outlined text-[26px] text-[#00677d]">receipt_long</span>
                </div>

                {/* Confirmed Tour Schedule Card */}
                <div className="bg-[#f0f3ff] p-3.5 rounded-xl border border-[#e2e8f0] space-y-1">
                  <span className="text-[10px] text-[#525f71] uppercase font-bold">
                    Confirmed Tour Schedule
                  </span>
                  <p className="text-[14px] font-bold text-[#111c2c]">
                    {initialConfig.departureDate || 'Fri 05 Dec – Mon 08 Dec 2025'}
                  </p>
                  <p className="text-[12px] text-[#525f71]">
                    {tour.duration} · {tour.hotel.split('(')[0]}
                  </p>
                </div>

                {/* Party Breakdown List */}
                <div className="space-y-2 text-[13px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#111c2c]">
                      <span className="font-bold">{adults}</span> Adults{' '}
                      <span className="text-[#525f71] text-[11px]">(£{adultFullPrice} each)</span>
                    </span>
                    <span className="font-bold text-[#111c2c]">
                      £{adultTotal.toLocaleString()}.00
                    </span>
                  </div>

                  {children > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#111c2c]">
                        <span className="font-bold">{children}</span> Child (2–11 yrs){' '}
                        <span className="text-[#525f71] text-[11px]">(£{childFullPrice} each)</span>
                      </span>
                      <span className="font-bold text-[#111c2c]">
                        £{childTotal.toLocaleString()}.00
                      </span>
                    </div>
                  )}

                  {infants > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#111c2c]">
                        <span className="font-bold">{infants}</span> Infants (&lt;2 yrs)
                      </span>
                      <span className="font-bold text-[#1E7E34]">£0.00</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-[#525f71]">Taxes, Surcharges & ATOL Levy</span>
                    <span className="font-semibold text-[#1E7E34]">Included (£0.00)</span>
                  </div>
                </div>

                {/* Guaranteed Package Inclusions Checklist Box */}
                <div className="bg-[#f0f3ff]/70 p-3.5 rounded-xl border border-[#e2e8f0] space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#525f71] font-bold block mb-1">
                    Guaranteed Package Inclusions:
                  </span>
                  <div className="flex items-start gap-2 text-[12px] text-[#404848]">
                    <span className="material-symbols-outlined text-[15px] text-[#1E7E34] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>4★ Grand Hotel Bohemia (3 Nights accommodation)</span>
                  </div>
                  <div className="flex items-start gap-2 text-[12px] text-[#404848]">
                    <span className="material-symbols-outlined text-[15px] text-[#1E7E34] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>Executive Mercedes Airport Transfers (Václav Havel)</span>
                  </div>
                  <div className="flex items-start gap-2 text-[12px] text-[#404848]">
                    <span className="material-symbols-outlined text-[15px] text-[#1E7E34] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>Advent Classical Concert in Mirror Chapel</span>
                  </div>
                  <div className="flex items-start gap-2 text-[12px] text-[#404848]">
                    <span className="material-symbols-outlined text-[15px] text-[#1E7E34] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>Daily Champagne Breakfast & Old Town Tour</span>
                  </div>
                </div>

                {/* Total Investment & Payable Today Container */}
                <div className="space-y-2 pt-1 border-t border-[#e2e8f0]">
                  <div className="flex items-center justify-between text-[14px] text-[#525f71]">
                    <span>Total Holiday Investment</span>
                    <span className="text-[17px] font-bold text-[#111c2c]">
                      £{grandTotal.toLocaleString()}.00
                    </span>
                  </div>

                  {/* High-Contrast Due Today Container */}
                  <div className="p-4 rounded-xl bg-[#002727] text-white space-y-1 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] tracking-wider uppercase opacity-90 font-bold">
                        {scheme === 'full'
                          ? 'Payable Today (Option A)'
                          : 'Payable Today (Option B)'}
                      </span>
                      <span className="material-symbols-outlined text-[18px] opacity-90">lock</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[28px] font-bold">
                        £{payableToday.toLocaleString()}.00
                      </span>
                      <span className="text-[11px] text-[#ffdea9] font-semibold">
                        {scheme === 'full'
                          ? 'Remaining: £0.00'
                          : `Remaining: £${remainingBalance.toLocaleString()}.00`}
                      </span>
                    </div>
                  </div>

                  {/* Alternative Hint Note */}
                  <p className="text-[11px] text-[#525f71] text-center pt-1">
                    {scheme === 'full' ? (
                      <>
                        Prefer to split? Select{' '}
                        <button
                          type="button"
                          onClick={() => setScheme('split')}
                          className="font-bold text-[#00677d] underline"
                        >
                          Option B
                        </button>{' '}
                        to pay only <strong>£{totalDeposit.toLocaleString()}.00</strong> today.
                      </>
                    ) : (
                      <>
                        Opt for full settlement? Select{' '}
                        <button
                          type="button"
                          onClick={() => setScheme('full')}
                          className="font-bold text-[#00677d] underline"
                        >
                          Option A
                        </button>{' '}
                        to clear the balance (£{grandTotal.toLocaleString()}.00).
                      </>
                    )}
                  </p>
                </div>

                {/* Continue CTA Button */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleContinue}
                    className="w-full flex items-center justify-center gap-2 bg-[#c59b27] hover:bg-[#AC8419] text-white text-[15px] font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98"
                  >
                    <span>Continue to Guest Details</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                  <p className="text-center text-[11px] text-[#525f71]">
                    No payment taken at this stage · Free cancellation within 48h
                  </p>
                </div>

                {/* Trust Guarantee Icons */}
                <div className="bg-[#f0f3ff] p-2.5 rounded-lg flex items-center justify-center gap-4 text-[#525f71] text-[11px]">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#00677d]">lock</span>
                    <span>256-Bit Encrypted</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#00677d]">support_agent</span>
                    <span>24/7 UK Concierge</span>
                  </div>
                </div>
              </div>

              {/* Direct Concierge Help Widget */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e2e8f0] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00677d]/10 text-[#00677d] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#525f71] uppercase font-bold block">
                    Need telephone assistance?
                  </span>
                  <a
                    href="tel:08004567890"
                    className="text-[14px] font-bold text-[#111c2c] hover:text-[#00677d]"
                  >
                    0800 456 7890
                  </a>
                  <span className="text-[11px] text-[#525f71] block">
                    Freephone · UK Specialist Team
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
