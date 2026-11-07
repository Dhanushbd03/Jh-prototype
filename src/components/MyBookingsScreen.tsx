import React, { useState, useEffect } from 'react';

interface MyBookingsScreenProps {
  onNavigate: (view: string, payload?: any) => void;
  onOpenConcierge: () => void;
  onOpenVoucherModal: (booking: any) => void;
  onSelectBooking: (booking: any) => void;
}

export const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({
  onNavigate,
  onOpenConcierge,
  onOpenVoucherModal,
  onSelectBooking,
}) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Failed to load bookings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCopy = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 2500);
  };

  const filteredBookings = bookings.filter((b) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      b.reference?.toLowerCase().includes(q) ||
      b.tourTitle?.toLowerCase().includes(q) ||
      b.atolCertificate?.toLowerCase().includes(q) ||
      b.party?.leadPassenger?.firstName?.toLowerCase().includes(q) ||
      b.party?.leadPassenger?.lastName?.toLowerCase().includes(q) ||
      b.party?.leadPassenger?.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full flex flex-col bg-[#f9f9ff] pt-20">
      {/* Header Banner */}
      <section className="bg-[#002727] text-white py-14 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffba27]/20 border border-[#ffba27]/30 text-[#ffba27] text-[11px] font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              Client Portal & ATOL Bonded Records
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Manage Your JILIT Holiday Bookings
            </h1>
            <p className="text-[13px] text-[#beebe9]/80 mt-1 max-w-xl">
              Access your official Civil Aviation Authority ATOL vouchers, view itinerary milestones, update special requests, or speak with your dedicated London concierge.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[12px] font-bold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              <span>Refresh Records</span>
            </button>
            <button
              onClick={onOpenConcierge}
              className="px-4 py-2.5 rounded-xl bg-[#ffba27] hover:bg-[#e6a316] text-[#002727] text-[12px] font-bold flex items-center gap-1.5 transition-colors shadow-md"
            >
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              <span>Client Concierge</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full flex-1">
        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#525f71] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Reference (e.g. JILIT-849204), Passenger Name, or Tour..."
              className="w-full pl-11 pr-4 py-2.5 bg-[#f9f9ff] border border-[#bcc9ce]/60 rounded-xl text-[13px] text-[#191c1e] placeholder-[#525f71] focus:outline-none focus:ring-2 focus:ring-[#002727]/20"
            />
          </div>
          <div className="text-[12px] text-[#525f71] font-semibold whitespace-nowrap">
            Showing {filteredBookings.length} Active {filteredBookings.length === 1 ? 'Booking' : 'Bookings'}
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#002727] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-[13px] text-[#525f71] font-medium">Retrieving bonded client records...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-[#e2e8f0] p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#f0f3ff] text-[#00677d] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">luggage</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-[#002727]">No Bookings Found</h3>
            <p className="text-[13px] text-[#525f71] leading-relaxed">
              We could not find any active reservations matching your search. Explore our seasonal European holidays or make a new reservation.
            </p>
            <button
              onClick={() => onNavigate('holidays')}
              className="px-6 py-3 bg-[#002727] hover:bg-[#003838] text-white font-bold text-[13px] rounded-xl transition-all shadow-md"
            >
              Browse Holiday Catalog
            </button>
          </div>
        ) : (
          /* Bookings List */
          <div className="space-y-6">
            {filteredBookings.map((b) => {
              const leadName = `${b.party?.leadPassenger?.title || 'Mr.'} ${
                b.party?.leadPassenger?.firstName || 'James'
              } ${b.party?.leadPassenger?.lastName || 'Holloway'}`;
              const partyCount = (b.party?.adults || 2) + (b.party?.children || 0) + (b.party?.infants || 0);

              return (
                <div
                  key={b.id || b.reference}
                  className="bg-white rounded-3xl border border-[#bcc9ce]/50 shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  {/* Top Bar with Reference and Badges */}
                  <div className="bg-[#f0f3ff] p-4 px-6 border-b border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] uppercase font-bold text-[#525f71] tracking-wider">
                        Booking Ref:
                      </span>
                      <span className="font-mono font-extrabold text-[16px] text-[#002727]">
                        {b.reference}
                      </span>
                      <button
                        onClick={() => handleCopy(b.reference)}
                        className="text-[11px] text-[#00677d] hover:text-[#002727] flex items-center gap-1 font-semibold ml-1"
                        title="Copy Reference"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {copiedRef === b.reference ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedRef === b.reference ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[11px] font-bold">
                        <span className="material-symbols-outlined text-[13px]">shield</span>
                        {b.atolCertificate || 'ATOL PROTECTED'}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#002727] text-white text-[11px] font-bold uppercase tracking-wider">
                        {b.status || 'CONFIRMED & BONDED'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#00677d]">
                          {b.destination}
                        </span>
                        <h3 className="font-headline text-xl sm:text-2xl font-extrabold text-[#002727] mt-0.5">
                          {b.tourTitle}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12.5px] pt-2">
                        <div className="p-3 bg-[#f9f9ff] rounded-xl border border-[#e2e8f0]">
                          <span className="text-[10px] uppercase font-bold text-[#525f71] block">Travel Dates</span>
                          <p className="font-bold text-[#002727] mt-0.5">{b.travelWindow}</p>
                          <p className="text-[#525f71] text-[11px]">{b.duration}</p>
                        </div>

                        <div className="p-3 bg-[#f9f9ff] rounded-xl border border-[#e2e8f0]">
                          <span className="text-[10px] uppercase font-bold text-[#525f71] block">Lead Passenger</span>
                          <p className="font-bold text-[#002727] mt-0.5">{leadName}</p>
                          <p className="text-[#525f71] text-[11px]">{partyCount} Guests ({b.party?.adults || 2} Adults, {b.party?.children || 0} Children)</p>
                        </div>

                        <div className="p-3 bg-[#f9f9ff] rounded-xl border border-[#e2e8f0]">
                          <span className="text-[10px] uppercase font-bold text-[#525f71] block">Accommodation</span>
                          <p className="font-bold text-[#002727] mt-0.5 truncate">{b.lodging || 'Grand Hotel Bohemia'}</p>
                          <p className="text-[#525f71] text-[11px]">4★ Superior Heritage</p>
                        </div>
                      </div>

                      {/* Transfer status */}
                      <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-200 text-[12px] flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#002727]">
                          <span className="material-symbols-outlined text-[#00677d] text-[18px]">directions_car</span>
                          <span><strong>Private Chauffeur:</strong> {b.chauffeur}</span>
                        </div>
                        <span className="text-emerald-700 font-bold text-[11px] shrink-0">Included</span>
                      </div>
                    </div>

                    {/* Financial Summary & Actions Column */}
                    <div className="lg:col-span-4 bg-[#f9f9ff] p-5 rounded-2xl border border-[#e2e8f0] flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#525f71] tracking-wider block">
                          Settlement Summary
                        </span>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-[12px] text-[#525f71]">Total Paid:</span>
                          <span className="font-extrabold text-[22px] text-[#002727]">
                            £{b.financials?.totalPaidToday?.toLocaleString('en-GB') || '2,075'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#525f71] text-right">
                          Method: {b.financials?.paymentMethod || 'Visa ending 4092'}
                        </p>
                        <p className="text-[10px] font-mono text-emerald-700 text-right mt-1">
                          Auth: {b.financials?.authCode || '#AUTH-78329'}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#e2e8f0]">
                        <button
                          onClick={() => {
                            onSelectBooking(b);
                            onNavigate('booking-confirmed', { booking: b });
                          }}
                          className="w-full py-2.5 bg-[#002727] hover:bg-[#003838] text-white text-[12px] font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          <span>View Full Confirmation</span>
                        </button>

                        <button
                          onClick={() => onOpenVoucherModal(b)}
                          className="w-full py-2 bg-white hover:bg-slate-50 text-[#002727] border border-[#bcc9ce]/60 text-[12px] font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px] text-[#00677d]">description</span>
                          <span>CAA ATOL Certificate</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
