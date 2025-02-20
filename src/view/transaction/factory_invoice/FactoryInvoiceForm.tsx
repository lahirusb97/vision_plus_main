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

export default function FactoryInvoiceForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { mobileNumber } = location.state || {
    customerName: "",
    mobileNumber: "",
    date: "",
  };
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
    try {
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
