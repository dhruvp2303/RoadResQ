export type IndianLanguage =
  | 'en'
  | 'hi'
  | 'bn'
  | 'mr'
  | 'te'
  | 'ta'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'or'
  | 'pa'
  | 'as'
  | 'ur'
  | 'ne'
  | 'sa'
  | 'ks'
  | 'kok'
  | 'sd'
  | 'doi'
  | 'mai';

export interface LanguageOption {
  code: IndianLanguage;
  label: string;
  native: string;
  flag: string;
  notePanel?: boolean; // Featured on Indian Currency Note
  region: string;
}

export const INDIAN_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇮🇳', notePanel: true, region: 'Pan-India / Official' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', notePanel: true, region: 'National / North & Central' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', flag: '🇮🇳', notePanel: true, region: 'West Bengal, Tripura, Assam' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🇮🇳', notePanel: true, region: 'Maharashtra, Goa' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', notePanel: true, region: 'Andhra Pradesh, Telangana' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', notePanel: true, region: 'Tamil Nadu, Puducherry' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳', notePanel: true, region: 'Gujarat, Daman & Diu' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', notePanel: true, region: 'Karnataka' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', notePanel: true, region: 'Kerala, Lakshadweep' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳', notePanel: true, region: 'Odisha' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳', notePanel: true, region: 'Punjab, Delhi, Haryana' },
  { code: 'as', label: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳', notePanel: true, region: 'Assam' },
  { code: 'ur', label: 'Urdu', native: 'اردو', flag: '🇮🇳', notePanel: true, region: 'Pan-India / J&K, Telangana, UP' },
  { code: 'ne', label: 'Nepali', native: 'नेपाली', flag: '🇮🇳', notePanel: true, region: 'Sikkim, West Bengal' },
  { code: 'sa', label: 'Sanskrit', native: 'संस्कृतम्', flag: '🇮🇳', notePanel: true, region: 'Classical Indian' },
  { code: 'ks', label: 'Kashmiri', native: 'کٲشُر / कॉशुर', flag: '🇮🇳', notePanel: true, region: 'Jammu & Kashmir' },
  { code: 'kok', label: 'Konkani', native: 'कोंकणी', flag: '🇮🇳', notePanel: true, region: 'Goa, Coastal Karnataka, Maharashtra' },
  { code: 'sd', label: 'Sindhi', native: 'سنڌي / सिंधी', flag: '🇮🇳', notePanel: false, region: 'Gujarat, Maharashtra, Rajasthan' },
  { code: 'doi', label: 'Dogri', native: 'डोगरी', flag: '🇮🇳', notePanel: false, region: 'Jammu & Kashmir, Himachal' },
  { code: 'mai', label: 'Maithili', native: 'मैथिली', flag: '🇮🇳', notePanel: false, region: 'Bihar, Jharkhand' },
];

export interface TranslationDict {
  appName: string;
  tagline: string;
  subTagline: string;
  requestHelp: string;
  sos1Tap: string;
  call112_1033: string;
  driverPortal: string;
  mechanicHub: string;
  telematicsAdmin: string;
  home: string;
  vehicles: string;
  safetyKit: string;
  whatHappened: string;
  whatHappenedDesc: string;
  confirmLocation: string;
  useCurrentGps: string;
  detectingGps: string;
  selectVehicle: string;
  dispatchProNow: string;
  liveEta: string;
  safetyPin: string;
  pinShareNote: string;
  callPro: string;
  chat: string;
  statusAssigned: string;
  statusEnRoute: string;
  statusArrived: string;
  statusService: string;
  statusPayment: string;
  statusClosed: string;
  payInvoice: string;
  taxInvoice: string;
  totalDue: string;
  payWithUpi: string;
  strobeHazard: string;
  sirenAlarm: string;
  shareLocationWhatsapp: string;
  safetyChecklistTitle: string;
  safetyTip1: string;
  safetyTip2: string;
  safetyTip3: string;
  categories: {
    dead_battery: { label: string; desc: string };
    flat_tyre: { label: string; desc: string };
    out_of_fuel: { label: string; desc: string };
    overheating: { label: string; desc: string };
    mechanical: { label: string; desc: string };
    towing: { label: string; desc: string };
    lockout: { label: string; desc: string };
    dont_know: { label: string; desc: string };
  };
}

