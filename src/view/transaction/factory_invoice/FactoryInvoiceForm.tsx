import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Input,
  Grid,
} from "@mui/material";
import CustomInput from "../../../components/inputui/CustomInput";
import HbRxInput from "../../../components/inputui/HbRxInput";
import { useForm } from "react-hook-form";

const FactoryInvoiceForm = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({
    name: "Mr. Kamal Perera",
    refractionNumber: "2",
    date: "2024-10-15",
    hbRx: "",
    autoRef: "",
    remark: "",
    rightEye: { sph: "", cyl: "", axis: "", near: "" },
    leftEye: { sph: "", cyl: "", axis: "", near: "" },
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3, background: "white" }}>
        {/* Invoice Header */}
        <Box sx={{ p: 2, background: "lightblue", borderRadius: 1, border: "1px solid black" }}>
          <Typography variant="h6" gutterBottom>
            Invoice Information
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              label="Refraction Number"
              name="refractionNumber"
              value={formData.refractionNumber}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>

        <Grid container spacing={2} >
          {/* Row 1: Inputs 1 and 2 */}
          <Grid item xs={12} md={6}>
            <CustomInput
              {...register("hb_rx_right_dist")}
              label="HB Rx"
              placeholder="Enter value"
              type="text"
              error={errors?.hb_rx_right_dist?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomInput
              {...register("hb_rx_left_near")}
              placeholder="Enter value"
              type="text"
              error={errors?.hb_rx_left_near?.message}
            />
          </Grid>

          {/* Row 2: Inputs 3 and 4 */}
          <Grid item xs={12} md={6}>
            <CustomInput
              {...register("hb_rx_left_dist")}
               label="Auto Ref"
              placeholder="Enter value"
              type="text"
              error={errors?.hb_rx_left_dist?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomInput
              {...register("hb_rx_right_near")}
              placeholder="Enter value"
              type="text"
              error={errors?.hb_rx_right_near?.message}
            />
          </Grid>
        </Grid>

        {/* Eye Test Table */}
        <Paper elevation={3} sx={{ padding: "10px", marginY: "10px" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            <Typography sx={{ gridColumn: "span 1" }}></Typography>
            <Typography sx={{ gridColumn: "span 3", bgcolor: "#D7D4E1", textAlign: "center" }}>
              Right Eye
            </Typography>
            <Typography sx={{ gridColumn: "span 3", bgcolor: "#DBD4B5", textAlign: "center" }}>
              Left Eye
            </Typography>

            {/* Labels */}
            <Typography>SPH</Typography>
            <Typography>CYL</Typography>
            <Typography>AXIS</Typography>
            <Typography>SPH</Typography>
            <Typography>CYL</Typography>
            <Typography>AXIS</Typography>

            {/* Right Eye Inputs */}
            <Input
              type="number"
              name="rightEye.sph"
              value={formData.rightEye.sph}
              onChange={handleChange}
              placeholder="SPH"
            />
            <Input
              type="number"
              name="rightEye.cyl"
              value={formData.rightEye.cyl}
              onChange={handleChange}
              placeholder="CYL"
            />
            <Input
              type="number"
              name="rightEye.axis"
              value={formData.rightEye.axis}
              onChange={handleChange}
              placeholder="AXIS"
            />

            {/* Left Eye Inputs */}
            <Input
              type="number"
              name="leftEye.sph"
              value={formData.leftEye.sph}
              onChange={handleChange}
              placeholder="SPH"
            />
            <Input
              type="number"
              name="leftEye.cyl"
              value={formData.leftEye.cyl}
              onChange={handleChange}
              placeholder="CYL"
            />
            <Input
              type="number"
              name="leftEye.axis"
              value={formData.leftEye.axis}
              onChange={handleChange}
              placeholder="AXIS"
            />

            <Typography textAlign="center">Near</Typography>
            {/* Right Eye Near Vision */}
            <Input
              type="number"
              name="rightEye.near"
              value={formData.rightEye.near}
              onChange={handleChange}
              placeholder="Near"
            />
            {/* Empty cells for spacing */}
            <Box></Box>
            <Box></Box>

            {/* Left Eye Near Vision */}
            <Input
              type="number"
              name="leftEye.near"
              value={formData.leftEye.near}
              onChange={handleChange}
              placeholder="Near"
            />
            <Box></Box>
            <Box></Box>
          </Box>
        </Paper>

        {/* Remarks */}
        <Box mt={2}>
          <TextField
            fullWidth
            label="Re-mark"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Buttons */}
        <Box mt={3} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" sx={{ background: "#b08cb8" }}>
            Back
          </Button>
          <Button variant="contained" sx={{ background: "#9a77a1" }} onClick={handleSubmit(onSubmit)}>
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FactoryInvoiceForm;