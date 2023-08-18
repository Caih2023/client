import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imagen from "../assets/acerca.jpg";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../context/Footer";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      // if (usuario.roles[0] === "admin" && isAuthenticated) {
      //   navigate("/dashboard");
      // } else {
      navigate("/mis-noticias");
      // }
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Navbar />
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${imagen})`,
        }}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img src="src/assets/logo2.png" width={100} alt="" srcSet="" />
              <h1 className="mb-2 text-2xl">Iniciar sesión</h1>
              <span className="text-gray-300">
                Ingrese los detalles de inicio de sesión
              </span>
            </div>
            <form onSubmit={onSubmit}>
              <div className="mb-4 text-lg">
                <div className="form-control">
                  <input
                    className="input input-alt text-center"
                    placeholder="ejemplo@email.com"
                    {...register("correo")}
                    type="email"
                    required
                  />

                  <span className="input-border input-border-alt" />
                </div>
              </div>
              <div className="mb-4 text-lg">
                <div className="form-control">
                  <input
                    className="input input-alt text-center"
                    placeholder="********"
                    type="password"
                    {...register("contraseña")}
                    required
                  />
                  <span className="input-border input-border-alt" />
                </div>
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <div className="login-box">
                  <center>
                    <a>
                      <button type="submit">Iniciar sesion</button>
                      <span />
                    </a>
                  </center>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster reverseOrder={true} />
      <Footer />
    </div>
  );
}

export default Login;