const baseEnglish: TranslationDict = {
  appName: 'RoadResQ',
  tagline: 'When the road stops, help keeps moving.',
  subTagline: '24/7 Intelligent Emergency Vehicle Breakdown Response & Towing across Indian Metros & Expressways.',
  requestHelp: 'Request Assistance Now',
  sos1Tap: '1-Tap Emergency SOS',
  call112_1033: 'Call 112 / 1033',
  driverPortal: 'Driver Portal',
  mechanicHub: 'Mechanic Hub',
  telematicsAdmin: 'Telematics Admin',
  home: 'Home',
  vehicles: 'Vehicles',
  safetyKit: 'Safety Kit (112)',
  whatHappened: 'What happened to your vehicle?',
  whatHappenedDesc: 'Choose your breakdown issue so we dispatch the right certified equipment and technician',
  confirmLocation: 'Confirm Breakdown Location',
  useCurrentGps: 'Use Current GPS',
  detectingGps: 'Detecting GPS...',
  selectVehicle: 'Select Stranded Vehicle',
  dispatchProNow: 'Dispatch Nearest Pro Now',
  liveEta: 'Live ETA',
  safetyPin: 'Safety PIN',
  pinShareNote: 'Share this 4-digit PIN with technician on-site to verify authenticity',
  callPro: 'Call Pro',
  chat: 'Chat',
  statusAssigned: 'Provider Assigned — Starting Route',
  statusEnRoute: 'Technician En Route to Your Location',
  statusArrived: 'Technician Has Arrived On-Site!',
  statusService: 'Roadside Diagnostics & Repair in Progress',
  statusPayment: 'Service Complete — Digital Invoice Issued',
  statusClosed: 'Incident Resolved & Safely Completed',
  payInvoice: 'Pay Invoice',
  taxInvoice: 'Digital GST Tax Invoice',
  totalDue: 'Total Due',
  payWithUpi: 'Pay via UPI (GPay / PhonePe / Paytm)',
  strobeHazard: 'Screen Hazard Strobe',
  sirenAlarm: 'Distress Alarm Siren',
  shareLocationWhatsapp: 'Share Location via WhatsApp',
  safetyChecklistTitle: 'Critical Roadside Safety Checklist',
  safetyTip1: 'Turn on vehicle Hazard Indicator Lights immediately.',
  safetyTip2: 'Exit from the left and stand safely behind the highway crash barrier.',
  safetyTip3: 'Never attempt tyre changes on the live traffic side of an Indian highway.',
  categories: {
    dead_battery: { label: 'Battery Jump Start', desc: 'Car not starting, clicking sound, 12V jumpstart or replacement test' },
    flat_tyre: { label: 'Flat Tyre / Puncture Fix', desc: 'On-site tubeless puncture patch, stepney tyre swap, or air inflation' },
    out_of_fuel: { label: 'Fuel Delivery / EV Boost', desc: '5L Petrol/Diesel doorstep delivery or mobile EV quick charge' },
    overheating: { label: 'Engine Overheating', desc: 'Coolant leak, steam from radiator, fan belt issue or coolant top-up' },
    mechanical: { label: 'Mechanical Breakdown', desc: 'Clutch issue, brake jam, alternator failure, or unusual engine noise' },
    towing: { label: 'Flatbed Towing Truck', desc: 'Hydraulic under-lift or flatbed recovery to authorized service center' },
    lockout: { label: 'Keys Locked Inside', desc: 'Door lockout rescue, non-destructive vehicle entry tool kit' },
    dont_know: { label: "Don't Know / Inspection", desc: 'Vehicle suddenly stopped. Certified mechanic conducts on-site OBD check' },
  },
};

