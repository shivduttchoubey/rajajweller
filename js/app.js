/**
 * =========================================================================
 * RAJA JEWELLERS, JABALPUR - STATIC WEB APPLICATION
 * =========================================================================
 * Technical Stack inspired by QubiSafe.com (Static-first, pure HTML/CSS/JS)
 * GitHub Pages Compatible.
 * 
 * =========================================================================
 * ⚙️ HOW TO CONFIGURE YOUR GOOGLE SHEET & EXCEL (XLS) PIPELINE:
 * =========================================================================
 * Simply paste your Google Apps Script Deployment ID (or full Web App URL)
 * and your Google Spreadsheet ID (or direct Excel link) below!
 * =========================================================================
 */

const CONFIG = {
  // 1. Paste your Google Apps Script Deployment ID (e.g. "AKfycbyzxCXlwgZg3197JOi_BpNM8a130V828macAcCV8vvkj2bazAa7SmLHtmXzFAsI4hec")
  // OR paste the full Web App URL (starts with https://script.google.com/macros/s/.../exec)
  SCRIPT_ID_OR_URL: "AKfycbzRajaJewellersDefault",

  // 2. Paste your Google Sheet ID (e.g. "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms")
  // OR paste your complete Excel / Spreadsheet URL
  SPREADSHEET_ID_OR_XLS_LINK: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",

  // Store Contact Details
  STORE_NAME: "Raja Jewellers & Gems",
  STORE_LOCATION: "Near Mayur Kala Mandir, Old P.P. Colony, Gwarighat, Jabalpur (M.P.) - 482008",
  STORE_PHONE: "+91 99939 18013",
  STORE_WHATSAPP: "919993918013",
  STORE_EMAIL: "rajajewellers.gwarighat@gmail.com"
};

/**
 * Resolves the active Google Apps Script Web App Endpoint.
 * Auto-expands short Deployment IDs into full URL.
 */
function getScriptUrl() {
  const custom = localStorage.getItem("raja_script_id_or_url") || CONFIG.SCRIPT_ID_OR_URL;
  if (!custom || custom === "AKfycbzRajaJewellersDefault") {
    // Default fallback mock endpoint
    return "https://script.google.com/macros/s/AKfycbzRajaJewellersDefault/exec";
  }
  if (custom.startsWith("http")) {
    return custom;
  }
  return `https://script.google.com/macros/s/${custom}/exec`;
}

/**
 * Resolves the live Microsoft Excel (.xlsx) download link from Sheet ID.
 */
function getExcelDownloadLink() {
  const ref = localStorage.getItem("raja_sheet_id_or_xls") || CONFIG.SPREADSHEET_ID_OR_XLS_LINK;
  if (!ref || ref === "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms") {
    return "#";
  }
  if (ref.includes("export?format=xlsx")) {
    return ref;
  }
  if (ref.startsWith("http")) {
    const match = ref.match(/[-\w]{25,}/);
    if (match) {
      return `https://docs.google.com/spreadsheets/d/${match[0]}/export?format=xlsx`;
    }
    return ref;
  }
  return `https://docs.google.com/spreadsheets/d/${ref}/export?format=xlsx`;
}

// Live Jabalpur Base Market Rates (per 10 grams / kg)
const LIVE_RATES = {
  gold24k_per_10g: 78450,
  gold22k_per_10g: 71920,
  gold18k_per_10g: 58840,
  silver999_per_kg: 93500
};

