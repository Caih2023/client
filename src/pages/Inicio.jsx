import { ImgInicio, NoticiasN } from "./home";
import Navbar from "../components/Navbar";
import Footer from "../context/Footer";
function Inicio() {
  return (
    <div>
      <Navbar />
      <div className="p-14">
        <ImgInicio />
        <NoticiasN />
      </div>
      <Footer />
    </div>
  );
}

export default Inicio;
