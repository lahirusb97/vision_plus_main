import {
  Box,
  TextField,
  Button,
  Typography,
  Input,
  Paper,
  CircularProgress,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm, Controller, FormProvider } from "react-hook-form";
import useGetDoctors from "../../../hooks/useGetDoctors";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChannelAppointmentSchema } from "../../../validations/schemaChannelAppointment";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import ChannelPatientDetail from "../apointments/ChannelPatientDetail";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import AppointmentDatePicker from "../../../components/AppointmentDatePicker";
import useGetAppointmentSlots from "../../../hooks/useGetAppointmentSlots";
import { TimePicker } from "@mui/x-date-pickers";
import BookedTimeSlotsDropdown from "../../../components/common/BookedTimeSlotsDropdown";
import PaymentMethodsLayout from "../../transaction/factory_layouts/PaymentMethodsLayout";
import useGetSingleAppointment from "../../../hooks/useGetSingleAppointment";
import { useEffect } from "react";
import stringToIntConver from "../../../utils/stringToIntConver";
import { channelPaymentsTotal } from "../../../utils/channelPaymentsTotal";
import PaymentsForm from "../../../components/common/PaymentsForm";
import { schemayPaymentUpdateDelete } from "../../../validations/schemayPaymentUpdateDelete";
import z from "zod";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import AutocompleteInputWrapper from "../../../components/common/AutocompleteInputWrapper";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import LoadingAnimation from "../../../components/LoadingAnimation";
import DataLoadingError from "../../../components/common/DataLoadingError";
import { useReminderDialog } from "../../../context/ReminderDialogContext";
import ChannelDeleteRefund from "../../../components/common/channel-delete-refund-dialog/ChannelDeleteRefund";
import useGetSingleDoctorFees from "../../../hooks/useGetSingleDoctorFees";
import { numberWithCommas } from "../../../utils/numberWithCommas";

