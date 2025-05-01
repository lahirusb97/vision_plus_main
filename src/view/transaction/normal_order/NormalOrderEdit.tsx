import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField } from "@mui/material";

import { useLocation, useNavigate } from "react-router";
import { schemaNormalInvoiceFormModel } from "../../../validations/schemaNormalInvoice";
import { FormProvider, useForm } from "react-hook-form";
import { NormalInvoiceFormModel } from "../../../validations/schemaNormalInvoice";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import {
  InvoiceItemsState,
  normalOrderItemsReducer,
} from "./normalOrderItemsReducer";
import { OtherItemModel } from "../../../model/OtherItemModel";

import { useEffect, useReducer } from "react";
import NormalPatientDetail from "./NormalPatientDetail";
import InvoiceOtherItems from "../../../components/InvoiceOtherItems";
import PaymentMethodsLayout from "../factory_layouts/PaymentMethodsLayout";
import SaveButton from "../../../components/SaveButton";
import VarificationDialog from "../../../components/VarificationDialog";
import axiosClient from "../../../axiosClient";
import toast from "react-hot-toast";
import { useValidationState } from "../../../hooks/validations/useValidationState";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import { NormalOrderInputModel } from "../../../model/NormalOrderInputModel";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import useGetSingleInvoice from "../../../hooks/useGetSingleInvoice";
import DataLoadingError from "../../../components/common/DataLoadingError";
import LoadingAnimation from "../../../components/LoadingAnimation";
import InvoiceOtherItemsTableEdit from "./InvoiceOtherItemsTableEdit";

export default function NormalOrderEdit() {
  const initialState: InvoiceItemsState = {
    items: [],
    total: 0,
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const {
    invoiceData: invoiceDetail,
    invoiceLoading,
    invoiceError,
  } = useGetSingleInvoice(queryParams.get("invoice_number") || "", "normal");
  const navigate = useNavigate();
  const { prepareValidation, resetValidation, validationState } =
    useValidationState();
  const [stateItems, dispatchItems] = useReducer(
    normalOrderItemsReducer,
    initialState
  );

  const methods = useForm<NormalInvoiceFormModel>({
    resolver: zodResolver(schemaNormalInvoiceFormModel),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
      branch_id: getUserCurentBranch()?.id,
      name: "",
      phone_number: "",
      address: "",
      nic: "",
      dob: "",
      discount: 0,
    },
  });
  const handleAddItem = (item: OtherItemModel, qty: number, price: number) => {
    const newItem = {
      other_item: item.item.id, // Assuming 'item' has 'id' and 'name'
      name: item.item.name,
      quantity: qty,
      price_per_unit: price,
      subtotal: qty * price,
    };

    dispatchItems({
      type: "ADD_ITEM",
      payload: newItem,
    });
  };

  const handleNormalInvoice = async (data: NormalInvoiceFormModel) => {
    //Remove 0 amounts related payments
    const totalPaid =
      (data.credit_card || 0) + (data.cash || 0) + (data.online_transfer || 0);

    const total = stateItems.total - data.discount;

    const userPayments = {
      credit_card: data.credit_card,
      cash: data.cash,
      online_transfer: data.online_transfer,
    };
    const prePayments = invoiceDetail?.order_details.order_payments;
    const simplifiedPayments = prePayments?.map(
      ({ id, amount, payment_method, transaction_status }) => ({
        id,
        amount: parseInt(amount),
        payment_method,
        transaction_status,
      })
    );
    const payload = {
      patient: {
        name: data.name,
        phone_number: data.phone_number,
        address: data.address,
        nic: data.nic,
        date_of_birth: data.dob === "" ? null : data.dob,
      },
      order: {
        invoice_type: "normal",
        status: totalPaid >= total ? "completed" : "pending",
        sub_total: stateItems.total,
        discount: data.discount,
        total_price: stateItems.total - data.discount,
        sales_staff_code: 1,
        branch_id: invoiceDetail?.order_details.branch_id,
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      order_items: stateItems.items.map(({ name, ...rest }) => rest),
      order_payments: [
        ...formatUserPayments(userPayments),
        ...(simplifiedPayments || []),
      ],
    };

    prepareValidation("create", async () => {
      await sendDataToDb(payload as NormalOrderInputModel);
    });
  };
  const sendDataToDb = async (postData: NormalOrderInputModel) => {
    try {
      // No refraction Data but have Refraction Number
      const responce = await axiosClient.put(
        `/orders/${invoiceDetail?.order}/`,
        postData
      );
      toast.success("Order & Refraction Details saved successfully");
      const url = `?invoice_number=${encodeURIComponent(
        responce.data.invoice_number
      )}`;
      navigate(`/transaction/normal_order/view/${url}`);
    } catch (err) {
      extractErrorMessage(err);
    }
  };
  useEffect(() => {
    if (invoiceDetail && !invoiceLoading) {
      methods.reset({
        name: invoiceDetail.customer_details.name,
        phone_number: invoiceDetail.customer_details.phone_number,
        address: invoiceDetail.customer_details.address || "",
        nic: invoiceDetail.customer_details.nic || "",
        dob: invoiceDetail.customer_details.date_of_birth || "",
        discount: parseInt(invoiceDetail.order_details.discount),
      });
      invoiceDetail.order_details.order_items
        .filter((items) => items.other_item !== null)
        .forEach((item) => {
          const newItem = {
            other_item: item.other_item, // Assuming 'item' has 'id' and 'name'
            name: item.other_item_detail.name,
            quantity: item.quantity,
            price_per_unit: parseInt(item.price_per_unit),
            subtotal: parseInt(item.subtotal),
          };

          dispatchItems({
            type: "ADD_ITEM",
            payload: newItem,
          });
        });
    }
  }, [invoiceDetail, invoiceLoading]);
  if (invoiceLoading) {
    return <LoadingAnimation loadingMsg="Loading Invoice..." />;
  }
  if (invoiceError) {
    return <DataLoadingError />;
  }
  return (
    <div>
      <FormProvider {...methods}>
        <Box
          onSubmit={methods.handleSubmit(handleNormalInvoice)}
          sx={{
            padding: 4,
            maxWidth: 2000,
            margin: "0 auto",
            borderRadius: 2,
            width: "800px",
          }}
          component={"form"}
        >
          {/* Row 1: Name, Phone No, Address, Sales Staff Code */}
          <NormalPatientDetail />
          <InvoiceOtherItems onAddItem={handleAddItem} />

          <InvoiceOtherItemsTableEdit
            items={stateItems.items}
            total={stateItems.total}
            onRemoveItem={(id) =>
              dispatchItems({ type: "REMOVE_ITEM", payload: id })
            }
            paymentList={invoiceDetail?.order_details?.order_payments ?? []}
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
            error={!!methods.formState.errors.branch_id}
            defaultValue={getUserCurentBranch()?.id}
          />
          <Box mt={1}>
            <SaveButton btnText="Save Invoice" loading={false} />
          </Box>
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
    </div>
  );
}
