import { Box, Paper, Typography } from "@mui/material";
import theme from "../../../theme/theme";
import { useLocation } from "react-router";
import HbRxInput from "../../../components/inputui/HbRxInput";
import InputLeftRight from "../../../components/inputui/InputLeftRight";
import EyeTestTable from "../../../components/EyeTestTable";
import CustomInputWithLabel from "../../../components/inputui/CustomInputWithLabel";
import CustomInput from "../../../components/inputui/CustomInput";
import { useFormContext } from "react-hook-form";

export default function FactoryFromOne() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const location = useLocation();
  const { customerName, mobileNumber, date } = location.state || {
    customerName: "",
    mobileNumber: "",
    date: "",
  };

  return (
    <div>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }}>
        <CustomInput
          {...register("sales_staff_code")}
          placeholder="Staff Code"
          type="text"
          error={errors?.staff_code?.message as string}
        />
      </Box>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginY: 3,
          p: 2,
          backgroundColor: "skyblue",
          gap: 2,
        }}
      >
        <Paper
          sx={{ display: "flex", alignItems: "center", textAlign: "right" }}
        >
          <Typography
            sx={{
              width: "200px",
              color: "white",
              backgroundColor: theme.palette.primary.contrastText,
              padding: ".4rem",
              borderRadius: 1,
            }}
          >
            Customer Name
          </Typography>
          <Typography align="left" sx={{ marginLeft: "20px", width: "200px" }}>
            {customerName}
          </Typography>
        </Paper>
        <Paper
          sx={{ display: "flex", alignItems: "center", textAlign: "right" }}
        >
          <Typography
            sx={{
              width: "150px",
              color: "white",
              backgroundColor: theme.palette.primary.contrastText,
              padding: ".4rem",
              borderRadius: 1,
            }}
          >
            Refraction Number
          </Typography>
          <Typography align="left" sx={{ marginLeft: "20px", width: "200px" }}>
            {mobileNumber}
          </Typography>
        </Paper>
        <Paper
          sx={{ display: "flex", alignItems: "center", textAlign: "right" }}
        >
          <Typography
            sx={{
              width: "100px",
              color: "white",
              backgroundColor: theme.palette.primary.contrastText,
              padding: ".4rem",
              borderRadius: 1,
            }}
          >
            Date
          </Typography>
          <Typography align="left" sx={{ marginLeft: "20px", width: "100px" }}>
            {date}
          </Typography>
        </Paper>
      </Paper>

      <HbRxInput register={register} errors={errors} />
      <InputLeftRight
        register={register}
        errors={errors}
        inputOneName="auto_ref_right"
        inputTwoName="auto_ref_left"
        labelName="Auto Ref"
      />
      <EyeTestTable errors={errors} register={register} />
      <div style={{ width: "600px" }}>
        <CustomInputWithLabel
          error={errors?.remark?.message as string}
          {...register("remark")}
          label="Remark"
          placeholder="Enter value1"
          type="text"
          fullWidth
        />
      </div>
    </div>
  );
}
