/**
 * DharaniSetu Future-Proof Dynamic Auto-Translation Engine
 * Automatically intercepts and translates UI phrases, notifications, status labels, metrics, and land governance terms
 * into Telugu, Tamil, and Hindi even if a hardcoded string or dynamic notification is passed.
 */

export type SupportedLanguage = 'en' | 'te' | 'ta' | 'hi';

export interface TranslationDict {
  te: string;
  ta: string;
  hi: string;
}

export const DYNAMIC_GLOSSARY: Record<string, TranslationDict> = {
  // Notifications Titles & Buttons
  'Notifications': { te: 'నోటిఫికేషన్లు', ta: 'அறிவிப்புகள்', hi: 'सूचनाएं' },
  'Real-time statutory status updates, revenue officer notices, and verification alerts': {
    te: 'తాజా చట్టబద్ధమైన స్థితి సమాచారం, రెవెన్యూ అధికారుల నోటీసులు మరియు పరిశీలన హెచ్చరికలు',
    ta: 'நேரலை சட்டப்பூர்வ நிலை புதுப்பிப்புகள், வருவாய் அலுவலர் அறிவிப்புகள் மற்றும் சரிபார்ப்பு விழிப்பூட்டல்கள்',
    hi: 'वास्तविक समय वैधानिक स्थिति अपडेट, राजस्व अधिकारी नोटिस और सत्यापन अलर्ट'
  },
  'Department assignments, application routing alerts, and statutory notices': {
    te: 'శాఖల కేటాయింపులు, దరఖాస్తు రూటింగ్ హెచ్చరికలు మరియు చట్టబద్ధమైన నోటీసులు',
    ta: 'துறை ஒதுக்கீடுகள், விண்ணப்ப வழித்தட எச்சரிக்கைகள் மற்றும் சட்டரீதியான அறிவிப்புகள்',
    hi: 'विभाग आवंटन, आवेदन रूटिंग अलर्ट और वैधानिक नोटिस'
  },
  'Mark all as read': { te: 'అన్నీ చదివినట్లు గుర్తించు', ta: 'அனைத்தையும் படித்ததாகக் குறிக்கவும்', hi: 'सभी को पढ़ा हुआ चिह्नित करें' },
  'Mark as read': { te: 'చదివినట్లు గుర్తించు', ta: 'படித்ததாகக் குறிக்கவும்', hi: 'पढ़ा हुआ चिह्नित करें' },
  'All caught up': { te: 'అన్ని నోటిఫికేషన్లు పూర్తయ్యాయి', ta: 'அனைத்தும் புதுப்பிக்கப்பட்டது', hi: 'सब अद्यतित हैं' },
  'No Notifications Yet': { te: 'ఇంకా నోటిఫికేషన్లు ఏవీ లేవు', ta: 'இதுவரை அறிவிப்புகள் இல்லை', hi: 'अभी तक कोई सूचना नहीं है' },
  'No notifications yet': { te: 'ఇంకా నోటిఫికేషన్లు ఏవీ లేవు', ta: 'இதுவரை அறிவிப்புகள் இல்லை', hi: 'अभी तक कोई सूचना नहीं है' },
  'View Application Details': { te: 'దరఖాస్తు వివరాలను చూడండి', ta: 'விண்ணப்ப விவரங்களைப் பார்க்கவும்', hi: 'आवेदन विवरण देखें' },
  'Open Application': { te: 'దరఖాస్తును తెరవండి', ta: 'விண்ணப்பத்தைத் திறக்கவும்', hi: 'आवेदन खोलें' },
  'Application Fully Approved & Certified': {
    te: 'దరఖాస్తు పూర్తిగా ఆమోదించబడింది & ధృవీకరించబడింది',
    ta: 'விண்ணப்பம் முழுமையாக அங்கீகரிக்கப்பட்டு சான்றளிக்கப்பட்டது',
    hi: 'आवेदन पूर्णतः स्वीकृत और प्रमाणित'
  },
  'Land Ownership Proof Document Issued': {
    te: 'భూ యాజమాన్య ధృవీకరణ పత్రం జారీ చేయబడింది',
    ta: 'நில உரிமைச் சான்று ஆவணம் வழங்கப்பட்டது',
    hi: 'भूमि स्वामित्व प्रमाण पत्र जारी किया गया'
  },
  'Application Submitted': {
    te: 'దరఖాస్తు విజయవంతంగా సమర్పించబడింది',
    ta: 'விண்ணப்பம் சமர்ப்பிக்கப்பட்டது',
    hi: 'आवेदन सफलतापूर्वक जमा किया गया'
  },
  'New Statutory Application Assigned': {
    te: 'కొత్త చట్టబద్ధమైన దరఖాస్తు కేటాయించబడింది',
    ta: 'புதிய சட்டரீதியான விண்ணப்பம் ஒதுக்கப்பட்டது',
    hi: 'नया वैधानिक आवेदन आवंटित किया गया'
  },

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
  'Search survey no, ULPIN, village, owner...': { te: 'సర్వే నంబర్, ULPIN, గ్రామం, యజమాని పేరుతో శోధించండి...', ta: 'సర్వే எண், ULPIN, கிராமம், உரிமையாளர் மூலம் தேடவும்...', hi: 'सर्वेक्षण संख्या, ULPIN, गांव, मालिक द्वारा खोजें...' },
};

