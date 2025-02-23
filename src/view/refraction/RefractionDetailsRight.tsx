import { Box, Paper, TextField, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useFormContext } from "react-hook-form";
const widthInput = 160;

export default function RefractionDetailsRight() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: purple[50],
          p: 2,
        }}
      >
        {/* //!Right EYE */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            {...register("hb_rx_right_dist")}
            error={!!errors.hb_rx_right_dist}
            size="small"
            label={"Hb Rx dist"}
          />
          <TextField
            {...register("hb_rx_right_near")}
            error={!!errors.hb_rx_right_near}
            size="small"
            label={"Hb Rx near"}
          />
          <TextField
            {...register("auto_ref_right")}
            error={!!errors.auto_ref_right}
            size="small"
            label={"Auto Ref"}
          />
          <TextField
            {...register("ntc_right")}
            error={!!errors.ntc_right}
            size="small"
            label={"NTC"}
          />
          <TextField
            {...register("va_without_glass_right")}
            error={!!errors.va_without_glass_right}
            size="small"
            label={"VA Without Glass"}
          />
          <TextField
            {...register("va_without_ph_right")}
            error={!!errors.va_without_ph_right}
            size="small"
            label={"VA Without P/H"}
          />
          <TextField
            {...register("va_with_glass_right")}
            error={!!errors.va_with_glass_right}
            size="small"
            label={"VA With Glass"}
          />
        </Box>
        <Paper variant="elevation" sx={{ bgcolor: purple[100] }}>
          <Box sx={{ p: 2 }}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              pb: 2,
            }}
          >
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
        </Paper>
      </Paper>
    </div>
  );
}
