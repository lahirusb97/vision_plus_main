import Box from "@mui/material/Box";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, TextField } from "@mui/material";
import { factoryInvoiceSchema } from "../../../validations/factoryInvoiceSchema";
import useGetSingleInvoiceDetail from "../../../hooks/useGetSingleInvoiceDetail";
import LeftEyeTable from "../../../components/LeftEyeTable";
import RightEyeTable from "../../../components/RightEyeTable";
import PationtDetails from "../../../components/PationtDetails";
import { InvoiceInputModel } from "../../../model/InvoiceInputModel";
import InvoiceTable from "../../../components/inputui/InvoiceTable";
import CashInput from "../../../components/inputui/CashInput";
import CardInput from "../../../components/inputui/CardInput";
import OnlinePayInput from "../../../components/inputui/OnlinePayInput";
import DrawerStock from "../../../components/inputui/DrawerStock";
import LoadingAnimation from "../../../components/LoadingAnimation";
import { clearFrame } from "../../../features/invoice/frameFilterSlice";
import { clearLenses } from "../../../features/invoice/lenseFilterSlice";
import { clearOtherItem } from "../../../features/invoice/otherItemSlice";
import { clearexternalLense } from "../../../features/invoice/externalLenseSlice";

export default function OrderEditFrom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { invoiceDetail, invoiceDetailLoading, invoiceDetailError } =
    useGetSingleInvoiceDetail(parseInt(id ?? ""));

  const FrameInvoiceList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const LenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLenses
  );
  const externalLenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLense
  );
  const methods = useForm({
    resolver: yupResolver(factoryInvoiceSchema),
    defaultValues: {
      card: 0,
      cash: 0,
      discount: 0,
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearFrame());
      dispatch(clearLenses());
      dispatch(clearOtherItem());
      dispatch(clearexternalLense());
    };
  }, []);
  useEffect(() => {
    if (!invoiceDetailLoading && !invoiceDetailError) {
      methods.setValue("name", invoiceDetail.customer_details.name);
      methods.setValue("nic", invoiceDetail.customer_details.nic);
      methods.setValue(
        "phone_number",
        invoiceDetail.customer_details.phone_number
      );
    }
  }, [invoiceDetailError, invoiceDetailLoading]);
  const submiteFromData = async (data: InvoiceInputModel) => {
    console.log(data);
  };

  if (invoiceDetailLoading) {
    return (
      <div>
        <LoadingAnimation
          loadingMsg={"Checking for existing Invoie records..."}
        />
      </div>
    );
  }
  if (!invoiceDetailLoading && invoiceDetailError) {
    navigate("/transaction/order_edit");
    toast.error("Invalid Invoice Number");
  }
  if (!invoiceDetailLoading && invoiceDetailError) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <Box
        component={"form"}
        onSubmit={methods.handleSubmit(submiteFromData)}
        sx={{
          width: "100vw", // Ensure the parent takes full width
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Centers the child horizontally
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto", // Centers it
          }}
        >
          <LeftEyeTable />
          <RightEyeTable />

          {/* Passing The Note DAta to show in tthe dialog */}
          <PationtDetails />
        </Box>
        <InvoiceTable />
        <TextField
          fullWidth
          size="small"
          {...methods.register("remark")}
          sx={{ flexGrow: 1, maxWidth: "1200px", mt: 1 }}
          placeholder="remark"
          multiline
        />
        <Box
          sx={{
            display: "flex",
            gap: 1,
            m: 2,
            width: "100%",
            maxWidth: "1200px",
            justifyContent: "space-between",
          }}
        >
          <CashInput />
          <CardInput />
          <OnlinePayInput />
        </Box>
        <DrawerStock />
        <Button
          sx={{ width: "100%", maxWidth: "1200px" }}
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </FormProvider>
  );
}
