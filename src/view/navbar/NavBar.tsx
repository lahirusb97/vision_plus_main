import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
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
import { useAuthContext } from "../../context/AuthContext";
import ThemeSwitch from "../../components/ThemeSwitch";
import { colors } from "@mui/material";
import RefractionNav from "../refraction/RefractionNav";

// TabPanel Component

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* Remove Typography or change its component */}
          {children}
        </Box>
      )}
    </div>
  );
}

export default function NavBar() {
  const [value, setValue] = React.useState(0);

  // Handle Tab Change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Array of Icons and Labels (dynamically derived)
  const tabs = [
    { icon: RefractionIcon, label: "Refraction", nav: RefractionNav },
    { icon: TransationIcon, label: "Transaction", nav: RefractionNav },
    { icon: MasterIcon, label: "Master", nav: RefractionNav },
    { icon: AccountIcon, label: "Account", nav: RefractionNav },
    { icon: StockIcon, label: "Stock", nav: RefractionNav },
    { icon: ChanneltIcon, label: "Channel", nav: RefractionNav },
    { icon: ReportsIcon, label: "Reports", nav: RefractionNav },
    { icon: MessangerIcon, label: "Messenger", nav: RefractionNav },
    { icon: UserIcon, label: "User", nav: RefractionNav },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        variant="fullWidth"
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
        <ThemeSwitch />
      </Tabs>

      {/* Tab Panels */}
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.nav && <tab.nav />}
        </TabPanel>
      ))}
    </Box>
  );
}
