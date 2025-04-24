import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import NumericInput from "../inputui/NumericInput";

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
  console.log(sph);

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

      <NumericInput
        sx={{ width: 80 }}
        inputLabel="SPH"
        name={nameSph}
        value={sph}
        onChange={(val) =>
          handleLensInputChange({
            target: { name: nameSph, value: val },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />
      <NumericInput
        sx={{ width: 80 }}
        name={nameCyl}
        inputLabel="CYL"
        value={cyl}
        onChange={(val) =>
          handleLensInputChange({
            target: { name: nameCyl, value: val },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />
      <NumericInput
        sx={{
          width: 80,
          "& .MuiInputBase-root": {
            height: 32,
          },
        }}
        name={nameAdd}
        inputLabel="ADD"
        value={add}
        onChange={(val) =>
          handleLensInputChange({
            target: { name: nameAdd, value: val },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />

      <TextField
        sx={{ width: 100, height: 32, mb: 2 }}
        type="number"
        size="small"
        name={namePrice}
        label={`Price`}
        value={price || ""}
        onChange={handleLensInputChange}
        inputProps={{ step: 0.25 }}
        InputLabelProps={{
          shrink: Boolean(namePrice),
        }}
      />
    </Box>
  );
};
export default LensFilterPowers;
