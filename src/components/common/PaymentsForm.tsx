import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
} from "@mui/material";
import {
  TextField,
  IconButton,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDateTimeByType } from "../../utils/formatDateTimeByType";

const paymentMethodOptions = [
  { value: "cash", label: "Cash" },
  { value: "credit_card", label: "Credit Card" },
  { value: "online_transfer", label: "Online Transfer" },
];

export default function PaymentsForm() {
  const { control, watch, register } = useFormContext();
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(
    null
  );
  const handleConfirmDelete = () => {
    if (pendingDeleteIndex !== null) {
      remove(pendingDeleteIndex);
      setPendingDeleteIndex(null);
    }
  };
  const handleCancelDelete = () => setPendingDeleteIndex(null);
  const { fields, remove } = useFieldArray({
    control,
    name: "payments",
  });

  return (
    <Box>
      {fields.map((field, index) => (
        <Box key={field.id} display="flex" gap={2} alignItems="center" mb={2}>
          <Typography variant="body2">
            Date -{" "}
            {formatDateTimeByType(
              watch(`payments.${index}.payment_date`),
              "both"
            )}
          </Typography>

          <TextField
            type="number"
            label="Amount"
            variant="outlined"
            size="small"
            {...register(`payments.${index}.amount`, { valueAsNumber: true })}
          />

          <Controller
            control={control}
            name={`payments.${index}.payment_method`}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ width: "200px" }}
                select
                label="Payment Method"
                variant="outlined"
                size="small"
              >
                {paymentMethodOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <IconButton
            color="error"
            onClick={() => setPendingDeleteIndex(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      {/* Confirmation Dialog */}
      <Dialog open={pendingDeleteIndex !== null} onClose={handleCancelDelete}>
        <DialogTitle>Are you sure you want to delete this payment?</DialogTitle>
        <DialogContent>
          <Typography
            variant="caption"
            sx={{ mt: 1, fontWeight: "bold" }}
            color="error"
          >
            Please note: Deleting this payment will remove it from the invoice
            permently and cannot be recovered.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Button
        type="button"
        startIcon={<AddIcon />}
        onClick={() => append({ amount: 0, payment_method: "cash" })}
        variant="outlined"
        sx={{ mb: 2 }}
      >
        Add Payment
      </Button> */}
    </Box>
  );
}
