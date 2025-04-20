import React, { useState } from "react";
import { Box, TextField, Button, Container, Paper } from "@mui/material";
import axiosClient from "../../../axiosClient";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

const ExSubCategoryCreate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const [formData, setFormData] = useState({
    name: "",
    category: categoryId ? parseInt(categoryId) : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        main_category: formData.category,
      };

      await axiosClient.post("/expense-subcategories/", payload);
      toast.success("Subcategory created successfully");
      navigate(-1);
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
            label="Subcategory Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          {categoryId && (
            <TextField
              sx={{ display: "none" }}
              fullWidth
              label="Category ID"
              name="category"
              value={formData.category}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              helperText="This subcategory will be assigned to the selected category"
            />
          )}

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Create Subcategory
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ExSubCategoryCreate;
