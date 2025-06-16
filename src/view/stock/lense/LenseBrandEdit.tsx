import React, { useEffect, useState } from "react";
import { Box, TextField, Container, Paper } from "@mui/material";
import axiosClient from "../../../axiosClient";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useAxiosPut } from "../../../hooks/useAxiosPut";
import TitleText from "../../../components/TitleText";
import LoadingAnimation from "../../../components/LoadingAnimation";
import DataLoadingError from "../../../components/common/DataLoadingError";
import SubmitCustomBtn from "../../../components/common/SubmiteCustomBtn";
interface LensBrandFormData {
  name: string;
}
const LenseBrandEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { putHandler, putHandlerloading, putHandlerError } = useAxiosPut();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setErrror] = useState<boolean>(false);
  const [formData, setFormData] = useState<LensBrandFormData>({
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
      setLoading(true);
      setErrror(false);
      try {
        const response = await axiosClient.get(`/brands/${id}/`);
        setFormData(response.data);
        toast.success(`Ready to update lens factory - ${response.data.name}`);
      } catch (error) {
        extractErrorMessage(error);
        setErrror(true);
      } finally {
        setLoading(false);
      }
    };
    fetchLenseType();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await putHandler(`/brands/${id}/`, { ...formData, brand_type: "lens" });

      toast.success("Lense Factory successfully Updated");
      navigate("/stock/add_variation/");
      setFormData({
        name: "",
      });
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  if (loading) {
    return <LoadingAnimation loadingMsg="Loading Lense Factory" />;
  }
  if (!loading && error) {
    return <DataLoadingError />;
  }
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, width: "300px" }}>
        <TitleText title="Update Lense Factory" />
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
          <Box sx={{ mt: 2 }}>
            <SubmitCustomBtn
              btnText="Update Lens Factory"
              loading={putHandlerloading}
              isError={putHandlerError}
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LenseBrandEdit;
