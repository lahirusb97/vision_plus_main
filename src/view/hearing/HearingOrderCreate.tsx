import React, { useState } from "react";
import {
  HearingOrderForm,
  schemaHearingOrderForm,
} from "../../validations/schemaHearingOrder";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NormalPatientDetail from "../transaction/normal_order/NormalPatientDetail";
import { Box, Paper, TextField, Typography } from "@mui/material";
import { getUserCurentBranch } from "../../utils/authDataConver";
import AuthDialog from "../../components/common/AuthDialog";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import SubmitCustomBtn from "../../components/common/SubmiteCustomBtn";
import PaymentMethodsLayout from "../transaction/factory_layouts/PaymentMethodsLayout";
import { useReducer } from "react";
import {
  hearingOrderItemsReducer,
  HearingOrderItemsState,
} from "./hearingOrderItemsReducer";
import { HearingItemStockSerializer } from "../../model/HearingtemStockSerializer";
import InvoiceHearingItems from "../../components/InvoiceHearingItems";
import InvoiceHearingItemsTable from "./InvoiceHearingItemsTable";
import { formatUserPayments } from "../../utils/formatUserPayments";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import OrderPatientDetail from "../../components/common/OrderPatientDetail";
import useGetSinglePatient from "../../hooks/useGetSinglePatient";
import PatientUpdateDialog from "../../components/common/PatientUpdateDialog";

const initialState: HearingOrderItemsState = {
  items: [],
  total: 0,
};
export default function HearingOrderCreate() {
  const { patient_id } = useParams();
  const { singlePatient, singlePatientLoading, singlePatientDataRefresh } =
    useGetSinglePatient(patient_id);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [pendingPostData, setPendingPostData] = useState<any | null>(null);
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const navigate = useNavigate();
  const [stateItems, dispatchItems] = useReducer(
    hearingOrderItemsReducer,
    initialState
  );
  const methods = useForm<HearingOrderForm>({
    resolver: zodResolver(schemaHearingOrderForm),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
    },
  });

  //reducer handle
  const handleAddItem = (
    item: HearingItemStockSerializer,
    qty: number,
    price: number,
    serialNo: string,
    battery: string,
    nextServiceDate: string | null
  ) => {
    const newItem = {
      hearing_item: item.item.id, // Assuming 'item' has 'id' and 'name'
      name: item.item.name,
      quantity: qty,
      price_per_unit: price,
      subtotal: qty * price,
      serial_no: serialNo,
      battery: battery,
      next_service_date: nextServiceDate,
    };

    dispatchItems({
      type: "ADD_ITEM",
      payload: newItem,
    });
  };

  //reducer handle

  const sendDataToDb = async (authData: {
    admin_id: number | null;
    user_id: number | null;
  }) => {
    try {
      const responce = await postHandler("hearing-orders/", {
        ...pendingPostData,
        sales_staff_code: authData.user_id
          ? authData.user_id
          : authData.admin_id,
      });
      toast.success("Order saved successfully");
      const url = `?invoice_number=${encodeURIComponent(
        responce.data?.invoice?.invoice_number
      )}`;
      // //send to invoice view
      navigate(`/hearing/${responce.data?.invoice?.invoice_number}${url}/`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  const hearingOrderSubmite = (data: HearingOrderForm) => {
    if (!singlePatient?.id) {
      toast.error("Patient Details Missing Refresh the page");
      return;
    }
    const totalPaid =
      (data.credit_card || 0) + (data.cash || 0) + (data.online_transfer || 0);

    const total = stateItems.total - data.discount;

    const userPayments = {
      credit_card: data.credit_card,
      cash: data.cash,
      online_transfer: data.online_transfer,
    };
    const postData = {
      patient_id: singlePatient?.id,
      order: {
        invoice_type: "hearing",
        status: totalPaid >= total ? "completed" : "pending",
        sub_total: stateItems.total,
        discount: data.discount,
        total_price: stateItems.total - data.discount,
        order_remark: data.order_remark,
        branch_id: getUserCurentBranch()?.id,
      },
      order_items: stateItems.items.map(({ name, ...rest }) => rest),
      order_payments: formatUserPayments(userPayments),
    };
    setAuthDialogOpen(true);
    setPendingPostData(postData);
  };
  return (
    <div style={{ width: "1000px" }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(hearingOrderSubmite)}>
          <OrderPatientDetail
            patientData={singlePatient}
            onEdit={() => {
              setIsUpdateDialogOpen(true);
            }}
          />

          <InvoiceHearingItems onAddItem={handleAddItem} />
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {stateItems.items.map((item) => (
              <Box>
                <Typography>{item.name}</Typography>
                <TextField
                  size="small"
                  onChange={(e) =>
                    dispatchItems({
                      type: "UPDATE_ITEM",
                      payload: { ...item, serial_no: e.target.value },
                    })
                  }
                  label="Serial No"
                  type="text"
                  value={item.serial_no}
                />
                <TextField
                  sx={{ mx: 1 }}
                  size="small"
                  onChange={(e) =>
                    dispatchItems({
                      type: "UPDATE_ITEM",
                      payload: { ...item, battery: e.target.value },
                    })
                  }
                  label="Battery"
                  type="text"
                  value={item.battery}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Next Service Date"
                    value={
                      item.next_service_date
                        ? dayjs(item.next_service_date)
                        : null
                    }
                    onChange={(newValue) =>
                      dispatchItems({
                        type: "UPDATE_ITEM",
                        payload: {
                          ...item,
                          next_service_date:
                            newValue?.format("YYYY-MM-DD") || null,
                        },
                      })
                    }
                    format="YYYY-MM-DD"
                  />
                </LocalizationProvider>
              </Box>
            ))}
          </Paper>
          <InvoiceHearingItemsTable
            items={stateItems.items}
            total={stateItems.total}
            onRemoveItem={(id) =>
              dispatchItems({ type: "REMOVE_ITEM", payload: id })
            }
          />
          <TextField
            sx={{ my: 1 }}
            fullWidth
            size="small"
            {...methods.register("order_remark")}
            placeholder="Order remark"
            rows={2} // Defines the number of visible lines
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
            btnText="Create Hearing Order "
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
      {singlePatient && (
        <PatientUpdateDialog
          open={isUpdateDialogOpen}
          onClose={() => {
            setIsUpdateDialogOpen(false);
            // setEditPatient(null);
          }}
          updateSucess={(data) => {
            setIsUpdateDialogOpen(false);
            singlePatientDataRefresh();
            // setEditPatient(null);
          }}
          initialData={singlePatient}
        />
      )}
    </div>
  );
}
