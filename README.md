# React KML Map Viewer

## Overview

**React KML Map Viewer** is a lightweight web application built with React that allows you to parse and visualize KML (Keyhole Markup Language) files. This tool lets users upload a KML file, view its geographic features on an interactive map, and perform both summary and detailed analyses of the data.

## Features

- **KML File Upload:** Easily upload and parse KML files.
- **Map Integration:** Visualize geographic features on an interactive map using Leaflet with OpenStreetMap tiles.
- **Summary Analysis:** Display a table counting the types of KML elements (e.g., Points, LineStrings).
- **Detailed Analysis:** Calculate and show the total length (in kilometers) of line features using Turf.js.
- **User-Friendly Interface:** Clean and simple UI for quick insights.

## Technologies Used

- **React:** For building the user interface.
- **Leaflet & React-Leaflet:** For interactive maps.
- **togeojson:** To convert KML files to GeoJSON.
- **Turf.js:** For geospatial analysis and length calculations.
- **OpenStreetMap:** For free map tiles.

## Installation & Running

Follow these steps to set up and run the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/react-kml-map.git
   cd react-kml-map

2. **Install Dependencies Ensure you have Node.js and npm installed, then run:**
    npm install

3. **Run the Application Start the development server with:**
    npm start

4. **Build for Production (Optional) To create a production build, run:**
    npm run build

## Acknowledgements

* React
* Leaflet
* React-Leaflet
* togeojson
* Turf.js
* OpenStreetMap

