import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    // Verifica si el colorMode es "dark" y configura la clase CSS correspondiente
    if (colorMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
