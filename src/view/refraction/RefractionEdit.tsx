import { useForm, Controller } from "react-hook-form";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import CustomInput from "../../components/CustomInput";
import { Grid, Box, Button } from "@mui/material";

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
            name="mobileName"
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
              name="hbRx"
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
              name="customInput1"
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
            name="autoRef"
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
            name="vaWithoutGlass"
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
            name="vaWithoutPH"
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
            name="vaWithGlass"
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

        <Button variant="contained" type="submit">
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
  gap: "60px",
  marginBottom: "20px",
};

const styleForGridChilds = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "60px",
};
