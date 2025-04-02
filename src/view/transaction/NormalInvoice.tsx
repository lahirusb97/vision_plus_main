import { ChangeEvent, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddBox";
import NormalPatientDetail from "./normal_order/NormalPatientDetail";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaPatientFormModel } from "../../validations/schemaPartient";
import { FormProvider, useForm } from "react-hook-form";

const data = [
  {
    name: "Premium Lens Cleaner 1",
    price: "15.99",
  },
  {
    name: "Premium Lens Cleaner 2",
    price: "15.99",
  },
  {
    name: "Premium Lens Cleaner 3",
    price: "15.99",
  },
];

const TransactionUI = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    salesCode: "",
    selectedItem: "",
    selectedPrice: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedName = event.target.value;
    const item = data.find((item) => item.name === selectedName);

    setFormData((prevData) => ({
      ...prevData,
      selectedItem: selectedName,
      selectedPrice: item ? item.price : "",
    }));
  };
  const methods = useForm({
    resolver: zodResolver(schemaPatientFormModel),
  });
  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 2000,
        margin: "0 auto",
        borderRadius: 2,
      }}
    >
      {/* Row 1: Name, Phone No, Address, Sales Staff Code */}
      <FormProvider {...methods}>
        <NormalPatientDetail
          prescription={""}
          refractionDetailLoading={false}
          refractionNumber={""}
        />
      </FormProvider>

      {/* Row 2: Lens Cleaner Dropdown and Price */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 2,
          marginLeft: 4,
          marginRight: 4,
        }}
      >
        <TextField
          select
          label="Lens Cleaner"
          name="selectedItem"
          fullWidth
          sx={{ flex: 1 }}
          value={formData.selectedItem}
          onChange={handleSelectChange}
        >
          {data.map((item, index) => (
            <MenuItem key={index} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Price"
          name="selectedPrice"
          value={formData.selectedPrice}
          onChange={handleInputChange}
          fullWidth
          sx={{ flex: 1 }}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          size="large"
          aria-label="add"
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Row 3: Full Amount, Discount, First Payment, Balance */}
      <Box
        sx={{
          padding: 4,
          maxWidth: 2000,
          margin: "0 auto",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            width: "1000px",
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Full Amount</Typography>
          <TextField
            type="number"
            value="1000"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            variant="standard"
            sx={{ textAlign: "right", maxWidth: 150 }}
          />
        </Paper>

        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Discount</Typography>
          <TextField
            type="number"
            value="1000"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            variant="standard"
            sx={{ textAlign: "right", maxWidth: 150 }}
          />
        </Paper>

        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>First Payment</Typography>
          <TextField
            type="number"
            value="1000"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            variant="standard"
            sx={{ textAlign: "right", maxWidth: 150 }}
          />
        </Paper>

        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography sx={{ fontSize: 16 }}>Balance</Typography>
          <TextField
            type="number"
            value="1000"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            variant="standard"
            sx={{ textAlign: "right", maxWidth: 150 }}
          />
        </Paper>
      </Box>

      {/* Save Button */}
      <Box
        sx={{ display: "flex", justifyContent: "right", marginRight: "30px" }}
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{ backgroundColor: "#D4B4DC" }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionUI;
