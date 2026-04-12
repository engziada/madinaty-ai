"use client";

import { useMemo, useState } from "react";
import { getMapImageUrl } from "@/data/content";
import type { SiteContent } from "@/types/site";

interface MapPanelProps {
  content: SiteContent;
}

/**
 * Interactive map panel with selectable status nodes.
 */
export function MapPanel({ content }: MapPanelProps) {
  const locations = content.map.locations;
  const [activeLocationId, setActiveLocationId] = useState<string>(locations[0]?.id ?? "");

  const activeLocation = useMemo(() => {
    return locations.find((location) => location.id === activeLocationId) ?? locations[0];
  }, [activeLocationId, locations]);

  return (
    <div className="map reveal">
      <img src={getMapImageUrl()} alt={content.sections.mapTitle} />

      {locations.map((location) => {
        const isActive = location.id === activeLocation?.id;
        return (
          <button
            key={location.id}
            className={`map-dot ${location.dotClassName} ${isActive ? "active" : ""}`}
            type="button"
            aria-label={location.title}
            onClick={() => setActiveLocationId(location.id)}
          />
        );
      })}

      {activeLocation ? (
        <div className="map-info">
          <span className="map-info-dot" aria-hidden="true" />
          <div>
            <strong>{activeLocation.title}</strong>
            <p>{activeLocation.details}</p>
            <small>{content.map.subtitle}</small>
          </div>
        </div>
      ) : null}
    </div>
  );
}
