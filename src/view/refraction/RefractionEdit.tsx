import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
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
import SaveButton from "../../components/SaveButton";
import LoadingAnimation from "../../components/LoadingAnimation";
export default function RefractionEdit() {
  const navigate = useNavigate();
  const { refraction_id } = useParams();

  const { singlerefractionNumber, singlerefractionNumberLoading } =
    useGetSingleRefractionNumber(refraction_id);
  const { refractionDetail, refractionDetailLoading, refractionDetailExist } =
    useGetRefractionDetails(refraction_id);
  const { postHandler } = useAxiosPost();
  const { putHandler } = useAxiosPut();
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
      prescription: false,
      note: null,
    },
  });

  const onSubmit = async (data: RefractionDetailsFormModel) => {
    // console.log(convertedData);

    if (refraction_id !== undefined && refraction_id !== null) {
      if (refractionDetailExist) {
        try {
          await putHandler(`/refractions-details/${refraction_id}/`, {
            ...data,
            refraction: refractionDetail.refraction,
            is_manual: refractionDetail.is_manual,
          });
          toast.success("Refraction saved successfully");
          methods.reset();

          navigate(-1);
        } catch (err) {
          extractErrorMessage(err);
        }
      } else {
        try {
          await postHandler(`/refraction-details/create/`, {
            ...data,
            refraction: parseInt(refraction_id),
          });
          toast.success("Refraction saved successfully");
          methods.reset();

          navigate(-1);
        } catch (err) {
          extractErrorMessage(err);
        }
      }
    }
  };
  const visionTypeStringToNumber = (vision: string | null) => {
    if (typeof vision === "string") {
      return parseFloat(vision);
    } else if (typeof vision === "number") {
      return vision;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (!refractionDetailLoading && refractionDetailExist) {
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
        right_eye_dist_sph: visionTypeStringToNumber(
          refractionDetail.right_eye_dist_sph
        ),
        right_eye_dist_cyl: visionTypeStringToNumber(
          refractionDetail.right_eye_dist_cyl
        ),
        right_eye_dist_axis: visionTypeStringToNumber(
          refractionDetail.right_eye_dist_axis
        ),
        right_eye_near_sph: visionTypeStringToNumber(
          refractionDetail.right_eye_near_sph
        ),
        left_eye_dist_sph: visionTypeStringToNumber(
          refractionDetail.left_eye_dist_sph
        ),
        left_eye_dist_cyl: visionTypeStringToNumber(
          refractionDetail.left_eye_dist_cyl
        ),
        left_eye_dist_axis: visionTypeStringToNumber(
          refractionDetail.left_eye_dist_axis
        ),
        left_eye_near_sph: visionTypeStringToNumber(
          refractionDetail.left_eye_near_sph
        ),
        shuger: refractionDetail.shuger,
        refraction_remark: refractionDetail.refraction_remark,
        prescription: refractionDetail.prescription,
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
    <FormProvider {...methods}>
      <Box sx={{ minWidth: "1000px" }}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 0.5,
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "#f5f5f5",
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
                    p: "2px 6px",
                    borderRadius: 1,
                    minWidth: "40px",
                    textAlign: "center",
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

          {/* //TODO V2 */}
          <TextField
            {...methods.register("note")}
            sx={{ my: 0.5 }}
            size="small"
            fullWidth
            label="note"
            multiline
            InputLabelProps={{
              shrink: Boolean(methods.watch("note")),
            }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* <TextField
              {...methods.register("pd", { valueAsNumber: true })}
              sx={{ my: 0.5, width: 100 }}
              size="small"
              type="number"
              label="PD"
              InputLabelProps={{
                shrink: Boolean(methods.watch("pd")),
              }}
            />
            <TextField
              {...methods.register("h", { valueAsNumber: true })}
              sx={{ my: 0.5, width: 100 }}
              type="number"
              size="small"
              label="H"
              InputLabelProps={{
                shrink: Boolean(methods.watch("h")),
              }}
            /> */}
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
                  {...methods.register("prescription")}
                  checked={methods.watch("prescription") === true}
                />
              }
              label="Prescription"
            />
            <SaveButton btnText="Save" loading={false} />
          </Box>
        </form>
      </Box>
    </FormProvider>
  );
}
