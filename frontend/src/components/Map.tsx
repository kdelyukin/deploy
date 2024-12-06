import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Destination } from "@/scripts/Destination";

// Fix for marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapProps {
  Destinations: Destination[];
  height?: string;
  width?: string;
}

const Map = ({ Destinations, height = "500px", width = "100%" }: MapProps) => {
  const Markers = () => {
    const map = useMap();

    useEffect(() => {
      // Clear existing markers
      map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Add new markers
      const markers = Destinations.map(({ Latitude, Longitude, Destination }) => {
        if (Latitude && Longitude) {
          const marker = L.marker([Latitude, Longitude]).addTo(map);
          marker.bindPopup(`<b>${Destination}</b>`);
          return marker;
        }
        return null;
      }).filter(Boolean); // Remove null markers

      // Fit map to markers if available
      if (markers.length > 0) {
        const group = L.featureGroup(markers as L.Marker[]);
        map.fitBounds(group.getBounds());
      } else {
        map.setView([43.0096, -81.2737], 5); // Default view
      }
    }, [Destinations, map]);

    return null;
  };

  return (
    <MapContainer
      center={[43.0096, -81.2737]}
      zoom={5}
      style={{ height: height, width: width, borderRadius: "15px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers />
    </MapContainer>
  );
};

export default Map;
