// NavBar.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Paper, Box, Button, Typography } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";

// Import your nav components for submenus
import RefractionNav from "../refraction/RefractionNav";
import TransactionNav from "../transaction/TransactionNav";
import StockNav from "../stock/StockNav";
import SearchNav from "../search/SearchNav";
import AccountNav from "../account/AccountNav";
import ChannelNav from "../channel/ChannelNav";
import ReportsNav from "../reports/ReportsNav";
import MasterNav from "../master/MasterNav";
import UserNav from "../user/UserNav";
import LogsNav from "../user/LogsNav";
import CheckInNav from "../checkin/CheckInNav";

// Icons
import RefractionIcon from "../../assets/icons/navbar/Refraction.png";
import TransationIcon from "../../assets/icons/navbar/Transation.png";
import StockIcon from "../../assets/icons/navbar/Stock.png";
import SearchIcon from "../../assets/icons/navbar/Search.png";
import AccountIcon from "../../assets/icons/navbar/Account.png";
import ChanneltIcon from "../../assets/icons/navbar/Channel.png";
import ReportsIcon from "../../assets/icons/navbar/Reports.png";
import MasterIcon from "../../assets/icons/navbar/Master.png";
import UserIcon from "../../assets/icons/navbar/User.png";
import LogBookIcon from "../../assets/icons/navbar/logbook.webp";

import {
  deleteUserData,
  getUserAuth,
  getUserCurentBranch,
} from "../../utils/authDataConver";

// Tab panel utility (hidden by default)
function TabPanel({
  children,
  value,
  tabKey,
}: {
  children: React.ReactNode;
  value: string;
  tabKey: string;
}) {
  return value === tabKey ? <Box>{children}</Box> : null;
}

export default function NavBar() {
  // Tab configuration
  const tabs = [
    {
      key: "",
      label: "Refraction",
      path: "",
      icon: RefractionIcon,
      nav: RefractionNav,
    },
    {
      key: "transaction",
      label: "Transaction",
      path: "transaction/factory_order",
      icon: TransationIcon,
      nav: TransactionNav,
    },
    {
      key: "search",
      label: "Search",
      path: "search",
      icon: SearchIcon,
      nav: SearchNav,
    },
    {
      key: "checkin",
      label: "Check In",
      path: "checkin",
      icon: MasterIcon,
      nav: CheckInNav,
    },
    {
      key: "account",
      label: "Account",
      path: "account",
      icon: AccountIcon,
      nav: AccountNav,
    },
    {
      key: "stock",
      label: "Stock",
      path: "stock/add_frames",
      icon: StockIcon,
      nav: StockNav,
    },
    {
      key: "channel",
      label: "Channel",
      path: "channel",
      icon: ChanneltIcon,
      nav: ChannelNav,
    },
    {
      key: "reports",
      label: "Reports",
      path: "reports",
      icon: ReportsIcon,
      nav: ReportsNav,
    },
    {
      key: "master",
      label: "Master",
      path: "master",
      icon: MasterIcon,
      nav: MasterNav,
    },
    { key: "user", label: "User", path: "user", icon: UserIcon, nav: UserNav },
    {
      key: "logs",
      label: "Logs",
      path: "logs",
      icon: LogBookIcon,
      nav: LogsNav,
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  // Determine current tab from first segment
  const firstSegment = location.pathname.split("/")[1] || "";
  const tabValue = tabs.find((tab) => firstSegment === tab.key)?.key ?? "";

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    // newValue is the 'key' of the tab (a string)
    const tab = tabs.find((t) => t.key === newValue);
    if (tab) navigate(`/${tab.path}`);
  };

  const deleteCookie = () => {
    deleteUserData();
    navigate("/login");
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="icon label tabs example"
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              value={tab.key}
              icon={
                <img
                  src={tab.icon}
                  alt={tab.label}
                  style={{ width: 24, height: 24 }}
                />
              }
              label={tab.label}
              sx={{ textTransform: "capitalize" }}
            />
          ))}
        </Tabs>
        <Button onClick={deleteCookie}>
          <LogoutOutlined />
        </Button>
        <Box sx={{ mx: 1 }}>
          <Typography textTransform="capitalize" variant="body2">
            <strong>{getUserCurentBranch()?.branch_name} Branch</strong>
          </Typography>
          <Typography variant="body2">
            <strong>
              {getUserAuth()?.is_superuser ? "Admin" : "User"} login
            </strong>
          </Typography>
        </Box>
      </Box>

      {/* Tab panels for each section */}
      {tabs.map((tab) => (
        <TabPanel key={tab.key} value={tabValue} tabKey={tab.key}>
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
