import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField, Box, Typography, Paper } from "@mui/material";
import {
  OtherIncomeForm,
  schemaOtherIncome,
} from "../../../validations/schemaOtherIncome";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import SaveButton from "../../../components/SaveButton";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import BackButton from "../../../components/BackButton";

const OtherincomeCreate = () => {
  const { postHandler, postHandlerloading } = useAxiosPost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OtherIncomeForm>({
    resolver: zodResolver(schemaOtherIncome),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: OtherIncomeForm) => {
    try {
      await postHandler("other-income-categories/", data);
      toast.success("Other Income Created Successfully");
      reset();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Create Other Income Category
      </Typography>
      <BackButton />
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={2}
          margin="normal"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <SaveButton
          btnText="Create Other Income"
          loading={postHandlerloading}
        />
      </Box>
    </Paper>
  );
};

export default OtherincomeCreate;
