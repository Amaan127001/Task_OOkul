
import React, { useState } from 'react';
import './App.css';
import MapView from './components/MapView';
import toGeoJSON from 'togeojson';
import { length } from '@turf/turf';

function App() {
  const [geojsonData, setGeojsonData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [details, setDetails] = useState(null);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const kmlText = e.target.result;
      // Parse the KML string into an XML document
      const parser = new DOMParser();
      const kmlDoc = parser.parseFromString(kmlText, 'text/xml');
      // Convert the KML to GeoJSON using togeojson
      const geojson = toGeoJSON.kml(kmlDoc);
      setGeojsonData(geojson);
      // Clear any previous analysis results
      setSummary(null);
      setDetails(null);
    };
    reader.readAsText(file);
  };

  // Function to compute summary counts of each element type
  const summarizeFeatures = (geojson) => {
    const counts = {};
    if (geojson && geojson.features) {
      geojson.features.forEach(feature => {
        const type = feature.geometry.type;
        counts[type] = (counts[type] || 0) + 1;
      });
    }
    return counts;
  };

  // Function to perform detailed analysis: compute length for line features
  const detailedAnalysis = (geojson) => {
    const detailsArr = [];
    if (geojson && geojson.features) {
      geojson.features.forEach(feature => {
        const geomType = feature.geometry.type;
        if (geomType === 'LineString' || geomType === 'MultiLineString') {
          // Turf.js length returns the distance (default is kilometers)
          const len = length(feature, { units: 'kilometers' });
          detailsArr.push({ type: geomType, length: len.toFixed(2) });
        }
      });
    }
    return detailsArr;
  };

  return (
    <div className="App">
      <h1>React KML Map Viewer</h1>
      <input type="file" accept=".kml" onChange={handleFileUpload} />
      <div className="buttons">
        <button onClick={() => setSummary(summarizeFeatures(geojsonData))}>Summary</button>
        <button onClick={() => setDetails(detailedAnalysis(geojsonData))}>Detailed</button>
      </div>

      {/* Display Summary Table */}
      {summary && (
        <div className="summary-table">
          <h2>Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Element Type</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary).map(([type, count]) => (
                <tr key={type}>
                  <td>{type}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Display Detailed Analysis Table */}
      {details && (
        <div className="detailed-table">
          <h2>Detailed Analysis</h2>
          <table>
            <thead>
              <tr>
                <th>Element Type</th>
                <th>Total Length (km)</th>
              </tr>
            </thead>
            <tbody>
              {details.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Render the Map Component */}
      <MapView geojsonData={geojsonData} />
    </div>
  );
}

export default App;
