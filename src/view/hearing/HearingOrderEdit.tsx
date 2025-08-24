import { useEffect, useState } from "react";
import { schemaHearingOrderForm } from "../../validations/schemaHearingOrder";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { getUserCurentBranch } from "../../utils/authDataConver";
import AuthDialog from "../../components/common/AuthDialog";
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
import { formatUserPayments } from "../../utils/formatUserPayments";
import useGetSingleInvoice from "../../hooks/useGetSingleInvoice";
import stringToIntConver from "../../utils/stringToIntConver";
import { schemayPaymentUpdateDelete } from "../../validations/schemayPaymentUpdateDelete";
import { z } from "zod";
import PaymentsForm from "../../components/common/PaymentsForm";
import InvoiceHearingItemsTableEdit from "./InvoiceHearingItemsTableEdit";
import LoadingAnimation from "../../components/LoadingAnimation";
import DataLoadingError from "../../components/common/DataLoadingError";
import { useAxiosPut } from "../../hooks/useAxiosPut";
import OrderDeleteRefund from "../../components/common/order-delete-refund-dialog/OrderDeleteRefund";
import OrderAuditDialog from "../../components/OrderAuditDialog";
import { History } from "lucide-react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import OrderPatientDetail from "../../components/common/OrderPatientDetail";
import PatientUpdateDialog from "../../components/common/PatientUpdateDialog";
import useGetSinglePatient from "../../hooks/useGetSinglePatient";

