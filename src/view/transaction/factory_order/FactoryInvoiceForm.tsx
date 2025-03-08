import Box from "@mui/material/Box";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, TextField } from "@mui/material";
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
import InvoiceView from "./InvoiceView";

export default function FactoryInvoiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // GET QARY PARAM DATA
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const customerName = queryParams.get("customerName");
  const mobileNumber = queryParams.get("mobileNumber");
  const nic = queryParams.get("nic");
  const refractionNumber = queryParams.get("refractionNumber");

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
      card: 0,
      cash: 0,
      discount: 0,
    },
  });
  const discount = methods.watch("discount");

  useEffect(() => {
    if (customerName || mobileNumber) {
      methods.setValue("name", customerName);
      methods.setValue("phone_number", mobileNumber);
      methods.setValue("nic", nic);
    }
  }, []);
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
  const grandTotal = subtotal - discount;
  const { refractionDetail, refractionDetailLoading, refractionDetailExist } =
    useGetRefractionDetails(id);

  useEffect(() => {
    return () => {
      dispatch(clearFrame());
      dispatch(clearLenses());
      dispatch(clearOtherItem());
      dispatch(clearexternalLense());
    };
  }, []);

  useEffect(() => {
    if (!refractionDetailLoading && refractionDetailExist) {
      Object.entries(refractionDetail as RefractionDetailModel).forEach(
        ([key, value]) => {
          methods.setValue(key as keyof InvoiceInputModel, value || null);
        }
      );
    }
  }, [refractionDetailLoading, refractionDetailExist]);
  // console.log(methods.watch("note"));

  const submiteFromData = async (data: InvoiceInputModel) => {
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
      try {
        if (refractionDetailExist && !refractionDetailLoading) {
          const responce = await axiosClient.post("/orders/", postData);
          toast.success("Order saved successfully");
          const url = `?order_id=${encodeURIComponent(responce.data.id)}`;
          navigate(`view/${url}`);
        } else {
          const refDetails = convertEmptyStringsToNull({
            hb_rx_right_dist: data.hb_rx_right_dist,
            hb_rx_left_dist: data.hb_rx_left_dist,
            hb_rx_right_near: data.hb_rx_right_near,
            hb_rx_left_near: data.hb_rx_left_near,
            auto_ref_right: data.auto_ref_right,
            auto_ref_left: data.auto_ref_left,
            right_eye_dist_sph: data.right_eye_dist_sph,
            right_eye_dist_cyl: data.right_eye_dist_cyl,
            right_eye_dist_axis: data.right_eye_dist_axis,
            right_eye_near_sph: data.right_eye_near_sph,
            left_eye_dist_sph: data.left_eye_dist_sph,
            left_eye_dist_cyl: data.left_eye_dist_cyl,
            left_eye_dist_axis: data.left_eye_dist_axis,
            left_eye_near_sph: data.left_eye_near_sph,
            note: data.note,
            remark: data.remark,
          });

          // No refraction Data but have Refraction Number
          const responce = await axiosClient.post("/orders/", {
            ...postData,
            refraction_details: {
              ...refDetails,
              is_manual: 1,
              refraction: id,
            },
          });
          toast.success("Order & Refraction Details saved successfully");
          const url = `?order_id=${encodeURIComponent(responce.data.id)}`;

          navigate(`view/${url}`);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.error || "Failed to save Order data");
        } else {
          toast.error("An unexpected error occurred Failed to save Order data");
        }
      }
    } else {
      toast.error("No Items ware added");
    }
  };

  return (
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
            <RightEyeTable />

            <LeftEyeTable />

            {/* Passing The Note DAta to show in tthe dialog */}
            <PationtDetails
              refractionNumber={refractionNumber}
              DetailExist={refractionDetailExist}
              loading={refractionDetailLoading}
            />
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

            <Button size="small" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Box>
          <DrawerStock />
        </Box>
      )}
    </FormProvider>
  );
}
