/**
 * DharaniSetu Future-Proof Dynamic Auto-Translation Engine
 * Automatically intercepts and translates UI phrases, status labels, metrics, and land governance terms
 * into Telugu, Tamil, and Hindi even if a hardcoded string or missing translation key is added in the future.
 */

export type SupportedLanguage = 'en' | 'te' | 'ta' | 'hi';

export interface TranslationDict {
  te: string;
  ta: string;
  hi: string;
}

export const DYNAMIC_GLOSSARY: Record<string, TranslationDict> = {
  // Land Categories & Portfolios
  'Farming Land': { te: 'వ్యవసాయ భూమి', ta: 'விவசாய நிலம்', hi: 'कृषि भूमि' },
  '🌾 Farming Land': { te: '🌾 వ్యవసాయ భూమి', ta: '🌾 விவசாய நிலம்', hi: '🌾 कृषि भूमि' },
  'Commercial Land': { te: 'వాణిజ్య భూమి', ta: 'வணிக நிலம்', hi: 'व्यावसायिक भूमि' },
  '🏢 Commercial Land': { te: '🏢 వాణిజ్య భూమి', ta: '🏢 வணிக நிலம்', hi: '🏢 व्यावसायिक भूमि' },
  'Buildings & Residential': { te: 'భవనాలు & నివాస స్థలాలు', ta: 'கட்டிடங்கள் & குடியிருப்பு', hi: 'भवन और आवासीय' },
  '🏠 Buildings & Residential': { te: '🏠 భవనాలు & నివాస స్థలాలు', ta: '🏠 கட்டிடங்கள் & குடியிருப்பு', hi: '🏠 भवन और आवासीय' },
  'Building / Residential': { te: 'భవనాలు & నివాస స్థలాలు', ta: 'கட்டிடங்கள் & குடியிருப்பு', hi: 'भवन और आवासीय' },
  'Agricultural': { te: 'వ్యవసాయం', ta: 'விவசாயம்', hi: 'कृषि' },
  'Commercial': { te: 'వాణిజ్యం', ta: 'வணிகம்', hi: 'व्यावसायिक' },
  'Residential': { te: 'నివాస ప్రాంతం', ta: 'குடியிருப்பு', hi: 'आवासीय' },
  'Non-Agri / Built': { te: 'వ్యవసాయేతర / నిర్మాణం', ta: 'விவசாயமற்ற / கட்டப்பட்டது', hi: 'गैर-कृषि / निर्मित' },
  'Industrial': { te: 'పారిశ్రామిక', ta: 'தொழில்துறை', hi: 'औद्योगिक' },

  // Extents, Metrics & Units
  'Total Land Holding': { te: 'మొత్తం భూమి విస్తీర్ణం', ta: 'மொத்த நில உடைமை', hi: 'कुल भूमि स्वामित्व' },
  'Land Portfolio Extent by Category': { te: 'వర్గం వారీగా భూముల విస్తీర్ణం', ta: 'வகை வாரியாக நில அளவு', hi: 'श्रेणी के अनुसार भूमि विस्तार' },
  'Primary Extent': { te: 'ప్రాథమిక విస్తీర్ణం', ta: 'முதன்மை பரப்பளவு', hi: 'प्राथमिक विस्तार' },
  'Converted Extent': { te: 'మార్పిడి విస్తీర్ణం', ta: 'மாற்றப்பட்ட பரப்பளவு', hi: 'परिवर्तित विस्तार' },
  'Category': { te: 'భూమి వర్గం', ta: 'நில வகை', hi: 'भूमि श्रेणी' },
  'Acres': { te: 'ఎకరాలు', ta: 'ஏக்கர்', hi: 'एकड़' },
  'Acres registered': { te: 'ఎకరాలు నమోదయ్యాయి', ta: 'ஏக்கர் பதிவு செய்யப்பட்டுள்ளது', hi: 'एकड़ पंजीकृत' },
  'sq.ft': { te: 'చ.అడుగులు', ta: 'ச.அடி', hi: 'वर्ग फीट' },
  'sq.ft extent': { te: 'చ.అడుగుల విస్తీర్ణం', ta: 'ச.அடி பரப்பளவு', hi: 'वर्ग फीट विस्तार' },
  'Registered Parcels': { te: 'నమోదైన భూములు', ta: 'பதிவு செய்யப்பட்ட நிலங்கள்', hi: 'पंजीकृत भूखंड' },
  'Registered Parcels:': { te: 'నమోదైన భూములు:', ta: 'பதிவு செய்யப்பட்ட நிலங்கள்:', hi: 'पंजीकृत भूखंड:' },
  'No commercial parcels': { te: 'వాణిజ్య భూములు లేవు', ta: 'வணிக நிலங்கள் இல்லை', hi: 'कोई व्यावसायिक भूखंड नहीं' },
  'No built parcels': { te: 'నిర్మాణ భూములు లేవు', ta: 'கட்டிட நிலங்கள் இல்லை', hi: 'कोई निर्मित भूखंड नहीं' },
  'Extent Applied': { te: 'కోరిన విస్తీర్ణం', ta: 'விண்ணப்பித்த பரப்பளவு', hi: 'लागू विस्तार' },
  'Land Area': { te: 'భూమి వైశాల్యం', ta: 'நில பரப்பளவு', hi: 'भूमि क्षेत्रफल' },

  // Dashboard & Navigation Headings
  'Dashboard': { te: 'డాష్‌బోర్డ్', ta: 'டாஷ்போர்டு', hi: 'डैशबोर्ड' },
  'Citizen Portal': { te: 'పౌరుల పోర్టల్', ta: 'குடிமக்கள் போர்டல்', hi: 'नागरिक पोर्टल' },
  'Officer Portal': { te: 'అధికారుల పోర్టల్', ta: 'அதிகாரிகள் போர்டல்', hi: 'अधिकारी पोर्टल' },
  'Admin Portal': { te: 'అడ్మిన్ పోర్టల్', ta: 'நிர்வாகி போர்டல்', hi: 'व्यवस्थापक पोर्टल' },
  'Public Citizen': { te: 'పౌరుడు', ta: 'பொது குடிமகன்', hi: 'नागरिक' },
  'Revenue Officer (VRO)': { te: 'రెవెన్యూ అధికారి (VRO)', ta: 'வருவாய் அலுவலர் (VRO)', hi: 'राजस्व अधिकारी (VRO)' },
  'Tahsildar': { te: 'తహశీల్దార్', ta: 'வட்டாட்சியர்', hi: 'तहसीलदार' },
  'System Administrator': { te: 'సిస్టమ్ అడ్మినిస్ట్రేటర్', ta: 'கணினி நிர்வாகி', hi: 'सिस्टम प्रशासक' },
  'View All Records': { te: 'అన్ని రికార్డులను చూడండి', ta: 'அனைத்து பதிவுகளையும் பார்க்கவும்', hi: 'सभी रिकॉर्ड देखें' },
  'View All': { te: 'అన్నీ చూడండి', ta: 'அனைத்தும் பார்க்கவும்', hi: 'सभी देखें' },
  'Open Full GIS': { te: 'పూర్తి జీఐఎస్ తెరవండి', ta: 'முழு GIS திறக்கவும்', hi: 'पूर्ण GIS खोलें' },
  'Open Full GIS →': { te: 'పూర్తి జీఐఎస్ తెరవండి →', ta: 'முழு GIS திறக்கவும் →', hi: 'पूर्ण GIS खोलें →' },
  'Cadastral shapes synced with RoR': { te: 'ఆర్వోఆర్ తో సరిపోలిన కాడస్ట్రాల్ మ్యాప్స్', ta: 'RoR உடன் ஒத்திசைக்கப்பட்ட காடாஸ்ட்ரல் வரைபடங்கள்', hi: 'RoR के साथ समन्वयित भू-मानचित्र' },
  'Fast access to key public land services': { te: 'ముఖ్యమైన భూ పరిపాలన ప్రజా సేవలు', ta: 'முக்கிய நில நிர்வாக பொது சேவைகள்', hi: 'प्रमुख भूमि प्रशासन सार्वजनिक सेवाएं' },
  'Verified landholdings on record': { te: 'రికార్డులలో నమోదైన ధృవీకృత భూములు', ta: 'பதிவுகளில் உள்ள சரிபார்க்கப்பட்ட நிலங்கள்', hi: 'रिकॉर्ड में सत्यापित भूमि स्वामित्व' },
  'Track statutory progress in real-time': { te: 'దరఖాస్తు స్థితిని ప్రత్యక్షంగా ట్రాక్ చేయండి', ta: 'விண்ணப்ப நிலையை நேரலையில் கண்காணிக்கவும்', hi: 'वास्तविक समय में वैधानिक प्रगति ट्रैक करें' },
  'All Files Up to Date': { te: 'అన్ని ఫైళ్లు పూర్తి అయ్యాయి', ta: 'அனைத்து கோப்புகளும் புதுப்பிக்கப்பட்டன', hi: 'सभी फाइलें अद्यतित हैं' },
  'All Services Up-to-Date': { te: 'అన్ని సేవలు తాజాగా ఉన్నాయి', ta: 'அனைத்து சேவைகளும் புதுப்பித்த நிலையில் உள்ளன', hi: 'सभी सेवाएं अद्यतित हैं' },
  'Under Verification': { te: 'పరిశీలనలో ఉంది', ta: 'சரிபார்ப்பில் உள்ளது', hi: 'सत्यापनाधीन' },
  'Statutory Applications Roster': { te: 'చట్టబద్ధమైన దరఖాస్తుల జాబితా', ta: 'சட்டரீதியான விண்ணப்பங்களின் பட்டியல்', hi: 'वैधानिक आवेदन रोस्टर' },
  'Review File': { te: 'ఫైలును సమీక్షించండి', ta: 'கோப்பை மதிப்பாய்வு செய்க', hi: 'फाइल की समीक्षा करें' },
  'Total Applications': { te: 'మొత్తం దరఖాస్తులు', ta: 'மொத்த விண்ணப்பங்கள்', hi: 'कुल आवेदन' },
  'Assigned Jurisdiction': { te: 'కేటాయించిన అధికార పరిధి', ta: 'ஒதுக்கப்பட்ட அதிகார வரம்பு', hi: 'सौंपा गया क्षेत्राधिकार' },
  'In Queue': { te: 'వరుస క్రమంలో', ta: 'வரிசையில்', hi: 'कतार में' },
  'Digitally Endorsed': { te: 'డిజిటల్‌గా ఆమోదించబడింది', ta: 'டிஜிட்டல் முறையில் ஒப்புதல் அளிக்கப்பட்டது', hi: 'डिजिटल रूप से समर्थित' },
  'Disposed': { te: 'పరిష్కరించబడింది', ta: 'முடிவு செய்யப்பட்டது', hi: 'निपटारा किया गया' },

  // Geography & Identification
  'State': { te: 'రాష్ట్రం', ta: 'மாநிலம்', hi: 'राज्य' },
  'District': { te: 'జిల్లా', ta: 'மாவட்டம்', hi: 'जिला' },
  'Mandal': { te: 'మండలం', ta: 'வட்டம்', hi: 'मंडल' },
  'Village': { te: 'గ్రామం', ta: 'கிராமம்', hi: 'गांव' },
  'Village & Mandal': { te: 'గ్రామం & మండలం', ta: 'கிராமம் & வட்டம்', hi: 'गांव और मंडल' },
  'Survey Number': { te: 'సర్వే నంబర్', ta: 'சர்வே எண்', hi: 'सर्वेक्षण संख्या' },
  'Survey No.': { te: 'సర్వే నం.', ta: 'சர்வே எண்', hi: 'सर्वे संख्या' },
  'ULPIN': { te: 'యూఎల్‌పీఐఎన్ (ULPIN)', ta: 'ULPIN', hi: 'ULPIN' },
  'Applicant': { te: 'దరఖాస్తుదారుడు', ta: 'விண்ணப்பதாரர்', hi: 'आवेदक' },
  'Applicant:': { te: 'దరఖాస్తుదారుడు:', ta: 'விண்ணப்பதாரர்:', hi: 'आवेदक:' },
  'Submitted On': { te: 'సమర్పించిన తేదీ', ta: 'சமர்ப்பிக்கப்பட்ட தேதி', hi: 'जमा करने की तिथि' },
  'Department Desk': { te: 'శాఖ విభాగం', ta: 'துறை மேசை', hi: 'विभाग डेस्क' },
  'Department Desk:': { te: 'శాఖ విభాగం:', ta: 'துறை மேசை:', hi: 'विभाग डेस्क:' },
  'All Departments': { te: 'అన్ని శాఖలు', ta: 'அனைத்து துறைகளும்', hi: 'सभी विभाग' },
  'Revenue': { te: 'రెవెన్యూ', ta: 'வருவாய்', hi: 'राजस्व' },
  'Survey': { te: 'సర్వే', ta: 'நில அளவீடு', hi: 'सर्वेक्षण' },
  'Registration': { te: 'రిజిస్ట్రేషన్', ta: 'பதிவு', hi: 'पंजीकरण' },
  'Town Planning': { te: 'పట్టణ ప్రణాళిక', ta: 'நகர திட்டமிடல்', hi: 'नगर नियोजन' },

  // Common UI Actions
  'Apply Service': { te: 'సేవ కొరకు దరఖాస్తు', ta: 'சேவைக்கு விண்ணப்பிக்கவும்', hi: 'सेवा के लिए आवेदन करें' },
  'View Map': { te: 'మ్యాప్‌లో చూడండి', ta: 'வரைபடத்தில் பார்க்கவும்', hi: 'मानचित्र देखें' },
  'View on Map': { te: 'మ్యాప్‌లో చూడండి', ta: 'வரைபடத்தில் பார்க்கவும்', hi: 'मानचित्र पर देखें' },
  'Clear': { te: 'క్లియర్', ta: 'அழிக்க', hi: 'साफ़ करें' },
  'Search': { te: 'శోధించండి', ta: 'தேடவும்', hi: 'खोजें' },
  'Track': { te: 'ట్రాక్ చేయండి', ta: 'கண்காணிக்கவும்', hi: 'ट्रैक करें' },
  'View': { te: 'చూడండి', ta: 'பார்க்கவும்', hi: 'देखें' },
  'Print': { te: 'ప్రింట్', ta: 'அச்சிடுக', hi: 'प्रिंट' },
  'Download': { te: 'డౌన్‌లోడ్', ta: 'பதிவிறக்கு', hi: 'डाउनलोड' },
  'Submit': { te: 'సమర్పించండి', ta: 'சமர்ப்பிக்கவும்', hi: 'जमा करें' },
  'Cancel': { te: 'రద్దు చేయండి', ta: 'ரத்துசெய்', hi: 'रद्द करें' },
  'Close': { te: 'మూసివేయండి', ta: 'மூடு', hi: 'बंद करें' },
  'Active Session': { te: 'క్రియాశీల సెషన్', ta: 'செயலில் உள்ள அமர்வு', hi: 'सक्रिय सत्र' },

  // Statuses & Workflow Stages
  'Submitted': { te: 'సమర్పించబడింది', ta: 'சமர்ப்பிக்கப்பட்டது', hi: 'जमा किया गया' },
  'Approved': { te: 'ఆమోదించబడింది', ta: 'ஒப்புதல் அளிக்கப்பட்டது', hi: 'स्वीकृत' },
  'Rejected': { te: 'తిరస్కరించబడింది', ta: 'நிராகரிக்கப்பட்டது', hi: 'अस्वीकृत' },
  'In Progress': { te: 'ప్రగతిలో ఉంది', ta: 'செயல்பாட்டில் உள்ளது', hi: 'प्रगति पर है' },
  'Pending': { te: 'పెండింగ్‌లో ఉంది', ta: 'நிலுவையில் உள்ளது', hi: 'लंबित' },
  'Correction': { te: 'సవరణ అవసరం', ta: 'திருத்தம் தேவை', hi: 'संशोधन आवश्यक' },
  'Under Review': { te: 'పరిశీలనలో ఉంది', ta: 'மறுஆய்வில் உள்ளது', hi: 'समीक्षाधीन' },
  'Verified': { te: 'ధృవీకరించబడింది', ta: 'சரிபார்க்கப்பட்டது', hi: 'सत्यापित' },
  'Completed': { te: 'పూర్తయింది', ta: 'முடிவடைந்தது', hi: 'पूर्ण' },
  'Order Issued': { te: 'ఉత్తర్వులు జారీ చేయబడ్డాయి', ta: 'ஆணை பிறப்பிக்கப்பட்டது', hi: 'आदेश जारी किया गया' },
  'Final Decree': { te: 'తుది ఉత్తర్వు', ta: 'இறுதி ஆணை', hi: 'अंतिम आदेश' },
  'Order & Sanction': { te: 'ఆమోద ఉత్తర్వులు', ta: 'ஒப்புதல் ஆணை', hi: 'स्वीकृति आदेश' },
  'Records Updated': { te: 'రికార్డులు నవీకరించబడ్డాయి', ta: 'பதிவுகள் புதுப்பிக்கப்பட்டன', hi: 'रिकॉर्ड अद्यतन किए गए' },
  'Awaiting Clearances': { te: 'అనుమతుల కోసం వేచి ఉంది', ta: 'ஒப்புதல்களுக்கு காத்திருக்கிறது', hi: 'स्वीकृतियों की प्रतीक्षा' },
  'Queued': { te: 'వరుసలో ఉంది', ta: 'வரிசையில் உள்ளது', hi: 'कतारबद्ध' },
  'Official Statutory Title Proof': { te: 'అధికారిక చట్టబద్ధమైన యాజమాన్య ధృవీకరణ', ta: 'அதிகாரப்பூர்வ சட்டரீதியான உரிமைச் சான்று', hi: 'आधिकारिक वैधानिक स्वामित्व प्रमाण' },
  'View & Print Certified Ownership Proof': { te: 'ధృవీకరించిన యాజమాన్య పత్రాన్ని చూడండి & ముద్రించండి', ta: 'சான்றளிக்கப்பட்ட உரிமைச் சான்றைப் பார்க்க & அச்சிடவும்', hi: 'सत्यापित स्वामित्व प्रमाण देखें और प्रिंट करें' },
  'Tahsildar Certified Land Ownership & Dispute Clearance Order': { te: 'తహశీల్దార్ ధృవీకరించిన భూ యాజమాన్య & వివాద పరిష్కార ఉత్తర్వు', ta: 'வட்டாட்சியர் சான்றளித்த நில உரிமை & தகராறு தீர்வு ஆணை', hi: 'तहसीलदार प्रमाणित भूमि स्वामित्व और विवाद समाधान आदेश' },
  'Action Required at Your Desk': { te: 'మీ పరిశీలన కోసం వేచి ఉంది', ta: 'உங்கள் மேசையில் நடவடிக்கை தேவை', hi: 'आपकी डेस्क पर कार्रवाई अपेक्षित' },
  'Admin Master Control': { te: 'అడ్మిన్ మాస్టర్ కంట్రోల్', ta: 'நிர்வாகி முதன்மைக் கட்டுப்பாடு', hi: 'व्यवस्थापक मास्टर नियंत्रण' },

  // Descriptive Sentences
  'No applications found in this queue': { te: 'ఈ విభాగంలో ఎటువంటి దరఖాస్తులు లేవు', ta: 'இந்த வரிசையில் விண்ணப்பங்கள் எதுவும் இல்லை', hi: 'इस कतार में कोई आवेदन नहीं मिला' },
  'No registered landholdings found matching your filter or profile.': { te: 'మీ శోధనకు లేదా ఖాతాకు సరిపోలే భూమి రికార్డులేవీ కనుగొనబడలేదు.', ta: 'உங்கள் தேடலுக்கு அல்லது கணக்கிற்குப் பொருந்தும் நிலப் பதிவுகள் எதுவும் கிடைக்கவில்லை.', hi: 'आपके फिल्टर या प्रोफाइल से मेल खाने वाले कोई भूमि रिकॉर्ड नहीं मिले।' },
  'You currently have no active land service requests. Start an application to begin.': { te: 'మీకు ప్రస్తుతం ఎటువంటి పెండింగ్ దరఖాస్తులు లేవు. సేవను ప్రారంభించడానికి దరఖాస్తు చేయండి.', ta: 'தற்போது நிலுவையில் உள்ள விண்ணப்பங்கள் எதுவும் இல்லை. புதிய விண்ணப்பத்தை தொடங்கவும்.', hi: 'वर्तमान में आपके पास कोई सक्रिय सेवा अनुरोध नहीं है। शुरू करने के लिए आवेदन करें।' },
  'Search by Token ID, Citizen Name, Survey Number, or Service...': { te: 'టోకెన్ ఐడీ, పౌరుడి పేరు, సర్వే నంబర్ లేదా సేవ ద్వారా శోధించండి...', ta: 'டோக்கன் ஐடி, குடிமகன் பெயர், சர்வே எண் அல்லது சேவை மூலம் தேடவும்...', hi: 'टोकन आईडी, नागरिक का नाम, सर्वेक्षण संख्या, या सेवा द्वारा खोजें...' },
  'Search survey no, ULPIN, village, owner...': { te: 'సర్వే నంబర్, ULPIN, గ్రామం, యజమాని పేరుతో శోధించండి...', ta: 'சர்வே எண், ULPIN, கிராமம், உரிமையாளர் மூலம் தேடவும்...', hi: 'सर्वेक्षण संख्या, ULPIN, गांव, मालिक द्वारा खोजें...' },
};

