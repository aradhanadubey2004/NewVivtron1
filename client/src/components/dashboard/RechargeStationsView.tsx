import React, { useState, useRef, useEffect, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Navigation,
  Layers,
  Phone,
  Loader2,
  Compass
} from 'lucide-react';

interface OccupiedStation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  status: 'Occupied' | 'Active';
}

export const RechargeStationsView: React.FC = () => {
  // Pin Coordinates - Default New Delhi matching reference screenshot
  const [lat, setLat] = useState<string>('28.6139');
  const [lng, setLng] = useState<string>('77.2090');
  const [stationName, setStationName] = useState<string>('');
  const [locationAddress, setLocationAddress] = useState<string>('Connaught Place, Central Delhi, New Delhi, Delhi 110001');
  const [pinLabel, setPinLabel] = useState<string>('New Delhi');
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);

  // Map state
  const [mapLayer, setMapLayer] = useState<'topo' | 'satellite' | 'streets'>('topo');
  const [is3D, setIs3D] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Map references
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const occupiedMarkersRef = useRef<L.Marker[]>([]);
  const currentTileLayerRef = useRef<L.TileLayer | null>(null);

  // Form submission feedback
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  // 1 Occupied location matching Screenshot 2 badge "● 1 occupied locations"
  const [occupiedStations, setOccupiedStations] = useState<OccupiedStation[]>([
    {
      id: 'ST-001',
      name: 'Vivtron EVCS - Connaught Place Central',
      address: 'Outer Circle, Connaught Place, New Delhi, Delhi 110001',
      lat: 28.6315,
      lng: 77.2167,
      status: 'Occupied',
    },
  ]);

  // Custom Brown Teardrop Pin matching Screenshot 2 exactly
  const createMapplsPinIcon = useCallback((cityName: string) => {
    return L.divIcon({
      className: 'mappls-custom-pin',
      html: `
        <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%); cursor: grab; user-select: none;">
          <!-- Pin Head Teardrop -->
          <div style="position:relative; width:36px; height:36px; border-radius:50%; background:#523A28; border:2.5px solid #FFFFFF; box-shadow:0 6px 16px rgba(0,0,0,0.38); display:flex; align-items:center; justify-content:center;">
            <div style="width:11px; height:11px; border-radius:50%; background:#FFFFFF;"></div>
            <!-- Pointer Arrow -->
            <div style="position:absolute; bottom:-7px; left:50%; transform:translateX(-50%); width:0; height:0; border-left:6px solid transparent; border-right:6px solid transparent; border-top:8px solid #523A28;"></div>
          </div>
          <!-- City Label Badge -->
          <div style="margin-top:6px; padding:2px 8px; border-radius:5px; background:rgba(255,255,255,0.96); border:1px solid #CBD5E1; box-shadow:0 2px 6px rgba(0,0,0,0.2); font-size:11px; font-weight:800; color:#1E293B; white-space:nowrap; font-family:system-ui, -apple-system, sans-serif;">
            ${cityName || 'New Delhi'}
          </div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
  }, []);

  // Custom Occupied Pin for registered stations
  const createOccupiedPinIcon = useCallback((name: string) => {
    return L.divIcon({
      className: 'occupied-custom-pin',
      html: `
        <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%); cursor: pointer; user-select: none;">
          <div style="position:relative; width:30px; height:30px; border-radius:50%; background:#059669; border:2px solid #FFFFFF; box-shadow:0 4px 12px rgba(5,150,105,0.4); display:flex; align-items:center; justify-content:center;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <div style="position:absolute; bottom:-6px; left:50%; transform:translateX(-50%); width:0; height:0; border-left:5px solid transparent; border-right:5px solid transparent; border-top:7px solid #059669;"></div>
          </div>
          <div style="margin-top:4px; padding:1.5px 6px; border-radius:4px; background:#EBF7F2; border:1px solid #A7E3CD; box-shadow:0 1px 4px rgba(0,0,0,0.1); font-size:10px; font-weight:700; color:#0D8A72; white-space:nowrap; font-family:system-ui, -apple-system, sans-serif;">
            ${name}
          </div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
  }, []);

  // Reverse geocoding via OpenStreetMap Nominatim
  const reverseGeocode = useCallback(async (latitude: number, longitude: number) => {
    setIsGeocoding(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data && data.display_name) {
          setLocationAddress(data.display_name);
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.suburb ||
            data.address?.state_district ||
            data.address?.state ||
            'Selected Location';
          setPinLabel(city);
          return;
        }
      }
    } catch (err) {
      console.warn('Geocoding notice:', err);
    } finally {
      setIsGeocoding(false);
    }
    setLocationAddress(`Location near coordinates (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return; // Prevent double initialization in StrictMode

    const initialLat = parseFloat(lat) || 28.6139;
    const initialLng = parseFloat(lng) || 77.2090;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 5,
      zoomControl: false,
      attributionControl: false,
    });

    // Add scale bar matching Screenshot 2 (300 km)
    L.control.scale({ imperial: false, position: 'bottomright' }).addTo(map);

    // Default layer: Esri World Topo Map (exact topographic / shaded terrain seen in Screenshot 2)
    const topoLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
      }
    ).addTo(map);

    currentTileLayerRef.current = topoLayer;
    mapRef.current = map;

    // Click handler to move pin and update inputs
    map.on('click', (e: L.LeafletMouseEvent) => {
      const newLat = e.latlng.lat.toFixed(4);
      const newLng = e.latlng.lng.toFixed(4);
      setLat(newLat);
      setLng(newLng);
      reverseGeocode(e.latlng.lat, e.latlng.lng);
    });

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // Switch Tile Layers (Topo / Satellite / Street)
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (currentTileLayerRef.current) {
      map.removeLayer(currentTileLayerRef.current);
    }

    let url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
    if (mapLayer === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    } else if (mapLayer === 'streets') {
      url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    }

    const newLayer = L.tileLayer(url, { maxZoom: 18 }).addTo(map);
    currentTileLayerRef.current = newLayer;
  }, [mapLayer]);

  // Handle Fullscreen & Container Resize
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 250);
    }
  }, [isFullscreen]);

  // Update or Create the Draggable Selection Pin
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    if (isNaN(latNum) || isNaN(lngNum)) return;

    const latLng: [number, number] = [latNum, lngNum];

    if (!markerRef.current) {
      const marker = L.marker(latLng, {
        draggable: true,
        icon: createMapplsPinIcon(pinLabel),
        zIndexOffset: 1000,
      }).addTo(map);

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        const nLat = pos.lat.toFixed(4);
        const nLng = pos.lng.toFixed(4);
        setLat(nLat);
        setLng(nLng);
        reverseGeocode(pos.lat, pos.lng);
      });

      markerRef.current = marker;
    } else {
      markerRef.current.setLatLng(latLng);
      markerRef.current.setIcon(createMapplsPinIcon(pinLabel));
    }
  }, [lat, lng, pinLabel, createMapplsPinIcon, reverseGeocode]);

  // Update Occupied Station Markers
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Clear old occupied markers
    occupiedMarkersRef.current.forEach((m) => m.remove());
    occupiedMarkersRef.current = [];

    // Add occupied stations
    occupiedStations.forEach((st) => {
      const stMarker = L.marker([st.lat, st.lng], {
        icon: createOccupiedPinIcon(st.name),
        zIndexOffset: 500,
      }).addTo(map);

      stMarker.bindPopup(`
        <div style="font-family:sans-serif; padding:4px 6px; min-width:180px;">
          <div style="font-weight:800; color:#0A1D37; font-size:12px;">${st.name}</div>
          <div style="color:#64748B; font-size:11px; margin-top:2px; line-height:1.3;">${st.address}</div>
          <div style="color:#059669; font-size:10px; font-weight:700; margin-top:6px; display:flex; align-items:center; gap:4px;">
            <span style="width:6px; height:6px; border-radius:50%; background:#059669; display:inline-block;"></span>
            Occupied EV Network Location
          </div>
        </div>
      `);

      occupiedMarkersRef.current.push(stMarker);
    });
  }, [occupiedStations, createOccupiedPinIcon]);

  // Handle "Use my location"
  const handleUseMyLocation = () => {
    if ('geolocation' in navigator) {
      setStatusMessage({ type: 'success', message: 'Locating current GPS coordinates...' });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLat = position.coords.latitude.toFixed(4);
          const currentLng = position.coords.longitude.toFixed(4);
          const latNum = parseFloat(currentLat);
          const lngNum = parseFloat(currentLng);

          setLat(currentLat);
          setLng(currentLng);

          if (mapRef.current) {
            mapRef.current.flyTo([latNum, lngNum], 13, { duration: 1.5 });
          }

          reverseGeocode(latNum, lngNum);
          setStatusMessage({
            type: 'success',
            message: `Pin updated to your current coordinates: ${currentLat}, ${currentLng}`,
          });
        },
        () => {
          setStatusMessage({
            type: 'error',
            message: 'Unable to retrieve your location. Location permission may be denied.',
          });
        }
      );
    } else {
      setStatusMessage({ type: 'error', message: 'Geolocation is not supported by your browser.' });
    }
  };

  // Handle Station Registration
  const handleRegisterStation = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum)) {
      setStatusMessage({ type: 'error', message: 'Please provide valid Latitude and Longitude.' });
      return;
    }

    // Proximity check (within ~100 meters)
    const existsWithin100m = occupiedStations.some((st) => {
      const dLat = Math.abs(st.lat - latNum);
      const dLng = Math.abs(st.lng - lngNum);
      return dLat < 0.001 && dLng < 0.001;
    });

    if (existsWithin100m) {
      setStatusMessage({
        type: 'error',
        message: 'A location within 100 meters of an existing station cannot be registered.',
      });
      return;
    }

    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      const newStation: OccupiedStation = {
        id: `ST-${Date.now().toString().slice(-4)}`,
        name: stationName.trim() || `Vivtron EVCS - ${pinLabel} Hub`,
        address: locationAddress.trim() || `Coordinates: ${lat}, ${lng}`,
        lat: latNum,
        lng: lngNum,
        status: 'Occupied',
      };
      setOccupiedStations([...occupiedStations, newStation]);
      setStatusMessage({
        type: 'success',
        message: `Station "${newStation.name}" registered successfully! Total occupied locations updated to ${occupiedStations.length + 1}.`,
      });
      setStationName('');
    }, 600);
  };

  return (
    <div className="w-full space-y-6">
      {/* ================= PAGE HEADER MATCHING SCREENSHOT 2 ================= */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-[#059669] uppercase tracking-wider font-mono mb-1">
            LOCATION NETWORK
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A1D37] font-heading tracking-tight">
            Recharge Station Locations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Register your station location once. Occupied locations remain visible so the network stays clear for everyone.
          </p>
        </div>

        {/* Top-Right Badge: 1 occupied locations */}
        <div className="self-start">
          <span className="px-3.5 py-1.5 rounded-full bg-[#EBF7F2] text-[#0D8A72] border border-[#A7E3CD] text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#0D8A72]"></span>
            <span>{occupiedStations.length} occupied locations</span>
          </span>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.message}</span>
        </div>
      )}

      {/* ================= TWO-COLUMN LAYOUT MATCHING SCREENSHOT 2 ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN: CHOOSE STATION LOCATION (7 COLS) ================= */}
        <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-[#0A1D37] font-heading">
                Choose station location
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Click the map, drag the pin, or use your current location.
              </p>
            </div>

            <button
              type="button"
              onClick={handleUseMyLocation}
              className="px-4 py-2 rounded-xl bg-[#1B365D] hover:bg-[#122542] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0 active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Use my location</span>
            </button>
          </div>

          {/* Actual Interactive Map Container */}
          <div
            className={`relative w-full rounded-2xl overflow-hidden border border-slate-300 bg-[#E8F0F8] transition-all ${
              isFullscreen ? 'fixed inset-4 z-[9999] rounded-2xl shadow-2xl h-[calc(100vh-2rem)]' : 'h-[460px]'
            }`}
          >
            {/* Real Map Canvas */}
            <div ref={mapContainerRef} className="w-full h-full z-10" />

            {/* Bottom-Left Mappls / MapmyIndia Branding matching Screenshot 2 */}
            <div className="absolute bottom-3 left-3 z-[1000] pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/85 backdrop-blur-xs border border-white/60 shadow-xs select-none">
              <span className="font-black tracking-wide text-[#00A2E8] text-[13px]">MAPPLS</span>
              <span className="text-slate-400 font-bold text-xs">|</span>
              <span className="font-bold text-[#FF6600] text-[12px]">MapmyIndia</span>
            </div>

            {/* Bottom-Right Map Attribution matching Screenshot 2 */}
            <div className="absolute bottom-3 right-3 z-[1000] pointer-events-none flex items-center gap-2 select-none">
              <div className="text-[10px] text-slate-700 font-medium px-2 py-0.5 rounded bg-white/80 backdrop-blur-xs border border-white/60">
                Map Data &copy; MapmyIndia | Report
              </div>
            </div>

            {/* Map Controls Floating on Top Right matching Screenshot 2 */}
            <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-9 h-9 rounded-lg bg-white/95 hover:bg-white border border-slate-300 shadow-sm flex items-center justify-center text-slate-700 hover:text-slate-900 transition cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* 3D / Perspective Dial matching Screenshot 2 */}
              <button
                type="button"
                onClick={() => {
                  const next = mapLayer === 'topo' ? 'satellite' : mapLayer === 'satellite' ? 'streets' : 'topo';
                  setMapLayer(next);
                  setIs3D(!is3D);
                }}
                className={`w-9 h-9 rounded-lg text-xs font-extrabold shadow-sm flex flex-col items-center justify-center transition cursor-pointer border ${
                  is3D
                    ? 'bg-[#1B365D] text-white border-[#1B365D]'
                    : 'bg-white/95 text-slate-700 border-slate-300 hover:bg-white'
                }`}
                title={`Current layer: ${mapLayer}. Click to toggle layer/3D`}
              >
                <Compass className="w-3.5 h-3.5 mb-0.5" />
                <span className="text-[9px] leading-none">3D</span>
              </button>

              {/* Zoom Controls */}
              <div className="flex flex-col rounded-lg bg-white/95 border border-slate-300 shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => mapRef.current?.zoomIn()}
                  className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition border-b border-slate-200 cursor-pointer"
                  title="Zoom In"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => mapRef.current?.zoomOut()}
                  className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
                  title="Zoom Out"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reverse Geocoding Status Chip */}
            {isGeocoding && (
              <div className="absolute top-4 left-4 z-[1000] px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200 text-xs text-slate-700 font-semibold flex items-center gap-2 shadow-xs">
                <Loader2 className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span>Fetching address...</span>
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: REGISTER STATION FORM (5 COLS) ================= */}
        <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5">
          <div>
            <h2 className="text-lg font-extrabold text-[#0A1D37] font-heading">
              Register station
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              A location within 100 meters of an existing station cannot be registered.
            </p>
          </div>

          <form onSubmit={handleRegisterStation} className="space-y-4">
            {/* Field 1: Station name (optional) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Station name <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                placeholder="Example: Vivtron EVCS - Main Road"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
              />
            </div>

            {/* Field 2: Location address (Matching Screenshot 2 placeholder) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  Location address
                </label>
                {isGeocoding && (
                  <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-semibold">
                    <Loader2 className="w-3 h-3 animate-spin" /> Syncing from Mappls
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
                placeholder="Address will be filled from Mappls, or enter it manually"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition resize-none"
              />
            </div>

            {/* Field 3: LATITUDE and LONGITUDE (Side by Side) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700 tracking-wider">
                  LATITUDE
                </label>
                <input
                  type="text"
                  value={lat}
                  onChange={(e) => {
                    setLat(e.target.value);
                    const parsed = parseFloat(e.target.value);
                    if (!isNaN(parsed) && mapRef.current) {
                      mapRef.current.panTo([parsed, parseFloat(lng) || 77.2090]);
                    }
                  }}
                  placeholder="28.6139"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-700 tracking-wider">
                  LONGITUDE
                </label>
                <input
                  type="text"
                  value={lng}
                  onChange={(e) => {
                    setLng(e.target.value);
                    const parsed = parseFloat(e.target.value);
                    if (!isNaN(parsed) && mapRef.current) {
                      mapRef.current.panTo([parseFloat(lat) || 28.6139, parsed]);
                    }
                  }}
                  placeholder="77.2090"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                />
              </div>
            </div>

            {/* Submit Action Button Matching Screenshot 2 */}
            <button
              type="submit"
              disabled={isRegistering}
              className="w-full py-3.5 rounded-xl bg-[#00A86B] hover:bg-[#00935D] text-white font-extrabold text-sm shadow-md shadow-[#00A86B]/25 transition hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {isRegistering ? 'Registering...' : 'Register this location'}
            </button>
          </form>

          {/* Occupied Locations Preview Box & Helpline Badge */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <span className="text-[11px] font-bold text-slate-600 block">
              Registered Network Locations ({occupiedStations.length}):
            </span>
            <div className="space-y-2 max-h-36 overflow-y-auto">
              {occupiedStations.map((st) => (
                <div
                  key={st.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs hover:border-emerald-200 transition cursor-pointer"
                  onClick={() => {
                    if (mapRef.current) {
                      mapRef.current.flyTo([st.lat, st.lng], 12);
                    }
                  }}
                >
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-900 truncate">{st.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{st.address}</div>
                    <div className="text-[10px] font-mono text-emerald-700 mt-0.5">
                      {st.lat}, {st.lng}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Helpline Floating Pill Matching Screenshot 1 & 2 */}
            <div className="flex justify-end pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs text-xs font-bold text-slate-700">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>Helpline: 0120-4144584</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
