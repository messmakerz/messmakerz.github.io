"use client";

import { useEffect, useRef } from "react";

interface MapBackgroundProps {
  lat: number;
  lng: number;
  zoom?: number;
}

export default function MapBackground({ lat, lng, zoom = 11 }: MapBackgroundProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || instanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current || instanceRef.current) return;

      // Fix default marker icon paths for Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        attributionControl: false,
      });

      // CartoDB Dark Matter — free, no API key
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19 }
      ).addTo(map);

      // Custom red pulsing marker
      const pulsingIcon = L.divIcon({
        className: "",
        html: `
          <div style="position:relative;width:16px;height:16px;">
            <div style="
              position:absolute;inset:0;border-radius:50%;
              background:var(--red,#c8293a);
              animation:mapPulse 2s ease-out infinite;
            "></div>
            <div style="
              position:absolute;inset:3px;border-radius:50%;
              background:var(--red,#c8293a);
            "></div>
          </div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      L.marker([lat, lng], { icon: pulsingIcon }).addTo(map);

      instanceRef.current = map;
    });

    return () => {
      if (instanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (instanceRef.current as any).remove();
        instanceRef.current = null;
      }
    };
  }, [lat, lng, zoom]);

  return (
    <>
      <style>{`
        @keyframes mapPulse {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        .leaflet-tile-pane { filter: brightness(0.55) saturate(0.7); }
      `}</style>
      <div ref={mapRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />
    </>
  );
}
