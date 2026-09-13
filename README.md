# DharaniSetu (ధరణిసేతు / தரணிசேது / धरणीसेतु)

> **Unified Digital Cadastral Land Records & Statutory Land Governance Platform**  
> Empowering Citizens, Revenue Officers, Cadastral Surveyors, and Executive Magistrates with Real-Time Land Administration across India.

---

## Overview

**DharaniSetu** is an enterprise-grade digital land records and statutory governance platform designed to bring absolute transparency, real-time spatial demarcation, and tamper-proof workflow tracking to land administration across Indian States and Union Territories (Andhra Pradesh, Telangana, Tamil Nadu, and Chandigarh).

Integrated with **Supabase (PostgreSQL 15)** for real-time data persistence and **Leaflet GIS** for dynamic cadastral map rendering, DharaniSetu bridges the gap between citizens (farmers, property owners) and administrative revenue machinery.

---

## Key Features

### 1. Interactive Cadastral GIS Explorer
* **High-Precision Cadastral Demarcation**: Dynamic GeoJSON polygon rendering of land parcels, boundary stones, and centroids.
* **Dual-Layer Imagery**: Switch seamlessly between OpenStreetMap street vectors and high-resolution Satellite hybrid views.
* **Zoom-Adaptive Hierarchy**: Automatically reveals state, district, mandal, and village/town boundary labels at appropriate zoom thresholds.
* **ULPIN & Survey Number Search**: Fast indexing and parcel inspection by unique ULPIN (Unique Land Parcel Identification Number) or Survey Number.

### 2. Accurate Land Holding & Classification Engine
* **Dual-Unit Cadastral Metrics**:
  * 🌾 **Farming Land**: Displayed in **Acres** (with statutory subdivisions).
  * 🏢 **Commercial Land**: Displayed in **Square Feet (sq.ft)**.
  * 🏠 **Buildings & Residential**: Displayed in **Square Feet (sq.ft)**.
* **Accurate Total Portfolio Holding**: Dynamic summation across all owned parcels.

### 3. Real-Time Supabase Database Integration
* **Live Database Backend**: Backed by **Supabase PostgreSQL 15** for parcels (`land_parcels`) and service applications (`applications`).
* **Instant Real-Time Sync**: Utilizes Supabase Realtime Channels (`postgres_changes`) over WebSockets for live `INSERT`, `UPDATE`, and `DELETE` events across active sessions.
* **Zero Ghost Caching**: Strict single-source-of-truth database architecture.

### 4. Multi-Department Statutory Workflow Pipeline
Applications advance through formal administrative desks with strict Role-Based Access Control (RBAC):
1. **Citizen Submission**: Case file initialized with statutory token (`DS-AP-2026-XXXXXX`).
2. **Revenue Desk (VRO / RI)**: Ownership deed scrutiny, encumbrance verification, and initial endorsement.
3. **Survey Desk (Mandal Cadastral Surveyor)**: Field Measurement Book (FMB) review, DGPS demarcation, and boundary verification.
4. **Final Authority (Tahsildar & Executive Magistrate)**: Magisterial hearing, final statutory clearance, and digital RoR ledger synchronization.

### 5. Multi-Lingual Inclusivity (i18n)
* Complete localized interface in **English**, **Telugu (తెలుగు)**, **Tamil (தமிழ்)**, and **Hindi (हिन्दी)**.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite 8 |
| **Styling & Design** | Tailwind CSS, Lucide React Icons |
| **GIS & Mapping** | Leaflet, React-Leaflet, OpenStreetMap, ESRI Satellite Tiles |
| **State Management** | Zustand with selective persistence (`partialize`) |
| **Backend & Database** | Supabase, PostgreSQL 15, PostgREST API, Realtime WebSockets |
| **Localization** | i18next, react-i18next |

---

## Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ravireddy-shr/DharaniSetu.git
   cd DharaniSetu
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## Demo Credentials

For demonstration and testing purposes, quick-fill credentials are provided on the login page:

### Government Officers (Password: `officer123` / `admin123`)
* **Tahsildar & Executive Magistrate**: `tahsildar@dharanisetu.gov.in`
* **Village Revenue Officer (VRO)**: `vro@dharanisetu.gov.in`
* **Cadastral Surveyor**: `surveyor@dharanisetu.gov.in`
* **Sub-Registrar**: `subregistrar@dharanisetu.gov.in`
* **Town Planning Officer**: `planner@dharanisetu.gov.in`
* **System Administrator**: `admin@dharanisetu.gov.in` (Password: `admin123`)

### Citizens & Farmers (Password: `citizen123` / `farmer123`)
* **K. Venkata Rao (AP)**: `k.venkatarao.ap-ana-001@farmer.dharanisetu.in`
* Access all 144 registered citizen accounts via the **Citizen Directory** modal on the login screen.

---

## License

This project is developed for digital public governance and land administration modernization.
