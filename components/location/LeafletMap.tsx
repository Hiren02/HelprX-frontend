'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LeafletMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  defaultLocation?: { lat: number, lng: number };
}

function LocationMarker({ onLocationSelect, position }: { onLocationSelect: (lat: number, lng: number) => void, position: L.LatLngExpression }) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const pos = marker.getLatLng();
          onLocationSelect(pos.lat, pos.lng);
        },
      }}
    />
  ) : null;
}

// Helper to update map center when defaultLocation changes
function MapUpdater({ center }: { center: L.LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function LeafletMap({ onLocationSelect, defaultLocation }: LeafletMapProps) {
  const initialCenter: L.LatLngExpression = defaultLocation ? [defaultLocation.lat, defaultLocation.lng] : [19.0760, 72.8777]; // Mumbai default
  const [markerPos, setMarkerPos] = useState<L.LatLngExpression>(initialCenter);

  const handleSelect = (lat: number, lng: number) => {
    setMarkerPos([lat, lng]);
    onLocationSelect(lat, lng);
  };

  return (
    <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner z-0">
      <MapContainer
        center={initialCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationSelect={handleSelect} position={markerPos} />
        <MapUpdater center={markerPos} />
      </MapContainer>
    </div>
  );
}
