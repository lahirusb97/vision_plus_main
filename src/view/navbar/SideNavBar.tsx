import React, { useState, useRef } from "react";
import { navBarArray } from "./navItemsArrray";
import { Box, Button, IconButton, Typography } from "@mui/material";
import CustomPopover from "./CustomPopover";
import { useLocation, useNavigate } from "react-router";
import theme from "../../theme/theme";
import { setNavbarState } from "./navstate";
import { BuildTwoTone } from "@mui/icons-material";
import { getUserCurentBranch } from "../../utils/authDataConver";

export default function SideNavBar() {
  //get curent pahth
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When mouse enters button
  const handleButtonEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredIndex(idx);
    setAnchorRect(rect);
  };

  // When mouse leaves button
  const handleButtonLeave = () => {
    closeTimer.current = setTimeout(() => {
      setHoveredIndex(null);
      setAnchorRect(null);
    }, 150); // Delay to allow entering popover
  };

  // When mouse enters popover
  const handlePopoverEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  // When mouse leaves popover
  const handlePopoverLeave = () => {
    closeTimer.current = setTimeout(() => {
      setHoveredIndex(null);
      setAnchorRect(null);
    }, 150);
  };
  const findCurentRoute = (itemPath: string) => {
    // Split into segments and check
    const segments = currentPath.split("/").filter(Boolean); // ['transaction', 'factory_order']
    const match = segments.includes(itemPath); // true
    return match; // true
  };
  const curentBranch = getUserCurentBranch();
  console.log(curentBranch);
  return (
    <Box sx={{ height: "100vh", width: "70px" }}>
      {navBarArray.map((item, idx) => (
        <Box
          key={item.label}
          onMouseEnter={(e) => handleButtonEnter(e, idx)}
          onMouseLeave={handleButtonLeave}
        >
          <Button
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              my: 0,
              p: 0,
              minWidth: 0,
              width: "100%",
              backgroundColor: findCurentRoute(item.key)
                ? theme.palette.primary.main // Use theme color
                : theme.palette.background.paper,
              color: findCurentRoute(item.key)
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
              "&:hover": {
                backgroundColor: findCurentRoute(item.key)
                  ? theme.palette.primary.dark
                  : theme.palette.action.hover,
              },
            }}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <Typography variant="caption">{item.label}</Typography>
          </Button>
        </Box>
      ))}

      <CustomPopover
        open={hoveredIndex !== null && !!anchorRect}
        anchorRect={anchorRect}
        onClose={() => {
          setHoveredIndex(null);
          setAnchorRect(null);
        }}
        offsetX={-10}
        onMouseEnter={handlePopoverEnter}
        onMouseLeave={handlePopoverLeave}
      >
        {hoveredIndex !== null && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {hoveredIndex !== null &&
              // Dynamically render the correct submenu component for the hovered nav
              React.createElement(navBarArray[hoveredIndex].nav)}
          </Box>
        )}
      </CustomPopover>

      <IconButton onClick={setNavbarState}>
        <BuildTwoTone />
      </IconButton>
    </Box>
  );
}
