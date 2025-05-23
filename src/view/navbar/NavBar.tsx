import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// Import images for icons
import AccountIcon from "../../assets/icons/navbar/Account.png";
import ChanneltIcon from "../../assets/icons/navbar/Channel.png";
import MasterIcon from "../../assets/icons/navbar/Master.png";
// import MessangerIcon from "../../assets/icons/navbar/Messenger.png";
import RefractionIcon from "../../assets/icons/navbar/Refraction.png";
import ReportsIcon from "../../assets/icons/navbar/Reports.png";
import Search from "../../assets/icons/navbar/Search.png";
import StockIcon from "../../assets/icons/navbar/Stock.png";
import TransationIcon from "../../assets/icons/navbar/Transation.png";
import UserIcon from "../../assets/icons/navbar/User.png";
import LogBookIcon from "../../assets/icons/navbar/logbook.webp";

import RefractionNav from "../refraction/RefractionNav";
import { Box, Button, Paper, Typography } from "@mui/material";
import ChannelNav from "../channel/ChannelNav";
import TransactionNav from "../transaction/TransactionNav";
import StockNav from "../stock/StockNav";
import { LogoutOutlined } from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router";
import UserNav from "../user/UserNav";
import CheckInNav from "../checkin/CheckInNav";
import SearchNav from "../search/SearchNav";
import AccountNav from "../account/AccountNav";
import LogsNav from "../user/LogsNav";
import MasterNav from "../master/MasterNav";
import {
  deleteUserData,
  getUserAuth,
  getUserCurentBranch,
} from "../../utils/authDataConver";
import ReportsNav from "../reports/ReportsNav";
import TabPanel from "./TabPanel";

// TabPanel Component

export default function NavBar() {
  const tabs = [
    {
      id: 0,
      path: "",
      icon: RefractionIcon,
      label: "Refraction",
      nav: RefractionNav,
    },
    {
      id: 1,
      path: "transaction/factory_order",
      icon: TransationIcon,
      label: "Transaction",
      nav: TransactionNav,
    },
    {
      id: 2,
      path: "search",
      icon: Search,
      label: "Search ",
      nav: SearchNav,
    },
    {
      id: 2,
      path: "checkin",
      icon: MasterIcon,
      label: "Check In",
      nav: CheckInNav,
    },
    {
      id: 3,
      path: "account",
      icon: AccountIcon,
      label: "Account",
      nav: AccountNav,
    },
    {
      id: 4,
      path: "stock/add_frames",
      icon: StockIcon,
      label: "Stock",
      nav: StockNav,
    },
    {
      id: 5,
      path: "channel",
      icon: ChanneltIcon,
      label: "Channel",
      nav: ChannelNav,
    },
    {
      id: 6,
      path: "reports",
      icon: ReportsIcon,
      label: "Reports",
      nav: ReportsNav,
    },
    {
      id: 7,
      path: "master",
      icon: MasterIcon,
      label: "Master",
      nav: MasterNav,
    },
    { id: 8, path: "user", icon: UserIcon, label: "User", nav: UserNav },
    { id: 9, path: "logs", icon: LogBookIcon, label: "Logs", nav: LogsNav },
  ];

  const location = useLocation();
  const firstSegment = location.pathname.split("/")[1] || "home"; // Default to 'home' if empty

  const matchedTab = tabs.find((tab) => {
    const tabSegment = tab.path.split("/")[0];
    return tabSegment === firstSegment;
  });

  const [value, setValue] = React.useState(matchedTab?.id || 0);

  const navigate = useNavigate();
  // Handle Tab Change
  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
    navigate(`/${tabs[newValue].path}`);
  };

  // Array of Icons and Labels (dynamically derived)

  const deleteCookie = () => {
    deleteUserData();
    navigate("/login");
  };
  return (
    <Paper sx={{ width: "100%" }}>
      {/* Wrap Tabs and Logout Button/User Info in a flex container */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              icon={
                <img
                  src={tab.icon}
                  alt={tab.label}
                  style={{ width: 24, height: 24 }}
                />
              }
              label={tab.label}
              sx={{
                textTransform: "capitalize",
              }}
            />
          ))}
        </Tabs>

        {/* Moved Logout Button and User Info outside Tabs */}
        <Button onClick={deleteCookie}>
          <LogoutOutlined />
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mx: 1,
          }}
        >
          <Typography textTransform={"capitalize"} variant="body2">
            <strong>{getUserCurentBranch()?.branch_name} Branch</strong>
          </Typography>
          <Typography variant="body2">
            <strong>
              {getUserAuth()?.is_superuser ? "Admin" : "User"} login
            </strong>
          </Typography>
        </Box>
      </Box>

      {/* Tab Panels (remain unchanged) */}
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
