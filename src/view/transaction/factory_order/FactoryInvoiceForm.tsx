import Box from "@mui/material/Box";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
// Hooks
import useGetRefractionDetails from "../../../hooks/useGetRefractionDetails";
//Models
import { InvoiceInputModel } from "../../../model/InvoiceInputModel";
import { RefractionDetailModel } from "../../../model/RefractionDetailModel";
//schemas
import { factoryInvoiceSchema } from "../../../validations/factoryInvoiceSchema";
//Store
import { RootState } from "../../../store/store";
import { clearFrame } from "../../../features/invoice/frameFilterSlice";
import { clearLenses } from "../../../features/invoice/lenseFilterSlice";
import { clearOtherItem } from "../../../features/invoice/otherItemSlice";
//Components
import OnlinePayInput from "../../../components/inputui/OnlinePayInput";
import InvoiceTable from "../../../components/inputui/InvoiceTable";
import CardInput from "../../../components/inputui/CardInput";
import CashInput from "../../../components/inputui/CashInput";
import LoadingAnimation from "../../../components/LoadingAnimation";
import RightEyeTable from "../../../components/RightEyeTable";
import LeftEyeTable from "../../../components/LeftEyeTable";
import DrawerStock from "../../../components/inputui/DrawerStock";
import axiosClient from "../../../axiosClient";
import PationtDetails from "../../../components/PationtDetails";
import { convertEmptyStringsToNull } from "../../../utils/convertEmptyStringsToNull";
import { calculateExternalLensTotal } from "../../../utils/calculateExternalLensTotal";
import { clearexternalLense } from "../../../features/invoice/externalLenseSlice";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import useGetSingleRefractionNumber from "../../../hooks/useGetSingleRefractionNumber";
import StockDrawerBtn from "../../../components/StockDrawerBtn";
import HidenNoteDialog from "../../../components/HidenNoteDialog";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import {
  FactoryOrderProvider,
  useFactoryOrderContext,
} from "../../../context/FactoryOrderContext";

export default function FactoryInvoiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //HOOKS
  const { singlerefractionNumber } = useFactoryOrderContext();
  const { refractionDetail, refractionDetailLoading, refractionDetailExist } =
    useGetRefractionDetails(id);

  //Store Data

  const FrameInvoiceList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const LenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLenses
  );
  const externalLenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLense
  );
  // Store Data**

  const methods = useForm({
    resolver: yupResolver(factoryInvoiceSchema),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
      discount: 0,
    },
  });
  const discount = methods.watch("discount");

  useEffect(() => {
    if (singlerefractionNumber) {
      methods.setValue("name", singlerefractionNumber.customer_full_name);
      methods.setValue("phone_number", singlerefractionNumber.customer_mobile);
      methods.setValue("nic", singlerefractionNumber.nic);
    }
  }, [singlerefractionNumber]);
  const calculateTotal = (list: any[]) => {
    return list.reduce((acc, row) => {
      const rowTotal = parseInt(row.price) * row.buyQty;
      return acc + rowTotal;
    }, 0);
  };
  //test this function

  const frameTotal = calculateTotal(Object.values(FrameInvoiceList));
  const lenseTotal = calculateTotal(Object.values(LenseInvoiceList));
  //calculate total send
  const ExtraTotal = calculateExternalLensTotal(
    Object.values(externalLenseInvoiceList)
  );

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

  const submiteFromData = async (data: InvoiceInputModel) => {
    //HANDLE PAYMENT To REMOVE SENDING  0
    const userPayments = {
      credit_card: data.credit_card,
      cash: data.cash,
      online_transfer: data.online_transfer,
    };
    const postData = {
      patient: {
        refraction_id: id,
        name: data.name,
        nic: data.nic,
        address: data.address,
        phone_number: data.phone_number,
        date_of_birth: data.dob,
      },
      order: {
        refraction: id,
        status:
          grandTotal <=
          parseInt(data.credit_card || "0") +
            parseInt(data.cash || "0") +
            parseInt(data.online_transfer || "0")
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
          price_per_unit: item.price,
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
      order_payments: formatUserPayments(userPayments),
    };

    if (
      Object.keys(externalLenseInvoiceList).length > 0 ||
      Object.keys(LenseInvoiceList).length > 0 ||
      Object.keys(FrameInvoiceList).length > 0
    ) {
      try {
        if (refractionDetailExist && !refractionDetailLoading) {
          //TODO USE THIS AND CREATE THE SYSTEM ALL GOOD TO DO IF NO REFRACTION DETAILS NO DETAIL CREATINS
          const responce = await axiosClient.post("/orders/", postData);
          toast.success("Order saved successfully");
          const url = `?order_id=${encodeURIComponent(responce.data.id)}`;
          navigate(`view/${url}`);
        } else {
          toast.error("Refraction Detail Not Found");
        }
      } catch (err) {
        extractErrorMessage(err);
      }
    } else {
      toast.error("No Items ware added");
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
                  <RightEyeTable />
                  <LeftEyeTable />
                </Box>
                <Typography
                  sx={{ border: "1px solid gray", px: 1, mx: 1, mb: 1 }}
                >
                  Refraction Remark - {refractionDetail?.note}
                </Typography>
              </Box>

              {/* Passing The Note DAta to show in tthe dialog */}
              <PationtDetails />
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
                my: 1,
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
            {/* <TextField
            {...methods.register("note")}
            sx={{ my: 1, maxWidth: "1200px", width: "100%" }}
            size="small"
            fullWidth
            label="note"
            multiline
            InputLabelProps={{
              shrink: Boolean(methods.watch("note")),
            }}
          /> */}
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
          </Box>
        )}
      </FormProvider>
      <DrawerStock />
    </>
  );
}
