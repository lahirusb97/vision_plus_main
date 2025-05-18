import React, { useEffect, useState } from "react";
import { Box, TextField, Container, Paper } from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import TitleText from "../../../components/TitleText";

import InfoChip from "../../../components/common/InfoChip";
import useGetSingleCode from "../../../hooks/lense/useGetSingleCode";
import LoadingAnimation from "../../../components/LoadingAnimation";
import DataLoadingError from "../../../components/common/DataLoadingError";
const FrameCodeEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleCode, singleCodeLoading, singleCodeError } =
    useGetSingleCode(id);
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const [formData, setFormData] = useState({
    name: "",
  });
  useEffect(() => {
    if (singleCode) {
      setFormData({
        name: singleCode.name,
      });
    }
  }, [singleCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      name: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await putHandler(`/codes/${id}/`, {
        ...formData,
        brand: singleCode?.brand,
      });
      toast.success("Frame Code Updated successfully");
      navigate(-1);
      setFormData({
        name: "",
      });
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  if (singleCodeLoading) {
    return <LoadingAnimation loadingMsg="Loading Frame Code" />;
  }
  if (!singleCode && !singleCodeError) {
    return <DataLoadingError />;
  }
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, width: "300px" }}>
        <TitleText title="Update Frame Code" />
        <InfoChip label="Brand" value={singleCode?.brand_name} />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Frame Code Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Box>
            <SubmitCustomBtn
              btnText="Update Frame Code"
              loading={putHandlerloading}
              isError={putHandlerError}
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default FrameCodeEdit;
