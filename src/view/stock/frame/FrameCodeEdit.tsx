import React, { useEffect, useState } from "react";
import { Box, TextField, Container, Paper } from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import TitleText from "../../../components/TitleText";
import axiosClient from "../../../axiosClient";
const FrameCodeEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const [searchParams] = useSearchParams();

  const paramName = searchParams.get("brand");

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    const fetchLenseType = async () => {
      try {
        const response = await axiosClient.get(`/codes/${id}/`);
        setFormData(response.data);
      } catch (error) {
        extractErrorMessage(error);
      }
    };
    fetchLenseType();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await putHandler(`/codes/${id}/`, {
        ...formData,
        paramName: parseInt(paramName?.toString() ?? ""),
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

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, width: "300px" }}>
        <TitleText title="Update Frame Code" />
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
