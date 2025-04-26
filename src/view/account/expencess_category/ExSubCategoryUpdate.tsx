import React, { useEffect, useState } from "react";
import { Box, TextField, Container, Paper } from "@mui/material";
import axiosClient from "../../../axiosClient";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import SaveButton from "../../../components/SaveButton";
import { useAxiosPut } from "../../../hooks/useAxiosPut";

const ExSubCategoryUpdate = () => {
  const navigate = useNavigate();
  const { sub_cat_id } = useParams();
  const { putHandler, putHandlerloading } = useAxiosPut();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");

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
        const response = await axiosClient.get(
          `expense-subcategories/${sub_cat_id}/`
        );
        setFormData({
          name: response.data.name,
          category: response.data.category,
        });
      } catch (error) {
        extractErrorMessage(error);
      }
    };

    if (sub_cat_id) {
      fetchSubcategory();
    }
  }, [sub_cat_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        main_category: categoryId,
      };

      if (sub_cat_id) {
        // Update existing subcategory
        await putHandler(`expense-subcategories/${sub_cat_id}/`, payload);
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

          {!sub_cat_id && categoryId && (
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
            <SaveButton
              btnText="Update Sub Category"
              loading={putHandlerloading}
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ExSubCategoryUpdate;
