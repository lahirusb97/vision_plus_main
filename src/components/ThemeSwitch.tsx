import React from "react";
import { Switch, IconButton, Typography } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";

const ThemeSwitch: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Switch
        size="small"
        checked={mode === "dark"}
        onChange={toggleTheme}
        inputProps={{ "aria-label": "theme switch" }}
      />
      <IconButton size="small" onClick={toggleTheme}>
        {mode === "light" ? "☀️" : "🌙"}
      </IconButton>
    </div>
  );
};

export default ThemeSwitch;
