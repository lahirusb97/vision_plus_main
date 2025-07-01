// NavButton.tsx
import React from "react";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router";
import { teal, yellow } from "@mui/material/colors";

interface NavButtonProps {
  name: string;
  path: string;
  bgColor?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ name, path, bgColor }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  // Robust: active if exact or child route
  const isActive =
    location.pathname === path ||
    (location.pathname.startsWith(path + "/") &&
      // Ensure it's not a parent match if it's a child route
      path.split("/").length >= location.pathname.split("/").length);

  const MyButton = styled(Button)(() => ({
    backgroundColor: isActive
      ? theme.palette.mode === "dark"
        ? yellow[300]
        : "#FF7043"
      : bgColor || "white",
    color:
      isActive || bgColor
        ? theme.palette.mode === "dark"
          ? theme.palette.grey[900]
          : "white"
        : theme.palette.mode === "dark"
        ? teal[800]
        : "black",
    fontWeight: isActive ? "bold" : "normal",
    margin: "0 .5em",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[100] : teal[900],
      transition: "background-color 0.3s ease",
      color: theme.palette.mode === "dark" ? "black" : "white",
    },
  }));

  return (
    <MyButton variant="outlined" size="small" onClick={() => navigate(path)}>
      {name}
    </MyButton>
  );
};

export default NavButton;
