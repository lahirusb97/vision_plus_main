import { Box, TextField, Typography } from "@mui/material";
const widthInput = 100;
import { purple } from "@mui/material/colors";
import { useFormContext } from "react-hook-form";

export default function RightEyeTable() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "#f5f5f5" /* chalani- backgroundcolor change*/,
          p: 1,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              type="text"
              inputProps={{ step: 0.25 }}
              {...register("hb_rx_right_dist")}
              size="small"
              label="Hb Rx Distance"
              error={!!errors.hb_rx_right_dist}
            />
            <TextField
              inputProps={{ step: 0.25 }}
              type="text"
              {...register("hb_rx_right_near")}
              size="small"
              error={!!errors.hb_rx_right_near}
              label="Hb Rx Near"
            />
            <TextField
              inputProps={{ step: 0.25 }}
              type="text"
              {...register("auto_ref_right")}
              size="small"
              error={!!errors.auto_ref_right}
              label="Auto Ref"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <TextField
              inputProps={{ step: 0.25 }}
              type="number"
              {...register("right_eye_dist_sph")}
              placeholder=" sph"
              size="small"
              error={!!errors.right_eye_dist_sph}
              label="sph"
              sx={{ width: widthInput }}
            />

            <TextField
              inputProps={{ step: 0.25 }}
              type="number"
              {...register("right_eye_dist_cyl")}
              placeholder=" cyl"
              size="small"
              label="cyl"
              sx={{ width: widthInput }}
              error={!!errors.right_eye_dist_cyl}
            />

            <TextField
              inputProps={{ step: 0.25 }}
              type="number"
              {...register("right_eye_dist_axis")}
              placeholder=" axis"
              size="small"
              label="axis"
              sx={{ width: widthInput }}
              error={!!errors.right_eye_dist_axis}
            />
          </Box>
        </Box>

        {/* show this below */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            inputProps={{ step: 0.25 }}
            type="number"
            {...register("right_eye_near_sph")}
            error={!!errors.right_eye_near_sph}
            placeholder=" near"
            size="small"
            label="near"
            sx={{ width: widthInput }}
          />
          <Box
            sx={{
              flexGrow: 2,
              p: 1,

              bgcolor: purple[500],
              ml: 1,
              color: "white",
            }}
          >
            <Typography>right Side</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
