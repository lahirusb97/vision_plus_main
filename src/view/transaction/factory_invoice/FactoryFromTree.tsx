import { useState } from "react";
import { Input, Box, Button, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CashInput from "../../../components/inputui/CashInput";
import CardInput from "../../../components/inputui/CardInput";
import { RootState } from "../../../store/store";
import { useFormContext } from "react-hook-form";

export default function FactoryFromTree() {
  const selectedFrameList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const selectedLenseList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLenses
  );
  const totalLensePrice = Object.values(selectedLenseList).reduce(
    (sum, item) => sum + parseFloat(item.price) * item.buyQty,
    0
  );
  const totalFramePrice = Object.values(selectedFrameList).reduce(
    (sum, item) => sum + parseFloat(item.price) * item.buyQty,
    0
  );

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <div style={{ width: "1200px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Paper sx={inputStyle1}>
          <Typography sx={{ padding: 1 }}>Total Price</Typography>
          <Typography sx={{ padding: 1 }}>
            {totalFramePrice + totalLensePrice}
          </Typography>
        </Paper>
        <Box sx={inputStyle1}>
          <Paper sx={inputStyle2}>
            <Typography>Discout</Typography>
          </Paper>
          <Paper>
            <Input
              {...register("discount")}
              sx={inputStyle2}
              type="number"
              error={!!errors.discount}
            />
          </Paper>
        </Box>
        <Box sx={inputStyle1}>
          <Paper sx={inputStyle2}>
            <Typography>First Payment </Typography>
          </Paper>
          <Paper sx={{ width: 190, padding: 1 }}>
            <Typography>
              {parseInt(watch("card")) + parseInt(watch("cash"))}{" "}
            </Typography>
          </Paper>
        </Box>
        <Paper sx={inputStyle1}>
          <Typography sx={{ padding: 1 }}>Blance</Typography>
          <Typography sx={{ padding: 1 }}>
            {totalLensePrice +
              totalFramePrice -
              (parseInt(watch("discount")) +
                parseInt(watch("card")) +
                parseInt(watch("cash")))}
          </Typography>
        </Paper>
      </Box>
      <div style={{ display: "flex", padding: 10 }}>
        <CashInput />
        <CardInput />
      </div>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
        <Button type="submit" variant="contained">
          Submite
        </Button>
      </Box>
    </div>
  );
}
const inputStyle1 = {
  Width: 600,
  paddingY: 1,
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
  gap: 2,
};
const inputStyle2 = {
  Width: 600,
  padding: 1,
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
  gap: 2,
};