const baseHindi: TranslationDict = {
  ...baseEnglish,
  tagline: 'जब सड़क रुके, मदद आगे बढ़े।',
  subTagline: 'भारतीय शहरों और एक्सप्रेसवे पर 24/7 आपातकालीन वाहन सहायता और टोइंग सेवा।',
  requestHelp: 'अभी सहायता माँगें',
  sos1Tap: '१-टैप आपातकालीन एसओएस',
  call112_1033: 'कॉल 112 / 1033',
  driverPortal: 'चालक पोर्टल',
  mechanicHub: 'मैकेनिक हब',
  telematicsAdmin: 'कंट्रोल रूम एडमिन',
  home: 'होम',
  vehicles: 'वाहन गैराज',
  safetyKit: 'सुरक्षा किट (112)',
  whatHappened: 'आपके वाहन में क्या खराबी आई है?',
  whatHappenedDesc: 'समस्या चुनें ताकि हम सही प्रमाणित मैकेनिक और उपकरण भेज सकें',
  confirmLocation: 'स्थान की पुष्टि करें',
  useCurrentGps: 'वर्तमान जीपीएस का उपयोग करें',
  detectingGps: 'जीपीएस खोजा जा रहा है...',
  selectVehicle: 'फंसा हुआ वाहन चुनें',
  dispatchProNow: 'निकटतम मैकेनिक को अभी भेजें',
  liveEta: 'लाइव आगमन समय',
  safetyPin: 'सुरक्षा पिन',
  pinShareNote: 'सत्यापन के लिए यह 4-अंकों का पिन मौके पर तकनीशियन को बताएं',
  callPro: 'मैकेनिक को कॉल करें',
  chat: 'लाइव चैट',
  statusAssigned: 'मैकेनिक नियुक्त — मार्ग प्रारंभ',
  statusEnRoute: 'मैकेनिक आपके स्थान की ओर आ रहा है',
  statusArrived: 'मैकेनिक मौके पर पहुँच गया है!',
  statusService: 'मरम्मत और जाँच कार्य प्रगति पर है',
  statusPayment: 'कार्य पूर्ण — डिजिटल बिल जारी',
  statusClosed: 'समस्या हल — सुरक्षित यात्रा!',
  payInvoice: 'बिल का भुगतान करें',
  taxInvoice: 'डिजिटल जीएसटी टैक्स इनवॉइस',
  totalDue: 'कुल देय राशि',
  payWithUpi: 'यूपीआई से भुगतान करें (GPay / PhonePe)',
  strobeHazard: 'स्क्रीन हैज़र्ड लाइट',
  sirenAlarm: 'अलार्म सायरन',
  shareLocationWhatsapp: 'व्हाट्सएप पर लोकेशन भेजें',
  safetyChecklistTitle: 'सड़क सुरक्षा आवश्यक निर्देश',
  safetyTip1: 'तुरंत वाहन की हैज़र्ड (चारों) इंडिकेटर लाइट चालू करें।',
  safetyTip2: 'बाईं ओर से उतरें और हाईवे क्रैश बैरियर के पीछे सुरक्षित खड़े रहें।',
  safetyTip3: 'हाईवे पर चालू ट्रैफिक की तरफ खड़े होकर टायर न बदलें।',
};

const baseGujarati: TranslationDict = {
  ...baseEnglish,
  tagline: 'જ્યારે રસ્તો અટકે, મદદ આગળ વધે.',
  subTagline: 'ગુજરાત અને ભારતીય હાઇવે પર 24/7 ઇમરજન્સી રોડસાઇડ સહાય અને ટોઇંગ સેવા.',
  requestHelp: 'હમણાં જ મદદ મેળવો',
  sos1Tap: '૧-ટેપ ઇમરજન્સી SOS',
  call112_1033: 'કોલ કરો 112 / 1033',
  driverPortal: 'ડ્રાઇવર પોર્ટલ',
  mechanicHub: 'મિકેનિક હબ',
  telematicsAdmin: 'કંટ્રોલ રૂમ એડમિન',
  home: 'હોમ',
  vehicles: 'વાહનો',
  safetyKit: 'સુરક્ષા કીટ (112)',
  whatHappened: 'તમારા વાહનમાં શું સમસ્યા છે?',
  whatHappenedDesc: 'યોગ્ય ટેકનિશિયન મોકલવા માટે સમસ્યા પસંદ કરો',
  confirmLocation: 'બ્રેકડાઉન સ્થળ કન્ફર્મ કરો',
  useCurrentGps: 'લાઈવ GPS વાપરો',
  detectingGps: 'GPS શોધી રહ્યા છીએ...',
  selectVehicle: 'વાહન પસંદ કરો',
  dispatchProNow: 'નજીકના મિકેનિકને હમણાં જ બોલાવો',
  liveEta: 'આગમન સમય (ETA)',
  safetyPin: 'સુરક્ષા પિન',
  pinShareNote: 'સ્થળ પર મિકેનિકની ખરાઈ માટે આ 4-અંકનો પિન આપો',
  callPro: 'મિકેનિકને ફોન કરો',
  chat: 'ચેટ કરો',
  statusAssigned: 'મિકેનિક અસાઇન થઈ ગયો છે',
  statusEnRoute: 'મિકેનિક તમારા લોકેશન તરફ આવી રહ્યો છે',
  statusArrived: 'મિકેનિક સ્થળ પર આવી પહોંચ્યો છે!',
  statusService: 'રિપેરિંગ કામ ચાલુ છે',
  statusPayment: 'કામ પૂરું — બિલ તૈયાર છે',
  statusClosed: 'સહાય સંપન્ન — શુભ યાત્રા!',
  payInvoice: 'બિલ ચૂકવો',
  taxInvoice: 'ડિજિટલ GST ઇન્વૉઇસ',
  totalDue: 'કુલ ચૂકવવાપાત્ર રકમ',
  payWithUpi: 'UPI થી પેમેન્ટ કરો (GPay / PhonePe)',
  strobeHazard: 'હેઝાર્ડ ફ્લેશ લાઇટ',
  sirenAlarm: 'સાઇરન એલાર્મ',
  shareLocationWhatsapp: 'વોટ્સએપ પર લોકેશન શેર કરો',
  safetyChecklistTitle: 'હાઇવે રોડસાઇડ સુરક્ષા નિયમો',
  safetyTip1: 'તરત જ વાહનની હેઝાર્ડ લાઇટ્સ ચાલુ કરો.',
  safetyTip2: 'ડાબી બાજુથી બહાર નીકળી સુરક્ષિત બેરિયર પાછળ ઊભા રહો.',
  safetyTip3: 'હાઇવે ટ્રાફિક વચ્ચે ઊભા રહીને ટાયર બદલવાનો પ્રયાસ ન કરો.',
};

