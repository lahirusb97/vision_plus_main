import { Controller, FormProvider, useForm } from "react-hook-form";
import NormalPatientDetail from "../normal_order/NormalPatientDetail";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import {
  schemaFrameOnlyOrderForm,
  FrameOnlyOrderForm,
} from "../../../validations/schemaFrameOnlyOrder";
import PaymentMethodsLayout from "../factory_layouts/PaymentMethodsLayout";
import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import InvoiceTable from "../../../components/inputui/InvoiceTable";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useNavigate } from "react-router";
import TitleText from "../../../components/TitleText";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import { openStockDrawer } from "../../../features/invoice/stockDrawerSlice";
import { useState } from "react";
import AuthDialog from "../../../components/common/AuthDialog";
export default function FrameOnlyOrderCreate() {
  const dispatch = useDispatch();

  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [pendingPostData, setPendingPostData] = useState<any | null>(null);

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
      progress_status: false,
    },
  });

  const frameOnlyOrderSubmite = (data: FrameOnlyOrderForm) => {
    if (Object.keys(FrameInvoiceList).length === 1) {
      if (data.credit_card + data.cash + data.online_transfer <= frameTotal) {
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
          progress_status: data.progress_status
            ? "issue_to_customer"
            : "received_from_customer",
          order_remark: data.order_remark,
        };
        setAuthDialogOpen(true);
        setPendingPostData(postData);
        // prepareValidation("create", async (verifiedUserId: number) => {
        //   await sendDataToDb(
        //     postData as FrameOnlyOrderInputModel,
        //     verifiedUserId
        //   );
        // });
      } else {
        toast.error("Payment Amount is greater than Total Amount");
      }
    } else {
      toast.error("You Can Invoice Only a Single Frame");
    }
  };

  const sendDataToDb = async (authData: {
    admin_id: number | null;
    user_id: number | null;
  }) => {
    try {
      const responce = await postHandler("orders/frame-only/", {
        ...pendingPostData,
        sales_staff_code: authData.user_id
          ? authData.user_id
          : authData.admin_id,
      });
      toast.success("Order saved successfully");
      const url = `?invoice_number=${encodeURIComponent(
        responce.data.invoice_number
      )}`;
      // //send to invoice view
      navigate(
        `/transaction/invoice/view/${responce.data.invoice_number}${url}`
      );
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

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button
              size="small"
              sx={{ mt: 1 }}
              onClick={() =>
                dispatch(
                  openStockDrawer({
                    stockDrawerType: "frame",
                    refractionDetail: null,
                  })
                )
              }
              color="primary"
              variant="contained"
            >
              Frames
            </Button>
            <Box ml={1} display="flex" alignItems="center">
              <Typography variant="body1"> Issue To Good</Typography>
              <Controller
                name="progress_status"
                control={methods.control}
                defaultValue={false} // Set default value here
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            </Box>
          </Box>
          <InvoiceTable />
          <TextField
            fullWidth
            size="small"
            {...methods.register("order_remark")}
            sx={{ maxWidth: "1200px" }}
            placeholder="Order remark"
            rows={3} // Defines the number of visible lines
            multiline
          />
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
      <AuthDialog
        open={authDialogOpen}
        operationType="user"
        onVerified={sendDataToDb}
        onClose={() => setAuthDialogOpen(false)}
      />
    </>
  );
}
