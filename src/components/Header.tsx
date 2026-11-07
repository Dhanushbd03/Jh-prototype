import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, payload?: any) => void;
  onOpenConcierge: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenConcierge }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'holidays', label: 'Holidays' },
    { id: 'airport-transfers', label: 'Airport Transfers' },
    { id: 'blog', label: 'Blog' },
    { id: 'about-us', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(10,22,40,0.5)] border-b border-[#00B4D8]/20">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center text-left focus:outline-none group"
            title="JILIT Holidays - We move Southampton"
          >
            <img
              alt="JILIT Holidays Logo"
              className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              src="/assets/aistudio/JILIT_Holidays_Travel_Logo_3f52c9fa.png"
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive =
              currentView === item.id ||
              (item.id === 'holidays' && (currentView === 'holiday-detail' || currentView === 'book-step-1' || currentView === 'booking-confirmed'));
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-4 py-2 rounded-xl text-[14px] font-semibold transition-all ${
                  isActive
                    ? 'bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/40 shadow-sm'
                    : 'text-[#F8F9FA]/80 hover:bg-white/10 hover:text-[#00B4D8]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">

          {/* Explore Holidays CTA - Motion Teal per brand guidelines */}
          <button
            onClick={() => handleNav('holidays')}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#00B4D8] hover:bg-[#0096B4] text-[#0A1628] text-[14px] font-extrabold shadow-[0_2px_12px_rgba(0,180,216,0.35)] transition-all hover:shadow active:scale-95"
          >
            Explore Holidays
          </button>

          {/* User Account Avatar with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              title="My Account"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00B4D8]/20 text-[#00B4D8] hover:bg-[#00B4D8] hover:text-[#0A1628] border border-[#00B4D8]/40 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFB703]"
              aria-expanded={accountDropdownOpen}
              aria-haspopup="true"
            >
              <span className="material-symbols-outlined text-[19px]">person</span>
            </button>

            {accountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#e2e8f0] py-2 z-50 animate-fadeIn">
                <div className="px-4 py-3 border-b border-[#f0f3ff]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#00677d]">
                    Client Account
                  </p>
                  <p className="font-bold text-[14px] text-[#002727] truncate">
                    James Holloway
                  </p>
                  <p className="text-[11px] text-[#525f71] truncate">
                    james.holloway@example.co.uk
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      handleNav('my-bookings');
                      setAccountDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-[13px] font-semibold text-[#191c1e] hover:bg-[#f0f3ff] hover:text-[#002727] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#00677d]">
                      confirmation_number
                    </span>
                    <span>My Bookings</span>
                  </button>

                  <button
                    onClick={() => {
                      handleNav('my-bookings');
                      setAccountDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-[13px] font-semibold text-[#191c1e] hover:bg-[#f0f3ff] hover:text-[#002727] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#c59b27]">
                      verified_user
                    </span>
                    <span>ATOL Protection Vouchers</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenConcierge();
                      setAccountDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-[13px] font-semibold text-[#191c1e] hover:bg-[#f0f3ff] hover:text-[#002727] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#002727]">
                      support_agent
                    </span>
                    <span>Client Concierge Desk</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-[#f0f3ff] px-4 py-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#525f71]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    ATOL Bond #9822 & ABTA Protected
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#111c2c] hover:bg-[#e7eeff]"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A1628] border-b border-[#00B4D8]/20 px-6 py-4 space-y-2 shadow-2xl animate-fadeIn text-white">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="w-full text-left px-4 py-2.5 rounded-lg text-[15px] font-semibold text-[#F8F9FA] hover:bg-white/10 hover:text-[#00B4D8]"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('my-bookings')}
            className="w-full flex items-center gap-2 text-left px-4 py-2.5 rounded-lg text-[15px] font-semibold text-[#00B4D8] hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
            <span>My Bookings &amp; ATOL Vouchers</span>
          </button>
          <div className="pt-2 border-t border-[#00B4D8]/20 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenConcierge();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00B4D8]/20 border border-[#00B4D8]/30 text-[#00B4D8] font-bold text-[14px]"
            >
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              UK Concierge Desk
            </button>
            <button
              onClick={() => handleNav('holidays')}
              className="w-full flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#00B4D8] hover:bg-[#0096B4] text-[#0A1628] font-extrabold text-[14px] shadow-md"
            >
              Explore Holidays
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
