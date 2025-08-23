import { TextField, FormControlLabel, Switch, Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaPatientFormModel,
  PatientFormModel,
} from "../../validations/schemaPartient";
import SubmitCustomBtn from "../../components/common/SubmiteCustomBtn";
import { useEffect, useState } from "react";
import { getBirthdateFromNIC } from "../../utils/NictoBirthday";
import CustomDateInput from "../inputui/CustomDateInput";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { useAxiosPatch } from "../../hooks/useAxiosPatch";
import toast from "react-hot-toast";
import { PatientModel } from "../../model/Patient";

interface PatientFormProps {
  dataOnSubmit: (data: PatientModel) => void;
  initialData?: Partial<PatientFormModel>;
  patientId: number | null;
}

export default function PatientForm({
  dataOnSubmit,
  initialData = {},
  patientId,
}: PatientFormProps) {
  const [isQuickForm, setIsQuickForm] = useState(true);
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const { patchHandler, patchHandlerloading, patchHandlerError } =
    useAxiosPatch();

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
    if (patientId) {
      const response: { data: PatientModel } = await patchHandler(
        `patients/${patientId}/`,
        data
      );

      toast.success("Patient Updated Successfully");
      dataOnSubmit(response.data);
    } else {
      const response: { data: PatientModel } = await postHandler(
        "patients/create/",
        data
      );

      toast.success("Patient Created Successfully");
      dataOnSubmit(response.data);
    }
  };

  useEffect(() => {
    if (watch("nic") !== "") {
      setValue("date_of_birth", getBirthdateFromNIC(watch("nic")));
    } else {
      setValue("date_of_birth", null);
    }
  }, [watch("nic")]);

  return (
    <FormProvider {...methods}>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={!isQuickForm}
                onChange={(e) => setIsQuickForm(!e.target.checked)}
                color="primary"
              />
            }
            label={isQuickForm ? "Show All" : "hide All"}
            labelPlacement="start"
          />
        </Box>

        <TextField
          {...register("name")}
          fullWidth
          label="Full Name"
          variant="outlined"
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
          label="Extra Phone Number"
          variant="outlined"
          error={!!errors.extra_phone_number}
          helperText={errors.extra_phone_number?.message}
          size="small"
          InputLabelProps={{
            shrink: Boolean(watch("extra_phone_number")),
          }}
        />

        <Box sx={{ display: isQuickForm ? "none" : "flex", gap: "1rem",flexDirection: "column" }}>
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
            multiline
            rows={3}
            error={!!errors.patient_note}
            helperText={errors.patient_note?.message}
            size="small"
            InputLabelProps={{
              shrink: Boolean(watch("patient_note")),
            }}
          />
        </Box>

        <SubmitCustomBtn
          btnText="Save Patient"
          loading={postHandlerloading || patchHandlerloading}
          isError={postHandlerError || patchHandlerError}
        />
      </form>
    </FormProvider>
  );
}