const baseBengali: TranslationDict = {
  ...baseEnglish,
  tagline: 'যখন পথ থামে, সাহায্য এগিয়ে চলে।',
  subTagline: '২৪/৭ নির্ভরযোগ্য জরুরি ব্রেকডাউন সহায়তা ও টোয়িং পরিষেবা।',
  requestHelp: 'এখনই সাহায্য চান',
  sos1Tap: '১-ট্যাপ জরুরি এসওএস',
  call112_1033: 'কল করুন ১১২ / ১০৩৩',
  driverPortal: 'ড্রাইভার পোর্টাল',
  mechanicHub: 'মেকানিক হাব',
  telematicsAdmin: 'কন্ট্রোল রুম অ্যাডমিন',
  home: 'হোম',
  vehicles: 'গাড়ির তালিকা',
  safetyKit: 'নিরাপত্তা কিট',
  whatHappened: 'আপনার গাড়িতে কী সমস্যা হয়েছে?',
  confirmLocation: 'ব্রেকডাউন স্থান নিশ্চিত করুন',
  selectVehicle: 'আটকে থাকা গাড়ি নির্বাচন করুন',
  dispatchProNow: 'নিকটতম মেকানিক পাঠান',
  liveEta: 'পৌঁছানোর আনুমানিক সময়',
  safetyPin: 'সুরক্ষা পিন',
  pinShareNote: 'যাচাইয়ের জন্য ৪-সংখ্যার পিনটি মেকানিককে দিন',
  statusAssigned: 'মেকানিক নির্ধারিত হয়েছে',
  statusEnRoute: 'মেকানিক আপনার দিকে রওনা হয়েছে',
  statusArrived: 'মেকানিক উপস্থিত হয়েছে!',
  statusService: 'মেরামত কাজ চলছে',
  statusPayment: 'কাজ সমাপ্ত — ডিজিটাল বিল প্রস্তুত',
  statusClosed: 'সাহায্য সম্পূর্ণ — শুভ যাত্রা!',
  payInvoice: 'বিল পরিশোধ করুন',
  totalDue: 'মোট প্রদেয় অর্থ',
  payWithUpi: 'ইউপিআই দিয়ে পেমেন্ট করুন',
};

const baseMarathi: TranslationDict = {
  ...baseEnglish,
  tagline: 'जेव्हा रस्ता थांबतो, मदत धावून येते.',
  subTagline: '२४/७ तत्पर आपत्कालीन वाहन दुरुस्ती आणि टोइंग सेवा.',
  requestHelp: 'आत्ताच मदत मागवा',
  sos1Tap: '१-टॅप आपत्कालीन SOS',
  call112_1033: 'कॉल करा ११२ / १०३३',
  driverPortal: 'चालक पोर्टल',
  mechanicHub: 'मेकॅनिक हब',
  telematicsAdmin: 'कंट्रोल रूम ॲडमिन',
  home: 'होम',
  vehicles: 'वाहने',
  safetyKit: 'सुरक्षा किट (११२)',
  whatHappened: 'तुमच्या वाहनात काय बिघाड झाला आहे?',
  confirmLocation: 'स्थान निश्चित करा',
  selectVehicle: 'वाहन निवडा',
  dispatchProNow: 'जवळचा मेकॅनिक पाठवा',
  liveEta: 'आगमन वेळ (ETA)',
  safetyPin: 'सुरक्षा पिन',
  statusAssigned: 'मेकॅनिक नियुक्त झाला आहे',
  statusEnRoute: 'मेकॅनिक आपल्याकडे येत आहे',
  statusArrived: 'मेकॅनिक घटनास्थळी पोहोचला आहे!',
  statusService: 'दुरुस्तीचे काम सुरू आहे',
  statusPayment: 'काम पूर्ण — डिजिटल बिल तयार',
  statusClosed: 'मदत पूर्ण — सुरक्षित प्रवास!',
  payInvoice: 'बिल भरा',
  totalDue: 'एकूण देय रक्कम',
  payWithUpi: 'UPI द्वारे पेमेंट करा',
};

