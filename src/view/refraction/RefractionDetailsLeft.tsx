import { Box, Paper, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFormContext } from "react-hook-form";
const widthInput = 160;
export default function RefractionDetailsLeft() {
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
        <TextField
          {...register("hb_rx_left_dist")}
          size="small"
          label={"Hb Rx dist"}
          type="text"
          inputProps={{ step: 0.25 }}
          InputLabelProps={{
            shrink: Boolean(watch("hb_rx_left_dist")),
          }}
        />
        <TextField
          {...register("hb_rx_left_near")}
          size="small"
          label={"Hb Rx near"}
          type="text"
          inputProps={{ step: 0.25 }}
          InputLabelProps={{
            shrink: Boolean(watch("hb_rx_left_near")),
          }}
        />
        <TextField
          {...register("auto_ref_left")}
          size="small"
          label={"Auto Ref"}
          type="text"
          inputProps={{ step: 0.25 }}
          InputLabelProps={{
            shrink: Boolean(watch("auto_ref_left")),
          }}
        />
        <TextField
          {...register("ntc_left")}
          size="small"
          label={"NTC"}
          type="text"
          inputProps={{ step: 0.25 }}
          InputLabelProps={{
            shrink: Boolean(watch("ntc_left")),
          }}
        />
        <TextField
          {...register("va_without_glass_left")}
          size="small"
          label={"VA Without Glass"}
          type="text"
          inputProps={{ step: 0.25 }}
          InputLabelProps={{
            shrink: Boolean(watch("va_without_glass_left")),
          }}
        />
        <TextField
          {...register("va_without_ph_left")}
          size="small"
          label={"VA with P/H"} /* chalani- labelname change*/
          type="text"
          inputProps={{ step: 0.25 }}
          InputLabelProps={{
            shrink: Boolean(watch("va_without_ph_left")),
          }}
        />
        <TextField
          {...register("va_with_glass_left")}
          size="small"
          label={"VA With Glass"}
          type="text"
          inputProps={{ step: 0.25 }}
          InputLabelProps={{
            shrink: Boolean(watch("va_with_glass_left")),
          }}
        />
        <Paper sx={{ p: 1, bgcolor: "#f5f5f5" }}>
          <Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                inputProps={{ step: 0.25 }}
                type="number"
                {...register("left_eye_dist_sph", { valueAsNumber: true })}
                placeholder=" sph"
                size="small"
                label="sph"
                sx={{ width: widthInput }}
                InputLabelProps={{
                  shrink: Boolean(watch("left_eye_dist_sph")),
                }}
              />

              <TextField
                inputProps={{ step: 0.25 }}
                type="number"
                {...register("left_eye_dist_cyl", { valueAsNumber: true })}
                placeholder=" cyl"
                size="small"
                label="cyl"
                sx={{ width: widthInput }}
                InputLabelProps={{
                  shrink: Boolean(watch("left_eye_dist_cyl")),
                }}
              />

              <TextField
                inputProps={{ step: 0.25 }}
                type="number"
                {...register("left_eye_dist_axis", { valueAsNumber: true })}
                placeholder=" axis"
                size="small"
                label="axis"
                sx={{ width: widthInput }}
                InputLabelProps={{
                  shrink: Boolean(watch("left_eye_dist_axis")),
                }}
              />
            </Box>
          </Box>

          {/* show this below */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <TextField
              inputProps={{ step: 0.25 }}
              type="number"
              {...register("left_eye_near_sph", { valueAsNumber: true })}
              placeholder=" near"
              size="small"
              label="near"
              sx={{ width: widthInput }}
              InputLabelProps={{
                shrink: Boolean(watch("left_eye_near_sph")),
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
              <Typography>Left Side</Typography>
            </Box>
          </Box>
        </Paper>
      </Paper>
    </div>
  );
}
