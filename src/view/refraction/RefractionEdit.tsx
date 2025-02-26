import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router";
import axiosClient from "../../axiosClient";
import { grey } from "@mui/material/colors";
import RefractionDetailsRight from "./RefractionDetailsRight";
import RefractionDetailsLeft from "./RefractionDetailsLeft";
import { refractionValidationSchema } from "../../validations/refractionDetails";
import toast from "react-hot-toast";
import axios from "axios";

// Validation Schema

export default function RefractionEdit() {
  const { id } = useParams();
  const location = useLocation();
  const { customerName, mobileNumber } = location.state || {};

  const methods = useForm({
    resolver: yupResolver(refractionValidationSchema),
  });
  const onSubmit = async (data) => {
    try {
      const responseData = await axiosClient.post(
        `/refraction-details/create/`,
        {
          ...data,
          refraction: parseInt(id),
        }
      );
      toast.success("Refraction saved successfully");
      methods.reset();
    } catch (err) {
      console.log(err);

      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || "Failed to save Reraction details"
        );
      } else {
        toast.error("An unexpected error occurred Refrsh the page");
      }
    }
  };

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
              { label: "NIC", value: "978221112V" },
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
          >
            Submit
          </Button>
        </form>
      </Box>
    </FormProvider>
  );
}