const baseKannada: TranslationDict = {
  ...baseEnglish,
  tagline: 'ರಸ್ತೆ ನಿಂತಾಗ, ಸಹಾಯ ಮುಂದುವರಿಯುತ್ತದೆ.',
  subTagline: 'ಕರ್ನಾಟಕ ಮತ್ತು ಭಾರತದಾದ್ಯಂತ 24/7 ತುರ್ತು ವಾಹನ ದುರಸ್ತಿ ಮತ್ತು ಟೋಯಿಂಗ್ ಸೇವೆ.',
  requestHelp: 'ಈಗಲೇ ಸಹಾಯ ಪಡೆಯಿರಿ',
  sos1Tap: '೧-ಟ್ಯಾಪ್ ತುರ್ತು SOS',
  call112_1033: 'ಕರೆ ಮಾಡಿ 112 / 1033',
  driverPortal: 'ಚಾಲಕರ ಪೋರ್ಟಲ್',
  mechanicHub: 'ಮೆಕ್ಯಾನಿಕ್ ಹಬ್',
  telematicsAdmin: 'ಕಂಟ್ರೋಲ್ ರೂಮ್',
  home: 'ಮುಖಪುಟ',
  vehicles: 'ವಾಹನಗಳು',
  safetyKit: 'ಸುರಕ್ಷತಾ ಕಿಟ್',
  whatHappened: 'ನಿಮ್ಮ ವಾಹನದಲ್ಲಿ ಏನು ಸಮಸ್ಯೆಯಾಗಿದೆ?',
  confirmLocation: 'ಸ್ಥಳವನ್ನು ದೃಢೀಕರಿಸಿ',
  selectVehicle: 'ವಾಹನವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  dispatchProNow: 'ಹತ್ತಿರದ ಮೆಕ್ಯಾನಿಕ್ ಕಳುಹಿಸಿ',
  liveEta: 'ಲೈವ್ ಆಗಮನ ಸಮಯ',
  safetyPin: 'ಸುರಕ್ಷತಾ ಪಿನ್',
  statusAssigned: 'ಮೆಕ್ಯಾನಿಕ್ ನಿಯೋಜಿಸಲಾಗಿದೆ',
  statusEnRoute: 'ಮೆಕ್ಯಾನಿಕ್ ನಿಮ್ಮ ಸ್ಥಳಕ್ಕೆ ಬರುತ್ತಿದ್ದಾರೆ',
  statusArrived: 'ಮೆಕ್ಯಾನಿಕ್ ಸ್ಥಳಕ್ಕೆ ಬಂದಿದ್ದಾರೆ!',
  statusService: 'ದುರಸ್ತಿ ಕಾರ್ಯ ಪ್ರಗತಿಯಲ್ಲಿದೆ',
  statusPayment: 'ಕೆಲಸ ಪೂರ್ಣ — ಬಿಲ್ ಸಿದ್ಧವಾಗಿದೆ',
  statusClosed: 'ಸಹಾಯ ಪೂರ್ಣಗೊಂಡಿದೆ — ಶುಭ ಪ್ರಯಾಣ!',
  payInvoice: 'ಬಿಲ್ ಪಾವತಿಸಿ',
  totalDue: 'ಒಟ್ಟು ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ',
  payWithUpi: 'UPI ಮೂಲಕ ಪಾವತಿಸಿ',
};

const baseTamil: TranslationDict = {
  ...baseEnglish,
  tagline: 'பயணம் தடைபடும் போது, உதவி தொடரும்.',
  subTagline: '24/7 அவசர வாகன பழுது நீக்கம் மற்றும் டோயிங் சேவை.',
  requestHelp: 'உடனடி உதவி கோரவும்',
  sos1Tap: '1-தட்டல் அவசர SOS',
  call112_1033: 'அழைக்கவும் 112 / 1033',
  driverPortal: 'ஓட்டுநர் தளம்',
  mechanicHub: 'மெக்கானிக் தளம்',
  telematicsAdmin: 'கட்டுப்பாட்டு மையம்',
  home: 'முகப்பு',
  vehicles: 'வாகனங்கள்',
  safetyKit: 'பாதுகாப்பு கருவி',
  whatHappened: 'உங்கள் வாகனத்தில் என்ன பிரச்சனை?',
  confirmLocation: 'இடத்தை உறுதிப்படுத்தவும்',
  selectVehicle: 'வாகனத்தைத் தேர்ந்தெடுக்கவும்',
  dispatchProNow: 'அருகிலுள்ள மெக்கானிக்கை அனுப்பவும்',
  liveEta: 'வருகை நேரம் (ETA)',
  safetyPin: 'பாதுகாப்பு பின்',
  statusAssigned: 'மெக்கானிக் நியமிக்கப்பட்டார்',
  statusEnRoute: 'மெக்கானிக் உங்களை நோக்கி வருகிறார்',
  statusArrived: 'மெக்கானிக் வந்துவிட்டார்!',
  statusService: 'பழுது பார்க்கும் பணி நடக்கிறது',
  statusPayment: 'பணி நிறைவு — ரசீது தயார்',
  statusClosed: 'உதவி முடிந்தது — இனிய பயணம்!',
  payInvoice: 'கட்டணம் செலுத்தவும்',
  totalDue: 'மொத்த தொகை',
  payWithUpi: 'UPI மூலம் பணம் செலுத்தவும்',
};

