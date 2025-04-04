import Box from "@mui/material/Box";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
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
import { RefractionDetailCreate } from "../../../model/RefractionDetailModel";
import { PatientModel } from "../../../model/Patient";
import axiosClient from "../../../axiosClient";
import { RootState } from "../../../store/store";
import { calculateExternalLensTotal } from "../../../utils/calculateExternalLensTotal";
import { convertEmptyStringsToNull } from "../../../utils/convertEmptyStringsToNull";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { CheckBox } from "@mui/icons-material";
import HidenNoteDialog from "../../../components/HidenNoteDialog";
import StockDrawerBtn from "../../../components/StockDrawerBtn";
import { useFactoryOrderUpdateContext } from "../../../context/FactoryOrderUpdateContext";
import { useValidationState } from "../../../hooks/validations/useValidationState";
import VarificationDialog from "../../../components/VarificationDialog";

export default function OrderEditFrom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // SET VALUES FOR PATIENT TABLE
  const { prepareValidation, resetValidation, validationState } =
    useValidationState();
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
  const LenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLenses
  );
  const externalLenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLense
  );
  const methods = useForm({
    resolver: yupResolver(factoryInvoiceSchema),
  });

  const discount = methods.watch("discount");

  const calculateTotal = (list: any[]) => {
    return list.reduce((acc, row) => {
      const rowTotal = parseInt(row.price) * row.buyQty;
      return acc + rowTotal;
    }, 0);
  };

  const frameTotal = calculateTotal(Object.values(FrameInvoiceList));
  const lenseTotal = calculateTotal(Object.values(LenseInvoiceList));
  //calculate total send
  const ExtraTotal = calculateExternalLensTotal(
    Object.values(externalLenseInvoiceList)
  );

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
    if (!invoiceDetailLoading && invoiceDetail?.refraction_details) {
      Object.entries(
        invoiceDetail.refraction_details as RefractionDetailCreate
      ).forEach(([key, value]) => {
        methods.setValue(key as keyof InvoiceInputModel, value || null);
      });
      Object.entries(invoiceDetail.customer_details as PatientModel).forEach(
        ([key, value]) => {
          methods.setValue(key as keyof InvoiceInputModel, value || null);
        }
      );
    }
    if (invoiceDetail && !invoiceDetailLoading && loadState === 0) {
      invoiceDetail?.order_details.order_items
        .filter((items) => items.frame !== null)
        .forEach((item) => {
          // const { brand, code, color, id } = item.frame_detail;
          dispatch(
            setFrame({
              ...item.frame_detail,
              price: item.price_per_unit,
              id: item.frame,
            })
          );
        });
      console.log("ss");

      invoiceDetail?.order_details.order_items
        .filter((items) => items.external_lens !== null)
        .forEach((item) => {
          const externalLense = {
            external_lens_data: {
              lens: {
                type: parseInt(item.type_id),
                coating: parseInt(item.coating_id),
                brand: parseInt(item.type_id),
                price: parseInt(item.price_per_unit),
              },
            },
            quantity: 1,
            price_per_unit: parseInt(item.price_per_unit),
            subtotal: parseInt(item.subtotal),
            is_non_stock: true,
            lensNames: {
              typeName: item.brand_name,
              coatingName: item.coating_name,
              brandName: item.brand_name,
            },
          };
          dispatch(
            setexternalLense({
              ...externalLense,
              id: item.external_lens,
            })
          );
        });

      invoiceDetail?.order_details.order_items
        .filter((items) => items.lens !== null)
        .forEach((item) => {
          const { brand, type, coating } = item.lens_detail;
          dispatch(
            setLense({
              type: type,
              brand: brand,
              lens_type: item.lens_name,
              coating: coating,
              powers: item.lens_powers,
              price: item.price_per_unit,
              buyQty: 1,
              id: item.lens,
            })
          );
        });

      setLoadState(1);
    }
  }, [invoiceDetail]);

  useEffect(() => {
    return () => {
      dispatch(clearFrame());
      dispatch(clearLenses());
      dispatch(clearOtherItem());
      dispatch(clearexternalLense());
    };
  }, []);
  console.log(invoiceDetail);

  useEffect(() => {
    if (invoiceDetail && !invoiceDetailLoading) {
      const orderDetails = invoiceDetail?.order_details;
      const orderPayments = orderDetails?.order_payments;

      if (orderPayments && orderPayments.length > 0) {
        const totals = {};

        // Calculate total amount for each payment method
        orderPayments.forEach((payment) => {
          const method = payment.payment_method;
          const amount = parseFloat(payment.amount) || 0; // Ensure valid number

          if (!totals[method]) {
            totals[method] = 0;
          }
          totals[method] += amount;
        });

        // Set the calculated totals in the specific method's input field
        Object.keys(totals).forEach((method) => {
          methods.setValue(method, totals[method]); // Ensure decimal format
        });
        methods.setValue("discount", parseFloat(orderDetails.discount));
      }
    }
  }, [invoiceDetail, invoiceDetailLoading]);

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

  const submiteFromData = async (data: InvoiceInputModel) => {
    //  ! Custoome rID Tep solution
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
        status:
          subtotal <= parseInt(data.card || "0") + parseInt(data.cash || "0")
            ? "completed"
            : "pending",

        sub_total: parseFloat(subtotal) || 0,
        discount: parseFloat(discount) || 0,
        total_price: parseFloat(grandTotal) || 0,
        remark: data.remark,
        sales_staff_code: data.sales_staff_code,
      },
      order_items: [
        ...Object.values(LenseInvoiceList).map((item) => ({
          lens: item.id,
          quantity: item.buyQty,
          price_per_unit: parseFloat(item.price),
          subtotal: item.buyQty * parseFloat(item.price),
        })),

        ...Object.values(FrameInvoiceList).map((item) => ({
          frame: item.id,
          quantity: item.buyQty,
          price_per_unit: parseFloat(item.price),
          subtotal: item.buyQty * parseFloat(item.price),
        })),

        ...Object.values(externalLenseInvoiceList).map((item) => {
          const { external_lens_data = {}, lensNames, id, ...rest } = item; // Default to empty object if not available

          const powers = [
            {
              power: 1,
              value: methods.watch("right_eye_dist_sph") || null,
              side: "left",
            },
            {
              power: 2,
              value: methods.watch("right_eye_dist_cyl") || null,
              side: "left",
            },
            {
              power: 3,
              value: methods.watch("right_eye_near_sph") || null,
              side: "left",
            },
            {
              power: 1,
              value: methods.watch("left_eye_dist_sph") || null,
              side: "right",
            },
            {
              power: 2,
              value: methods.watch("left_eye_dist_cyl") || null,
              side: "right",
            },
            {
              power: 3,
              value: methods.watch("left_eye_near_sph") || null,
              side: "right",
            },
          ];
          return {
            ...rest,
            external_lens_data: {
              ...external_lens_data,
              powers: powers.filter((item) => item.value !== null),
            }, // Send the rest of the object without `name`
          };
        }),
      ],
      order_payments: [
        {
          amount: data.credit_card,
          payment_method: "credit_card",
          transaction_status: "success",
        },
        {
          amount: data.cash,
          payment_method: "cash",
          transaction_status: "success",
        },
        {
          amount: data.online_transfer,
          payment_method: "online_transfer",
          transaction_status: "success",
        },
      ],
    };

    if (
      Object.keys(externalLenseInvoiceList).length > 0 ||
      Object.keys(LenseInvoiceList).length > 0 ||
      Object.keys(FrameInvoiceList).length > 0
    ) {
      prepareValidation("create", async (verifiedUserId: number) => {
        await sendDataToDb(postData);
      });
    } else {
      toast.error("No Items ware added");
    }
  };
  const sendDataToDb = async (postData) => {
    try {
      // No refraction Data but have Refraction Number
      const responce = await axiosClient.put(
        `/orders/${invoiceDetail?.order}/`,
        postData
      );
      toast.success("Order & Refraction Details saved successfully");
      const url = `?order_id=${encodeURIComponent(responce.data.id)}`;

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
                Refraction Remark - {refractionDetail?.note}
              </Typography>
            </Box>

            {/* sending data trugh invoide details with usefrom hook */}
            <PationtDetails
              prescription={
                !refractionDetailLoading && refractionDetail?.prescription
                  ? "Prescription "
                  : ""
              }
              refractionDetailLoading={refractionDetailLoading}
              refractionNumber={
                invoiceDetail?.customer_details?.refraction_number
              }
            />
          </Box>
          <Box
            sx={{
              maxWidth: "1200px",
              width: "100%",
              margin: "0 auto",
              display: "flex",
            }}
          >
            <FormControlLabel
              control={<Checkbox {...methods.register("on_hold")} />}
              label=" On Hold"
            />
            <FormControlLabel
              control={
                <Checkbox {...methods.register("fitting_on_collection")} />
              }
              label="Fiting on Collection"
            />
            <HidenNoteDialog />
            <StockDrawerBtn />
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
              mt: 1,
            }}
          >
            <TextField
              {...methods.register("pd")}
              sx={{ width: 100 }}
              size="small"
              type="number"
              label="PD"
              InputLabelProps={{
                shrink: Boolean(methods.watch("pd")),
              }}
            />
            <TextField
              {...methods.register("h")}
              sx={{ width: 100 }}
              type="number"
              size="small"
              label="H"
              InputLabelProps={{
                shrink: Boolean(methods.watch("h")),
              }}
            />
            <TextField
              fullWidth
              size="small"
              {...methods.register("remark")}
              sx={{ maxWidth: "1200px" }}
              placeholder="remark"
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
            <OnlinePayInput />
            <CardInput />
            <CashInput />
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
