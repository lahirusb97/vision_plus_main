import React, { useState } from "react";
import { Box, TextField, Container, Paper } from "@mui/material";
import { toast } from "react-hot-toast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import SaveButton from "../../../components/SaveButton";
import TitleText from "../../../components/TitleText";
import BackButton from "../../../components/BackButton";
const ExCategoryCreate = () => {
  const { postHandler, postHandlerloading } = useAxiosPost();
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
      await postHandler("expense-categories/", {
        ...formData,
      });
      toast.success("Expence Category Added successfully");

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
        <BackButton />
        <TitleText title="Create New Expence Category" />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Expence category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box sx={{ mt: 2 }}>
            <SaveButton
              btnText="Create Expance category"
              loading={postHandlerloading}
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ExCategoryCreate;
