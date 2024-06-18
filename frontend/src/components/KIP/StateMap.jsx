// src/StateMap.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const StateMap = ({ stateName }) => {
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?state=${stateName}&country=India&format=json&polygon_geojson=1`
        );
        if (response.data && response.data.length > 0) {
          const { geojson } = response.data[0];
          const coordinates = geojson.coordinates[0].map((coord) => [
            coord[1],
            coord[0],
          ]);
          setBounds(coordinates);
        } else {
          setBounds(null);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setBounds(null);
      }
    };

    fetchCoordinates();
  }, [stateName]);

  return (
    <div className="w-full h-full relative border-2 border-gray-400 rounded">
      {bounds ? (
        <MapContainer
          bounds={bounds}
          // style={{ height: "200px", width: "400px" }}
          className="h-full w-full md:h-[40vh] md:w-full lg:h-[40vh] lg:w-[400px]"
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          boxZoom={false}
          keyboard={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution=""
            className="w-[200px]"
          />
          <CustomPolygon bounds={bounds} />
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

const CustomPolygon = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    const polygon = window.L.polygon(bounds, { color: "blue" }).addTo(map);
    map.fitBounds(polygon.getBounds());

    // Remove map labels by hiding layers
    map.eachLayer((layer) => {
      if (layer.options.attribution) {
        layer.remove();
      }
    });

    return () => {
      map.removeLayer(polygon);
    };
  }, [bounds, map]);

  return null;
};

export default StateMap;