const DEPT_MAP: Record<string, TranslationDict> = {
  'Survey': { te: 'సర్వే విభాగం', ta: 'நில அளவைத் துறை', hi: 'सर्वेक्षण विभाग' },
  'Revenue': { te: 'రెవెన్యూ విభాగం', ta: 'வருவாய்த் துறை', hi: 'राजस्व विभाग' },
  'Tahsildar': { te: 'తహశీల్దార్', ta: 'வட்டாட்சியர்', hi: 'तहसीलदार' },
  'Town Planning': { te: 'పట్టణ ప్రణాళికా విభాగం', ta: 'நகர திட்டமிடல் துறை', hi: 'नगर नियोजन विभाग' },
  'Registration': { te: 'రిజిస్ట్రేషన్ శాఖ', ta: 'பத்திரப்பதிவுத் துறை', hi: 'पंजीकरण विभाग' }
};

const STATUS_MAP: Record<string, TranslationDict> = {
  'OFFICER REVIEW': { te: 'అధికారి తుది పరిశీలన', ta: 'அதிகாரி மறுஆய்வு', hi: 'अधिकारी समीक्षा' },
  'FIELD VERIFICATION': { te: 'క్షేత్రస్థాయి విచారణ', ta: 'கள ஆய்வு', hi: 'क्षेत्र सत्यापन' },
  'GIS VERIFICATION': { te: 'జీఐఎస్ మ్యాప్ పరిశీలన', ta: 'GIS சரிபார்ப்பு', hi: 'जीआईएस सत्यापन' },
  'DOCUMENT_VERIFICATION': { te: 'పత్రాల పరిశీలన', ta: 'ஆவண சரிபார்ப்பு', hi: 'दस्तावेज़ सत्यापन' },
  'APPROVED': { te: 'ఆమోదించబడింది', ta: 'ஒப்புதல் அளிக்கப்பட்டது', hi: 'स्वीकृत' },
  'REJECTED': { te: 'తిరస్కరించబడింది', ta: 'நிராகரிக்கப்பட்டது', hi: 'अस्वीकृत' },
  'COMPLETED': { te: 'పూర్తయింది', ta: 'முடிவடைந்தது', hi: 'पूर्ण' },
  'SUBMITTED': { te: 'సమర్పించబడింది', ta: 'சமர்ப்பிக்கப்பட்டது', hi: 'जमा किया गया' }
};

