import React, { useEffect, useState } from "react";
import { Box, TextField, Container, Paper } from "@mui/material";
import axiosClient from "../../../axiosClient";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import TitleText from "../../../components/TitleText";
const FrameBrandEdit = () => {
  const navigate = useNavigate();
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const { id } = useParams();
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
        const response = await axiosClient.get(`/brands/${id}/`);
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
      await putHandler(`/brands/${id}/`, {
        ...formData,
        brand_type: "frame",
      });
      toast.success("Lense Brand Added successfully");
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
        <TitleText title="Update Frame Brand" />
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            label="Brand Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box sx={{ mt: 2 }}>
            <SubmitCustomBtn
              btnText="Update Frame Brand"
              loading={putHandlerloading}
              isError={putHandlerError}
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default FrameBrandEdit;
