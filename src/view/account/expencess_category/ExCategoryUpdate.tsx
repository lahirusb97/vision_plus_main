import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import axiosClient from "../../../axiosClient";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { handleError } from "../../../utils/handleError";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
const ExCategoryUpdate = () => {
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
        const response = await axiosClient.get(`/expense-categories/${id}/`);
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
      await axiosClient.put(`/expense-categories/${id}/`, formData);
      toast.success("Lense added successfully");
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
      <Paper sx={{ p: 4, minWidth: "300px" }}>
        <Typography>Update Expence Category</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ExCategoryUpdate;
