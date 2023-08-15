import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RecorridosForm from "./RecorridosForm";
import { Toaster } from "react-hot-toast";

export default function MapsRecorridos() {
  const [mapInitialized, setMapInitialized] = useState(false);
  const [selectedLatLng, setSelectedLatLng] = useState(null);
  const [formHeight, setFormHeight] = useState("125vh"); // Altura inicial
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapInitialized) {
      fetchData();
      setMapInitialized(true);
    }
  }, [mapInitialized]);

  useEffect(() => {
    // Agregar 40vh adicionales en dispositivos pequeños (menos de 768px de ancho)
    if (window.innerWidth < 768) {
      setFormHeight(`calc(125vh + 40vh)`);
    }
  }, []);

  const fetchData = async () => {
    try {
      const map = L.map("mi_map").setView([21.1437, -98.4181], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      // Guardar referencia del mapa en el useRef
      mapRef.current = map;

      // Evento click en el mapa
      map.on("click", handleMapClick);

      // Obtener la ubicación actual del usuario
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Centrar el mapa en la ubicación del usuario
            map.setView([latitude, longitude], 15);

            // Agregar marcador (punto rojo) en la ubicación del usuario
            const redIcon = L.icon({
              iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
              iconSize: [28, 46],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            });

            const marker = L.marker([latitude, longitude], {
              icon: redIcon,
            }).addTo(map);
            markerRef.current = marker;
          },
          (error) => {
            console.error("Error al obtener la ubicación:", error);
            // Aquí puedes mostrar un mensaje de error o dejar la ubicación predeterminada
          }
        );

      } else {
        console.error("Geolocalización no disponible");
        // Aquí puedes mostrar un mensaje de error o dejar la ubicación predeterminada
      }
    } catch (error) {
      console.error("Error al obtener los datos de la API:", error);
    }
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setSelectedLatLng({ lat, lng });

    if (markerRef.current) {
      mapRef.current.removeLayer(markerRef.current);
    }

    // Agregar marcador (punto rojo) en el lugar seleccionado
    const redIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      iconSize: [28, 46],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    const marker = L.marker([lat, lng], { icon: redIcon }).addTo(
      mapRef.current
    );
    markerRef.current = marker;
  };

  return (
    <div className="relative" style={{ height: formHeight }}>
      <div className="w-full h-full absolute top-0 left-0 z-0" id="mi_map"></div>
      <div className="absolute top-0 right-0 z-10">
        <RecorridosForm
          latLng={selectedLatLng}
          onFormHeightChange={setFormHeight}
        />
        <Toaster />
      </div>
    </div>
  );
}