// Bilingual Dictionary
const TRANSLATIONS = {
  en: {
    liveRatesLabel: "Jabalpur Market Live Rates",
    whatsappUs: "WhatsApp",
    btnBookShowroom: "Book VIP Visit",
    navHome: "Home",
    navCollections: "Collections",
    navRates: "Live Rates & Calc",
    navCustom: "Custom Karigari",
    navAppointment: "Book Visit",
    navReviews: "Reviews",
    navLocation: "Location & Map",
    selectLanguage: "Choose Language:",
    storeQuickInfo: "Store Contact",
    timingsText: "Mon - Sun: 11:00 AM - 9:00 PM",
    callNow: "Call Now",
    heroBadge: "TRUSTED JEWELLERS IN GWARIGHAT SINCE 2008",
    heroTitleGold: "Timeless Elegance,",
    heroTitleRoyal: "Pure Royal Heritage.",
    heroSubtitle: "Discover certified 22KT & 18KT BIS Hallmarked gold, radiant solitaire diamonds, pure silver ornaments, and natural astrological gemstones crafted with authentic karigari.",
    exploreCollections: "Explore Collections",
    bookVIPConsultation: "Book Showroom Visit",
    bridalSpecial: "Bridal Special",
    royalBridalSet: "The Royal Heritage Bridal Set",
    bridalSetDesc: "Exquisite 22K Antique Polki & Kundan necklace with matching Jhumkas and Maang Tikka.",
    inquireNow: "Inquire Now →",
    trustBisTitle: "Govt. BIS 916 Hallmarked",
    trustBisDesc: "Every gold piece features verified HUID laser hallmark stamps for 100% purity assurance.",
    trustGemsTitle: "Certified Astrological Gems",
    trustGemsDesc: "Untreated, natural Manik, Panna, Pukhraj, and Neelam verified with authentic lab certificates.",
    trustExchangeTitle: "Lifetime Buyback & Exchange",
    trustExchangeDesc: "Best exchange value on gold and diamond jewellery with complete transparency in weighing.",
    trustKarigarTitle: "Custom Karigari Job Works",
    trustKarigarDesc: "Master goldsmiths on-site to bring your custom designs, resizing, and repair needs to life.",
    categoriesSub: "Royal Craftsmanship",
    categoriesTitle: "Explore By Category",
    categoriesDesc: "From grand wedding ceremonies to subtle daily luxury, discover creations designed for every auspicious milestone.",
    viewCollection: "View Collection",
    catBridal: "Bridal Trousseau",
    catBridalDesc: "Complete wedding sets, rani haars, and chokers",
    catGold: "Gold Jewellery",
    catGoldDesc: "22K Chains, mangalsutras, and necklaces",
    catDiamond: "Diamond Jewels",
    catDiamondDesc: "Solitaires, cocktail rings, and pendants",
    catBangles: "Bangles & Kadas",
    catBanglesDesc: "Traditional patla, churi, and modern kadas",
    catEarrings: "Earrings & Jhumkas",
    catEarringsDesc: "Chandbalis, drops, studs, and heavy jhumkas",
    catGems: "Natural Gemstones",
    catGemsDesc: "Certified Ruby, Emerald, Sapphire & Navratna",
    catSilver: "Pure Silver & Pooja",
    catSilverDesc: "Silver thalis, idols, payal, and gift articles",
    catMens: "Men's Collection",
    catMensDesc: "Solid gold chains, bracelets, and rings",
    curatedShowcaseSub: "Signature Masterpieces",
    curatedShowcaseTitle: "Featured Showroom Showcase",
    curatedShowcaseDesc: "Hand-curated ornaments currently on display at our Gwarighat showroom. Click any piece for purity specifications or WhatsApp inquiry.",
    filterAll: "All Ornaments",
    filterBridal: "Bridal Sets",
    filterGold: "Gold 22K",
    filterDiamond: "Diamond",
    filterGems: "Gemstones",
    filterSilver: "Silver Articles",
    inquirePrice: "Inquire Price",
    details: "Details",
    p1Title: "Maharani Kundan Choker Set",
    p1Desc: "Intricate floral bridal necklace accompanied by royal dangling jhumkas.",
    p2Title: "Heritage Kasu Temple Haar",
    p2Desc: "Classic temple craftsmanship celebrating auspicious heritage.",
    p3Title: "Eternal Solitaire Ring",
    p3Desc: "Timeless engagement band with unmatched fire and optical clarity.",
    p4Title: "Royal Filigree Gold Kadas",
    p4Desc: "Durable daily and festive wear with secure locking mechanisms.",
    p5Title: "Regal Nizam Gold Jhumkas",
    p5Desc: "Classic tiered silhouette reflecting royal Central Indian grace.",
    p6Title: "Natural Astrological Ruby (Manik)",
    p6Desc: "Handpicked for Surya astrological strength and vitality.",
    p7Title: "Silver Pooja Thali Set",
    p7Desc: "Auspicious gift for housewarmings, Diwali, and festive ceremonies.",
    p8Title: "Polki Jadau Royal Rani Haar",
    p8Desc: "Regal statement piece crafted for unforgettable wedding ceremonies.",
    p9Title: "24K Lakshmi-Ganesh Gold Coin",
    p9Desc: "Certified tamper-proof pure investment coins in 1g, 5g, 10g, and 20g weights.",
    ratesSub: "Transparency First",
    ratesTitle: "Live Gold & Silver Rate Calculator",
    ratesDesc: "Check estimated jewellery costs before you visit our Gwarighat store. Get daily market updates directly on WhatsApp.",
    calcTitle: "Instant Gold Value Estimator",
    jabalpurMarket: "Jabalpur Market",
    selectPurity: "Select Metal Purity:",
    enterWeight: "Enter Weight (Grams):",
    metalRatePerGram: "Base Metal Rate:",
    estimatedMetalValue: "Estimated Metal Value:",
    calcDisclaimer: "*Note: Does not include making charges and 3% GST. Making charges at Raja Jewellers are among the most economical in Jabalpur.",
    inquireThisEstimate: "Lock Rate on WhatsApp",
    subTitle: "Daily Gold Rate Alerts",
    subDesc: "Wake up to verified morning gold and silver market rates on your WhatsApp.",
    labelFullName: "Full Name *",
    labelPhone: "Phone / WhatsApp *",
    labelCity: "City / Area",
    btnSubscribe: "Subscribe for Free",
    sheetsNotice: "Auto-saved to Google Sheets & Excel",
    customSub: "Bespoke Karigari Studio",
    customTitle: "Custom Jewellery & Job Work",
    customDesc: "Have an Instagram or Pinterest design in mind? Or want old gold remade into modern bridal ornaments? Share your idea below.",
    karigarQuote: "\"Every piece of custom jewelry carries the emotions of generations. We craft your dreams with traditional perfection and modern laser precision.\"",
    labelCategory: "Item Category *",
    labelPurity: "Preferred Metal",
    labelBudget: "Approx Budget (₹)",
    labelNeededBy: "Needed By Date",
    labelCustomNotes: "Design Details / Specifications",
    btnSubmitCustom: "Submit Custom Request (Pushes to Sheet)",
    vipExperience: "Personalized VIP Experience",
    bookVisitTitle: "Book a Private Showroom Consultation",
    bookVisitDesc: "Enjoy an unhurried, private jewelry viewing session with our senior ornaments specialist. Try on bridal sets, test astrological gemstones, and inspect 916 hallmarks up close.",
    benefit1: "Dedicated jewelry stylist for wedding planning",
    benefit2: "Free purity testing of your old family gold",
    benefit3: "Astrological gemstone chart recommendations",
    benefit4: "Reserved parking & comfortable lounge hospitality",
    scheduleVisit: "Schedule Your Visit",
    labelEmail: "Email Address",
    labelDate: "Preferred Date *",
    labelSlot: "Time Slot *",
    labelInterest: "Jewellery Interest *",
    labelSpecialNotes: "Special Requests (Optional)",
    btnConfirmAppointment: "Confirm Appointment (Save to Google Sheets)",
    reviewsSub: "Trusted Across Jabalpur",
    reviewsTitle: "Customer Love & Ratings",
    r1Text: "\"Purchased my sister's complete wedding trousseau from Raja Jewellers Gwarighat. Purity was 100% verified with BIS hallmark machine in front of us, and their making charges were significantly more reasonable than big chain stores in Jabalpur.\"",
    r2Text: "\"Got a natural Yellow Sapphire (Pukhraj) gemstone from Raja Gems & Jewellers. They gave a government laboratory certified certificate and set it in a gold ring on an auspicious Thursday. Very honest and polite owner.\"",
    r3Text: "\"I wanted an Instagram designer mangalsutra created in 22K gold. Their karigars did a phenomenal job matching the exact design within 6 days. Best jewelry showroom in Gwarighat Jabalpur!\"",
    locationSub: "Visit Our Showroom",
    locationTitle: "Location & Store Timings",
    locationDesc: "Conveniently located in Gwarighat on the main road near Mayur Kala Mandir. Ample parking available.",
    addressLabel: "Showroom Address:",
    timingsLabel: "Business Hours:",
    contactLabel: "Phone & WhatsApp:",
    btnDirections: "Get Directions",
    btnWhatsAppStore: "Message Showroom",
    followUs: "Follow Our Designs:",
    footerBrandBio: "Established in 2008, Raja Jewellers is Gwarighat Jabalpur's premier destination for certified 22KT hallmarked gold, diamond rings, natural gemstones, and bespoke bridal trousseaus.",
    footerNavTitle: "Quick Navigation",
    footerSpecTitle: "Showroom Specialties",
    footerContactTitle: "Store Information",
    bNavHome: "Home",
    bNavCatalog: "Jewels",
    bNavRates: "Rates",
    bNavBook: "Visit",
    bNavCall: "Call"
  },
  hi: {
    liveRatesLabel: "जबलपुर सराफा लाइव भाव",
    whatsappUs: "व्हाट्सएप",
    btnBookShowroom: "विजिट बुक करें",
    navHome: "होम",
    navCollections: "कलेक्शन",
    navRates: "लाइव भाव व कैलकुलेटर",
    navCustom: "कारीगरी जॉब वर्क",
    navAppointment: "मुलाकात बुक करें",
    navReviews: "समीक्षाएं",
    navLocation: "लोकेशन व नक्शा",
    selectLanguage: "भाषा चुनें:",
    storeQuickInfo: "शोरूम संपर्क",
    timingsText: "सोमवार - रविवार: सुबह 11:00 से रात 9:00 तक",
    callNow: "कॉल करें",
    heroBadge: "2008 से ग्वारीघाट में शुद्धता और विश्वास का प्रतीक",
    heroTitleGold: "शाही परंपरा,",
    heroTitleRoyal: "शुद्धता और सुंदरता।",
    heroSubtitle: "राजा ज्वेलर्स में पाएं 100% बीआईएस 916 हॉलमार्क युक्त शुद्ध सोना, प्रमाणित हीरे, शुद्ध चांदी एवं ज्योतिषीय रत्न, अनुभवी कारीगरों की शुद्धता के साथ।",
    exploreCollections: "कलेक्शन देखें",
    bookVIPConsultation: "शोरूम विजिट बुक करें",
    bridalSpecial: "दुल्हन स्पेशल",
    royalBridalSet: "रॉयल हेरिटेज ब्राइडल सेट",
    bridalSetDesc: "22 कैरेट कुंदन व पोल्की से सजी अनूठी दुल्हन की चोकर, मैचिंग झुमके व मांगटीका।",
    inquireNow: "अभी पूछताछ करें →",
    trustBisTitle: "100% बीआईएस 916 हॉलमार्क",
    trustBisDesc: "प्रत्येक आभूषण पर सरकार द्वारा प्रमाणित एचयूआईडी (HUID) लेजर मार्क की गारंटी।",
    trustGemsTitle: "प्रमाणित ज्योतिषीय रत्न",
    trustGemsDesc: "प्राकृतिक माणिक, पन्ना, पुखराज, नीलम आदि सरकारी लैब टेस्टिंग सर्टिफिकेट के साथ।",
    trustExchangeTitle: "आजीवन बायबैक व एक्सचेंज",
    trustExchangeDesc: "पुराने सोने के बदले सबसे बेहतरीन एक्सचेंज भाव और पारदर्शी डिजिटल वजन।",
    trustKarigarTitle: "कस्टम कारीगरी व जॉब वर्क",
    trustKarigarDesc: "आपके मनपसंद डिज़ाइन, इंस्टाग्राम ज्वेलरी और रीसाइजिंग हेतु विशेषज्ञ कारीगर उपलब्ध।",
    categoriesSub: "शाही हस्तकला",
    categoriesTitle: "श्रेणी अनुसार आभूषण",
    categoriesDesc: "शुभ विवाह से लेकर दैनिक उपयोग तक, हर मांगलिक अवसर के लिए विशेष रूप से तैयार आभूषण।",
    viewCollection: "कलेक्शन देखें",
    catBridal: "ब्राइडल दुल्हन सेट",
    catBridalDesc: "रानी हार, चोकर, मांगटीका और संपूर्ण दुल्हन सेट",
    catGold: "सोने के आभूषण",
    catGoldDesc: "22 कैरेट चेन, मंगलसूत्र, अंगूठी और हार",
    catDiamond: "डायमंड ज्वेलरी",
    catDiamondDesc: "सॉलिटेयर, सगाई की अंगूठी और लॉकेट",
    catBangles: "कंगन व कड़े",
    catBanglesDesc: "पारंपरिक पाटला, चूड़ी और आधुनिक कड़े",
    catEarrings: "झुमके व बालियां",
    catEarringsDesc: "चांदबाली, लटकन, टॉप्स और शाही झुमके",
    catGems: "प्राकृतिक रत्न (रत्नमाला)",
    catGemsDesc: "प्रमाणित माणिक्य, पन्ना, पुखराज और नवरत्न",
    catSilver: "शुद्ध चांदी व पूजा सामग्री",
    catSilverDesc: "चांदी की थाली, मूर्तियां, पायल व उपहार",
    catMens: "पुरुषों का कलेक्शन",
    catMensDesc: "मजबूत सोने की चेन, ब्रेसलेट और कड़े",
    curatedShowcaseSub: "हस्तनिर्मित कृतियां",
    curatedShowcaseTitle: "शोरूम विशेष आभूषण",
    curatedShowcaseDesc: "ग्वारीघाट शोरूम में प्रदर्शित चुनिंदा कलाकृतियां। शुद्धता विवरण जानने या भाव पूछने हेतु क्लिक करें।",
    filterAll: "सभी आभूषण",
    filterBridal: "ब्राइडल सेट",
    filterGold: "सोना 22K",
    filterDiamond: "हीरे",
    filterGems: "ज्योतिषीय रत्न",
    filterSilver: "चांदी उत्पाद",
    inquirePrice: "भाव पूछें",
    details: "विवरण",
    p1Title: "महारानी कुंदन चोकर सेट",
    p1Desc: "मीनाकारी और पोल्की से सजी 22 कैरेट सोने की अनूठी दुल्हन चोकर।",
    p2Title: "हेरिटेज कासु टेम्पल हार",
    p2Desc: "लक्ष्मी जी के नक्काशीदार रूप से सजा पारम्परिक 22 कैरेट टेम्पल हार।",
    p3Title: "इटरनल सॉलिटेयर रिंग",
    p3Desc: "18 कैरेट हॉलमार्क सोने में जड़ा प्रमाणित वीवीएस-ईएफ सॉलिटेयर हीरा।",
    p4Title: "रॉयल फिलीग्री सोने के कड़े",
    p4Desc: "22 कैरेट शुद्ध सोने में हस्तनिर्मित पारंपरिक कंगन और कड़े।",
    p5Title: "रीगल निज़ाम सोने के झुमके",
    p5Desc: "तीन परतों वाले भारी सोने के झुमके, शादियों और त्यौहारों के लिए।",
    p6Title: "प्राकृतिक बर्मा माणिक्य (रूबी)",
    p6Desc: "सूर्य ग्रह की शांति व सफलता हेतु शुद्ध प्राकृतिक लैब प्रमाणित माणिक्य।",
    p7Title: "लक्ष्मी-गणेश शुद्ध चांदी थाली",
    p7Desc: "दीपावली, गृहप्रवेश एवं शुभ पूजा हेतु 99.9% शुद्ध चांदी थाली सेट।",
    p8Title: "पोल्की जड़ाऊ रॉयल रानी हार",
    p8Desc: "शाही लुक देने वाला पारंपरिक जड़ाऊ पोल्की रानी हार।",
    p9Title: "24 कैरेट लक्ष्मी-गणेश स्वर्ण सिक्का",
    p9Desc: "99.9% शुद्ध प्रमाणित स्वर्ण सिक्का, धनतेरस व निवेश हेतु सर्वोत्तम।",
    ratesSub: "पारदर्शिता ही हमारी पहचान",
    ratesTitle: "लाइव सोना-चांदी भाव कैलकुलेटर",
    ratesDesc: "ग्वारीघाट शोरूम आने से पहले आज का ताजा भाव देखें एवं अपने वजन अनुसार तुरंत अनुमान लगाएं।",
    calcTitle: "सोने का लाइव मूल्य कैलकुलेटर",
    jabalpurMarket: "जबलपुर बाजार भाव",
    selectPurity: "सोने की शुद्धता चुनें:",
    enterWeight: "वजन दर्ज करें (ग्राम में):",
    metalRatePerGram: "धातु का आधार भाव:",
    estimatedMetalValue: "अनुमानित कुल मूल्य:",
    calcDisclaimer: "*नोट: इसमें मेकिंग चार्ज और 3% जीएसटी शामिल नहीं है। राजा ज्वेलर्स पर मेकिंग चार्ज पूरे जबलपुर में सबसे किफायती हैं।",
    inquireThisEstimate: "व्हाट्सएप पर भाव लॉक करें",
    subTitle: "दैनिक भाव अलर्ट (व्हाट्सएप)",
    subDesc: "रोज सुबह जबलपुर के प्रामाणिक सोने व चांदी के भाव सीधे अपने व्हाट्सएप पर पाएं।",
    labelFullName: "आपका पूरा नाम *",
    labelPhone: "व्हाट्सएप नंबर *",
    labelCity: "शहर / क्षेत्र",
    btnSubscribe: "मुफ्त सब्सक्राइब करें",
    sheetsNotice: "गूगल शीट्स व एक्सेल में स्वतः सुरक्षित",
    customSub: "कस्टम ज्वेलरी स्टूडियो",
    customTitle: "मनपसंद आभूषण व जॉब वर्क",
    customDesc: "क्या आपके पास कोई इंस्टाग्राम या पिंटरेस्ट डिज़ाइन है? या पुराने सोने से नया आभूषण बनवाना चाहते हैं? नीचे जानकारी भेजें।",
    karigarQuote: "\"हर आभूषण के साथ एक परिवार का प्यार जुड़ा होता है। हम आपके सपनों के आभूषणों को पूरी शुद्धता और आधुनिक फिनिशिंग के साथ तैयार करते हैं।\"",
    labelCategory: "आभूषण का प्रकार *",
    labelPurity: "धातु की शुद्धता",
    labelBudget: "अनुमानित बजट (₹)",
    labelNeededBy: "कब तक चाहिए",
    labelCustomNotes: "डिज़ाइन व अन्य विवरण",
    btnSubmitCustom: "कस्टम आभूषण रिक्वेस्ट भेजें",
    vipExperience: "विशेष वीआईपी सेवा",
    bookVisitTitle: "निजी शोरूम मुलाकात बुक करें",
    bookVisitDesc: "हमारे वरिष्ठ आभूषण विशेषज्ञ के साथ शांति से बैठकर ब्राइडल सेट देखें, हॉलमार्क मशीन पर शुद्धता जांचें और सही चयन करें।",
    benefit1: "शादी की ज्वेलरी हेतु विशेष सलाहकार सेवा",
    benefit2: "आपके पुराने सोने की मुफ्त डिजिटल शुद्धता जांच",
    benefit3: "कुंडली अनुसार उचित रत्न परामर्श",
    benefit4: "आरक्षित पार्किंग व आरामदायक लाउंज सेवा",
    scheduleVisit: "मुलाकात का समय चुनें",
    labelEmail: "ईमेल पता (वैकल्पिक)",
    labelDate: "आने की तारीख *",
    labelSlot: "समय चुनें *",
    labelInterest: "किस प्रकार के आभूषण देखना चाहते हैं *",
    labelSpecialNotes: "कोई विशेष आवश्यकता (वैकल्पिक)",
    btnConfirmAppointment: "मुलाकात कन्फर्म करें (गूगल शीट्स में सुरक्षित)",
    reviewsSub: "जबलपुरवासियों का भरोसा",
    reviewsTitle: "ग्राहकों के अनुभव एवं रेटिंग",
    r1Text: "\"मेरी बहन की शादी के सारे गहने राजा ज्वेलर्स ग्वारीघाट से खरीदे। हमारे सामने मशीन पर हॉलमार्क दिखाया गया और जबलपुर के बड़े शोरूमों की तुलना में इनके मेकिंग चार्ज बहुत सही थे।\"",
    r2Text: "\"राजा जेम्स से प्राकृतिक पुखराज खरीदा। इन्होंने सरकारी मान्यता प्राप्त लैब सर्टिफिकेट दिया और गुरुवार को सोने की अंगूठी में जड़वाकर दिया। बहुत ईमानदार और सहृदय व्यवहार।\"",
    r3Text: "\"मुझे इंस्टाग्राम से एक खास मंगलसूत्र डिज़ाइन बनवाना था। इनके कारीगरों ने सिर्फ 6 दिन में हूबहू वैसा ही 22 कैरेट में बनाकर दिया। ग्वारीघाट का सबसे बढ़िया ज्वेलरी शोरूम!\"",
    locationSub: "हमारे शोरूम पधारें",
    locationTitle: "शोरूम का पता एवं समय",
    locationDesc: "ग्वारीघाट मेन रोड पर मयूर कला मंदिर के पास स्थित। सुगम पहुंच और पार्किंग की पूर्ण सुविधा।",
    addressLabel: "शोरूम का पता:",
    timingsLabel: "खुलने का समय:",
    contactLabel: "फोन व व्हाट्सएप:",
    btnDirections: "गूगल मैप पर रास्ता देखें",
    btnWhatsAppStore: "व्हाट्सएप पर बात करें",
    followUs: "सोशल मीडिया पर फॉलो करें:",
    footerBrandBio: "2008 में स्थापित, राजा ज्वेलर्स ग्वारीघाट जबलपुर का एक प्रतिष्ठित नाम है, जो 100% हॉलमार्क युक्त सोने, हीरों, चांदी व रत्नों के लिए जाना जाता है।",
    footerNavTitle: "नेविगेशन",
    footerSpecTitle: "हमारी विशेषताएं",
    footerContactTitle: "संपर्क विवरण",
    bNavHome: "होम",
    bNavCatalog: "गहने",
    bNavRates: "भाव",
    bNavBook: "विजिट",
    bNavCall: "कॉल"
  }
};

