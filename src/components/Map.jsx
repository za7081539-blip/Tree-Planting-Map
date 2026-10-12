"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import MapClickHandler from "./MapClickHandler";

// Planted Tree Marker (Green)
const treeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Selected Location Marker (Red / Temporary)
const selectedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = ({ trees, onMapClick, selectedLocation }) => {
  return (
    <MapContainer
      center={[24.8607, 67.0011]}
      zoom={12}
      className="h-[500px] w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Map Click Handler Component */}
      <MapClickHandler onMapClick={onMapClick} />

      {/* Temporary Red Marker on Map Click */}
      {selectedLocation && (
        <Marker
          position={[selectedLocation.lat, selectedLocation.lng]}
          icon={selectedIcon}
        >
          <Popup>Selected Location 📍</Popup>
        </Marker>
      )}

      {/* Saved Green Trees Markers */}
      {trees.map((tree) => (
        <Marker
          key={tree.id}
          position={[tree.lat, tree.lng]}
          icon={treeIcon}
        >
          <Popup>
            <div className="min-w-[180px]">
              <h3 className="text-lg font-bold text-green-700">
                🌳 {tree.treeName}
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                <strong>Planted by:</strong> {tree.userName}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Latitude:</strong> {tree.lat}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Longitude:</strong> {tree.lng}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Planted on: {tree.date}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;