import React from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConcierge }) => {
  return (
    <footer className="w-full bg-[#0A1628] text-[#F8F9FA] pt-16 pb-10 shadow-[0_-4px_24px_rgba(0,0,0,0.4)] border-t border-[#00B4D8]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="JILIT Holidays Logo"
                className="h-12 sm:h-14 w-auto object-contain"
                src="/assets/aistudio/JILIT_Holidays_Travel_Logo_3f52c9fa.png"
              />
            </div>
            {/* Official Tagline from Brand Book */}
            <p className="font-display italic text-[#FFB703] text-[18px] font-semibold tracking-wide">
              We move Southampton.
            </p>
            <p className="text-[13px] leading-relaxed text-[#dee9ff]/80 max-w-md">
              Southampton's everything ride and bespoke European touring. No other company does airport transfers, cruises, executive chauffeurs, coaches, and luxury holidays under one unified brand.
            </p>
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold border border-[#00B4D8]/30">
                <span className="material-symbols-outlined text-[16px] text-[#FFB703]">verified_user</span>
                ATOL Protected #9822
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold border border-[#00B4D8]/30">
                <span className="material-symbols-outlined text-[16px] text-[#FFB703]">shield</span>
                ABTA Bonded #Y6841
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#00B4D8] text-[11px] font-bold border border-[#00B4D8]/40">
                <span className="material-symbols-outlined text-[16px]">local_taxi</span>
                TfL &amp; Southampton Licensed
              </span>
            </div>
          </div>

          {/* Discover Column */}
          <div className="space-y-3">
            <h3 className="text-[12px] text-[#00B4D8] uppercase tracking-widest font-extrabold">
              Discover
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('holidays')}
                  className="text-[13px] text-[#dee9ff]/80 hover:text-[#00B4D8] transition-colors"
                >
                  European Holidays
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('airport-transfers')}
                  className="text-[13px] text-[#dee9ff]/80 hover:text-[#00B4D8] transition-colors"
                >
                  Airport Transfers &amp; Taxi App
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-[13px] text-[#dee9ff]/80 hover:text-[#00B4D8] transition-colors"
                >
                  Travel Journal &amp; Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about-us')}
                  className="text-[13px] text-[#dee9ff]/80 hover:text-[#00B4D8] transition-colors"
                >
                  About JILIT
                </button>
              </li>
            </ul>
          </div>

          {/* 5 Brand Services Column */}
          <div className="space-y-3">
            <h3 className="text-[12px] text-[#00B4D8] uppercase tracking-widest font-extrabold">
              Five Services
            </h3>
            <ul className="space-y-2 text-[13px] text-[#dee9ff]/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703]" />
                <span>Taxi (Airport &amp; Local)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703]" />
                <span>Chauffeur (Executive Mercedes)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703]" />
                <span>Coach Hire (16 to 87 seats)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703]" />
                <span>Movers &amp; Student Relocation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703]" />
                <span>Parcels (Tracked &amp; Signed)</span>
              </li>
            </ul>
          </div>

          {/* Client Care & Concierge Column */}
          <div className="space-y-3">
            <h3 className="text-[12px] text-[#00B4D8] uppercase tracking-widest font-extrabold flex items-center justify-between">
              <span>Client Care</span>
              <button
                onClick={onOpenConcierge}
                className="text-[11px] text-[#FFB703] underline capitalize font-semibold"
              >
                Chat Live
              </button>
            </h3>
            <div className="space-y-2.5 text-[13px] text-[#dee9ff]/80">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#00B4D8] mt-0.5">call</span>
                <div>
                  <a href="tel:08004567890" className="block font-bold text-white hover:text-[#00B4D8]">
                    0800 456 7890
                  </a>
                  <span className="text-[11px] text-[#dee9ff]/60">Mon–Sat, 8am–7pm GMT</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#00B4D8] mt-0.5">mail</span>
                <a
                  className="hover:text-white transition-colors truncate"
                  href="mailto:support@jilitholidays.co.uk"
                >
                  support@jilitholidays.co.uk
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#00B4D8] mt-0.5">location_on</span>
                <span className="text-[12px] leading-snug">
                  Southampton Docks &amp; 120 Pall Mall, London
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#00B4D8]/20 text-[12px] text-[#dee9ff]/70">
          <p>
            © 2026 JILIT Holidays &amp; JILIT Mobility. All rights reserved. One brand, whatever needs moving.
          </p>
          <div className="flex items-center gap-5">
            <button
              onClick={() => onNavigate('my-bookings')}
              className="hover:text-white transition-colors"
            >
              My Account
            </button>
            <button
              onClick={() => onNavigate('about-us')}
              className="hover:text-white transition-colors"
            >
              Brand Story
            </button>
            <span className="text-[11px] uppercase tracking-wider text-[#FFB703] font-bold">
              ABTA #Y6841 • ATOL #9822
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
