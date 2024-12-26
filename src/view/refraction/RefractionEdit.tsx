import { useForm, Controller } from "react-hook-form";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import CustomInput from "../../components/CustomInput";
import { Grid, Box, Button, Typography, Input, Paper } from "@mui/material";

export default function RefractionEdit() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <Box sx={{ minWidth: "1000px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={styleForGrid}>
          <Controller
            name="customerName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInputWithLabel
                {...field}
                label="Customer Name"
                placeholder=""
                fullWidth
                type="text"
              />
            )}
          />
          <Controller
            name="auto_ref"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInputWithLabel
                {...field}
                label="Mobile Name"
                placeholder=""
                fullWidth
                type="text"
              />
            )}
          />
        </div>

        <div style={styleForGrid}>
          <div>
            <Controller
              name="hb_rx_right"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInputWithLabel
                  {...field}
                  label="HB Rx"
                  placeholder=""
                  fullWidth
                  type="text"
                />
              )}
            />
            <Controller
              name="hb_rx_left"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput {...field} placeholder="" fullWidth type="text" />
              )}
            />
          </div>
          <div>
            <Controller
              name="customInput2"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput {...field} placeholder="" fullWidth type="text" />
              )}
            />
            <Controller
              name="customInput3"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomInput {...field} placeholder="" fullWidth type="text" />
              )}
            />
          </div>
        </div>

        <div style={styleForGridChilds}>
          <Controller
            name="auto_ref"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInputWithLabel
                {...field}
                label="Auto Ref"
                placeholder=""
                fullWidth
                type="text"
              />
            )}
          />
          <Controller
            name="customInput4"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInput {...field} placeholder="" fullWidth type="text" />
            )}
          />
        </div>

        <div style={styleForGridChilds}>
          <Controller
            name="ntc"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInputWithLabel
                {...field}
                label="NTC"
                placeholder=""
                fullWidth
                type="text"
              />
            )}
          />
          <Controller
            name="customInput5"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInput {...field} placeholder="" fullWidth type="text" />
            )}
          />
        </div>

        <div style={styleForGridChilds}>
          <Controller
            name="va_without_glass"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInputWithLabel
                {...field}
                label="VA Without Glass"
                placeholder=""
                fullWidth
                type="text"
              />
            )}
          />
          <Controller
            name="customInput6"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInput {...field} placeholder="" fullWidth type="text" />
            )}
          />
        </div>

        <div style={styleForGridChilds}>
          <Controller
            name="va_without_ph"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInputWithLabel
                {...field}
                label="VA Without P/H"
                placeholder=""
                fullWidth
                type="text"
              />
            )}
          />
          <Controller
            name="customInput7"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInput {...field} placeholder="" fullWidth type="text" />
            )}
          />
        </div>

        <div style={styleForGridChilds}>
          <Controller
            name="va_with_glass"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInputWithLabel
                {...field}
                label="VA Wit Glass"
                placeholder=""
                fullWidth
                type="text"
              />
            )}
          />
          <Controller
            name="customInput8"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CustomInput {...field} placeholder="" fullWidth type="text" />
            )}
          />
        </div>
        <Paper elevation={3} sx={{ padding: "10px" }}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 2,
            }}
          >
            <Grid sx={{ gridRow: "span 2" }} item></Grid>
            <Grid item sx={{ gridColumn: "span 3" }}>
              <Typography sx={{ bgcolor: "#D7D4E1" }}> Right Eye</Typography>
            </Grid>
            <Grid
              item
              sx={{
                gridColumn: "span 3",
                padding: "10px",
              }}
            >
              <Typography sx={{ bgcolor: "#DBD4B5", textAlign: "center" }}>
                Left Eye
              </Typography>
            </Grid>
            {/* Right Eye */}
            <Typography>SPH</Typography>
            <Typography>Cyl</Typography>
            <Typography>AXIS</Typography>
            {/* Right Eye */}
            {/* Left Eye */}
            <Typography>SPH</Typography>
            <Typography>Cyl</Typography>
            <Typography>AXIS</Typography>
            <Typography textAlign="center">Dist</Typography>
            {/* Left Eye */}
            {/* Right Eye */}
            <Input />
            <Input />
            <Input />
            {/* Right Eye */}

            {/* Left Eye */}
            <Input />
            <Input />
            <Input />
            {/* Left Eye */}

            <Typography textAlign="center">Near</Typography>
            {/* Right Eye */}

            <Input />
            <Input />
            <Input />
            {/* Right Eye */}
            {/* Left Eye */}

            <Input />
            <Input />
            <Input />
            {/* Left Eye */}
          </Grid>
        </Paper>

        <Button fullWidth variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
}

const styleForGrid = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const styleForGridChilds = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
