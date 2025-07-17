import React, { useState } from "react";
import { Box, TextField, Container, Paper } from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import TitleText from "../../../components/TitleText";
import InfoChip from "../../../components/common/InfoChip";
import LoadingAnimation from "../../../components/LoadingAnimation";
import DataLoadingError from "../../../components/common/DataLoadingError";
import useGetSingleBrand from "../../../hooks/lense/useGetSingleBrand";
const FrameCodeAdd = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
  const paramName = searchParams.get("brand");
  const { singleBrand, singleBrandLoading, singleBrandError } =
    useGetSingleBrand(paramName?.toString() ?? "");
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      name: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postHandler("/codes/", {
        ...formData,
        brand: singleBrand?.id,
      });
      toast.success("Frame Code added successfully");
      navigate(-1);
      setFormData({
        name: "",
      });
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  if (singleBrandLoading) {
    return <LoadingAnimation loadingMsg="Loading Frame Code" />;
  }
  if (!singleBrand && !singleBrandError) {
    return <DataLoadingError />;
  }
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, width: "300px" }}>
        <TitleText title="Create Frame Code" />
        <InfoChip label="Brand" value={singleBrand?.name} />
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            label="Frame Code "
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Box>
            <SubmitCustomBtn
              btnText="Create Frame Code"
              loading={postHandlerloading}
              isError={postHandlerError}
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default FrameCodeAdd;
