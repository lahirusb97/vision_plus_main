import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Box, Paper, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import TitleText from "../../../../components/TitleText";
import SubmitCustomBtn from "../../../../components/common/SubmiteCustomBtn";
import {
  ExternalCoatingForm,
  schemaExternalCoating,
} from "../../../../validations/schemaExternalCoating";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAxiosPut } from "../../../../hooks/useAxiosPut";
import axiosClient from "../../../../axiosClient";
import LoadingAnimation from "../../../../components/LoadingAnimation";
import DataLoadingError from "../../../../components/common/DataLoadingError";
export default function ExternalCoatingUpdate() {
  const { lense_coating_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();

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

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const response = await axiosClient.get(
          `external-lens-coatings/${lense_coating_id}/`
        );
        reset(response.data);
      } catch (error) {
        extractErrorMessage(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (lense_coating_id) {
      fetchData();
    }
  }, [lense_coating_id]);

  const onSubmit = async (data: ExternalCoatingForm) => {
    try {
      await putHandler(`external-lens-coatings/${lense_coating_id}/`, data);
      toast.success("Coating updated successfully");
      navigate("/stock/external_lense/create/");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  if (loading) {
    return <LoadingAnimation loadingMsg="External Coating Searching.." />;
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
        <TitleText title="Update External Coating" />

        <TextField
          label="Name"
          size="small"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <SubmitCustomBtn
          btnText="Update Coating"
          loading={putHandlerloading}
          isError={putHandlerError}
        />
      </Paper>
    </Box>
  );
}
