import { useParams } from "react-router";
import useGetSolderingInvoiceList from "../../../hooks/useGetSolderingInvoiceList";
import {
  Box,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Checkbox,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import PaymentMethodsLayout from "../../transaction/factory_layouts/PaymentMethodsLayout";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";
import { formatPaymentMethod } from "../../../utils/formatPaymentMethod";
import { useAxiosPatch } from "../../../hooks/useAxiosPatch";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import LoadingAnimation from "../../../components/LoadingAnimation";
import {
  schemaPaymentForm,
  PaymentFormData,
} from "../../../validations/schemaPaymentForm";
import {
  SolderingInvoiceModel,
  SolderingPayment,
} from "../../../model/SolderingInvoiceModel";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import TitleText from "../../../components/TitleText";
import { progressStatus } from "../../../utils/progressState";
import { channelPaymentsTotal } from "../../../utils/channelPaymentsTotal";

// Main component
export default function SolderingRepayment() {
  const { patchHandler, patchHandlerError, patchHandlerloading } =
    useAxiosPatch();
  const { invoice_number } = useParams();
  const {
    solderingInvoiceList,
    solderingInvoiceListRefres,
    solderingInvoiceListLoading,
  } = useGetSolderingInvoiceList({ invoice_number });

  // Always initialize the form and hooks first
  const methods = useForm<PaymentFormData>({
    resolver: zodResolver(schemaPaymentForm),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
      progress_status: false,
    },
    mode: "onBlur",
  });

  // Determine invoice details safely
  const invoiceDetail: SolderingInvoiceModel | null =
    solderingInvoiceList.length === 1 ? solderingInvoiceList[0] : null;

  // Loading and error handling
  if (solderingInvoiceListLoading) {
    return <LoadingAnimation loadingMsg="Loading Soldering Invoice Details" />;
  }
  if (
    !solderingInvoiceListLoading &&
    (!invoiceDetail || solderingInvoiceList.length > 1)
  ) {
    return (
      <Box p={4}>
        <Typography color="error" variant="h6">
          Invalid invoice number or multiple matches found.
        </Typography>
      </Box>
    );
  }

  // Calculate balance, typesafe
  const orderAmount = parseFloat(invoiceDetail?.order_details.price || "0");
  const paidTotal = channelPaymentsTotal(
    invoiceDetail?.payments.filter((p: SolderingPayment) => !p.is_deleted) || []
  );
  const currentPaymentTotal =
    (methods.watch("cash") || 0) +
    (methods.watch("credit_card") || 0) +
    (methods.watch("online_transfer") || 0);
  const balance = orderAmount - (paidTotal + currentPaymentTotal);

  // Submit handler
  const onSubmit = async (data: PaymentFormData) => {
    const userPayments = {
      credit_card: data.credit_card,
      cash: data.cash,
      online_transfer: data.online_transfer,
    };
    try {
      const patchPayload = {
        payments: formatUserPayments(userPayments).map((payment) => ({
          amount: payment.amount,
          payment_method: payment.payment_method,
          is_final_payment: payment.amount === orderAmount,
        })),
        progress_status: data.progress_status
          ? "issue_to_customer"
          : invoiceDetail?.order_details?.progress_status,
      };
      await patchHandler(
        `soldering/orders/${invoiceDetail?.order_details.id}/edit/`,
        patchPayload
      );
      methods.reset();
      solderingInvoiceListRefres();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  // UI
  return (
    <Box maxWidth={800} mx="auto" p={2} component={Paper} elevation={2}>
      {/* Invoice number */}
      {invoiceDetail && (
        <>
          <TitleText title="Soldering Repayment" />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Invoice #{invoiceDetail.invoice_number}
          </Typography>
          {/* Progress Status and Date */}
          <Typography>
            <strong>Status:</strong>{" "}
            {`${progressStatus(
              invoiceDetail.order_details.progress_status
            )} - ${formatDateTimeByType(
              invoiceDetail.order_details.progress_status_updated_at,
              "both"
            )}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Name: {invoiceDetail.patient.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Order Date:{" "}
            {formatDateTimeByType(
              invoiceDetail.order_details.order_date,
              "both"
            )}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Paper sx={{ p: 1 }}>
            <Typography variant="body1" fontWeight="bold">
              Note
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {invoiceDetail.order_details.note}
            </Typography>
          </Paper>
          <Divider sx={{ my: 2 }} />

          {/* Payments Table */}
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
            Payment History
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Payment Method</TableCell>
                <TableCell align="center">Payment Date</TableCell>
                <TableCell align="right">Payment Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceDetail.payments
                .filter((p: SolderingPayment) => !p.is_deleted)
                .map((p: SolderingPayment) => (
                  <TableRow key={p.id}>
                    <TableCell align="center">
                      {formatPaymentMethod(p.payment_method)}
                    </TableCell>
                    <TableCell align="center">
                      {formatDateTimeByType(p.payment_date, "both")}
                    </TableCell>
                    <TableCell align="right">
                      {numberWithCommas(p.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              {/* Add order amount and balance rows, aligned right */}
              <TableRow>
                <TableCell />
                <TableCell align="right">
                  <strong>Order Amount:</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>
                    {numberWithCommas(invoiceDetail.order_details.price)}
                  </strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell align="right">
                  <strong>Balance:</strong>
                </TableCell>
                <TableCell align="right">
                  <span style={{ color: balance < 0 ? "red" : "black" }}>
                    <strong>{numberWithCommas(balance)}</strong>
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell align="right">
                  <strong>Current Payment:</strong>
                </TableCell>
                <TableCell align="right">
                  <span>
                    <strong>{numberWithCommas(currentPaymentTotal)}</strong>
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Divider sx={{ my: 2 }} />

          {/* Repayment Form */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
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
              <Box sx={{ display: "flex", gap: 1 }}>
                <PaymentMethodsLayout />
              </Box>
              <SubmitCustomBtn
                loading={patchHandlerloading}
                isError={patchHandlerError}
                btnText="Add New Payment"
              />
            </form>
          </FormProvider>
        </>
      )}
    </Box>
  );
}
