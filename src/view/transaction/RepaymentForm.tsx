import { ChangeEvent, useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import useGetInvoicePayments from "../../hooks/useGetInvoicePayments";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CardInput from "../../components/inputui/CardInput";
import CashInput from "../../components/inputui/CashInput";
import OnlinePayInput from "../../components/inputui/OnlinePayInput";
import useGetSingleInvoiceDetail from "../../hooks/useGetSingleInvoiceDetail";
import {
  orderpaymentTotal,
  safeParseFloat,
} from "../../utils/orderpaymentTotal";
import { formatPaymentMethod } from "../../utils/formatPaymentMethod";
import { dateAndTimeFormat } from "../../utils/dateAndTimeFormat";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import axiosClient from "../../axiosClient";

const RepaymentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { invoicePayments, invoicePaymentsLoading, invoicePaymentsError } =
    useGetInvoicePayments(parseInt(id ?? ""));
  const { invoiceDetail, invoiceDetailLoading, invoiceDetailError } =
    useGetSingleInvoiceDetail(parseInt(id ?? ""));
  console.log(invoiceDetail);

  const [secondPayment, setSecondPayment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const fullAmount = 4000;
  const discount = 1000;
  const firstPayment = 1000;
  const balance = fullAmount - discount - firstPayment;
  const secondBalance = balance - (secondPayment ? parseInt(secondPayment) : 0);
  const methods = useForm({
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
    },
    resolver: yupResolver(
      Yup.object().shape({
        credit_card: Yup.number(), // Add this line
        cash: Yup.number(), // And this line
        online_transfer: Yup.number(), // And this line
      })
    ),
  });

  const handleSecondPaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSecondPayment(event.target.value);
  };

  const submiteFromData = async (data) => {
    function formatApiResponseToRequest(payments) {
      return payments.map((payment) => ({
        id: payment.id,
        amount: parseFloat(payment.amount),
        payment_method: payment.payment_method,
        transaction_status: payment.transaction_status,
      }));
    }
    console.log(formatApiResponseToRequest(invoicePayments));

    function formatUserPayments(userPayments) {
      return Object.keys(userPayments)
        .filter((paymentMethod) => userPayments[paymentMethod] > 0) // Remove zero amounts
        .map((paymentMethod) => ({
          amount: userPayments[paymentMethod],
          payment_method: paymentMethod,
          transaction_status: "success", // Assuming success by default
        }));
    }

    try {
      const postData = {
        order_id: invoicePayments[0].order,
        payments: [
          ...formatUserPayments(data),
          ...formatApiResponseToRequest(invoicePayments),
        ],
      };
      await axiosClient.put(`/orders/update-payments/`, postData);

      toast.success("Invoice Payment Updated...");
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error || "Something went wrong");
      }
    }
    console.log(data);
  };
  return (
    <Container maxWidth="md" sx={{ borderRadius: 2, maxWidth: "1200px" }}>
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
            status: {invoiceDetail?.order_details.status}
          </Typography>
          <Button
            onClick={() => {
              const url = `?order_id=${encodeURIComponent(
                invoiceDetail?.order
              )}`;
              navigate(
                `/transaction/factory_order/create/${invoiceDetail?.customer_details.refraction_id}/view/${url}`
              );
            }}
            variant="contained"
            color="success"
            sx={{ height: "56px" }}
          >
            Show Receipt
          </Button>
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
            {invoiceDetail?.order_details.sub_total}
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
            {invoiceDetail?.order_details.discount}
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
            <Typography sx={{ fontSize: 16 }}>{item.amount}</Typography>
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
            {orderpaymentTotal(invoiceDetail?.order_details.order_payments)}
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
            {safeParseFloat(invoiceDetail?.order_details.total_price) -
              orderpaymentTotal(invoiceDetail?.order_details.order_payments)}
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
          <Typography sx={{ fontSize: 16 }}>Second Payment</Typography>
          <Typography sx={{ fontSize: 16 }}>
            {safeParseFloat(methods.watch("cash")) +
              safeParseFloat(methods.watch("credit_card")) +
              safeParseFloat(methods.watch("online_transfer"))}
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
          <Typography sx={{ fontSize: 16 }}>Second Balance</Typography>
          <Typography sx={{ fontSize: 16 }}>
            {safeParseFloat(invoiceDetail?.order_details.total_price) -
              orderpaymentTotal(invoiceDetail?.order_details.order_payments) -
              (safeParseFloat(methods.watch("cash")) +
                safeParseFloat(methods.watch("credit_card")) +
                safeParseFloat(methods.watch("online_transfer")))}
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
            <Box sx={{ display: "flex" }}>
              <OnlinePayInput />

              <CardInput />
              <CashInput />
            </Box>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </FormProvider>
      </Box>

      {/* Save Button */}
    </Container>
  );
};

export default RepaymentForm;
