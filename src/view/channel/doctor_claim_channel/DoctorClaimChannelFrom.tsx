import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import {
  DoctorClaimChannelFormModel,
  schemaDoctorClaimChannel,
} from "../../../validations/schemaDoctorClaimChannel";
import TitleText from "../../../components/TitleText";
import { FormProvider } from "react-hook-form";
import MiniPatientDetails from "../../transaction/doctor_claim_invoice/MiniPatientDetails";
import CashInput from "../../../components/inputui/CashInput";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setDoctorClaimChannel } from "../../../features/invoice/doctorClaimChannelSlice";
import { useNavigate } from "react-router";

export default function DoctorClaimChannelFrom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm<DoctorClaimChannelFormModel>({
    resolver: zodResolver(schemaDoctorClaimChannel),
    defaultValues: {
      invoice_number: "",
      name: "",
      phone_number: "",
      address: "",
      channel_date: "",
      channel_time: "",
      channeling_fee: 0,
      online_transfer: 0,
      credit_card: 0,
      cash: 0,
    },
  });
  const {
    register,
    setValue,
    formState: { errors },
  } = methods;
  const handleInvoiceSubmite = (data: DoctorClaimChannelFormModel) => {
    const payload = {
      ...data,
      date: dayjs(data.channel_date).format("YYYY-MM-DD"),
    };
    dispatch(setDoctorClaimChannel(payload));
    navigate(`${payload.invoice_number}`);
  };
  console.log(methods.watch("channel_date"));
  return (
    <Paper sx={{ p: 2 }}>
      <TitleText title="Doctor Claim Channel Form" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleInvoiceSubmite)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              minWidth: 400,
              mt: 1,
            }}
          >
            <TextField
              {...methods.register("invoice_number")}
              sx={{ width: 200 }}
              size="small"
              label="Invoice Number"
            />
            <MiniPatientDetails />

            <Box sx={{ display: "flex", gap: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="channel_date"
                  control={methods.control}
                  render={({ field }) => (
                    <DatePicker
                      sx={{ width: 150 }}
                      label="Channel Date"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(date?.format("YYYY-MM-DD"));
                      }}
                      format="YYYY-MM-DD"
                      slotProps={{
                        textField: {
                          fullWidth: false,
                          size: "small",
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="channel_time"
                  control={methods.control}
                  render={({ field }) => (
                    <TimePicker
                      label="Channel Time"
                      value={field.value ? dayjs(field.value, "hh:mm A") : null}
                      onChange={(newValue) => {
                        const formattedTime = newValue
                          ? newValue.format("hh:mm A:")
                          : null;
                        field.onChange(formattedTime);
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: false,
                          size: "small",
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Doctor Channeling Fee</Typography>
              <TextField
                {...register("channeling_fee", {
                  valueAsNumber: true,
                  min: 0,
                  required: true,
                })}
                inputProps={{ min: 0 }}
                label="Channeling Fee"
                variant="outlined"
                size="small"
                type="number"
                placeholder="Enter amount"
                sx={{ width: 120 }}
                onFocus={(e) => {
                  if (e.target.value === "0") {
                    setValue("channeling_fee", "");
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setValue("channeling_fee", 0);
                  }
                }}
                error={!!errors.channeling_fee}
                helperText={
                  typeof errors.channeling_fee?.message === "string"
                    ? errors.channeling_fee.message
                    : ""
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Payment</Typography>
              <CashInput />
            </Box>
          </Box>
          <Button fullWidth sx={{ mt: 2 }} type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </FormProvider>
    </Paper>
  );
}
