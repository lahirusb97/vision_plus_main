<<<<<<< HEAD
import { useForm, Controller } from "react-hook-form";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import CustomInput from "../../components/CustomInput";
import { Box, Button } from "@mui/material";
=======
import React from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/inputui/CustomInput";
import CustomInputWithLabel from "../../components/inputui/CustomInputWithLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import HbRxInput from "../../components/inputui/HbRxInput";
import InputLeftRight from "../../components/inputui/InputLeftRight";
import { useParams } from "react-router";
import EyeTestTable from "../../components/EyeTestTable";
import { usePostApiCall } from "../../hooks/usePostApiCall";
import axiosClient from "../../axiosClient";

// Validation Schema
>>>>>>> main

export default function RefractionEdit() {
  const { id } = useParams();

  const validationSchema = Yup.object().shape({
    hb_rx_right_dist: Yup.string(),
    hb_rx_left_dist: Yup.string(),
    hb_rx_right_near: Yup.string(),
    hb_rx_left_near: Yup.string(),
    auto_ref_right: Yup.string(),
    auto_ref_left: Yup.string(),
    ntc_right: Yup.string(),
    ntc_left: Yup.string(),
    va_without_glass_right: Yup.string(),
    va_without_glass_left: Yup.string(),
    va_without_ph_right: Yup.string(),
    va_without_ph_left: Yup.string(),
    va_with_glass_right: Yup.string(),
    va_with_glass_left: Yup.string(),
    right_eye_dist_sph: Yup.string(),
    right_eye_dist_cyl: Yup.string(),
    right_eye_dist_axis: Yup.string(),
    right_eye_near_sph: Yup.string(),
    left_eye_dist_sph: Yup.string(),
    left_eye_dist_cyl: Yup.string(),
    left_eye_dist_axis: Yup.string(),
    left_eye_near_sph: Yup.string(),
    remark: Yup.string(),
  });

  const {
    register,
    handleSubmit,
<<<<<<< HEAD
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // Handle form submission
=======
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const responseData = axiosClient.post(`/refraction-details/create/`, {
        ...data,
        refraction: id,
      });

      console.log((await responseData).status);
    } catch (error) {
      if (error.response) {
        // Extract and log backend error details
        console.error("Backend Error:", error.response.data.refraction[0]); // Full error details
      } else {
        // Handle network or unexpected errors
        console.error("Request Error:", error.message);
      }
    }
>>>>>>> main
  };

  return (
    <Box sx={{ minWidth: "1000px", padding: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HbRxInput register={register} errors={errors} />

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
        <EyeTestTable register={register} />

        <CustomInputWithLabel
          {...register("remark")}
          label="Remark"
          placeholder="Enter value1"
          type="text"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
}
