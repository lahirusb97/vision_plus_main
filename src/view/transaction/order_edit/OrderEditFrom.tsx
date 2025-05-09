import Box from "@mui/material/Box";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";

import toast from "react-hot-toast";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import {
  FactoryInvoiceFormModel,
  schemaFactoryInvoice,
} from "../../../validations/factoryInvoiceSchema";

import LeftEyeTable from "../../../components/LeftEyeTable";
import RightEyeTable from "../../../components/RightEyeTable";
import PationtDetails from "../../../components/PationtDetails";
import DrawerStock from "../../../components/inputui/DrawerStock";
import LoadingAnimation from "../../../components/LoadingAnimation";
import {
  clearFrame,
  setFrame,
} from "../../../features/invoice/frameFilterSlice";
import {
  clearLenses,
  setLense,
} from "../../../features/invoice/lenseFilterSlice";
import { clearOtherItem } from "../../../features/invoice/otherItemSlice";
import {
  clearexternalLense,
  setexternalLense,
} from "../../../features/invoice/externalLenseSlice";

import axiosClient from "../../../axiosClient";
import { RootState } from "../../../store/store";

import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import HidenNoteDialog from "../../../components/HidenNoteDialog";
import StockDrawerBtn from "../../../components/StockDrawerBtn";
import { useFactoryOrderUpdateContext } from "../../../context/FactoryOrderUpdateContext";
import { useValidationState } from "../../../hooks/validations/useValidationState";
import VarificationDialog from "../../../components/VarificationDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import SugarCataractText from "../../../components/common/SugarCataractText";
import PdAndHeightInputs from "../factory_layouts/PdAndHeightInputs";
import PaymentMethodsLayout from "../factory_layouts/PaymentMethodsLayout";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import EditInvoiceTable from "../../../components/inputui/EditInvoiceTable";
import { FactoryOrderInputModel } from "../../../model/InvoiceInputModel";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useGetBusTitles from "../../../hooks/useGetBusTitles";
import { BUSID } from "../../../data/staticVariables";
import { getUserCurentBranch } from "../../../utils/authDataConver";

