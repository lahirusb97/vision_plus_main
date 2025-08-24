import { useReducer, useState } from "react";
import { Box, TextField } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, useForm } from "react-hook-form";
import InvoiceOtherItems from "../../../components/InvoiceOtherItems";
import NormalPatientDetail from "./NormalPatientDetail";
import {
  NormalInvoiceFormModel,
  schemaNormalInvoiceFormModel,
} from "../../../validations/schemaNormalInvoice";
import InvoiceOtherItemsTable from "./InvoiceOtherItemsTable";
import {
  InvoiceItemsState,
  normalOrderItemsReducer,
} from "./normalOrderItemsReducer";
import SaveButton from "../../../components/SaveButton";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import axiosClient from "../../../axiosClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { OtherItemModel } from "../../../model/OtherItemModel";
import PaymentMethodsLayout from "../factory_layouts/PaymentMethodsLayout";
import AuthDialog from "../../../components/common/AuthDialog";
import { useParams } from "react-router";
import useGetSinglePatient from "../../../hooks/useGetSinglePatient";
import OrderPatientDetail from "../../../components/common/OrderPatientDetail";
import PatientUpdateDialog from "../../../components/common/PatientUpdateDialog";

const NormalInvoice = () => {
  const { patient_id } = useParams();
  const { singlePatient, singlePatientLoading, singlePatientDataRefresh } =
    useGetSinglePatient(patient_id);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [pendingPostData, setPendingPostData] = useState<any | null>(null);

  const methods = useForm<NormalInvoiceFormModel>({
    resolver: zodResolver(schemaNormalInvoiceFormModel),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
      branch_id: getUserCurentBranch()?.id,
    },
  });
  const navigate = useNavigate();

  const initialState: InvoiceItemsState = {
    items: [],
    total: 0,
  };
  const [stateItems, dispatchItems] = useReducer(
    normalOrderItemsReducer,
    initialState
  );

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

    const payload = {
      patient_id: singlePatient?.id,
      order: {
        invoice_type: "normal",
        status: totalPaid >= total ? "completed" : "pending",
        sub_total: stateItems.total,
        discount: data.discount,
        total_price: stateItems.total - data.discount,
        sales_staff_code: 1,
        branch_id: getUserCurentBranch()?.id,
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      order_items: stateItems.items.map(({ name, ...rest }) => rest),
      order_payments: formatUserPayments(userPayments),
    };

    setAuthDialogOpen(true);
    setPendingPostData(payload);
  };
  const sendDataToDb = async (authData: {
    admin_id: number | null;
    user_id: number | null;
  }) => {
    try {
      const responce = await axiosClient.post("/orders/", {
        ...pendingPostData,
        order: {
          ...pendingPostData?.order,
          sales_staff_code: authData.user_id
            ? authData.user_id
            : authData.admin_id,
        },
      });
      toast.success("Order saved successfully");
      const url = `?invoice_number=${encodeURIComponent(
        responce.data.invoice_number
      )}`;
      //send to invoice view
      navigate(`/normal-order/view/${responce.data.invoice_number}/${url}`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  return (
    <>
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
          {/* <NormalPatientDetail /> */}
          <OrderPatientDetail
            patientData={singlePatient}
            onEdit={() => {
              setIsUpdateDialogOpen(true);
            }}
          />
          <InvoiceOtherItems onAddItem={handleAddItem} />

          <InvoiceOtherItemsTable
            items={stateItems.items}
            total={stateItems.total}
            onRemoveItem={(id) =>
              dispatchItems({ type: "REMOVE_ITEM", payload: id })
            }
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
      <AuthDialog
        open={authDialogOpen}
        operationType="user"
        onVerified={sendDataToDb}
        onClose={() => setAuthDialogOpen(false)}
      />
      {singlePatient && (
        <PatientUpdateDialog
          open={isUpdateDialogOpen}
          onClose={() => {
            setIsUpdateDialogOpen(false);
            // setEditPatient(null);
          }}
          updateSucess={() => {
            setIsUpdateDialogOpen(false);
            singlePatientDataRefresh();
            // setEditPatient(null);
          }}
          initialData={singlePatient}
        />
      )}
    </>
  );
};

export default NormalInvoice;
