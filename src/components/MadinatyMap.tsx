"use client";

import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import type { MapLocation } from "@/types/site";
import "leaflet/dist/leaflet.css";

const baseCenter: LatLngExpression = [30.0461, 31.6489];

const markerIcon = new L.DivIcon({
  className: "map-marker",
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const activeMarkerIcon = new L.DivIcon({
  className: "map-marker active",
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

interface CenterUpdaterProps {
  position: LatLngExpression;
}

function CenterUpdater({ position }: CenterUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }

    map.flyTo(position, map.getZoom(), { animate: true, duration: 0.8 });
  }, [map, position]);

  return null;
}

interface MadinatyMapProps {
  locations: MapLocation[];
  activeLocationId: string;
  onSelect: (locationId: string) => void;
}

export function MadinatyMap({ locations, activeLocationId, onSelect }: MadinatyMapProps) {
  const activeLocation =
    locations.find((location) => location.id === activeLocationId) ?? locations[0];

  const center: LatLngExpression = activeLocation
    ? [activeLocation.latitude, activeLocation.longitude]
    : baseCenter;

  return (
    <div className="map-shell">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        className="map-leaflet"
        doubleClickZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <CenterUpdater position={center} />
        <TileLayer
          url="https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
        />

        {locations.map((location) => {
          const position: LatLngExpression = [location.latitude, location.longitude];
          const isActive = location.id === activeLocation?.id;
          return (
            <Marker
              key={location.id}
              position={position}
              icon={isActive ? activeMarkerIcon : markerIcon}
              eventHandlers={{
                click: () => onSelect(location.id)
              }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
