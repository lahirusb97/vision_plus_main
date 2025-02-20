import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { closeStockDrawer } from "../../features/invoice/stockDrawerSlice";
import FrameStock from "../../view/transaction/factory_invoice/FrameStock";
import LensStock from "../../view/transaction/factory_invoice/LensStock";
import LensNoneStock from "../../view/transaction/factory_invoice/LensNoneStock";
import OtherItem from "../../view/transaction/factory_invoice/OtherItem";

export default function DrawerStock() {
  const dispatch = useDispatch();
  const stockDrawerType = useSelector(
    (state: RootState) => state.stock_drawer.stockDrawerType
  );
  const stockDrawerOpen = useSelector(
    (state: RootState) => state.stock_drawer.stockDrawerOpen
  );
  const DrawerList = (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1300px",
        margin: "0 auto",
        flexDirection: "column",
        gap: 1,
        justifyContent: "center",
      }}
      role="presentation"
    >
      <IconButton onClick={() => dispatch(closeStockDrawer())}>
        <Close />
      </IconButton>
      <Box>
        {stockDrawerType === "frame" ? (
          <FrameStock />
        ) : stockDrawerType === "lense" ? (
          <LensStock />
        ) : stockDrawerType === "none_stock_lense" ? (
          <LensNoneStock />
        ) : (
          <OtherItem />
        )}
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        hideBackdrop={true}
        anchor="bottom"
        open={stockDrawerOpen}
        onClose={() => dispatch(closeStockDrawer())}
        PaperProps={{
          style: { height: "50vh" }, // adjust the height to 50% of the viewport height
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