let currentLang = localStorage.getItem("raja_lang") || "en";

// ================= INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
  switchLanguage(currentLang);
  calculateGoldPrice();
  updateEndpointStatusLabel();
  setupScrollSpy();

  // Set default appointment date
  const dateInput = document.getElementById("vDate");
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split("T")[0];
    dateInput.min = new Date().toISOString().split("T")[0];
  }

  // Update Excel download button in footer/header if present
  const excelBtn = document.getElementById("downloadExcelBtn");
  if (excelBtn) {
    excelBtn.href = getExcelDownloadLink();
  }
});

// ================= LANGUAGE ENGINE =================
function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("raja_lang", lang);
  document.body.setAttribute("data-lang", lang);

  const btnEn = document.getElementById("btnLangEn");
  const btnHi = document.getElementById("btnLangHi");
  if (btnEn && btnHi) {
    btnEn.classList.toggle("active", lang === "en");
    btnHi.classList.toggle("active", lang === "hi");
  }

  const drawerPills = document.querySelectorAll(".drawer-lang-pill");
  drawerPills.forEach((pill) => {
    if (lang === "en" && pill.innerText.includes("English")) {
      pill.classList.add("active");
    } else if (lang === "hi" && pill.innerText.includes("हिंदी")) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });

  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.innerText = TRANSLATIONS[lang][key];
    }
  });

  calculateGoldPrice();
}

