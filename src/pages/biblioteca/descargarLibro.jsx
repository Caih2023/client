import React from 'react';

const DescargarLibro = ({ url, nombreArchivo }) => {
  const descargarArchivo = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    link.target = '_blank'; // Agregar el atributo target para abrir en una nueva ventana
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={descargarArchivo} className='btn btn-blue my-1'>
      Descargar libro
    </button>
  );
};

export default DescargarLibro;
