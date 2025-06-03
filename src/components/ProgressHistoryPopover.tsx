import React, { useEffect } from "react";
import {
  Popover,
  Box,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatDateTimeByType } from "../utils/formatDateTimeByType";
import { progressStatus as formatProgressStatus } from "../utils/progressState";
import useGetProgressStatusList from "../hooks/useGetProgressStatusList";

interface ProgressHistoryPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  orderId: number | null;
}

export const ProgressHistoryPopover: React.FC<ProgressHistoryPopoverProps> = ({
  open,
  anchorEl,
  onClose,
  orderId,
}) => {
  const {
    progressStatusList,
    progressStatusListLoading,
    progressStatusListError,
    fetchProgressStatus,
  } = useGetProgressStatusList();

  useEffect(() => {
    if (open && orderId !== null) {
      fetchProgressStatus(orderId);
    }
  }, [open, orderId, fetchProgressStatus]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        sx: { p: 2, minWidth: 300, maxWidth: 360, position: "relative" },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          zIndex: 1,
          color: "grey.600",
        }}
        aria-label="Close"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, pr: 3 /* space for close btn */ }}
      >
        Order Progress History
      </Typography>
      {progressStatusListLoading ? (
        <CircularProgress size={24} />
      ) : progressStatusListError ? (
        <Typography color="error">Failed to load history.</Typography>
      ) : progressStatusList.length === 0 ? (
        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          No progress history found.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {progressStatusList.map((status) => (
            <Box
              key={status.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderBottom: "1px solid #eee",
                pb: 1,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {formatProgressStatus(status.progress_status)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDateTimeByType(status.changed_at, "both")}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Popover>
  );
};