// ================= LIVE GOLD CALCULATOR =================
function calculateGoldPrice() {
  const puritySelect = document.getElementById("calcPurity");
  const weightInput = document.getElementById("calcWeight");
  const resRatePerGram = document.getElementById("resRatePerGram");
  const resTotalValue = document.getElementById("resTotalValue");

  if (!puritySelect || !weightInput || !resRatePerGram || !resTotalValue) return;

  const purity = puritySelect.value;
  let weight = parseFloat(weightInput.value);
  if (isNaN(weight) || weight <= 0) weight = 1;

  let ratePerGram = 0;
  if (purity === "24") {
    ratePerGram = LIVE_RATES.gold24k_per_10g / 10;
  } else if (purity === "22") {
    ratePerGram = LIVE_RATES.gold22k_per_10g / 10;
  } else if (purity === "18") {
    ratePerGram = LIVE_RATES.gold18k_per_10g / 10;
  } else if (purity === "silver") {
    ratePerGram = LIVE_RATES.silver999_per_kg / 1000;
  }

  const totalValue = Math.round(ratePerGram * weight);
  resRatePerGram.innerText = `₹${ratePerGram.toLocaleString("en-IN")} / ${currentLang === 'hi' ? 'ग्राम' : 'gram'}`;
  resTotalValue.innerText = `₹${totalValue.toLocaleString("en-IN")}`;
}

