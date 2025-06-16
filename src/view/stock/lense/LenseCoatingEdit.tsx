import React, { useEffect, useState } from "react";
import { Box, TextField, Container, Paper } from "@mui/material";
import axiosClient from "../../../axiosClient";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import TitleText from "../../../components/TitleText";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
const LenseCoatingEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
        const response = await axiosClient.get(`/lens-coatings/${id}/`);
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
      await putHandler(`/lens-coatings/${id}/`, formData);
      toast.success("Lense added successfully");
      navigate(-1);
      setFormData({
        name: "",
        description: "",
      });
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, width: "300px" }}>
        <TitleText title="Update Lense Coating" />
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
          />
          <Box>
            <SubmitCustomBtn
              btnText="Update Lense Coating"
              loading={putHandlerloading}
              isError={putHandlerError}
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LenseCoatingEdit;
