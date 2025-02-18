import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PowerToFrameFilter from "../PowerToFrameFilter";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function DrawerStock({ open, toggleDrawer }) {
  const DrawerList = (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        flexDirection: "column",
        gap: 1,
        justifyContent: "center",
      }}
      role="presentation"
    >
      <IconButton onClick={toggleDrawer}>
        <Close />
      </IconButton>
      <PowerToFrameFilter />
    </Box>
  );

  return (
    <div>
      <Drawer
        hideBackdrop={true}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          style: { height: "50vh" }, // adjust the height to 50% of the viewport height
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
