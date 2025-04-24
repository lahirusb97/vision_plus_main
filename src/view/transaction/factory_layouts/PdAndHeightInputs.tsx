import { TextField, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PdAndHeightInputs() {
  const { register, watch } = useFormContext();
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField
          {...register("pd")}
          sx={{ width: 100 }}
          size="small"
          type="number"
          label="PD"
          InputLabelProps={{
            shrink: Boolean(watch("pd")),
          }}
        />
        <TextField
          {...register("height")}
          sx={{ width: 100 }}
          type="number"
          size="small"
          label="Height"
          InputLabelProps={{
            shrink: Boolean(watch("height")),
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            {...register("right_pd")}
            sx={{ width: 100 }}
            type="number"
            size="small"
            label="Right-PD"
            InputLabelProps={{
              shrink: Boolean(watch("right_pd")),
            }}
          />
          <TextField
            {...register("left_pd")}
            sx={{ width: 100 }}
            type="number"
            size="small"
            label="Left-PD"
            InputLabelProps={{
              shrink: Boolean(watch("left_pd")),
            }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            {...register("right_height")}
            sx={{ width: 100 }}
            type="number"
            size="small"
            label="Right-H"
            InputLabelProps={{
              shrink: Boolean(watch("right_height")),
            }}
          />
          <TextField
            {...register("left_height")}
            sx={{ width: 100 }}
            type="number"
            size="small"
            label="Left-H "
            InputLabelProps={{
              shrink: Boolean(watch("left_height")),
            }}
          />
        </Box>
      </Box>
    </>
  );
}
