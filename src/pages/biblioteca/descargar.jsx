import React from 'react';
import DescargarLibro from './descargarLibro';

const Descargar = () => {
  const url = 'http://bibliotecadigital.ilce.edu.mx/Colecciones/CuentosMas/GatoBotas.pdf';
  const nombreArchivo = 'El-gato-con-botas';

  return (
    <div className='btn btn-blue'>
      <DescargarLibro url={url} nombreArchivo={nombreArchivo} />
    </div>
  );
};

export default Descargar;
