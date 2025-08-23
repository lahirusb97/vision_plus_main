import { TextField, FormControlLabel, Switch, Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaPatientFormModel,
  PatientFormModel,
} from "../../validations/schemaPartient";
import SubmitCustomBtn from "../../components/common/SubmiteCustomBtn";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getBirthdateFromNIC } from "../../utils/NictoBirthday";
import CustomDateInput from "../inputui/CustomDateInput";

interface PatientFormProps {
  dataOnSubmit: (data: PatientFormModel) => void;
  isLoading: boolean;
  isError: boolean;
  initialData?: Partial<PatientFormModel>;
}

export default function PatientForm({
  dataOnSubmit,
  isLoading,
  isError,
  initialData = {},
}: PatientFormProps) {
  const [isQuickForm, setIsQuickForm] = useState(true);

  const methods = useForm<PatientFormModel>({
    resolver: zodResolver(schemaPatientFormModel),
    defaultValues: {
      name: "",
      date_of_birth: null,
      phone_number: "",
      address: "",
      nic: "",
      patient_note: "",
      extra_phone_number: "",
      ...initialData,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = methods;

  useEffect(() => {
    reset({
      name: "",
      date_of_birth: null,
      phone_number: "",
      address: "",
      nic: "",
      patient_note: "",
      extra_phone_number: "",
      ...initialData,
    });
  }, [initialData]);

  const handleSubmitForm = async (data: PatientFormModel) => {
    dataOnSubmit(data);
  };

  useEffect(() => {
    if (watch("nic") !== "") {
      setValue("date_of_birth", getBirthdateFromNIC(watch("nic")));
    } else {
      setValue("date_of_birth", null);
    }
  }, [watch("nic")]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={!isQuickForm}
                  onChange={(e) => setIsQuickForm(!e.target.checked)}
                  color="primary"
                />
              }
              label={isQuickForm ? "Quick Form" : "Full Form"}
              labelPlacement="start"
            />
          </Box>

          <TextField
            {...register("name")}
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            required
            error={!!errors.name}
            helperText={errors.name?.message}
            size="small"
            InputLabelProps={{
              shrink: Boolean(watch("name")),
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
            InputLabelProps={{
              shrink: Boolean(watch("nic")),
            }}
          />

          <TextField
            {...register("phone_number")}
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
            size="small"
            InputLabelProps={{
              shrink: Boolean(watch("phone_number")),
            }}
          />

          <TextField
            {...register("extra_phone_number")}
            fullWidth
            label="Alternate Phone Number"
            variant="outlined"
            margin="normal"
            error={!!errors.extra_phone_number}
            helperText={errors.extra_phone_number?.message}
            size="small"
            InputLabelProps={{
              shrink: Boolean(watch("extra_phone_number")),
            }}
          />

          {!isQuickForm && (
            <>
              <CustomDateInput
                label="Date of Birth"
                name="date_of_birth"
                disabledInput={false}
              />

              <TextField
                {...register("address")}
                fullWidth
                label="Address"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                error={!!errors.address}
                helperText={errors.address?.message}
                size="small"
                InputLabelProps={{
                  shrink: Boolean(watch("address")),
                }}
              />

              <TextField
                {...register("patient_note")}
                fullWidth
                label="Patient Notes"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                error={!!errors.patient_note}
                helperText={errors.patient_note?.message}
                size="small"
                InputLabelProps={{
                  shrink: Boolean(watch("patient_note")),
                }}
              />
            </>
          )}

          <SubmitCustomBtn
            btnText="Save Patient"
            loading={isLoading}
            isError={isError}
          />
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
