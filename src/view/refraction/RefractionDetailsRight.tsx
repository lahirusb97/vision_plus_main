import { Box, Paper, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Controller, useFormContext } from "react-hook-form";
import NumericInput from "../../components/inputui/NumericInput";

const widthInput = 160;

export default function RefractionDetailsRight() {
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
            sx={{
              "& .MuiInputBase-root": {
                height: 32,
              },
            }}
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("hb_rx_right_near")}
            size="small"
            label={"Hb Rx near"}
            type="text"
            InputLabelProps={{ shrink: Boolean(watch("hb_rx_right_near")) }}
            sx={{
              "& .MuiInputBase-root": {
                height: 32,
              },
            }}
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("auto_ref_right")}
            size="small"
            label={"Auto Ref"}
            type="text"
            InputLabelProps={{ shrink: Boolean(watch("auto_ref_right")) }}
            sx={{
              "& .MuiInputBase-root": {
                height: 32,
              },
            }}
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("ntc_right")}
            size="small"
            label={"NTC"}
            type="text"
            InputLabelProps={{ shrink: Boolean(watch("ntc_right")) }}
            sx={{
              "& .MuiInputBase-root": {
                height: 32,
              },
            }}
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
            sx={{
              "& .MuiInputBase-root": {
                height: 32,
              },
            }}
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("va_without_ph_right")}
            size="small"
            label={"VA with P/H"} /* chalani- labelname change*/
            type="text"
            InputLabelProps={{ shrink: Boolean(watch("va_without_ph_right")) }}
            sx={{
              "& .MuiInputBase-root": {
                height: 32,
              },
            }}
          />
          <TextField
            inputProps={{ step: 0.25 }}
            {...register("va_with_glass_right")}
            size="small"
            label={"VA With Glass"}
            type="text"
            InputLabelProps={{ shrink: Boolean(watch("va_with_glass_right")) }}
            sx={{
              "& .MuiInputBase-root": {
                height: 32,
              },
            }}
          />
        </Box>
        <Paper variant="outlined" sx={{ bgcolor: "#f5f5f5" }}>
          <Box sx={{ p: 1 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Controller
                name="right_eye_dist_sph"
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
                name="right_eye_dist_cyl"
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
                name="right_eye_dist_axis"
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 1,
              pb: 1,
            }}
          >
            <Controller
              name="right_eye_near_sph"
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
              <Typography>Right Side</Typography>
            </Box>
          </Box>
        </Paper>
      </Paper>
    </div>
  );
}
