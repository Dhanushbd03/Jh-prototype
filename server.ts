import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent as instructed by guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// In-memory bookings store initialized with the demo Prague booking
interface BookingRecord {
  id: string;
  reference: string;
  atolCertificate: string;
  bookingDate: string;
  tourId: string;
  tourTitle: string;
  destination: string;
  duration: string;
  travelWindow: string;
  lodging: string;
  chauffeur: string;
  party: {
    adults: number;
    children: number;
    infants: number;
    leadPassenger: {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    guest2?: {
      title: string;
      firstName: string;
      lastName: string;
      email?: string;
    };
    guest3?: {
      title: string;
      firstName: string;
      lastName: string;
      age?: number;
      citizenship?: string;
    };
  };
  specialRequests: string;
  paymentScheme: "full" | "split";
  financials: {
    adultRate: number;
    childRate: number;
    totalPaidToday: number;
    remainingBalance: number;
    paymentMethod: string;
    authCode: string;
  };
  status: "CONFIRMED & BONDED";
}

const bookings: BookingRecord[] = [
  {
    id: "booking-prague-1",
    reference: "JILIT-849204",
    atolCertificate: "ATOL-9822-49102",
    bookingDate: "04 October 2025",
    tourId: "prague-christmas",
    tourTitle: "Prague Christmas Tour — Festive Season 2025",
    destination: "Prague, Czech Republic & Bohemian Old Town",
    duration: "4 Days / 3 Nights",
    travelWindow: "Friday 05 Dec – Monday 08 Dec 2025",
    lodging: "Grand Hotel Bohemia (4★ Superior Heritage)",
    chauffeur: "Václav Havel Airport (PRG) ↔ Grand Hotel Bohemia (Private Mercedes V-Class)",
    party: {
      adults: 2,
      children: 1,
      infants: 0,
      leadPassenger: {
        title: "Mr.",
        firstName: "James",
        lastName: "Holloway",
        email: "james.holloway@example.co.uk",
        phone: "+44 7700 900142",
      },
      guest2: {
        title: "Mrs.",
        firstName: "Eleanor",
        lastName: "Holloway",
        email: "eleanor.h@example.co.uk",
      },
      guest3: {
        title: "Master",
        firstName: "Thomas",
        lastName: "Holloway",
        age: 8,
        citizenship: "UK Citizen",
      },
    },
    specialRequests:
      "1 Double Bed + 1 Premium Rollaway Bed confirmed in Family Suite. 1 Vegetarian menu profile noted for Prague Castle festive banquet. 1x Group-2 booster seat allocated for executive Mercedes airport chauffeur transfers.",
    paymentScheme: "full",
    financials: {
      adultRate: 700,
      childRate: 675,
      totalPaidToday: 2075,
      remainingBalance: 0,
      paymentMethod: "Visa ending 4092",
      authCode: "#AUTH-78329",
    },
    status: "CONFIRMED & BONDED",
  },
];

// API: Get all bookings
app.get("/api/bookings", (_req, res) => {
  res.json({ success: true, bookings });
});

// API: Create new booking
app.post("/api/bookings", (req, res) => {
  const data = req.body;
  const newRefNumber = Math.floor(100000 + Math.random() * 900000);
  const newAtolNum = Math.floor(10000 + Math.random() * 90000);
  const todayStr = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const newBooking: BookingRecord = {
    id: `booking-${Date.now()}`,
    reference: `JILIT-${newRefNumber}`,
    atolCertificate: `ATOL-9822-${newAtolNum}`,
    bookingDate: todayStr,
    tourId: data.tourId || "prague-christmas",
    tourTitle: data.tourTitle || "Prague Christmas Tour — Festive Season 2025",
    destination: data.destination || "Prague, Czech Republic & Bohemian Old Town",
    duration: data.duration || "4 Days / 3 Nights",
    travelWindow: data.travelWindow || "Friday 05 Dec – Monday 08 Dec 2025",
    lodging: data.lodging || "Grand Hotel Bohemia (4★ Superior Heritage)",
    chauffeur:
      data.chauffeur ||
      "Václav Havel Airport (PRG) ↔ Grand Hotel Bohemia (Private Mercedes V-Class)",
    party: data.party || {
      adults: data.adults || 2,
      children: data.children || 0,
      infants: data.infants || 0,
      leadPassenger: data.leadPassenger || {
        title: "Mr.",
        firstName: "James",
        lastName: "Holloway",
        email: "james.holloway@example.co.uk",
        phone: "+44 7700 900142",
      },
    },
    specialRequests:
      data.specialRequests ||
      "Twin beds requested. Chauffeur booster seat arranged.",
    paymentScheme: data.paymentScheme || "full",
    financials: data.financials || {
      adultRate: 700,
      childRate: 675,
      totalPaidToday: data.totalPaidToday || 2075,
      remainingBalance: data.remainingBalance || 0,
      paymentMethod: data.paymentMethod || "Visa ending 4092",
      authCode: `#AUTH-${Math.floor(10000 + Math.random() * 90000)}`,
    },
    status: "CONFIRMED & BONDED",
  };

  bookings.unshift(newBooking);
  res.json({ success: true, booking: newBooking });
});

// API: UK Concierge with Gemini-4-Argon & High Thinking
app.post("/api/concierge/chat", async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemPrompt = `You are the Senior Bespoke Concierge & Head of Client Care at JILIT Holidays, an esteemed British luxury tour operator and executive transfer provider based at 120 Pall Mall, St. James's, London SW1Y 5ED.
Licensed and protected under ATOL Bond #9822 and ABTA #Y6841.

Your role:
- Offer authoritative, highly knowledgeable, bespoke travel consultation to British travellers planning luxury European seasonal holidays (e.g. Prague Christmas Tour, Swiss Alpine Winter Wonderland, Vienna Imperial Strauss Gala, Budapest Thermal Lights, Lapland Arctic Auroras, Bavarian Castles) and executive UK airport chauffeur transfers (Heathrow, Gatwick, Manchester, Birmingham, Stansted, Edinburgh).
- Provide nuanced logistics: optimum departure dates, private Mercedes chauffeur pickups, luggage allowances, Schengen 90-day and passport 10-year validity rules, dress codes for historic venues like Prague's Boccaccio Hall or Vienna's Kursalon, tailored dietary plans (halal, vegetarian, allergy protocols), and 0% APR split-deposit payment schedules.
- Maintain a warm, polished, reassuringly British editorial tone: professional, discreet, discerning, and deeply helpful.
- When answering complex requests (e.g. creating a tailored 5-day multi-city itinerary, advising on family travel with kids and elderly relatives, or planning romantic bespoke proposals), structure your response elegantly with clear subheadings, highlighted inclusions, and estimated budgets.

Current App Context:
${context ? JSON.stringify(context, null, 2) : "User is exploring JILIT Holidays' winter and spring collections."}`;

    // Format chat contents
    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role === "assistant" ? "model" : "user",
          parts: [{ text: turn.content }],
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    let replyText = "";
    let modelUsed = "gemini-4-argon";

    try {
      // Primary model: gemini-4-argon with ThinkingLevel.HIGH (No maxOutputTokens set)
      const response = await ai.models.generateContent({
        model: "gemini-4-argon",
        contents,
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
          systemInstruction: systemPrompt,
        },
      });
      replyText = response.text || "";
    } catch (primaryErr: any) {
      console.warn("Primary gemini-4-argon call failed, falling back to gemini-3.8-flash:", primaryErr?.message);
      modelUsed = "gemini-3.8-flash";
      const fallbackResponse = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: systemPrompt,
        },
      });
      replyText = fallbackResponse.text || "";
    }

    return res.json({
      success: true,
      reply: replyText,
      model: modelUsed,
      thinkingEnabled: true,
    });
  } catch (err: any) {
    console.error("Concierge API error:", err);
    return res.status(500).json({
      error: "Our UK Concierge desk is experiencing high demand. Please try again or call our London Pall Mall office directly on 0800 456 7890.",
      details: err?.message,
    });
  }
});

