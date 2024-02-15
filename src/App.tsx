import "./App.css";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
// import "leaflet-defaulticon-compatibility";
import { LatLngExpression } from "leaflet";
import { Popup } from "react-leaflet";

const tileStr = "http://localhost:8080/tile/{z}/{x}/{y}.png";
const latLon = [12.9716, 77.5946];

function LocationMarker({
  pos,
  onMove,
}: {
  pos: LatLngExpression;
  onMove: React.Dispatch<React.SetStateAction<LatLngExpression>>;
}) {
  return (
    <Marker
      position={pos}
      draggable
      autoPan
      eventHandlers={{
        moveend: (event) => {
          onMove([event.target.getLatLng().lat, event.target.getLatLng().lng]);
        },
      }}
    >
      <Popup>
          Popup marker
        </Popup>
    </Marker>
  );
}

function LeafLetMap() {
  const [position, setPosition] = useState<number[]>(latLon); // Default value

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);
    });
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      <MapContainer
        center={position as LatLngExpression}
        zoom={13}
        style={{ width: "100vh", height: "80vh", position: "relative" }}
      >
        <TileLayer url={tileStr} />
        {position && <LocationMarker onMove={setPosition as React.Dispatch<React.SetStateAction<LatLngExpression>>} pos={position as LatLngExpression} />}
      </MapContainer>
      <div>
        <p>
          lat: {position[0]}
          <br />
          long:{position[1]}
        </p>
      </div>
    </div>
  );
}

export default LeafLetMap;
