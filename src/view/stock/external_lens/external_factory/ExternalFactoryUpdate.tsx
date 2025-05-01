import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Box, Paper, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import TitleText from "../../../../components/TitleText";
import SubmitCustomBtn from "../../../../components/common/SubmiteCustomBtn";
import {
  ExternalFactoryForm,
  schemaExternalFactory,
} from "../../../../validations/schemaExternalFactory";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAxiosPut } from "../../../../hooks/useAxiosPut";
import LoadingAnimation from "../../../../components/LoadingAnimation";
import DataLoadingError from "../../../../components/common/DataLoadingError";
import axiosClient from "../../../../axiosClient";

export default function ExternalFactoryUpdate() {
  const { lense_factory_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();

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

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const response = await axiosClient.get(
          `/external-lens-brands/${lense_factory_id}/`
        );
        reset(response.data);
      } catch (error) {
        extractErrorMessage(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (lense_factory_id) {
      fetchData();
    }
  }, [lense_factory_id]);

  const onSubmit = async (data: ExternalFactoryForm) => {
    try {
      await putHandler(`external-lens-brands/${lense_factory_id}/`, data);
      toast.success("Factory updated successfully");
      navigate("/stock/external_lense/create/");
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  if (loading) {
    return <LoadingAnimation loadingMsg="External Factory Searching.." />;
  }
  if (error) {
    return <DataLoadingError />;
  }
  return (
    <Box sx={{ minWidth: 400, margin: "auto", mt: 2 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}
      >
        <TitleText title="Update External Factory" />

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
          btnText="Update Factory"
          loading={putHandlerloading}
          isError={putHandlerError}
        />
      </Paper>
    </Box>
  );
}
