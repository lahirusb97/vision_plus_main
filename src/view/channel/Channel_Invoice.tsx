import { useRef } from "react";
import { Container, Typography, Box, Divider, Button } from "@mui/material";
import { useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import useGetSingleAppointment from "../../hooks/useGetSingleAppointment";
import { dateAndTimeFormat } from "../../utils/dateAndTimeFormat";
import { numberWithCommas } from "../../utils/numberWithCommas";
import LoadingAnimation from "../../components/LoadingAnimation";
import DataLoadingError from "../../components/common/DataLoadingError";
import BranchMobileNum from "../../components/common/BranchMobileNum";
import BranchAddress from "../../components/common/BranchAddress";
import { convertTimeTo12Hour } from "../../utils/convertTo12Hour";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";

const ChannelInvoice = () => {
  const componentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });

  const { appointment_id } = useParams();
  const {
    singleAppointment,
    singleAppointmentLoading,
    singleAppointmentError,
  } = useGetSingleAppointment(appointment_id);

  if (singleAppointmentLoading) {
    return <LoadingAnimation loadingMsg="Loading Appointment Recipt" />;
  }
  if (singleAppointmentError && !singleAppointmentLoading) {
    return <DataLoadingError />;
  }
  // Calculate the total of payments
  const totalAmount =
    (singleAppointment?.payments || []).reduce((total, payment) => {
      return total + parseInt(payment.amount);
    }, 0) || 0;

  return (
    <div>
      <Container
        sx={{
          padding: "1rem",
          minwidth: "7cm", // A5 width
          minHeight: "10.5mc", // A5 height
          border: "1px solid #000",
          fontFamily: "Arial, sans-serif",
          "@media print": {
            minWidth: "10cm",
            minHeight: "14cm",
            border: "none",
            margin: "1rem",
          },
        }}
        ref={componentRef}
      >
        <Box>
          <Typography
            sx={{ fontFamily: "Algerian", fontSize: "6mm" }}
            variant="h6"
            align="center"
            fontWeight="bold"
          >
            VISION PLUS OPTICIANS (PVT) LTD
          </Typography>
          <Typography fontWeight={"bold"} variant="body2" align="center">
            (CHANNELED CONSULTATIONS SERVICE)
          </Typography>
          <BranchMobileNum />

          <Box textAlign={"center"}>
            <BranchAddress />
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Typography
              variant="body2"
              align="center"
              sx={{ fontSize: "12px", mt: 1 }}
            >
              Date{" "}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              sx={{ fontSize: "12px", mt: 1 }}
              data-testid="channel_no"
            >
              {formatDateTimeByType(singleAppointment?.created_at, "both")}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Typography variant="body2">Channele No</Typography>
            <Typography
              data-testid="channel_no"
              variant="h6"
              fontWeight={"bold"}
            >
              {singleAppointment?.channel_no}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Typography variant="body2">Appointment </Typography>
            <Typography
              data-testid="appointment_date"
              fontSize={"1.2 rem"}
              fontWeight={"bold"}
              variant="h6"
            >
              {singleAppointment?.date}
              {` - `}
              {convertTimeTo12Hour(singleAppointment?.time || "")}
            </Typography>
          </Box>
          {/* <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Typography variant="body2">Invoice Number</Typography>
            <Typography variant="body2">
              {singleAppointment?.invoice_number}
            </Typography>
          </Box> */}

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Patient Name</Typography>
            <Typography data-testid="patient_name" variant="body2">
              {singleAppointment?.patient_name}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Name of Doctor</Typography>
            <Typography data-testid="doctor_name" variant="body2">
              {singleAppointment?.doctor_name}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Consultant Fee</Typography>
            <Typography data-testid="consultant_fee" variant="body2">
              Rs.{numberWithCommas(singleAppointment?.doctor_fees)}
            </Typography>{" "}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Establishment Fee</Typography>
            <Typography data-testid="establishment_fee" variant="body2">
              Rs.{numberWithCommas(singleAppointment?.branch_fees)}
            </Typography>{" "}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Total</Typography>
            <Typography data-testid="establishment_fee" variant="body2">
              Rs.{numberWithCommas(singleAppointment?.amount)}
            </Typography>{" "}
          </Box>

          {/* {singleAppointment?.payments.map((payment) => (
          <Box display="flex" justifyContent="space-between" gap={1}>
            <Typography variant="body2">
              {"Payment - "}
              {formatDateTimeByType(payment.created_at, "date")}
            </Typography>

            <Typography variant="body2">
              {numberWithCommas(payment.amount)}
            </Typography>
          </Box>
        ))} */}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" fontWeight="bold">
              Total Payments
            </Typography>
            <Typography
              data-testid="total_payments"
              variant="body2"
              fontWeight="bold"
            >
              Rs.{numberWithCommas(totalAmount)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" fontWeight="bold">
              Balance
            </Typography>
            <Typography data-testid="balance" variant="body2" fontWeight="bold">
              Rs.
              {numberWithCommas(
                parseInt(singleAppointment?.amount || "0") - totalAmount
              )}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Box>
              <Typography variant="body2" fontStyle={"italic"} align="left">
                Recived Payment With Thanks
              </Typography>
              <Typography variant="body2" fontStyle={"italic"} align="left">
                No Refund No Cancelation
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  fontStyle: "italic",
                  borderTop: "2px dotted black",
                  width: "100%",
                }}
              ></Box>
              <Typography variant="body2" align="right">
                For Authorized Office
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body2"
            align="center"
            sx={{ fontSize: "12px", mt: 1 }}
          >
            Bill Printed On{" "}
            <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>{" "}
            {dateAndTimeFormat(new Date().toISOString())}
          </Typography>
        </Box>
      </Container>
      <Button
        variant="contained"
        color="primary"
        onClick={() => reactToPrintFn()}
        sx={{ mt: 2 }}
      >
        Print Invoice
      </Button>
    </div>
  );
};

export default ChannelInvoice;
