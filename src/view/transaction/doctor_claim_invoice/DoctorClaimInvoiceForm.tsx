import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, InputAdornment, Paper, TextField } from "@mui/material";
import {
  schemaDoctorClaimInvoice,
  DoctorClaimInvoiceFormModel,
} from "../../../validations/schemaDoctorClaimInvoice";
import TitleText from "../../../components/TitleText";
import MiniPatientDetails from "./MiniPatientDetails";
import { useDispatch, useSelector } from "react-redux";
import { openStockDrawer } from "../../../features/invoice/stockDrawerSlice";

import { RootState } from "../../../store/store";
import { useValidationState } from "../../../hooks/validations/useValidationState";
import VarificationDialog from "../../../components/VarificationDialog";
import {
  DoctorClaimPayload,
  setDoctorClaim,
} from "../../../features/invoice/doctorClaimSlice";
import DoctorClainmInvoiceTable from "../../../components/inputui/DoctorClainmInvoiceTable";
import CashInput from "../../../components/inputui/CashInput";
import { useNavigate } from "react-router";
import { clearFrame } from "../../../features/invoice/frameFilterSlice";
import { clearLenses } from "../../../features/invoice/lenseFilterSlice";
import { clearexternalLense } from "../../../features/invoice/externalLenseSlice";
import dayjs from "dayjs";
import { getBranchName } from "../../../utils/branchName";
import { useEffect } from "react";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { getUserCurentBranch } from "../../../utils/authDataConver";
export default function DoctorClaimInvoiceForm() {
  const { postHandler, postHandlerError, postHandlerloading } = useAxiosPost();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { prepareValidation, resetValidation, validationState } =
    useValidationState();
  // const externalLenseInvoiceList = useSelector(
  //   (state: RootState) => state.invoice_external_lense.externalLenseList
  // );
  const ExtraTotal = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLenseSubTotal
  );
  // const FrameInvoiceList = useSelector(
  //   (state: RootState) => state.invoice_frame_filer.selectedFrameList
  // );
  // const LenseInvoiceList = useSelector(
  //   (state: RootState) => state.invoice_lense_filer.selectedLensesList
  // );
  const lenseTotal = useSelector(
    (state: RootState) => state.invoice_lense_filer.lenseSubTotal
  );

  const frameTotal = useSelector(
    (state: RootState) => state.invoice_frame_filer.framesubTotal
  );

  const doctorClaimPayload = useSelector(
    (state: RootState) => state.doctor_claim_invoice.doctorClaimPayload
  );
  const methods = useForm<DoctorClaimInvoiceFormModel>({
    resolver: zodResolver(schemaDoctorClaimInvoice),
    defaultValues: {
      online_transfer: 0,
      credit_card: 0,
      cash: 0,
      name: "",
      phone_number: "",
      address: "",
      discount: 0,
    },
  });
  const handleInvoiceSubmite = (data: DoctorClaimInvoiceFormModel) => {
    const total =
      frameTotal +
      lenseTotal +
      ExtraTotal +
      doctorClaimPayload.invoiceItems.reduce(
        (acc, item) => acc + item.subtotal,
        0
      );
    const grandTotal = total - data.discount;
    const payment = data.cash;
    const balance = grandTotal - payment;

    const payload = {
      name: data.name,
      date: dayjs().format("YYYY-MM-DD"),
      invoice_number: `${getBranchName()}${data.invoice_number}`,
      phone_number: data.phone_number,
      address: data.address,
      sub_total: total,
      balance: balance,
      discount: data.discount,
      total_price: grandTotal,
      branch: getUserCurentBranch()?.id,
      sales_staff: 1,
      invoiceItems: [
        ...(doctorClaimPayload?.invoiceItems || []),
        // ...Object.values(FrameInvoiceList).map((item) => {
        //   return {
        //     id: item.frame_id,
        //     quantity: item.buyQty,
        //     price_per_unit: item.price_per_unit,
        //     subtotal: item.subtotal,
        //     details: `${item.frame_detail.brand_name} / ${item.frame_detail.code_name} / ${item.frame_detail.color_name}`,
        //   };
        // }),
        // ...Object.values(LenseInvoiceList).map((item) => {
        //   return {
        //     id: item.lense_id,
        //     quantity: item.buyQty,
        //     price_per_unit: item.price_per_unit,
        //     subtotal: item.subtotal,
        //     details: `${item.lense_detail.brand_name} / ${item.lense_detail.type_name} / ${item.lense_detail.coating_name}`,
        //   };
        // }),
        // ...Object.values(externalLenseInvoiceList).map((item) => {
        //   return {
        //     id: item.external_lens_id,
        //     quantity: item.buyQty,
        //     price_per_unit: item.price_per_unit,
        //     subtotal: item.subtotal,
        //     details: `${item.external_lens_details.brand_name} / ${item.external_lens_details.type_name} / ${item.external_lens_details.coating_name}`,
        //   };
        // }),
      ],
      order_payments: payment,
    };
    console.log(payload);

    prepareValidation("create", async (verifiedUserId: number) => {
      await sendDataToNextPage(payload as DoctorClaimPayload, verifiedUserId);
    });
  };

  const sendDataToNextPage = async (
    payload: DoctorClaimPayload,
    sales_staff_code: number
  ) => {
    try {
      const postData = {
        ...payload,
        sales_staff_code: sales_staff_code,
      };
      await postHandler("doctor-claims-invoices/", {
        branch: getUserCurentBranch()?.id,
        invoice_number: payload.invoice_number,
      });
      await dispatch(setDoctorClaim(postData));
      navigate(`/transaction/doctor_claim_invoice/${payload.invoice_number}`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(clearFrame());
      dispatch(clearLenses());
      dispatch(clearexternalLense());
    };
  }, []);
  return (
    <Paper sx={{ padding: 2 }}>
      <TitleText title="Doctor Claim Invoice Form" />
      <FormProvider {...methods}>
        <Box>
          <form
            style={{ display: "flex", flexDirection: "column", gap: 2 }}
            onSubmit={methods.handleSubmit(handleInvoiceSubmite)}
          >
            <TextField
              {...methods.register("invoice_number")}
              sx={{ mb: 1, width: 200 }}
              size="small"
              label="Invoice Number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {getBranchName()}
                  </InputAdornment>
                ),
              }}
            />
            <MiniPatientDetails />

            <Box sx={{ display: "flex", gap: 2, my: 1 }}>
              {/* <Button
                variant="contained"
                onClick={() =>
                  dispatch(
                    openStockDrawer({
                      stockDrawerType: "frame",
                      refractionDetail: null,
                    })
                  )
                }
              >
                Frame
              </Button> */}
              {/* <Button
                variant="contained"
                onClick={() => dispatch(openManualLense())}
              >
                In Stock Lens
              </Button> */}
              {/* <Button
                variant="contained"
                onClick={() =>
                  dispatch(
                    openStockDrawer({
                      stockDrawerType: "none_stock_lense",
                      refractionDetail: null,
                    })
                  )
                }
              >
                None Stock Lens
              </Button> */}
              <Button
                variant="contained"
                onClick={() =>
                  dispatch(
                    openStockDrawer({
                      stockDrawerType: "doctor_claim",
                      refractionDetail: null,
                    })
                  )
                }
              >
                Doctor Claim
              </Button>
            </Box>
            <DoctorClainmInvoiceTable />
            <Box sx={{ my: 1 }}>
              <CashInput />
            </Box>
            <SubmitCustomBtn
              isError={postHandlerError}
              loading={postHandlerloading}
              btnText="Save  Invoice"
            />
          </form>
        </Box>
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
    </Paper>
  );
}
