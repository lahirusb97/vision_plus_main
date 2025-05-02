import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate, useParams } from "react-router";
import {
  TextField,
  Box,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  BusTitleForm,
  busTitleSchema,
} from "../../../validations/busTitleSchema";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import TitleText from "../../../components/TitleText";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import { useEffect, useState } from "react";

import axiosClient from "../../../axiosClient";
import DataLoadingError from "../../../components/common/DataLoadingError";
import LoadingAnimation from "../../../components/LoadingAnimation";

const BusTitleUpdate = () => {
  const navigate = useNavigate();
  const { bus_title_id } = useParams();
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BusTitleForm>({
    resolver: zodResolver(busTitleSchema),
    defaultValues: {
      title: "",
      is_active: false,
    },
  });

  const onSubmit = async (data: BusTitleForm) => {
    try {
      await putHandler(`bus/title/${bus_title_id}/`, data);
      navigate("/transaction/bus/");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  useEffect(() => {
    const fetchBusTitle = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axiosClient.get(`bus/title/${bus_title_id}/`);
        setValue("title", response.data.title);
        setValue("is_active", response.data.is_active);
      } catch (error) {
        extractErrorMessage(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (bus_title_id) {
      fetchBusTitle();
    }
  }, [bus_title_id]);
  if (loading) {
    return <LoadingAnimation loadingMsg="Loading Bus Title" />;
  }
  if (error && !loading) {
    return <DataLoadingError />;
  }

  return (
    <Box sx={{ minWidth: 400, mx: "auto", mt: 4 }}>
      <Paper elevation={1} sx={{ p: 1 }}>
        <TitleText title="Update Bus Title" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Bus Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            margin="normal"
          />

          <FormControlLabel
            control={
              <Checkbox
                {...register("is_active")}
                checked={watch("is_active") || false}
              />
            }
            label="Activate Title Now "
          />
          <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
            <SubmitCustomBtn
              loading={putHandlerloading}
              isError={putHandlerError}
              btnText="Update Title"
            />
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default BusTitleUpdate;
