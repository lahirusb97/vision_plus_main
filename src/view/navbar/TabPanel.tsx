import React from "react";
import { Paper } from "@mui/material";

const TabPanel: React.FC<{
  children?: React.ReactNode;
  index: number;
  value: number;
}> = ({ children, value, index }) => (
  <Paper>
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  </Paper>
);

export default TabPanel;
