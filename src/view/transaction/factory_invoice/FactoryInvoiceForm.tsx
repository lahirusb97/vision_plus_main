import * as React from "react";
import Box from "@mui/material/Box";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import useGetRefractionDetails from "../../../hooks/useGetRefractionDetails";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { InvoiceInputModel } from "../../../model/InvoiceInputModel";
import { RefractionDetailModel } from "../../../model/RefractionDetailModel";
import { factoryInvoiceSchema } from "../../../validations/factoryInvoiceSchema";
import PationtDetails from "../../../components/PationtDetails";
import { Button, TextField } from "@mui/material";
import InvoiceTable from "../../../components/inputui/InvoiceTable";
import CardInput from "../../../components/inputui/CardInput";
import CashInput from "../../../components/inputui/CashInput";
import LoadingAnimation from "../../../components/LoadingAnimation";
import RightEyeTable from "../../../components/RightEyeTable";
import LeftEyeTable from "../../../components/LeftEyeTable";
import DrawerStock from "../../../components/inputui/DrawerStock";
import { RootState } from "../../../store/store";
import axiosClient from "../../../axiosClient";
import { clearFrame } from "../../../features/invoice/frameFilterSlice";
import { clearLenses } from "../../../features/invoice/lenseFilterSlice";
import { clearOtherItem } from "../../../features/invoice/otherItemSlice";

export default function FactoryInvoiceForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);

  const [discount, setDiscount] = React.useState(0);
  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };
  const FrameInvoiceList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const LenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLenses
  );
  const OtherInvoiceList = useSelector(
    (state: RootState) => state.invoice_other_Item.selectedOtherItems
  );
  const calculateTotal = (list: any[]) => {
    return list.reduce((acc, row) => {
      const rowTotal = parseInt(row.price) * row.buyQty;
      return acc + rowTotal;
    }, 0);
  };
  const frameTotal = calculateTotal(Object.values(FrameInvoiceList));
  const lenseTotal = calculateTotal(Object.values(LenseInvoiceList));
  const otherTotal = calculateTotal(Object.values(OtherInvoiceList));
  const subtotal = frameTotal + lenseTotal + otherTotal;
  const grandTotal = subtotal - discount;
  const { id } = useParams();
  const { refractionDetail, refractionDetailLoading, refractionDetailError } =
    useGetRefractionDetails(id);

  const methods = useForm({
    resolver: yupResolver(factoryInvoiceSchema),
    defaultValues: {
      card: 0,
      cash: 0,
      discount: 0,
    },
  });
  useEffect(() => {
    return () => {
      dispatch(clearFrame());
      dispatch(clearLenses());
      dispatch(clearOtherItem());
    };
  }, []);
  useEffect(() => {
    if (!refractionDetailError && !refractionDetailLoading) {
      if (refractionDetail) {
        const personalData = {
          ...refractionDetail,
          name: queryParams.get("customerName"),
          phone_number: queryParams.get("mobileNumber"),
          nic: queryParams.get("nic"),
        };

        (
          Object.keys(personalData) as Array<keyof RefractionDetailModel>
        ).forEach((key) => {
          methods.setValue(key as any, personalData[key]);
        });
      }
    }
  }, [refractionDetailLoading, refractionDetail]);

  const submiteFromData = async (data: InvoiceInputModel) => {
    const postData = {
      patient: {
        refraction_id: data.refraction,
        name: data.name,
        nic: data.nic,
        address: data.address,
        phone_number: data.phone_number,
        date_of_birth: "1997-10-13",
      },
      order: {
        refraction: data.refraction,
        status:
          subtotal <= parseInt(data.card || "0") + parseInt(data.cash || "0")
            ? "completed"
            : "pending",

        sub_total: parseFloat(subtotal) || 0,
        discount: parseFloat(discount) || 0,
        total_price: parseFloat(grandTotal) || 0,
        remark: data.remark,
        sales_staff_code: parseInt(data.sales_staff_code),
      },
      order_items: [
        ...Object.values(OtherInvoiceList).map((item) => ({
          lens_cleaner: item.id,
          quantity: item.buyQty,
          price_per_unit: item.price,
          subtotal: item.buyQty * item.price,
        })),
        ...Object.values(LenseInvoiceList).map((item) => ({
          lense: item.id,
          quantity: item.buyQty,
          price_per_unit: item.price,
          subtotal: item.buyQty * item.price,
        })),
        ...Object.values(FrameInvoiceList).map((item) => ({
          frame: item.id,
          quantity: item.buyQty,
          price_per_unit: item.price,
          subtotal: item.buyQty * item.price,
        })),
      ],
      order_payments: [
        {
          amount: data.card,
          payment_method: "credit_card",
          transaction_status: "success",
        },
        {
          amount: data.cash,
          payment_method: "cash",
          transaction_status: "success",
        },
      ],
    };

    try {
      if (!refractionDetailError && !refractionDetailLoading) {
        const responce = await axiosClient.post("/orders/", postData);
        console.log(responce.data);
        console.log(/view/);

        navigate("view/", {
          state: {
            lense: LenseInvoiceList,
            frame: FrameInvoiceList,
            order: postData.order,
            patient: postData.patient,
          },
        });
        console.log({
          lense: LenseInvoiceList,
          frame: FrameInvoiceList,
          order: postData.order,
          patient: postData.patient,
        });
      } else if (!refractionDetailLoading && refractionDetailError) {
        const responce = await axiosClient.post("/orders/", postData);
        console.log(responce.data);
        console.log(/view/);

        navigate("/view/", {
          state: {
            lense: LenseInvoiceList,
            frame: FrameInvoiceList,
            order: postData.order,
            patient: postData.patient,
          },
        });
      }

      console.log(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to save Order data");
        console.log(err);
      } else {
        toast.error("An unexpected error occurred Failed to save Order data");
      }
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
            <LeftEyeTable />
            <RightEyeTable />
            <PationtDetails />
          </Box>
          <InvoiceTable
            handleDiscountChange={handleDiscountChange}
            discount={discount}
          />
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
              {...methods.register("remark")}
              sx={{ flexGrow: 1 }}
              placeholder="remark"
              multiline
              rows={2}
            />

            <CardInput />
            <CashInput />
          </Box>
          <DrawerStock />
          <Button
            sx={{ width: "100%", maxWidth: "1200px" }}
            variant="contained"
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </Box>
      )}
    </FormProvider>
  );
}
