import { Box, Paper, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFormContext } from "react-hook-form";
const widthInput = 160;

export default function RefractionDetailsRight() {
  const { register, watch } = useFormContext();

  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "#f5f5f5" /* chalani- backgroundcolor change*/,
          p: 1,
        }}
      >
        {/* //!Right EYE */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("hb_rx_right_dist")}
            size="small"
            label={"Hb Rx dist"}
            type="text"
            InputLabelProps={{ shrink: Boolean(watch("hb_rx_right_dist")) }}
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("hb_rx_right_near")}
            size="small"
            label={"Hb Rx near"}
            type="text"
            InputLabelProps={{ shrink: Boolean(watch("hb_rx_right_near")) }}
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("auto_ref_right")}
            size="small"
            label={"Auto Ref"}
            type="text"
            InputLabelProps={{ shrink: Boolean(watch("auto_ref_right")) }}
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("ntc_right")}
            size="small"
            label={"NTC"}
            type="text"
            InputLabelProps={{ shrink: Boolean(watch("ntc_right")) }}
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("va_without_glass_right")}
            size="small"
            label={"VA Without Glass"}
            type="text"
            InputLabelProps={{
              shrink: Boolean(watch("va_without_glass_right")),
            }}
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("va_without_ph_right")}
            size="small"
            label={"VA with P/H"} /* chalani- labelname change*/
            type="text"
            InputLabelProps={{ shrink: Boolean(watch("va_without_ph_right")) }}
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("va_with_glass_right")}
            size="small"
            label={"VA With Glass"}
            type="text"
            InputLabelProps={{ shrink: Boolean(watch("va_with_glass_right")) }}
          />
        </Box>
        <Paper variant="elevation" sx={{ bgcolor: "#f5f5f5" }}>
          <Box sx={{ p: 1 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                inputProps={{ step: 0.25 }}
                type="number"
                {...register("right_eye_dist_sph")}
                placeholder=" sph"
                size="small"
                label="sph"
                sx={{ width: widthInput }}
                InputLabelProps={{
                  shrink: Boolean(watch("right_eye_dist_sph")),
                }}
              />

              <TextField
                inputProps={{ step: 0.25, max: 0 }}
                type="number"
                {...register("right_eye_dist_cyl")}
                placeholder=" cyl"
                size="small"
                label="cyl"
                sx={{ width: widthInput }}
                InputLabelProps={{
                  shrink: Boolean(watch("right_eye_dist_cyl")),
                }}
              />

              <TextField
                inputProps={{ step: 0.25 }}
                type="number"
                {...register("right_eye_dist_axis")}
                placeholder=" axis"
                size="small"
                label="axis"
                sx={{ width: widthInput }}
                InputLabelProps={{
                  shrink: Boolean(watch("right_eye_dist_axis")),
                }}
              />
            </Box>
          </Box>

          {/* show this below */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              pb: 1,
            }}
          >
            <TextField
              inputProps={{ step: 0.25 }}
              type="number"
              {...register("right_eye_near_sph")}
              placeholder=" near"
              size="small"
              label="near"
              sx={{ width: widthInput }}
              InputLabelProps={{
                shrink: Boolean(watch("right_eye_near_sph")),
              }}
            />
            <Box
              sx={{
                flexGrow: 2,
                p: 1,
                bgcolor: grey[800],
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
