import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router";

// Define props including the onClick function
interface NavButtonProps {
  name: string;
  path: string; // onClick is optional
}

const MyButton = styled(Button)(() => ({
  backgroundColor: grey[900],
  color: "white",
  "&:hover": {
    backgroundColor: grey[800],
  },
  margin: "0 .5em",
}));

const NavButton: React.FC<NavButtonProps> = ({ name, path }) => {
  const navigation = useNavigate();
  const handleNavigation = () => {
    navigation(path); // or navigation.push(path)
  };
  return <MyButton onClick={handleNavigation}>{name}</MyButton>;
};

export default NavButton;