const AppointmentFullEdit = () => {
  const { appointment_id } = useParams();
  const { showReminder } = useReminderDialog();
  const { singleDoctorFees, singleDoctorFeesLoading, singleUserDataRefresh } =
    useGetSingleDoctorFees();
  useEffect(() => {
    showReminder();
  }, []);
  const { putHandler, putHandlerError, putHandlerloading } = useAxiosPut();

  const { data: doctorList, loading } = useGetDoctors();
  const {
    singleAppointment,
    singleAppointmentLoading,
    singleAppointmentError,
  } = useGetSingleAppointment(appointment_id);
  const {
    appointmentSlots,
    appointmentSlotsLoading,
    appointmentSlotsError,
    getAppointmentSlots,
  } = useGetAppointmentSlots();

  const navigate = useNavigate();
  const channelAppointmentEditForm = ChannelAppointmentSchema.extend({
    payments: z.array(schemayPaymentUpdateDelete),
  });
  const methods = useForm<z.infer<typeof channelAppointmentEditForm>>({
    resolver: zodResolver(channelAppointmentEditForm),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
      branch_id: getUserCurentBranch()?.id,
    },
  });

  const { control, watch } = methods;

  const onSubmit = async (data: z.infer<typeof channelAppointmentEditForm>) => {
    const channelDate = dayjs(data.channel_date).format("YYYY-MM-DD");

    const userPayments = {
      credit_card: data.credit_card,
      cash: data.cash,
      online_transfer: data.online_transfer,
    };
    const payload = {
      doctor_id: data.doctor_id,
      branch_id: data.branch_id,
      name: data.name,
      address: data.address,
      contact_number: data.phone_number,
      channel_date: channelDate,
      time: data.channel_time.format("HH:mm:ss"),
      note: data.note,
      channeling_fee: data.branch_fees + data.doctor_fees,
      doctor_fees: data.doctor_fees,
      branch_fees: data.branch_fees,
      payments: [...formatUserPayments(userPayments), ...data.payments],
    };

    try {
      const response = await putHandler(
        `/channels/${appointment_id}/update/`,
        payload
      );
      toast.success("Channel updated successfully");
      navigate(`/channel/channel_invoice/${response.data.appointment.id}`); //!! apointment ID
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  const doctorFees = Number(methods.watch("doctor_fees") || 0);
  const branchFees = Number(methods.watch("branch_fees") || 0);
  const cashAmount = Number(methods.watch("cash") || 0);
  const cardAmount = Number(methods.watch("credit_card") || 0);
  const onlineAmount = Number(methods.watch("online_transfer") || 0);

  const reloadAppointmentSlots = () => {
    if (watch("doctor_id") && watch("channel_date")) {
      getAppointmentSlots(
        dayjs(watch("channel_date")).format("YYYY-MM-DD"),
        watch("doctor_id")
      );
    }
  };

  useEffect(() => {
    if (singleAppointment) {
      methods.setValue("name", singleAppointment.patient_name);
      methods.setValue("phone_number", singleAppointment.contact_number);
      methods.setValue("address", singleAppointment.address);

      //   methods.setValue("channel_date", singleAppointment.channel_date);
      //   methods.setValue("channel_time", singleAppointment.time);
      methods.setValue(
        "doctor_fees",
        stringToIntConver(singleAppointment.amount)
      );
      methods.setValue(
        "branch_fees",
        stringToIntConver(singleAppointment.amount)
      );
      //add doctor
      methods.setValue("doctor_id", singleAppointment.doctor);
      //date
      methods.setValue("channel_date", singleAppointment.date);
      methods.setValue(
        "channel_time",
        dayjs(singleAppointment.time, "HH:mm:ss")
      );
      methods.setValue("note", singleAppointment.note);
      methods.setValue(
        "payments",
        singleAppointment.payments.map((payment) => ({
          id: payment.id,
          amount: stringToIntConver(payment.amount),
          payment_method: payment.payment_method,
          is_final: payment.is_final,
          payment_date: payment.payment_date,
        }))
      );
    }
  }, [singleAppointment]);
  useEffect(() => {
    if (singleDoctorFees) {
      methods.setValue("doctor_fees", Number(singleDoctorFees.doctor_fees));
      methods.setValue("branch_fees", Number(singleDoctorFees.branch_fees));
     
    }
  }, [singleDoctorFees]);
  useEffect(() => {
    if (watch("doctor_id")) {
      singleUserDataRefresh({
        doctor_id: watch("doctor_id"),
        branch_id: Number(getUserCurentBranch()?.id),
      });
      reloadAppointmentSlots();
    }
  }, [watch("doctor_id")]);
  if (singleAppointmentLoading) {
    return <LoadingAnimation loadingMsg="Loading Appointment" />;
  }
  if (singleAppointmentError) {
    return <DataLoadingError />;
  }
  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          width: "100%",
          margin: 1,
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "#fff",
          border: "1px solid #E0E0E0",
        }}
      >
        {/* Section Title */}
        <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
          Appointment Details
        </Typography>

        {/* Doctor and Patient Information Group */}
        <form
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {/* Doctor Name */}

          <ChannelPatientDetail />

          <Controller
            name="doctor_id" // Field name in the form
            control={control} // Pass the control from useForm
            render={({ field }) => (
              <AutocompleteInputWrapper
                {...field} // Spread the field props (value and onChange)
                options={doctorList} // Pass the options array
                loading={loading} // Pass the loading state
                labelName="Choose a Doctor" // Label for the input field
                value={doctorList.find((opt) => opt.id === field.value) || null}
                onChange={(newValue) => {
                  field.onChange(newValue ? newValue.id : null);
                  if (newValue && watch("channel_date")) {
                    getAppointmentSlots(
                      dayjs(watch("channel_date")).format("YYYY-MM-DD"),
                      newValue.id
                    );
                  }
                }}
              />
            )}
          />
          {/* Date and Time Pickers (flex row) */}

          <Paper sx={flexBoxStyle}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="channel_date"
                control={control}
                render={({ field }) => (
                  <AppointmentDatePicker
                    selectedDate={
                      field.value
                        ? dayjs(field.value).format("YYYY-MM-DD")
                        : null
                    }
                    sheduleStatus="DOCTOR"
                    onDateChange={(newValue) => {
                      field.onChange(newValue); // Pass selected date to react-hook-form
                      if (newValue && watch("doctor_id")) {
                        getAppointmentSlots(
                          dayjs(newValue).format("YYYY-MM-DD"),
                          watch("doctor_id")
                        );
                      }
                    }}
                    label="Date"
                    doctorId={watch("doctor_id") || undefined} // Set doctorId or pass it as a prop
                  />
                )}
              />
            </LocalizationProvider>
            {appointmentSlots && (
              <BookedTimeSlotsDropdown
                doctorId={watch("doctor_id") || null}
                appointmentSlots={appointmentSlots?.appointments || []}
                appointmentSlotsLoading={appointmentSlotsLoading}
              />
            )}
            <Box>
              {watch("doctor_id") && watch("channel_date") && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Avilable Number{" - "}
                  {/* {appointmentSlotsLoading&& <CircularProgress size={20} />} */}
                  {appointmentSlotsLoading && <CircularProgress size={20} />}
                  {!appointmentSlotsLoading && appointmentSlotsError && (
                    <Button
                      size="small"
                      onClick={reloadAppointmentSlots}
                      variant="contained"
                      color="error"
                    >
                      Try Again
                    </Button>
                  )}
                  {!appointmentSlotsError && !appointmentSlotsLoading && (
                    <>
                      <Typography>
                        {appointmentSlots?.total_appointments
                          ? appointmentSlots?.total_appointments + 1
                          : "1"}
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="channel_time"
                          control={control}
                          render={({ field, fieldState }) => (
                            <TimePicker
                              label="Channel Time"
                              value={field.value ? dayjs(field.value) : null}
                              onChange={(time) => {
                                field.onChange(time);
                              }}
                              slotProps={{
                                textField: {
                                  error: !!fieldState.error,
                                  helperText: fieldState.error?.message,
                                  size: "small",
                                  sx: { width: 200 },
                                },
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </>
                  )}
                </Box>
              )}
            </Box>
          </Paper>
          <Box sx={flexBoxStyle}>
            <Typography
              variant="body2"
              sx={{
                gap: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Billed Consultant Fee
            </Typography>
            <Typography variant="body2">
              {numberWithCommas(singleAppointment?.doctor_fees || 0)}
            </Typography>
          </Box>
          <Box sx={flexBoxStyle}>
            <Typography
              variant="body2"
              sx={{
                gap: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Billed Establishment Fee
            </Typography>
            <Typography variant="body2">
              {numberWithCommas(singleAppointment?.branch_fees || 0)}
            </Typography>
          </Box>

          <Box sx={flexBoxStyle}>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                gap: 2,
                display: "flex",
                justifyContent: "space-between",
                py: 0.5,
                px: 1,
              }}
            >
              Consultant Fee
            </Typography>

            <Input
              type="number"
              sx={{ gap: 1 }}
              {...methods.register("doctor_fees", { valueAsNumber: true })}
            />
          </Box>
          <Box sx={flexBoxStyle}>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                gap: 2,
                display: "flex",
                justifyContent: "space-between",
                py: 0.5,
                px: 1,
              }}
            >
              Establishment Fee
            </Typography>

            <Input
              type="number"
              sx={{ gap: 1 }}
              {...methods.register("branch_fees", { valueAsNumber: true })}
            />
          </Box>

          {/* Total Payment */}

          <Box sx={flexBoxStyle}>
            <Typography
              variant="body2"
              sx={{
                gap: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Total Payment
            </Typography>
            <Typography variant="body2">
              {channelPaymentsTotal(singleAppointment?.payments || [])}
            </Typography>
          </Box>

          {/* CUrrent Payment */}
          <Box sx={flexBoxStyle}>
            <Typography
              variant="body2"
              sx={{
                gap: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Current Payment
            </Typography>
            <Typography variant="body2">
              {cashAmount + cardAmount + onlineAmount}
            </Typography>
          </Box>
          {/* Balance */}

          <Box sx={flexBoxStyle}>
            <Typography
              variant="body2"
              sx={{
                gap: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Balance
            </Typography>

            <Typography variant="body2">
              {doctorFees +
                branchFees -
                (cashAmount +
                  cardAmount +
                  onlineAmount +
                  channelPaymentsTotal(
                    methods.watch("payments")?.map((payment) => ({
                      amount: payment.amount.toString(),
                    })) || []
                  ))}
            </Typography>
          </Box>
          {/* Channel Refund */}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ChannelDeleteRefund
              dialogType="both"
              appointment_id={appointment_id}
            />
          </Box>

          {/* Payment Method */}
          <PaymentsForm />
          <Box sx={flexBoxStyle}>
            <PaymentMethodsLayout />
          </Box>
          <TextField
            sx={{ display: "none" }}
            inputProps={{
              min: 0,
            }}
            {...methods.register("branch_id", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
            label="Branch Id"
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            defaultValue={getUserCurentBranch()?.id}
          />
          {/* Submit Button */}
          <SubmitCustomBtn
            btnText="Update Appointment"
            isError={putHandlerError}
            loading={putHandlerloading}
          />
        </form>
      </Box>
    </FormProvider>
  );
};

export default AppointmentFullEdit;
const flexBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
