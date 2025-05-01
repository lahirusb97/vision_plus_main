import { FormProvider, useForm } from "react-hook-form";
import NormalPatientDetail from "../normal_order/NormalPatientDetail";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import {
  schemaFrameOnlyOrderForm,
  FrameOnlyOrderForm,
} from "../../../validations/schemaFrameOnlyOrder";
import PaymentMethodsLayout from "../factory_layouts/PaymentMethodsLayout";
import { Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import FrameOnlyDrawerStock from "../../../components/inputui/FrameOnlyDrawerStock";
import InvoiceTable from "../../../components/inputui/InvoiceTable";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import { FrameOnlyOrderInputModel } from "../../../model/FrameOnlyOrderInputModel";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useNavigate } from "react-router";
import VarificationDialog from "../../../components/VarificationDialog";
import { useValidationState } from "../../../hooks/validations/useValidationState";
import TitleText from "../../../components/TitleText";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
export default function FrameOnlyOrderCreate() {
  const { prepareValidation, resetValidation, validationState } =
    useValidationState();
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const navigate = useNavigate();
  const FrameInvoiceList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const frameTotal = useSelector(
    (state: RootState) => state.invoice_frame_filer.framesubTotal
  );
  const methods = useForm<FrameOnlyOrderForm>({
    resolver: zodResolver(schemaFrameOnlyOrderForm),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
    },
  });

  const frameOnlyOrderSubmite = (data: FrameOnlyOrderForm) => {
    if (Object.keys(FrameInvoiceList).length === 1) {
      const userPayments = {
        credit_card: data.credit_card,
        cash: data.cash,
        online_transfer: data.online_transfer,
      };
      const orderState =
        frameTotal <= data.credit_card + data.cash + data.online_transfer
          ? "completed"
          : "pending";
      const firstValue = Object.values(FrameInvoiceList)[0];
      const postData = {
        patient: {
          name: data.name,
          nic: data.nic,
          address: data.address,
          phone_number: data.phone_number,
          date_of_birth: data.dob,
        },
        discount: data.discount,
        status: orderState,
        frame: firstValue.frame_id,
        quantity: firstValue.buyQty,
        price_per_unit: firstValue.price_per_unit,
        branch_id: getUserCurentBranch()?.id,
        payments: formatUserPayments(userPayments),
      };
      console.log(postData);
      prepareValidation("create", async (verifiedUserId: number) => {
        await sendDataToDb(
          postData as FrameOnlyOrderInputModel,
          verifiedUserId
        );
      });
    } else {
      toast.error("You Can Invoice Only a Single Frame");
    }
  };
  const sendDataToDb = async (
    postData: FrameOnlyOrderInputModel,
    verifiedUserId: number
  ) => {
    try {
      const responce = await postHandler("orders/frame-only/", {
        ...postData,
        sales_staff_code: verifiedUserId,
      });
      toast.success("Order saved successfully");
      const url = `?invoice_number=${encodeURIComponent(
        responce.data.invoice_number
      )}`;
      //send to invoice view
      navigate(`view/${url}`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <TitleText title="Frame Only Order" />
        <form onSubmit={methods.handleSubmit(frameOnlyOrderSubmite)}>
          <NormalPatientDetail />

          <FrameOnlyDrawerStock />
          <InvoiceTable />
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <PaymentMethodsLayout />
          </Box>
          <TextField
            size="small"
            sx={{ display: "none" }}
            inputProps={{
              min: 0,
            }}
            {...methods.register("branch_id", { valueAsNumber: true })}
            label="Branch Id"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={getUserCurentBranch()?.id}
          />
          <SubmitCustomBtn
            btnText="Create Frame Only Order "
            isError={postHandlerError}
            loading={postHandlerloading}
          />
        </form>
      </FormProvider>
      <VarificationDialog
        open={validationState.openValidationDialog}
        operationType={validationState.validationType}
        onVerified={async (verifiedUserId) => {
          if (validationState.apiCallFunction) {
            await validationState.apiCallFunction(verifiedUserId);
          }
        }}
        onClose={resetValidation}
      />
    </>
  );
}
