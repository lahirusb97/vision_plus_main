import { useReducer, useState } from "react";
import { Box, TextField } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import VarificationDialog from "../../../components/VarificationDialog";

import { FormProvider, useForm } from "react-hook-form";
import InvoiceOtherItems from "../../../components/InvoiceOtherItems";
import NormalPatientDetail from "./NormalPatientDetail";
import { OtherItemModel } from "../../../model/OtherItemModel";
import {
  NormalInvoiceFormModel,
  schemaNormalInvoiceFormModel,
} from "../../../validations/schemaNormalInvoice";
import InvoiceOtherItemsTable from "./InvoiceOtherItemsTable";
import {
  InvoiceItemsState,
  normalOrderItemsReducer,
} from "./normalOrderItemsReducer";
import CardInput from "../../../components/inputui/CardInput";
import OnlinePayInput from "../../../components/inputui/OnlinePayInput";
import CashInput from "../../../components/inputui/CashInput";
import SaveButton from "../../../components/SaveButton";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import { useValidationState } from "../../../hooks/validations/useValidationState";
import axiosClient from "../../../axiosClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

const NormalInvoice = () => {
  const { prepareValidation, resetValidation, validationState } =
    useValidationState();
  const methods = useForm({
    resolver: zodResolver(schemaNormalInvoiceFormModel),
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

  const handleAddItem = (item, qty, price) => {
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
    methods.getValues("total");
    const payload = {
      patient: {
        name: data.name,
        phone_number: data.phone_number,
        address: data.address,
        nic: data.nic,
        date_of_birth: data.dob,
      },
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

    prepareValidation("create", async (verifiedUserId: number) => {
      await sendDataToDb(payload, verifiedUserId);
    });
  };
  const sendDataToDb = async (
    payload: NormalInvoiceFormModel,
    verifiedUserId: number
  ) => {
    try {
      const responce = await axiosClient.post("/orders/", {
        ...payload,
        order: {
          ...payload.order,
          sales_staff_code: verifiedUserId, // 👈 inject staff code here
        },
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
          <NormalPatientDetail
            prescription={""}
            refractionDetailLoading={false}
            refractionNumber={""}
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
            <OnlinePayInput />

            <CardInput />
            <CashInput />
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
    </>
  );
};

export default NormalInvoice;
