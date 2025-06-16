import React from "react";
import { Input } from "@mui/material";
import { useFormContext } from "react-hook-form";

const DiscountInput: React.FC = () => {
  const {
    register,
    setValue,
    // formState: { errors },
  } = useFormContext();
  return (
    <Input
      {...register("discount", { valueAsNumber: true })}
      sx={{ width: "100%" }} // Optional for full width
      type="number"
      inputProps={{
        style: { textAlign: "right" },
        min: 0,
        sx: {
          "&::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "&::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "&[type=number]": { MozAppearance: "textfield" },
        },
      }} // Correct way
      onFocus={(e) => {
        if (e.target.value === "0") {
          setValue("discount", "");
        }
      }}
      onBlur={(e) => {
        if (e.target.value === "") {
          setValue("discount", 0);
        }
      }}
      defaultValue={0}
    />
  );
};

export default DiscountInput;
