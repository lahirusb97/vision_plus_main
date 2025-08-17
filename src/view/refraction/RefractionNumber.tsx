import {
  Paper,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
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
import { SearchSharp } from "@mui/icons-material";
import { useState } from "react";
import FilterPatientDetails from "../../components/refreaction/FilterPatientDetails";

export default function RefractionNumber() {
  //API CALLS
  const navigate = useNavigate();
  //API CALLS
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const [openSearchDialog, setOpenSearchDialog] = useState({
    open: false,
    searchType: "",
  });

  // Create form methods
  const methods = useForm<RefractionNumberFormModel>({
    resolver: zodResolver(schemaRefractionNumber),
    defaultValues: {
      customer_full_name: "",
      customer_mobile: "",
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

  const handlePatientSelect = (patient: any) => {
    setValue("customer_full_name", patient.name);
    setValue("customer_mobile", patient.phone_number);
    setValue("nic", patient.nic);
  };

  return (
    <FormProvider {...methods}>
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
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setOpenSearchDialog({
                          open: true,
                          searchType: "name",
                        })
                      }
                    >
                      <SearchSharp />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setOpenSearchDialog({
                          open: true,
                          searchType: "nic",
                        })
                      }
                    >
                      <SearchSharp />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: Boolean(watch("nic")),
              }}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setOpenSearchDialog({
                          open: true,
                          searchType: "phone_number",
                        })
                      }
                    >
                      <SearchSharp />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
            <SubmitCustomBtn
              btnText="Genarate Refraction Number"
              loading={postHandlerloading}
              isError={postHandlerError}
            />
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => {
                reset({
                  customer_full_name: "",
                  customer_mobile: "",
                  nic: null,
                  branch_id: getUserCurentBranch()?.id,
                });
              }}
            >
              Clear Form
            </Button>
          </form>
        </Paper>
        <FilterPatientDetails
          open={openSearchDialog.open}
          searchType={openSearchDialog.searchType}
          handleClose={() =>
            setOpenSearchDialog({ open: false, searchType: "" })
          }
          onPatientSelect={handlePatientSelect}
        />
      </Box>
    </FormProvider>
  );
}
