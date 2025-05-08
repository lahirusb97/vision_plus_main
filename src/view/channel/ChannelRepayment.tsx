import { useParams } from "react-router";
import useGetSingleAppointment from "../../hooks/useGetSingleAppointment";
import LoadingAnimation from "../../components/LoadingAnimation";
import DataLoadingError from "../../components/common/DataLoadingError";
import { Box, Paper, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { formatPaymentMethod } from "../../utils/formatPaymentMethod";
import { dateAndTimeFormat } from "../../utils/dateAndTimeFormat";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formatUserPayments } from "../../utils/formatUserPayments";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import PaymentMethodsLayout from "../transaction/factory_layouts/PaymentMethodsLayout";
import SubmitCustomBtn from "../../components/common/SubmiteCustomBtn";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";
import TitleText from "../../components/TitleText";
import { CustomToast } from "../../utils/customToast";
export default function ChannelRepayment() {
  const navigate = useNavigate();
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const { appointment_id } = useParams();
  const {
    singleAppointment,
    singleAppointmentLoading,
    singleAppointmentError,
  } = useGetSingleAppointment(appointment_id);

  const schemaPaymentForm = z.object({
    credit_card: z.number().min(0),
    cash: z.number().min(0),
    online_transfer: z.number().min(0),
  });

  const methods = useForm({
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
    },
    resolver: zodResolver(schemaPaymentForm),
  });
  type PaymentFormData = z.infer<typeof schemaPaymentForm>;

  if (singleAppointmentLoading) {
    return <LoadingAnimation loadingMsg="Loading Appointment Details" />;
  }
  if (singleAppointmentError && !singleAppointmentLoading) {
    return <DataLoadingError />;
  }

  const totalPreViusPayment = Array.isArray(singleAppointment?.payments)
    ? singleAppointment.payments.reduce(
        (total, payment) => total + (parseFloat(payment?.amount) || 0),
        0
      )
    : 0;
  const submiteFromData = async (data: PaymentFormData) => {
    const totalPayment = data.credit_card + data.cash + data.online_transfer;
    if (
      parseInt(singleAppointment?.amount || "0") -
        (totalPreViusPayment + totalPayment) >=
      0
    ) {
      if (
        parseInt(singleAppointment?.amount || "0") >=
        totalPreViusPayment + totalPayment
      ) {
        try {
          const postData = {
            payments: [
              ...formatUserPayments(data).map((item) => ({
                ...item,
                appointment_id: singleAppointment?.id,
              })),
            ],
          };

          await postHandler(`channel/repayments/`, postData);
          toast.success("Channel Payment Updated");
          navigate(`/channel/channel_invoice/${appointment_id}`);
        } catch (error) {
          extractErrorMessage(error);
        }
      } else {
        CustomToast.warning(
          "Payment amount exceeds the remaining balance for this appointment"
        );
      }
    } else {
      toast.error("This appointment has already been fully paid.");
    }
  };
  return (
    <Container sx={{ borderRadius: 2, minWidth: "600px" }}>
      <TitleText title="Channel Repayment" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
        gap={1}
        mb={1}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            padding: 1,
            width: "100%",
          }}
        >
          <Typography>
            Channel Date:{" "}
            {formatDateTimeByType(singleAppointment?.date, "date")}
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            Invoice No: <strong>{singleAppointment?.invoice_number}</strong>
          </Typography>
          <Button
            size="small"
            disabled={!singleAppointment}
            onClick={() => {
              navigate(`/channel/channel_invoice/${appointment_id}`);
            }}
            variant="contained"
          >
            Show Receipt
          </Button>
        </Paper>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
            width: "100%",
          }}
        >
          <Typography sx={{ fontSize: 16 }}>
            Name : {singleAppointment?.patient_name}
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            Doctor : {singleAppointment?.doctor_name}
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            Channel No: <strong>{singleAppointment?.channel_no}</strong>
          </Typography>
        </Paper>
      </Box>
      <Box
        sx={{
          padding: 1,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "#fff",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            Full Amount
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            {numberWithCommas(singleAppointment?.amount)}
          </Typography>
        </Paper>
        {singleAppointment?.payments.map((item) => (
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Typography sx={{ fontSize: 16 }}>
              {formatPaymentMethod(item.payment_method)} /{" "}
              {dateAndTimeFormat(item.payment_date)}
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              {numberWithCommas(item.amount)}
            </Typography>
          </Paper>
        ))}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            Total Recived Payment
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            {numberWithCommas(totalPreViusPayment)}
          </Typography>
        </Paper>
        {/* Balance */}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Balance</Typography>
          <Typography sx={{ fontSize: 16 }}>
            {numberWithCommas(
              parseInt(String(singleAppointment?.amount || 0)) -
                (totalPreViusPayment || 0)
            )}
          </Typography>
        </Paper>
        <FormProvider {...methods}>
          <Box
            component={"form"}
            onSubmit={methods.handleSubmit(submiteFromData)}
          >
            <Box
              sx={{
                width: "100%", // Ensure the parent takes full width
                display: "flex",

                alignItems: "center", // Centers the child horizontally
              }}
            >
              <PaymentMethodsLayout />
            </Box>
            <SubmitCustomBtn
              btnText="Save payment"
              isError={postHandlerError}
              loading={postHandlerloading}
            />
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
}
