import React, { useState } from "react";
import { Box, TextField, Container, Paper } from "@mui/material";
import { toast } from "react-hot-toast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import TitleText from "../../../components/TitleText";
import { useAxiosPost } from "../../../hooks/useAxiosPost";

import { useNavigate } from "react-router";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
const LenseCoatingAdd = () => {
  const navigate = useNavigate();
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ress = await postHandler("/lens-coatings/", formData);
      toast.success(`${ress.data.name} Lense Coating Created successfully`);

      setFormData({
        name: "",
        description: "",
      });
      navigate(-1);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4 }}>
        <TitleText title="Create Lense Coating" />
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            label="Coating Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label=" Coating Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
          />
          <Box sx={{ mt: 2 }}>
            <SubmitCustomBtn
              btnText="Create Lense Coating"
              loading={postHandlerloading}
              isError={postHandlerError}
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LenseCoatingAdd;
