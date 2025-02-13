import Box from "@mui/material/Box";
import FactoryFromOne from "./FactoryFromOne";
import FactoryFromTwo from "./FactoryFromTwo";
import FactoryFromTree from "./FactoryFromTree";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import axiosClient from "../../../axiosClient";
import { handleError } from "../../../utils/handleError";
import { clearFrame } from "../../../features/invoice/frameFilterSlice";
import { clearLenses } from "../../../features/invoice/lenseFilterSlice";
import { Navigate, useNavigate } from "react-router";

export default function FactoryInvoiceForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    sales_staff_code: Yup.string().required("Sales Staff Code is required"),
    hb_rx_right_dist: Yup.string().required("Right Distance is required"),
    hb_rx_left_dist: Yup.string().required("Left Distance is required"),
    hb_rx_right_near: Yup.string().required("Right Near is required"),
    hb_rx_left_near: Yup.string().required("Left Near is required"),
    auto_ref_right: Yup.string().required("Auto Ref Right is required"),
    auto_ref_left: Yup.string().required("Auto Ref Left is required"),
    right_eye_dist_sph: Yup.string().required(
      "Right Eye Distance Sph is required"
    ),
    right_eye_dist_cyl: Yup.string(),
    right_eye_dist_axis: Yup.string(),
    right_eye_near_sph: Yup.string(),
    left_eye_dist_sph: Yup.string().required(
      "Left Eye Distance Sph is required"
    ),
    left_eye_dist_cyl: Yup.string(),
    left_eye_dist_axis: Yup.string(),
    left_eye_near_sph: Yup.string(),
    remark: Yup.string(),
    name: Yup.string().required("Customer Name is required"),
    nic: Yup.string().required("Customer Age is required"),
    phone_number: Yup.string().required("Customer Mobile is required"),
    address: Yup.string().required("Customer Address is required"),
    dob: Yup.string().required("Customer age is required"),
    discount: Yup.number().required("discount is required").min(0),
    cash: Yup.number().required("payment Amount is required").min(0),
    card: Yup.number().required("payment Amount is required").min(0),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
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

  const submiteFromData = async (data) => {
    const lenseByList = Object.values(selectedLenseList).map(
      ({ buyQty, price, lense }) => ({
        quantity: buyQty,
        lense,
        price_per_unit: price,
        subtotal: buyQty * parseInt(price),
      })
    );
    const frameByList = Object.values(selectedFrameList).map(
      ({ buyQty, price, frame }) => ({
        quantity: buyQty,
        frame,
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

    try {
      const response = await axiosClient.post("/manual-orders/", postData);
      methods.reset();
      dispatch(clearFrame()); // Add dispatch
      dispatch(clearLenses());

      navigate("view", {
        state: postData,
      });
    } catch (error) {
      handleError(error, "Invoice Save Error");
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component={"form"}
        onSubmit={methods.handleSubmit(submiteFromData)}
        sx={{ maxWidth: "1200px" }}
      >
        <FactoryFromOne />

        <FactoryFromTwo />

        <FactoryFromTree />
      </Box>
    </FormProvider>
  );
}
