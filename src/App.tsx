/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { TourDetailScreen } from './components/TourDetailScreen';
import { BookingStep1Screen, BookingConfiguration } from './components/BookingStep1Screen';
import { BookingStep2And3Modal } from './components/BookingStep2And3Modal';
import { BookingConfirmedScreen } from './components/BookingConfirmedScreen';
import { AirportTransfersScreen } from './components/AirportTransfersScreen';
import { MyBookingsScreen } from './components/MyBookingsScreen';
import { ConciergeDeskModal } from './components/ConciergeDeskModal';
import { AtolVoucherModal } from './components/AtolVoucherModal';
import { HOLIDAY_PACKAGES, TourPackage } from './data/holidays';

export default function App() {
  // Navigation state
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedTourId, setSelectedTourId] = useState<string>('prague-christmas');
  const [exploreFilters, setExploreFilters] = useState<any>(null);

  // Active tour object
  const activeTour =
    HOLIDAY_PACKAGES.find((p) => p.id === selectedTourId) || HOLIDAY_PACKAGES[0];

  // Booking Configuration State (for Step 1)
  const [bookingConfig, setBookingConfig] = useState<BookingConfiguration>({
    tour: activeTour,
    departureDate: activeTour.departureDates[0] || '05 Dec – 08 Dec 2025',
    roomType: 'Executive Heritage Family Suite (Grand Hotel Bohemia)',
    adults: 2,
    children: 1,
    infants: 0,
    paymentScheme: 'full',
    specialRequests:
      '1 Double Bed + 1 Premium Rollaway Bed confirmed in Family Suite. 1 Vegetarian menu profile noted for Prague Castle festive banquet. 1x Group-2 booster seat allocated for executive Mercedes airport chauffeur transfers.',
  });

  // Current Confirmed Booking State (seeded with demo booking reference JILIT-849204)
  const [currentBooking, setCurrentBooking] = useState<any>({
    id: 'booking-prague-1',
    reference: 'JILIT-849204',
    atolCertificate: 'ATOL-9822-49102',
    bookingDate: '04 October 2025',
    tourId: 'prague-christmas',
    tourTitle: 'Prague Christmas Tour — Festive Season 2025',
    destination: 'Prague, Czech Republic & Bohemian Old Town',
    duration: '4 Days / 3 Nights',
    travelWindow: 'Friday 05 Dec – Monday 08 Dec 2025',
    lodging: 'Grand Hotel Bohemia (4★ Superior Heritage)',
    chauffeur: 'Václav Havel Airport (PRG) ↔ Grand Hotel Bohemia (Private Mercedes V-Class)',
    party: {
      adults: 2,
      children: 1,
      infants: 0,
      leadPassenger: {
        title: 'Mr.',
        firstName: 'James',
        lastName: 'Holloway',
        email: 'james.holloway@example.co.uk',
        phone: '+44 7700 900142',
      },
      guest2: {
        title: 'Mrs.',
        firstName: 'Eleanor',
        lastName: 'Holloway',
        email: 'eleanor.h@example.co.uk',
      },
      guest3: {
        title: 'Master',
        firstName: 'Thomas',
        lastName: 'Holloway',
        age: 8,
        citizenship: 'UK Citizen',
      },
    },
    specialRequests:
      '1 Double Bed + 1 Premium Rollaway Bed confirmed in Family Suite. 1 Vegetarian menu profile noted for Prague Castle festive banquet. 1x Group-2 booster seat allocated for executive Mercedes airport chauffeur transfers.',
    paymentScheme: 'full',
    financials: {
      adultRate: 700,
      childRate: 675,
      totalPaidToday: 2075,
      remainingBalance: 0,
      paymentMethod: 'Visa ending 4092',
      authCode: '#AUTH-78329',
    },
    status: 'CONFIRMED & BONDED',
  });

  // Modals state
  const [isStep2And3Open, setIsStep2And3Open] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [voucherModalBooking, setVoucherModalBooking] = useState<any>(currentBooking);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Sync bookingConfig tour if selectedTourId changes
  useEffect(() => {
    const matched = HOLIDAY_PACKAGES.find((p) => p.id === selectedTourId);
    if (matched) {
      setBookingConfig((prev) => ({
        ...prev,
        tour: matched,
        departureDate: matched.departureDates[0] || prev.departureDate,
      }));
    }
  }, [selectedTourId]);

  // Navigation handler
  const handleNavigate = (view: string, payload?: any) => {
    if (payload?.tourId) {
      setSelectedTourId(payload.tourId);
    }
    if (payload?.booking) {
      setCurrentBooking(payload.booking);
    }
    if (view === 'holidays' && payload) {
      setExploreFilters(payload);
    }
    setCurrentView(view);
  };

  const handleSelectTour = (tourId: string) => {
    setSelectedTourId(tourId);
    setCurrentView('holiday-detail');
  };

  const handleStartBooking = (config: {
    tour: TourPackage;
    departureDate: string;
    roomType: string;
    adults: number;
    children: number;
    infants: number;
  }) => {
    setBookingConfig({
      ...config,
      paymentScheme: 'full',
      specialRequests:
        '1 Double Bed + 1 Premium Rollaway Bed confirmed in Family Suite. 1 Vegetarian menu profile noted for Prague Castle festive banquet.',
    });
    setCurrentView('book-step-1');
  };

  const handleContinueToGuests = (config: BookingConfiguration) => {
    setBookingConfig(config);
    setIsStep2And3Open(true);
  };

  const handleBookingComplete = (newBooking: any) => {
    setIsStep2And3Open(false);
    setCurrentBooking(newBooking);
    setCurrentView('booking-confirmed');
  };

  const handleOpenVoucherModal = (booking: any) => {
    setVoucherModalBooking(booking || currentBooking);
    setIsVoucherModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#191c1e] font-sans antialiased selection:bg-[#002727] selection:text-[#ffba27]">
      {/* Global Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectTour={handleSelectTour}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        )}

        {currentView === 'holidays' && (
          <ExploreScreen
            onNavigate={handleNavigate}
            onSelectTour={handleSelectTour}
            onOpenConcierge={() => setIsConciergeOpen(true)}
            initialFilters={exploreFilters}
          />
        )}

        {currentView === 'holiday-detail' && (
          <TourDetailScreen
            tourId={selectedTourId}
            onNavigate={handleNavigate}
            onStartBooking={handleStartBooking}
            onOpenConcierge={() => setIsConciergeOpen(true)}
            onOpenPdfModal={(tour) => {
              setVoucherModalBooking({
                ...currentBooking,
                tourTitle: tour.title,
                destination: tour.destination,
                lodging: tour.hotel,
              });
              setIsVoucherModalOpen(true);
            }}
          />
        )}

        {currentView === 'book-step-1' && (
          <BookingStep1Screen
            initialConfig={bookingConfig}
            onNavigate={handleNavigate}
            onContinueToGuests={handleContinueToGuests}
          />
        )}

        {currentView === 'booking-confirmed' && (
          <BookingConfirmedScreen
            booking={currentBooking}
            onNavigate={handleNavigate}
            onOpenConcierge={() => setIsConciergeOpen(true)}
            onOpenVoucherModal={handleOpenVoucherModal}
          />
        )}

        {currentView === 'airport-transfers' && (
          <AirportTransfersScreen
            onNavigate={handleNavigate}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        )}

        {currentView === 'my-bookings' && (
          <MyBookingsScreen
            onNavigate={handleNavigate}
            onOpenConcierge={() => setIsConciergeOpen(true)}
            onOpenVoucherModal={handleOpenVoucherModal}
            onSelectBooking={(b) => setCurrentBooking(b)}
          />
        )}

        {/* Static Content Views for About, Blog, Contact */}
        {currentView === 'about-us' && (
          <div className="w-full pt-28 pb-20 px-6 lg:px-12 max-w-5xl mx-auto space-y-10">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00677d]">
                British Touring & Transfer Heritage
              </span>
              <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-[#002727]">
                About JILIT Holidays
              </h1>
              <p className="text-lg text-[#525f71] font-serif leading-relaxed">
                Founded in London, JILIT Holidays represents the pinnacle of bespoke European travel and executive airport transfers for discerning British travellers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="p-8 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#002727] text-[#ffba27] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-[#002727]">
                  ATOL Bond #9822 & ABTA #Y6841
                </h3>
                <p className="text-[13px] text-[#525f71] leading-relaxed">
                  Every package holiday booked with JILIT Holidays carries statutory financial protection under the UK Civil Aviation Authority ATOL scheme. Your monies and return flights are 100% bonded and protected against insolvency.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#002727] text-[#ffba27] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">directions_car</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-[#002727]">
                  Private Chauffeur Fleet
                </h3>
                <p className="text-[13px] text-[#525f71] leading-relaxed">
                  We operate our own executive fleet of Mercedes-Benz E-Class, S-Class, and V-Class Extra-Long vehicles. Every transfer includes inside-terminal meet-and-greet, live flight radar synchronisation, and British PCO licensed chauffeurs.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#002727] text-white space-y-4">
              <h3 className="font-headline text-2xl font-bold">
                120 Pall Mall, St. James’s, London
              </h3>
              <p className="text-[13.5px] text-[#beebe9] leading-relaxed max-w-2xl">
                Our bespoke reservations desk and private client consultation suite are located in the heart of London’s clubland on Pall Mall. Discerning clients are invited by appointment to consult our Senior Concierge desk on bespoke itineraries.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsConciergeOpen(true)}
                  className="px-6 py-3 bg-[#ffba27] text-[#002727] font-bold text-[13px] rounded-xl hover:bg-[#e6a316] transition-colors"
                >
                  Consult Senior Concierge
                </button>
                <button
                  onClick={() => handleNavigate('holidays')}
                  className="px-6 py-3 bg-white/10 text-white font-bold text-[13px] rounded-xl hover:bg-white/20 transition-colors"
                >
                  Explore Holiday Catalog
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'blog' && (
          <div className="w-full pt-28 pb-20 px-6 lg:px-12 max-w-6xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00677d]">
                The JILIT Travel Journal
              </span>
              <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-[#002727]">
                Dispatches from Europe & Executive Travel
              </h1>
              <p className="text-[14px] text-[#525f71]">
                Curated insights, insider dining guides, and logistics advice from our London travel directors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'A Discerning Guide to Prague’s Old Town Festive Markets',
                  date: '12 October 2025',
                  read: '5 min read',
                  image:
                    'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=800&q=80',
                  summary:
                    'Where to sample traditional trdelník without the tourist crowds, and why the Boccaccio Hall concert remains Prague’s best-kept secret.',
                  tourId: 'prague-christmas',
                },
                {
                  title: 'Navigating European Border Logistics: UK Passports & Schengen in 2025',
                  date: '28 September 2025',
                  read: '7 min read',
                  image:
                    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
                  summary:
                    'An authoritative explanation of the 10-year issuance limit, the 90-day rolling rule, and fast-track biometric lanes.',
                },
                {
                  title: 'The Art of the Chauffeur: Behind the Scenes of Heathrow Terminal 5',
                  date: '15 September 2025',
                  read: '4 min read',
                  image:
                    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
                  summary:
                    'How flight radar telemetry and discreet airside dispatch ensure your Mercedes is waiting before your wheels hit the runway.',
                },
              ].map((article, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#525f71]">
                        <span>{article.date}</span>
                        <span>{article.read}</span>
                      </div>
                      <h3 className="font-headline text-lg font-bold text-[#002727] leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-[12.5px] text-[#525f71] leading-relaxed pt-1">
                        {article.summary}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => {
                        if (article.tourId) {
                          handleSelectTour(article.tourId);
                        } else {
                          setIsConciergeOpen(true);
                        }
                      }}
                      className="text-[12px] font-bold text-[#00677d] hover:text-[#002727] flex items-center gap-1"
                    >
                      <span>Read Full Dispatch</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'contact' && (
          <div className="w-full pt-28 pb-20 px-6 lg:px-12 max-w-5xl mx-auto space-y-10">
            <div className="space-y-3 text-center max-w-2xl mx-auto">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00677d]">
                London Head Office & Client Care
              </span>
              <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-[#002727]">
                Contact JILIT Holidays
              </h1>
              <p className="text-[14px] text-[#525f71]">
                Speak directly with our St. James’s travel directors or dispatch desk.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#f0f3ff] text-[#002727] flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[24px]">pin_drop</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-[#002727]">London Office</h3>
                <p className="text-[12.5px] text-[#525f71] leading-relaxed">
                  120 Pall Mall, St. James’s<br />
                  London SW1Y 5ED<br />
                  United Kingdom
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#f0f3ff] text-[#002727] flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[24px]">call</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-[#002727]">Direct Telephone</h3>
                <p className="text-[12.5px] text-[#525f71] leading-relaxed">
                  Toll-Free: <strong>0800 456 7890</strong><br />
                  International: <strong>+44 20 7946 0991</strong><br />
                  Available 08:00 – 20:00 GMT
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#f0f3ff] text-[#002727] flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[24px]">mail</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-[#002727]">Email & Concierge</h3>
                <p className="text-[12.5px] text-[#525f71] leading-relaxed">
                  concierge@jilit-holidays.co.uk<br />
                  transfers@jilit-holidays.co.uk<br />
                  ATOL Support Desk Active
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setIsConciergeOpen(true)}
                className="px-8 py-4 bg-[#002727] hover:bg-[#003838] text-white font-bold text-[14px] rounded-2xl shadow-xl transition-all inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px] text-[#ffba27]">support_agent</span>
                <span>Open Instant AI Concierge Desk</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* Floating Bespoke Concierge Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsConciergeOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0A1628] text-white shadow-2xl hover:bg-[#0f213a] border-2 border-[#00B4D8] transition-all duration-300 hover:scale-105"
          aria-label="Open UK Travel Concierge Desk"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[#FFB703] text-[22px]">
              support_agent
            </span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00B4D8] border border-[#0A1628] animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-[12px] font-bold block leading-none text-[#F8F9FA]">
              JILIT Concierge
            </span>
            <span className="text-[10px] text-[#00B4D8] font-medium leading-none">
              High Thinking AI • 24/7
            </span>
          </div>
        </button>
      </div>

      {/* Step 2 & 3 Modal: Guest Manifest & Secure Settlement */}
      {isStep2And3Open && (
        <BookingStep2And3Modal
          config={bookingConfig}
          onBack={() => setIsStep2And3Open(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {/* Interactive AI Concierge Desk Modal (Gemini 4 Argon Thinking High) */}
      <ConciergeDeskModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        initialContext={{
          currentView,
          selectedTour: activeTour.title,
          currentBookingRef: currentBooking?.reference,
        }}
        onSelectHoliday={(tourId) => {
          setIsConciergeOpen(false);
          handleSelectTour(tourId);
        }}
      />

      {/* Official CAA ATOL Certificate & Voucher Modal */}
      <AtolVoucherModal
        isOpen={isVoucherModalOpen}
        onClose={() => setIsVoucherModalOpen(false)}
        booking={voucherModalBooking}
      />
    </div>
  );
}
