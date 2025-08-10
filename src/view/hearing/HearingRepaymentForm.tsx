import {
  Container,
  Button,
  Typography,
  Box,
  Paper,
  Checkbox,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import {
  orderpaymentTotal,
  safeParseFloat,
} from "../../utils/orderpaymentTotal";
import { formatPaymentMethod } from "../../utils/formatPaymentMethod";
import { dateAndTimeFormat } from "../../utils/dateAndTimeFormat";
import toast from "react-hot-toast";
import useGetSingleInvoice from "../../hooks/useGetSingleInvoice";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatUserPayments } from "../../utils/formatUserPayments";
import { formatPreviusUserPayments } from "../../utils/formatPreviusUserPayments";
import { useAxiosPut } from "../../hooks/useAxiosPut";
import LoadingAnimation from "../../components/LoadingAnimation";
import SubmitCustomBtn from "../../components/common/SubmiteCustomBtn";
import DataLoadingError from "../../components/common/DataLoadingError";
import {
  PaymentFormData,
  schemaPaymentForm,
} from "../../validations/schemaPaymentForm";
import { numberWithCommas } from "../../utils/numberWithCommas";
import TitleText from "../../components/TitleText";
import { progressStatus } from "../../utils/progressState";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";
import PaymentMethodsLayout from "../transaction/factory_layouts/PaymentMethodsLayout";
const HearingRepaymentForm = () => {
  const navigate = useNavigate();
  const { invoice_number } = useParams();
  const {
    invoiceData: invoiceDetail,
    invoiceLoading,
    invoiceListRefres,
  } = useGetSingleInvoice(invoice_number || "", "hearing");
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();

  const methods = useForm({
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
      progress_status: false,
    },
    resolver: zodResolver(schemaPaymentForm),
  });

  const submiteFromData = async (data: PaymentFormData) => {
    try {
      const userPayments = {
        credit_card: data.credit_card,
        cash: data.cash,
        online_transfer: data.online_transfer,
      };
      const postData = {
        order_id: invoiceDetail?.order,
        progress_status: data.progress_status
          ? "issue_to_customer"
          : invoiceDetail?.order_details?.progress_status?.progress_status,
        payments: [
          ...formatUserPayments(userPayments),
          ...formatPreviusUserPayments(
            invoiceDetail?.order_details?.order_payments || []
          ),
        ],
      };

      await putHandler(`/orders/update-payments/`, postData);
      toast.success("Invoice Payment Updated");
      invoiceListRefres();
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  if (invoiceLoading) {
    return <LoadingAnimation loadingMsg="Invoice Searching.." />;
  }
  if (!invoiceDetail && !invoiceLoading) {
    return <DataLoadingError />;
  }
  return (
    <Container maxWidth="md" sx={{ borderRadius: 2, maxWidth: "1200px" }}>
      <TitleText title="Repayment Form" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
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
          <Typography sx={{ fontSize: 16 }}>
            Name : {invoiceDetail?.customer_details.name}
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            Invoice No: <strong>{invoiceDetail?.invoice_number}</strong>
          </Typography>
          <a
            href={`/hearing/${invoiceDetail?.invoice_number}/`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }} // Optional: keep icon color
          >
            <Button variant="contained" size="small" sx={{ p: 1 }}>
              Show Receipt
            </Button>
          </a>
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
        {/* Full Amount */}
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
            {numberWithCommas(invoiceDetail?.order_details.sub_total)}
          </Typography>
        </Paper>

        {/* Discount */}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Discount</Typography>
          <Typography sx={{ fontSize: 16 }}>
            {numberWithCommas(invoiceDetail?.order_details.discount)}
          </Typography>
        </Paper>

        {/* First Payment */}
        {invoiceDetail?.order_details.order_payments.map((item) => (
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
            {numberWithCommas(
              orderpaymentTotal(invoiceDetail?.order_details.order_payments)
            )}
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
              safeParseFloat(invoiceDetail?.order_details.total_price) -
                orderpaymentTotal(invoiceDetail?.order_details.order_payments)
            )}
          </Typography>
        </Paper>

        {/* Second Payment*/}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>New Payment</Typography>
          <Typography sx={{ fontSize: 16 }}>
            {numberWithCommas(
              safeParseFloat(methods.watch("cash")) +
                safeParseFloat(methods.watch("credit_card")) +
                safeParseFloat(methods.watch("online_transfer"))
            )}
          </Typography>
        </Paper>

        {/* Second Balance */}
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>New Balance</Typography>
          <Typography sx={{ fontSize: 16 }}>
            {numberWithCommas(
              safeParseFloat(invoiceDetail?.order_details.total_price) -
                orderpaymentTotal(invoiceDetail?.order_details.order_payments) -
                (safeParseFloat(methods.watch("cash")) +
                  safeParseFloat(methods.watch("credit_card")) +
                  safeParseFloat(methods.watch("online_transfer")))
            )}
          </Typography>
        </Paper>
        <FormProvider {...methods}>
          <Box
            component={"form"}
            onSubmit={methods.handleSubmit(submiteFromData)}
            sx={{
              width: "100%", // Ensure the parent takes full width
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Centers the child horizontally
            }}
          >
            {/* <Box
              sx={{
                width: "100%", // Ensure the parent takes full width
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body1">
                Current Progress -{" "}
                {invoiceDetail?.order_details?.progress_status?.progress_status
                  ? progressStatus(
                      invoiceDetail.order_details.progress_status
                        .progress_status
                    )
                  : "N/A"}
                {" - "}
                {invoiceDetail?.order_details?.progress_status?.changed_at
                  ? formatDateTimeByType(
                      invoiceDetail.order_details.progress_status.changed_at,
                      "both"
                    )
                  : null}
              </Typography>
              <Box ml={1} display="flex" alignItems="center">
                <Typography variant="body1"> Issue To Good</Typography>
                <Checkbox
                  {...methods.register("progress_status")}
                  checked={methods.watch("progress_status") || false} // Add fallback to false
                  onChange={(e) =>
                    methods.setValue("progress_status", e.target.checked)
                  }
                />
              </Box>
            </Box> */}
            <Box sx={{ display: "flex" }}>
              <PaymentMethodsLayout />
            </Box>
            <SubmitCustomBtn
              btnText="Add payment"
              isError={putHandlerError}
              loading={putHandlerloading}
            />
          </Box>
        </FormProvider>
      </Box>

      {/* Save Button */}
    </Container>
  );
};

export default HearingRepaymentForm;
