import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Container, Paper } from "@mui/material";
import axiosClient from "../../../axiosClient";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { handleError } from "../../../utils/handleError";
const LenseBrandEdit = () => {
  const navigate = useNavigate();
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
        console.log(response.data);
        setFormData(response.data);
      } catch (error) {
        handleError(error, "Failed to recive Brand");
      }
    };
    fetchLenseType();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/brands/${id}/`, {
        ...formData,
        brand_type: "lens",
      });
      toast.success("Lense Brand Added successfully");
      navigate(-1);
      setFormData({
        name: "",
      });
    } catch (error) {
      handleError(error, "Failed to recive lens Brand");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, width: "300px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Brand Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
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

export default LenseBrandEdit;
