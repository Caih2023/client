import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

function LeafletMap() {
  const center = [21.131448, -98.397686]; // Coordenadas del centro del mapa
  const apiUrl = 'http://localhost:4000/api/recorrido';

  const [markerData, setMarkerData] = useState([]);

  useEffect(() => {
    // Realizar solicitud HTTP para obtener los datos de la API
    async function fetchData() {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setMarkerData(data);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    }

    fetchData();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <MapContainer center={center} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markerData.map((marker) => (
        <Marker
          key={marker._id}
          position={marker.coordenadas.coordinates.reverse()} // Invertimos las coordenadas para Leaflet (latitud, longitud)
        >
          <Popup>
            <div>
              <h3>{marker.tituloPoint}</h3>
              <p>{marker.informacionH}</p>
              <div>
                {marker.galeria.map((imagen, index) => (
                  <img key={index} src={imagen} alt={`Imagen ${index}`} />
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default LeafletMap;
