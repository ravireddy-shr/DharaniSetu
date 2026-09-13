import { useState, useRef, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, useMapEvents, Tooltip, ZoomControl, Marker } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DEMO_PARCELS } from '../../data/demoData';
import type { LandParcel } from '../../types';
import {
  Search, Layers, X, MapPin, CheckCircle2, User,
  Ruler, Wheat, FileText, Landmark, Scale, Coins, Zap, Crosshair,
  Activity, AlertTriangle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils';
import { useAppStore } from '../../store/appStore';

// Static mock geometry for Change Detection (Simulated)
const SIMULATED_SHIFTED_PARCELS: {
  id: string;
  surveyNumber: string;
  village: string;
  variance: string;
  geometry: { type: 'Polygon'; coordinates: number[][][] };
}[] = [
  {
    id: 'AP-CHI-001',
    surveyNumber: '101/B',
    village: 'Puttur',
    variance: '+4.8% spatial divergence against 2024 satellite baseline',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [78.967650, 13.235280],
        [78.971620, 13.235280],
        [78.971620, 13.239100],
        [78.967650, 13.239100],
        [78.967650, 13.235280],
      ]],
    },
  },
  {
    id: 'AP-CHI-003',
    surveyNumber: '103/D',
    village: 'Puttur Village 3',
    variance: '+6.2% lateral boundary shift against cadastral sheet',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [78.956600, 13.244500],
        [78.959580, 13.244500],
        [78.959580, 13.247480],
        [78.956600, 13.247480],
        [78.956600, 13.244500],
      ]],
    },
  },
];

// Red pin icon for centroid
const redPinIcon = L.divIcon({
  className: 'custom-pin',
  html: `<div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
    <div style="background: #ef4444; color: white; padding: 3px 8px; border-radius: 9999px; font-weight: bold; font-size: 11px; font-family: Arial, sans-serif; box-shadow: 0 2px 5px rgba(0,0,0,0.3); white-space: nowrap; margin-bottom: 2px;">
      📍 Selected
    </div>
    <div style="width: 14px; height: 14px; background: #ef4444; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.4);"></div>
  </div>`,
  iconSize: [0, 0],
});

// Watches zoom level changes for progressive detail disclosure
function MapZoomWatcher({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
  const map = useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom());
    },
  });
  useEffect(() => {
    onZoomChange(map.getZoom());
  }, [map, onZoomChange]);
  return null;
}

// Map controller component that zooms in tightly to the parcel and positions it in the visible canvas
function MapController({ parcel }: { parcel: LandParcel | null }) {
  const map = useMap();
  useEffect(() => {
    if (parcel) {
      try {
        const geoLayer = L.geoJSON(parcel.geometry as any);
        const bounds = geoLayer.getBounds();
        if (bounds.isValid()) {
          const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
          map.fitBounds(bounds, {
            paddingTopLeft: isDesktop ? [410, 50] : [30, 30],
            paddingBottomRight: isDesktop ? [180, 50] : [30, 30],
            maxZoom: 18,
            animate: true,
            duration: 1.2,
          });
          return;
        }
      } catch {
        // fallback to centroid flyTo
      }
      map.flyTo(parcel.centroid, 18, { duration: 1.2 });
    }
  }, [parcel, map]);
  return null;
}

