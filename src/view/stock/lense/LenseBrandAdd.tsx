import React, { useState } from "react";
import { Box, TextField, Container, Paper } from "@mui/material";

import { toast } from "react-hot-toast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import TitleText from "../../../components/TitleText";
import BackButton from "../../../components/BackButton";
import { useNavigate } from "react-router";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
const LenseBrandAdd = () => {
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
      await postHandler("brands/", { ...formData, brand_type: "lens" });
      toast.success("Lense Factory Added successfully");

      setFormData({
        name: "",
      });
      navigate("/stock/add_variation");
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, width: "300px" }}>
        <BackButton />
        <TitleText title="Add Lense Factory" />
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            label="Lense Factory Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box>
            <SubmitCustomBtn
              btnText="Create Lense Factory"
              loading={postHandlerloading}
              isError={postHandlerError}
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LenseBrandAdd;
