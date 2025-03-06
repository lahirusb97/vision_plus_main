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
import StockNav from "../stock/StockNav";
import { LogoutOutlined } from "@mui/icons-material";
import { useAuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router";
import UserNav from "../user/UserNav";

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
  const tabs = [
    {
      path: "refraction",
      icon: RefractionIcon,
      label: "Refraction",
      nav: RefractionNav,
    },
    {
      path: "transaction",
      icon: TransationIcon,
      label: "Transaction",
      nav: TransactionNav,
    },
    { path: "master", icon: MasterIcon, label: "Check In", nav: RefractionNav },
    {
      path: "account",
      icon: AccountIcon,
      label: "Account",
      nav: RefractionNav,
    },
    { path: "stock", icon: StockIcon, label: "Stock", nav: StockNav },
    { path: "channel", icon: ChanneltIcon, label: "Channel", nav: ChannelNav },
    {
      path: "reports",
      icon: ReportsIcon,
      label: "Reports",
      nav: RefractionNav,
    },
    {
      path: "messenger",
      icon: MessangerIcon,
      label: "Messenger",
      nav: RefractionNav,
    },
    { path: "user", icon: UserIcon, label: "User", nav: UserNav },
  ];

  const location = useLocation();
  const firstSegment = location.pathname.split("/")[1] || "home"; // Default to 'home' if empty
  const getTabIndexFromPath = (path: string) => {
    const index = tabs.findIndex((tab) => path.startsWith(tab.path));
    return index !== -1 ? index : 0; // Default to first tab if no match
  };

  const [value, setValue] = React.useState(getTabIndexFromPath(firstSegment));
  const { clearToken } = useAuthContext();

  // Handle Tab Change
  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  // Array of Icons and Labels (dynamically derived)

  const deleteCookie = () => {
    clearToken();
  };
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
        <Tab
          icon={<LogoutOutlined />}
          label={"LogOut"}
          onClick={deleteCookie}
          sx={{
            textTransform: "capitalize", // Capitalizes the first letter of each word
          }}
        />
      </Tabs>

      {/* Tab Panels */}
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Paper
            elevation={4}
            sx={{ display: "flex", flexWrap: "wrap", gap: 1, py: 1 }}
          >
            {tab.nav && <tab.nav />}
          </Paper>
        </TabPanel>
      ))}
    </Paper>
  );
}