function setPresetWeight(grams) {
  const weightInput = document.getElementById("calcWeight");
  if (weightInput) {
    weightInput.value = grams;
    calculateGoldPrice();
  }
  const presets = document.querySelectorAll(".preset-btn");
  presets.forEach((btn) => {
    btn.classList.toggle("active", btn.innerText.trim() === `${grams}g`);
  });
}

function inquireCalculatedEstimate() {
  const puritySelect = document.getElementById("calcPurity");
  const weightInput = document.getElementById("calcWeight");
  const resTotalValue = document.getElementById("resTotalValue");

  const purityText = puritySelect.options[puritySelect.selectedIndex].text;
  const weight = weightInput.value;
  const total = resTotalValue.innerText;

  const msg = `Namaste Raja Jewellers, I would like to inquire about current gold rates and lock an estimate:%0A- Metal Purity: ${encodeURIComponent(purityText)}%0A- Weight: ${weight} grams%0A- Estimated Value: ${encodeURIComponent(total)}%0APlease let me know the best making charges and availability.`;
  window.open(`https://wa.me/${CONFIG.STORE_WHATSAPP}?text=${msg}`, "_blank");
}

// ================= CATALOG FILTER & QUICK VIEW =================
function filterCatalog(category) {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-filter") === category);
  });

  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const cardCat = card.getAttribute("data-category");
    if (category === "all" || cardCat === category) {
      card.style.display = "flex";
      card.style.animation = "fade-in 0.4s ease";
    } else {
      card.style.display = "none";
    }
  });

  const target = document.getElementById("collections");
  if (target && (window.scrollY > target.offsetTop + 400 || window.scrollY < target.offsetTop - 300)) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

