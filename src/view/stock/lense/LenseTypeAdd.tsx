import React, { useState } from "react";
import { Box, TextField, Button, Container, Paper } from "@mui/material";
import axiosClient from "../../../axiosClient";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
const LenseTypeAdd = () => {
  const navigate = useNavigate();

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
      await axiosClient.post("/lens-types/", formData);
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
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
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
            rows={4}
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LenseTypeAdd;