const baseTelugu: TranslationDict = {
  ...baseEnglish,
  tagline: 'రహదారి ఆగినప్పుడు, సహాయం కదులుతూనే ఉంటుంది.',
  subTagline: '24/7 అత్యవసర వాహన మరమ్మతు మరియు టోయింగ్ సేవలు.',
  requestHelp: 'ఇప్పుడే సహాయం పొందండి',
  sos1Tap: '1-ట్యాప్ ఎమర్జెన్సీ SOS',
  call112_1033: 'కాల్ చేయండి 112 / 1033',
  driverPortal: 'డ్రైవర్ పోర్టల్',
  mechanicHub: 'మెకానిక్ హబ్',
  telematicsAdmin: 'కంట్రోల్ రూమ్',
  home: 'హోమ్',
  vehicles: 'వాహనాలు',
  safetyKit: 'రక్షణ కిట్',
  whatHappened: 'మీ వాహనంలో ఏమి సమస్య వచ్చింది?',
  confirmLocation: 'స్థలాన్ని నిర్ధారించండి',
  selectVehicle: 'వాహనాన్ని ఎంచుకోండి',
  dispatchProNow: 'దగ్గరి మెకానిక్‌ని పంపండి',
  liveEta: 'చేరుకునే సమయం (ETA)',
  safetyPin: 'సేఫ్టీ పిన్',
  statusAssigned: 'మెకానిక్ కేటాయించబడ్డారు',
  statusEnRoute: 'మెకానిక్ మీ వద్దకు వస్తున్నారు',
  statusArrived: 'మెకానిక్ చేరుకున్నారు!',
  statusService: 'మరమ్మతు పని జరుగుతోంది',
  statusPayment: 'పని పూర్తి — బిల్లు సిద్ధం',
  statusClosed: 'సహాయం పూర్తయింది — శుభ ప్రయాణం!',
  payInvoice: 'బిల్లు చెల్లించండి',
  totalDue: 'మొత్తం చెల్లించాల్సినది',
  payWithUpi: 'UPI ద్వారా చెల్లించండి',
};

const baseMalayalam: TranslationDict = {
  ...baseEnglish,
  tagline: 'വഴി മുടങ്ങുമ്പോൾ, സഹായം മുന്നോട്ട്.',
  subTagline: '24/7 അടിയന്തര വാഹന അറ്റകുറ്റപ്പണിയും ടോയിംഗ് സേവനവും.',
  requestHelp: 'ഉടൻ സഹായം അഭ്യർത്ഥിക്കുക',
  sos1Tap: '1-ടാപ്പ് എമർജൻസി SOS',
  call112_1033: 'വിളിക്കുക 112 / 1033',
  driverPortal: 'ഡ്രൈവർ പോർട്ടൽ',
  mechanicHub: 'മെക്കാനിക് ഹബ്',
  home: 'ഹോം',
  vehicles: 'വാഹനങ്ങൾ',
  whatHappened: 'വാഹനത്തിന് എന്ത് പറ്റി?',
  confirmLocation: 'ലൊക്കേഷൻ സ്ഥിരീകരിക്കുക',
  selectVehicle: 'വാഹനം തിരഞ്ഞെടുക്കുക',
  dispatchProNow: 'മെക്കാനിക്കിനെ അയക്കുക',
  liveEta: 'എത്തിച്ചേരുന്ന സമയം',
  safetyPin: 'സുരക്ഷാ പിൻ',
  statusEnRoute: 'മെക്കാനിക് പുറപ്പെട്ടു',
  statusArrived: 'മെക്കാനിക് എത്തിച്ചേർന്നു!',
  statusService: 'അറ്റകുറ്റപ്പണി പുരോഗമിക്കുന്നു',
  statusPayment: 'പണി പൂർത്തിയായി — ബിൽ റെഡി',
  statusClosed: 'സഹായം പൂർത്തിയായി — ശുഭയാത്ര!',
  payWithUpi: 'UPI വഴി പണമടയ്ക്കുക',
};