export default function OrderEditFrom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // SET VALUES FOR PATIENT TABLE
  const [orderProgress, setOrderProgress] = useState("");

  const staticTitleParam = useMemo(() => ({ is_active: true }), []);
  const { busTitlesList, busTitlesLoading } = useGetBusTitles(staticTitleParam);
  const { prepareValidation, resetValidation, validationState } =
    useValidationState();
  const currentBranch = getUserCurentBranch()?.id;

  const {
    invoiceDetail,
    invoiceDetailLoading,
    refractionDetail,
    refractionDetailLoading,
    invoiceDetailError,
  } = useFactoryOrderUpdateContext();
  const FrameInvoiceList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const frameTotal = useSelector(
    (state: RootState) => state.invoice_frame_filer.framesubTotal
  );
  const LenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLensesList
  );
  const lenseTotal = useSelector(
    (state: RootState) => state.invoice_lense_filer.lenseSubTotal
  );
  const externalLenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLenseList
  );
  const ExtraTotal = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLenseSubTotal
  );
  const methods = useForm<FactoryInvoiceFormModel>({
    resolver: zodResolver(schemaFactoryInvoice.omit({ branch_id: true })),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
      discount: 0,
      on_hold: false,
      fitting_on_collection: false,
    },
  });

  const discount = methods.watch("discount");

  const subtotal = frameTotal + lenseTotal + ExtraTotal;
  const grandTotal = subtotal - discount;

  useEffect(() => {
    return () => {
      dispatch(clearFrame());
      dispatch(clearLenses());
      dispatch(clearOtherItem());
      dispatch(clearexternalLense());
    };
  }, []);
  const [loadState, setLoadState] = useState(0);
  useEffect(() => {
    if (!invoiceDetailLoading && invoiceDetail) {
      methods.setValue("name", invoiceDetail?.customer_details.name);
      methods.setValue("nic", invoiceDetail?.customer_details.nic ?? undefined);
      methods.setValue(
        "address",
        invoiceDetail?.customer_details?.address ?? undefined
      );
      methods.setValue(
        "phone_number",
        invoiceDetail?.customer_details.phone_number
      );
      methods.setValue(
        "dob",
        invoiceDetail?.customer_details?.date_of_birth ?? undefined
      );
      methods.setValue(
        "discount",
        parseInt(invoiceDetail.order_details.discount)
      );
      methods.setValue("on_hold", invoiceDetail?.order_details?.on_hold);
      methods.setValue(
        "fitting_on_collection",
        invoiceDetail?.order_details?.fitting_on_collection
      );
      methods.setValue(
        "order_remark",
        invoiceDetail?.order_details?.order_remark
      );
      methods.setValue("pd", invoiceDetail?.order_details?.pd);
      methods.setValue("height", invoiceDetail?.order_details?.height);
      methods.setValue(
        "left_height",
        invoiceDetail?.order_details?.left_height
      );
      methods.setValue(
        "right_height",
        invoiceDetail?.order_details?.right_height
      );
      methods.setValue("left_pd", invoiceDetail?.order_details?.left_pd);
      methods.setValue("right_pd", invoiceDetail?.order_details?.right_pd);
      methods.setValue("user_date", invoiceDetail?.order_details?.user_date);

      methods.setValue(
        "bus_title",
        BUSID === currentBranch ? invoiceDetail.order_details.bus_title : null
      );
      setOrderProgress(invoiceDetail.progress_status);
    }
    if (invoiceDetail && !invoiceDetailLoading && loadState === 0) {
      invoiceDetail?.order_details.order_items
        .filter((items) => items.frame !== null)
        .forEach((item) => {
          // const { brand, code, color, id } = item.frame_detail;
          dispatch(
            setFrame({
              frame_id: item.frame,
              buyQty: item.quantity,
              avilable_qty: item.quantity,
              price_per_unit: parseInt(item.price_per_unit),
              subtotal: parseInt(item.subtotal),
              frame_detail: {
                brand_name: item.frame_detail?.brand_name,
                code_name: item.frame_detail?.code_name,
                color_name: item.frame_detail?.color_name,
                size: item.frame_detail?.size,
                species: item.frame_detail?.species,
                brand_type_display: item.frame_detail?.brand_type_display,
              },
            })
          );
        });

      invoiceDetail?.order_details.order_items
        .filter((items) => items.external_lens !== null)
        .forEach((item) => {
          dispatch(
            setexternalLense({
              external_lens_id: item.external_lens,
              buyQty: item.quantity,
              price_per_unit: parseInt(item.price_per_unit),
              subtotal: parseInt(item.subtotal),
              note: item.note,
              external_lens_details: {
                //add branded none branded
                brand_name: item?.brand_name,
                type_name: item?.type_name,
                coating_name: item?.coating_name,
              },
            })
          );
        });

      invoiceDetail?.order_details.order_items
        .filter((items) => items.lens !== null)
        .forEach((item) => {
          dispatch(
            setLense({
              lense_id: item.lens,
              avilable_qty: item.quantity, //TODO UPDATE BACKEND to get stock avilable qty
              price_per_unit: parseInt(item.price_per_unit),
              buyQty: item.quantity,
              subtotal: parseInt(item.subtotal),
              lense_detail: {
                brand_name: item.lens_detail?.brand_name,
                type_name: item.lens_detail?.type_name,
                coating_name: item.lens_detail?.coating_name,
                powers: item?.lens_powers,
              },
            })
          );
        });

      setLoadState(1);
    }
  }, [invoiceDetail]);
  const handleChange = (event: SelectChangeEvent) => {
    setOrderProgress(event.target.value as string);
  };
  useEffect(() => {
    return () => {
      dispatch(clearFrame());
      dispatch(clearLenses());
      dispatch(clearOtherItem());
      dispatch(clearexternalLense());
    };
  }, []);

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

  const submiteFromData = async (data: FactoryInvoiceFormModel) => {
    const prePayments = invoiceDetail?.order_details.order_payments;
    const simplifiedPayments = prePayments?.map(
      ({ id, amount, payment_method, transaction_status }) => ({
        id,
        amount: parseInt(amount),
        payment_method,
        transaction_status,
      })
    );

    const lastPayment = parseInt(invoiceDetail?.order_details.sub_total || "0");
    const orderState =
      grandTotal <=
      data.credit_card + data.cash + data.online_transfer + lastPayment
        ? "completed"
        : "pending";

    const userPayments = {
      credit_card: data.credit_card,
      cash: data.cash,
      online_transfer: data.online_transfer,
    };
    const postData = {
      patient: {
        refraction_id: invoiceDetail?.customer_details.refraction_id,
        name: data.name,
        nic: data.nic,
        address: data.address,
        phone_number: data.phone_number,
        date_of_birth: data.dob,
      },
      order: {
        refraction: invoiceDetail?.customer_details.refraction_id,
        status: orderState,
        sub_total: subtotal,
        discount: discount,
        total_price: grandTotal,
        order_remark: data.order_remark,
        sales_staff_code: invoiceDetail?.order_details.sales_staff_code, //TODO TEST THIS
        branch_id: invoiceDetail?.order_details.branch_id,
        pd: data.pd,
        right_pd: data.right_pd,
        left_pd: data.left_pd,
        height: data.height,
        right_height: data.right_height,
        left_height: data.left_height,
        fitting_on_collection: data.fitting_on_collection,
        on_hold: data.on_hold,
        user_date: data.user_date,
        bus_title: BUSID === currentBranch ? data.bus_title : null,
        progress_status: orderProgress,
      },
      order_items: [
        ...Object.values(LenseInvoiceList).map((item) => ({
          lens: item.lense_id,
          quantity: item.buyQty,
          price_per_unit: item.price_per_unit,
          subtotal: item.subtotal,
        })),

        ...Object.values(FrameInvoiceList).map((item) => ({
          frame: item.frame_id,
          quantity: item.buyQty,
          price_per_unit: item.price_per_unit,
          subtotal: item.subtotal,
        })),

        ...Object.values(externalLenseInvoiceList).map((item) => ({
          external_lens: item.external_lens_id,
          quantity: item.buyQty,
          price_per_unit: item.price_per_unit,
          subtotal: item.subtotal,
          is_non_stock: true,
          //!Note here
        })),
      ],
      order_payments: [
        ...formatUserPayments(userPayments),
        ...(simplifiedPayments || []),
      ],
    };

    if (
      Object.keys(externalLenseInvoiceList).length > 0 ||
      Object.keys(LenseInvoiceList).length > 0 ||
      Object.keys(FrameInvoiceList).length > 0
    ) {
      prepareValidation("create", async () => {
        await sendDataToDb(postData as FactoryOrderInputModel);
      });
    } else {
      toast.error("No Items ware added");
    }
  };

  const sendDataToDb = async (postData: FactoryOrderInputModel) => {
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
      navigate(
        `/transaction/factory_order/create/${invoiceDetail?.customer_details.refraction_id}/view/${url}`
      );
    } catch (err) {
      extractErrorMessage(err);
    }
  };
  return (
    <>
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
            <Box
              sx={{
                mr: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <RightEyeTable refractionDetail={refractionDetail} />
                <LeftEyeTable refractionDetail={refractionDetail} />
              </Box>
              <Typography
                sx={{ border: "1px solid gray", px: 1, mx: 1, mb: 1 }}
              >
                Refraction Remark - {refractionDetail?.refraction_remark}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  rowGap: 1,
                  alignItems: "center",
                  ml: 1,
                }}
              >
                {refractionDetail && (
                  <SugarCataractText
                    shuger={refractionDetail.shuger}
                    cataract={refractionDetail.cataract}
                    blepharitis={refractionDetail.blepharitis}
                  />
                )}
                <Box ml={1} display="flex" alignItems="center">
                  <Typography variant="body1"> On Hold</Typography>
                  <Checkbox
                    {...methods.register("on_hold")}
                    checked={methods.watch("on_hold") || false} // Add fallback to false
                    onChange={(e) =>
                      methods.setValue("on_hold", e.target.checked)
                    }
                  />
                </Box>

                <Box display="flex" alignItems="center">
                  <Typography variant="body1">
                    | Fiting on Collection
                  </Typography>

                  <Checkbox
                    {...methods.register("fitting_on_collection")}
                    checked={methods.watch("fitting_on_collection") || false} // Add fallback to false
                    onChange={(e) =>
                      methods.setValue(
                        "fitting_on_collection",
                        e.target.checked
                      )
                    }
                  />
                </Box>
                <FormControl size="small" sx={{ minWidth: 250 }}>
                  <InputLabel id="demo-simple-select-label">
                    {" "}
                    Order Progress Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={orderProgress}
                    label="Order Progress Status"
                    onChange={handleChange}
                    error={orderProgress === ""}
                  >
                    <MenuItem value={"received_from_customer"}>
                      Received From Customer
                    </MenuItem>
                    <MenuItem value={"issue_to_factory"}>
                      Issue to Factory
                    </MenuItem>
                    <MenuItem value={"received_from_factory"}>
                      Received from Factory
                    </MenuItem>
                    <MenuItem value={"issue_to_customer"}>
                      Issue to Customer
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* sending data trugh invoide details with usefrom hook */}
            {!refractionDetailLoading && (
              <PationtDetails
                prescription={
                  refractionDetail?.prescription_type_display ||
                  "Prescription Not Found"
                }
                refractionNumber={
                  invoiceDetail?.customer_details?.refraction_number ||
                  "Refraction Number Not Found"
                }
              />
            )}
          </Box>
          <Box
            sx={{
              maxWidth: "1200px",
              width: "100%",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HidenNoteDialog note={invoiceDetail?.refraction_details?.note} />

            <StockDrawerBtn />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="user_date"
                control={methods.control}
                render={({ field }) => (
                  <DatePicker
                    sx={{ mx: 1, width: 150 }}
                    label="Deliver Date"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date?.format("YYYY-MM-DD"));
                    }}
                    format="YYYY-MM-DD"
                    slotProps={{
                      textField: {
                        fullWidth: false,
                        size: "small",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            {BUSID === currentBranch && (
              <Box sx={{ width: 300 }}>
                <Controller
                  name="bus_title"
                  control={methods.control}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <InputLabel id="bus-title-label">
                        {" "}
                        Select To day Title
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="bus-title-label"
                        label="Select To day Title"
                        {...field}
                        value={field.value ?? ""}
                        disabled={busTitlesLoading}
                      >
                        {busTitlesLoading ? (
                          <MenuItem value="">
                            <CircularProgress size={20} />
                          </MenuItem>
                        ) : (
                          busTitlesList.map((title) => (
                            <MenuItem key={title.id} value={title.id}>
                              {title.title}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
            )}
          </Box>
          <EditInvoiceTable
            paymentList={invoiceDetail?.order_details?.order_payments ?? []}
          />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              maxWidth: "1200px",
              alignItems: "center",
              gap: 1,
              mt: 1,
            }}
          >
            <PdAndHeightInputs />
            <TextField
              fullWidth
              size="small"
              {...methods.register("order_remark")}
              sx={{ maxWidth: "1200px" }}
              placeholder="Order remark"
              rows={3} // Defines the number of visible lines
              multiline
            />
          </Box>

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
            <PaymentMethodsLayout />

            <Button
              sx={{ width: "400px" }}
              size="small"
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Box>
          <DrawerStock refractionDetail={refractionDetail} />
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
}
