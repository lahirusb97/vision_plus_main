import { Paper, TextField, Box, Typography } from "@mui/material";
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
import { useValidationState } from "../../hooks/validations/useValidationState";
import VarificationDialog from "../../components/VarificationDialog";
import SaveButton from "../../components/SaveButton";
import { RefractionNumberModel } from "../../model/RefractionModel";

export default function RefractionNumber() {
  const navigate = useNavigate();
  //API CALLS
  const { postHandler } = useAxiosPost();
  const { setValidationState, resetValidation, validationState } =
    useValidationState();
  //API CALLS

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RefractionNumberFormModel>({
    resolver: zodResolver(schemaRefractionNumber),
  });

  const sendRefractionData = async (data: RefractionNumberFormModel) => {
    try {
      const responseData: { data: { data: RefractionNumberModel } } =
        await postHandler("refractions/create/", data);

      toast.success(
        `Refraction created for ${responseData.data.data.customer_full_name}`
      );
      reset();
      navigate(`${responseData.data.data.id}/success/`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  const shandleSubmit = async (data: RefractionNumberFormModel) => {
    setValidationState({
      openValidationDialog: true,
      validationType: "user",
      apiCallFunction: () => sendRefractionData(data),
    });
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
        <Typography variant="h6" gutterBottom align="center">
          Customer Details
        </Typography>
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
            required
            type="number"
            error={!!errors.customer_mobile}
            helperText={errors.customer_mobile?.message}
          />
          {/* <TextField
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
                  /> */}
          <SaveButton btnText="Genarate Refraction Number" loading={false} />
        </form>
        <VarificationDialog
          validationState={validationState}
          resetValidation={resetValidation}
        />
      </Paper>
    </Box>
  );
}
