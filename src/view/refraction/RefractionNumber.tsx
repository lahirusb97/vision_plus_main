import { Paper, TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import {
  RefractionNumberFormModel,
  schemaRefractionNumber,
} from "../../validations/schemaRefractionNumber";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import { RefractionNumberModel } from "../../model/RefractionModel";
import { getUserCurentBranch } from "../../utils/authDataConver";
import TitleText from "../../components/TitleText";
import SubmitCustomBtn from "../../components/common/SubmiteCustomBtn";
export default function RefractionNumber() {
  //API CALLS
  const navigate = useNavigate();
  //API CALLS
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<RefractionNumberFormModel>({
    resolver: zodResolver(schemaRefractionNumber),
    defaultValues: {
      customer_full_name: "",
      customer_mobile: "",
      nic: null,
      branch_id: getUserCurentBranch()?.id,
    },
  });

  const sendRefractionData = async (data: RefractionNumberFormModel) => {
    try {
      const responseData: { data: { data: RefractionNumberModel } } =
        await postHandler("refractions/create/", data);

      toast.success(
        `Refraction created for ${responseData.data.data.customer_full_name}`
      );
      reset({
        customer_full_name: "",
        customer_mobile: "",
        nic: null,
        branch_id: getUserCurentBranch()?.id,
      });
      navigate(`${responseData.data.data.id}/success/`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  const shandleSubmit = async (data: RefractionNumberFormModel) => {
    await sendRefractionData(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: "100%",
          maxWidth: 500,
          borderRadius: 2,
        }}
      >
        <TitleText title="Genarate Refraction Number" />
        <form onSubmit={handleSubmit(shandleSubmit)}>
          <TextField
            {...register("customer_full_name")}
            fullWidth
            label="Customer Name"
            variant="outlined"
            margin="normal"
            required
            error={!!errors.customer_full_name}
            helperText={errors.customer_full_name?.message}
          />
          <TextField
            {...register(
              "nic"
            )} /* chalani- textfiled added and connected to use form hook*/
            fullWidth
            label="NIC"
            variant="outlined"
            margin="normal"
            error={!!errors.nic}
            helperText={errors.nic?.message}
          />
          <TextField
            {...register("customer_mobile")}
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            type="number"
            error={!!errors.customer_mobile}
            helperText={errors.customer_mobile?.message}
          />

          <TextField
            sx={{ display: "none" }}
            inputProps={{
              min: 0,
            }}
            {...register("branch_id", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
            label="Branch Id"
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.branch_id}
            helperText={errors.branch_id?.message}
            defaultValue={getUserCurentBranch()?.id}
          />
          <SubmitCustomBtn
            btnText="Genarate Refraction Number"
            loading={postHandlerloading}
            isError={postHandlerError}
          />
        </form>
      </Paper>
    </Box>
  );
}
