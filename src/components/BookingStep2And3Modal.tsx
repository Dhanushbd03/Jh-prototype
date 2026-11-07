import React, { useState } from 'react';
import { BookingConfiguration } from './BookingStep1Screen';

interface BookingStep2And3ModalProps {
  config: BookingConfiguration;
  onBack: () => void;
  onBookingComplete: (newBooking: any) => void;
}

export const BookingStep2And3Modal: React.FC<BookingStep2And3ModalProps> = ({
  config,
  onBack,
  onBookingComplete,
}) => {
  const [step, setStep] = useState<2 | 3>(2);

  // Guest Details State initialized with the exact demo family from Image_1 & Image_2
  const [leadPassenger, setLeadPassenger] = useState({
    title: 'Mr.',
    firstName: 'James',
    lastName: 'Holloway',
    email: 'james.holloway@example.co.uk',
    phone: '+44 7700 900142',
  });

  const [guest2, setGuest2] = useState({
    title: 'Mrs.',
    firstName: 'Eleanor',
    lastName: 'Holloway',
    email: 'eleanor.h@example.co.uk',
  });

  const [guest3, setGuest3] = useState({
    title: 'Master',
    firstName: 'Thomas',
    lastName: 'Holloway',
    age: 8,
    citizenship: 'UK Citizen',
  });

  const [passportVerified, setPassportVerified] = useState(true);

  // Payment Settlement State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'bank'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4092');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('389');
  const [cardHolder, setCardHolder] = useState('MR JAMES HOLLOWAY');
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculation
  const adultPrice = config.tour.pricePerPerson || 700;
  const childPrice = 675;
  const adultTotal = config.adults * adultPrice;
  const childTotal = config.children * childPrice;
  const grandTotal = adultTotal + childTotal;

  const depositTotal = (config.adults + config.children) * (config.tour.depositPerPerson || 450);
  const payableToday = config.paymentScheme === 'full' ? grandTotal : depositTotal;
  const remainingBalance = config.paymentScheme === 'full' ? 0 : grandTotal - depositTotal;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalAuthorise = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const payload = {
        tourId: config.tour.id,
        tourTitle: `${config.tour.title} — Festive Season 2025`,
        destination: config.tour.destination,
        duration: config.tour.duration,
        travelWindow: config.departureDate,
        lodging: config.tour.hotel,
        chauffeur: config.tour.chauffeurIncluded,
        party: {
          adults: config.adults,
          children: config.children,
          infants: config.infants,
          leadPassenger,
          guest2: config.adults > 1 ? guest2 : undefined,
          guest3: config.children > 0 ? guest3 : undefined,
        },
        specialRequests: config.specialRequests,
        paymentScheme: config.paymentScheme,
        financials: {
          adultRate: adultPrice,
          childRate: childPrice,
          totalPaidToday: payableToday,
          remainingBalance,
          paymentMethod: paymentMethod === 'card' ? 'Visa ending 4092' : 'Apple Pay',
          authCode: `#AUTH-${Math.floor(10000 + Math.random() * 90000)}`,
        },
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.booking) {
        setTimeout(() => {
          setIsProcessing(false);
          onBookingComplete(data.booking);
        }, 1200);
      } else {
        throw new Error('Booking could not be stored');
      }
    } catch (err) {
      console.warn('Backend save failed, using local fallback:', err);
      setTimeout(() => {
        setIsProcessing(false);
        onBookingComplete({
          reference: 'JILIT-849204',
          atolCertificate: 'ATOL-9822-49102',
          bookingDate: '04 October 2025',
          tourTitle: `${config.tour.title} — Festive Season 2025`,
          destination: config.tour.destination,
          travelWindow: config.departureDate,
          lodging: config.tour.hotel,
          chauffeur: config.tour.chauffeurIncluded,
          party: {
            adults: config.adults,
            children: config.children,
            infants: config.infants,
            leadPassenger,
            guest2: config.adults > 1 ? guest2 : undefined,
            guest3: config.children > 0 ? guest3 : undefined,
          },
          specialRequests: config.specialRequests,
          paymentScheme: config.paymentScheme,
          financials: {
            adultRate: adultPrice,
            childRate: childPrice,
            totalPaidToday: payableToday,
            remainingBalance,
            paymentMethod: 'Visa ending 4092',
            authCode: '#AUTH-78329',
          },
          status: 'CONFIRMED & BONDED',
        });
      }, 1000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Top Progress Meter */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e2e8f0] mb-8">
          <div className="grid grid-cols-4 gap-2 text-center text-[12px] font-bold">
            <div className="flex items-center gap-2 text-[#1E7E34]">
              <span className="w-6 h-6 rounded-full bg-[#EBF8EE] text-[#1E7E34] flex items-center justify-center text-[11px]">
                ✓
              </span>
              <span className="hidden sm:inline">1. Travellers</span>
            </div>
            <div className={`flex items-center gap-2 ${step === 2 ? 'text-[#002727]' : 'text-[#1E7E34]'}`}>
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                  step === 2
                    ? 'bg-[#002727] text-white ring-2 ring-[#00677d]/30'
                    : 'bg-[#EBF8EE] text-[#1E7E34]'
                }`}
              >
                {step === 2 ? '2' : '✓'}
              </span>
              <span className="hidden sm:inline">2. Guest Details</span>
            </div>
            <div className={`flex items-center gap-2 ${step === 3 ? 'text-[#002727]' : 'text-[#525f71]'}`}>
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                  step === 3 ? 'bg-[#002727] text-white ring-2 ring-[#00677d]/30' : 'bg-[#e2e8f0]'
                }`}
              >
                3
              </span>
              <span className="hidden sm:inline">3. Settlement</span>
            </div>
            <div className="flex items-center gap-2 text-[#525f71] opacity-60">
              <span className="w-6 h-6 rounded-full bg-[#e2e8f0] flex items-center justify-center text-[11px]">
                4
              </span>
              <span className="hidden sm:inline">4. Confirmed</span>
            </div>
          </div>
        </div>

        {/* STEP 2: GUEST DETAILS FORM */}
        {step === 2 && (
          <form onSubmit={handleProceedToPayment} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#e2e8f0] space-y-6">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#00677d] font-bold">
                    Step 2 of 3 · Party Manifest
                  </span>
                  <h2 className="font-display text-[26px] font-bold text-[#111c2c]">
                    Lead Passenger & Guest Information
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onBack}
                  className="text-[13px] text-[#525f71] hover:text-[#00677d] font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Back to Step 1
                </button>
              </div>

              {/* Lead Passenger */}
              <div className="space-y-4 p-5 rounded-xl bg-[#f0f3ff]/60 border border-[#e2e8f0]">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-[#002727] text-white text-[10px] font-bold uppercase tracking-wider">
                    Lead Passenger (Primary Contact)
                  </span>
                  <span className="text-[12px] text-[#525f71]">Booking correspondence recipient</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-[#525f71] uppercase">Title</label>
                    <select
                      value={leadPassenger.title}
                      onChange={(e) => setLeadPassenger({ ...leadPassenger, title: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13px] font-semibold"
                    >
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                      <option>Dr.</option>
                      <option>Prof.</option>
                    </select>
                  </div>
                  <div className="sm:col-span-5">
                    <label className="block text-[11px] font-bold text-[#525f71] uppercase">First Name</label>
                    <input
                      type="text"
                      required
                      value={leadPassenger.firstName}
                      onChange={(e) => setLeadPassenger({ ...leadPassenger, firstName: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13px] font-semibold"
                    />
                  </div>
                  <div className="sm:col-span-5">
                    <label className="block text-[11px] font-bold text-[#525f71] uppercase">Last Name</label>
                    <input
                      type="text"
                      required
                      value={leadPassenger.lastName}
                      onChange={(e) => setLeadPassenger({ ...leadPassenger, lastName: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13px] font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#525f71] uppercase">Email Address (for ATOL Certificate)</label>
                    <input
                      type="email"
                      required
                      value={leadPassenger.email}
                      onChange={(e) => setLeadPassenger({ ...leadPassenger, email: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13px] font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#525f71] uppercase">UK Mobile Phone (for Concierge SMS)</label>
                    <input
                      type="tel"
                      required
                      value={leadPassenger.phone}
                      onChange={(e) => setLeadPassenger({ ...leadPassenger, phone: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13px] font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Guest 2 */}
              {config.adults > 1 && (
                <div className="space-y-4 p-5 rounded-xl bg-[#f8f9fa] border border-[#e2e8f0]">
                  <span className="px-2.5 py-0.5 rounded bg-[#e7eeff] text-[#002727] text-[10px] font-bold uppercase tracking-wider">
                    Passenger 2 (Adult)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-[#525f71] uppercase">Title</label>
                      <select
                        value={guest2.title}
                        onChange={(e) => setGuest2({ ...guest2, title: e.target.value })}
                        className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13px] font-semibold"
                      >
                        <option>Mrs.</option>
                        <option>Mr.</option>
                        <option>Ms.</option>
                      </select>
                    </div>
                    <div className="sm:col-span-5">
                      <label className="block text-[11px] font-bold text-[#525f71] uppercase">First Name</label>
                      <input
                        type="text"
                        required
                        value={guest2.firstName}
                        onChange={(e) => setGuest2({ ...guest2, firstName: e.target.value })}
                        className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13px] font-semibold"
                      />
                    </div>
                    <div className="sm:col-span-5">
                      <label className="block text-[11px] font-bold text-[#525f71] uppercase">Last Name</label>
                      <input
                        type="text"
                        required
                        value={guest2.lastName}
                        onChange={(e) => setGuest2({ ...guest2, lastName: e.target.value })}
                        className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13px] font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Guest 3 Child */}
              {config.children > 0 && (
                <div className="space-y-4 p-5 rounded-xl bg-[#f8f9fa] border border-[#e2e8f0]">
                  <span className="px-2.5 py-0.5 rounded bg-[#d4e0f9] text-[#101c2e] text-[10px] font-bold uppercase tracking-wider">
                    Passenger 3 (Child Concession)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-[#525f71] uppercase">Title</label>
                      <select
                        value={guest3.title}
                        onChange={(e) => setGuest3({ ...guest3, title: e.target.value })}
                        className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13px] font-semibold"
                      >
                        <option>Master</option>
                        <option>Miss</option>
                      </select>
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold text-[#525f71] uppercase">First Name</label>
                      <input
                        type="text"
                        required
                        value={guest3.firstName}
                        onChange={(e) => setGuest3({ ...guest3, firstName: e.target.value })}
                        className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13px] font-semibold"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold text-[#525f71] uppercase">Last Name</label>
                      <input
                        type="text"
                        required
                        value={guest3.lastName}
                        onChange={(e) => setGuest3({ ...guest3, lastName: e.target.value })}
                        className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13px] font-semibold"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-[#525f71] uppercase">Age</label>
                      <input
                        type="number"
                        min="2"
                        max="11"
                        value={guest3.age}
                        onChange={(e) => setGuest3({ ...guest3, age: parseInt(e.target.value, 10) })}
                        className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 text-[13px] font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Schengen Passport Check Acknowledgment */}
              <label className="flex items-start gap-3 p-4 rounded-xl bg-[#e7eeff]/60 border border-[#bcc9ce]/50 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={passportVerified}
                  onChange={(e) => setPassportVerified(e.target.checked)}
                  className="w-4 h-4 rounded text-[#00677d] accent-[#00677d] mt-1 shrink-0"
                />
                <span className="text-[12px] text-[#111c2c] leading-relaxed">
                  <strong>Passport Validity Declaration:</strong> I confirm that all travellers hold a valid passport issued less than 10 years before departure, with at least 3 months validity beyond the intended return date (Schengen requirement).
                </span>
              </label>

              <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-5 py-2.5 rounded-xl bg-[#f0f3ff] text-[#525f71] hover:text-[#111c2c] font-bold text-[14px]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#c59b27] hover:bg-[#AC8419] text-white font-bold text-[14px] shadow transition-all flex items-center gap-2"
                >
                  <span>Proceed to Secure Settlement</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 3: SECURE SETTLEMENT FORM */}
        {step === 3 && (
          <form onSubmit={handleFinalAuthorise} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#e2e8f0] space-y-6">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#00677d] font-bold">
                    Step 3 of 3 · Final Step
                  </span>
                  <h2 className="font-display text-[26px] font-bold text-[#111c2c]">
                    Authorise Secure Settlement
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[13px] text-[#525f71] hover:text-[#00677d] font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Back to Guests
                </button>
              </div>

              {/* Settlement Summary Box */}
              <div className="p-5 rounded-2xl bg-[#002727] text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] uppercase tracking-wider text-[#ffdea9] font-bold">
                    Amount Payable Today
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-white/10 text-[11px] font-semibold">
                    {config.paymentScheme === 'full' ? 'Option A (Full)' : 'Option B (Deposit)'}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[36px] font-bold leading-none">
                    £{payableToday.toLocaleString()}.00
                  </span>
                  <span className="text-[12px] text-[#ffdea9]">
                    {config.paymentScheme === 'full'
                      ? 'Remaining balance: £0.00'
                      : `Remaining: £${remainingBalance.toLocaleString()}.00 (due 45 days prior)`}
                  </span>
                </div>
                <p className="text-[11px] text-[#dee9ff] pt-1">
                  Protected under UK Civil Aviation Authority ATOL Bond #9822 & ABTA #Y6841 Trust Account.
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#525f71]">
                  Select Settlement Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#00677d] bg-[#f0f3ff]'
                        : 'border-[#e2e8f0] bg-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px] text-[#00677d] block mx-auto mb-1">
                      credit_card
                    </span>
                    <span className="text-[12px] font-bold block text-[#111c2c]">Debit / Credit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      paymentMethod === 'applepay'
                        ? 'border-[#00677d] bg-[#f0f3ff]'
                        : 'border-[#e2e8f0] bg-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px] text-[#111c2c] block mx-auto mb-1">
                      wallet
                    </span>
                    <span className="text-[12px] font-bold block text-[#111c2c]">Apple / Google Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-[#00677d] bg-[#f0f3ff]'
                        : 'border-[#e2e8f0] bg-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px] text-[#00677d] block mx-auto mb-1">
                      account_balance
                    </span>
                    <span className="text-[12px] font-bold block text-[#111c2c]">UK Bank Transfer</span>
                  </button>
                </div>
              </div>

              {/* Card Inputs */}
              <div className="space-y-4 p-5 rounded-xl bg-[#f8f9fa] border border-[#e2e8f0]">
                <div>
                  <label className="block text-[11px] font-bold text-[#525f71] uppercase">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-[13px] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#525f71] uppercase">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-[13px] font-mono font-semibold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#00677d] bg-[#e7eeff] px-2 py-0.5 rounded">
                      VISA
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#525f71] uppercase">Expiry</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-[13px] font-mono font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#525f71] uppercase">Security Code (CVC)</label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2.5 text-[13px] font-mono font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Authorise CTA */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-3 bg-[#1E7E34] hover:bg-[#155d27] text-white text-[16px] font-bold py-4 rounded-xl shadow-lg transition-all active:scale-98 disabled:opacity-75"
                >
                  {isProcessing ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                      <span>Authorising ATOL Settlement & Generating Certificate...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">lock</span>
                      <span>AUTHORISE PAYMENT & CONFIRM BOOKING (£{payableToday.toLocaleString()}.00)</span>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-4 text-[11px] text-[#525f71]">
                  <span>🔒 256-Bit Financial Encryption</span>
                  <span>•</span>
                  <span>Instant ATOL Protection Certificate Issuance</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
