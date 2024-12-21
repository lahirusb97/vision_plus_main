import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";

// Define props including the onClick function
interface NavButtonProps {
  name: string;
  path: string;
}

const NavButton: React.FC<NavButtonProps> = ({ name, path }) => {
  const theme = useTheme();
  const navigation = useNavigate();
  const currentPath = useLocation().pathname; // Get the current path

  const handleNavigation = () => {
    navigation(path); // Navigate to the specified path
  };

  // Adjust styles based on the current theme and active state
  const MyButton = styled(Button)(() => ({
    backgroundColor:
      currentPath === path
        ? theme.palette.mode === "dark"
          ? yellow[300]
          : yellow[700] // Highlight for active button
        : theme.palette.mode === "dark"
        ? yellow[100]
        : theme.palette.grey[900], // Default background color
    color:
      currentPath === path
        ? theme.palette.mode === "dark"
          ? theme.palette.grey[900]
          : "white"
        : theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : "white", // Text color
    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[100]
          : theme.palette.grey[800],
    },
    margin: "0 .5em",
    border: currentPath === path ? `2px solid ${yellow[700]}` : "none", // Add a border for active state
    fontWeight: currentPath === path ? "bold" : "normal", // Bold text for active state
    textTransform: "capitalize",
  }));

  return <MyButton onClick={handleNavigation}>{name}</MyButton>;
};

export default NavButton;
