import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

import axiosClient from "../../../axiosClient";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPatch } from "../../../hooks/useAxiosPatch";
import BackButton from "../../../components/BackButton";
import SaveButton from "../../../components/SaveButton";
import {
  schemaOtherIncome,
  OtherIncomeForm,
} from "../../../validations/schemaOtherIncome";

export default function OtherIncomeUpdate() {
  const { other_income_category_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { patchHandler, patchHandlerloading } = useAxiosPatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<OtherIncomeForm>({
    resolver: zodResolver(schemaOtherIncome),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchOtherIncome = async () => {
      try {
        const response = await axiosClient.get(
          `other-income-categories/${other_income_category_id}/`
        );
        const data = response.data;
        reset({
          name: data.name,
          description: data.description,
        });
        toast.success("Other Income loaded Successfully");
      } catch (error) {
        extractErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOtherIncome();
  }, [other_income_category_id]);

  const onSubmit = async (data: OtherIncomeForm) => {
    try {
      await patchHandler(
        `other-income-categories/${other_income_category_id}/`,
        data
      );
      toast.success("Other Income Updated Successfully");
      navigate(-1);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ minWidth: 400, mx: "auto", p: 4, mt: 6 }}>
      <BackButton />
      <Typography variant="h6" gutterBottom>
        Update Other Income
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          InputLabelProps={{
            shrink: Boolean(watch("name")),
          }}
        />

        <TextField
          label="Description"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          multiline
          rows={2}
          InputLabelProps={{
            shrink: Boolean(watch("description")),
          }}
        />

        <SaveButton btnText="Update Income" loading={patchHandlerloading} />
      </Box>
    </Paper>
  );
}
