import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ThemeProvider, CssBaseline, PaletteMode } from "@mui/material";
import getTheme from "../theme/theme";
import { lightTheme } from "../theme/liteTheme";
import { darkTheme } from "../theme/darkTheme";

interface ThemeContextType {
  mode: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";

    if (savedTheme) {
      setMode(savedTheme);
    }
  }, []);
  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
    localStorage.setItem("theme", mode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
