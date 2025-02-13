import React from "react";
import { useForm } from "react-hook-form";
import CustomInputWithLabel from "../../components/inputui/CustomInputWithLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button, Paper, Typography } from "@mui/material";
import HbRxInput from "../../components/inputui/HbRxInput";
import InputLeftRight from "../../components/inputui/InputLeftRight";
import { useLocation, useParams } from "react-router";
import EyeTestTable from "../../components/EyeTestTable";
import axiosClient from "../../axiosClient";
import theme from "../../theme/theme";

// Validation Schema

export default function RefractionEdit() {
  const { id } = useParams();
  const location = useLocation();
  const { customerName, mobileNumber } = location.state || {};

  const validationSchema = Yup.object().shape({
    hb_rx_right_dist: Yup.string().required("Right Distance is required"),
    hb_rx_left_dist: Yup.string().required("Left Distance is required"),
    hb_rx_right_near: Yup.string().required("Right Near is required"),
    hb_rx_left_near: Yup.string().required("Left Near is required"),
    auto_ref_right: Yup.string().required("Auto Ref Right is required"),
    auto_ref_left: Yup.string().required("Auto Ref Left is required"),
    ntc_right: Yup.string().required("NTC Right is required"),
    ntc_left: Yup.string().required("NTC Left is required"),
    va_without_glass_right: Yup.string().required(
      "VA Without Glass Right is required"
    ),
    va_without_glass_left: Yup.string().required(
      "VA Without Glass Left is required"
    ),
    va_without_ph_right: Yup.string().required(
      "VA Without P/H Right is required"
    ),
    va_without_ph_left: Yup.string().required(
      "VA Without P/H Left is required"
    ),
    va_with_glass_right: Yup.string().required(
      "VA With Glass Right is required"
    ),
    va_with_glass_left: Yup.string().required("VA With Glass Left is required"),
    right_eye_dist_sph: Yup.string().required(
      "Right Eye Distance Sph is required"
    ),
    right_eye_dist_cyl: Yup.string(),
    right_eye_dist_axis: Yup.string(),
    right_eye_near_sph: Yup.string(),
    left_eye_dist_sph: Yup.string().required(
      "Left Eye Distance Sph is required"
    ),
    left_eye_dist_cyl: Yup.string(),
    left_eye_dist_axis: Yup.string(),
    left_eye_near_sph: Yup.string(),
    remark: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const responseData = await axiosClient.post(
        `/refraction-details/create/`,
        {
          ...data,
          refraction: parseInt(id),
        }
      );
      console.log(responseData.status);
    } catch (error) {
      if (error.response) {
        // Extract and log backend error details
        console.error("Backend Error:", error.response.data.refraction[0]); // Full error details
      } else {
        // Handle network or unexpected errors
        console.error("Request Error:", error.message);
      }
    }
  };

  return (
    <Box sx={{ minWidth: "1000px", padding: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", marginY: 3 }}
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
            <Typography
              align="left"
              sx={{ marginLeft: "20px", width: "200px" }}
            >
              {customerName}
            </Typography>
          </Paper>
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
              Mobile Number
            </Typography>
            <Typography
              align="left"
              sx={{ marginLeft: "20px", width: "200px" }}
            >
              {mobileNumber}
            </Typography>
          </Paper>
        </Box>

        <Paper
          variant="outlined"
          sx={{ padding: "20px", marginBottom: "20px" }}
        >
          <HbRxInput register={register} errors={errors} />
        </Paper>
        <InputLeftRight
          register={register}
          errors={errors}
          inputOneName="auto_ref_right"
          inputTwoName="auto_ref_left"
          labelName="Auto Ref"
        />
        <InputLeftRight
          register={register}
          errors={errors}
          inputOneName="ntc_right"
          inputTwoName="ntc_left"
          labelName="NTC"
        />
        <InputLeftRight
          register={register}
          errors={errors}
          inputOneName="va_without_glass_right"
          inputTwoName="va_without_glass_left"
          labelName="VA Without Glass"
        />
        <InputLeftRight
          register={register}
          errors={errors}
          inputOneName="va_without_ph_right"
          inputTwoName="va_without_ph_left"
          labelName="VA Without P/H"
        />
        <InputLeftRight
          register={register}
          errors={errors}
          inputOneName="va_with_glass_right"
          inputTwoName="va_with_glass_left"
          labelName="VA With Glass"
        />
        <EyeTestTable errors={errors} register={register} />

        <CustomInputWithLabel
          error={""}
          {...register("remark")}
          label="Remark"
          placeholder="Enter value1"
          type="text"
          fullWidth
        />
        <Button
          sx={{ width: "100%" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