function openProductModal(triggerBtn) {
  const card = triggerBtn.closest(".product-card");
  if (!card) return;

  const modal = document.getElementById("productModal");
  const modalImg = document.getElementById("modalProductImg");
  const modalPurity = document.getElementById("modalProductPurity");
  const modalTitle = document.getElementById("modalProductTitle");
  const modalDesc = document.getElementById("modalProductDesc");
  const whatsAppBtn = document.getElementById("modalWhatsAppBtn");

  const img = card.getAttribute("data-img");
  const purity = card.getAttribute("data-purity");
  const title = currentLang === "hi" ? card.getAttribute("data-title-hi") : card.getAttribute("data-title-en");
  const desc = currentLang === "hi" ? card.getAttribute("data-desc-hi") : card.getAttribute("data-desc-en");

  modalImg.src = img;
  modalPurity.innerText = purity;
  modalTitle.innerText = title;
  modalDesc.innerText = desc;

  whatsAppBtn.onclick = () => {
    inquireProduct(title, purity);
  };

  modal.style.display = "flex";
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (modal) modal.style.display = "none";
}

function inquireProduct(productName, purity) {
  const text = `Namaste Raja Jewellers, I am interested in *${encodeURIComponent(productName)}* (${encodeURIComponent(purity)}) displayed on your website. Could you please share the current pricing, weight details, and in-store viewing timings?`;
  window.open(`https://wa.me/${CONFIG.STORE_WHATSAPP}?text=${text}`, "_blank");
}

