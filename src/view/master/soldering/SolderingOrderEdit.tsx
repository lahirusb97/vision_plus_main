import { useParams } from "react-router";
import useGetSolderingInvoiceList from "../../../hooks/useGetSolderingInvoiceList";
import { Box, Typography, Divider, Paper, TextField } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import PaymentMethodsLayout from "../../transaction/factory_layouts/PaymentMethodsLayout";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { useAxiosPatch } from "../../../hooks/useAxiosPatch";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import LoadingAnimation from "../../../components/LoadingAnimation";
import { SolderingInvoiceModel } from "../../../model/SolderingInvoiceModel";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import TitleText from "../../../components/TitleText";
import { channelPaymentsTotal } from "../../../utils/channelPaymentsTotal";
import { schemayPaymentUpdateDelete } from "../../../validations/schemayPaymentUpdateDelete";
import z from "zod";
import { schemaSolderingOrder } from "../../../validations/schemaSolderingOrder";
import SolderingPatientDetail from "./SolderingPatientDetail";
import PaymentsForm from "../../../components/common/PaymentsForm";
import { useEffect } from "react";
import stringToIntConver from "../../../utils/stringToIntConver";
import ProgressStatusSelect from "../../../components/common/ProgressStatusSelect";
import { getUserCurentBranch } from "../../../utils/authDataConver";
// Main component
export default function SolderingOrderEdit() {
  const { patchHandler, patchHandlerError, patchHandlerloading } =
    useAxiosPatch();
  const { invoice_number } = useParams();
  const {
    solderingInvoiceList,
    solderingInvoiceListRefres,
    solderingInvoiceListLoading,
  } = useGetSolderingInvoiceList({ invoice_number });

  // Always initialize the form and hooks first
  const solderingEditSchema = schemaSolderingOrder.extend({
    payments: z.array(schemayPaymentUpdateDelete),
    progress_status: z.enum([
      "received_from_customer",
      "issue_to_factory",
      "received_from_factory",
      "issue_to_customer",
    ]),
  });
  const methods = useForm<z.infer<typeof solderingEditSchema>>({
    resolver: zodResolver(solderingEditSchema),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
    },
    mode: "onBlur",
  });

  // Determine invoice details safely
  const invoiceDetail: SolderingInvoiceModel | null =
    solderingInvoiceList.length === 1 ? solderingInvoiceList[0] : null;

  useEffect(() => {
    if (invoiceDetail) {
      methods.reset({
        name: invoiceDetail.patient.name,
        nic: invoiceDetail.patient.nic,
        phone_number: invoiceDetail.patient.phone_number,
        address: invoiceDetail.patient.address,
        note: invoiceDetail.order_details.note,
        price: stringToIntConver(invoiceDetail.order_details.price),
        progress_status: invoiceDetail.order_details.progress_status,
        payments: invoiceDetail.payments.map((payment) => ({
          amount: stringToIntConver(payment.amount),
          payment_method: payment.payment_method,
          is_final: payment.is_final_payment,
          payment_date: payment.payment_date,
        })),
        branch_id: invoiceDetail?.order_details.branch,
      });
    }
  }, [invoiceDetail]);
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

  const currentPaymentTotal =
    (methods.watch("cash") || 0) +
    (methods.watch("credit_card") || 0) +
    (methods.watch("online_transfer") || 0);

  // Submit handler
  const onSubmit = async (data: z.infer<typeof solderingEditSchema>) => {
    const userPayments = {
      credit_card: data.credit_card,
      cash: data.cash,
      online_transfer: data.online_transfer,
    };
    try {
      const patchPayload = {
        patient: {
          name: data.name,
          nic: data.nic,
          phone_number: data.phone_number,
          address: data.address,
        },
        progress_status: data.progress_status,
        price: data.price,
        note: data.note,
        payments: [
          ...formatUserPayments(userPayments),
          ...data.payments.map((payment) => ({
            id: payment.id,
            amount: payment.amount,
            payment_method: payment.payment_method,
            is_final_payment: payment.is_final,
            payment_date: payment.payment_date,
          })),
        ],
      };
      console.log(patchPayload);
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
  console.log(methods.formState.errors);
  // UI
  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <TitleText title="Soldering Order" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SolderingPatientDetail />
          <Divider sx={{ my: 2 }} />
          <TextField
            multiline
            rows={2}
            label="Soldering Note"
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            autoComplete="off"
            {...methods.register("note")}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1 }}>
            <TextField
              size="small"
              label="Price"
              type="number"
              inputProps={{ style: { textAlign: "right" } }}
              {...methods.register("price", { valueAsNumber: true })}
            />
          </Box>

          {/* Summary Section */}
          <Box sx={{ mt: 2, mb: 1, textAlign: "right" }}>
            <Typography variant="body2">
              <b>Total Price:</b> {numberWithCommas(methods.watch("price"))}
            </Typography>
            <Typography variant="body2">
              <b>Previous Payments Total:</b>{" "}
              {numberWithCommas(
                channelPaymentsTotal(
                  methods.watch("payments")?.map((payment) => ({
                    amount: payment.amount.toString(),
                  })) || []
                )
              )}
            </Typography>
            <Typography variant="body2">
              <b>Current Payment:</b> {numberWithCommas(currentPaymentTotal)}
            </Typography>
            <Typography
              color={
                methods.watch("price") -
                  (currentPaymentTotal +
                    channelPaymentsTotal(
                      methods.watch("payments")?.map((payment) => ({
                        amount: payment.amount.toString(),
                      })) || []
                    )) <
                0
                  ? "error"
                  : ""
              }
              variant="body2"
            >
              <b>Balance:</b>{" "}
              {numberWithCommas(
                methods.watch("price") -
                  (channelPaymentsTotal(
                    methods.watch("payments")?.map((payment) => ({
                      amount: payment.amount.toString(),
                    })) || []
                  ) +
                    currentPaymentTotal)
              )}
            </Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <ProgressStatusSelect />
          </Box>
          <PaymentsForm />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
          <SubmitCustomBtn
            isError={patchHandlerError}
            btnText="Update"
            loading={patchHandlerloading || methods.formState.isSubmitting}
          />
        </form>
      </FormProvider>
    </Paper>
  );
}
