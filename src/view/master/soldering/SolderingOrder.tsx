import { FormProvider } from "react-hook-form";
import SolderingPatientDetail from "./SolderingPatientDetail";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaSolderingOrder } from "../../../validations/schemaSolderingOrder";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import { SolderingOrderFormModel } from "../../../validations/schemaSolderingOrder";
import PaymentMethodsLayout from "../../transaction/factory_layouts/PaymentMethodsLayout";
import { Box, Divider, Paper, TextField, Typography } from "@mui/material";
import TitleText from "../../../components/TitleText";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import { numberWithCommas } from "../../../utils/numberWithCommas";

export default function SolderingOrder() {
  const navigate = useNavigate();
  const { postHandler, postHandlerError, postHandlerloading } = useAxiosPost();
  const methods = useForm<SolderingOrderFormModel>({
    resolver: zodResolver(schemaSolderingOrder),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
      branch_id: getUserCurentBranch()?.id,
    },
  });
  //handle submite
  const onSubmit = async (data: SolderingOrderFormModel) => {
    const userPayments = {
      credit_card: data.credit_card,
      cash: data.cash,
      online_transfer: data.online_transfer,
    };
    const postData = {
      patient: {
        name: data.name,
        phone_number: data.phone_number,
        address: data.address,
        dob: data.dob,
        nic: data.nic,
      },
      branch_id: getUserCurentBranch()?.id,
      price: data.price,
      note: data.note,
      payments: formatUserPayments(userPayments).map((payment) => ({
        amount: payment.amount,
        payment_method: payment.payment_method,
        is_final_payment: payment.amount === data.price,
      })),
    };
    console.log(postData);

    try {
      const response = await postHandler("soldering/orders/create/", postData);
      navigate(
        `/master/soldering-invoice/${response.data.invoice.invoice_number}`
      );
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  const price = Number(methods.watch("price") || 0);
  const creditCard = Number(methods.watch("credit_card") || 0);
  const cash = Number(methods.watch("cash") || 0);
  const onlineTransfer = Number(methods.watch("online_transfer") || 0);
  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <TitleText title="Soldering Order" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SolderingPatientDetail />
          <Divider sx={{ my: 2 }} />
          <TextField
            multiline
            rows={4}
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
              <b>Total Price:</b> {numberWithCommas(price)}
            </Typography>
            <Typography variant="body2">
              <b>Total Payment:</b>{" "}
              {numberWithCommas(creditCard + cash + onlineTransfer)}
            </Typography>
            <Typography
              color={
                price - creditCard - cash - onlineTransfer < 0
                  ? "error"
                  : "success"
              }
              variant="body2"
            >
              <b>Balance:</b>{" "}
              {numberWithCommas(price - creditCard - cash - onlineTransfer)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <PaymentMethodsLayout />
          </Box>
          <SubmitCustomBtn
            isError={postHandlerError}
            btnText="Save"
            loading={postHandlerloading}
          />
        </form>
      </FormProvider>
    </Paper>
  );
}
