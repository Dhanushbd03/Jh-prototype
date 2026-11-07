import React from 'react';

interface AtolVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
}

export const AtolVoucherModal: React.FC<AtolVoucherModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  if (!isOpen || !booking) return null;

  const leadName = `${booking.party?.leadPassenger?.title || 'Mr.'} ${
    booking.party?.leadPassenger?.firstName || 'James'
  } ${booking.party?.leadPassenger?.lastName || 'Holloway'}`;

  const partyTotal =
    (booking.party?.adults || 2) +
    (booking.party?.children || 0) +
    (booking.party?.infants || 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#bcc9ce]/50 overflow-hidden my-8">
        {/* Top Control Bar */}
        <div className="bg-[#002727] text-white p-4 px-6 flex items-center justify-between border-b border-[#00677d]/30 print:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffba27] text-[22px]">verified</span>
            <span className="font-bold text-[14px] tracking-wide">
              Official CAA ATOL Certificate & Holiday Voucher
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[12px] font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#beebe9] hover:text-white hover:bg-white/10"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Certificate Printable Area */}
        <div className="p-8 sm:p-10 text-[#191c1e] bg-white space-y-6">
          {/* Header Banner */}
          <div className="border-b-2 border-[#002727] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#0A1628] px-3.5 py-1.5 rounded-xl inline-flex items-center shadow-sm">
                <img
                  alt="JILIT Holidays Logo"
                  className="h-9 w-auto object-contain"
                  src="/assets/aistudio/JILIT_Holidays_Travel_Logo_3f52c9fa.png"
                />
              </div>
              <div>
                <h1 className="font-headline text-[22px] font-extrabold text-[#002727] tracking-tight">
                  ATOL CERTIFICATE
                </h1>
                <p className="text-[11px] font-semibold tracking-wider text-[#525f71] uppercase">
                  Civil Aviation Authority Protection Document • UK Package Regulations
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg font-mono text-[13px] font-extrabold tracking-wider">
                {booking.atolCertificate || 'ATOL-9822-49102'}
              </span>
              <p className="text-[11px] text-[#525f71] mt-1">
                Issued under ATOL Licence Holder #9822
              </p>
            </div>
          </div>

          {/* Critical Protection Clause Box */}
          <div className="p-4 rounded-2xl bg-[#f0f3ff] border border-[#00677d]/20 text-[12px] leading-relaxed text-[#002727]">
            <p className="font-bold mb-1">
              What does your ATOL Protection mean?
            </p>
            <p className="text-[#525f71]">
              Your holiday arrangement detailed below is protected by the Civil Aviation Authority under ATOL number 9822 held by JILIT Holidays Ltd. If we or the suppliers identified on this certificate are unable to provide the services listed because of insolvency, an alternative will be provided at no extra cost or you will receive a full refund.
            </p>
          </div>

          {/* Grid of details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
            <div className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f9f9ff]">
              <span className="text-[10px] uppercase font-bold text-[#525f71] tracking-wider block mb-1">
                Lead Passenger & Contact
              </span>
              <p className="font-bold text-[#002727] text-[15px]">{leadName}</p>
              <p className="text-[#525f71] text-[12px]">{booking.party?.leadPassenger?.email}</p>
              <p className="text-[#525f71] text-[12px]">{booking.party?.leadPassenger?.phone}</p>
              <p className="text-[11px] font-semibold text-[#00677d] mt-2">
                Party Size: {partyTotal} Guests ({booking.party?.adults || 2} Adults, {booking.party?.children || 0} Children)
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f9f9ff]">
              <span className="text-[10px] uppercase font-bold text-[#525f71] tracking-wider block mb-1">
                Booking Reference & Date
              </span>
              <p className="font-mono font-extrabold text-[16px] text-[#002727]">
                {booking.reference}
              </p>
              <p className="text-[#525f71] text-[12px]">Date of Issuance: {booking.bookingDate}</p>
              <p className="text-[#525f71] text-[12px]">Payment Status: Settled & Bonded (£{booking.financials?.totalPaidToday?.toLocaleString('en-GB') || '2,075'} GBP)</p>
              <p className="text-[11px] font-semibold text-emerald-700 mt-2">
                Authorisation: {booking.financials?.authCode || '#AUTH-78329'}
              </p>
            </div>
          </div>

          {/* Itinerary & Logistics Section */}
          <div className="border border-[#e2e8f0] rounded-2xl p-5 space-y-4">
            <h3 className="font-headline text-[15px] font-bold text-[#002727] border-b border-[#e2e8f0] pb-2">
              Protected Tour & Accommodation Arrangements
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12.5px]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#525f71] block">Tour Itinerary</span>
                <p className="font-bold text-[#002727]">{booking.tourTitle}</p>
                <p className="text-[#525f71]">{booking.destination}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#525f71] block">Dates & Duration</span>
                <p className="font-bold text-[#002727]">{booking.travelWindow}</p>
                <p className="text-[#525f71]">{booking.duration}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#525f71] block">Hotel Confirmation</span>
                <p className="font-bold text-[#002727]">{booking.lodging}</p>
                <p className="text-[#525f71]">Executive Family Suite • Heritage Wing</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#f0f3ff] text-[12px]">
              <span className="text-[10px] uppercase font-bold text-[#525f71] block">Executive Chauffeur Inclusions</span>
              <p className="font-medium text-[#002727]">{booking.chauffeur}</p>
            </div>

            {booking.specialRequests && (
              <div className="pt-2 text-[12px] bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-900 block">Noted Guest Requirements</span>
                <p className="text-amber-800">{booking.specialRequests}</p>
              </div>
            )}
          </div>

          {/* Footer Official Seal & 24/7 Helpline */}
          <div className="border-t border-[#e2e8f0] pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#525f71]">
            <div>
              <p className="font-bold text-[#002727]">JILIT Holidays Limited (Reg. #0482910)</p>
              <p>120 Pall Mall, St. James’s, London SW1Y 5ED, United Kingdom</p>
              <p>24/7 Overseas Emergency Support: +44 20 7946 0991</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="border-2 border-[#002727] p-2 rounded-xl text-center">
                <p className="font-bold text-[9px] tracking-widest uppercase text-[#002727]">ATOL</p>
                <p className="font-bold text-[12px] text-[#00677d]">PROTECTED</p>
                <p className="text-[8px] font-mono">#9822</p>
              </div>
              <div className="border border-slate-300 p-2 rounded-xl text-center">
                <p className="font-bold text-[9px] tracking-widest uppercase text-slate-700">ABTA</p>
                <p className="font-bold text-[11px] text-slate-800">#Y6841</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons in Modal footer */}
        <div className="bg-[#f0f3ff] p-4 px-6 flex items-center justify-between border-t border-[#e2e8f0] print:hidden">
          <p className="text-[11px] text-[#525f71]">
            Present this document at Grand Hotel Bohemia check-in and to your airport chauffeur.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#002727] hover:bg-[#003838] text-white text-[12px] font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-[#002727] border border-[#bcc9ce]/60 text-[12px] font-bold rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
