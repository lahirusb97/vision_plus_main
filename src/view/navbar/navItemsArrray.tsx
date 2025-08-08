import {
  ArrowLeftRight,
  BookOpenCheck,
  Calculator,
  FileSearch2,
  Frame,
  NotebookIcon,
  PackageOpen,
  ReceiptText,
  ScanEye,
  Stethoscope,
  UserRoundCog,
} from "lucide-react";
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
import HearingNav from "../inventory/frame-store/HearingNav";
import { Hearing } from "@mui/icons-material";

export const navBarArray = [
  {
    key: "refraction",
    label: "Refraction",
    path: "",
    icon: <ScanEye style={{ width: "1rem" }} />,
    nav: RefractionNav,
  },
  {
    key: "transaction",
    label: "Transaction",
    path: "transaction/factory_order",
    icon: <ArrowLeftRight style={{ width: "1rem" }} />,
    nav: TransactionNav,
  },
  {
    key: "search",
    label: "Search",
    path: "search",
    icon: <FileSearch2 style={{ width: "1rem" }} />,
    nav: SearchNav,
  },
  {
    key: "checkin",
    label: "Check In",
    path: "checkin",
    icon: <BookOpenCheck style={{ width: "1rem" }} />,
    nav: CheckInNav,
  },
  {
    key: "account",
    label: "Account",
    path: "account",
    icon: <Calculator style={{ width: "1rem" }} />,
    nav: AccountNav,
  },
  {
    key: "stock",
    label: "Stock",
    path: "stock/add_frames",
    icon: <PackageOpen style={{ width: "1rem" }} />,
    nav: StockNav,
  },
  {
    key: "channel",
    label: "Channel",
    path: "channel",
    icon: <Stethoscope style={{ width: "1rem" }} />,
    nav: ChannelNav,
  },
  {
    key: "reports",
    label: "Reports",
    path: "reports",
    icon: <ReceiptText style={{ width: "1rem" }} />,
    nav: ReportsNav,
  },
  {
    key: "master",
    label: "Master",
    path: "master",
    icon: <Frame style={{ width: "1rem" }} />,
    nav: MasterNav,
  },
  {
    key: "user",
    label: "User",
    path: "user",
    icon: <UserRoundCog style={{ width: "1rem" }} />,
    nav: UserNav,
  },
  {
    key: "logs",
    label: "Logs",
    path: "logs",
    icon: <NotebookIcon style={{ width: "1rem" }} />,
    nav: LogsNav,
  },
  {
    key: "hearing-order",
    label: "Hearing Order",
    path: "hearing-order",
    icon: <Hearing />,
    nav: HearingNav,
    inventory: true,
  },
];
