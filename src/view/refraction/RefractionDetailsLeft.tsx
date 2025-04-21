import { Box, Paper, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Controller, useFormContext } from "react-hook-form";
import NumericInput from "../../components/inputui/NumericInput";
const widthInput = 160;
export default function RefractionDetailsLeft() {
  const { register, watch, control } = useFormContext();

  return (
    <div>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          // backgroundColor: "#f5f5f5" /* chalani- backgroundcolor change*/,
          p: 1,
        }}
      >
        <TextField
          {...register("hb_rx_left_dist")}
          sx={inputStyle}
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
          sx={inputStyle}
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
          sx={inputStyle}
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
          sx={inputStyle}
          type="text"
          inputProps={{ step: 0.25 }}
          InputLabelProps={{
            shrink: Boolean(watch("ntc_left")),
          }}
        />
        <TextField
          {...register("va_without_glass_left")}
          size="small"
          sx={inputStyle}
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
          sx={inputStyle}
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
          sx={inputStyle}
          label={"VA With Glass"}
          type="text"
          inputProps={{ step: 0.25 }}
          InputLabelProps={{
            shrink: Boolean(watch("va_with_glass_left")),
          }}
        />
        <Paper variant="outlined" sx={{ bgcolor: "#f5f5f5", p: 1 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Controller
                name="left_eye_dist_sph"
                control={control}
                render={({ field }) => (
                  <NumericInput
                    {...field}
                    inputLabel="SPH"
                    sx={{ width: widthInput }}
                  />
                )}
              />
              <Controller
                name="left_eye_dist_cyl"
                control={control}
                render={({ field }) => (
                  <NumericInput
                    {...field}
                    inputLabel="CYL"
                    errorCheck={(val) => parseFloat(val || "1") > 0}
                    sx={{ width: widthInput }}
                  />
                )}
              />
              <Controller
                name="left_eye_dist_axis"
                control={control}
                render={({ field }) => (
                  <NumericInput
                    {...field}
                    inputLabel="AXIS"
                    sx={{ width: widthInput }}
                  />
                )}
              />
            </Box>
          </Box>

          {/* show this below */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Controller
              name="left_eye_near_sph"
              control={control}
              render={({ field }) => (
                <NumericInput
                  {...field}
                  inputLabel="NEAR"
                  sx={{ width: widthInput }}
                />
              )}
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
const inputStyle = {
  "& .MuiInputBase-root": {
    height: 32,
  },
};