// API: Airport Transfer Live Fare Estimator
app.post("/api/transfers/quote", (req, res) => {
  const { pickupPostcode, airport, vehicleType, passengers, luggage } = req.body;

  const baseRates: Record<string, number> = {
    LHR: 95, // London Heathrow
    LGW: 110, // London Gatwick
    STN: 125, // London Stansted
    MAN: 85, // Manchester
    BHX: 80, // Birmingham
    EDI: 75, // Edinburgh
  };

  const vehicleMultipliers: Record<string, number> = {
    executive_saloon: 1.0, // Mercedes E-Class
    first_class: 1.6, // Mercedes S-Class
    executive_mpv: 1.4, // Mercedes V-Class Extra-Long
  };

  const airportKey = airport || "LHR";
  const base = baseRates[airportKey] || 95;
  const mult = vehicleMultipliers[vehicleType] || 1.0;
  const total = Math.round(base * mult);

  res.json({
    success: true,
    quote: {
      airport: airportKey,
      vehicleType: vehicleType || "executive_saloon",
      vehicleName:
        vehicleType === "first_class"
          ? "Mercedes-Benz S-Class (First Class)"
          : vehicleType === "executive_mpv"
            ? "Mercedes-Benz V-Class Extra-Long"
            : "Mercedes-Benz E-Class Executive",
      passengers: passengers || 2,
      luggage: luggage || 2,
      price: total,
      currency: "GBP",
      inclusions: [
        "Complimentary 60-minute wait time after flight touchdown",
        "Live flight radar tracking & automatic delay adjustment",
        "Uniformed professional British chauffeur",
        "Bottled mineral water & onboard Wi-Fi",
        "All airport drop-off & terminal barrier tolls included",
      ],
    },
  });
});

// Mount Vite or serve static files
async function startServer() {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JILIT Holidays server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
