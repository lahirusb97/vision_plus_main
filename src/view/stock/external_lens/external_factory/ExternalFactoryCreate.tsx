import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Box, Paper, TextField } from "@mui/material";
import { useAxiosPost } from "../../../../hooks/useAxiosPost";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import TitleText from "../../../../components/TitleText";
import SubmitCustomBtn from "../../../../components/common/SubmiteCustomBtn";
import {
  ExternalFactoryForm,
  schemaExternalFactory,
} from "../../../../validations/schemaExternalFactory";
import { useNavigate } from "react-router";
export default function ExternalFactoryCreate() {
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExternalFactoryForm>({
    resolver: zodResolver(schemaExternalFactory),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: ExternalFactoryForm) => {
    try {
      await postHandler("external-lens-brands/", data);
      toast.success("Factory created successfully");
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
        <TitleText title="Create External Factory" />

        <TextField
          label="Name"
          size="small"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Description"
          size="small"
          fullWidth
          multiline
          rows={2}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <SubmitCustomBtn
          btnText="Create Factory"
          loading={postHandlerloading}
          isError={postHandlerError}
        />
      </Paper>
    </Box>
  );
}
