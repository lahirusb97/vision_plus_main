import React from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/inputui/CustomInput";
import CustomInputWithLabel from "../../components/inputui/CustomInputWithLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import HbRxInput from "../../components/inputui/HbRxInput";
import InputLeftRight from "../../components/inputui/InputLeftRight";

// Validation Schema
const validationSchema = Yup.object().shape({
  hb_rx_right_dist: Yup.string().required("HB Rx Right Dist is required"),
  hb_rx_left_dist: Yup.string().required("HB Rx Left Dist is required"),
  hb_rx_left_near: Yup.string().required("HB Rx Left Near is required"),
  hb_rx_right_near: Yup.string().required("HB Rx Right Near is required"),
});

export default function RefractionEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  return (
    <Box sx={{ minWidth: "1000px", padding: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HbRxInput register={register} errors={errors} />
        <InputLeftRight
          register={register}
          errors={errors}
          inputName="ntc"
          labelName="NTC"
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
}
