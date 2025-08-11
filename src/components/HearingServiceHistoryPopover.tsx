import React, { useEffect } from "react";
import {
  Popover,
  Box,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useGetHearingServiceHistory from "../hooks/useGetHearingServiceHistory";
import DateRangeIcon from "@mui/icons-material/DateRange";
interface HearingServiceHistoryPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  orderId: number | null;
}

export const HearingServiceHistoryPopover: React.FC<
  HearingServiceHistoryPopoverProps
> = ({ open, anchorEl, onClose, orderId }) => {
  const {
    hearingServiceHistory,
    hearingServiceHistoryLoading,
    hearingServiceHistoryError,
    fetchHearingServiceHistory,
  } = useGetHearingServiceHistory();

  useEffect(() => {
    if (open && orderId !== null) {
      fetchHearingServiceHistory({ order_id: orderId });
    }
  }, [open, orderId]);

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
        Service Progress History
      </Typography>
      {hearingServiceHistoryLoading ? (
        <CircularProgress size={24} />
      ) : hearingServiceHistoryError ? (
        <Typography color="error">Failed to load history.</Typography>
      ) : hearingServiceHistory?.services.length === 0 ? (
        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          No progress history found.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {hearingServiceHistory?.services.map((status, index) => (
            <Box
              key={status.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                p: 1.2,
                borderRadius: 1.5,
                bgcolor: index % 2 === 0 ? "grey.50" : "background.paper",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <DateRangeIcon fontSize="small" color="primary" />
                <Typography variant="body2" fontWeight={500}>
                  Scheduled Service Date:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {status.scheduled_service_date}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <DateRangeIcon fontSize="small" color="success" />
                <Typography variant="body2" fontWeight={500}>
                  Last Serviced Date:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {status.last_service_date}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Popover>
  );
};
