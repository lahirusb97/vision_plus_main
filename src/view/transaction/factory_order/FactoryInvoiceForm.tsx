import Box from "@mui/material/Box";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  FactoryInvoiceFormModel,
  schemaFactoryInvoice,
} from "../../../validations/factoryInvoiceSchema";
//Store
import { RootState } from "../../../store/store";
import { clearFrame } from "../../../features/invoice/frameFilterSlice";
import { clearLenses } from "../../../features/invoice/lenseFilterSlice";
import { clearOtherItem } from "../../../features/invoice/otherItemSlice";
//Components
import InvoiceTable from "../../../components/inputui/InvoiceTable";
import LoadingAnimation from "../../../components/LoadingAnimation";
import RightEyeTable from "../../../components/RightEyeTable";
import LeftEyeTable from "../../../components/LeftEyeTable";
import axiosClient from "../../../axiosClient";
import PationtDetails from "../../../components/PationtDetails";
import { clearexternalLense } from "../../../features/invoice/externalLenseSlice";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import StockDrawerBtn from "../../../components/StockDrawerBtn";
import HidenNoteDialog from "../../../components/HidenNoteDialog";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useFactoryOrderContext } from "../../../context/FactoryOrderContext";
import VarificationDialog from "../../../components/VarificationDialog";
import { useValidationState } from "../../../hooks/validations/useValidationState";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import SugarCataractText from "../../../components/common/SugarCataractText";
import PdAndHeightInputs from "../factory_layouts/PdAndHeightInputs";
import PaymentMethodsLayout from "../factory_layouts/PaymentMethodsLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { FactoryOrderInputModel } from "../../../model/InvoiceInputModel";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useGetBusTitles from "../../../hooks/useGetBusTitles";
import { BUSID } from "../../../data/staticVariables";
import { ProgressStatus } from "../../../model/StaticTypeModels";
export default function FactoryInvoiceForm() {
  const { prepareValidation, resetValidation, validationState } =
    useValidationState();
  const { refraction_id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //HOOKS
  const { singlerefractionNumber, refractionDetail, refractionDetailLoading } =
    useFactoryOrderContext();
  const staticTitleParam = useMemo(() => ({ is_active: true }), []);
  const { busTitlesList, busTitlesLoading } = useGetBusTitles(staticTitleParam);
  const currentBranch = getUserCurentBranch()?.id;

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
  // Store Data**

  const methods = useForm<FactoryInvoiceFormModel>({
    resolver: zodResolver(schemaFactoryInvoice),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
      discount: 0,
      progress_status: "received_from_customer",
    },
  });
  const discount = methods.watch("discount");
  // Set defaultId when list is available
  useEffect(() => {
    if (busTitlesList.length > 0) {
      methods.setValue("bus_title", busTitlesList[0].id);
    }
  }, [busTitlesList]);

  //Store Data
  useEffect(() => {
    if (singlerefractionNumber) {
      methods.setValue("name", singlerefractionNumber.customer_full_name);
      methods.setValue("phone_number", singlerefractionNumber.customer_mobile);
      methods.setValue("nic", singlerefractionNumber.nic);
    }
  }, [singlerefractionNumber]);

  //calculate total send

  const subtotal = frameTotal + lenseTotal + ExtraTotal;
  //Total  with discount
  const grandTotal = subtotal - discount;

  useEffect(() => {
    return () => {
      dispatch(clearFrame());
      dispatch(clearLenses());
      dispatch(clearOtherItem());
      dispatch(clearexternalLense());
    };
  }, []);
  console.log(methods.watch("progress_status"));

  const submiteFromData = async (data: FactoryInvoiceFormModel) => {
    if (refraction_id) {
      //HANDLE PAYMENT To REMOVE SENDING  0
      const orderState =
        grandTotal <= data.credit_card + data.cash + data.online_transfer
          ? "completed"
          : "pending";
      const userPayments = {
        credit_card: data.credit_card,
        cash: data.cash,
        online_transfer: data.online_transfer,
      };
      const postData = {
        patient: {
          refraction_id: parseInt(refraction_id),
          name: data.name,
          nic: data.nic,
          address: data.address,
          phone_number: data.phone_number,
          date_of_birth: data.dob,
        },
        order: {
          refraction: parseInt(refraction_id),
          status: orderState,
          sub_total: subtotal,
          discount: discount,
          total_price: grandTotal,
          order_remark: data.order_remark,
          // sales_staff_code: data.sales_staff_code, //!user code ID set this using varification Dialog
          pd: data.pd,
          right_pd: data.right_pd,
          left_pd: data.left_pd,
          height: data.height,
          right_height: data.right_height,
          left_height: data.left_height,
          fitting_on_collection: data.fitting_on_collection,
          on_hold: data.on_hold,
          branch_id: data.branch_id,
          user_date: data.user_date,
          bus_title: BUSID === currentBranch ? data.bus_title : null,
          progress_status: data.progress_status,
        },
        order_items: [
          ...Object.values(LenseInvoiceList).map((item) => ({
            lens: item.lense_id,
            quantity: item.buyQty,
            price_per_unit: item.price_per_unit,
            subtotal: item.subtotal,
            is_non_stock: false,
          })),

          ...Object.values(FrameInvoiceList).map((item) => ({
            frame: item.frame_id,
            quantity: item.buyQty,
            price_per_unit: item.price_per_unit,
            subtotal: item.subtotal,
            is_non_stock: false,
          })),
          ...Object.values(externalLenseInvoiceList).map((item) => ({
            external_lens: item.external_lens_id,
            quantity: item.buyQty,
            price_per_unit: item.price_per_unit,
            subtotal: item.subtotal,
            note: item.note,
            is_non_stock: true,
            whatsapp_sent: "not_sent",
            //!Note here
          })),
        ],
        order_payments: formatUserPayments(userPayments),
      };

      if (
        Object.keys(externalLenseInvoiceList).length > 0 ||
        Object.keys(LenseInvoiceList).length > 0 ||
        Object.keys(FrameInvoiceList).length > 0
      ) {
        if (refractionDetail && !refractionDetailLoading) {
          prepareValidation("create", async (verifiedUserId: number) => {
            await sendDataToDb(postData, verifiedUserId);
          });
          //TODO USE THIS AND CREATE THE SYSTEM ALL GOOD TO DO IF NO REFRACTION DETAILS NO DETAIL CREATINS
        } else {
          toast.error("Refraction Detail Not Found");
        }
      } else {
        toast.error("No Items ware added");
      }
    } else {
      toast.error("Selected Petient Does not Have a  Refraction Number");
    }
  };
  const sendDataToDb = async (
    postData: FactoryOrderInputModel,
    verifiedUserId: number
  ) => {
    try {
      const responce = await axiosClient.post("/orders/", {
        ...postData,
        order: {
          ...postData.order,
          sales_staff_code: verifiedUserId,
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
        {refractionDetailLoading ? (
          <LoadingAnimation
            loadingMsg={"Checking for existing refraction records..."}
          />
        ) : (
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
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1"> On Hold</Typography>
                    <Checkbox {...methods.register("on_hold")} />
                  </Box>

                  <Box display="flex" alignItems="center">
                    <Typography variant="body1">
                      | Fiting on Collection
                    </Typography>
                    <Checkbox {...methods.register("fitting_on_collection")} />
                  </Box>
                  <Box ml={1} display="flex" alignItems="center">
                    <Typography variant="body1"> Issue To Good</Typography>
                    <Controller
                      name="progress_status"
                      control={methods.control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value === "issue_to_customer"}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange("issue_to_customer");
                            } else {
                              field.onChange("received_from_customer");
                            }
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Passing The Note DAta to show in tthe dialog */}

              {!refractionDetailLoading && refractionDetail && (
                <PationtDetails
                  prescription={refractionDetail?.prescription_type_display}
                  refractionNumber={singlerefractionNumber?.refraction_number}
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
              <HidenNoteDialog note={refractionDetail?.note} />

              <StockDrawerBtn refractionDetail={refractionDetail} />

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
                          error: Boolean(methods.formState.errors.user_date),
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

            <InvoiceTable />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                maxWidth: "1200px",
                alignItems: "center",
                gap: 1,
                my: 1,
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
                gap: 2,
                mb: 1,
                width: "100%",
                maxWidth: "1200px",
                justifyContent: "space-between",
              }}
            >
              <PaymentMethodsLayout />
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
              <Button
                sx={{ width: "400px" }}
                size="small"
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
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
