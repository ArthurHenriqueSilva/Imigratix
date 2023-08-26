import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import * as L from "leaflet";
import * as d3 from "d3";
import "leaflet/dist/leaflet.css";

function HeatmapMap() {
  const mapRef = useRef();
  const [mapGenerated, setMapGenerated] = useState(false);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    const testData = {
      SP: 500,
      RJ: 300,
      SE: 150,
      AL: 50,
    };

    if (mapRef.current && mapGenerated) {
      const map = mapRef.current.leafletElement;

      const colorScale = d3
        .scaleSequential(d3.interpolateOranges)
        .domain([0, d3.max(Object.values(testData))]);

      const statesGeoJSON = {}; // Defina os limites dos estados do Brasil em um objeto GeoJSON

      const geoJsonLayer = L.geoJSON(statesGeoJSON, {
        style: (feature) => ({
          fillColor: colorScale(testData[feature.properties.sigla] || 0),
          fillOpacity: 0.7,
          stroke: true,
          color: "white",
          weight: 2,
        }),
      }).addTo(map);

      geoJsonLayer.eachLayer((layer) => {
        layer.on("click", (e) => {
          const clickedState = e.target.feature.properties.sigla;
          setSelectedState(clickedState);
        });
      });
    }
  }, [mapGenerated]);

  const generateMap = () => {
    setMapGenerated(true);
  };

  return (
    <div>
      <h2>Mapeamento de uso da Aplicação</h2>
      <MapContainer
        center={[-15.7801, -47.9292]}
        zoom={4}
        ref={mapRef}
        style={{ height: "400px", marginBottom: "15px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>

      <button className="gerarGrafico" onClick={generateMap}>
        Gerar Mapa de Calor
      </button>
      {selectedState && <p>Estado selecionado: {selectedState}</p>}
    </div>
  );
}

export default HeatmapMap;