const initialState: HearingOrderItemsState = {
  items: [],
  total: 0,
};
export default function HearingOrderEdit() {
  const { invoice_number } = useParams();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [loadState, setLoadState] = useState(false);
  const [pendingPostData, setPendingPostData] = useState<any | null>(null);
  const {
    invoiceData: invoiceDetail,
    invoiceLoading,
    invoiceError,
  } = useGetSingleInvoice(invoice_number || "", "hearing");
  const { singlePatient, singlePatientDataRefresh, singlePatientLoading } =
    useGetSinglePatient(
      invoiceDetail?.customer_details?.id?.toString() || null
    );
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const navigate = useNavigate();
  const [stateItems, dispatchItems] = useReducer(
    hearingOrderItemsReducer,
    initialState
  );
  const [auditDialog, setAuditDialog] = useState<{
    open: boolean;
    orderId: number | null;
  }>({
    open: false,
    orderId: null,
  });
  const schemaHearingOrderFormEdit = schemaHearingOrderForm.extend({
    payments: z.array(schemayPaymentUpdateDelete),
  });
  const methods = useForm<z.infer<typeof schemaHearingOrderFormEdit>>({
    resolver: zodResolver(schemaHearingOrderFormEdit),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
      discount: 0,
    },
  });

  //reducer handle
  const handleAddItem = (
    item: HearingItemStockSerializer,
    qty: number,
    price: number,
    serialNo: string,
    battery: string
  ) => {
    const newItem = {
      hearing_item: item.item.id, // Assuming 'item' has 'id' and 'name'
      name: item.item.name,
      quantity: qty,
      price_per_unit: price,
      subtotal: qty * price,
      serial_no: serialNo,
      battery: battery,
      next_service_date: null,
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
      const responce = await putHandler(`orders/${invoiceDetail?.order}/`, {
        ...pendingPostData,
        ...authData,
      });
      toast.success("Order saved successfully");
      // //send to invoice view
      console.log(responce.data);
      navigate(`/hearing/${responce.data?.invoice_number}/`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  const hearingOrderSubmite = (
    data: z.infer<typeof schemaHearingOrderFormEdit>
  ) => {
    const totalPaid =
      (data.credit_card || 0) + (data.cash || 0) + (data.online_transfer || 0);

    const total = stateItems.total - data.discount;

    const userPayments = {
      credit_card: data.credit_card,
      cash: data.cash,
      online_transfer: data.online_transfer,
    };

    const postData = {
      order: {
        invoice_type: "hearing",
        status: totalPaid >= total ? "completed" : "pending",
        sub_total: stateItems.total,
        discount: data.discount,
        total_price: stateItems.total - data.discount,
        order_remark: data.order_remark,
        branch_id: invoiceDetail?.order_details.branch_id,
      },
      order_items: stateItems.items.map(({ name, ...rest }) => rest),
      order_payments: [...formatUserPayments(userPayments), ...data.payments],
    };
    setAuthDialogOpen(true);
    setPendingPostData(postData);
  };

  //! load invoice data to inputs
  useEffect(() => {
    if (invoiceDetail && !invoiceLoading && !loadState) {
      methods.reset({
        discount: parseInt(invoiceDetail.order_details.discount),
        payments: invoiceDetail.order_details.order_payments.map((payment) => ({
          id: payment.id,
          amount: stringToIntConver(payment.amount),
          payment_method: payment.payment_method,
          is_final: payment.is_final_payment,
          payment_date: payment.payment_date,
        })),
      });

      invoiceDetail.order_details.order_items
        .filter((items) => items.hearing_item !== null)
        .forEach((item) => {
          const newItem = {
            id: item.id,
            hearing_item: item.hearing_item, // Assuming 'item' has 'id' and 'name'
            name: item.hearing_item_detail.name,
            quantity: item.quantity,
            price_per_unit: parseInt(item.price_per_unit),
            subtotal: parseInt(item.subtotal),
            serial_no: item.serial_no,
            battery: item.battery,
            next_service_date: item.next_service_date,
          };

          dispatchItems({
            type: "ADD_ITEM",
            payload: newItem,
          });
        });
      setLoadState(true);
    }
  }, [invoiceDetail, invoiceLoading, loadState]);
  if (invoiceLoading) {
    return <LoadingAnimation loadingMsg="Loading Invoice..." />;
  }
  if (invoiceError) {
    return <DataLoadingError />;
  }
  return (
    <div style={{ width: "1000px" }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(hearingOrderSubmite)}>
          {invoiceDetail?.customer_details &&
            !singlePatientLoading &&
            singlePatient && (
              <OrderPatientDetail
                patientData={singlePatient}
                onEdit={() => {
                  setIsUpdateDialogOpen(true);
                }}
                refractionNumber={invoiceDetail?.refraction_number}
                prescription={
                  invoiceDetail?.refraction_details?.prescription_type_display
                }
              />
            )}
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
          <OrderDeleteRefund
            dialogType="both"
            order_id={invoiceDetail?.order?.toString()}
          />
          <Button
            sx={{ ml: 1 }}
            variant="outlined"
            color="info"
            onClick={() =>
              setAuditDialog({
                open: true,
                orderId: invoiceDetail?.order || null,
              })
            }
          >
            history
            <History style={{ width: 18 }} />
          </Button>
          <OrderAuditDialog
            open={auditDialog.open}
            orderId={auditDialog.orderId}
            onClose={() => setAuditDialog({ open: false, orderId: null })}
          />
          <InvoiceHearingItemsTableEdit
            items={stateItems.items}
            total={stateItems.total}
            onRemoveItem={(id: number) =>
              dispatchItems({ type: "REMOVE_ITEM", payload: id })
            }
            paymentList={invoiceDetail?.order_details?.order_payments ?? []}
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
          <Box sx={{ mt: 2 }}>
            <PaymentsForm />
          </Box>
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
            isError={putHandlerError}
            loading={putHandlerloading}
          />
        </form>
      </FormProvider>
      <AuthDialog
        open={authDialogOpen}
        operationType="user"
        onVerified={sendDataToDb}
        onClose={() => setAuthDialogOpen(false)}
      />
      {invoiceDetail?.customer_details && (
        <PatientUpdateDialog
          open={isUpdateDialogOpen}
          onClose={() => {
            setIsUpdateDialogOpen(false);
          }}
          updateSucess={() => {
            setIsUpdateDialogOpen(false);
            singlePatientDataRefresh();
          }}
          initialData={{
            ...invoiceDetail?.customer_details,
          }}
        />
      )}
    </div>
  );
}
