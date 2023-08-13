import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { createRoot } from "react-dom/client";
import ImagenesRecorridos from "../slider/imagenes";

const textLongitude = 236;

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substr(0, maxLength);
}

export default function Recorridos() {
  const [reportes, setReportes] = useState([]);
  const [selectedReporte, setSelectedReporte] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/reportes");
        const data = response.data;

        setReportes(data);

        const newMap = L.map("mi_map").setView(
          [
            data[0].coordenadas.coordinates[0],
            data[0].coordenadas.coordinates[1],
          ],
          15
        );
        setMap(newMap);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(newMap);

        data.forEach((markerData) => {
          const [lat, lng] = markerData.coordenadas.coordinates;

          const popupContent = `
            <div class="w-200">
              <h3 class="text-lg font-bold mb-2 uppercase text-center">${
                markerData.titulo
              }</h3>
              <div class="carousel flex flex-no-wrap overflow-x-auto -mx-2">
                <div id="carousel-${markerData.id}"></div>
              </div>
              <p class="text-gray-900 text-sm text-justify pr-2 py-2 overflow-hidden">
                ${
                  markerData.descripcion.length > textLongitude
                    ? truncateText(markerData.descripcion, textLongitude) +
                      "..."
                    : markerData.descripcion
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

          const marker = L.marker([lat, lng]).addTo(newMap);

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
              galeria={markerData.imagen}
              tamañoImagen={190}
            />
          );

          marker.bindPopup(popupContainer);

          // Al hacer clic en un marcador, establece el reporte seleccionado
          marker.on("click", () => {
            setSelectedReporte(markerData);
          });
        });
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Al seleccionar un reporte, abre el popup correspondiente
    if (selectedReporte && map) {
      reportes.forEach((markerData) => {
        if (markerData._id === selectedReporte._id) {
          const marker = markerData._leaflet_marker;
          if (marker) {
            marker.openPopup();
          }
        }
      });
    }
  }, [selectedReporte]);

  return (
    <div className="flex">
      {/* Mapa */}
      <div className="w-full h-screen z-0" id="mi_map"></div>

      {/* Lista de Reportes */}
      <div className="w-1/4 p-4 ">
        <h2 className="text-lg font-bold mb-4">Lista de Reportes</h2>
        {reportes.map((reporte) => (
          <a
            key={reporte._id}
            className={`rounded-sm grid grid-cols-2 bg-white p-3 m-1 gap-4  hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform ${
              selectedReporte && selectedReporte._id === reporte._id
                ? "bg-blue-100"
                : ""
            }`}
            href="#"
            onClick={() => setSelectedReporte(reporte)}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                stroke="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "40px", height: "40px" }}
              >
                <path d="M12 2C7.5 2 4 5.5 4 10c0 5 8 12 8 12s8-7 8-12c0-4.5-3.5-8-8-8z" />
              </svg>
            </div>
            <div className="col-span-11 xl:-ml-5">
              <p className="text-blue-600 font-semibold">{reporte.titulo}</p>
            </div>
            <div className="md:col-start-2 col-span-11 xl:-ml-5">
              <p className="text-sm text-gray-800 font-light">
                {reporte.descripcion.length > textLongitude
                  ? truncateText(reporte.descripcion, textLongitude) + "..."
                  : reporte.descripcion}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
