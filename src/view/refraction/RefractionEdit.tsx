import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { grey } from "@mui/material/colors";
import RefractionDetailsRight from "./RefractionDetailsRight";
import RefractionDetailsLeft from "./RefractionDetailsLeft";
import {
  RefractionDetailsFormModel,
  schemaRefractionDetails,
} from "../../validations/refractionDetails";
import toast from "react-hot-toast";

import useGetRefractionDetails from "../../hooks/useGetRefractionDetails";
import { useEffect } from "react";
import useGetSingleRefractionNumber from "../../hooks/useGetSingleRefractionNumber";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { useAxiosPut } from "../../hooks/useAxiosPut";
import LoadingAnimation from "../../components/LoadingAnimation";
import { useValidationState } from "../../hooks/validations/useValidationState";
import VarificationDialog from "../../components/VarificationDialog";

import { formatDateTimeByType } from "../../utils/formatDateTimeByType";
import SubmitCustomBtn from "../../components/common/SubmiteCustomBtn";

export default function RefractionEdit() {
  //USER VALIDATION HOOKS

  const { prepareValidation, resetValidation, validationState } =
    useValidationState();
  //API CALLS
  //USER VALIDATION HOOKS
  const navigate = useNavigate();
  const { refraction_id } = useParams();
  const { singlerefractionNumber, singlerefractionNumberLoading } =
    useGetSingleRefractionNumber(refraction_id);
  const { refractionDetail, refractionDetailLoading, refractionDetailExist } =
    useGetRefractionDetails(refraction_id);
  const { postHandler, postHandlerError, postHandlerloading } = useAxiosPost();
  const { putHandler, putHandlerError, putHandlerloading } = useAxiosPut();
  const methods = useForm<RefractionDetailsFormModel>({
    resolver: zodResolver(schemaRefractionDetails),
    defaultValues: {
      hb_rx_right_dist: null,
      hb_rx_left_dist: null,
      hb_rx_right_near: null,
      hb_rx_left_near: null,
      auto_ref_right: null,
      auto_ref_left: null,
      ntc_right: null,
      ntc_left: null,
      va_without_glass_right: null,
      va_without_glass_left: null,
      va_without_ph_right: null,
      va_without_ph_left: null,
      va_with_glass_right: null,
      va_with_glass_left: null,
      right_eye_dist_sph: null,
      right_eye_dist_cyl: null,
      right_eye_dist_axis: null,
      right_eye_near_sph: null,
      left_eye_dist_sph: null,
      left_eye_dist_cyl: null,
      left_eye_dist_axis: null,
      left_eye_near_sph: null,
      shuger: false,
      refraction_remark: null,
      prescription_type: "internal",
      cataract: false,
      blepharitis: false,
      note: null,
    },
  });

  const onSubmit = async (data: RefractionDetailsFormModel) => {
    if (refraction_id !== undefined && refraction_id !== null) {
      if (refractionDetailExist) {
        prepareValidation("update", async (verifiedUserId: number) => {
          await handleRefractionDetailUpdate(data, verifiedUserId);
        });
      } else {
        //  create
        prepareValidation("create", async (verifiedUserId: number) => {
          await handleRefractionDetailCreate(data, verifiedUserId);
        });
      }
    }
  };

  //SEND DATA API CALLS
  const handleRefractionDetailUpdate = async (
    data: RefractionDetailsFormModel,
    userId: number
  ) => {
    if (refractionDetail) {
      try {
        await putHandler(`/refraction-details/${refraction_id}/`, {
          ...data,
          refraction: refractionDetail.refraction,
          is_manual: refractionDetail.is_manual,
          user: userId, // Include verified user ID,
        });
        toast.success("Refraction saved successfully");
        methods.reset();
        navigate(-1);
      } catch (err) {
        extractErrorMessage(err);
      }
    }
  };
  const handleRefractionDetailCreate = async (
    data: RefractionDetailsFormModel,
    userId: number
  ) => {
    if (refraction_id !== undefined && refraction_id !== null) {
      try {
        const payload = {
          ...data,
          user: userId, // Include verified user ID,
          refraction: parseInt(refraction_id),
        };
        console.log(payload);

        await postHandler(`/refraction-details/create/`, payload);
        toast.success("Refraction saved successfully");
        methods.reset();
        navigate(-1);
      } catch (err) {
        extractErrorMessage(err);
      }
    } else {
      toast.error("Critical Error Refraction ID missing");
    }
  };
  //SEND DATA API CALLS
  useEffect(() => {
    if (refractionDetail && !refractionDetailLoading && refractionDetailExist) {
      methods.reset({
        hb_rx_right_dist: refractionDetail.hb_rx_right_dist,
        hb_rx_left_dist: refractionDetail.hb_rx_left_dist,
        hb_rx_right_near: refractionDetail.hb_rx_right_near,
        hb_rx_left_near: refractionDetail.hb_rx_left_near,
        auto_ref_right: refractionDetail.auto_ref_right,
        auto_ref_left: refractionDetail.auto_ref_left,
        ntc_right: refractionDetail.ntc_right,
        ntc_left: refractionDetail.ntc_left,
        va_without_glass_right: refractionDetail.va_without_glass_right,
        va_without_glass_left: refractionDetail.va_without_glass_left,
        va_without_ph_right: refractionDetail.va_without_ph_right,
        va_without_ph_left: refractionDetail.va_without_ph_left,
        va_with_glass_right: refractionDetail.va_with_glass_right,
        va_with_glass_left: refractionDetail.va_with_glass_left,
        right_eye_dist_sph: refractionDetail.right_eye_dist_sph,
        right_eye_dist_cyl: refractionDetail.right_eye_dist_cyl,
        //VISION POWERS
        right_eye_dist_axis: refractionDetail.right_eye_dist_axis,
        right_eye_near_sph: refractionDetail.right_eye_near_sph,
        left_eye_dist_sph: refractionDetail.left_eye_dist_sph,
        left_eye_dist_cyl: refractionDetail.left_eye_dist_cyl,
        left_eye_dist_axis: refractionDetail.left_eye_dist_axis,
        left_eye_near_sph: refractionDetail.left_eye_near_sph,
        //VISION POWERS
        shuger: refractionDetail.shuger,
        cataract: refractionDetail.cataract,
        refraction_remark: refractionDetail.refraction_remark,
        prescription_type: refractionDetail.prescription_type,
        blepharitis: refractionDetail.blepharitis,
        note: refractionDetail.note,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refractionDetailLoading, refractionDetailExist]);
  if (refractionDetailLoading && singlerefractionNumberLoading) {
    return (
      <LoadingAnimation loadingMsg="Checking Refraction Details History" />
    );
  }

  return (
    <>
      <FormProvider {...methods}>
        <Box sx={{ minWidth: "1000px" }}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Paper
              variant="outlined"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
                borderRadius: 2,
              }}
            >
              {[
                {
                  label: "Name",
                  value: singlerefractionNumber?.customer_full_name,
                },
                { label: "NIC", value: singlerefractionNumber?.nic },
                {
                  label: "Refraction No.",
                  value: singlerefractionNumber?.refraction_number,
                },
                {
                  label: "Mobile",
                  value: singlerefractionNumber?.customer_mobile,
                },
                {
                  label: "Date",
                  value: formatDateTimeByType(
                    singlerefractionNumber?.created_at,
                    "date"
                  ),
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    minWidth: "20%",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      bgcolor: grey[700],
                      color: "white",
                      p: "2px 5px",
                      borderRadius: 1,
                      minWidth: "40px",
                      textAlign: "center",
                      fontSize: "0.8rem",
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    color="textSecondary"
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Paper>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 1,
                p: 1,
              }}
            >
              <RefractionDetailsRight />
              <RefractionDetailsLeft />
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                {...methods.register("note")}
                size="small"
                fullWidth
                label="note"
                multiline
                InputLabelProps={{
                  shrink: Boolean(methods.watch("note")),
                }}
              />
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="prescription-type-label">
                  Prescription Type
                </InputLabel>
                <Controller
                  name="prescription_type"
                  control={methods.control}
                  defaultValue="internal"
                  render={({ field }) => (
                    <Select
                      {...field}
                      size="small"
                      labelId="prescription-type-label"
                      label="Prescription Type"
                    >
                      <MenuItem value="internal">
                        Internal Prescription
                      </MenuItem>
                      <MenuItem value="vision_plus">
                        Vision Plus Prescription
                      </MenuItem>
                      <MenuItem value="other">Other Prescription</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                {...methods.register("refraction_remark")}
                sx={{ my: 0.5 }}
                size="small"
                fullWidth
                label="Refraction remark"
                multiline
                InputLabelProps={{
                  shrink: Boolean(methods.watch("refraction_remark")),
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    {...methods.register("shuger")}
                    checked={methods.watch("shuger") === true}
                  />
                }
                label="Sugar"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    {...methods.register("cataract")}
                    checked={methods.watch("cataract") === true}
                  />
                }
                label="Cataract"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    {...methods.register("blepharitis")}
                    checked={methods.watch("blepharitis") === true}
                  />
                }
                label="Blepharitis"
              />
              {/* <SaveButton btnText="Save" loading={false} /> */}
              <SubmitCustomBtn
                btnText={`${
                  refractionDetailExist
                    ? "Update Refraction Details"
                    : "Create Refraction Details"
                }`}
                loading={
                  refractionDetailExist ? putHandlerloading : postHandlerloading
                }
                isError={refractionDetail ? putHandlerError : postHandlerError}
              />
            </Box>
          </form>
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