// Side Info Panel matching reference image
function LandInformationPanel({ parcel, onClose }: { parcel: LandParcel; onClose: () => void }) {
  const activeUtilities: string[] = [];
  if (parcel.utilityConnections?.water) activeUtilities.push('Water');
  if (parcel.utilityConnections?.electricity) activeUtilities.push('Electricity');
  if (parcel.utilityConnections?.sewage) activeUtilities.push('Sewage');

  return (
    <div className="absolute top-3 left-3 bottom-3 w-80 md:w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl z-[400] border border-slate-200 overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
        <div>
          <h2 className="text-base font-bold text-slate-900">Land Information</h2>
          <p className="text-xs text-slate-500">Cadastral survey & spatial registry</p>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      <div className="p-4 overflow-y-auto space-y-4 flex-1">
        {/* Survey Banner Card with ULPIN */}
        <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100 relative">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">ULPIN</span>
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded border border-emerald-200 shadow-2xs">
                  {parcel.ulpin}
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Survey Number</span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                Survey No. {parcel.surveyNumber}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                {parcel.village} Village, {parcel.mandalName} Taluk
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {parcel.districtName}, {parcel.stateName}
              </p>
            </div>
            <span className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-xs shadow-xs",
              parcel.recordStatus === 'Clear'
                ? "bg-emerald-600 text-white"
                : parcel.recordStatus === 'Encumbered'
                ? "bg-amber-600 text-white"
                : "bg-rose-600 text-white"
            )}>
              <CheckCircle2 size={12} />
              <span>{parcel.recordStatus}</span>
            </span>
          </div>
        </div>

        {/* Detailed Attribute Rows */}
        <div className="space-y-1 text-sm divide-y divide-slate-100">
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
              <User size={15} className="text-emerald-600" />
              <span>Owner Details</span>
            </div>
            <span className="text-xs font-bold text-slate-900">{parcel.recordedOwner}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
              <Crosshair size={15} className="text-emerald-600" />
              <span>ULPIN</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800">{parcel.ulpin}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
              <Ruler size={15} className="text-emerald-600" />
              <span>Land Area</span>
            </div>
            <span className="text-xs font-bold text-slate-900">
              {parcel.area} Acres ({parcel.areaSqft.toLocaleString('en-IN')} sq.ft.)
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
              <Wheat size={15} className="text-emerald-600" />
              <span>Land Classification</span>
            </div>
            <span className="text-xs font-semibold text-slate-800">{parcel.landUse}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
              <Landmark size={15} className="text-emerald-600" />
              <span>Zoning / Master Plan</span>
            </div>
            <span className="text-xs font-semibold text-slate-800">{parcel.masterPlanZone}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
              <Scale size={15} className="text-emerald-600" />
              <span>Encumbrance Status</span>
            </div>
            <span className={cn(
              "text-xs font-bold",
              parcel.encumbranceStatus === 'None'
                ? "text-emerald-700"
                : parcel.encumbranceStatus === 'Mortgaged'
                ? "text-amber-700"
                : "text-rose-700"
            )}>
              {parcel.encumbranceStatus === 'None'
                ? 'None (Clear Title)'
                : parcel.encumbranceStatus === 'Mortgaged'
                ? 'Mortgaged (Bank Lien)'
                : 'Litigation (Dispute Notice)'}
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
              <Coins size={15} className="text-emerald-600" />
              <span>Property Tax Status</span>
            </div>
            <span className={cn(
              "text-xs font-bold",
              parcel.propertyTaxStatus === 'Paid'
                ? "text-emerald-700"
                : parcel.propertyTaxStatus === 'Due'
                ? "text-amber-700"
                : "text-rose-700"
            )}>
              {parcel.propertyTaxStatus}
              {parcel.propertyTaxLastPaid ? ` (Last: ${parcel.propertyTaxLastPaid})` : ''}
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
              <Zap size={15} className="text-emerald-600" />
              <span>Utility Connections</span>
            </div>
            <span className="text-xs font-semibold text-slate-800">
              {activeUtilities.length > 0 ? activeUtilities.join(' · ') : 'None Connected'}
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
              <FileText size={15} className="text-emerald-600" />
              <span>Registration Deed No.</span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-800">{parcel.registrationDeedNumber}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
              <Coins size={15} className="text-emerald-600" />
              <span>Guidance Market Value</span>
            </div>
            <span className="text-xs font-bold text-slate-900">₹{parcel.marketValuePerSqft.toLocaleString('en-IN')}/sq.ft</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main GIS Explorer Component
interface GISExplorerProps {
  initialParcelId?: string;
  height?: string;
  showSearch?: boolean;
  showLayerToggle?: boolean;
  customParcels?: LandParcel[];
}