const basePunjabi: TranslationDict = {
  ...baseEnglish,
  tagline: 'ਜਦੋਂ ਰਾਹ ਰੁਕਦਾ ਹੈ, ਮਦਦ ਤੁਰੰਤ ਪਹੁੰਚਦੀ ਹੈ।',
  subTagline: '24/7 ਐਮਰਜੈਂਸੀ ਵਾਹਨ ਮੁਰੰਮਤ ਅਤੇ ਟੋਇੰਗ ਸੇਵਾ।',
  requestHelp: 'ਹੁਣੇ ਮਦਦ ਮੰਗੋ',
  sos1Tap: '੧-ਟੈਪ ਐਮਰਜੈਂਸੀ SOS',
  call112_1033: 'ਕਾਲ ਕਰੋ 112 / 1033',
  driverPortal: 'ਡਰਾਈਵਰ ਪੋਰਟਲ',
  mechanicHub: 'ਮਕੈਨਿਕ ਹੱਬ',
  home: 'ਹੋਮ',
  vehicles: 'ਗੱਡੀਆਂ',
  whatHappened: 'ਤੁਹਾਡੀ ਗੱਡੀ ਵਿੱਚ ਕੀ ਖ਼ਰਾਬੀ ਆਈ ਹੈ?',
  confirmLocation: 'ਲੋਕੇਸ਼ਨ ਪੱਕੀ ਕਰੋ',
  selectVehicle: 'ਗੱਡੀ ਚੁਣੋ',
  dispatchProNow: 'ਨੇੜਲਾ ਮਕੈਨਿਕ ਭੇਜੋ',
  liveEta: 'ਪਹੁੰਚਣ ਦਾ ਸਮਾਂ (ETA)',
  safetyPin: 'ਸੇਫਟੀ ਪਿੰਨ',
  statusEnRoute: 'ਮਕੈਨਿਕ ਤੁਹਾਡੇ ਵੱਲ ਆ ਰਿਹਾ ਹੈ',
  statusArrived: 'ਮਕੈਨਿਕ ਮੌਕੇ ਤੇ ਪਹੁੰਚ ਗਿਆ ਹੈ!',
  statusService: 'ਮੁਰੰਮਤ ਦਾ ਕੰਮ ਚੱਲ ਰਿਹਾ ਹੈ',
  statusPayment: 'ਕੰਮ ਪੂਰਾ — ਬਿੱਲ ਤਿਆਰ',
  statusClosed: 'ਮਦਦ ਮੁਕੰਮਲ — ਸ਼ੁਭ ਯਾਤਰਾ!',
  payWithUpi: 'UPI ਰਾਹੀਂ ਭੁਗਤਾਨ ਕਰੋ',
};

const baseOdia: TranslationDict = {
  ...baseEnglish,
  tagline: 'ଯେତେବେଳେ ରାସ୍ତା ଅଟକେ, ସାହାଯ୍ୟ ଆଗେଇ ଆସେ।',
  subTagline: '୨୪/୭ ଜରୁରୀକାଳୀନ ଗାଡ଼ି ମରାମତି ଏବଂ ଟୋଇଂ ସେବା।',
  requestHelp: 'ଏବେ ସାହାଯ୍ୟ ମାଗନ୍ତୁ',
  sos1Tap: '୧-ଟ୍ୟାପ୍ ଜରୁରୀକାଳୀନ SOS',
  home: 'ହୋମ୍',
  vehicles: 'ଗାଡ଼ି ତାଲିକା',
  whatHappened: 'ଗାଡ଼ିରେ କଣ ସମସ୍ୟା ହେଲା?',
  dispatchProNow: 'ମେକାନିକ୍ ପଠାନ୍ତୁ',
  liveEta: 'ପହଞ୍ଚିବା ସମୟ',
  safetyPin: 'ସୁରକ୍ଷା ପିନ୍',
  statusEnRoute: 'ମେକାନିକ୍ ଆସୁଛନ୍ତି',
  statusArrived: 'ମେକାନିକ୍ ପହଞ୍ଚିଗଲେ!',
  statusClosed: 'ସାହାଯ୍ୟ ସମ୍ପୂର୍ଣ୍ଣ — ଶୁଭ ଯାତ୍ରା!',
  payWithUpi: 'UPI ଦ୍ୱାରା ପେମେଣ୍ଟ କରନ୍ତୁ',
};

const baseAssamese: TranslationDict = {
  ...baseEnglish,
  tagline: 'যেতিয়া পথ বন্ধ হয়, সহায় আগবাঢ়ে।',
  subTagline: '২৪/৭ জৰুৰীকালীন বাহন মেৰামতি আৰু টোয়িং সেৱা।',
  requestHelp: 'এতিয়াই সহায় বিচাৰক',
  sos1Tap: '১-টেপ জৰুৰীকালীন SOS',
  home: 'হোম',
  vehicles: 'বাহনসমূহ',
  whatHappened: 'বাহনখনত কি সমস্যা হৈছে?',
  dispatchProNow: 'মেকানিক পঠিয়াওক',
  liveEta: 'উপস্থিতিৰ আনুমানিক সময়',
  safetyPin: 'সুৰক্ষা পিন',
  statusEnRoute: 'মেকানিক আহি আছে',
  statusArrived: 'মেকানিক আহি পালে!',
  statusClosed: 'সহায় সম্পূৰ্ণ — শুভ যাত্ৰা!',
  payWithUpi: 'UPI যোগে ধন পৰিশোধ কৰক',
};

