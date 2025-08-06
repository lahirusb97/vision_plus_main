import React from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import { getBranchName } from "../../utils/branchName";
import SubmitCustomBtn from "../../components/common/SubmiteCustomBtn";

// Zod validation schema
const OrderFormSchema = z.object({
  invoice: z
    .string()
    .min(1, "Invoice number is required")
    .regex(/^\d+$/, "Only numbers allowed"),
  usercode: z.string().min(1, "User code is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

// TypeScript types for form values
type OrderFormType = z.infer<typeof OrderFormSchema>;

export default function GlassSender() {
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormType>({
    resolver: zodResolver(OrderFormSchema),
  });

  const onSubmit = async (data: OrderFormType) => {
    const postData = {
      invoice_number: `${getBranchName()}${data.invoice}`,
      user_code: data.usercode,
      password: data.password,
    };
    try {
      await postHandler("/orders/mark-delivered/", postData);
      reset();
      toast.success("Order marked as delivered");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Paper sx={{ p: 3, minWidth: 380, mx: "auto", my: 5 }}>
      <Typography variant="h6" mb={2} align="center">
        Glasses Sender
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        display="flex"
        flexDirection="column"
        gap={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Invoice"
          {...register("invoice")}
          error={!!errors.invoice}
          helperText={
            errors.invoice?.message || "Enter only the invoice number"
          }
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {getBranchName()}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="User Code"
          {...register("usercode")}
          error={!!errors.usercode}
          helperText={errors.usercode?.message}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Password"
          {...register("password")}
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          variant="outlined"
          fullWidth
        />
        <SubmitCustomBtn
          btnText="Mark as Deliverd"
          isError={postHandlerError}
          loading={postHandlerloading}
        />
      </Box>
    </Paper>
  );
}
