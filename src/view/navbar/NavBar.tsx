// NavBar.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Paper,
  Box,
  Button,
  Typography,
  Fade,
  Stack,
  Tooltip,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Feedback,
  Hearing,
  LogoutOutlined,
  UploadRounded,
} from "@mui/icons-material";

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
// import RefractionIcon from "../../assets/icons/navbar/Refraction.png";
// import TransationIcon from "../../assets/icons/navbar/Transation.png";
// import StockIcon from "../../assets/icons/navbar/Stock.png";
// import SearchIcon from "../../assets/icons/navbar/Search.png";
// import AccountIcon from "../../assets/icons/navbar/Account.png";
// import ChanneltIcon from "../../assets/icons/navbar/Channel.png";
// import ReportsIcon from "../../assets/icons/navbar/Reports.png";
// import MasterIcon from "../../assets/icons/navbar/Master.png";
// import UserIcon from "../../assets/icons/navbar/User.png";
// import LogBookIcon from "../../assets/icons/navbar/logbook.webp";
import {
  ArrowLeftRight,
  Blend,
  BookOpenCheck,
  Building2Icon,
  Calculator,
  FileSearch2,
  Frame,
  Glasses,
  NotebookIcon,
  PackageOpen,
  ReceiptText,
  ScanEye,
  Stethoscope,
  User2,
  UserRoundCog,
} from "lucide-react";
import {
  deleteUserData,
  getUserAuth,
  getUserCurentBranch,
} from "../../utils/authDataConver";
import FrameStoreNav from "../inventory/frame-store/FrameStoreNav";
import LensStoreNav from "../inventory/lens-store/LensStoreNav";
import { LENS_AND_FRAME_STORE_ID } from "../../data/staticVariables";
import ImageUploardNav from "../uploard/ImageUploardNav";
import FeedbackNav from "../feedback/FeedbackNav";
import HearingNav from "../inventory/frame-store/HearingNav";
import FrameOnlyNav from "../transaction/FrameOnlyNav";

// Tab panel utility (hidden by default)
// function TabPanel({
//   children,
//   value,
//   tabKey,
// }: {
//   children: React.ReactNode;
//   value: string;
//   tabKey: string;
// }) {
//   return value === tabKey ? <Box>{children}</Box> : null;
// }

