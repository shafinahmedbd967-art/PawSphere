'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppStore } from '@/store/appStore';

interface MapMarker {
  id: string;
  type: string;
  severity: string;
  lat: number;
  lng: number;
  title: string;
}

interface Props {
  markers: MapMarker[];
  onMarkerSelect?: (id: string) => void;
}

const severityColors: Record<string, string> = {
  emergency: '#EF4444',
  moderate:  '#F59E0B',
  safe:      '#10B981',
};

const typeEmojis: Record<string, string> = {
  rescue:    '🆘',
  shelter:   '🏠',
  vet:       '🏥',
  feeding:   '🍖',
  ambulance: '🚑',
};

function createCustomIcon(type: string, severity: string) {
  const color = severityColors[severity] || '#10B981';
  const emoji = typeEmojis[type] || '📍';
  const svg = `
    <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="${color}" flood-opacity="0.4"/>
        </filter>
      </defs>
      <path d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30S40 35 40 20C40 9 31 0 20 0z"
            fill="${color}" filter="url(#shadow)" opacity="0.9"/>
      <circle cx="20" cy="20" r="12" fill="white" opacity="0.95"/>
      <text x="20" y="25" text-anchor="middle" font-size="14">${emoji}</text>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
}

function MapSetup() {
  const map = useMap();
  useEffect(() => { map.setView([23.7808, 90.4125], 12); }, [map]);
  return null;
}

export default function MapComponent({ markers, onMarkerSelect }: Props) {
  const { theme } = useAppStore();

  // dark = CartoDB dark_all, light = CartoDB light_all
  const tileUrl = theme === 'light'
    ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

  return (
    <MapContainer
      center={[23.7808, 90.4125]}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        key={tileUrl}          /* key forces re-mount when theme changes */
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={tileUrl}
      />
      <MapSetup />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          icon={createCustomIcon(marker.type, marker.severity)}
          eventHandlers={{ click: () => onMarkerSelect?.(marker.id) }}
        >
          <Popup>
            <div style={{ color: theme === 'light' ? '#1A1D27' : '#F1F5F9', padding: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 18 }}>{typeEmojis[marker.type]}</span>
                <strong style={{ fontSize: 13 }}>{marker.title}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: severityColors[marker.severity] }} />
                <span style={{ fontSize: 11, opacity: 0.7, textTransform: 'capitalize' }}>
                  {marker.severity} • {marker.type}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
