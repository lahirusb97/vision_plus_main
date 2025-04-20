import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Container, Paper } from "@mui/material";
import axiosClient from "../../../axiosClient";
import { toast } from "react-hot-toast";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import { handleError } from "../../../utils/handleError";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

const ExSubCategoryUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchParams] = useSearchParams();
  const categoryId = queryParams.get("category");
  console.log(categoryId);

  const [formData, setFormData] = useState({
    name: "",
    category: categoryId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const response = await axiosClient.get(`expense-subcategories/${id}/`);
        setFormData({
          name: response.data.name,
          category: response.data.category,
        });
      } catch (error) {
        extractErrorMessage(error);
      }
    };

    if (id) {
      fetchSubcategory();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        main_category: categoryId,
      };
      console.log(payload);

      if (id) {
        // Update existing subcategory
        await axiosClient.put(`expense-subcategories/${id}/`, payload);
        toast.success("Subcategory updated successfully");
      }

      navigate(-1); // Go back to previous page
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

          {!id && categoryId && (
            <TextField
              fullWidth
              label="Category ID"
              name="category"
              value={formData.category}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              helperText="This subcategory will belong to the selected category"
            />
          )}

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              {id ? "Update" : "Create"} Subcategory
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

export default ExSubCategoryUpdate;