export default function NavBar() {
  const curentBranch = getUserCurentBranch();

  // Tab configuration
  const tabs = [
    {
      key: "",
      label: "Refraction",
      path: "",
      icon: <ScanEye />,
      nav: RefractionNav,
      inventory: false,
    },
    {
      key: "transaction",
      label: "Factory",
      path: "transaction/factory_order",
      icon: <ArrowLeftRight />,
      nav: TransactionNav,
      inventory: false,
    },
    {
      key: "frame-only",
      label: "Frame Only",
      path: "frame-only",
      icon: <Glasses />,
      nav: FrameOnlyNav,
      inventory: false,
    },
    {
      key: "hearing",
      label: "Hearing",
      path: "hearing",
      icon: <Hearing />,
      nav: HearingNav,
      inventory: false,
    },
    {
      key: "search",
      label: "Search",
      path: "search",
      icon: <FileSearch2 />,
      nav: SearchNav,
      inventory: false,
    },
    {
      key: "checkin",
      label: "Check In",
      path: "checkin",
      icon: <BookOpenCheck />,
      nav: CheckInNav,
      inventory: false,
    },
    {
      key: "account",
      label: "Account",
      path: "account",
      icon: <Calculator />,
      nav: AccountNav,
      inventory: false,
    },
    {
      key: "stock",
      label: "Stock",
      path: "stock/add_frames",
      icon: <PackageOpen />,
      nav: StockNav,
      inventory: false,
    },
    {
      key: "channel",
      label: "Channel",
      path: "channel",
      icon: <Stethoscope />,
      nav: ChannelNav,
      inventory: false,
    },
    {
      key: "reports",
      label: "Reports",
      path: "reports",
      icon: <ReceiptText />,
      nav: ReportsNav,
      inventory: false,
    },
    {
      key: "master",
      label: "Master",
      path: "master",
      icon: <Frame />,
      nav: MasterNav,
      inventory: false,
    },
    {
      key: "user",
      label: "User",
      path: "user",
      icon: <UserRoundCog />,
      nav: UserNav,
      inventory: false,
    },
    {
      key: "logs",
      label: "Logs",
      path: "logs",
      icon: <NotebookIcon />,
      nav: LogsNav,
      inventory: false,
    },
    {
      key: "image-upload",
      label: "Upload",
      path: "image-upload",
      icon: <UploadRounded />,
      nav: ImageUploardNav,
      inventory: false,
    },
    {
      key: "order-feedback",
      label: "Feedback",
      path: "order-feedback",
      icon: <Feedback />,
      nav: FeedbackNav,
      inventory: false,
    },

    //add store routes
    {
      key: "inventory-frame",
      label: "Frame Store",
      path: "inventory-frame",
      icon: <Blend />,
      nav: FrameStoreNav,
      inventory: true,
    },

    {
      key: "inventory-lens",
      label: "Lens Store",
      path: "inventory-lens",
      icon: <Blend />,
      nav: LensStoreNav,
      inventory: true,
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  // Determine current tab from first segment
  const firstSegment = location.pathname.split("/")[1] || "";
  const tabValue = tabs.find((tab) => firstSegment === tab.key)?.key ?? "";
  const activeTab = tabs.find((tab) => tab.key === tabValue) || tabs[0];

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
    <Paper sx={{ width: "100%", minHeight: 60 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: { xs: "wrap", md: "nowrap" }, // Stacks on mobile
          justifyContent: "space-between",
          px: { xs: 1, sm: 2 },
          py: 1,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="icon label tabs"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: 32, // Less height overall
            ".MuiTab-root": {
              px: { xs: 0.5, sm: 1 },
              py: 0,
            },
            ".MuiTabs-scrollButtons": {
              width: 28, // Smaller scroll button
              height: 28,
            },
          }}
        >
          {tabs
            .filter(
              (tab) =>
                tab.inventory ===
                (curentBranch?.id === Number(LENS_AND_FRAME_STORE_ID))
            )
            .map((tab) => (
              <Tab
                key={tab.key}
                value={tab.key}
                icon={tab.icon}
                label={
                  <Box
                    sx={{
                      display: { xs: "none", sm: "block" },
                      fontSize: { xs: 10, sm: 12, md: 13 },
                    }}
                  >
                    {tab.label}
                  </Box>
                }
                sx={{
                  textTransform: "capitalize",
                  p: { xs: 0, sm: 0.5, md: 1 }, // Less padding for compactness
                  minWidth: 60, // Reduce minWidth
                  maxWidth: 100, // Prevent too wide tabs
                  fontSize: { xs: 10, sm: 12, md: 13 },
                  m: 0,
                  lineHeight: 1.2, // Tighten vertical space
                  minHeight: 32, // Less height
                  height: { xs: 32, sm: 36, md: 40 },
                }}
              />
            ))}

          <Box
            sx={{
              mx: { xs: 0, sm: 1 },
              display: "grid",
              gridTemplateColumns: "1fr ",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip
                title={`Branch: ${
                  getUserCurentBranch()?.branch_name || "Branch"
                } • Role: ${getUserAuth()?.is_superuser ? "Admin" : "User"}`}
              >
                <Badge
                  overlap="rectangular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <Box
                      sx={{
                        bgcolor: getUserAuth()?.is_superuser
                          ? "primary.main"
                          : "grey.500",
                        color: "white",
                        px: 0.8,
                        py: 0.2,
                        borderRadius: 0.5, // square-ish
                        fontSize: 10,
                        fontWeight: 500,
                        boxShadow: 1,
                      }}
                    >
                      {getUserAuth()?.is_superuser ? "Admin" : "User"}
                    </Box>
                  }
                >
                  <Avatar
                    sx={{
                      bgcolor: "grey.200",
                      width: 32,
                      height: 32,
                    }}
                  >
                    <Building2Icon size={16} />
                  </Avatar>
                </Badge>
              </Tooltip>

              <Typography
                variant="body2"
                sx={{
                  maxWidth: 120,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: { xs: 13, md: 15 },
                  fontWeight: 500,
                }}
              >
                {getUserCurentBranch()?.branch_name || "Branch"}
              </Typography>
            </Stack>
          </Box>
          <Button onClick={deleteCookie}>
            <LogoutOutlined />
          </Button>
          {/* <IconButton onClick={setNavbarState}>
            <BuildTwoTone />
          </IconButton> */}
        </Tabs>
        {/* //! need sever logout */}
      </Box>
      {/* Tab panels for each section */}
      <Fade in={!!activeTab?.nav} timeout={300}>
        <Paper
          elevation={4}
          sx={{ display: "flex", flexWrap: "wrap", gap: 1, py: 1 }}
        >
          {activeTab?.nav && <activeTab.nav />}
        </Paper>
      </Fade>
    </Paper>
  );
}
