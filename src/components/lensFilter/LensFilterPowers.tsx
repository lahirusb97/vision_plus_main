import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";

interface LensFilterPowersProps {
  handleLensInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sph: string | null;
  cyl: string | null;
  add: string | null;
  side: "right" | "left";
  nameSph: "left_sph" | "right_sph";
  nameCyl: "left_cyl" | "right_cyl";
  nameAdd: "left_add" | "right_add";
  namePrice: "left_price" | "right_price";
  price: string | null;
}
//! can not be changed names
const LensFilterPowers: React.FC<LensFilterPowersProps> = ({
  handleLensInputChange,
  side,
  cyl,
  sph,
  add,
  nameSph,
  nameCyl,
  nameAdd,
  namePrice,
  price,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="subtitle1"
          sx={{ textTransform: "capitalize", width: 40 }}
        >
          {side}
        </Typography>
        <ArrowRight />
      </Box>
      <TextField
        sx={{ width: 80 }}
        size="small"
        name={nameSph}
        type="number"
        label={`sph`}
        value={sph}
        onChange={handleLensInputChange}
        margin="normal"
        inputProps={{ step: 0.25 }}
      />
      <TextField
        sx={{ width: 80 }}
        size="small"
        name={nameCyl}
        type="number"
        label={`cyl`}
        value={cyl}
        onChange={handleLensInputChange}
        margin="normal"
        inputProps={{ step: 0.25, inputMode: "decimal" }}
      />
      <TextField
        sx={{ width: 80 }}
        type="number"
        size="small"
        name={nameAdd}
        label={`add`}
        value={add}
        onChange={handleLensInputChange}
        margin="normal"
        inputProps={{ step: 0.25 }}
      />
      <TextField
        sx={{ width: 100 }}
        type="number"
        size="small"
        name={namePrice}
        label={`Price`}
        value={price || ""}
        onChange={handleLensInputChange}
        margin="normal"
        inputProps={{ step: 0.25 }}
        InputLabelProps={{
          shrink: Boolean(namePrice),
        }}
      />
    </Box>
  );
};
export default LensFilterPowers;
