import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router";
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
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import TitleText from "../../../components/TitleText";
import BackButton from "../../../components/BackButton";

export const BusTitleCreate = () => {
  const navigate = useNavigate();

  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusTitleForm>({
    resolver: zodResolver(busTitleSchema),
  });

  const onSubmit = async (data: BusTitleForm) => {
    try {
      await postHandler("bus/title/", data);
      navigate("/transaction/bus/");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Box sx={{ minWidth: 400, mx: "auto", mt: 4 }}>
      <Paper elevation={1} sx={{ p: 1 }}>
        <BackButton />
        <TitleText title="Create Bus Title" />
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
            control={<Checkbox {...register("is_active")} />}
            label="Activate Title Now "
          />
          <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
            <SubmitCustomBtn
              loading={postHandlerloading}
              isError={postHandlerError}
              btnText="Create Titale"
            />
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
