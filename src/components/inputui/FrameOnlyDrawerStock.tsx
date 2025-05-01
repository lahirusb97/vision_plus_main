import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IconButton, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";

import PowerToFrameFilter from "../PowerToFrameFilter";

export default function DrawerStock() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const DrawerList = (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1300px",
        margin: "0 auto",
        flexDirection: "column",
        gap: 1,
        justifyContent: "center",
      }}
      role="presentation"
    >
      <IconButton onClick={handleClose}>
        <Close />
      </IconButton>
      <Box>
        <PowerToFrameFilter />
      </Box>
    </Box>
  );

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Open Frame Stock
      </Button>
      <Drawer
        hideBackdrop={true}
        anchor="bottom"
        open={isDrawerOpen}
        onClose={handleClose}
        PaperProps={{
          style: { height: "50vh" }, // adjust the height to 50% of the viewport height
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