const baseUrdu: TranslationDict = {
  ...baseEnglish,
  tagline: 'جب راستہ رکے، مدد آگے بڑھے۔',
  subTagline: '24/7 ہنگامی گاڑی کی مرمت اور ٹوئنگ سروس۔',
  requestHelp: 'ابھی مدد حاصل کریں',
  sos1Tap: '1-ٹیپ ایمرجنسی SOS',
  home: 'ہوم',
  vehicles: 'گاڑیاں',
  whatHappened: 'آپ کی گاڑی میں کیا خرابی ہے؟',
  dispatchProNow: 'قریبی مکینک کو بھیجیں',
  liveEta: 'پہنچنے کا متوقع وقت',
  safetyPin: 'حفاظتی پن',
  statusEnRoute: 'مکینک آپ کی طرف آ رہا ہے',
  statusArrived: 'مکینک موقع پر پہنچ گیا ہے!',
  statusClosed: 'مدد مکمل — سفر بخیر!',
  payWithUpi: 'UPI کے ذریعے ادائیگی کریں',
};

const baseNepali: TranslationDict = {
  ...baseEnglish,
  tagline: 'जब बाटो रोकिन्छ, सहायता अघि बढ्छ।',
  subTagline: '२४/७ आपतकालीन सवारी साधन मर्मत र टोइङ सेवा।',
  requestHelp: 'अहिले मद्दत माग्नुहोस्',
  sos1Tap: '१-ट्याप आपतकालीन SOS',
  home: 'गृहपृष्ठ',
  vehicles: 'सवारीहरू',
  whatHappened: 'सवारीमा के समस्या आयो?',
  dispatchProNow: 'मेकानिक पठाउनुहोस्',
  liveEta: 'आइपुग्ने अनुमानित समय',
  safetyPin: 'सुरक्षा पिन',
  statusEnRoute: 'मेकानिक आइरहेको छ',
  statusArrived: 'मेकानिक आइपुग्यो!',
  statusClosed: 'सहयोग सम्पन्न — शुभ यात्रा!',
  payWithUpi: 'UPI मार्फत भुक्तानी गर्नुहोस्',
};

const baseSanskrit: TranslationDict = {
  ...baseEnglish,
  tagline: 'यदा मार्गः अवरुद्ध्यते, साहाय्यं प्रवर्तते।',
  subTagline: 'अहोरात्रं संकटकालीन वाहनोपचारः तथा टोयिंग सेवा।',
  requestHelp: 'साहाय्यं याचताम्',
  sos1Tap: '१-स्पर्श आपत्कालीन SOS',
  home: 'गृहम्',
  vehicles: 'वाहनानि',
  whatHappened: 'वाहने किं जातम्?',
  dispatchProNow: 'यांत्रिकं प्रेषयतु',
  liveEta: 'आगमन समयः',
  safetyPin: 'सुरक्षा कूटसंख्या',
  statusEnRoute: 'यांत्रिकः आगच्छति',
  statusArrived: 'यांत्रिकः प्राप्तः!',
  statusClosed: 'साहाय्यं सम्पन्नम् — शुभयात्रा!',
  payWithUpi: 'UPI द्वारा मूल्यं ददातु',
};

export const TRANSLATIONS: Record<IndianLanguage, TranslationDict> = {
  en: baseEnglish,
  hi: baseHindi,
  bn: baseBengali,
  mr: baseMarathi,
  te: baseTelugu,
  ta: baseTamil,
  gu: baseGujarati,
  kn: baseKannada,
  ml: baseMalayalam,
  or: baseOdia,
  pa: basePunjabi,
  as: baseAssamese,
  ur: baseUrdu,
  ne: baseNepali,
  sa: baseSanskrit,
  ks: { ...baseUrdu, tagline: 'کٲشُر: ییلہِ وتھ رُکی، مدد واتی جلدی' },
  kok: { ...baseMarathi, tagline: 'जेन्ना वाट आडता, मदत पावता' },
  sd: { ...baseGujarati, tagline: 'سنڌي: مدد هر وقت تيار' },
  doi: { ...baseHindi, tagline: 'डोगरी: जद राह रुकदी, मदद पुज्जदी' },
  mai: { ...baseHindi, tagline: 'मैथिली: जखन बाट रुकय, मदद पहुँचय' },
};
