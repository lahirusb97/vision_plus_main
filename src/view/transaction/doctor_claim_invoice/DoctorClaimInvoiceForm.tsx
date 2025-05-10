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
import {
  openManualLense,
  openStockDrawer,
} from "../../../features/invoice/stockDrawerSlice";

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
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { getBranchName } from "../../../utils/branchName";
import { useEffect } from "react";
export default function DoctorClaimInvoiceForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { prepareValidation, resetValidation, validationState } =
    useValidationState();
  const externalLenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLenseList
  );
  const ExtraTotal = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLenseSubTotal
  );
  const FrameInvoiceList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const LenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLensesList
  );
  const lenseTotal = useSelector(
    (state: RootState) => state.invoice_lense_filer.lenseSubTotal
  );

  const frameTotal = useSelector(
    (state: RootState) => state.invoice_frame_filer.framesubTotal
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
    const total = frameTotal + lenseTotal + ExtraTotal;
    const grandTotal = total - data.discount;
    const payment = data.online_transfer + data.credit_card + data.cash;
    const balance = grandTotal - payment;

    const payload = {
      name: data.name,
      date: dayjs().format("YYYY-MM-DD"),
      invoice_number: `${getBranchName()}-${data.invoice_number}`,
      phone_number: data.phone_number,
      address: data.address,
      sub_total: total,
      balance: balance,
      discount: data.discount,
      total_price: grandTotal,
      sales_staff: 1,
      invoiceItems: [
        ...Object.values(FrameInvoiceList).map((item) => {
          return {
            id: item.frame_id,
            quantity: item.buyQty,
            price_per_unit: item.price_per_unit,
            subtotal: item.subtotal,
            details: `${item.frame_detail.brand_name} / ${item.frame_detail.code_name} / ${item.frame_detail.color_name}`,
          };
        }),
        ...Object.values(LenseInvoiceList).map((item) => {
          return {
            id: item.lense_id,
            quantity: item.buyQty,
            price_per_unit: item.price_per_unit,
            subtotal: item.subtotal,
            details: `${item.lense_detail.brand_name} / ${item.lense_detail.type_name} / ${item.lense_detail.coating_name}`,
          };
        }),
        ...Object.values(externalLenseInvoiceList).map((item) => {
          return {
            id: item.external_lens_id,
            quantity: item.buyQty,
            price_per_unit: item.price_per_unit,
            subtotal: item.subtotal,
            details: `${item.external_lens_details.brand_name} / ${item.external_lens_details.type_name} / ${item.external_lens_details.coating_name}`,
          };
        }),
      ],
      order_payments: payment,
    };

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
      await dispatch(setDoctorClaim(postData));
      navigate(`/transaction/doctor_claim_invoice/${payload.invoice_number}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
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
              <Button
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
              </Button>
              <Button
                variant="contained"
                onClick={() => dispatch(openManualLense())}
              >
                In Stock Lens
              </Button>
              <Button
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
              </Button>
            </Box>
            <DoctorClainmInvoiceTable />
            <Box sx={{ my: 1 }}>
              <CashInput />
            </Box>
            <Button variant="contained" type="submit">
              Submit
            </Button>
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
