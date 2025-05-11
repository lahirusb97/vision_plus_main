import React, { useState } from "react";
import { Box, TextField, Container, Paper } from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
import TitleText from "../../../components/TitleText";
const FrameBrandAdd = () => {
  const navigate = useNavigate();
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postHandler("/brands/", {
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
        <TitleText title="Create Frame Brand" />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Frame Brand Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Box sx={{ mt: 2 }}>
            <SubmitCustomBtn
              btnText="Create Frame Brand"
              loading={postHandlerloading}
              isError={postHandlerError}
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default FrameBrandAdd;
