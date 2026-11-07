import React, { useState } from 'react';

interface BookingConfirmedScreenProps {
  booking: any;
  onNavigate: (view: string, payload?: any) => void;
  onOpenConcierge: () => void;
  onOpenVoucherModal: (booking: any) => void;
}

export const BookingConfirmedScreen: React.FC<BookingConfirmedScreenProps> = ({
  booking,
  onNavigate,
  onOpenConcierge,
  onOpenVoucherModal,
}) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const referenceCode = booking?.reference || 'JILIT-849204';
  const atolCert = booking?.atolCertificate || 'ATOL-9822-49102';
  const bookingDate = booking?.bookingDate || '04 October 2025';

  const copyReference = () => {
    navigator.clipboard.writeText(referenceCode);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  };

  const handleTriggerDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      onOpenVoucherModal(booking);
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col bg-[#f9f9ff] pt-20">
      {/* Interactive Toast Notification (Matching Image_2) */}
      <div
        className={`fixed top-24 right-8 z-50 flex items-center gap-2 px-4 py-2.5 bg-[#263142] text-white rounded-xl shadow-2xl transition-all duration-300 ${
          toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-[18px] text-[#beebe9]">check_circle</span>
        <span className="text-[12px] font-bold">Booking reference copied to clipboard: {referenceCode}</span>
      </div>

      {/* Booking Journey Progress Stepper (Matching Image_1 & Image_2) */}
      <section className="w-full bg-[#f0f3ff]/70 py-4 border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-[#525f71] mb-4">
            <button onClick={() => onNavigate('home')} className="hover:text-[#002727]">Home</button>
            <span className="text-[#bcc9ce]">›</span>
            <button onClick={() => onNavigate('holidays')} className="hover:text-[#002727]">Holidays</button>
            <span className="text-[#bcc9ce]">›</span>
            <button onClick={() => onNavigate('holiday-detail', { tourId: 'prague-christmas' })} className="hover:text-[#002727]">
              Prague Christmas Tour
            </button>
            <span className="text-[#bcc9ce]">›</span>
            <span className="text-[#111c2c] font-bold">Booking Confirmation</span>
          </nav>

          {/* 4 Steps */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 items-center">
            {/* Step 1 */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#002727] text-white flex items-center justify-center text-[13px] shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div className="hidden sm:block min-w-0">
                <span className="block text-[10px] text-[#525f71] uppercase tracking-wider font-bold">Step 1</span>
                <span className="block text-[12px] text-[#111c2c] font-semibold truncate">Travellers & Scheme</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#002727] text-white flex items-center justify-center text-[13px] shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div className="hidden sm:block min-w-0">
                <span className="block text-[10px] text-[#525f71] uppercase tracking-wider font-bold">Step 2</span>
                <span className="block text-[12px] text-[#111c2c] font-semibold truncate">Guest Details</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#002727] text-white flex items-center justify-center text-[13px] shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div className="hidden sm:block min-w-0">
                <span className="block text-[10px] text-[#525f71] uppercase tracking-wider font-bold">Step 3</span>
                <span className="block text-[12px] text-[#111c2c] font-semibold truncate">Secure Settlement</span>
              </div>
            </div>

            {/* Step 4 (Active Confirmed) */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1E7E34] text-white flex items-center justify-center text-[13px] shadow-sm shrink-0 ring-4 ring-[#EBF8EE]">
                <span className="material-symbols-outlined text-[16px]">task_alt</span>
              </div>
              <div className="hidden sm:block min-w-0">
                <span className="block text-[10px] text-[#1E7E34] uppercase tracking-wider font-bold">Step 4 — Complete</span>
                <span className="block text-[12px] text-[#111c2c] font-bold truncate">Booking Confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Success State & Booking Reference Header */}
      <section className="w-full bg-white shadow-sm py-10 border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Success Message */}
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF8EE] text-[#1E7E34] text-[11px] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#1E7E34] animate-pulse"></span>
                TRANSACTION AUTHORISED & FLIGHT-INCLUSIVE ATOL BONDED
              </div>
              <h1 className="font-display text-[32px] md:text-[40px] text-[#002727] font-bold tracking-tight">
                Booking Confirmed! Your Prague Escape Awaits
              </h1>
              <p className="text-[14px] text-[#404848] leading-relaxed">
                We have dispatched your comprehensive travel documentation, booking itinerary, and official ATOL certificate to{' '}
                <span className="font-semibold text-[#111c2c]">
                  {booking?.party?.leadPassenger?.email || 'james.holloway@example.co.uk'}
                </span>.
              </p>
            </div>

            {/* Quick Primary Actions */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={handleTriggerDownload}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#473500] hover:bg-[#AC8419] text-white text-[13px] font-bold shadow-md transition-all active:scale-95"
              >
                {downloading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    <span>Preparing PDF...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>Download ATOL Voucher</span>
                  </>
                )}
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e7eeff] hover:bg-[#dee9ff] text-[#111c2c] text-[13px] font-bold transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>Print Receipt</span>
              </button>

              <button
                onClick={() => alert('ATOL Pass added to your Apple Wallet / Google Wallet!')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#525f71] hover:text-[#111c2c] text-[12px] font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">wallet</span>
                <span>Add to Wallet</span>
              </button>
            </div>
          </div>

          {/* Key Booking Reference Highlight Bar */}
          <div className="mt-8 p-4 bg-[#f0f3ff] rounded-2xl border border-[#e2e8f0] flex flex-wrap items-center justify-between gap-4">
            {/* Reference Pill */}
            <div>
              <span className="block text-[10px] text-[#525f71] uppercase tracking-wider font-bold">
                Booking Reference
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[20px] font-bold text-[#002727] tracking-wider">
                  {referenceCode}
                </span>
                <button
                  onClick={copyReference}
                  title="Copy reference code"
                  className="p-1 rounded-md hover:bg-white text-[#525f71] hover:text-[#002727] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
            </div>

            {/* ATOL Certificate */}
            <div>
              <span className="block text-[10px] text-[#525f71] uppercase tracking-wider font-bold">
                ATOL Protection Certificate
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="material-symbols-outlined text-[18px] text-[#473500]">verified</span>
                <span className="text-[14px] font-bold text-[#111c2c] font-mono">{atolCert}</span>
              </div>
            </div>

            {/* Issue Date */}
            <div>
              <span className="block text-[10px] text-[#525f71] uppercase tracking-wider font-bold">
                Booking Date
              </span>
              <span className="text-[14px] font-bold text-[#111c2c] mt-0.5 block">
                {bookingDate}
              </span>
            </div>

            {/* Status Badge */}
            <div>
              <span className="block text-[10px] text-[#525f71] uppercase tracking-wider font-bold">
                Status
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF8EE] text-[#1E7E34] text-[11px] font-bold mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#1E7E34]"></span>
                CONFIRMED & BONDED
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section: Two-Column Master Layout (65% / 35%) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Tour card, Manifest, Financial Ledger, Milestones */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Tour & Accommodation Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-6 lg:p-7 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#e2e8f0]">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#002727] font-bold">
                    Holiday Itinerary & Stays
                  </span>
                  <h2 className="font-display text-[22px] font-bold text-[#111c2c]">
                    Prague Christmas Tour — Festive Season 2025
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#dee9ff] text-[#111c2c] text-[11px] font-semibold shrink-0">
                  <span className="material-symbols-outlined text-[15px] text-[#002727]">schedule</span>
                  4 Days / 3 Nights
                </span>
              </div>

              {/* Media + Details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-5 h-44 rounded-xl overflow-hidden relative shadow-sm">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbW57fhvFl2UoTwR6Z4SXdVgy2Q0Y-DsBsMeMTPINm615w5QWtOYbAps96UU3SvNojcPT3vzIVyNP20zuSaeomSYnXJ7Aqy15rppqQlELa6yrp4DCVywtpZ83tlW8XsZKud0spfq1TpMFGUqnfXH2DBrQtiOudDN3SWu9HpO2DDiXF7jX-my0QWINylh1QhSTFqRzCCsCKVASR693MsuqVnbVjPziy2Q6vNK_aRT1pQBpUKNyWDsDlbA"
                    alt="Old Town Square Prague"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#263142]/80 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-[11px] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">photo_camera</span>
                    Old Town Square, Prague
                  </div>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#002727] mt-0.5">event</span>
                    <div>
                      <span className="text-[10px] text-[#525f71] uppercase tracking-wider block font-bold">
                        Travel Window
                      </span>
                      <span className="text-[14px] font-semibold text-[#111c2c]">
                        {booking?.travelWindow || 'Friday 05 Dec – Monday 08 Dec 2025'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#002727] mt-0.5">hotel</span>
                    <div>
                      <span className="text-[10px] text-[#525f71] uppercase tracking-wider block font-bold">
                        Confirmed Lodging
                      </span>
                      <span className="text-[14px] font-bold text-[#111c2c]">
                        Grand Hotel Bohemia (4★ Superior Heritage)
                      </span>
                      <p className="text-[12px] text-[#404848]">
                        Králodvorská 4, Prague 1 Old Town — 1x Executive Heritage Family Suite
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#002727] mt-0.5">airport_shuttle</span>
                    <div>
                      <span className="text-[10px] text-[#525f71] uppercase tracking-wider block font-bold">
                        Chauffeur Service Included
                      </span>
                      <span className="text-[12px] text-[#111c2c]">
                        Václav Havel Airport (PRG) ↔ Grand Hotel Bohemia (Private Mercedes V-Class)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guaranteed Inclusions Recap */}
              <div className="bg-[#f0f3ff]/60 rounded-xl p-4 space-y-2 border border-[#e2e8f0]">
                <h3 className="text-[12px] font-bold text-[#002727] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  Guaranteed Package Inclusions Recap
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[12px] text-[#111c2c]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#1E7E34]">check_circle</span>
                    <span>Grand Hotel Bohemia daily artisan hot & cold breakfast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#1E7E34]">check_circle</span>
                    <span>Exclusive historic neo-Baroque Boccaccio Hall access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#1E7E34]">check_circle</span>
                    <span>Reserved front-nave seats: St. Nicholas Advent Concert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#1E7E34]">check_circle</span>
                    <span>British tour host & English historian Old Town walking tour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Manifest of Travellers (3 Guests) Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-6 lg:p-7 space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
                <h2 className="text-[18px] font-bold text-[#111c2c] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#002727]">groups</span>
                  Manifest of Travellers (3 Guests)
                </h2>
                <span className="text-[10px] text-[#525f71] uppercase tracking-wider font-bold">Party Roster</span>
              </div>

              {/* Guest Manifest Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Lead */}
                <div className="p-3.5 rounded-xl bg-[#f0f3ff] border border-[#e2e8f0] space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded bg-[#002727] text-white text-[9px] font-bold uppercase tracking-wider">
                    Lead Passenger
                  </span>
                  <p className="text-[14px] font-bold text-[#111c2c]">Mr. James Holloway</p>
                  <p className="text-[12px] text-[#525f71]">Adult • +44 7700 900142</p>
                </div>

                {/* Passenger 2 */}
                <div className="p-3.5 rounded-xl bg-[#f0f3ff] border border-[#e2e8f0] space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded bg-[#e7eeff] text-[#111c2c] text-[9px] font-bold uppercase tracking-wider">
                    Passenger 2
                  </span>
                  <p className="text-[14px] font-bold text-[#111c2c]">Mrs. Eleanor Holloway</p>
                  <p className="text-[12px] text-[#525f71]">Adult • eleanor.h@example.co.uk</p>
                </div>

                {/* Passenger 3 */}
                <div className="p-3.5 rounded-xl bg-[#f0f3ff] border border-[#e2e8f0] space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded bg-[#d3e1f6] text-[#0f1c2c] text-[9px] font-bold uppercase tracking-wider">
                    Passenger 3 (Child)
                  </span>
                  <p className="text-[14px] font-bold text-[#111c2c]">Master Thomas Holloway</p>
                  <p className="text-[12px] text-[#525f71]">Child (Age 8) • UK Citizen</p>
                </div>
              </div>

              {/* Special Requests Confirmation */}
              <div className="p-4 rounded-xl bg-[#FDF9EE] border border-[#ffdea9]/70 space-y-1">
                <div className="flex items-center gap-1.5 text-[#c59b27] text-[12px] font-bold">
                  <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                  Confirmed Special Requests & Room Allocations
                </div>
                <p className="text-[12px] text-[#404848] leading-relaxed">
                  {booking?.specialRequests ||
                    '1 Double Bed + 1 Premium Rollaway Bed confirmed in Family Suite. 1 Vegetarian menu profile noted for Prague Castle festive banquet. 1x Group-2 booster seat allocated for executive Mercedes airport chauffeur transfers.'}
                </p>
              </div>
            </div>

            {/* 3. Financial & Settlement Ledger Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-6 lg:p-7 space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
                <h2 className="text-[18px] font-bold text-[#111c2c] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#002727]">receipt_long</span>
                  Financial & Settlement Ledger
                </h2>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EBF8EE] text-[#1E7E34] text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[13px]">check</span>
                  PAID IN FULL — ATOL PROTECTED
                </span>
              </div>

              {/* Ledger Table */}
              <div className="bg-[#f0f3ff] rounded-xl p-4 space-y-2 border border-[#e2e8f0]">
                <div className="flex items-center justify-between pb-1 text-[11px] text-[#525f71] uppercase tracking-wider font-bold">
                  <span>Item Description</span>
                  <span>Settled Amount</span>
                </div>

                <div className="space-y-1.5 text-[13px] text-[#111c2c]">
                  <div className="flex justify-between items-center py-1 border-b border-[#e2e8f0]/60">
                    <div>
                      <span className="font-semibold">Adult Package Rate (x2 Guests)</span>
                      <span className="block text-[#525f71] text-[11px]">
                        £700.00 per adult • 4★ Hotel, Concert & Chauffeur
                      </span>
                    </div>
                    <span className="font-bold">£1,400.00</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-[#e2e8f0]/60">
                    <div>
                      <span className="font-semibold">Child Rate (x1 Guest, Age 8)</span>
                      <span className="block text-[#525f71] text-[11px]">Family concession tier (2-11 yrs)</span>
                    </div>
                    <span className="font-bold">£675.00</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-[#e2e8f0]/60">
                    <span className="text-[#525f71]">UK Airport Passenger Duty & Handling Levies</span>
                    <span className="text-[#1E7E34] font-bold">£0.00 (Inclusive)</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#525f71]">Civil Aviation Authority ATOL Protection Contribution (APC)</span>
                    <span className="text-[#1E7E34] font-bold">£0.00 (Inclusive)</span>
                  </div>
                </div>

                {/* Ledger Total Highlight */}
                <div className="pt-3 mt-3 bg-white p-4 rounded-xl border border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="block text-[10px] text-[#525f71] uppercase tracking-wider font-bold">
                      Payment Scheme Applied
                    </span>
                    <span className="text-[14px] font-bold text-[#111c2c]">
                      Option A — Full Advance Settlement
                    </span>
                    <span className="block text-[11px] text-[#525f71]">
                      Card: Visa ending 4092 • Auth code: #AUTH-78329
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-[#525f71] uppercase tracking-wider font-bold">
                      Total Paid Today
                    </span>
                    <span className="text-[28px] text-[#002727] font-bold leading-none">
                      £2,075.00
                    </span>
                    <span className="block text-[11px] text-[#1E7E34] font-semibold mt-1">
                      Remaining Balance: £0.00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Pre-Departure Checklist & Milestones */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-6 lg:p-7 space-y-5">
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#002727] uppercase tracking-wider font-bold">
                  What Happens Now?
                </span>
                <h2 className="font-display text-[22px] font-bold text-[#111c2c]">
                  Important Pre-Departure Journey Milestones
                </h2>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dee9ff]">
                {/* Milestone 1 */}
                <div className="relative">
                  <span className="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-[#002727] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#002727] font-bold uppercase tracking-wider">
                      Immediate Action
                    </span>
                    <h3 className="text-[15px] font-bold text-[#111c2c]">
                      Verify Passport Validity for Schengen Entry
                    </h3>
                    <p className="text-[12px] text-[#404848] leading-relaxed">
                      UK passport holders traveling to the Czech Republic must hold a passport issued less than 10 years before departure date and valid for at least 3 months after intended return (08 March 2026).
                    </p>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div className="relative">
                  <span className="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-[#d8e3f9] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#525f71]"></span>
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#525f71] font-bold uppercase tracking-wider">
                      30 Days Prior (05 November 2025)
                    </span>
                    <h3 className="text-[15px] font-bold text-[#111c2c]">
                      Detailed Tour Compendium & Concert Program
                    </h3>
                    <p className="text-[12px] text-[#404848] leading-relaxed">
                      We will dispatch the finalized minute-by-minute itinerary, private chauffeur dispatch contact details, dress code advisory for St. Nicholas Hall, and restaurant reservation vouchers.
                    </p>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div className="relative">
                  <span className="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-[#d8e3f9] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#525f71]"></span>
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#525f71] font-bold uppercase tracking-wider">
                      7 Days Prior (28 November 2025)
                    </span>
                    <h3 className="text-[15px] font-bold text-[#111c2c]">
                      Digital Boarding Passes & Dedicated Concierge WhatsApp
                    </h3>
                    <p className="text-[12px] text-[#404848] leading-relaxed">
                      Access live airport driver tracking and direct WhatsApp concierge dispatch line for instantaneous in-resort assistance throughout your stay in Prague.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Self-service, UK Concierge, Regulated seal, Weather */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* 1. Self-Service Portal Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#525f71] uppercase tracking-wider font-bold">
                  Self-Service Portal
                </span>
                <h3 className="font-display text-[20px] font-bold text-[#111c2c]">
                  Manage Your Escape
                </h3>
                <p className="text-[12px] text-[#404848]">
                  Review room preferences, upload passenger passport numbers, or make itinerary adjustments anytime.
                </p>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => onNavigate('my-bookings')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#002727] hover:bg-[#0f3e3d] text-white text-[13px] font-bold transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                  Manage This Booking
                </button>

                <button
                  onClick={() => onNavigate('my-bookings')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#111c2c] text-[13px] font-bold transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                  View in My Bookings
                </button>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => onNavigate('holidays')}
                    className="text-[12px] text-[#525f71] hover:text-[#002727] transition-colors inline-flex items-center gap-1 font-semibold"
                  >
                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                    Return to Holiday Directory
                  </button>
                </div>
              </div>
            </div>

            {/* 2. UK Dedicated Concierge Desk Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#002727]/10 flex items-center justify-center text-[#002727] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div>
                  <h3 className="font-display text-[18px] font-bold text-[#111c2c]">
                    UK Concierge Desk
                  </h3>
                  <p className="text-[12px] text-[#525f71]">Personal booking assistance</p>
                </div>
              </div>

              <p className="text-[12px] text-[#404848] leading-relaxed">
                Have questions regarding dietary requests, airport pickup timing, or Prague excursions? Your dedicated UK travel consultant is ready to assist.
              </p>

              <div className="space-y-3 bg-[#f0f3ff] p-4 rounded-xl text-[12px] text-[#111c2c] border border-[#e2e8f0]">
                {/* Freephone */}
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#002727] mt-0.5">call</span>
                  <div>
                    <a href="tel:08004567890" className="font-bold block hover:underline">0800 456 7890</a>
                    <span className="text-[11px] text-[#525f71]">Freephone UK • Mon–Sat 8am–7pm GMT</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#002727] mt-0.5">mail</span>
                  <div>
                    <a href="mailto:bookings@jilitholidays.co.uk" className="font-bold hover:underline">
                      bookings@jilitholidays.co.uk
                    </a>
                    <span className="text-[11px] text-[#525f71] block">Average response: &lt; 2 hours</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#002727] mt-0.5">location_on</span>
                  <div>
                    <span className="font-bold block">Pall Mall Private Suite</span>
                    <span className="text-[11px] text-[#525f71]">120 Pall Mall, St. James's, London SW1Y 5ED</span>
                  </div>
                </div>

                {/* 24/7 Helpline */}
                <div className="pt-2 border-t border-[#e2e8f0] flex items-center gap-2 text-[#1E7E34]">
                  <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
                  <span className="text-[11px] font-bold">24/7 In-Resort Emergency Helpline active on departure day.</span>
                </div>
              </div>

              <button
                onClick={onOpenConcierge}
                className="w-full py-2.5 rounded-xl bg-[#dee9ff] hover:bg-[#d8e3f9] text-[#002727] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                <span>Chat with AI Travel Consultant (High Thinking)</span>
              </button>
            </div>

            {/* 3. Protected & Regulated Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#473500]">verified</span>
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#111c2c]">
                  Protected & Regulated
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#f0f3ff] text-center border border-[#e2e8f0] space-y-0.5">
                  <span className="text-[10px] text-[#525f71] block font-bold">ATOL BOND</span>
                  <span className="text-[18px] font-bold text-[#002727] block">#9822</span>
                  <span className="text-[10px] text-[#525f71] block">CAA UK Protection</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f0f3ff] text-center border border-[#e2e8f0] space-y-0.5">
                  <span className="text-[10px] text-[#525f71] block font-bold">ABTA BONDED</span>
                  <span className="text-[18px] font-bold text-[#002727] block">#Y6841</span>
                  <span className="text-[10px] text-[#525f71] block">Standard of Excellence</span>
                </div>
              </div>

              <p className="text-[11px] text-[#404848] leading-relaxed">
                All client monies are held securely within independent, ring-fenced UK trust account structures. Your booking is 100% financially insured under the Package Travel and Linked Travel Arrangements Regulations 2018.
              </p>
            </div>

            {/* 4. Mini Destination Weather Widget */}
            <div className="bg-[#f0f3ff] rounded-2xl p-4 space-y-2 border border-[#e2e8f0]">
              <div className="flex items-center justify-between text-[11px]">
                <span className="uppercase font-bold text-[#525f71]">Prague Weather Forecast</span>
                <span className="text-[#002727] font-semibold">December Seasonal</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[28px] text-[#525f71]">ac_unit</span>
                  <div>
                    <span className="text-[17px] font-bold text-[#111c2c]">2°C / -3°C</span>
                    <span className="block text-[11px] text-[#525f71]">Crisp • Light evening snow</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#e2e8f0] text-[#111c2c] text-[11px] font-semibold">
                  Warm layers advised
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
