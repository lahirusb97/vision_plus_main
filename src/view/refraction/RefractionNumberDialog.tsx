import {
  Paper,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
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
import { useEffect } from "react";

interface RefractionNumberDialogProps {
  open: boolean;
  onClose: () => void;
  nic: string | null;
  mobile: string | null;
  name: string;
  patientId?: number;
}

export default function RefractionNumberDialog({
  open,
  onClose,
  nic,
  mobile,
  name,
}: RefractionNumberDialogProps) {
  const navigate = useNavigate();
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();

  const methods = useForm<RefractionNumberFormModel>({
    resolver: zodResolver(schemaRefractionNumber),
    defaultValues: {
      customer_full_name: "",
      customer_mobile: null,
      nic: null,
      branch_id: getUserCurentBranch()?.id,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  useEffect(() => {
    if (open) {
      setValue("customer_full_name", name);
      setValue("customer_mobile", mobile || "");
      setValue("nic", nic);
    } else {
      reset({
        customer_full_name: "",
        customer_mobile: "",
        nic: null,
        branch_id: getUserCurentBranch()?.id,
      });
    }
  }, [name, mobile, nic, open]);
  const sendRefractionData = async (data: RefractionNumberFormModel) => {
    try {
      const responseData: { data: { data: RefractionNumberModel } } =
        await postHandler("refractions/create/", data);

      // console.log(responseData.data.data);
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

  const handleSubmitForm = async (data: RefractionNumberFormModel) => {
    await sendRefractionData(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Generate Refraction Number</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <DialogContent>
            <TextField
              {...register("customer_full_name")}
              fullWidth
              label="Customer Name"
              variant="outlined"
              margin="normal"
              required
              error={!!errors.customer_full_name}
              helperText={errors.customer_full_name?.message}
              size="small"
              InputLabelProps={{
                shrink: Boolean(watch("customer_full_name")),
              }}
            />
            <TextField
              {...register("nic")}
              fullWidth
              label="NIC"
              variant="outlined"
              margin="normal"
              error={!!errors.nic}
              helperText={errors.nic?.message}
              size="small"
            />
            <TextField
              {...register("customer_mobile")}
              fullWidth
              label="Phone Number"
              variant="outlined"
              margin="normal"
              type="text"
              error={!!errors.customer_mobile}
              helperText={errors.customer_mobile?.message}
              size="small"
              InputLabelProps={{
                shrink: Boolean(watch("customer_mobile")),
              }}
            />
            <TextField
              sx={{ display: "none" }}
              inputProps={{
                min: 0,
              }}
              {...register("branch_id", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              label="Branch Id"
              type="number"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.branch_id}
              helperText={errors.branch_id?.message}
              size="small"
              defaultValue={getUserCurentBranch()?.id}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button onClick={onClose} color="error" variant="outlined">
              Cancel
            </Button>
            <SubmitCustomBtn
              btnText="Generate Refraction Number"
              loading={postHandlerloading}
              isError={postHandlerError}
            />
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
