import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router";

interface NavigationTabProps {
  tabsList: { label: string; path: string }[];
}
export default function NavigationTab({ tabsList }: NavigationTabProps) {
  const { pathname } = useLocation();

  // Find the current tab based on the current path
  const currentTab =
    tabsList.find(
      (tab) => pathname === tab.path || pathname.endsWith(`${tab.path}/`)
    )?.path || tabsList[0].path;

  return (
    <Box sx={{ mb: 1, display: "flex" }}>
      <Tabs
        value={currentTab}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          "& .MuiTabs-scrollButtons.Mui-disabled": {
            opacity: 0.3,
          },
          "& .MuiTab-root": {
            padding: "0px 12px",
            margin: 0,
          },
        }}
      >
        {tabsList.map((tab) => (
          <Tab
            key={tab.path}
            label={tab.label}
            value={tab.path}
            to={tab.path}
            component={Link}
          />
        ))}
      </Tabs>
    </Box>
  );
}
