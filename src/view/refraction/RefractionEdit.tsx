<<<<<<< HEAD
import { useForm, Controller } from "react-hook-form";
import CustomInputWithLabel from "../../components/CustomInputWithLabel";
import CustomInput from "../../components/CustomInput";
import { Box, Button } from "@mui/material";

export default function RefractionEdit() {
  const { id } = useParams();

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
    right_eye_dist_cyl: Yup.string().required(
      "Right Eye Distance Cyl is required"
    ),
    right_eye_dist_axis: Yup.string().required(
      "Right Eye Distance Axis is required"
    ),
    right_eye_near_sph: Yup.string().required("Right Eye Near Sph is required"),
    left_eye_dist_sph: Yup.string().required(
      "Left Eye Distance Sph is required"
    ),
    left_eye_dist_cyl: Yup.string().required(
      "Left Eye Distance Cyl is required"
    ),
    left_eye_dist_axis: Yup.string().required(
      "Left Eye Distance Axis is required"
    ),
    left_eye_near_sph: Yup.string().required("Left Eye Near Sph is required"),
    remark: Yup.string(),
  });

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
=======
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);

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
>>>>>>> main
  };

  return (
    <Box sx={{ minWidth: "1000px", padding: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors && Object.keys(errors).length > 0 && (
          <div>
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key].message}</p>
            ))}
          </div>
        )}
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
