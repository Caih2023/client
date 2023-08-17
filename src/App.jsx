import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Register,
  Login,
  Noticia,
  NoticiasForm,
  Inicio,
  Profile,
  NoticiasPublicas,
  Error404,
  Dashboard,
} from "./pages";
import Recorridos from "./pages/recorridos/Recorridos";
import MapsRecorridos from "./pages/recorridos/MapsRecorridos";
import VerMasRecorridos from "./pages/recorridos/VerMasRecorridos";
import AcercaDe from "./pages/acerca/AcercaDe";
import NoticiasMasInf from "./pages/noticias/NoticiasMasInf";
import { AuthProvider } from "./context/AuthContext";
import { BibliotecasProvider } from "./context/bibliotecaContext";
import ProtectedRoute from "./ProtectedRoute";
import { NoticiasProvider } from "./context/NoticiasContext";
// import Navbar from "./components/Navbar";
// import Footer from "./context/footer";
import MapsReportes from "./pages/reportes/MapReportes";
import { ReportesProvider } from "./context/ReportesContext";
import { RecorridosProvider } from "./context/RecorridosContext";
import ReportesMaps from "./pages/reportes/ReportesMaps";
import Prueba from "./pages/recorridos/pruebademapa";
import DefaultLayout from "./pages/dashboard/layout/DefaultLayout";
import ValidarUsuarios from "./pages/admin/validarUsuarios";
import UsuarioMasInf from "./pages/admin/UsuarioMasInf";
import Biblioteca from "./pages/biblioteca/biblioteca";
import BibliotecaForm from "./pages/biblioteca/BibliotecaForm";

function App() {
  return (
    <BibliotecasProvider>
      <AuthProvider>
        <NoticiasProvider>
          <ReportesProvider>
            <BrowserRouter>
              <RecorridosProvider>
                <Routes>
                  <Route path="/dashboard/*" element={<Dashboard />}>
                    {/* Rutas anidadas bajo Dashboard */}
                    <Route
                      path="agregar-recorrido"
                      element={<MapsRecorridos />}
                    />
                    <Route
                      path="reportes-ciudadanos"
                      element={<ReportesMaps />}
                    />
                    <Route
                      path="validacionusuarios"
                      element={<ValidarUsuarios />}
                    />
                    <Route path="usuario/:id" element={<UsuarioMasInf />} />
                  </Route>
                  <Route
                    path="/dashboard"
                    element={<Navigate to="/dashboard/agregar-recorrido" />}
                  />
                  <Route
                    path="/dashboard"
                    element={<Navigate to="/dashboard/validacionusuarios" />}
                  />
                  <Route
                    path="/dashboard"
                    element={<Navigate to="/dashboard/reportes-ciudadanos" />}
                  />
                  <Route
                    path="/dashboard"
                    element={<Navigate to="/dashboard/usuario/:id" />}
                  />

                  {/* DASBOARD DE PRUEBA */}
                  <Route path="/dashprueba" element={<DefaultLayout />} />

                  <Route path="/" element={<Inicio />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/noticias" element={<NoticiasPublicas />} />
                  <Route
                    path="/noticias-mas-inf/:id"
                    element={<NoticiasMasInf />}
                  />
                  <Route path="/biblioteca-virtual" element={<Biblioteca />} />
                  <Route path="/bibliotecaform" element={<BibliotecaForm />} />
                  <Route path="/reporte" element={<MapsReportes />} />
                  <Route path="/recorridos" element={<Recorridos />} />
                  <Route
                    path="/ver-mas-recorridos/:id"
                    element={<VerMasRecorridos />}
                  />
                  <Route path="/acerca" element={<AcercaDe />} />
                  <Route path="/prueba" element={<Prueba />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/mis-noticias" element={<Noticia />} />
                    <Route path="/agregar-noticia" element={<NoticiasForm />} />
                    <Route path="/mi-noticia/:id" element={<NoticiasForm />} />
                    <Route path="/perfil" element={<Profile />} />
                    <Route
                      path="/reportes-ciudadanos"
                      element={<ReportesMaps />}
                    />
                  </Route>
                  <Route path="*" element={<Error404 />} />
                </Routes>
              </RecorridosProvider>
            </BrowserRouter>
          </ReportesProvider>
        </NoticiasProvider>
      </AuthProvider>
    </BibliotecasProvider>
  );
}
export default App;