/**
 * Universal dynamic translation function.
 * Matches exact phrases, case-insensitive matches, or parses notifications and templates.
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

  // 3. Notification Titles: "Approved by {dept}"
  const approvedByMatch = trimmed.match(/^Approved by (.+)$/i);
  if (approvedByMatch) {
    const dept = approvedByMatch[1].trim();
    const locDept = (DEPT_MAP[dept] && DEPT_MAP[dept][lng]) || dept;
    if (lng === 'te') return `${locDept} ద్వారా ఆమోదించబడింది`;
    if (lng === 'ta') return `${locDept} மூலம் அங்கீகரிக்கப்பட்டது`;
    if (lng === 'hi') return `${locDept} द्वारा स्वीकृत`;
  }

  // Notification Titles: "Action Required by {dept}"
  const actionReqMatch = trimmed.match(/^Action Required by (.+)$/i);
  if (actionReqMatch) {
    const dept = actionReqMatch[1].trim();
    const locDept = (DEPT_MAP[dept] && DEPT_MAP[dept][lng]) || dept;
    if (lng === 'te') return `${locDept} ద్వారా చర్య అవసరం`;
    if (lng === 'ta') return `${locDept} மூலம் நடவடிக்கை தேவை`;
    if (lng === 'hi') return `${locDept} द्वारा कार्रवाई अपेक्षित`;
  }

  // Notification Titles: "Application Rejected by {dept}"
  const appRejMatch = trimmed.match(/^Application Rejected by (.+)$/i);
  if (appRejMatch) {
    const dept = appRejMatch[1].trim();
    const locDept = (DEPT_MAP[dept] && DEPT_MAP[dept][lng]) || dept;
    if (lng === 'te') return `${locDept} ద్వారా దరఖాస్తు తిరస్కరించబడింది`;
    if (lng === 'ta') return `${locDept} மூலம் விண்ணப்பம் நிராகரிக்கப்பட்டது`;
    if (lng === 'hi') return `${locDept} द्वारा आवेदन अस्वीकृत`;
  }

  // Notification Titles: "Application {STATUS}"
  const appStatusMatch = trimmed.match(/^Application ([A-Z_ ]+)$/);
  if (appStatusMatch) {
    const st = appStatusMatch[1].trim();
    const locStatus = (STATUS_MAP[st] && STATUS_MAP[st][lng]) || st;
    if (lng === 'te') return `దరఖాస్తు: ${locStatus}`;
    if (lng === 'ta') return `விண்ணப்பம்: ${locStatus}`;
    if (lng === 'hi') return `आवेदन: ${locStatus}`;
  }

  // Notification Titles: "New Case File Forwarded to {dept}"
  const forwardMatch = trimmed.match(/^New Case File Forwarded to (.+)$/i);
  if (forwardMatch) {
    const dept = forwardMatch[1].trim();
    const locDept = (DEPT_MAP[dept] && DEPT_MAP[dept][lng]) || dept;
    if (lng === 'te') return `${locDept} విభాగానికి కొత్త ఫైల్ పంపబడింది`;
    if (lng === 'ta') return `${locDept} துறைக்கு புதிய கோப்பு அனுப்பப்பட்டது`;
    if (lng === 'hi') return `${locDept} को नई केस फाइल भेजी गई`;
  }

  // 4. Notification Messages: Pattern A: "Your application {token} status has been updated to: {status}. {rest}"
  const matchA = trimmed.match(/^Your application\s+([\w-]+)\s+status has been updated to:\s*([^.]+)\.\s*(.*)$/i);
  if (matchA) {
    const token = matchA[1];
    const status = matchA[2].trim();
    const rest = matchA[3].trim();
    const locStatus = (STATUS_MAP[status] && STATUS_MAP[status][lng]) || status;

    let locRest = rest;
    if (rest.startsWith('Field verification completed by')) {
      const by = rest.replace('Field verification completed by', '').trim();
      if (lng === 'te') locRest = `క్షేత్రస్థాయి పరిశీలన ${by} ద్వారా పూర్తయింది.`;
      if (lng === 'ta') locRest = `கள ஆய்வு ${by} மூலம் முடிக்கப்பட்டது.`;
      if (lng === 'hi') locRest = `क्षेत्र सत्यापन ${by} द्वारा पूरा किया गया।`;
    } else if (rest.startsWith('Officer statutory review completed by')) {
      const by = rest.replace('Officer statutory review completed by', '').trim();
      if (lng === 'te') locRest = `అధికారి చట్టబద్ధమైన సమీక్ష ${by} ద్వారా పూర్తయింది.`;
      if (lng === 'ta') locRest = `அதிகாரி சட்டரீதியான மறுஆய்வு ${by} மூலம் முடிக்கப்பட்டது.`;
      if (lng === 'hi') locRest = `अधिकारी वैधानिक समीक्षा ${by} द्वारा पूरी की गई।`;
    }

    if (lng === 'te') return `మీ దరఖాస్తు ${token} స్థితి '${locStatus}' కు నవీకరించబడింది. ${locRest}`;
    if (lng === 'ta') return `உங்கள் விண்ணப்பம் ${token} நிலை '${locStatus}' என மாற்றப்பட்டது. ${locRest}`;
    if (lng === 'hi') return `आपके आवेदन ${token} की स्थिति बदलकर '${locStatus}' कर दी गई है। ${locRest}`;
  }

  // Pattern B: "Final Statutory Clearance granted by {officer}. Order issued and land record synchronized. Remarks: {remarks}"
  const matchB = trimmed.match(/^Final Statutory Clearance granted by\s+(.+?)\.\s*Order issued and land record synchronized\.\s*Remarks:\s*(.*)$/i);
  if (matchB) {
    const officer = matchB[1].trim();
    const remarks = matchB[2].trim();
    if (lng === 'te') return `${officer} ద్వారా తుది చట్టబద్ధమైన ఆమోదం లభించింది. ఉత్తర్వు జారీ చేయబడింది మరియు భూమి రికార్డు నవీకరించబడింది. వివరాలు: ${remarks}`;
    if (lng === 'ta') return `${officer} மூலம் இறுதி சட்டப்பூர்வ அனுமதி வழங்கப்பட்டது. இறுதி ஆணை பிறப்பிக்கப்பட்டு நிலப் பதிவு ஒத்திசைக்கப்பட்டது. குறிப்பு: ${remarks}`;
    if (lng === 'hi') return `${officer} द्वारा अंतिम वैधानिक स्वीकृति प्रदान की गई। अंतिम आदेश जारी किया गया और भूमि रिकॉर्ड समन्वयित किया गया। विवरण: ${remarks}`;
  }

  // Pattern C: "Approved by {dept} ({officer}) and transferred to {nextDept} ({nextOfficer}). Remarks: {remarks}"
  const matchC = trimmed.match(/^Approved by\s+(.+?)\s+and transferred to\s+(.+?)\.\s*Remarks:\s*(.*)$/i);
  if (matchC) {
    const from = matchC[1].trim();
    const to = matchC[2].trim();
    const remarks = matchC[3].trim();
    if (lng === 'te') return `${from} ద్వారా ఆమోదించబడి ${to} కు బదిలీ చేయబడింది. వివరాలు: ${remarks}`;
    if (lng === 'ta') return `${from} மூலம் அங்கீகரிக்கப்பட்டு ${to} க்கு மாற்றப்பட்டது. குறிப்பு: ${remarks}`;
    if (lng === 'hi') return `${from} द्वारा स्वीकृत और ${to} को अग्रेशित किया गया। विवरण: ${remarks}`;
  }

  // Pattern D: "Tahsildar {officer} has finalized your case ({token}). All departments have approved. Your official certified land ownership proof & dispute resolution order is now issued to you."
  const matchD = trimmed.match(/^Tahsildar\s+(.+?)\s+has finalized your case\s*\(([\w-]+)\)\.\s*All departments have approved\.\s*(.*)$/i);
  if (matchD) {
    const officer = matchD[1].trim();
    const token = matchD[2];
    if (lng === 'te') return `తహశీల్దార్ ${officer} మీ కేసు (${token}) ను పూర్తి చేశారు. అన్ని శాఖలు ఆమోదించాయి. మీ ధృవీకరించిన భూ యాజమాన్య ఉత్తర్వు జారీ చేయబడింది.`;
    if (lng === 'ta') return `வட்டாட்சியர் ${officer} உங்கள் வழக்கை (${token}) இறுதி செய்துள்ளார். அனைத்து துறைகளும் ஒப்புதல் அளித்துள்ளன. உங்கள் சான்றளிக்கப்பட்ட நில உரிமை ஆணை வழங்கப்பட்டுள்ளது.`;
    if (lng === 'hi') return `तहसीलदार ${officer} ने आपके मामले (${token}) को अंतिम रूप दे दिया है। सभी विभागों ने स्वीकृति दे दी है। आपका प्रमाणित भूमि स्वामित्व आदेश जारी कर दिया गया है।`;
  }

  // Pattern E: "Mark all as read (X)"
  const markAllMatch = trimmed.match(/^Mark all as read\s*\((\d+)\)$/i);
  if (markAllMatch) {
    const count = markAllMatch[1];
    if (lng === 'te') return `అన్నీ చదివినట్లు గుర్తించు (${count})`;
    if (lng === 'ta') return `அனைத்தையும் படித்ததாகக் குறிக்கவும் (${count})`;
    if (lng === 'hi') return `सभी को पढ़ा हुआ चिह्नित करें (${count})`;
  }

  // Notification Titles: "Discrepancy Scrutiny Decision: {action}"
  const discDecisionMatch = trimmed.match(/^Discrepancy Scrutiny Decision:\s*(.+)$/i);
  if (discDecisionMatch) {
    const act = discDecisionMatch[1].trim();
    if (lng === 'te') return `వ్యత్యాస పరిశీలన నిర్ణయం: ${act}`;
    if (lng === 'ta') return `வேறுபாடு ஆய்வு முடிவு: ${act}`;
    if (lng === 'hi') return `विसंगति संवीक्षा निर्णय: ${act}`;
  }

  // Pattern G: "Your application {token} has been submitted and assigned to Tahsildar {officer}."
  const matchSubmit = trimmed.match(/^Your application\s+([\w-]+)\s+has been submitted and assigned to Tahsildar\s+(.+?)\.?$/i);
  if (matchSubmit) {
    const token = matchSubmit[1];
    const officer = matchSubmit[2].trim();
    if (lng === 'te') return `మీ దరఖాస్తు ${token} సమర్పించబడింది మరియు తహశీల్దార్ ${officer} కు కేటాయించబడింది.`;
    if (lng === 'ta') return `உங்கள் விண்ணப்பம் ${token} சமர்ப்பிக்கப்பட்டு வட்டாட்சியர் ${officer} அவர்களுக்கு ஒதுக்கப்பட்டுள்ளது.`;
    if (lng === 'hi') return `आपका आवेदन ${token} जमा कर दिया गया है और तहसीलदार ${officer} को सौंपा गया है।`;
  }

  // Pattern H: "New application {token} for {service} ({village}, Survey #{survey}) requires your action."
  const matchAssigned = trimmed.match(/^New application\s+([\w-]+)\s+for\s+(.+?)\s+\((.+?),\s*Survey\s*#?([^)]+)\)\s+requires your action\.?$/i);
  if (matchAssigned) {
    const token = matchAssigned[1];
    const service = matchAssigned[2].trim();
    const village = matchAssigned[3].trim();
    const survey = matchAssigned[4].trim();
    if (lng === 'te') return `కొత్త దరఖాస్తు ${token} (${service}, గ్రామం: ${village}, సర్వే #${survey}) మీ చర్య కోసం వేచి ఉంది.`;
    if (lng === 'ta') return `புதிய விண்ணப்பம் ${token} (${service}, கிராமம்: ${village}, சர்வே எண் #${survey}) உங்கள் நடவடிக்கைக்காக காத்திருக்கிறது.`;
    if (lng === 'hi') return `नया आवेदन ${token} (${service}, ग्राम: ${village}, खसरा #${survey}) आपकी कार्रवाई के लिए अपेक्षित है।`;
  }

  // Pattern I: "Application {token} has been verified by {dept} and is now awaiting {nextDept} review."
  const matchAwaiting = trimmed.match(/^Application\s+([\w-]+)\s+has been verified by\s+(.+?)\s+and is now awaiting\s+(.+?)\s+review\.?$/i);
  if (matchAwaiting) {
    const token = matchAwaiting[1];
    const dept = matchAwaiting[2].trim();
    const nextDept = matchAwaiting[3].trim();
    const locDept = (DEPT_MAP[dept] && DEPT_MAP[dept][lng]) || dept;
    const locNextDept = (DEPT_MAP[nextDept] && DEPT_MAP[nextDept][lng]) || nextDept;
    if (lng === 'te') return `దరఖాస్తు ${token} ${locDept} ద్వారా పరిశీలించబడింది మరియు ఇప్పుడు ${locNextDept} పరిశీలన కోసం వేచి ఉంది.`;
    if (lng === 'ta') return `விண்ணப்பம் ${token} ${locDept} மூலம் சரிபார்க்கப்பட்டு இப்போது ${locNextDept} மறுஆய்வுக்காக காத்திருக்கிறது.`;
    if (lng === 'hi') return `आवेदन ${token} ${locDept} द्वारा सत्यापित किया गया है और अब ${locNextDept} समीक्षा की प्रतीक्षा कर रहा है।`;
  }

  // Pattern J: "Tahsildar {officer} reviewed the area discrepancy for {token}. {remarks}"
  const matchDiscRev = trimmed.match(/^Tahsildar\s+(.+?)\s+reviewed the area discrepancy for\s+([\w-]+)\.\s*(.*)$/i);
  if (matchDiscRev) {
    const officer = matchDiscRev[1].trim();
    const token = matchDiscRev[2];
    const remarks = matchDiscRev[3].trim();
    if (lng === 'te') return `తహశీల్దార్ ${officer} దరఖాస్తు ${token} కోసం విస్తీర్ణ వ్యత్యాసాన్ని సమీక్షించారు. ${remarks}`;
    if (lng === 'ta') return `வட்டாட்சியர் ${officer} விண்ணப்பம் ${token} க்கான பரப்பளவு முரண்பாட்டை ஆய்வு செய்தார். ${remarks}`;
    if (lng === 'hi') return `तहसीलदार ${officer} ने ${token} के लिए क्षेत्रफल विसंगति की समीक्षा की। ${remarks}`;
  }

  // Pattern F: "Track {token}"
  const trackMatch = trimmed.match(/^Track\s+([\w-]+)$/i);
  if (trackMatch) {
    const token = trackMatch[1];
    if (lng === 'te') return `${token} ట్రాక్ చేయండి`;
    if (lng === 'ta') return `${token} கண்காணிக்கவும்`;
    if (lng === 'hi') return `${token} ट्रैक करें`;
  }

  // 5. Composite pattern translation (e.g. "5.53 Acres", "2400 sq.ft", "Survey #101")
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
