import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import axiosClient from "../../axiosClient";
import { grey } from "@mui/material/colors";
import RefractionDetailsRight from "./RefractionDetailsRight";
import RefractionDetailsLeft from "./RefractionDetailsLeft";
import { refractionValidationSchema } from "../../validations/refractionDetails";
import toast from "react-hot-toast";
import axios from "axios";
import useGetRefractionDetails from "../../hooks/useGetRefractionDetails";
import { useEffect } from "react";
import { RefractionDetailCreate } from "../../model/RefractionDetailCreate";

export default function RefractionEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const customerName = searchParams.get("customerName") || "";
  const nic = searchParams.get("nic") || "";
  const mobileNumber = searchParams.get("mobileNumber") || "";
  const refraction_number = searchParams.get("refraction_number") || "";
  const { id } = useParams();
  const methods = useForm({
    resolver: yupResolver(refractionValidationSchema),
  });
  const { refractionDetail, refractionDetailLoading, refractionDetailExist } =
    useGetRefractionDetails(id);

  const convertEmptyStringsToNull = (data: RefractionDetailCreate) => {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "" || value === undefined || value === null ? null : value,
      ])
    );
  };
  const onSubmit = async (data: unknown) => {
    const convertedData = convertEmptyStringsToNull(
      data as RefractionDetailCreate
    );
    // console.log(convertedData);

    if (id !== undefined && id !== null) {
      if (refractionDetailExist) {
        try {
          await axiosClient.put(`/refractions/${id}/`, {
            ...convertedData,
            refraction: refractionDetail.refraction,
            is_manual: refractionDetail.is_manual,
          });
          toast.success("Refraction saved successfully");
          methods.reset();
          navigate(-1);
        } catch (err) {
          console.log(err);

          if (axios.isAxiosError(err)) {
            toast.error(
              err.response?.data?.refraction[0] ||
                "Failed to save Reraction details"
            );
          } else {
            toast.error("An unexpected error occurred Refrsh the page");
          }
        }
      } else {
        try {
          await axiosClient.post(`/refraction-details/create/`, {
            ...convertedData,
            refraction: parseInt(id),
          });
          toast.success("Refraction saved successfully");
          methods.reset();
          navigate(-1);
        } catch (err) {
          console.log(err);

          if (axios.isAxiosError(err)) {
            toast.error(
              err.response?.data?.refraction[0] ||
                "Failed to save Reraction details"
            );
          } else {
            toast.error("An unexpected error occurred Refrsh the page");
          }
        }
      }
    }
  };
  useEffect(() => {
    if (!refractionDetailLoading && refractionDetailExist) {
      Object.entries(refractionDetail).forEach(([key, value]) => {
        if (key in methods.getValues()) {
          methods.setValue(key as keyof RefractionDetailCreate, value || null);
        }
      });
    }
  }, [refractionDetailLoading, refractionDetailExist]);

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
              { label: "Name", value: customerName },
              { label: "NIC", value: nic },
              { label: "Refraction No.", value: refraction_number },
              { label: "Mobile", value: mobileNumber },
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
            <TextField
              {...methods.register("pd")}
              sx={{ my: 0.5, width: 100 }}
              size="small"
              type="number"
              label="PD"
              InputLabelProps={{
                shrink: Boolean(methods.watch("pd")),
              }}
            />
            <TextField
              {...methods.register("h")}
              sx={{ my: 0.5, width: 100 }}
              type="number"
              size="small"
              label="H"
              InputLabelProps={{
                shrink: Boolean(methods.watch("h")),
              }}
            />
            <TextField
              {...methods.register("remark")}
              sx={{ my: 0.5 }}
              size="small"
              fullWidth
              label="remark"
              multiline
              InputLabelProps={{
                shrink: Boolean(methods.watch("remark")),
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
          </Box>

          <Button
            sx={{ width: "100%" }}
            type="submit"
            variant="contained"
            color="primary"
            disabled={refractionDetailLoading}
          >
            {refractionDetailExist ? "Update" : "Create"}
          </Button>
        </form>
      </Box>
    </FormProvider>
  );
}
