import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router";
import {
  DoctorFormModel,
  doctorSchema,
} from "../../../validations/schemaDoctor";

import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import useGetSingleDoctor from "../../../hooks/useGetSingleDoctor";
import { useAxiosPatch } from "../../../hooks/useAxiosPatch";
import toast from "react-hot-toast";
import BackButton from "../../../components/BackButton";

const DoctorUpdate = () => {
  const { doctor_id } = useParams<{ doctor_id: string }>();
  const navigate = useNavigate();

  const { singleDoctor, singleDoctorLoading } = useGetSingleDoctor(doctor_id);
  // Update handler
  const { patchHandler, patchHandlerloading } = useAxiosPatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    setValue,
  } = useForm<DoctorFormModel>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {},
  });

  // Populate form with existing data when fetched
  useEffect(() => {
    if (singleDoctor && !singleDoctorLoading) {
      setValue("name", singleDoctor.name);
      setValue("contact_info", singleDoctor.contact_info);
      setValue("status", singleDoctor.status);
    }
  }, [singleDoctor, singleDoctorLoading]);

  const handleFormSubmit = async (data: DoctorFormModel) => {
    try {
      await patchHandler("doctors/" + doctor_id + "/", data);
      toast.success("Doctor Updated successfully");

      navigate(-1); // Redirect to doctors list after update
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <BackButton />
      <Typography variant="h5" component="h2" gutterBottom>
        Update Doctor
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ mt: 2 }}
      >
        <TextField
          fullWidth
          margin="normal"
          label="Full Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={patchHandlerloading}
          InputLabelProps={{
            shrink: Boolean(watch("name")),
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Number"
          type="number"
          {...register("contact_info")}
          error={!!errors.contact_info}
          helperText={errors.contact_info?.message}
          disabled={patchHandlerloading}
          InputLabelProps={{
            shrink: Boolean(watch("contact_info")),
          }}
        />

        <FormControl fullWidth margin="normal" error={!!errors.status}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            {...register("status")}
            disabled={patchHandlerloading}
            value={watch("status") || ""}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="unavailable">Unavailable</MenuItem>
          </Select>
          {errors.status && (
            <FormHelperText>{errors.status.message}</FormHelperText>
          )}
        </FormControl>

        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            disabled={patchHandlerloading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={patchHandlerloading || !isDirty}
            sx={{ minWidth: 120 }}
          >
            {patchHandlerloading ? (
              <CircularProgress size={24} />
            ) : (
              "Update Doctor"
            )}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default DoctorUpdate;
