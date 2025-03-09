
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Ensure that Leaflet's CSS is loaded (we'll also add this import in index.js)
// You can also import it here if you prefer: import 'leaflet/dist/leaflet.css';

function MapView({ geojsonData }) {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {geojsonData && <GeoJSON data={geojsonData} />}
    </MapContainer>
  );
}

export default MapView;
