import Box from "@mui/material/Box";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
// Hooks
//Models
import { InvoiceInputModel } from "../../../model/InvoiceInputModel";
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
import { calculateExternalLensTotal } from "../../../utils/calculateExternalLensTotal";
import { clearexternalLense } from "../../../features/invoice/externalLenseSlice";
import { formatUserPayments } from "../../../utils/formatUserPayments";
import StockDrawerBtn from "../../../components/StockDrawerBtn";
import HidenNoteDialog from "../../../components/HidenNoteDialog";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useFactoryOrderContext } from "../../../context/FactoryOrderContext";
import { heIL } from "@mui/x-date-pickers/locales";
import VarificationDialog from "../../../components/VarificationDialog";
import { useValidationState } from "../../../hooks/validations/useValidationState";
import { getUserCurentBranch } from "../../../utils/authDataConver";

export default function FactoryInvoiceForm() {
  const { prepareValidation, resetValidation, validationState } =
    useValidationState();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //HOOKS
  const { singlerefractionNumber, refractionDetail, refractionDetailLoading } =
    useFactoryOrderContext();

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
        branch_id: getUserCurentBranch()?.id,
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
              value: refractionDetail?.right_eye_dist_sph,
              side: "left",
            },
            {
              power: 2,
              value: refractionDetail?.right_eye_dist_cyl,
              side: "left",
            },
            {
              power: 3,
              value: refractionDetail?.right_eye_near_sph,
              side: "left",
            },
            {
              power: 1,
              value: refractionDetail?.left_eye_dist_sph,
              side: "right",
            },
            {
              power: 2,
              value: refractionDetail?.left_eye_dist_cyl,
              side: "right",
            },
            {
              power: 3,
              value: refractionDetail?.left_eye_near_sph,
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
  };
  const sendDataToDb = async (
    postData: InvoiceInputModel,
    verifiedUserId: number
  ) => {
    console.log("postData", postData);

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
              </Box>

              {/* Passing The Note DAta to show in tthe dialog */}
              <PationtDetails
                prescription={
                  !refractionDetailLoading && refractionDetail?.prescription
                    ? "Prescription "
                    : ""
                }
                refractionDetailLoading={refractionDetailLoading}
                refractionNumber={singlerefractionNumber?.refraction_number}
              />
            </Box>
            <Box
              sx={{
                maxWidth: "1200px",
                width: "100%",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography mx={1}>
                Suger : {refractionDetail?.shuger ? "Yes" : "No"}
              </Typography>
              <Typography mx={1}>
                Cataract : {refractionDetail?.cataract ? " Yes" : "No"}
              </Typography>
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
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
                  {...methods.register("height")}
                  sx={{ width: 100 }}
                  type="number"
                  size="small"
                  label="Height"
                  InputLabelProps={{
                    shrink: Boolean(methods.watch("height")),
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    {...methods.register("right_height")}
                    sx={{ width: 100 }}
                    type="number"
                    size="small"
                    label="Right-H"
                    InputLabelProps={{
                      shrink: Boolean(methods.watch("right_height")),
                    }}
                  />
                  <TextField
                    {...methods.register("left_height")}
                    sx={{ width: 100 }}
                    type="number"
                    size="small"
                    label="Left-H "
                    InputLabelProps={{
                      shrink: Boolean(methods.watch("left_height")),
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    {...methods.register("right_pd")}
                    sx={{ width: 100 }}
                    type="number"
                    size="small"
                    label="Right-PD"
                    InputLabelProps={{
                      shrink: Boolean(methods.watch("right_pd")),
                    }}
                  />
                  <TextField
                    {...methods.register("left_pd")}
                    sx={{ width: 100 }}
                    type="number"
                    size="small"
                    label="Left-PD"
                    InputLabelProps={{
                      shrink: Boolean(methods.watch("left_pd")),
                    }}
                  />
                </Box>
              </Box>
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
        <DrawerStock refractionDetail={refractionDetail} />
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
