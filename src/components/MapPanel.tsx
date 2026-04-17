"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { SiteContent } from "@/types/site";

const MadinatyMap = dynamic(() => import("./MadinatyMap").then((mod) => mod.MadinatyMap), {
  ssr: false,
  loading: () => <div className="map-container loading" />
});

interface MapPanelProps {
  content: SiteContent;
}

export function MapPanel({ content }: MapPanelProps) {
  const locations = content.map.locations;
  const [activeLocationId, setActiveLocationId] = useState(locations[0]?.id ?? "");

  const activeLocation = useMemo(() => {
    return locations.find((location) => location.id === activeLocationId) ?? locations[0];
  }, [activeLocationId, locations]);

  return (
    <div className="map reveal map-panel">
      <div className="map-grid">
        <MadinatyMap
          locations={locations}
          activeLocationId={activeLocationId}
          onSelect={(locationId) => setActiveLocationId(locationId)}
        />


        {activeLocation ? (
          <div className="map-details glass">
            <p className="overline">{content.map.subtitle}</p>
            <h3>{activeLocation.title}</h3>
            <p className="map-category">{activeLocation.category}</p>
            <p className="map-status">{activeLocation.status}</p>
            <p className="map-details-copy">{activeLocation.details}</p>
            {activeLocation.highlight ? <p className="map-highlight">{activeLocation.highlight}</p> : null}
            <div className="map-actions">
              {locations.map((location) => (
                <button
                  key={location.id}
                  type="button"
                  className={`map-pill ${location.id === activeLocation.id ? "active" : ""}`}
                  onClick={() => setActiveLocationId(location.id)}
                >
                  {location.title}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
