import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// Import images for icons
import AccountIcon from "../../assets/icons/navbar/Account.png";
import ChanneltIcon from "../../assets/icons/navbar/Channel.png";
import MasterIcon from "../../assets/icons/navbar/Master.png";
import MessangerIcon from "../../assets/icons/navbar/Messenger.png";
import RefractionIcon from "../../assets/icons/navbar/Refraction.png";
import ReportsIcon from "../../assets/icons/navbar/Reports.png";
import StockIcon from "../../assets/icons/navbar/Stock.png";
import TransationIcon from "../../assets/icons/navbar/Transation.png";
import UserIcon from "../../assets/icons/navbar/User.png";
import RefractionNav from "../refraction/RefractionNav";
import { Paper } from "@mui/material";
import ChannelNav from "../channel/ChannelNav";

import TransactionNav from "../transaction/TransactionNav";

// TabPanel Component

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <Paper>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <>
            {/* Remove Typography or change its component */}
            {children}
          </>
        )}
      </div>
    </Paper>
  );
}

export default function NavBar() {
  const [value, setValue] = React.useState(0);

  // Handle Tab Change
  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  // Array of Icons and Labels (dynamically derived)
  const tabs = [
    { icon: RefractionIcon, label: "Refraction", nav: RefractionNav },
    { icon: TransationIcon, label: "Transaction", nav: TransactionNav },
    { icon: MasterIcon, label: "Master", nav: RefractionNav },
    { icon: AccountIcon, label: "Account", nav: RefractionNav },
    { icon: StockIcon, label: "Stock", nav: RefractionNav },
    { icon: ChanneltIcon, label: "Channel", nav: ChannelNav },
    { icon: ReportsIcon, label: "Reports", nav: RefractionNav },
    { icon: MessangerIcon, label: "Messenger", nav: RefractionNav },
    { icon: UserIcon, label: "User", nav: RefractionNav },
  ];

  return (
    <Paper sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        variant="scrollable"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            icon={
              <img
                src={tab.icon}
                alt={tab.label}
                style={{ width: 24, height: 24 }}
              />
            }
            label={tab.label}
            sx={{
              textTransform: "capitalize", // Capitalizes the first letter of each word
            }}
          />
        ))}
      </Tabs>

      {/* Tab Panels */}
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Paper
            elevation={4}
            sx={{ display: "flex", flexWrap: "wrap", gap: 1, py: 2 }}
          >
            {tab.nav && <tab.nav />}
          </Paper>
        </TabPanel>
      ))}
    </Paper>
  );
}
