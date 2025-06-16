import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Box, Paper, TextField } from "@mui/material";
import { useAxiosPost } from "../../../../hooks/useAxiosPost";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import TitleText from "../../../../components/TitleText";
import SubmitCustomBtn from "../../../../components/common/SubmiteCustomBtn";
import { useNavigate } from "react-router";
import { ExternalCoatingForm } from "../../../../validations/schemaExternalCoating";
import { schemaExternalCoating } from "../../../../validations/schemaExternalCoating";

export default function ExternalCoatingCreate() {
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExternalCoatingForm>({
    resolver: zodResolver(schemaExternalCoating),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: ExternalCoatingForm) => {
    try {
      await postHandler("external-lens-coatings/", data);
      toast.success("Coating created successfully");
      reset();
      navigate("/stock/external_lense/create/");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Box sx={{ minWidth: 400, margin: "auto", mt: 2 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}
      >
        <TitleText title="Create External Coating" />

        <TextField
          autoFocus
          label="Name"
          size="small"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <SubmitCustomBtn
          btnText="Create Coating"
          loading={postHandlerloading}
          isError={postHandlerError}
        />
      </Paper>
    </Box>
  );
}
