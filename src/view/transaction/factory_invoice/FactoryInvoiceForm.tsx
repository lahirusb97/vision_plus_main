import Box from "@mui/material/Box";
import FactoryFromOne from "./FactoryFromOne";
import FactoryFromTwo from "./FactoryFromTwo";
import FactoryFromTree from "./FactoryFromTree";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { clearLenses } from "../../../features/invoice/lenseFilterSlice";
import { useLocation, useNavigate } from "react-router";
import useGetRefractionDetails from "../../../hooks/useGetRefractionDetails";
import { useEffect } from "react";
import axiosClient from "../../../axiosClient";
import axios from "axios";
import toast from "react-hot-toast";
import { clearFrame } from "../../../features/invoice/frameFilterSlice";
import { InvoiceInputModel } from "../../../model/InvoiceInputModel";
import { RefractionDetailModel } from "../../../model/RefractionDetailModel";
import { factoryInvoiceSchema } from "../../../validations/factoryInvoiceSchema";
import LeftEye from "../../../components/LeftEye";
import PationtDetails from "../../../components/PationtDetails";
import { Button, Paper, TextField, Typography } from "@mui/material";
import InvoiceTable from "../../../components/inputui/InvoiceTable";
import CardInput from "../../../components/inputui/CardInput";
import CashInput from "../../../components/inputui/CashInput";

export default function FactoryInvoiceForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mobileNumber } = location.state || {
    customerName: "",
    mobileNumber: "",
    date: "",
  };
  const { refractionDetail, refractionDetailLoading, refractionDetailError } =
    useGetRefractionDetails(mobileNumber);

  const methods = useForm({
    resolver: yupResolver(factoryInvoiceSchema),
    defaultValues: {
      card: 0,
      cash: 0,
      discount: 0,
    },
  });
  const selectedFrameList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const selectedLenseList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLenses
  );
  const totalLensePrice = Object.values(selectedLenseList).reduce(
    (sum, item) => sum + parseFloat(item.price) * item.buyQty,
    0
  );
  const totalFramePrice = Object.values(selectedFrameList).reduce(
    (sum, item) => sum + parseFloat(item.price) * item.buyQty,
    0
  );
  useEffect(() => {
    if (!refractionDetailError && !refractionDetailLoading) {
      if (refractionDetail) {
        (
          Object.keys(refractionDetail) as Array<keyof RefractionDetailModel>
        ).forEach((key) => {
          methods.setValue(key as any, refractionDetail[key]);
        });
      }
    }
  }, [refractionDetailLoading, refractionDetail]);

  const submiteFromData = async (data: InvoiceInputModel) => {
    const lenseByList = Object.values(selectedLenseList).map(
      ({ buyQty, price }) => ({
        quantity: buyQty,
        price_per_unit: price,
        subtotal: buyQty * parseInt(price),
      })
    );
    const frameByList = Object.values(selectedFrameList).map(
      ({ buyQty, price }) => ({
        quantity: buyQty,
        price_per_unit: price,
        subtotal: buyQty * parseInt(price),
      })
    );

    const postData = {
      patient: {
        name: data.name,
        nic: data.nic,
        address: data.address,
        phone_number: data.phone_number,
        dob: data.dob,
      },
      refraction_details: {
        // TABLE
        right_eye_dist_cyl: data.right_eye_dist_cyl,
        right_eye_dist_axis: data.right_eye_dist_axis,
        right_eye_near_sph: data.right_eye_near_sph,
        left_eye_dist_sph: data.left_eye_dist_sph,
        left_eye_dist_cyl: data.left_eye_dist_cyl,
        left_eye_dist_axis: data.left_eye_dist_axis,
        left_eye_near_sph: data.left_eye_near_sph,
        hb_rx_right_dist: data.hb_rx_right_dist,
        hb_rx_left_dist: data.hb_rx_left_dist,
        hb_rx_right_near: data.hb_rx_right_near,
        hb_rx_left_near: data.hb_rx_left_near,
        auto_ref_right: data.auto_ref_right,
        auto_ref_left: data.auto_ref_left,
        is_manual: 1,
        // TABLE
      },
      order: {
        sub_total: totalFramePrice + totalLensePrice,
        discount: totalFramePrice + totalLensePrice - data.discount,
        total_price: 180.0,
        sales_staff_code: data.sales_staff_code,
        remark: data.remark,
      },
      order_items: [...lenseByList, ...frameByList],
      order_payments: [
        {
          amount: parseFloat(data.cash),
          payment_method: "cash",
          transaction_status: "success",
        },
        {
          amount: parseFloat(data.card),
          payment_method: "credit_card",
          transaction_status: "success",
        },
      ],
    };
    const postData2 = {
      patient: {
        refraction_id: refractionDetail.id,
        name: data.name,
        nic: data.nic,
        address: data.address,
        phone_number: data.phone_number,
        dob: data.dob,
      },
      order: {
        refractionDetail: refractionDetail.id,
        sub_total: totalFramePrice + totalLensePrice,
        discount: totalFramePrice + totalLensePrice - data.discount,
        total_price: 180.0,
        sales_staff_code: data.sales_staff_code,
        remark: data.remark,
      },
      order_items: [...lenseByList, ...frameByList],
      order_payments: [
        {
          amount: parseFloat(data.cash),
          payment_method: "cash",
          transaction_status: "success",
        },
        {
          amount: parseFloat(data.card),
          payment_method: "credit_card",
          transaction_status: "success",
        },
      ],
    };

    try {
      await axiosClient.post(
        "/orders/",
        refractionDetailError ? postData2 : postData
      );
      methods.reset();
      dispatch(clearFrame()); // Add dispatch
      dispatch(clearLenses());

      navigate("view", {
        state: postData,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to save Order data");
      } else {
        toast.error("An unexpected error occurred Failed to save Order data");
      }
    }
  };

  return (
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
          <LeftEye />
          <LeftEye />
          <PationtDetails />
        </Box>
        <InvoiceTable />
        <Box
          sx={{
            display: "flex",
            gap: 1,
            m: 2,
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <TextField
            sx={{ flexGrow: 1 }}
            placeholder="remark"
            multiline
            rows={2}
          />

          <CardInput />
          <CashInput />
        </Box>
        <Button
          sx={{ width: "100%", maxWidth: "1200px" }}
          variant="contained"
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </FormProvider>
  );
}
const inputStyle1 = {
  paddingY: 1,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 1,
  marginY: 1,
};
