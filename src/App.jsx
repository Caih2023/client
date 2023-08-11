import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Register,
  Login,
  Noticia,
  TasksForm,
  Inicio,
  Profile,
  Noticias,
} from "./pages";
import Recorridos from "./pages/recorridos/Recorridos";
import VerMasRecorridos from "./pages/recorridos/VerMasRecorridos";
import AcercaDe from "./pages/acerca/AcercaDe";
import NoticiasMasInf from "./pages/noticias/NoticiasMasInf";
import Biblioteca from "./pages/biblioteca/biblioteca";
import MapsReportes from "./pages/reportes/MapReportes";
import FromNoticias from "./pages/noticias/fromNoticias";

// DASHBOARD
import DefaultLayout from "./pages/dashboard/layout/DefaultLayout";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { NoticiasProvider } from "./context/NoticiasContext";
import Navbar from "./components/Navbar";
import Footer from "./context/footer";

function App() {
  return (
    <AuthProvider>
      <NoticiasProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route
              path="/noticias-mas-inf/:id"
              element={<NoticiasMasInf />}
            />

            <Route path="/recorridos" element={<Recorridos />} />
            <Route
              path="/ver-mas-recorridos/:id"
              element={<VerMasRecorridos />}
            />
            <Route path="/acerca" element={<AcercaDe />} />
            <Route path="/biblioteca-virtual" element={<Biblioteca />} />
            
            {/* DASHBOARD */}
            <Route path="/dashboard" element={<DefaultLayout/>}/>

        <Route path="/reportes-ciudadanos" element={<MapsReportes/>} />

            <Route element={<ProtectedRoute />}>
              <Route path="/Noticia" element={<Noticia />} />
              <Route path="/add-task" element={<TasksForm />} />
              <Route path="/tasks/:id" element={<TasksForm />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </NoticiasProvider>
    </AuthProvider>
  );
}
export default App;