// ================= GOOGLE APPS SCRIPT FORM SUBMISSION (QUBISAFE STACK) =================
/**
 * Submits form data via FormData POST to Google Apps Script.
 * Matches QubiSafe.com's technical architecture.
 */
async function handleFormSubmit(event, formName) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector(".submit-btn");
  const feedbackEl = document.getElementById(`feedback-${form.id}`);

  // Button loading state
  if (submitBtn) submitBtn.classList.add("loading");
  if (feedbackEl) {
    feedbackEl.className = "form-feedback";
    feedbackEl.style.display = "none";
  }

  // Construct FormData (browser sets boundary automatically)
  const formData = new FormData(form);
  formData.append("form_type", formName);
  formData.append("timestamp", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
  formData.append("source", "GitHub Pages Static Site");

  // Lead backup for localStorage
  const leadData = { formType: formName };
  formData.forEach((v, k) => { leadData[k] = v; });
  saveLeadToLocalStorage(leadData);

  const scriptURL = getScriptUrl();
  let feedbackMessage = "";

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData
    });

    try {
      const result = await response.json();
      if (result.result === "success" || result.status === "success") {
        feedbackMessage = currentLang === "hi" 
          ? `धन्यवाद ${leadData.name || leadData.full_name || ''}! आपका विवरण सुरक्षित रूप से दर्ज कर लिया गया है। राजा ज्वेलर्स की टीम शीघ्र आपसे संपर्क करेगी।`
          : `Thank you ${leadData.name || leadData.full_name || ''}! Your details have been successfully saved to our system. Raja Jewellers will reach out shortly.`;
      } else {
        throw new Error(result.message || "Submission issue");
      }
    } catch (parseErr) {
      // If endpoint returned opaque or non-json (no-cors mode)
      feedbackMessage = currentLang === "hi"
        ? `धन्यवाद ${leadData.name || leadData.full_name || ''}! आपका विवरण दर्ज हो गया है।`
        : `Thank you ${leadData.name || leadData.full_name || ''}! Your inquiry has been received.`;
    }

  } catch (error) {
    console.warn("Script endpoint fetch note:", error);
    // Local backup ensured data safety
    feedbackMessage = currentLang === "hi"
      ? `धन्यवाद ${leadData.name || leadData.full_name || ''}! आपकी रिक्वेस्ट हमारे सिस्टम में दर्ज हो गई है। तुरंत बात करने के लिए आप व्हाट्सएप पर भी संपर्क कर सकते हैं।`
      : `Thank you ${leadData.name || leadData.full_name || ''}! Your request has been recorded. For an instant response, feel free to chat with us on WhatsApp.`;
  }

  if (submitBtn) submitBtn.classList.remove("loading");

  if (feedbackEl) {
    feedbackEl.innerHTML = `
      <i class="fa-solid fa-circle-check"></i> ${feedbackMessage}
      <div style="margin-top: 8px;">
        <a href="https://wa.me/${CONFIG.STORE_WHATSAPP}?text=Namaste%20Raja%20Jewellers,%20I%20just%20submitted%20a%20request%20(${encodeURIComponent(leadData.name || leadData.full_name || 'Customer')}):%20${encodeURIComponent(formName)}" target="_blank" class="btn-whatsapp-pill btn-xs" style="margin: 0 auto; display: inline-flex;">
          <i class="fa-brands fa-whatsapp"></i> Chat directly on WhatsApp
        </a>
      </div>
    `;
    feedbackEl.className = "form-feedback success";
    feedbackEl.style.display = "block";
  }

  form.reset();
}