export function GISExplorer({
  initialParcelId,
  height = '520px',
  showSearch = true,
  showLayerToggle = true,
  customParcels,
}: GISExplorerProps) {
  const { t } = useTranslation();
  const storeParcels = useAppStore(state => state.parcels);
  const defaultParcels = (storeParcels && storeParcels.length > 0) ? storeParcels : DEMO_PARCELS;
  const parcels = customParcels ? customParcels : defaultParcels;
  const syncWithSupabase = useAppStore(state => state.syncWithSupabase);

  useEffect(() => {
    syncWithSupabase();
  }, [syncWithSupabase]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(() => {
    if (initialParcelId) {
      return parcels.find(p => p.id === initialParcelId) ?? parcels[0] ?? null;
    }
    return parcels[0] ?? null;
  });

  useEffect(() => {
    if (initialParcelId) {
      const match = parcels.find(p => p.id === initialParcelId);
      if (match) {
        setSelectedParcel(match);
        return;
      }
    }
    if (parcels.length > 0 && (!selectedParcel || !parcels.some(p => p.id === selectedParcel.id))) {
      setSelectedParcel(parcels[0]);
    }
  }, [parcels, initialParcelId]);
  const [searchError, setSearchError] = useState('');
  const [showChangeDetection, setShowChangeDetection] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(16);
  
  // SATELLITE AS THE DEFAULT LAYER
  const [layer, setLayer] = useState<'street' | 'satellite'>('satellite');
  const geoJsonRef = useRef<any>(null);

  const TILE_URLS = {
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  };

  const TILE_ATTRS = {
    street: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
    satellite: '&copy; Esri World Imagery &mdash; USDA, USGS, AeroGRID',
  };

  const getParcelStyle = useCallback((parcel: LandParcel) => {
    const isSelected = parcel.id === selectedParcel?.id;
    const isFlaggedShift = showChangeDetection && SIMULATED_SHIFTED_PARCELS.some(s => s.id === parcel.id);

    if (isFlaggedShift) {
      return {
        color: '#f59e0b',
        weight: 3,
        fillColor: '#fef3c7',
        fillOpacity: 0.35,
        dashArray: '4, 4',
        opacity: 1,
      };
    }

    return {
      color: isSelected ? '#22c55e' : '#16a34a',
      weight: isSelected ? 4 : 2,
      fillColor: isSelected ? '#22c55e' : '#15803d',
      fillOpacity: isSelected ? 0.38 : 0.18,
      dashArray: isSelected ? undefined : '4, 4',
      opacity: 1,
    };
  }, [selectedParcel, showChangeDetection]);

  const handleSearch = () => {
    setSearchError('');
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    const found = parcels.find(
      p => p.surveyNumber.toLowerCase() === q ||
           p.ulpin.toLowerCase() === q ||
           p.village.toLowerCase().includes(q) ||
           p.mandalName.toLowerCase().includes(q) ||
           p.districtName.toLowerCase().includes(q)
    );
    if (found) {
      setSelectedParcel(found);
    } else {
      setSearchError('Survey No, ULPIN, or Village name not found.');
    }
  };

  const handleParcelClick = (parcel: LandParcel) => {
    setSelectedParcel(parcel);
  };

  return (
    <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-300 font-sans shadow-panel" style={{ height }}>
      {/* Top Search Toolbar */}
      {showSearch && (
        <div className="absolute top-4 left-4 right-4 md:right-auto md:w-96 z-[400] flex gap-2">
          <div className="flex-1 relative shadow-lg">
            <input
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setSearchError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Search Survey No. / ULPIN / Patta..."
              className="w-full bg-white/95 backdrop-blur-md border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchError && (
              <p className="absolute top-full left-0 mt-1 text-xs text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg shadow-md border border-rose-200 z-10 font-semibold">
                {searchError}
              </p>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg font-bold text-sm flex items-center gap-1.5 transition-colors flex-shrink-0"
          >
            <Search size={16} />
          </button>
        </div>
      )}

      {/* Layer & Change Detection Toggle Buttons (Top Right) */}
      <div className="absolute top-4 right-4 z-[400] flex items-center gap-2">
        <button
          onClick={() => setShowChangeDetection(v => !v)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-xl shadow-lg border text-xs font-bold transition-all backdrop-blur-md",
            showChangeDetection
              ? "bg-amber-500 text-white border-amber-600 ring-2 ring-amber-400/50 shadow-amber-500/20"
              : "bg-white/95 text-slate-700 border-slate-200 hover:bg-white"
          )}
          title="Toggle Simulated Cadastral Change Detection"
        >
          <Activity size={15} className={showChangeDetection ? "text-amber-100 animate-pulse" : "text-slate-500"} />
          <span>Change Detection (Simulated)</span>
        </button>

        {showLayerToggle && (
          <button
            onClick={() => setLayer(layer === 'satellite' ? 'street' : 'satellite')}
            className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 text-xs font-bold text-slate-800 hover:bg-white transition-all"
            title="Toggle Map View"
          >
            <Layers size={15} className="text-emerald-600" />
            <span className="capitalize">{layer === 'satellite' ? 'Satellite View' : 'Street View'}</span>
          </button>
        )}
      </div>

      {/* Quick Parcel Chips (Top Center / Right) */}
      <div className="absolute top-16 right-4 z-[400] hidden lg:block">
        <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-slate-200 space-y-1">
          <p className="text-[10px] uppercase font-bold text-slate-400 px-2">
            {customParcels ? `My Registered Land (${parcels.length})` : `Cadastral Parcels (${parcels.length})`}
          </p>
          <div className="flex flex-col gap-1 max-h-36 overflow-y-auto">
            {parcels.slice(0, 30).map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedParcel(p)}
                className={cn(
                  'text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between gap-3',
                  selectedParcel?.id === p.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <span>Survey {p.surveyNumber}</span>
                <span className={cn('text-[11px] font-normal', selectedParcel?.id === p.id ? 'text-emerald-100' : 'text-slate-500')}>
                  {p.area} ac
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={selectedParcel ? selectedParcel.centroid : [16.3067, 80.4365]}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <MapZoomWatcher onZoomChange={setCurrentZoom} />
        <TileLayer url={TILE_URLS[layer]} attribution={TILE_ATTRS[layer]} />
        {layer === 'satellite' && (
          <>
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri Boundaries & Places"
            />
            {/* High-detail CartoDB Voyager labels for villages/towns only when tuned in (zoom >= 12) */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
              minZoom={12}
              maxZoom={20}
              attribution="&copy; OpenStreetMap & CartoDB"
            />
          </>
        )}
        <MapController parcel={selectedParcel} />

        {/* Polygon boundaries */}
        {parcels.map(parcel => (
          <GeoJSON
            key={`${parcel.id}-${selectedParcel?.id}-${layer}`}
            ref={parcel.id === selectedParcel?.id ? geoJsonRef : undefined}
            data={{
              type: 'Feature',
              properties: { id: parcel.id },
              geometry: parcel.geometry,
            } as any}
            style={() => getParcelStyle(parcel)}
            eventHandlers={{
              click: () => handleParcelClick(parcel),
            }}
          >
            <Tooltip sticky>
              <div className="font-sans text-xs font-bold text-slate-900 p-1">
                Survey No: <strong className="text-emerald-700 font-extrabold">{parcel.surveyNumber}</strong>
                <p className="text-[10px] text-slate-500 font-normal mt-0.5">{parcel.village} · {parcel.area} Acres</p>
              </div>
            </Tooltip>
          </GeoJSON>
        ))}

        {/* Change Detection (Simulated) Overlays */}
        {showChangeDetection && SIMULATED_SHIFTED_PARCELS.map(sp => (
          <GeoJSON
            key={`change-detect-${sp.id}-${layer}`}
            data={{
              type: 'Feature',
              properties: { id: sp.id, surveyNumber: sp.surveyNumber },
              geometry: sp.geometry,
            } as any}
            style={() => ({
              color: '#f43f5e',
              weight: 3,
              fillColor: '#f43f5e',
              fillOpacity: 0.32,
              dashArray: '6, 6',
            })}
          >
            <Tooltip sticky>
              <div className="font-sans text-xs p-1 max-w-xs">
                <div className="flex items-center gap-1 text-rose-700 font-black mb-1">
                  <AlertTriangle size={13} />
                  <span>Change Detection (Simulated)</span>
                </div>
                <p className="font-bold text-slate-900 leading-snug">
                  Boundary shift detected since last survey — flagged for re-verification
                </p>
                <p className="text-[10px] text-slate-600 mt-1">
                  Survey No. {sp.surveyNumber} ({sp.village}) · {sp.variance}
                </p>
                <span className="inline-block mt-1 text-[9px] font-bold text-rose-800 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                  Cadastral AI Prototype · Simulated Signal
                </span>
              </div>
            </Tooltip>
          </GeoJSON>
        ))}

        {/* Selected Parcel Marker: Progressive Google-Maps styled Village Badge when tuned in */}
        {selectedParcel && (
          <Marker position={selectedParcel.centroid} icon={redPinIcon}>
            {currentZoom >= 13 ? (
              <Tooltip permanent direction="top" offset={[0, -22]}>
                <div className="font-sans text-center py-1 px-1.5 min-w-[160px]">
                  {/* Google-Maps-Style Orange Village Highlight Pill */}
                  <div className="inline-flex items-center justify-center gap-1 px-2.5 py-0.5 bg-amber-500 text-white rounded-full font-black text-xs shadow-xs mb-1">
                    <span>📍</span>
                    <span>{selectedParcel.village}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <span className="font-bold text-xs text-slate-900">
                      Survey #{selectedParcel.surveyNumber}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                      {selectedParcel.area} ac
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                    {selectedParcel.mandalName} Mandal · {selectedParcel.districtName}
                  </div>
                </div>
              </Tooltip>
            ) : (
              <Tooltip direction="top" offset={[0, -18]}>
                <div className="font-sans text-xs font-bold text-slate-900">
                  <span>📍 {selectedParcel.village} · Survey #{selectedParcel.surveyNumber}</span>
                </div>
              </Tooltip>
            )}
          </Marker>
        )}

        {/* Village Markers for other parcels on map (clean dot when zoomed out, pill when tuned in) */}
        {parcels.filter(p => p.id !== selectedParcel?.id).map(p => (
          <Marker
            key={`village-pin-${p.id}`}
            position={p.centroid}
            icon={currentZoom >= 13 ? (
              L.divIcon({
                className: 'village-marker',
                html: `<div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
                  <div style="background: #fffbeb; border: 1.5px solid #d97706; color: #92400e; padding: 2px 7px; border-radius: 8px; font-weight: bold; font-size: 10px; font-family: Arial, sans-serif; box-shadow: 0 2px 5px rgba(0,0,0,0.25); white-space: nowrap;">
                    📍 ${p.village} (#${p.surveyNumber})
                  </div>
                  <div style="width: 8px; height: 8px; background: #d97706; border: 1.5px solid white; border-radius: 50%;"></div>
                </div>`,
                iconSize: [0, 0],
              })
            ) : (
              L.divIcon({
                className: 'mini-dot',
                html: `<div style="width: 8px; height: 8px; background: #059669; border: 1.5px solid white; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.4); transform: translate(-50%, -50%); cursor: pointer;"></div>`,
                iconSize: [0, 0],
              })
            )}
            eventHandlers={{
              click: () => handleParcelClick(p),
            }}
          >
            <Tooltip direction="top" offset={[0, currentZoom >= 13 ? -20 : -5]}>
              <span className="font-sans font-semibold text-xs">
                {p.village} · Survey #{p.surveyNumber} ({p.area} ac)
              </span>
            </Tooltip>
          </Marker>
        ))}

        {/* Cadastral Corner Boundary Pegs / FMB Survey Stones - only visible when tuned in tightly */}
        {currentZoom >= 16 && selectedParcel && (selectedParcel.geometry.coordinates[0] as number[][])?.slice(0, -1).map((pt, idx) => (
          <Marker
            key={`corner-${selectedParcel.id}-${idx}`}
            position={[pt[1], pt[0]]}
            icon={L.divIcon({
              className: 'survey-stone',
              html: `<div style="width: 8px; height: 8px; background: #ffffff; border: 2px solid #059669; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.5); transform: translate(-50%, -50%);"></div>`,
              iconSize: [0, 0],
            })}
          >
            <Tooltip direction="top" offset={[0, -5]}>
              <span className="font-sans font-bold text-[10px] text-slate-800">
                FMB Corner #{idx + 1}
              </span>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {/* Simulated Change Detection Active Status Floating Strip */}
      {showChangeDetection && (
        <div className="absolute bottom-4 right-16 z-[400] max-w-sm bg-slate-900/90 text-white p-3 rounded-2xl border border-amber-500/40 shadow-xl backdrop-blur-md hidden sm:flex items-start gap-2.5">
          <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
          <div className="text-xs">
            <p className="font-bold text-amber-300">Change Detection Overlay (Simulated)</p>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
              Highlighting 2 parcels with mock boundary variance against digital cadastral registry. Flagged for surveyor re-verification.
            </p>
          </div>
        </div>
      )}

      {/* Side Info Panel */}
      {selectedParcel && (
        <LandInformationPanel
          parcel={selectedParcel}
          onClose={() => setSelectedParcel(null)}
        />
      )}
    </div>
  );
}
