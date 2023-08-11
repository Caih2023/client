import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { createRoot } from "react-dom/client";
import Navbar from "../../components/Navbar";
import Footer from "../../context/Footer";

import ImagenesRecorridos from "../slider/imagenes";

const textLongitude = 236;

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substr(0, maxLength);
}

export default function Recorridos() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/recorrido");
        const data = response.data;

        const map = L.map("mi_map").setView(
          [
            data[0].coordenadas.coordinates[0], //98
            data[0].coordenadas.coordinates[1], //21
          ],
          15
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(map);

        data.forEach((markerData) => {
          const [lat, lng] = markerData.coordenadas.coordinates;

          const popupContent = `
            <div class="w-200">
              <h3 class="text-lg font-bold mb-2 uppercase text-center">${
                markerData.tituloPoint
              }</h3>
              <div class="carousel flex flex-no-wrap overflow-x-auto -mx-2">
                <div id="carousel-${markerData.id}"></div>
              </div>
              <p class="text-gray-900 text-sm text-justify pr-2 py-2 overflow-hidden">
                ${
                  markerData.informacionH.length > textLongitude
                    ? truncateText(markerData.informacionH, textLongitude) +
                      "..."
                    : markerData.informacionH
                }
              </p>
              <div class="absolute -bottom-custom2 right-9">
                <div class="text-blue-700 hover:underline" id="link-${
                  markerData.id
                }">
                  <!-- El componente Link se renderizará aquí -->
                </div>
              </div>
            </div>
          `;

          const marker = L.marker([lat, lng]).addTo(map);

          const popupContainer = document.createElement("div");
          popupContainer.innerHTML = popupContent;

          createRoot(
            popupContainer.querySelector(`#link-${markerData.id}`)
          ).render(
            <a href={`/ver-mas-recorridos/${markerData._id}`}>Ver más</a>
          );

          createRoot(
            popupContainer.querySelector(`#carousel-${markerData.id}`)
          ).render(
            <ImagenesRecorridos
              galeria={markerData.galeria}
              tamañoImagen={190}
            />
          );

          marker.bindPopup(popupContainer);
        });
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-full h-screen" id="mi_map"></div>
      <Footer />
    </div>
  );
}
