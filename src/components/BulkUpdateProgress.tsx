import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

import toast from "react-hot-toast";
import axiosClient from "../axiosClient";
import { extractErrorMessage } from "../utils/extractErrorMessage";

interface BulkUpdateProgressProps {
  selectedIds: number[];
  onUpdateSuccess?: () => void;
  onClearSelection?: () => void;
}

const progressOptions = [
  { value: "received_from_customer", label: "Received From Customer" },
  { value: "issue_to_factory", label: "Issue to Factory" },
  { value: "received_from_factory", label: "Received from Factory" },
  { value: "issue_to_customer", label: "Issue to Customer" },
];

export const BulkUpdateProgress = ({
  selectedIds,
  onUpdateSuccess,
  onClearSelection,
}: BulkUpdateProgressProps) => {
  const [progressStatus, setProgressStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setProgressStatus(event.target.value as string);
  };

  const handleBulkUpdate = async () => {
    if (!progressStatus) {
      toast.error("Please select a progress status");
      return;
    }

    if (selectedIds.length === 0) {
      toast.error("Please select at least one invoice");
      return;
    }

    setIsUpdating(true);
    try {
      await axiosClient.patch("factory-invoices/bulk-update-status/", {
        ids: selectedIds,
        progress_status: progressStatus,
      });

      toast.success(`Updated ${selectedIds.length} item(s) successfully`);
      setProgressStatus("");
      onUpdateSuccess?.();
      onClearSelection?.();
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 1,
        p: 1,
        gap: 2,
        alignItems: "center",
      }}
    >
      <FormControl size="small" sx={{ minWidth: 250 }}>
        <InputLabel id="bulk-update-progress-label">
          Update Progress To
        </InputLabel>
        <Select
          labelId="bulk-update-progress-label"
          id="bulk-update-progress-select"
          value={progressStatus}
          label="Update Progress To"
          onChange={handleStatusChange}
          disabled={selectedIds.length === 0}
        >
          {progressOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleBulkUpdate}
        disabled={isUpdating || selectedIds.length === 0 || !progressStatus}
        sx={{ minWidth: 150 }}
      >
        {isUpdating ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Update Selected"
        )}
      </Button>

      {selectedIds.length > 0 && (
        <Typography variant="body2" color="text.secondary">
          {selectedIds.length} item(s) selected
        </Typography>
      )}

      {selectedIds.length > 0 && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => onClearSelection?.()}
          disabled={isUpdating}
          color="error"
        >
          Clear Selection
        </Button>
      )}
    </Paper>
  );
};
