import React from "react";
import { Fab, useColorScheme } from "@mui/material";
import { styled } from "@mui/system";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import { yellow, grey } from "@mui/material/colors";

const AnimatedFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  backgroundColor: theme.palette.mode === "dark" ? grey[800] : yellow[500],
  color: theme.palette.mode === "dark" ? yellow[500] : grey[900],
  transition: "all 0.3s ease", // Smooth animation
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? grey[700] : yellow[400],
  },
}));

const ThemeSwitch: React.FC = () => {
  const { mode, setMode } = useColorScheme();

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <AnimatedFab onClick={toggleTheme} aria-label="theme switch" size="medium">
      {mode === "light" ? (
        <NightlightRoundedIcon fontSize="small" />
      ) : (
        <WbSunnyRoundedIcon fontSize="small" />
      )}
    </AnimatedFab>
  );
};

export default ThemeSwitch;
