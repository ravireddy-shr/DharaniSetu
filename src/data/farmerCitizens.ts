import type { User } from '../types';

export interface FarmerCitizen extends User {
  parcelId: string;
  surveyNumber: string;
  village: string;
  parcelIds: string[];
  surveyNumbers: string[];
  villages: string[];
  legacyEmails?: string[];
}

export const DEMO_FARMER_CITIZENS: FarmerCitizen[] = [
  {
    "id": "CIT-FARM-001",
    "email": "k.venkata.rao@farmer.dharanisetu.in",
    "name": "K. Venkata Rao",
    "role": "citizen",
    "phone": "9810000000",
    "state": "AP",
    "district": "AP-CHI",
    "mandal": "AP-CHI-PUTTUR",
    "passbookNumber": "PB-AP-2026-10000",
    "aadhaarMasked": "XXXX-XXXX-2000",
    "parcelsCount": 3,
    "totalAreaAcres": 5.53,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "AP-CHI-001",
    "surveyNumber": "101/B",
    "village": "Puttur",
    "parcelIds": [
      "AP-CHI-001",
      "AP-GUN-013",
      "AP-KRI-025"
    ],
    "surveyNumbers": [
      "101/B",
      "113/B",
      "125/B"
    ],
    "villages": [
      "Puttur",
      "Narasaraopet",
      "Nuzvid"
    ],
    "legacyEmails": [
      "k.venkata.rao.ap-chi-001@farmer.dharanisetu.in",
      "k.venkata.rao.ap-gun-013@farmer.dharanisetu.in",
      "k.venkata.rao.ap-kri-025@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-002",
    "email": "m.subba.reddy@farmer.dharanisetu.in",
    "name": "M. Subba Reddy",
    "role": "citizen",
    "phone": "9810006137",
    "state": "AP",
    "district": "AP-CHI",
    "mandal": "AP-CHI-PUTTUR",
    "passbookNumber": "PB-AP-2026-10077",
    "aadhaarMasked": "XXXX-XXXX-2037",
    "parcelsCount": 3,
    "totalAreaAcres": 2.04,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "AP-CHI-002",
    "surveyNumber": "102/C",
    "village": "Puttur Village 2",
    "parcelIds": [
      "AP-CHI-002",
      "AP-GUN-014",
      "AP-KRI-026"
    ],
    "surveyNumbers": [
      "102/C",
      "114/C",
      "126/C"
    ],
    "villages": [
      "Puttur Village 2",
      "Narasaraopet Village 2",
      "Nuzvid Village 2"
    ],
    "legacyEmails": [
      "m.subba.reddy.ap-chi-002@farmer.dharanisetu.in",
      "m.subba.reddy.ap-gun-014@farmer.dharanisetu.in",
      "m.subba.reddy.ap-kri-026@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-003",
    "email": "p.lakshmi.devi@farmer.dharanisetu.in",
    "name": "P. Lakshmi Devi",
    "role": "citizen",
    "phone": "9810012274",
    "state": "AP",
    "district": "AP-CHI",
    "mandal": "AP-CHI-PUTTUR",
    "passbookNumber": "PB-AP-2026-10154",
    "aadhaarMasked": "XXXX-XXXX-2074",
    "parcelsCount": 3,
    "totalAreaAcres": 4.76,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "AP-CHI-003",
    "surveyNumber": "103/D",
    "village": "Puttur Village 3",
    "parcelIds": [
      "AP-CHI-003",
      "AP-GUN-015",
      "AP-KRI-027"
    ],
    "surveyNumbers": [
      "103/D",
      "115/D",
      "127/D"
    ],
    "villages": [
      "Puttur Village 3",
      "Narasaraopet Village 3",
      "Nuzvid Village 3"
    ],
    "legacyEmails": [
      "p.lakshmi.devi.ap-chi-003@farmer.dharanisetu.in",
      "p.lakshmi.devi.ap-gun-015@farmer.dharanisetu.in",
      "p.lakshmi.devi.ap-kri-027@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-004",
    "email": "s.ramaiah.naidu@farmer.dharanisetu.in",
    "name": "S. Ramaiah Naidu",
    "role": "citizen",
    "phone": "9810018411",
    "state": "AP",
    "district": "AP-CHI",
    "mandal": "AP-CHI-PALAMANER",
    "passbookNumber": "PB-AP-2026-10231",
    "aadhaarMasked": "XXXX-XXXX-2111",
    "parcelsCount": 3,
    "totalAreaAcres": 3.88,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "AP-CHI-004",
    "surveyNumber": "104/A",
    "village": "Palamaner",
    "parcelIds": [
      "AP-CHI-004",
      "AP-GUN-016",
      "AP-VIS-028"
    ],
    "surveyNumbers": [
      "104/A",
      "116/A",
      "128/A"
    ],
    "villages": [
      "Palamaner",
      "Sattenapalle",
      "Bheemunipatnam"
    ],
    "legacyEmails": [
      "s.ramaiah.naidu.ap-chi-004@farmer.dharanisetu.in",
      "s.ramaiah.naidu.ap-gun-016@farmer.dharanisetu.in",
      "s.ramaiah.naidu.ap-vis-028@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-005",
    "email": "b.anjaneyulu@farmer.dharanisetu.in",
    "name": "B. Anjaneyulu",
    "role": "citizen",
    "phone": "9810024548",
    "state": "AP",
    "district": "AP-CHI",
    "mandal": "AP-CHI-PALAMANER",
    "passbookNumber": "PB-AP-2026-10308",
    "aadhaarMasked": "XXXX-XXXX-2148",
    "parcelsCount": 3,
    "totalAreaAcres": 3.92,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "AP-CHI-005",
    "surveyNumber": "105/B",
    "village": "Palamaner Village 2",
    "parcelIds": [
      "AP-CHI-005",
      "AP-GUN-017",
      "AP-VIS-029"
    ],
    "surveyNumbers": [
      "105/B",
      "117/B",
      "129/B"
    ],
    "villages": [
      "Palamaner Village 2",
      "Sattenapalle Village 2",
      "Bheemunipatnam Village 2"
    ],
    "legacyEmails": [
      "b.anjaneyulu.ap-chi-005@farmer.dharanisetu.in",
      "b.anjaneyulu.ap-gun-017@farmer.dharanisetu.in",
      "b.anjaneyulu.ap-vis-029@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-006",
    "email": "t.padma.vathi@farmer.dharanisetu.in",
    "name": "T. Padma Vathi",
    "role": "citizen",
    "phone": "9810030685",
    "state": "AP",
    "district": "AP-CHI",
    "mandal": "AP-CHI-PALAMANER",
    "passbookNumber": "PB-AP-2026-10385",
    "aadhaarMasked": "XXXX-XXXX-2185",
    "parcelsCount": 3,
    "totalAreaAcres": 6.15,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "AP-CHI-006",
    "surveyNumber": "106/C",
    "village": "Palamaner Village 3",
    "parcelIds": [
      "AP-CHI-006",
      "AP-GUN-018",
      "AP-VIS-030"
    ],
    "surveyNumbers": [
      "106/C",
      "118/C",
      "130/C"
    ],
    "villages": [
      "Palamaner Village 3",
      "Sattenapalle Village 3",
      "Bheemunipatnam Village 3"
    ],
    "legacyEmails": [
      "t.padma.vathi.ap-chi-006@farmer.dharanisetu.in",
      "t.padma.vathi.ap-gun-018@farmer.dharanisetu.in",
      "t.padma.vathi.ap-vis-030@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-007",
    "email": "g.krishna.murthy@farmer.dharanisetu.in",
    "name": "G. Krishna Murthy",
    "role": "citizen",
    "phone": "9810036822",
    "state": "AP",
    "district": "AP-CHI",
    "mandal": "AP-CHI-KUPPAM",
    "passbookNumber": "PB-AP-2026-10462",
    "aadhaarMasked": "XXXX-XXXX-2222",
    "parcelsCount": 3,
    "totalAreaAcres": 3.31,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "AP-CHI-007",
    "surveyNumber": "107/D",
    "village": "Kuppam",
    "parcelIds": [
      "AP-CHI-007",
      "AP-KRI-019",
      "AP-VIS-031"
    ],
    "surveyNumbers": [
      "107/D",
      "119/D",
      "131/D"
    ],
    "villages": [
      "Kuppam",
      "Gudivada",
      "Padmanabham"
    ],
    "legacyEmails": [
      "g.krishna.murthy.ap-chi-007@farmer.dharanisetu.in",
      "g.krishna.murthy.ap-kri-019@farmer.dharanisetu.in",
      "g.krishna.murthy.ap-vis-031@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-008",
    "email": "n.sita.mahalakshmi@farmer.dharanisetu.in",
    "name": "N. Sita Mahalakshmi",
    "role": "citizen",
    "phone": "9810042959",
    "state": "AP",
    "district": "AP-CHI",
    "mandal": "AP-CHI-KUPPAM",
    "passbookNumber": "PB-AP-2026-10539",
    "aadhaarMasked": "XXXX-XXXX-2259",
    "parcelsCount": 3,
    "totalAreaAcres": 4.11,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "AP-CHI-008",
    "surveyNumber": "108/A",
    "village": "Kuppam Village 2",
    "parcelIds": [
      "AP-CHI-008",
      "AP-KRI-020",
      "AP-VIS-032"
    ],
    "surveyNumbers": [
      "108/A",
      "120/A",
      "132/A"
    ],
    "villages": [
      "Kuppam Village 2",
      "Gudivada Village 2",
      "Padmanabham Village 2"
    ],
    "legacyEmails": [
      "n.sita.mahalakshmi.ap-chi-008@farmer.dharanisetu.in",
      "n.sita.mahalakshmi.ap-kri-020@farmer.dharanisetu.in",
      "n.sita.mahalakshmi.ap-vis-032@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-009",
    "email": "d.nagabhushanam@farmer.dharanisetu.in",
    "name": "D. Nagabhushanam",
    "role": "citizen",
    "phone": "9810049096",
    "state": "AP",
    "district": "AP-CHI",
    "mandal": "AP-CHI-KUPPAM",
    "passbookNumber": "PB-AP-2026-10616",
    "aadhaarMasked": "XXXX-XXXX-2296",
    "parcelsCount": 3,
    "totalAreaAcres": 5.65,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "AP-CHI-009",
    "surveyNumber": "109/B",
    "village": "Kuppam Village 3",
    "parcelIds": [
      "AP-CHI-009",
      "AP-KRI-021",
      "AP-VIS-033"
    ],
    "surveyNumbers": [
      "109/B",
      "121/B",
      "133/B"
    ],
    "villages": [
      "Kuppam Village 3",
      "Gudivada Village 3",
      "Padmanabham Village 3"
    ],
    "legacyEmails": [
      "d.nagabhushanam.ap-chi-009@farmer.dharanisetu.in",
      "d.nagabhushanam.ap-kri-021@farmer.dharanisetu.in",
      "d.nagabhushanam.ap-vis-033@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-010",
    "email": "v.ramulamma@farmer.dharanisetu.in",
    "name": "V. Ramulamma",
    "role": "citizen",
    "phone": "9810055233",
    "state": "AP",
    "district": "AP-GUN",
    "mandal": "AP-GUN-TENALI",
    "passbookNumber": "PB-AP-2026-10693",
    "aadhaarMasked": "XXXX-XXXX-2333",
    "parcelsCount": 3,
    "totalAreaAcres": 3.28,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "AP-GUN-010",
    "surveyNumber": "110/C",
    "village": "Tenali",
    "parcelIds": [
      "AP-GUN-010",
      "AP-KRI-022",
      "AP-VIS-034"
    ],
    "surveyNumbers": [
      "110/C",
      "122/C",
      "134/C"
    ],
    "villages": [
      "Tenali",
      "Machilipatnam",
      "Pendurthi"
    ],
    "legacyEmails": [
      "v.ramulamma.ap-gun-010@farmer.dharanisetu.in",
      "v.ramulamma.ap-kri-022@farmer.dharanisetu.in",
      "v.ramulamma.ap-vis-034@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-011",
    "email": "c.yesu.ratnam@farmer.dharanisetu.in",
    "name": "C. Yesu Ratnam",
    "role": "citizen",
    "phone": "9810061370",
    "state": "AP",
    "district": "AP-GUN",
    "mandal": "AP-GUN-TENALI",
    "passbookNumber": "PB-AP-2026-10770",
    "aadhaarMasked": "XXXX-XXXX-2370",
    "parcelsCount": 3,
    "totalAreaAcres": 5.11,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "AP-GUN-011",
    "surveyNumber": "111/D",
    "village": "Tenali Village 2",
    "parcelIds": [
      "AP-GUN-011",
      "AP-KRI-023",
      "AP-VIS-035"
    ],
    "surveyNumbers": [
      "111/D",
      "123/D",
      "135/D"
    ],
    "villages": [
      "Tenali Village 2",
      "Machilipatnam Village 2",
      "Pendurthi Village 2"
    ],
    "legacyEmails": [
      "c.yesu.ratnam.ap-gun-011@farmer.dharanisetu.in",
      "c.yesu.ratnam.ap-kri-023@farmer.dharanisetu.in",
      "c.yesu.ratnam.ap-vis-035@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-012",
    "email": "r.bhaskara.rao@farmer.dharanisetu.in",
    "name": "R. Bhaskara Rao",
    "role": "citizen",
    "phone": "9810067507",
    "state": "AP",
    "district": "AP-GUN",
    "mandal": "AP-GUN-TENALI",
    "passbookNumber": "PB-AP-2026-10847",
    "aadhaarMasked": "XXXX-XXXX-2407",
    "parcelsCount": 3,
    "totalAreaAcres": 2.47,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "AP-GUN-012",
    "surveyNumber": "112/A",
    "village": "Tenali Village 3",
    "parcelIds": [
      "AP-GUN-012",
      "AP-KRI-024",
      "AP-VIS-036"
    ],
    "surveyNumbers": [
      "112/A",
      "124/A",
      "136/A"
    ],
    "villages": [
      "Tenali Village 3",
      "Machilipatnam Village 3",
      "Pendurthi Village 3"
    ],
    "legacyEmails": [
      "r.bhaskara.rao.ap-gun-012@farmer.dharanisetu.in",
      "r.bhaskara.rao.ap-kri-024@farmer.dharanisetu.in",
      "r.bhaskara.rao.ap-vis-036@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-013",
    "email": "a.sai.reddy@farmer.dharanisetu.in",
    "name": "A. Sai Reddy",
    "role": "citizen",
    "phone": "9810220932",
    "state": "TG",
    "district": "TG-WAR",
    "mandal": "TG-WAR-HANAMKONDA",
    "passbookNumber": "PB-TG-2026-12772",
    "aadhaarMasked": "XXXX-XXXX-3332",
    "parcelsCount": 3,
    "totalAreaAcres": 2.45,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TG-WAR-037",
    "surveyNumber": "137/B",
    "village": "Hanamkonda",
    "parcelIds": [
      "TG-WAR-037",
      "TG-NAL-049",
      "TG-MED-061"
    ],
    "surveyNumbers": [
      "137/B",
      "149/B",
      "161/B"
    ],
    "villages": [
      "Hanamkonda",
      "Devarakonda",
      "Toopran"
    ],
    "legacyEmails": [
      "a.sai.reddy.tg-war-037@farmer.dharanisetu.in",
      "a.sai.reddy.tg-nal-049@farmer.dharanisetu.in",
      "a.sai.reddy.tg-med-061@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-014",
    "email": "m.ravinder.rao@farmer.dharanisetu.in",
    "name": "M. Ravinder Rao",
    "role": "citizen",
    "phone": "9810227069",
    "state": "TG",
    "district": "TG-WAR",
    "mandal": "TG-WAR-HANAMKONDA",
    "passbookNumber": "PB-TG-2026-12849",
    "aadhaarMasked": "XXXX-XXXX-3369",
    "parcelsCount": 3,
    "totalAreaAcres": 2.98,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TG-WAR-038",
    "surveyNumber": "138/C",
    "village": "Hanamkonda Village 2",
    "parcelIds": [
      "TG-WAR-038",
      "TG-NAL-050",
      "TG-MED-062"
    ],
    "surveyNumbers": [
      "138/C",
      "150/C",
      "162/C"
    ],
    "villages": [
      "Hanamkonda Village 2",
      "Devarakonda Village 2",
      "Toopran Village 2"
    ],
    "legacyEmails": [
      "m.ravinder.rao.tg-war-038@farmer.dharanisetu.in",
      "m.ravinder.rao.tg-nal-050@farmer.dharanisetu.in",
      "m.ravinder.rao.tg-med-062@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-015",
    "email": "k.padmavathi@farmer.dharanisetu.in",
    "name": "K. Padmavathi",
    "role": "citizen",
    "phone": "9810233206",
    "state": "TG",
    "district": "TG-WAR",
    "mandal": "TG-WAR-HANAMKONDA",
    "passbookNumber": "PB-TG-2026-12926",
    "aadhaarMasked": "XXXX-XXXX-3406",
    "parcelsCount": 3,
    "totalAreaAcres": 3.28,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TG-WAR-039",
    "surveyNumber": "139/D",
    "village": "Hanamkonda Village 3",
    "parcelIds": [
      "TG-WAR-039",
      "TG-NAL-051",
      "TG-MED-063"
    ],
    "surveyNumbers": [
      "139/D",
      "151/D",
      "163/D"
    ],
    "villages": [
      "Hanamkonda Village 3",
      "Devarakonda Village 3",
      "Toopran Village 3"
    ],
    "legacyEmails": [
      "k.padmavathi.tg-war-039@farmer.dharanisetu.in",
      "k.padmavathi.tg-nal-051@farmer.dharanisetu.in",
      "k.padmavathi.tg-med-063@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-016",
    "email": "g.narsimha.chary@farmer.dharanisetu.in",
    "name": "G. Narsimha Chary",
    "role": "citizen",
    "phone": "9810239343",
    "state": "TG",
    "district": "TG-WAR",
    "mandal": "TG-WAR-PARKAL",
    "passbookNumber": "PB-TG-2026-13003",
    "aadhaarMasked": "XXXX-XXXX-3443",
    "parcelsCount": 3,
    "totalAreaAcres": 3.1,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TG-WAR-040",
    "surveyNumber": "140/A",
    "village": "Parkal",
    "parcelIds": [
      "TG-WAR-040",
      "TG-NAL-052",
      "TG-KAR-064"
    ],
    "surveyNumbers": [
      "140/A",
      "152/A",
      "164/A"
    ],
    "villages": [
      "Parkal",
      "Nakrekal",
      "Huzurabad"
    ],
    "legacyEmails": [
      "g.narsimha.chary.tg-war-040@farmer.dharanisetu.in",
      "g.narsimha.chary.tg-nal-052@farmer.dharanisetu.in",
      "g.narsimha.chary.tg-kar-064@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-017",
    "email": "s.yellamma@farmer.dharanisetu.in",
    "name": "S. Yellamma",
    "role": "citizen",
    "phone": "9810245480",
    "state": "TG",
    "district": "TG-WAR",
    "mandal": "TG-WAR-PARKAL",
    "passbookNumber": "PB-TG-2026-13080",
    "aadhaarMasked": "XXXX-XXXX-3480",
    "parcelsCount": 3,
    "totalAreaAcres": 5.23,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TG-WAR-041",
    "surveyNumber": "141/B",
    "village": "Parkal Village 2",
    "parcelIds": [
      "TG-WAR-041",
      "TG-NAL-053",
      "TG-KAR-065"
    ],
    "surveyNumbers": [
      "141/B",
      "153/B",
      "165/B"
    ],
    "villages": [
      "Parkal Village 2",
      "Nakrekal Village 2",
      "Huzurabad Village 2"
    ],
    "legacyEmails": [
      "s.yellamma.tg-war-041@farmer.dharanisetu.in",
      "s.yellamma.tg-nal-053@farmer.dharanisetu.in",
      "s.yellamma.tg-kar-065@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-018",
    "email": "d.rajaiah@farmer.dharanisetu.in",
    "name": "D. Rajaiah",
    "role": "citizen",
    "phone": "9810251617",
    "state": "TG",
    "district": "TG-WAR",
    "mandal": "TG-WAR-PARKAL",
    "passbookNumber": "PB-TG-2026-13157",
    "aadhaarMasked": "XXXX-XXXX-3517",
    "parcelsCount": 3,
    "totalAreaAcres": 3.16,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TG-WAR-042",
    "surveyNumber": "142/C",
    "village": "Parkal Village 3",
    "parcelIds": [
      "TG-WAR-042",
      "TG-NAL-054",
      "TG-KAR-066"
    ],
    "surveyNumbers": [
      "142/C",
      "154/C",
      "166/C"
    ],
    "villages": [
      "Parkal Village 3",
      "Nakrekal Village 3",
      "Huzurabad Village 3"
    ],
    "legacyEmails": [
      "d.rajaiah.tg-war-042@farmer.dharanisetu.in",
      "d.rajaiah.tg-nal-054@farmer.dharanisetu.in",
      "d.rajaiah.tg-kar-066@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-019",
    "email": "p.manemma@farmer.dharanisetu.in",
    "name": "P. Manemma",
    "role": "citizen",
    "phone": "9810257754",
    "state": "TG",
    "district": "TG-WAR",
    "mandal": "TG-WAR-NARSAMPET",
    "passbookNumber": "PB-TG-2026-13234",
    "aadhaarMasked": "XXXX-XXXX-3554",
    "parcelsCount": 3,
    "totalAreaAcres": 3.54,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TG-WAR-043",
    "surveyNumber": "143/D",
    "village": "Narsampet",
    "parcelIds": [
      "TG-WAR-043",
      "TG-MED-055",
      "TG-KAR-067"
    ],
    "surveyNumbers": [
      "143/D",
      "155/D",
      "167/D"
    ],
    "villages": [
      "Narsampet",
      "Sangareddy",
      "Jagtial"
    ],
    "legacyEmails": [
      "p.manemma.tg-war-043@farmer.dharanisetu.in",
      "p.manemma.tg-med-055@farmer.dharanisetu.in",
      "p.manemma.tg-kar-067@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-020",
    "email": "b.sathish.kumar@farmer.dharanisetu.in",
    "name": "B. Sathish Kumar",
    "role": "citizen",
    "phone": "9810263891",
    "state": "TG",
    "district": "TG-WAR",
    "mandal": "TG-WAR-NARSAMPET",
    "passbookNumber": "PB-TG-2026-13311",
    "aadhaarMasked": "XXXX-XXXX-3591",
    "parcelsCount": 3,
    "totalAreaAcres": 3.13,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TG-WAR-044",
    "surveyNumber": "144/A",
    "village": "Narsampet Village 2",
    "parcelIds": [
      "TG-WAR-044",
      "TG-MED-056",
      "TG-KAR-068"
    ],
    "surveyNumbers": [
      "144/A",
      "156/A",
      "168/A"
    ],
    "villages": [
      "Narsampet Village 2",
      "Sangareddy Village 2",
      "Jagtial Village 2"
    ],
    "legacyEmails": [
      "b.sathish.kumar.tg-war-044@farmer.dharanisetu.in",
      "b.sathish.kumar.tg-med-056@farmer.dharanisetu.in",
      "b.sathish.kumar.tg-kar-068@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-021",
    "email": "v.anasuya@farmer.dharanisetu.in",
    "name": "V. Anasuya",
    "role": "citizen",
    "phone": "9810270028",
    "state": "TG",
    "district": "TG-WAR",
    "mandal": "TG-WAR-NARSAMPET",
    "passbookNumber": "PB-TG-2026-13388",
    "aadhaarMasked": "XXXX-XXXX-3628",
    "parcelsCount": 3,
    "totalAreaAcres": 3.53,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TG-WAR-045",
    "surveyNumber": "145/B",
    "village": "Narsampet Village 3",
    "parcelIds": [
      "TG-WAR-045",
      "TG-MED-057",
      "TG-KAR-069"
    ],
    "surveyNumbers": [
      "145/B",
      "157/B",
      "169/B"
    ],
    "villages": [
      "Narsampet Village 3",
      "Sangareddy Village 3",
      "Jagtial Village 3"
    ],
    "legacyEmails": [
      "v.anasuya.tg-war-045@farmer.dharanisetu.in",
      "v.anasuya.tg-med-057@farmer.dharanisetu.in",
      "v.anasuya.tg-kar-069@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-022",
    "email": "n.chandra.shekar@farmer.dharanisetu.in",
    "name": "N. Chandra Shekar",
    "role": "citizen",
    "phone": "9810276165",
    "state": "TG",
    "district": "TG-NAL",
    "mandal": "TG-NAL-MIRYALAGUDA",
    "passbookNumber": "PB-TG-2026-13465",
    "aadhaarMasked": "XXXX-XXXX-3665",
    "parcelsCount": 3,
    "totalAreaAcres": 2.25,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TG-NAL-046",
    "surveyNumber": "146/C",
    "village": "Miryalaguda",
    "parcelIds": [
      "TG-NAL-046",
      "TG-MED-058",
      "TG-KAR-070"
    ],
    "surveyNumbers": [
      "146/C",
      "158/C",
      "170/C"
    ],
    "villages": [
      "Miryalaguda",
      "Narsapur",
      "Sircilla"
    ],
    "legacyEmails": [
      "n.chandra.shekar.tg-nal-046@farmer.dharanisetu.in",
      "n.chandra.shekar.tg-med-058@farmer.dharanisetu.in",
      "n.chandra.shekar.tg-kar-070@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-023",
    "email": "t.lalitha.bai@farmer.dharanisetu.in",
    "name": "T. Lalitha Bai",
    "role": "citizen",
    "phone": "9810282302",
    "state": "TG",
    "district": "TG-NAL",
    "mandal": "TG-NAL-MIRYALAGUDA",
    "passbookNumber": "PB-TG-2026-13542",
    "aadhaarMasked": "XXXX-XXXX-3702",
    "parcelsCount": 3,
    "totalAreaAcres": 4.94,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TG-NAL-047",
    "surveyNumber": "147/D",
    "village": "Miryalaguda Village 2",
    "parcelIds": [
      "TG-NAL-047",
      "TG-MED-059",
      "TG-KAR-071"
    ],
    "surveyNumbers": [
      "147/D",
      "159/D",
      "171/D"
    ],
    "villages": [
      "Miryalaguda Village 2",
      "Narsapur Village 2",
      "Sircilla Village 2"
    ],
    "legacyEmails": [
      "t.lalitha.bai.tg-nal-047@farmer.dharanisetu.in",
      "t.lalitha.bai.tg-med-059@farmer.dharanisetu.in",
      "t.lalitha.bai.tg-kar-071@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-024",
    "email": "r.venkataiah@farmer.dharanisetu.in",
    "name": "R. Venkataiah",
    "role": "citizen",
    "phone": "9810288439",
    "state": "TG",
    "district": "TG-NAL",
    "mandal": "TG-NAL-MIRYALAGUDA",
    "passbookNumber": "PB-TG-2026-13619",
    "aadhaarMasked": "XXXX-XXXX-3739",
    "parcelsCount": 3,
    "totalAreaAcres": 1.97,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TG-NAL-048",
    "surveyNumber": "148/A",
    "village": "Miryalaguda Village 3",
    "parcelIds": [
      "TG-NAL-048",
      "TG-MED-060",
      "TG-KAR-072"
    ],
    "surveyNumbers": [
      "148/A",
      "160/A",
      "172/A"
    ],
    "villages": [
      "Miryalaguda Village 3",
      "Narsapur Village 3",
      "Sircilla Village 3"
    ],
    "legacyEmails": [
      "r.venkataiah.tg-nal-048@farmer.dharanisetu.in",
      "r.venkataiah.tg-med-060@farmer.dharanisetu.in",
      "r.venkataiah.tg-kar-072@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-025",
    "email": "k.muthu.krishnan@farmer.dharanisetu.in",
    "name": "K. Muthu Krishnan",
    "role": "citizen",
    "phone": "9810441864",
    "state": "TN",
    "district": "TN-CHE",
    "mandal": "TN-CHE-EGMORE",
    "passbookNumber": "PB-TN-2026-15544",
    "aadhaarMasked": "XXXX-XXXX-4664",
    "parcelsCount": 3,
    "totalAreaAcres": 4.84,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TN-CHE-073",
    "surveyNumber": "173/B",
    "village": "Egmore",
    "parcelIds": [
      "TN-CHE-073",
      "TN-COI-085",
      "TN-MAD-097"
    ],
    "surveyNumbers": [
      "173/B",
      "185/B",
      "197/B"
    ],
    "villages": [
      "Egmore",
      "Pollachi",
      "Thirumangalam"
    ],
    "legacyEmails": [
      "k.muthu.krishnan.tn-che-073@farmer.dharanisetu.in",
      "k.muthu.krishnan.tn-coi-085@farmer.dharanisetu.in",
      "k.muthu.krishnan.tn-mad-097@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-026",
    "email": "s.kaveri.ammal@farmer.dharanisetu.in",
    "name": "S. Kaveri Ammal",
    "role": "citizen",
    "phone": "9810448001",
    "state": "TN",
    "district": "TN-CHE",
    "mandal": "TN-CHE-EGMORE",
    "passbookNumber": "PB-TN-2026-15621",
    "aadhaarMasked": "XXXX-XXXX-4701",
    "parcelsCount": 3,
    "totalAreaAcres": 4.25,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TN-CHE-074",
    "surveyNumber": "174/C",
    "village": "Egmore Village 2",
    "parcelIds": [
      "TN-CHE-074",
      "TN-COI-086",
      "TN-MAD-098"
    ],
    "surveyNumbers": [
      "174/C",
      "186/C",
      "198/C"
    ],
    "villages": [
      "Egmore Village 2",
      "Pollachi Village 2",
      "Thirumangalam Village 2"
    ],
    "legacyEmails": [
      "s.kaveri.ammal.tn-che-074@farmer.dharanisetu.in",
      "s.kaveri.ammal.tn-coi-086@farmer.dharanisetu.in",
      "s.kaveri.ammal.tn-mad-098@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-027",
    "email": "r.palanisamy@farmer.dharanisetu.in",
    "name": "R. Palanisamy",
    "role": "citizen",
    "phone": "9810454138",
    "state": "TN",
    "district": "TN-CHE",
    "mandal": "TN-CHE-EGMORE",
    "passbookNumber": "PB-TN-2026-15698",
    "aadhaarMasked": "XXXX-XXXX-4738",
    "parcelsCount": 3,
    "totalAreaAcres": 2.55,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TN-CHE-075",
    "surveyNumber": "175/D",
    "village": "Egmore Village 3",
    "parcelIds": [
      "TN-CHE-075",
      "TN-COI-087",
      "TN-MAD-099"
    ],
    "surveyNumbers": [
      "175/D",
      "187/D",
      "199/D"
    ],
    "villages": [
      "Egmore Village 3",
      "Pollachi Village 3",
      "Thirumangalam Village 3"
    ],
    "legacyEmails": [
      "r.palanisamy.tn-che-075@farmer.dharanisetu.in",
      "r.palanisamy.tn-coi-087@farmer.dharanisetu.in",
      "r.palanisamy.tn-mad-099@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-028",
    "email": "m.selvi@farmer.dharanisetu.in",
    "name": "M. Selvi",
    "role": "citizen",
    "phone": "9810460275",
    "state": "TN",
    "district": "TN-CHE",
    "mandal": "TN-CHE-MYLAPORE",
    "passbookNumber": "PB-TN-2026-15775",
    "aadhaarMasked": "XXXX-XXXX-4775",
    "parcelsCount": 3,
    "totalAreaAcres": 5.61,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TN-CHE-076",
    "surveyNumber": "176/A",
    "village": "Mylapore",
    "parcelIds": [
      "TN-CHE-076",
      "TN-COI-088",
      "TN-SAL-100"
    ],
    "surveyNumbers": [
      "176/A",
      "188/A",
      "200/A"
    ],
    "villages": [
      "Mylapore",
      "Sulur",
      "Attur"
    ],
    "legacyEmails": [
      "m.selvi.tn-che-076@farmer.dharanisetu.in",
      "m.selvi.tn-coi-088@farmer.dharanisetu.in",
      "m.selvi.tn-sal-100@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-029",
    "email": "v.rajendran@farmer.dharanisetu.in",
    "name": "V. Rajendran",
    "role": "citizen",
    "phone": "9810466412",
    "state": "TN",
    "district": "TN-CHE",
    "mandal": "TN-CHE-MYLAPORE",
    "passbookNumber": "PB-TN-2026-15852",
    "aadhaarMasked": "XXXX-XXXX-4812",
    "parcelsCount": 3,
    "totalAreaAcres": 3.99,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TN-CHE-077",
    "surveyNumber": "177/B",
    "village": "Mylapore Village 2",
    "parcelIds": [
      "TN-CHE-077",
      "TN-COI-089",
      "TN-SAL-101"
    ],
    "surveyNumbers": [
      "177/B",
      "189/B",
      "201/B"
    ],
    "villages": [
      "Mylapore Village 2",
      "Sulur Village 2",
      "Attur Village 2"
    ],
    "legacyEmails": [
      "v.rajendran.tn-che-077@farmer.dharanisetu.in",
      "v.rajendran.tn-coi-089@farmer.dharanisetu.in",
      "v.rajendran.tn-sal-101@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-030",
    "email": "p.meenakshi@farmer.dharanisetu.in",
    "name": "P. Meenakshi",
    "role": "citizen",
    "phone": "9810472549",
    "state": "TN",
    "district": "TN-CHE",
    "mandal": "TN-CHE-MYLAPORE",
    "passbookNumber": "PB-TN-2026-15929",
    "aadhaarMasked": "XXXX-XXXX-4849",
    "parcelsCount": 3,
    "totalAreaAcres": 6.19,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TN-CHE-078",
    "surveyNumber": "178/C",
    "village": "Mylapore Village 3",
    "parcelIds": [
      "TN-CHE-078",
      "TN-COI-090",
      "TN-SAL-102"
    ],
    "surveyNumbers": [
      "178/C",
      "190/C",
      "202/C"
    ],
    "villages": [
      "Mylapore Village 3",
      "Sulur Village 3",
      "Attur Village 3"
    ],
    "legacyEmails": [
      "p.meenakshi.tn-che-078@farmer.dharanisetu.in",
      "p.meenakshi.tn-coi-090@farmer.dharanisetu.in",
      "p.meenakshi.tn-sal-102@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-031",
    "email": "a.karuppasamy@farmer.dharanisetu.in",
    "name": "A. Karuppasamy",
    "role": "citizen",
    "phone": "9810478686",
    "state": "TN",
    "district": "TN-CHE",
    "mandal": "TN-CHE-TONDIARPET",
    "passbookNumber": "PB-TN-2026-16006",
    "aadhaarMasked": "XXXX-XXXX-4886",
    "parcelsCount": 3,
    "totalAreaAcres": 3.25,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TN-CHE-079",
    "surveyNumber": "179/D",
    "village": "Tondiarpet",
    "parcelIds": [
      "TN-CHE-079",
      "TN-MAD-091",
      "TN-SAL-103"
    ],
    "surveyNumbers": [
      "179/D",
      "191/D",
      "203/D"
    ],
    "villages": [
      "Tondiarpet",
      "Melur",
      "Mettur"
    ],
    "legacyEmails": [
      "a.karuppasamy.tn-che-079@farmer.dharanisetu.in",
      "a.karuppasamy.tn-mad-091@farmer.dharanisetu.in",
      "a.karuppasamy.tn-sal-103@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-032",
    "email": "t.valarmathi@farmer.dharanisetu.in",
    "name": "T. Valarmathi",
    "role": "citizen",
    "phone": "9810484823",
    "state": "TN",
    "district": "TN-CHE",
    "mandal": "TN-CHE-TONDIARPET",
    "passbookNumber": "PB-TN-2026-16083",
    "aadhaarMasked": "XXXX-XXXX-4923",
    "parcelsCount": 3,
    "totalAreaAcres": 3.7,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TN-CHE-080",
    "surveyNumber": "180/A",
    "village": "Tondiarpet Village 2",
    "parcelIds": [
      "TN-CHE-080",
      "TN-MAD-092",
      "TN-SAL-104"
    ],
    "surveyNumbers": [
      "180/A",
      "192/A",
      "204/A"
    ],
    "villages": [
      "Tondiarpet Village 2",
      "Melur Village 2",
      "Mettur Village 2"
    ],
    "legacyEmails": [
      "t.valarmathi.tn-che-080@farmer.dharanisetu.in",
      "t.valarmathi.tn-mad-092@farmer.dharanisetu.in",
      "t.valarmathi.tn-sal-104@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-033",
    "email": "n.subramaniam@farmer.dharanisetu.in",
    "name": "N. Subramaniam",
    "role": "citizen",
    "phone": "9810490960",
    "state": "TN",
    "district": "TN-CHE",
    "mandal": "TN-CHE-TONDIARPET",
    "passbookNumber": "PB-TN-2026-16160",
    "aadhaarMasked": "XXXX-XXXX-4960",
    "parcelsCount": 3,
    "totalAreaAcres": 4.28,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TN-CHE-081",
    "surveyNumber": "181/B",
    "village": "Tondiarpet Village 3",
    "parcelIds": [
      "TN-CHE-081",
      "TN-MAD-093",
      "TN-SAL-105"
    ],
    "surveyNumbers": [
      "181/B",
      "193/B",
      "205/B"
    ],
    "villages": [
      "Tondiarpet Village 3",
      "Melur Village 3",
      "Mettur Village 3"
    ],
    "legacyEmails": [
      "n.subramaniam.tn-che-081@farmer.dharanisetu.in",
      "n.subramaniam.tn-mad-093@farmer.dharanisetu.in",
      "n.subramaniam.tn-sal-105@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-034",
    "email": "g.chellammal@farmer.dharanisetu.in",
    "name": "G. Chellammal",
    "role": "citizen",
    "phone": "9810497097",
    "state": "TN",
    "district": "TN-COI",
    "mandal": "TN-COI-METTUPALAYAM",
    "passbookNumber": "PB-TN-2026-16237",
    "aadhaarMasked": "XXXX-XXXX-4997",
    "parcelsCount": 3,
    "totalAreaAcres": 5.35,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TN-COI-082",
    "surveyNumber": "182/C",
    "village": "Mettupalayam",
    "parcelIds": [
      "TN-COI-082",
      "TN-MAD-094",
      "TN-SAL-106"
    ],
    "surveyNumbers": [
      "182/C",
      "194/C",
      "206/C"
    ],
    "villages": [
      "Mettupalayam",
      "Usilampatti",
      "Omalur"
    ],
    "legacyEmails": [
      "g.chellammal.tn-coi-082@farmer.dharanisetu.in",
      "g.chellammal.tn-mad-094@farmer.dharanisetu.in",
      "g.chellammal.tn-sal-106@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-035",
    "email": "d.murugesan@farmer.dharanisetu.in",
    "name": "D. Murugesan",
    "role": "citizen",
    "phone": "9810503234",
    "state": "TN",
    "district": "TN-COI",
    "mandal": "TN-COI-METTUPALAYAM",
    "passbookNumber": "PB-TN-2026-16314",
    "aadhaarMasked": "XXXX-XXXX-5034",
    "parcelsCount": 3,
    "totalAreaAcres": 3.02,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TN-COI-083",
    "surveyNumber": "183/D",
    "village": "Mettupalayam Village 2",
    "parcelIds": [
      "TN-COI-083",
      "TN-MAD-095",
      "TN-SAL-107"
    ],
    "surveyNumbers": [
      "183/D",
      "195/D",
      "207/D"
    ],
    "villages": [
      "Mettupalayam Village 2",
      "Usilampatti Village 2",
      "Omalur Village 2"
    ],
    "legacyEmails": [
      "d.murugesan.tn-coi-083@farmer.dharanisetu.in",
      "d.murugesan.tn-mad-095@farmer.dharanisetu.in",
      "d.murugesan.tn-sal-107@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-036",
    "email": "l.ponnuthai@farmer.dharanisetu.in",
    "name": "L. Ponnuthai",
    "role": "citizen",
    "phone": "9810509371",
    "state": "TN",
    "district": "TN-COI",
    "mandal": "TN-COI-METTUPALAYAM",
    "passbookNumber": "PB-TN-2026-16391",
    "aadhaarMasked": "XXXX-XXXX-5071",
    "parcelsCount": 3,
    "totalAreaAcres": 4.49,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "TN-COI-084",
    "surveyNumber": "184/A",
    "village": "Mettupalayam Village 3",
    "parcelIds": [
      "TN-COI-084",
      "TN-MAD-096",
      "TN-SAL-108"
    ],
    "surveyNumbers": [
      "184/A",
      "196/A",
      "208/A"
    ],
    "villages": [
      "Mettupalayam Village 3",
      "Usilampatti Village 3",
      "Omalur Village 3"
    ],
    "legacyEmails": [
      "l.ponnuthai.tn-coi-084@farmer.dharanisetu.in",
      "l.ponnuthai.tn-mad-096@farmer.dharanisetu.in",
      "l.ponnuthai.tn-sal-108@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-037",
    "email": "r.ramesh.sahu@farmer.dharanisetu.in",
    "name": "R. Ramesh Sahu",
    "role": "citizen",
    "phone": "9810662796",
    "state": "CG",
    "district": "CG-RAI",
    "mandal": "CG-RAI-ARANG",
    "passbookNumber": "PB-CG-2026-18316",
    "aadhaarMasked": "XXXX-XXXX-5996",
    "parcelsCount": 3,
    "totalAreaAcres": 4.86,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "CG-RAI-109",
    "surveyNumber": "209/B",
    "village": "Arang",
    "parcelIds": [
      "CG-RAI-109",
      "CG-BIL-121",
      "CG-DUR-133"
    ],
    "surveyNumbers": [
      "209/B",
      "221/B",
      "233/B"
    ],
    "villages": [
      "Arang",
      "Masturi",
      "Gunderdehi"
    ],
    "legacyEmails": [
      "r.ramesh.sahu.cg-rai-109@farmer.dharanisetu.in",
      "r.ramesh.sahu.cg-bil-121@farmer.dharanisetu.in",
      "r.ramesh.sahu.cg-dur-133@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-038",
    "email": "k.sunita.verma@farmer.dharanisetu.in",
    "name": "K. Sunita Verma",
    "role": "citizen",
    "phone": "9810668933",
    "state": "CG",
    "district": "CG-RAI",
    "mandal": "CG-RAI-ARANG",
    "passbookNumber": "PB-CG-2026-18393",
    "aadhaarMasked": "XXXX-XXXX-6033",
    "parcelsCount": 3,
    "totalAreaAcres": 4.28,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "CG-RAI-110",
    "surveyNumber": "210/C",
    "village": "Arang Village 2",
    "parcelIds": [
      "CG-RAI-110",
      "CG-BIL-122",
      "CG-DUR-134"
    ],
    "surveyNumbers": [
      "210/C",
      "222/C",
      "234/C"
    ],
    "villages": [
      "Arang Village 2",
      "Masturi Village 2",
      "Gunderdehi Village 2"
    ],
    "legacyEmails": [
      "k.sunita.verma.cg-rai-110@farmer.dharanisetu.in",
      "k.sunita.verma.cg-bil-122@farmer.dharanisetu.in",
      "k.sunita.verma.cg-dur-134@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-039",
    "email": "p.deepak.yadav@farmer.dharanisetu.in",
    "name": "P. Deepak Yadav",
    "role": "citizen",
    "phone": "9810675070",
    "state": "CG",
    "district": "CG-RAI",
    "mandal": "CG-RAI-ARANG",
    "passbookNumber": "PB-CG-2026-18470",
    "aadhaarMasked": "XXXX-XXXX-6070",
    "parcelsCount": 3,
    "totalAreaAcres": 3.55,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "CG-RAI-111",
    "surveyNumber": "211/D",
    "village": "Arang Village 3",
    "parcelIds": [
      "CG-RAI-111",
      "CG-BIL-123",
      "CG-DUR-135"
    ],
    "surveyNumbers": [
      "211/D",
      "223/D",
      "235/D"
    ],
    "villages": [
      "Arang Village 3",
      "Masturi Village 3",
      "Gunderdehi Village 3"
    ],
    "legacyEmails": [
      "p.deepak.yadav.cg-rai-111@farmer.dharanisetu.in",
      "p.deepak.yadav.cg-bil-123@farmer.dharanisetu.in",
      "p.deepak.yadav.cg-dur-135@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-040",
    "email": "s.kamla.bai@farmer.dharanisetu.in",
    "name": "S. Kamla Bai",
    "role": "citizen",
    "phone": "9810681207",
    "state": "CG",
    "district": "CG-RAI",
    "mandal": "CG-RAI-TILDA",
    "passbookNumber": "PB-CG-2026-18547",
    "aadhaarMasked": "XXXX-XXXX-6107",
    "parcelsCount": 3,
    "totalAreaAcres": 4.02,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "CG-RAI-112",
    "surveyNumber": "212/A",
    "village": "Tilda",
    "parcelIds": [
      "CG-RAI-112",
      "CG-BIL-124",
      "CG-RAI-136"
    ],
    "surveyNumbers": [
      "212/A",
      "224/A",
      "236/A"
    ],
    "villages": [
      "Tilda",
      "Kota",
      "Kharsia"
    ],
    "legacyEmails": [
      "s.kamla.bai.cg-rai-112@farmer.dharanisetu.in",
      "s.kamla.bai.cg-bil-124@farmer.dharanisetu.in",
      "s.kamla.bai.cg-rai-136@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-041",
    "email": "m.ashok.nirmalkar@farmer.dharanisetu.in",
    "name": "M. Ashok Nirmalkar",
    "role": "citizen",
    "phone": "9810687344",
    "state": "CG",
    "district": "CG-RAI",
    "mandal": "CG-RAI-TILDA",
    "passbookNumber": "PB-CG-2026-18624",
    "aadhaarMasked": "XXXX-XXXX-6144",
    "parcelsCount": 3,
    "totalAreaAcres": 3.32,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "CG-RAI-113",
    "surveyNumber": "213/B",
    "village": "Tilda Village 2",
    "parcelIds": [
      "CG-RAI-113",
      "CG-BIL-125",
      "CG-RAI-137"
    ],
    "surveyNumbers": [
      "213/B",
      "225/B",
      "237/B"
    ],
    "villages": [
      "Tilda Village 2",
      "Kota Village 2",
      "Kharsia Village 2"
    ],
    "legacyEmails": [
      "m.ashok.nirmalkar.cg-rai-113@farmer.dharanisetu.in",
      "m.ashok.nirmalkar.cg-bil-125@farmer.dharanisetu.in",
      "m.ashok.nirmalkar.cg-rai-137@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-042",
    "email": "t.rajkumari.sahu@farmer.dharanisetu.in",
    "name": "T. Rajkumari Sahu",
    "role": "citizen",
    "phone": "9810693481",
    "state": "CG",
    "district": "CG-RAI",
    "mandal": "CG-RAI-TILDA",
    "passbookNumber": "PB-CG-2026-18701",
    "aadhaarMasked": "XXXX-XXXX-6181",
    "parcelsCount": 3,
    "totalAreaAcres": 3.75,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "CG-RAI-114",
    "surveyNumber": "214/C",
    "village": "Tilda Village 3",
    "parcelIds": [
      "CG-RAI-114",
      "CG-BIL-126",
      "CG-RAI-138"
    ],
    "surveyNumbers": [
      "214/C",
      "226/C",
      "238/C"
    ],
    "villages": [
      "Tilda Village 3",
      "Kota Village 3",
      "Kharsia Village 3"
    ],
    "legacyEmails": [
      "t.rajkumari.sahu.cg-rai-114@farmer.dharanisetu.in",
      "t.rajkumari.sahu.cg-bil-126@farmer.dharanisetu.in",
      "t.rajkumari.sahu.cg-rai-138@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-043",
    "email": "g.suresh.netam@farmer.dharanisetu.in",
    "name": "G. Suresh Netam",
    "role": "citizen",
    "phone": "9810699618",
    "state": "CG",
    "district": "CG-RAI",
    "mandal": "CG-RAI-ABHANPUR",
    "passbookNumber": "PB-CG-2026-18778",
    "aadhaarMasked": "XXXX-XXXX-6218",
    "parcelsCount": 3,
    "totalAreaAcres": 1.95,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "CG-RAI-115",
    "surveyNumber": "215/D",
    "village": "Abhanpur",
    "parcelIds": [
      "CG-RAI-115",
      "CG-DUR-127",
      "CG-RAI-139"
    ],
    "surveyNumbers": [
      "215/D",
      "227/D",
      "239/D"
    ],
    "villages": [
      "Abhanpur",
      "Patan",
      "Pusaur"
    ],
    "legacyEmails": [
      "g.suresh.netam.cg-rai-115@farmer.dharanisetu.in",
      "g.suresh.netam.cg-dur-127@farmer.dharanisetu.in",
      "g.suresh.netam.cg-rai-139@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-044",
    "email": "b.phoolwati@farmer.dharanisetu.in",
    "name": "B. Phoolwati",
    "role": "citizen",
    "phone": "9810705755",
    "state": "CG",
    "district": "CG-RAI",
    "mandal": "CG-RAI-ABHANPUR",
    "passbookNumber": "PB-CG-2026-18855",
    "aadhaarMasked": "XXXX-XXXX-6255",
    "parcelsCount": 3,
    "totalAreaAcres": 2.06,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "CG-RAI-116",
    "surveyNumber": "216/A",
    "village": "Abhanpur Village 2",
    "parcelIds": [
      "CG-RAI-116",
      "CG-DUR-128",
      "CG-RAI-140"
    ],
    "surveyNumbers": [
      "216/A",
      "228/A",
      "240/A"
    ],
    "villages": [
      "Abhanpur Village 2",
      "Patan Village 2",
      "Pusaur Village 2"
    ],
    "legacyEmails": [
      "b.phoolwati.cg-rai-116@farmer.dharanisetu.in",
      "b.phoolwati.cg-dur-128@farmer.dharanisetu.in",
      "b.phoolwati.cg-rai-140@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-045",
    "email": "n.dilip.diwan@farmer.dharanisetu.in",
    "name": "N. Dilip Diwan",
    "role": "citizen",
    "phone": "9810711892",
    "state": "CG",
    "district": "CG-RAI",
    "mandal": "CG-RAI-ABHANPUR",
    "passbookNumber": "PB-CG-2026-18932",
    "aadhaarMasked": "XXXX-XXXX-6292",
    "parcelsCount": 3,
    "totalAreaAcres": 3.78,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "CG-RAI-117",
    "surveyNumber": "217/B",
    "village": "Abhanpur Village 3",
    "parcelIds": [
      "CG-RAI-117",
      "CG-DUR-129",
      "CG-RAI-141"
    ],
    "surveyNumbers": [
      "217/B",
      "229/B",
      "241/B"
    ],
    "villages": [
      "Abhanpur Village 3",
      "Patan Village 3",
      "Pusaur Village 3"
    ],
    "legacyEmails": [
      "n.dilip.diwan.cg-rai-117@farmer.dharanisetu.in",
      "n.dilip.diwan.cg-dur-129@farmer.dharanisetu.in",
      "n.dilip.diwan.cg-rai-141@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-046",
    "email": "v.sarita.chandrakar@farmer.dharanisetu.in",
    "name": "V. Sarita Chandrakar",
    "role": "citizen",
    "phone": "9810718029",
    "state": "CG",
    "district": "CG-BIL",
    "mandal": "CG-BIL-TAKHATPUR",
    "passbookNumber": "PB-CG-2026-19009",
    "aadhaarMasked": "XXXX-XXXX-6329",
    "parcelsCount": 3,
    "totalAreaAcres": 5.15,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "CG-BIL-118",
    "surveyNumber": "218/C",
    "village": "Takhatpur",
    "parcelIds": [
      "CG-BIL-118",
      "CG-DUR-130",
      "CG-RAI-142"
    ],
    "surveyNumbers": [
      "218/C",
      "230/C",
      "242/C"
    ],
    "villages": [
      "Takhatpur",
      "Dhamdha",
      "Tamnar"
    ],
    "legacyEmails": [
      "v.sarita.chandrakar.cg-bil-118@farmer.dharanisetu.in",
      "v.sarita.chandrakar.cg-dur-130@farmer.dharanisetu.in",
      "v.sarita.chandrakar.cg-rai-142@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-047",
    "email": "d.manoj.sinha@farmer.dharanisetu.in",
    "name": "D. Manoj Sinha",
    "role": "citizen",
    "phone": "9810724166",
    "state": "CG",
    "district": "CG-BIL",
    "mandal": "CG-BIL-TAKHATPUR",
    "passbookNumber": "PB-CG-2026-19086",
    "aadhaarMasked": "XXXX-XXXX-6366",
    "parcelsCount": 3,
    "totalAreaAcres": 3.46,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "CG-BIL-119",
    "surveyNumber": "219/D",
    "village": "Takhatpur Village 2",
    "parcelIds": [
      "CG-BIL-119",
      "CG-DUR-131",
      "CG-RAI-143"
    ],
    "surveyNumbers": [
      "219/D",
      "231/D",
      "243/D"
    ],
    "villages": [
      "Takhatpur Village 2",
      "Dhamdha Village 2",
      "Tamnar Village 2"
    ],
    "legacyEmails": [
      "d.manoj.sinha.cg-bil-119@farmer.dharanisetu.in",
      "d.manoj.sinha.cg-dur-131@farmer.dharanisetu.in",
      "d.manoj.sinha.cg-rai-143@farmer.dharanisetu.in"
    ]
  },
  {
    "id": "CIT-FARM-048",
    "email": "a.kausalya.baghel@farmer.dharanisetu.in",
    "name": "A. Kausalya Baghel",
    "role": "citizen",
    "phone": "9810730303",
    "state": "CG",
    "district": "CG-BIL",
    "mandal": "CG-BIL-TAKHATPUR",
    "passbookNumber": "PB-CG-2026-19163",
    "aadhaarMasked": "XXXX-XXXX-6403",
    "parcelsCount": 3,
    "totalAreaAcres": 4.57,
    "createdAt": "2025-01-01T00:00:00Z",
    "parcelId": "CG-BIL-120",
    "surveyNumber": "220/A",
    "village": "Takhatpur Village 3",
    "parcelIds": [
      "CG-BIL-120",
      "CG-DUR-132",
      "CG-RAI-144"
    ],
    "surveyNumbers": [
      "220/A",
      "232/A",
      "244/A"
    ],
    "villages": [
      "Takhatpur Village 3",
      "Dhamdha Village 3",
      "Tamnar Village 3"
    ],
    "legacyEmails": [
      "a.kausalya.baghel.cg-bil-120@farmer.dharanisetu.in",
      "a.kausalya.baghel.cg-dur-132@farmer.dharanisetu.in",
      "a.kausalya.baghel.cg-rai-144@farmer.dharanisetu.in"
    ]
  }
];
