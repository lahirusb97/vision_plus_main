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
} from "@mui/material";
import {
  DoctorFormModel,
  doctorSchema,
} from "../../../validations/schemaDoctor";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import BackButton from "../../../components/BackButton";
import { useNavigate } from "react-router";

// Zod validation schema

const DoctorCreate = () => {
  const navigate = useNavigate();
  const { postHandler, postHandlerloading } = useAxiosPost();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DoctorFormModel>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      status: "available",
    },
  });

  const handleFormSubmit = async (data: DoctorFormModel) => {
    try {
      postHandler("doctors/", data);
      toast.success("Doctor created successfully");
      reset();
      navigate(-1);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <BackButton />
      <Typography variant="h5" component="h2" gutterBottom>
        Add New Doctor
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
          autoFocus
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={postHandlerloading}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Number"
          type="number"
          {...register("contact_info")}
          error={!!errors.contact_info}
          helperText={errors.contact_info?.message}
          disabled={postHandlerloading}
        />

        <FormControl fullWidth margin="normal" error={!!errors.status}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            {...register("status")}
            defaultValue="available"
            disabled={postHandlerloading}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="unavailable">Unavailable</MenuItem>
          </Select>
          {errors.status && (
            <FormHelperText>{errors.status.message}</FormHelperText>
          )}
        </FormControl>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            disabled={postHandlerloading}
            sx={{ minWidth: 120 }}
          >
            {postHandlerloading ? "Saving..." : "Save Doctor"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default DoctorCreate;