/**
 * Universal dynamic translation function.
 * Matches exact phrase, case-insensitive, or parses composite templates.
 */
export function translateDynamic(text: string, lng: SupportedLanguage): string {
  if (!text || lng === 'en') return text;

  const trimmed = text.trim();

  // 1. Direct exact match
  if (DYNAMIC_GLOSSARY[trimmed] && DYNAMIC_GLOSSARY[trimmed][lng]) {
    return DYNAMIC_GLOSSARY[trimmed][lng];
  }

  // 2. Case-insensitive match
  const lower = trimmed.toLowerCase();
  for (const [k, v] of Object.entries(DYNAMIC_GLOSSARY)) {
    if (k.toLowerCase() === lower && v[lng]) {
      return v[lng];
    }
  }

  // 3. Composite pattern translation (e.g. "5.53 Acres", "2400 sq.ft", "Survey #101")
  const acresMatch = trimmed.match(/^([\d.,]+)\s*Acres$/i);
  if (acresMatch) {
    const val = acresMatch[1];
    if (lng === 'te') return val + ' ఎకరాలు';
    if (lng === 'ta') return val + ' ஏக்கர்';
    if (lng === 'hi') return val + ' एकड़';
  }

  const sqftMatch = trimmed.match(/^([\d.,]+)\s*sq\.?ft$/i);
  if (sqftMatch) {
    const val = sqftMatch[1];
    if (lng === 'te') return val + ' చ.అడుగులు';
    if (lng === 'ta') return val + ' ச.அடி';
    if (lng === 'hi') return val + ' वर्ग फीट';
  }

  if (trimmed.startsWith('Submitted on ')) {
    const datePart = trimmed.replace('Submitted on ', '');
    if (lng === 'te') return 'సమర్పించిన తేదీ: ' + datePart;
    if (lng === 'ta') return 'சமர்ப்பிக்கப்பட்ட தேதி: ' + datePart;
    if (lng === 'hi') return 'जमा करने की तिथि: ' + datePart;
  }

  const totalMatch = trimmed.match(/^Total:\s*([\d.,]+)\s*Acres\s*\(([\d.,]+)\s*sq\.?ft\)$/i);
  if (totalMatch) {
    const a = totalMatch[1];
    const s = totalMatch[2];
    if (lng === 'te') return 'మొత్తం: ' + a + ' ఎకరాలు (' + s + ' చ.అడుగులు)';
    if (lng === 'ta') return 'மொத்தம்: ' + a + ' ஏக்கர் (' + s + ' ச.அடி)';
    if (lng === 'hi') return 'कुल: ' + a + ' एकड़ (' + s + ' वर्ग फीट)';
  }

  return text;
}
