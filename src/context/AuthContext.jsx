import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verityTokenRequet,
  getAllUsers,
  validarUsuarios,
} from "../api/auth";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);

  const signup = async (usuario) => {
    try {
      const res = await registerRequest(usuario);
      setUsuario(res);
      // setIsAuthenticated(true);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="src/assets/logo2.png"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Hola {usuario.nombre}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Tu solicitud fue enviada, en un par de dias reciviras un
                  correo electronico con tus datos para poder iniciar sesion.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Aceptar
            </button>
          </div>
        </div>
      ));
      // toast.success("Solicitud enviada con exito.");
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        error.response.data.forEach((error) => toast.error(error));
        setErrors(error.response.data);
      } else {
        toast.error(error.response.data);
        setErrors(error.response.data);
      }
    }
  };

  const signin = async (usuario) => {
    try {
      const res = await loginRequest(usuario);
      setUsuario(res);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        error.response.data.forEach((error) => toast.error(error));
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUsuario(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUsuario(null);
      }
      // console.log(cookies.token);

      try {
        const res = await verityTokenRequet(cookies.token);
        // console.log(res.data);//no tiene .data
        if (!res) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUsuario(res);
        setLoading(false);
      } catch (error) {
        // toast.error(error.response.data.message);
        // console.log(error.response.data.message);
        setIsAuthenticated(false);
        setUsuario(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  const getUsersPublic = async () => {
    const res = await getAllUsers();
    try {
      setUsuarios(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const validarUsers = async (userId, newStatus) => {
    try {
      const response = await validarUsuarios(userId, newStatus);
      setUsuarios(response.data); // Actualizar la lista de usuarios en el estado
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        usuario,
        usuarios,
        isAuthenticated,
        errors,
        getUsersPublic,
        validarUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