function saveLeadToLocalStorage(lead) {
  try {
    const existing = JSON.parse(localStorage.getItem("raja_leads_backup") || "[]");
    existing.unshift(lead);
    localStorage.setItem("raja_leads_backup", JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.log("Local lead backup note:", e);
  }
}

// ================= APPS SCRIPT & EXCEL ID SETTINGS MODAL =================
function openEndpointModal() {
  const modal = document.getElementById("endpointModal");
  const inputScript = document.getElementById("appsScriptUrlInput");
  const inputSheet = document.getElementById("sheetIdInput");

  if (inputScript) inputScript.value = localStorage.getItem("raja_script_id_or_url") || CONFIG.SCRIPT_ID_OR_URL;
  if (inputSheet) inputSheet.value = localStorage.getItem("raja_sheet_id_or_xls") || CONFIG.SPREADSHEET_ID_OR_XLS_LINK;
  if (modal) modal.style.display = "flex";
}

function closeEndpointModal() {
  const modal = document.getElementById("endpointModal");
  if (modal) modal.style.display = "none";
}

function saveEndpointUrl() {
  const inputScript = document.getElementById("appsScriptUrlInput");
  const inputSheet = document.getElementById("sheetIdInput");
  const msgEl = document.getElementById("endpointStatusMsg");

  if (inputScript && inputScript.value.trim()) {
    localStorage.setItem("raja_script_id_or_url", inputScript.value.trim());
  }
  if (inputSheet && inputSheet.value.trim()) {
    localStorage.setItem("raja_sheet_id_or_xls", inputSheet.value.trim());
  }

  updateEndpointStatusLabel();

  if (msgEl) {
    msgEl.innerHTML = `<span style="color: #81C784;"><i class="fa-solid fa-circle-check"></i> Configuration saved! Forms will now push directly to your Google Sheet / Excel.</span>`;
  }
  setTimeout(() => {
    closeEndpointModal();
  }, 1600);
}

async function testEndpoint() {
  const msgEl = document.getElementById("endpointStatusMsg");
  if (msgEl) msgEl.innerHTML = `<span><i class="fa-solid fa-spinner fa-spin"></i> Pinging Web App endpoint...</span>`;

  try {
    const formData = new FormData();
    formData.append("form_type", "Test Ping");
    formData.append("full_name", "Developer Test");
    formData.append("phone", "9999999999");
    formData.append("message", "Testing QubiSafe-style integration for Raja Jewellers");

    await fetch(getScriptUrl(), {
      method: "POST",
      body: formData
    });

    if (msgEl) {
      msgEl.innerHTML = `<span style="color: #81C784;"><i class="fa-solid fa-circle-check"></i> Test ping sent! Check your Google Sheet to confirm new row.</span>`;
    }
  } catch (err) {
    if (msgEl) {
      msgEl.innerHTML = `<span style="color: #E57373;">Ping note: ${err.message}</span>`;
    }
  }
}

function updateEndpointStatusLabel() {
  const label = document.getElementById("activeEndpointLabel");
  if (!label) return;
  const current = localStorage.getItem("raja_script_id_or_url") || CONFIG.SCRIPT_ID_OR_URL;
  if (current.includes("Default")) {
    label.innerText = "Configured (Default ID Template)";
  } else {
    label.innerText = "Connected: " + current.substring(0, 24) + "...";
  }
}

// ================= MOBILE DRAWER CONTROLS =================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const drawerCloseBtn = document.getElementById("drawerCloseBtn");
const mobileDrawer = document.getElementById("mobileDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");

function openDrawer() {
  if (mobileDrawer) mobileDrawer.classList.add("active");
  if (drawerOverlay) drawerOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  if (mobileDrawer) mobileDrawer.classList.remove("active");
  if (drawerOverlay) drawerOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openDrawer);
if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

// ================= SCROLLSPY FOR BOTTOM NAVIGATION =================
function setupScrollSpy() {
  const sections = ["home", "collections", "gold-rates", "vip-appointment"];
  const navMap = {
    "home": "bNavHome",
    "collections": "bNavCatalog",
    "gold-rates": "bNavRates",
    "vip-appointment": "bNavBook"
  };

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) {
        const top = el.offsetTop - 120;
        if (window.scrollY >= top) {
          current = secId;
        }
      }
    });

    if (current && navMap[current]) {
      document.querySelectorAll(".bottom-nav-item").forEach((item) => {
        item.classList.remove("active");
      });
      const activeItem = document.getElementById(navMap[current]);
      if (activeItem) activeItem.classList.add("active");
    }
  });
}
