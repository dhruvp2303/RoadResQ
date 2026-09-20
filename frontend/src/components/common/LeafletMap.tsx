import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LocationCoords, Provider, Incident } from '../../types';
import { ExternalLink, Layers, Navigation } from 'lucide-react';

// Custom Crisp SVG Icons for clean Light & Google Maps UI
const createBreakdownIcon = () =>
  L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute -inset-3 rounded-full bg-red-500/25 animate-ping"></div>
        <div class="relative w-10 h-10 rounded-full bg-red-600 border-2 border-white shadow-lg text-white flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  });

const createProviderIcon = (heading = 0, isAssigned = false) =>
  L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="relative flex items-center justify-center transition-transform duration-500">
        ${
          isAssigned
            ? '<div class="absolute -inset-2 rounded-full bg-blue-500/30 animate-ping"></div>'
            : ''
        }
        <div class="relative w-10 h-10 rounded-full ${
          isAssigned
            ? 'bg-blue-600 border-2 border-white shadow-lg'
            : 'bg-slate-800 border-2 border-white shadow-md'
        } text-white flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 17a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4M5 17h1.5m3 0h5m3 0H19m-4-8h4l2 4v4h-2m-14 0H3v-4l2-4h8" />
          </svg>
          <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></div>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  });

const createStandbyProviderIcon = () =>
  L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="w-8 h-8 rounded-full bg-white border-2 border-emerald-500 shadow-md text-emerald-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

// Component to dynamically adjust map bounds
const MapBoundsUpdater: React.FC<{
  userLocation?: LocationCoords;
  providerCoords?: { lat: number; lng: number };
  allIncidents?: Incident[];
}> = ({ userLocation, providerCoords, allIncidents }) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation && providerCoords) {
      const bounds = L.latLngBounds(
        [userLocation.lat, userLocation.lng],
        [providerCoords.lat, providerCoords.lng]
      );
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
    } else if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 15, { animate: true });
    } else if (allIncidents && allIncidents.length > 0) {
      const coords = allIncidents.map((inc) => [inc.location.lat, inc.location.lng] as [number, number]);
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [map, userLocation?.lat, userLocation?.lng, providerCoords?.lat, providerCoords?.lng, allIncidents]);

  return null;
};

