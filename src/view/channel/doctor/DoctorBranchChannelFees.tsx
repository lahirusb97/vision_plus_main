import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router";
import {
  DoctorBranchFeesFormModel,
  doctorBranchFeesSchema,
  DoctorFormModel,
} from "../../../validations/schemaDoctor";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPatch } from "../../../hooks/useAxiosPatch";
import toast from "react-hot-toast";
import BackButton from "../../../components/BackButton";
import useGetSingleDoctorFees from "../../../hooks/useGetSingleDoctorFees";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";

const DoctorBranchChannelFees = () => {
  const { doctor_id } = useParams<{ doctor_id: string }>();
  const navigate = useNavigate();

  const { singleDoctorFees, singleDoctorFeesLoading, singleUserDataRefresh } =
    useGetSingleDoctorFees();
  console.log(singleDoctorFees);

  // Update handler
  const { patchHandler, patchHandlerloading, patchHandlerError } =
    useAxiosPatch();
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DoctorBranchFeesFormModel>({
    resolver: zodResolver(doctorBranchFeesSchema),
    defaultValues: {
      doctor_fees: 0,
      branch_fees: 0,
    },
  });

  useEffect(() => {
    if (doctor_id) {
      singleUserDataRefresh({
        doctor_id: Number(doctor_id),
        branch_id: Number(getUserCurentBranch()?.id),
      });
    }
  }, [doctor_id]);

  useEffect(() => {
    if (singleDoctorFees) {
      setValue("doctor_fees", parseInt(singleDoctorFees.doctor_fees) || 0);
      setValue("branch_fees", parseInt(singleDoctorFees.branch_fees) || 0);
    } else if (!singleDoctorFees && !singleDoctorFeesLoading) {
      // Set default values when no data is found
      setValue("doctor_fees", 0);
      setValue("branch_fees", 0);
    }
  }, [singleDoctorFees, singleDoctorFeesLoading]);

  const handleFormSubmit = async (data: DoctorBranchFeesFormModel) => {
    try {
      if (singleDoctorFees) {
        await patchHandler(
          "channels/fees/" + singleDoctorFees.id + "/update/",
          data
        );
        toast.success("Doctor Updated successfully");
      } else {
        await postHandler("channels/fees/", {
          doctor: Number(doctor_id),
          branch: Number(getUserCurentBranch()?.id),
          doctor_fees: data.doctor_fees,
          branch_fees: data.branch_fees,
        });
        toast.success("Doctor Created successfully");
      }

      navigate(-1); // Redirect to doctors list after update
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  //! connect this to chenels fees also check full chanel edit apointment date deop downs
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <BackButton />
      <Typography variant="h5" component="h2" gutterBottom>
        Update Doctor Fees
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ mt: 2 }}
      >
        <TextField
          fullWidth
          margin="normal"
          label="Doctor Fees"
          autoFocus
          {...register("doctor_fees", {
            valueAsNumber: true,
          })}
          error={!!errors.doctor_fees}
          helperText={errors.doctor_fees?.message}
          disabled={patchHandlerloading}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Branch Fees"
          type="number"
          {...register("branch_fees", {
            valueAsNumber: true,
          })}
          error={!!errors.branch_fees}
          helperText={errors.branch_fees?.message}
          disabled={patchHandlerloading}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          {singleDoctorFees ? (
            <SubmitCustomBtn
              btnText="Update Doctor Fees"
              isError={patchHandlerError}
              loading={patchHandlerloading}
            />
          ) : (
            <SubmitCustomBtn
              btnText={"Create Doctor Fees"}
              isError={postHandlerError}
              loading={postHandlerloading}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default DoctorBranchChannelFees;
