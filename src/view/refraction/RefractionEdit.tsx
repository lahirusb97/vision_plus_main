import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
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
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { customerName, mobileNumber, refraction_number } =
    location.state || {};

  const methods = useForm({
    resolver: yupResolver(refractionValidationSchema),
  });
  const { refractionDetail, refractionDetailLoading, refractionDetailExist } =
    useGetRefractionDetails(id);
  console.log(refractionDetail);

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
      <Box sx={{ minWidth: "1000px", padding: "10px" }}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 1,
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            {[
              { label: "Name", value: customerName },
              { label: "Refraction No.", value: refraction_number },
              { label: "Mobile", value: mobileNumber },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  minWidth: "30%",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    bgcolor: grey[700],
                    color: "white",
                    p: "4px 12px",
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
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* //TODO V2 */}
            {/* <TextField
              {...methods.register("note")}
              sx={{ my: 0.5 }}
              size="small"
              fullWidth
              label="note"
              multiline
            /> */}
            <TextField
              {...methods.register("remark")}
              sx={{ my: 0.5 }}
              size="small"
              fullWidth
              label="remark"
              multiline
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
