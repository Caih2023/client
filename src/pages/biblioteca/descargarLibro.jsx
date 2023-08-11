import React from 'react';

const DescargarLibro = ({ url, nombreArchivo }) => {
  const descargarArchivo = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
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
