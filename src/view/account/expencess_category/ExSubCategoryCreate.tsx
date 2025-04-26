import React, { useState } from "react";
import { Box, TextField, Container, Paper } from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import SaveButton from "../../../components/SaveButton";
import TitleText from "../../../components/TitleText";

const ExSubCategoryCreate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const { postHandler, postHandlerloading } = useAxiosPost();
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

      await postHandler("/expense-subcategories/", payload);
      toast.success("Subcategory created successfully");
      navigate(-1);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Container sx={{ width: 500, mt: 1 }}>
      <Paper sx={{ p: 4 }}>
        <TitleText title="Create New Sub Category" />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Sub Category Name"
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
            <SaveButton
              btnText="Create Sub Category"
              loading={postHandlerloading}
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ExSubCategoryCreate;
