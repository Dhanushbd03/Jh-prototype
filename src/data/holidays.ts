export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  country: string;
  category: 'Christmas Markets' | 'Alpine & Snow' | 'Cultural & Heritage' | 'Thermal Spas & River' | 'Northern Lights';
  badge?: string;
  duration: string;
  durationDays: number;
  highlightTag: string;
  image: string;
  secondaryImage?: string;
  hotelImage?: string;
  pricePerPerson: number;
  depositPerPerson: number;
  description: string;
  hotel: string;
  hotelStars: number;
  hotelAddress: string;
  roomType: string;
  chauffeurIncluded: string;
  inclusions: string[];
  excluded: string[];
  departureDates: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    inclusions: string[];
  }[];
  gallery: {
    title: string;
    image: string;
  }[];
}

export const HOLIDAY_PACKAGES: TourPackage[] = [
  {
    id: "prague-christmas",
    title: "Prague Christmas Tour",
    destination: "Prague, Czech Republic & Bohemian Old Town",
    country: "Czech Republic",
    category: "Christmas Markets",
    badge: "Featured Festive Special",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    highlightTag: "Flights & Transfer Included",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6WqospWwSgExZUMweUwNKsQ82LssXNhAZz9KIttWBMfEbo63HqL4R9TPPYAKHbegENUf7PH_LKdUeDvsQhSeK4WsmvplKlxCmu9vkmPglN8Z1SYAr9NiVySlHeE1CcVpWtpP6s-OkFiNI7FGjn2iJtPYaWqn6B5SF81bmmu6MPIFKCTBTfbE8lnh6Wnu_UCNlaaHv-U8pf7pOWo7LUwlscV2Onkkrezqwvceum3yp8w4-00rAePiDWg",
    secondaryImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbW57fhvFl2UoTwR6Z4SXdVgy2Q0Y-DsBsMeMTPINm615w5QWtOYbAps96UU3SvNojcPT3vzIVyNP20zuSaeomSYnXJ7Aqy15rppqQlELa6yrp4DCVywtpZ83tlW8XsZKud0spfq1TpMFGUqnfXH2DBrQtiOudDN3SWu9HpO2DDiXF7jX-my0QWINylh1QhSTFqRzCCsCKVASR693MsuqVnbVjPziy2Q6vNK_aRT1pQBpUKNyWDsDlbA",
    hotelImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFw9C2pL474Ag6iwVvU4CKXtvgerEomTtCSCdhZuIz0knMcMwSxiBx3eNh9RJ1399iEUqvX8ytsPMO1kxUVKG-xdsNLpqh_11WD-2LABSocGJ6Y9HubiGNEAMYs9794PrBvXzxc0_dRm7T4NbvO2MAdzmUEtKn6Rclh1M5orlmzUqcS-7dX4dPGvxnA0lc2-ZJF3SzylsS0YzoKbq1CQl7ErmgykcGBpswQlWfm31shGp7tfSlMx9dLQ",
    pricePerPerson: 700,
    depositPerPerson: 450,
    description: "Enchanting Bohemian festive atmosphere with private Old Town market tour, VIP classical gala concert, and heritage hotel.",
    hotel: "Grand Hotel Bohemia (4★ Superior Heritage)",
    hotelStars: 4,
    hotelAddress: "Králodvorská 4, Prague 1 Old Town",
    roomType: "Executive Heritage Family Suite / Deluxe King",
    chauffeurIncluded: "Václav Havel Airport (PRG) ↔ Grand Hotel Bohemia (Private Mercedes V-Class)",
    inclusions: [
      "3 Nights Luxury Accommodation: 4★ Superior Grand Hotel Bohemia with full hot gourmet buffet breakfast",
      "Return Airport Transfers: Private chauffeured Mercedes-Benz directly between PRG Airport & hotel",
      "Resident English Historian: Guided 3.5-hour Old Town, Jewish Quarter & Charles Bridge historical tour",
      "Advent Classical Concert: Premium seat ticket for the chamber evening recital at St. Nicholas",
      "Market Culinary Experience: Hot Bohemian spiced wine (svařák), craft roasted gingerbread, and chimney cake tasting",
      "24/7 UK Concierge: Direct London & Prague dedicated coordinator assistance on call"
    ],
    excluded: [
      "International Flights: Flexible departures from London Heathrow, Gatwick, Manchester, or Edinburgh available as an add-on during booking",
      "Personal Travel Insurance: Comprehensive winter travel cover is recommended",
      "Optional Excursion: Full-day private guided coach trip to medieval Český Krumlov (optional £85 supplement)",
      "Lunches & Dinners: Except for tasting tastings and morning luxury breakfasts, allowing you freedom to sample Prague's Michelin and classic taverns"
    ],
    departureDates: [
      "05 Dec – 08 Dec 2025 (Limited — 4 seats left)",
      "12 Dec – 15 Dec 2025 (Guaranteed Departure)",
      "19 Dec – 22 Dec 2025 (Festive Peak)",
      "09 Jan – 12 Jan 2026 (Winter Classic)",
      "16 Jan – 19 Jan 2026 (Available)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Prague & Evening Market Welcome",
        description: "Upon clearing Prague Václav Havel Airport, your private chauffeur greets you in arrivals with executive meet-and-assist and transports you swiftly across the city in a luxury Mercedes saloon directly to the Grand Hotel Bohemia. Check into your heritage room, unwind with artisan welcome chocolates, and join your British tour host at 18:30 for a festive welcome reception in the hotel's Boccaccio ballroom. We take our first gentle evening stroll into Old Town Square, watching the giant 22-metre spruce tree sparkle as classical carols echo through the cobblestones.",
        inclusions: ["Private Airport Transfer", "Welcome Reception & Mulled Wine", "Evening Orientation Stroll"]
      },
      {
        day: 2,
        title: "Historic Old Town, Charles Bridge & Castle District",
        description: "After a leisurely artisan breakfast in the neo-Baroque salon, embark on a private walking tour led by our resident Oxford-educated architectural historian. Discover hidden passageways through the historic Jewish Quarter, touch the ancient masonry of the 14th-century Charles Bridge beneath morning mist, and ascend the Royal Route to Prague Castle and St. Vitus Cathedral. Afternoon is at leisure to wander the artisan chalets of Wenceslas Square.",
        inclusions: ["3.5-hr Private Historian Tour", "Fast-Track Prague Castle Pass", "Traditional Trdelník Tasting"]
      },
      {
        day: 3,
        title: "Advent Classical Concert & Artisan Markets",
        description: "Morning dedicated to festive shopping among master woodcarvers and glassblowers in the Old Town chalets. In the afternoon, enjoy private access to the Mirror Chapel or St. Nicholas Church for an exclusive advent chamber recital featuring the works of Mozart and Dvořák played on period instruments. An exquisite evening follows with optional reservations at Prague's premier riverside restaurants.",
        inclusions: ["Reserved Front-Nave Concert Seats", "Boccaccio Historic Hall Entry", "Afternoon Tea & Pastries"]
      },
      {
        day: 4,
        title: "River Vltava Morning Stroll & Homeward Journey",
        description: "Savour a final indulgent breakfast of Bohemian pastries and champagne. Enjoy a peaceful riverside morning overlooking the swans along the Vltava and Kampa Island before your private Mercedes transfer departs for Prague Airport, connecting smoothly with your scheduled flight back to the United Kingdom.",
        inclusions: ["Champagne Breakfast Buffet", "Private Mercedes Airport Chauffeur", "VIP Departure Assistance"]
      }
    ],
    gallery: [
      {
        title: "Charles Bridge at Snowfall",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbW57fhvFl2UoTwR6Z4SXdVgy2Q0Y-DsBsMeMTPINm615w5QWtOYbAps96UU3SvNojcPT3vzIVyNP20zuSaeomSYnXJ7Aqy15rppqQlELa6yrp4DCVywtpZ83tlW8XsZKud0spfq1TpMFGUqnfXH2DBrQtiOudDN3SWu9HpO2DDiXF7jX-my0QWINylh1QhSTFqRzCCsCKVASR693MsuqVnbVjPziy2Q6vNK_aRT1pQBpUKNyWDsDlbA"
      },
      {
        title: "Prague Castle Night Panorama",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6WqospWwSgExZUMweUwNKsQ82LssXNhAZz9KIttWBMfEbo63HqL4R9TPPYAKHbegENUf7PH_LKdUeDvsQhSeK4WsmvplKlxCmu9vkmPglN8Z1SYAr9NiVySlHeE1CcVpWtpP6s-OkFiNI7FGjn2iJtPYaWqn6B5SF81bmmu6MPIFKCTBTfbE8lnh6Wnu_UCNlaaHv-U8pf7pOWo7LUwlscV2Onkkrezqwvceum3yp8w4-00rAePiDWg"
      },
      {
        title: "Traditional Trdelník Baking",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFw9C2pL474Ag6iwVvU4CKXtvgerEomTtCSCdhZuIz0knMcMwSxiBx3eNh9RJ1399iEUqvX8ytsPMO1kxUVKG-xdsNLpqh_11WD-2LABSocGJ6Y9HubiGNEAMYs9794PrBvXzxc0_dRm7T4NbvO2MAdzmUEtKn6Rclh1M5orlmzUqcS-7dX4dPGvxnA0lc2-ZJF3SzylsS0YzoKbq1CQl7ErmgykcGBpswQlWfm31shGp7tfSlMx9dLQ"
      },
      {
        title: "Artisan Market Wooden Chalets",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6WqospWwSgExZUMweUwNKsQ82LssXNhAZz9KIttWBMfEbo63HqL4R9TPPYAKHbegENUf7PH_LKdUeDvsQhSeK4WsmvplKlxCmu9vkmPglN8Z1SYAr9NiVySlHeE1CcVpWtpP6s-OkFiNI7FGjn2iJtPYaWqn6B5SF81bmmu6MPIFKCTBTfbE8lnh6Wnu_UCNlaaHv-U8pf7pOWo7LUwlscV2Onkkrezqwvceum3yp8w4-00rAePiDWg"
      }
    ]
  },
  {
    id: "swiss-alpine",
    title: "Swiss Alpine Winter Wonderland",
    destination: "Zermatt & Lucerne, Switzerland",
    country: "Switzerland",
    category: "Alpine & Snow",
    badge: "Alpine Signature",
    duration: "6 Days / 5 Nights",
    durationDays: 6,
    highlightTag: "1st Class Rail Included",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpleoyNK_alywSiBwf8Ha5ksOyypDGBDxAmdBA7bERDAclxWjyw3K1aZzNPe-Vq37u6q8tmKrMCBtn24xFC1eIgUl4l4s6EeRg331lyX_q1daTf5J9g-C_Zq_GE_Ctat67DpJawCWirw_AM-tgP6u_4DlfHMS8P7l7nZi9xacQlcGDYZSxOFGR6tSIEamGqWvNsqvHOV0Y5N_0a--eVQ-cZXF4L95UAzyzEhHUVZGHA9Qitcroky7Mmw",
    pricePerPerson: 1150,
    depositPerPerson: 450,
    description: "Panoramic Glacier Express 1st class journey through snow-capped valleys, paired with 5-star mountain chalet stays.",
    hotel: "Mont Cervin Palace (5★ Luxury Zermatt)",
    hotelStars: 5,
    hotelAddress: "Bahnhofstrasse 31, 3920 Zermatt",
    roomType: "Alpine Prestige Suite with Matterhorn Balcony",
    chauffeurIncluded: "Zurich Airport ↔ Lucerne ↔ Zermatt Electro-Limousine",
    inclusions: [
      "Glacier Express Excellence / 1st Class Panoramic Rail pass",
      "5★ Luxury Chalet & Alpine Spa access with Matterhorn views",
      "Daily 4-course Alpine gourmet dinner & champagne breakfast",
      "Private Gornergrat mountain railway cogwheel excursion",
      "Luggage transfer service directly between hotels"
    ],
    excluded: [
      "International flights to Zurich/Geneva (available on request)",
      "Ski equipment rental and lift passes",
      "Discretionary personal gratuities"
    ],
    departureDates: [
      "10 Dec – 15 Dec 2025",
      "08 Jan – 13 Jan 2026",
      "22 Jan – 27 Jan 2026",
      "05 Feb – 10 Feb 2026"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Zurich & Scenic Transit to Lucerne",
        description: "Meet your Swiss rail host in Zurich and glide alongside Lake Lucerne to your grand lakeside hotel.",
        inclusions: ["Swiss Travel Pass 1st Class", "Lakeside Welcome Cocktail"]
      },
      {
        day: 2,
        title: "Glacier Express to Zermatt",
        description: "Board the legendary Glacier Express through the Rhine Gorge and Oberalp Pass with 3-course wine-paired lunch.",
        inclusions: ["Glacier Express 1st Class", "Onboard Gourmet Dining"]
      },
      {
        day: 3,
        title: "Matterhorn Panoramic Expedition",
        description: "Ride the Gornergrat railway to 3,089m with jaw-dropping views of 29 peaks exceeding 4,000m.",
        inclusions: ["Gornergrat Pass", "Alpine Fondue Luncheon"]
      },
      {
        day: 4,
        title: "Day of Alpine Leisure & Spa",
        description: "Rejuvenate in the outdoor heated thermal brine pools looking directly upon the Matterhorn.",
        inclusions: ["Mont Cervin Spa Day", "Afternoon Glühwein Tasting"]
      },
      {
        day: 5,
        title: "Historic Valais Heritage Village & Chocolate Tasting",
        description: "Explore preserved sun-weathered larchwood granaries and artisan Swiss chocolatier workshops.",
        inclusions: ["Private Village Walk", "Artisan Chocolate Masterclass"]
      },
      {
        day: 6,
        title: "Homeward Rail Connection to Zurich",
        description: "Enjoy a scenic descent through the Visp valley connecting smoothly to Zurich Airport for your UK flight.",
        inclusions: ["Express Rail Transfer", "Airport Lounge Access"]
      }
    ],
    gallery: [
      {
        title: "Glacier Express over Landwasser Viaduct",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpleoyNK_alywSiBwf8Ha5ksOyypDGBDxAmdBA7bERDAclxWjyw3K1aZzNPe-Vq37u6q8tmKrMCBtn24xFC1eIgUl4l4s6EeRg331lyX_q1daTf5J9g-C_Zq_GE_Ctat67DpJawCWirw_AM-tgP6u_4DlfHMS8P7l7nZi9xacQlcGDYZSxOFGR6tSIEamGqWvNsqvHOV0Y5N_0a--eVQ-cZXF4L95UAzyzEhHUVZGHA9Qitcroky7Mmw"
      }
    ]
  },
  {
    id: "vienna-strauss",
    title: "Vienna Imperial Christmas & Strauss Gala",
    destination: "Vienna, Austria",
    country: "Austria",
    category: "Christmas Markets",
    badge: "Imperial Highlight",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    highlightTag: "Gala Included",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD06NRs8Bpz7A58neAnH2oLvkWPRBzkT-LphZ7vnPfScf5ufrNUCTeiJlhJOGbtbi071xiuzXSQDnjiZpXRh7SV2P-hSPI8o7ygnIUphe7jlGvHyAjkDJUOZ-ig2ntbKAkRj5b8vfg3KDyGCoF35mzjuBj7nElkQaq6IQqI0MS1T9pCXkz8UL3nUEWIQy6jMKc2sbuKlaqoKMQ_ux166MIl4gG1YEc3DaGWNZubzVPYjky1ivdwJDKZ4Q",
    pricePerPerson: 780,
    depositPerPerson: 450,
    description: "Regal Habsburg splendour, private guided access to Schönbrunn Palace, and an evening Strauss orchestra performance.",
    hotel: "Hotel Sacher Wien (5★ Historic)",
    hotelStars: 5,
    hotelAddress: "Philharmoniker Str. 4, 1010 Wien",
    roomType: "Deluxe Junior Suite with Opera Views",
    chauffeurIncluded: "Vienna International (VIE) ↔ Hotel Sacher (Private Chauffeur)",
    inclusions: [
      "Habsburg Palace & Belvedere Private Guided Tour",
      "Category 1 Reserved Strauss & Mozart Kursalon Concert Ticket",
      "Viennese Mulled Wine & Sachertorte Tasting Experience",
      "4 Nights in 5★ Historic Ringstrasse Luxury Hotel",
      "Private Mercedes airport transfers included"
    ],
    excluded: ["Return UK flights", "Personal shopping expenses"],
    departureDates: ["02 Dec – 06 Dec 2025", "09 Dec – 13 Dec 2025", "16 Dec – 20 Dec 2025"],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Imperial Vienna",
        description: "Arrive in style with private limousine transfer to Hotel Sacher.",
        inclusions: ["Airport Transfer", "Original Sachertorte Welcome"]
      },
      {
        day: 2,
        title: "Schönbrunn Palace & Rathausplatz Markets",
        description: "Private guided entry to imperial apartments followed by the majestic Christmas market.",
        inclusions: ["VIP Palace Entry", "Market Glühwein Mug"]
      },
      {
        day: 3,
        title: "Strauss & Mozart Chamber Orchestra Gala",
        description: "An enchanting musical evening in the historic Kursalon Vienna.",
        inclusions: ["Front-Row Gala Ticket", "Champagne Intermission"]
      },
      {
        day: 4,
        title: "Belvedere Baroque Masterpieces & St. Stephen's",
        description: "Admire Gustav Klimt's 'The Kiss' and hear the great organ of St. Stephen's Cathedral.",
        inclusions: ["Belvedere Gallery Ticket", "Cathedral Private Access"]
      },
      {
        day: 5,
        title: "Homeward Chauffeur Transfer",
        description: "Morning at leisure before private airport transfer.",
        inclusions: ["Private Departure Chauffeur"]
      }
    ],
    gallery: [
      {
        title: "Rathausplatz Christmas Market at Dusk",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD06NRs8Bpz7A58neAnH2oLvkWPRBzkT-LphZ7vnPfScf5ufrNUCTeiJlhJOGbtbi071xiuzXSQDnjiZpXRh7SV2P-hSPI8o7ygnIUphe7jlGvHyAjkDJUOZ-ig2ntbKAkRj5b8vfg3KDyGCoF35mzjuBj7nElkQaq6IQqI0MS1T9pCXkz8UL3nUEWIQy6jMKc2sbuKlaqoKMQ_ux166MIl4gG1YEc3DaGWNZubzVPYjky1ivdwJDKZ4Q"
      }
    ]
  },
  {
    id: "budapest-thermal",
    title: "Budapest Thermal Lights & Danube Cruise",
    destination: "Budapest, Hungary",
    country: "Hungary",
    category: "Thermal Spas & River",
    badge: "Wellness Escape",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    highlightTag: "Danube Cruise Included",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMsJ1MoB1GbT2iHok6btt3vcyU0m5HHb7JuRG0iN_ZYHmkP-_f1E-6-LF-3J_GyZAli2pWJe5O4pu9HRBCpgCW-zzRn_nXbrIvTly-TmBpKbQuGrN4m3FCfrH1oYhJUV9Zrm0C9ijSD-CsHVgSOloxTf266KgJnHg4mpsmFmzYsxSsqdLKShD-GL_SqjUgzQIHCUazc2tmLU5rbnqmdOmG1thjDNg6T3Gpkwsa69uzZUvP7zAQnR0hOg",
    pricePerPerson: 620,
    depositPerPerson: 450,
    description: "Steamy mineral soaks in historic Neo-Baroque baths followed by a candlelit evening river cruise under illuminated bridges.",
    hotel: "Aria Hotel Budapest by Library Hotel Collection (5★)",
    hotelStars: 5,
    hotelAddress: "Hercegprímás u. 5, 1051 Budapest",
    roomType: "Opera Suite with High Ceilings",
    chauffeurIncluded: "Budapest Ferenc Liszt (BUD) ↔ Aria Hotel",
    inclusions: [
      "Széchenyi Thermal Baths VIP Fast-Track Cabin Pass",
      "Evening Danube Champagne Cruise under illuminated Parliament",
      "4★ Riverside Boutique Hotel accommodation",
      "St. Stephen's Basilica Christmas Market Guided Tasting",
      "Private Mercedes airport transfers included"
    ],
    excluded: ["UK flights", "Optional spa massages"],
    departureDates: ["04 Dec – 07 Dec 2025", "11 Dec – 14 Dec 2025", "15 Jan – 18 Jan 2026"],
    itinerary: [
      {
        day: 1,
        title: "Arrival along the Danube",
        description: "Private chauffeur greeting and evening rooftop welcome cocktail.",
        inclusions: ["Airport Chauffeur", "Rooftop Welcome Drink"]
      },
      {
        day: 2,
        title: "Buda Castle, Fisherman's Bastion & Széchenyi Soaks",
        description: "Spectacular panoramic city views followed by steamy natural thermal mineral pools.",
        inclusions: ["VIP Spa Cabin Access", "Funicular Railway Ticket"]
      },
      {
        day: 3,
        title: "Artisan Markets & Candlelit Danube Cruise",
        description: "Shop Vörösmarty Square chalets and board an intimate private yacht along the river.",
        inclusions: ["Private Boat Charter", "Champagne & Canapés"]
      },
      {
        day: 4,
        title: "Central Market Hall & Farewell",
        description: "Pick up authentic paprika and Tokaji wine before airport transfer.",
        inclusions: ["Market Food Tasting", "Departure Chauffeur"]
      }
    ],
    gallery: [
      {
        title: "Illuminated Parliament across the Danube",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMsJ1MoB1GbT2iHok6btt3vcyU0m5HHb7JuRG0iN_ZYHmkP-_f1E-6-LF-3J_GyZAli2pWJe5O4pu9HRBCpgCW-zzRn_nXbrIvTly-TmBpKbQuGrN4m3FCfrH1oYhJUV9Zrm0C9ijSD-CsHVgSOloxTf266KgJnHg4mpsmFmzYsxSsqdLKShD-GL_SqjUgzQIHCUazc2tmLU5rbnqmdOmG1thjDNg6T3Gpkwsa69uzZUvP7zAQnR0hOg"
      }
    ]
  },
  {
    id: "lapland-auroras",
    title: "Lapland Arctic Auroras & Glass Igloos",
    destination: "Rovaniemi, Finland",
    country: "Norway & Lapland",
    category: "Northern Lights",
    badge: "Arctic Premium",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    highlightTag: "Glass Igloo Stay",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYHLEolMrerZAALqgQxXzgUBHbW-cPwfzDUbPxNT-rruYC76nLhVH077ZSKLKsUWjZCsCjVzbMaDrMBvNdDHYoJpGJb8AxRoGz8WmpOjNt2Fja2Rm0i7vA3Ropx7p3AsXx85CRzbaad9P7nUHl5eo1bxEYwXw4-YsVZBPx36BHoQ3gkMjcVU1qO19DNR94BApAMI7SHWpvoeciw7GUvSwhhn6q05kNr2-CTV38JiaX2y-tmNOBcfLICg",
    pricePerPerson: 1490,
    depositPerPerson: 450,
    description: "Sleep under celestial emerald ribbons in a heated panoramic glass igloo with guided husky sledding and reindeer farm safari.",
    hotel: "Arctic TreeHouse & Kakslauttanen Glass Igloos",
    hotelStars: 5,
    hotelAddress: "Tarvantie 3, 96930 Rovaniemi, Finland",
    roomType: "Heated Aurora Glass Igloo with Motorised Star Bed",
    chauffeurIncluded: "Rovaniemi Airport (RVN) ↔ Arctic Resort 4x4 Chauffeur",
    inclusions: [
      "2 Nights in Heated Panoramic Glass Igloo + 2 Nights Luxury Chalet",
      "Wilderness Husky Sled Expedition (10km)",
      "Reindeer Sleigh Safari with Sámi Storyteller",
      "Nightly Aurora Borealis Chase Guides with Professional DSLR Photography",
      "Full Thermal Winter Gear Provided (Boots, Wool Socks, Mittens, Parka)"
    ],
    excluded: ["UK flights", "Alcoholic beverages beyond welcome dinner"],
    departureDates: ["14 Nov – 19 Nov 2025", "03 Dec – 08 Dec 2025", "18 Jan – 23 Jan 2026", "10 Feb – 15 Feb 2026"],
    itinerary: [
      {
        day: 1,
        title: "Arrive into Winter Wonderland",
        description: "Fly into the Arctic Circle. Meet your private guide and check into your glass igloo.",
        inclusions: ["Airport 4x4 Chauffeur", "Thermal Gear Fitting", "Aurora Watch Alert"]
      },
      {
        day: 2,
        title: "Siberian Husky Sledding & Pine Forest Trail",
        description: "Drive your own dog team across frozen lakes and pristine taiga wilderness.",
        inclusions: ["Husky Safari", "Campfire Berry Juice & Salmon Soup"]
      },
      {
        day: 3,
        title: "Reindeer Farm & Traditional Lappish Dinner",
        description: "Feed reindeer moss and learn ancestral Sámi traditions inside a cozy kota.",
        inclusions: ["Reindeer Sleigh Ride", "Traditional 3-Course Dinner"]
      },
      {
        day: 4,
        title: "Snowmobile Aurora Quest",
        description: "Traverse high fell ridges chasing clear skies for spectacular aurora sightings.",
        inclusions: ["Snowmobile Safari", "Professional Astrophotography"]
      },
      {
        day: 5,
        title: "Farewell to Santa's Arctic Kingdom",
        description: "Morning sauna ritual before your transfer to Rovaniemi Airport.",
        inclusions: ["Traditional Wood Sauna", "Airport Chauffeur Transfer"]
      }
    ],
    gallery: [
      {
        title: "Emerald Aurora dancing over pine forest",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYHLEolMrerZAALqgQxXzgUBHbW-cPwfzDUbPxNT-rruYC76nLhVH077ZSKLKsUWjZCsCjVzbMaDrMBvNdDHYoJpGJb8AxRoGz8WmpOjNt2Fja2Rm0i7vA3Ropx7p3AsXx85CRzbaad9P7nUHl5eo1bxEYwXw4-YsVZBPx36BHoQ3gkMjcVU1qO19DNR94BApAMI7SHWpvoeciw7GUvSwhhn6q05kNr2-CTV38JiaX2y-tmNOBcfLICg"
      }
    ]
  },
  {
    id: "bavarian-castles",
    title: "Bavarian Castles & Nuremberg Markets",
    destination: "Munich & Nuremberg, Germany",
    country: "Germany",
    category: "Christmas Markets",
    badge: "Heritage Classic",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    highlightTag: "Castle Entry Included",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7uZpTToUx8bdZrdjQRpSWx4dGW_tBSOcH-hX57T--BwAXuZgHqeUufgQuuo3gimP1dk3CgzANykJjOneLLvuQXJ1bS0bh_c6zEs9t0I3rO7BsC5bwbD4me4IXtlNGSJE51Z4vYJvGpKPm6PrZlGXlSHLRXQ-_gj5WTLOllksm1f3MJ5nfGN-82z72DweMnwLtRXmanoIKJT9bhtWC6BBd3-OFdvnHF_Nm9Oizt4N4Qz-zwcLBkK2kug",
    pricePerPerson: 840,
    depositPerPerson: 450,
    description: "Fairytale Alpine castles of King Ludwig II combined with Europe’s oldest Christkindlesmarkt and authentic Bavarian banquets.",
    hotel: "Hotel Vier Jahreszeiten Kempinski Munich (5★)",
    hotelStars: 5,
    hotelAddress: "Maximilianstraße 17, 80539 München",
    roomType: "Grand Deluxe Room with Courtyard Views",
    chauffeurIncluded: "Munich Airport (MUC) ↔ Kempinski Munich & DB ICE 1st Class",
    inclusions: [
      "Neuschwanstein Castle Guided VIP Pass (Skip the Lines)",
      "Deutsche Bahn High-Speed ICE 1st Class Rail Connections",
      "Authentic 3-Course Bavarian Dinners in Historic Beer Halls",
      "Nuremberg Christkindlesmarkt Private Historical Walk",
      "Private Mercedes airport chauffeur in Munich"
    ],
    excluded: ["UK flights", "Personal purchases of Lebkuchen"],
    departureDates: ["28 Nov – 02 Dec 2025", "05 Dec – 09 Dec 2025", "12 Dec – 16 Dec 2025"],
    itinerary: [
      {
        day: 1,
        title: "Munich Grand Arrival & Marienplatz Lights",
        description: "Arrive at Munich Airport with private chauffeur transfer to Kempinski Maximilianstraße.",
        inclusions: ["Airport Limousine", "Welcome Weissbier Reception"]
      },
      {
        day: 2,
        title: "Fairytale Neuschwanstein & Hohenschwangau",
        description: "Journey into the Bavarian Alps to visit the royal retreat of King Ludwig II.",
        inclusions: ["VIP Castle Entrance", "Horse-Drawn Carriage Ride"]
      },
      {
        day: 3,
        title: "High-Speed Rail to Nuremberg Christkindlesmarkt",
        description: "Glide on DB ICE 1st class to medieval Nuremberg, famed for golden angel traditions.",
        inclusions: ["1st Class DB Rail", "Original Nuremberg Bratwurst Tasting"]
      },
      {
        day: 4,
        title: "Nymphenburg Palace & Munich Christmas Markets",
        description: "Admire porcelain galleries and stroll Tollwood winter cultural festival.",
        inclusions: ["Palace Admission", "Mulled Feuerzangenbowle"]
      },
      {
        day: 5,
        title: "Homeward Chauffeur Transfer",
        description: "Morning Bavarian breakfast before private Mercedes transfer to Munich Airport.",
        inclusions: ["Private Departure Chauffeur"]
      }
    ],
    gallery: [
      {
        title: "Neuschwanstein Castle in Winter Snow",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7uZpTToUx8bdZrdjQRpSWx4dGW_tBSOcH-hX57T--BwAXuZgHqeUufgQuuo3gimP1dk3CgzANykJjOneLLvuQXJ1bS0bh_c6zEs9t0I3rO7BsC5bwbD4me4IXtlNGSJE51Z4vYJvGpKPm6PrZlGXlSHLRXQ-_gj5WTLOllksm1f3MJ5nfGN-82z72DweMnwLtRXmanoIKJT9bhtWC6BBd3-OFdvnHF_Nm9Oizt4N4Qz-zwcLBkK2kug"
      }
    ]
  }
];