interface LeafletMapProps {
  userLocation?: LocationCoords;
  assignedProvider?: Provider;
  currentProviderCoords?: { lat: number; lng: number };
  providerRoute?: [number, number][];
  standbyProviders?: Provider[];
  allIncidents?: Incident[];
  className?: string;
  showAllFleet?: boolean;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  userLocation,
  assignedProvider,
  currentProviderCoords,
  providerRoute,
  standbyProviders = [],
  allIncidents = [],
  className = 'h-96 w-full rounded-2xl overflow-hidden',
  showAllFleet = false,
}) => {
  const [mapSource, setMapSource] = useState<'google_streets' | 'google_satellite' | 'carto_osm'>('google_streets');

  const defaultCenter: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [12.9352, 77.6245]; // Koramangala, Bengaluru

  const activeProviderPosition = currentProviderCoords || assignedProvider?.coords;

  // Google Maps External Link
  const googleMapsUrl = userLocation
    ? `https://www.google.com/maps/dir/?api=1&destination=${userLocation.lat},${userLocation.lng}`
    : 'https://maps.google.com';

  const getTileUrl = () => {
    switch (mapSource) {
      case 'google_streets':
        return 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
      case 'google_satellite':
        return 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
      case 'carto_osm':
      default:
        return 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    }
  };

  return (
    <div className={`relative ${className} border border-slate-200 shadow-sm bg-slate-100 rounded-2xl overflow-hidden`}>
      <MapContainer
        center={defaultCenter}
        zoom={14}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        attributionControl={false}
      >
        <TileLayer
          key={mapSource}
          url={getTileUrl()}
          maxZoom={20}
        />

        <MapBoundsUpdater
          userLocation={userLocation}
          providerCoords={activeProviderPosition}
          allIncidents={allIncidents}
        />

        {/* User Breakdown Marker */}
        {userLocation && (
          <>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={100}
              pathOptions={{
                color: '#dc2626',
                fillColor: '#ef4444',
                fillOpacity: 0.15,
                weight: 2,
              }}
            />
            <Marker position={[userLocation.lat, userLocation.lng]} icon={createBreakdownIcon()}>
              <Popup>
                <div className="p-1 text-slate-900">
                  <div className="font-bold text-xs uppercase tracking-wider text-red-600">Breakdown Location</div>
                  <div className="text-sm font-semibold text-slate-800">{userLocation.address}</div>
                  {userLocation.landmark && (
                    <div className="text-xs text-slate-500 mt-0.5">📌 {userLocation.landmark}</div>
                  )}
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {/* Route Line */}
        {providerRoute && providerRoute.length > 0 && (
          <Polyline
            positions={providerRoute}
            pathOptions={{
              color: '#2563eb',
              weight: 5,
              opacity: 0.9,
              dashArray: '8, 8',
            }}
          />
        )}

        {/* Assigned Moving Provider Marker */}
        {activeProviderPosition && assignedProvider && (
          <Marker
            position={[activeProviderPosition.lat, activeProviderPosition.lng]}
            icon={createProviderIcon(assignedProvider.heading, true)}
          >
            <Popup>
              <div className="p-1 text-slate-900 min-w-44">
                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={assignedProvider.avatar}
                    alt={assignedProvider.name}
                    className="w-8 h-8 rounded-full object-cover border border-blue-500"
                  />
                  <div>
                    <div className="font-bold text-sm leading-tight text-slate-900">{assignedProvider.name}</div>
                    <div className="text-xs text-slate-600">{assignedProvider.vehicleType}</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                  ⭐ {assignedProvider.rating} ({assignedProvider.jobsCompleted} dispatches)
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Standby Fleet Markers */}
        {showAllFleet &&
          standbyProviders
            .filter((p) => p.id !== assignedProvider?.id)
            .map((prov) => (
              <Marker
                key={prov.id}
                position={[prov.coords.lat, prov.coords.lng]}
                icon={createStandbyProviderIcon()}
              >
                <Popup>
                  <div className="p-1 text-slate-900">
                    <div className="font-bold text-xs text-emerald-700">{prov.name}</div>
                    <div className="text-xs text-slate-600">{prov.vehicleType} • {prov.status}</div>
                  </div>
                </Popup>
              </Marker>
            ))}

        {/* Admin Incidents Markers */}
        {allIncidents.map((inc) => (
          <Marker
            key={inc.id}
            position={[inc.location.lat, inc.location.lng]}
            icon={createBreakdownIcon()}
          >
            <Popup>
              <div className="p-1 text-slate-900">
                <div className="font-bold text-xs text-red-600">{inc.id} • {inc.breakdownType}</div>
                <div className="text-sm font-semibold">{inc.userName}</div>
                <div className="text-xs text-slate-600">{inc.vehicle.make} {inc.vehicle.model} ({inc.vehicle.plate})</div>
                <div className="text-xs font-bold mt-1 text-amber-700">Status: {inc.status}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Top Left: Accuracy Badge */}
      <div className="absolute top-3 left-3 z-[400] flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-full text-xs shadow-md">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="font-medium text-slate-700 font-mono">GPS: High Accuracy (±3m)</span>
      </div>

      {/* Top Right: Google Maps & Tile Switcher Controls */}
      <div className="absolute top-3 right-3 z-[400] flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200 p-1 rounded-xl shadow-md text-xs">
        <button
          type="button"
          onClick={() => setMapSource('google_streets')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
            mapSource === 'google_streets'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Google Map
        </button>

        <button
          type="button"
          onClick={() => setMapSource('google_satellite')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
            mapSource === 'google_satellite'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Satellite
        </button>

        <button
          type="button"
          onClick={() => setMapSource('carto_osm')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
            mapSource === 'carto_osm'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Clean
        </button>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all ml-1"
          title="Open in Google Maps App"
        >
          <ExternalLink className="h-3.5 w-3.5 text-blue-600" />
          <span>Open Maps</span>
        </a>
      </div>
    </div>
  );
};

export default LeafletMap;
