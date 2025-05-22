import {
  Box,
  TextField,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useParams } from "react-router";
import toast from "react-hot-toast";

import useGetSingleLense from "../../../hooks/lense/useGetSingleLense";
import LoadingAnimation from "../../../components/LoadingAnimation";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import BackButton from "../../../components/BackButton";
import InfoChip from "../../../components/common/InfoChip";
import returnPlusSymbol from "../../../utils/returnPlusSymbol";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { useNavigate } from "react-router";

interface Stock {
  price: number;
}
const LenseEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleLense, singleLenseLoading, refresh } = useGetSingleLense(id);

  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const schema = yup.object().shape({
    price: yup
      .number()
      .positive()
      .min(0.01, "Price must be positive")
      .required("Price is required"),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      price: undefined,
    },
  });
  const submiteData = async (data: Stock) => {
    const { price } = data;
    const postDAta = {
      lens: { price: price, brand: singleLense?.brand },
    };

    try {
      await putHandler(`/lenses/${id}/`, postDAta);
      toast.success("Lense Saved Successfully");
      refresh();
      navigate(-1);
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  if (singleLenseLoading) {
    return <LoadingAnimation loadingMsg="Loading Lense Details" />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Paper
        component={"form"}
        onSubmit={handleSubmit(submiteData)}
        sx={{ padding: 4, width: 400, textAlign: "Left" }}
        variant="outlined"
      >
        <BackButton />
        <Typography variant="h6" fontWeight="bold" paddingLeft="9px">
          Lense Price Update
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {!singleLenseLoading && singleLense ? (
          <>
            <Box sx={{ my: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: 600, color: "#2E3A59" }}
              >
                Lens Details
              </Typography>
              <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                {[
                  { label: "Factory", value: singleLense?.brand_name },
                  { label: "Lens Type", value: singleLense?.type_name },
                  { label: "Coating", value: singleLense?.coating_name },
                ].map((item) => (
                  <div key={item.label}>
                    <InfoChip label={item.label} value={item.value} />
                  </div>
                ))}
              </Stack>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ my: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: 600, color: "#2E3A59" }}
              >
                Power Details
              </Typography>
              <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                {singleLense?.powers.map((item) => (
                  <div key={item.power_name}>
                    <InfoChip
                      label={item.power_name}
                      value={`${returnPlusSymbol(item.value)}${parseFloat(
                        item.value
                      ).toFixed(2)}`}
                    />
                  </div>
                ))}
              </Stack>
            </Box>
          </>
        ) : (
          <CircularProgress />
        )}

        <Typography variant="body2" fontWeight="500" sx={{ mb: 0.5 }}>
          Current Price
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "#1565C0", mb: 1 }}
        >
          Rs. {numberWithCommas(singleLense?.price)}
        </Typography>

        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          inputProps={{ min: 0 }}
          type="number"
          {...register("price", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          sx={{ marginBottom: 2 }}
        />

        <SubmitCustomBtn
          btnText="Update Price"
          loading={putHandlerloading}
          isError={putHandlerError}
        />
      </Paper>
    </Box>
  );
};

export default LenseEdit;
