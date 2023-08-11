import React, { useEffect, useState } from 'react';
import { Document, Page } from 'pdfjs-dist';

const Portada = ({ url, nomLibro }) => {
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    const extraerPrimeraPagina = async () => {
      try {
        const documento = await Document.load(url);
        const pagina = await documento.getPage(1);
        const escala = 1.5;
        const viewport = pagina.getViewport({ scale: escala });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await pagina.render({ canvasContext: context, viewport }).promise;
        const imagenURL = canvas.toDataURL('image/png');
        setImagen(imagenURL);
      } catch (error) {
        console.error('Error al extraer la primera página del PDF:', error);
      }
    };

    extraerPrimeraPagina();
  }, [url]);

  return (
    <div>
      {imagen && <img src={imagen} alt={nomLibro} />}
    </div>
  );
};

export default Portada;
