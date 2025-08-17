import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RefractionNumber from "./RefractionNumber";
import ExistingCustomerRefractionNumber from "./ExistingCustomerRefractionNumber";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`refraction-tabpanel-${index}`}
      aria-labelledby={`refraction-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `refraction-tab-${index}`,
    "aria-controls": `refraction-tabpanel-${index}`,
  };
}

export default function RefractionNumberTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="refraction tabs"
          variant="fullWidth"
        >
          <Tab label="New Customer" {...a11yProps(0)} />
          <Tab label="Existing Customer" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RefractionNumber />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ExistingCustomerRefractionNumber />
      </CustomTabPanel>
    </Box>
  );
}
