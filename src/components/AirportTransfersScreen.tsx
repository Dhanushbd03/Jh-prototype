import React, { useState } from 'react';

interface AirportTransfersScreenProps {
  onNavigate: (view: string, payload?: any) => void;
  onOpenConcierge?: () => void;
}

export const AirportTransfersScreen: React.FC<AirportTransfersScreenProps> = ({
  onNavigate,
}) => {
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleStoreClick = (storeName: string) => {
    setDownloadToast(`Redirecting to JILIT Taxi on ${storeName}...`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3500);
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center bg-[#f9f9ff] pt-24 pb-16 px-6">
      {/* Toast feedback */}
      <div
        className={`fixed top-24 right-8 z-50 flex items-center gap-2 px-5 py-3 bg-[#002727] text-white rounded-2xl shadow-2xl transition-all duration-300 ${
          downloadToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-[#ffba27] text-[20px]">download</span>
        <span className="text-[13px] font-bold">{downloadToast}</span>
      </div>

      <div className="max-w-2xl w-full text-center space-y-8 bg-white p-10 sm:p-14 rounded-3xl shadow-xl border border-[#bcc9ce]/40 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B4D8]/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

        {/* Brand App Icon using new JILIT Logo */}
        <div className="w-auto h-20 px-6 rounded-2xl bg-[#0A1628] inline-flex items-center justify-center mx-auto shadow-xl ring-4 ring-[#00B4D8]/20 p-2 overflow-hidden">
          <img
            src="/assets/aistudio/JILIT_Holidays_Travel_Logo_3f52c9fa.png"
            alt="JILIT Holidays &amp; Taxi"
            className="h-full w-auto object-contain"
          />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00B4D8]/15 text-[#00677d] text-[11px] font-extrabold uppercase tracking-wider border border-[#00B4D8]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] animate-pulse"></span>
            Southampton &amp; UK Airport Transfers
          </div>
          <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1628] tracking-tight leading-tight">
            For airport transfers, use the JILIT Taxi app
          </h1>
          <p className="text-[15px] text-[#525f71] max-w-md mx-auto">
            <span className="font-display italic text-[#FFB703] font-bold block mb-1">
              "We move Southampton."
            </span>
            Book your Southampton, London Heathrow, Gatwick, and UK airport transfers directly on the JILIT Taxi app.
          </p>
        </div>

        {/* Store Download Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Google Play Store Button */}
          <button
            onClick={() => handleStoreClick('Google Play Store')}
            className="w-full sm:w-auto min-w-[210px] flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-[#0A1628] hover:bg-[#0f213a] text-white shadow-lg border border-[#00B4D8]/30 transition-all hover:scale-102 active:scale-98 group"
          >
            {/* Google Play Icon SVG */}
            <svg
              className="w-7 h-7 shrink-0 text-[#ffba27]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3.609 1.814L13.792 12 3.61 22.186a1.986 1.986 0 0 1-.61-1.436V3.25c0-.568.223-1.082.609-1.436z" fill="#4285F4"/>
              <path d="M17.156 8.636l-3.364 3.364 3.364 3.364 3.82-2.184c1.089-.622 1.089-1.637 0-2.26l-3.82-2.284z" fill="#FBBC05"/>
              <path d="M3.609 1.814l10.183 10.186 3.364-3.364L6.115.42C5.027-.202 3.996.16 3.609 1.814z" fill="#EA4335"/>
              <path d="M13.792 12L3.609 22.186c.387 1.654 1.418 2.016 2.506 1.394l11.041-6.416-3.364-3.364z" fill="#34A853"/>
            </svg>
            <div className="text-left">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-[#beebe9] leading-none">
                GET IT ON
              </span>
              <span className="block text-[16px] font-bold tracking-tight text-white leading-tight">
                Google Play Store
              </span>
            </div>
          </button>

          {/* Apple App Store Button */}
          <button
            onClick={() => handleStoreClick('Apple App Store')}
            className="w-full sm:w-auto min-w-[210px] flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-[#002727] hover:bg-[#003838] text-white shadow-lg transition-all hover:scale-102 active:scale-98 group"
          >
            {/* Apple Icon SVG */}
            <svg
              className="w-7 h-7 shrink-0 text-white fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.84-.98 2.95 1.07.08 2.14-.52 2.79-1.29z"/>
            </svg>
            <div className="text-left">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-[#beebe9] leading-none">
                DOWNLOAD ON THE
              </span>
              <span className="block text-[16px] font-bold tracking-tight text-white leading-tight">
                App Store
              </span>
            </div>
          </button>
        </div>

        {/* Return to Holidays link */}
        <div className="pt-4 border-t border-[#e2e8f0]">
          <button
            onClick={() => onNavigate('holidays')}
            className="text-[13px] font-bold text-[#00677d] hover:text-[#002727] inline-flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Holidays Catalog</span>
          </button>
        </div>
      </div>
    </div>
  );
};
