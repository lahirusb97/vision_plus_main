import { useRef } from "react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { Container, Typography, Box, Divider, Button } from "@mui/material";
import BranchMobileNum from "../../../components/common/BranchMobileNum";
import BranchAddress from "../../../components/common/BranchAddress";
import { useReactToPrint } from "react-to-print";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { clearDoctorClaim } from "../../../features/invoice/doctorClaimSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function DoctorClaimChannelInvoiceVIew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctorClaimChannelInvoice = useSelector(
    (state: RootState) => state.doctor_claim_channel.doctorClaimChannelPayload
  );
  const componentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({ contentRef: componentRef });

  return (
    <div>
      {doctorClaimChannelInvoice && (
        <>
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
                <Typography variant="body2">Channele No</Typography>
                <Typography
                  data-testid="channel_no"
                  variant="h6"
                  fontWeight={"bold"}
                >
                  {doctorClaimChannelInvoice?.invoice_number}
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
                  {doctorClaimChannelInvoice?.channel_date}
                  {` - `}
                  {doctorClaimChannelInvoice?.channel_time}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                <Typography variant="body2">Invoice Number</Typography>
                <Typography variant="body2">
                  {doctorClaimChannelInvoice?.invoice_number}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Patient Name</Typography>
                <Typography data-testid="patient_name" variant="body2">
                  {doctorClaimChannelInvoice?.name}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Doctor Name</Typography>
                <Typography data-testid="doctor_name" variant="body2">
                  {doctorClaimChannelInvoice?.doctor_name}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Consultant Fee:</Typography>
                <Typography data-testid="consultant_fee" variant="body2">
                  Rs.
                  {numberWithCommas(doctorClaimChannelInvoice?.channeling_fee)}
                </Typography>{" "}
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight="bold">
                  Total Payments
                </Typography>
                <Typography
                  data-testid="total_payments"
                  variant="body2"
                  fontWeight="bold"
                >
                  Rs.{numberWithCommas(doctorClaimChannelInvoice?.cash)}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight="bold">
                  Balance
                </Typography>
                <Typography
                  data-testid="balance"
                  variant="body2"
                  fontWeight="bold"
                >
                  Rs.
                  {numberWithCommas(
                    (doctorClaimChannelInvoice?.channeling_fee || 0) -
                      (doctorClaimChannelInvoice?.cash || 0)
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
              {/* <Typography
                variant="body2"
                align="center"
                sx={{ fontSize: "12px", mt: 1 }}
              >
                Bill Printed On{" "}
                <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>{" "}
                {dateAndTimeFormat(new Date().toISOString())}
              </Typography> */}
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
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              dispatch(clearDoctorClaim());
              navigate("/channel/doctor_claim_channel");
            }}
            sx={{ mt: "2mm", ml: "2mm" }}
          >
            Clear Invoice
          </Button>
        </>
      )}
    </div>
  );
}
