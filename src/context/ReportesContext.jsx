import { createContext, useContext, useState } from "react";
import { createreportesRequest } from "../api/reportes";
import toast from "react-hot-toast";

const ReportesContext = createContext();

export const useReportes = () => {
  const context = useContext(ReportesContext);

  if (!context) {
    throw new Error("las Reportes deben ser usadas dentro de Reportesprovider");
  }
  return context;
};

export const ReportesProvider = ({ children }) => {
  //   const [Reportes, setReportes] = useState([]);

  //   const getReportes = async () => {
  //     const res = await getReportesRequest();
  //     try {
  //       setReportes(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const createReporte = async (Reporte) => {
    //si el reporte se creo que envie un mensaje
    const res = await createreportesRequest(Reporte);
    try {
      toast.success("Reporte enviado con exito");
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        error.response.data.forEach((error) => toast.error(error));
      } else {
        toast.error(error.response.data.message);
      }
    }
    // console.log(res);
  };

  //   const deleteReporte = async (id) => {
  //     try {
  //       const res = await deleteReportesRequest(id);
  //       if (res.status === 204)
  //         setReportes(Reportes.filter((Reporte) => Reporte._id !== id));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const getReporte = async (id) => {
  //     try {
  //       const res = await getReporteRequest(id);
  //       return res.data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const updateReporte = async (id, Reporte) => {
  //     try {
  //       await updateReportesRequest(id, Reporte);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const getReportesPublicas = async () => {
  //     const res = await getReportesFull();
  //     try {
  //       setReportes(res.data);
  //     } catch (error) {}
  //   };

  return (
    <ReportesContext.Provider
      value={{
        // Reportes,
        // getReportes,
        createReporte,
        // deleteReporte,
        // getReporte,
        // updateReporte,
        // getReportesPublicas,
      }}
    >
      {children}
    </ReportesContext.Provider>
  );
};
