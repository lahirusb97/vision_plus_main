import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  IconButton,
  Collapse,
  Typography,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { WarningAmber } from "@mui/icons-material";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
interface ImportantNoticeProps {
  /** Primary notice text */
  notice: string;
  /** Secondary notice text (optional) */
  notice2?: string;
  /** Whether the notice can be dismissed */
  dismissible?: boolean;
  /** Callback when the notice is closed */
  onClose?: () => void;
}

/** Medical-grade alert with built-in \"Go Back Safely\" button */
const ImportantNotice: React.FC<ImportantNoticeProps> = ({
  notice,
  notice2,
  dismissible = false,
  onClose,
}) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  /** Inline custom medical back button */
  const CustomBackButton = ({ onClick }: { onClick: () => void }) => (
    <Button
      onClick={onClick}
      size="small"
      startIcon={<PanToolAltIcon sx={{ fontSize: 16 }} />}
      sx={{
        ml: 1,
        background: (theme) => theme.palette.error.main,
        color: "#fff",
        fontWeight: 700,
        borderRadius: 999,
        textTransform: "none",
        fontSize: 13,
        px: 2,
        py: 0.7,
        minHeight: 28,
        boxShadow: "none",
        "&:hover": {
          background: (theme) => theme.palette.error.dark,
          boxShadow: "none",
        },
        "&:focus-visible": {
          outline: "2px solid #b71c1c",
          outlineOffset: "2px",
        },
      }}
    >
      Click Here To Go Back Safely
    </Button>
  );

  return (
    <Collapse in={open} sx={{ width: "100%" }}>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Alert
          severity="error"
          variant="outlined"
          icon={false}
          action={
            dismissible && (
              <IconButton
                aria-label="close notice"
                size="small"
                onClick={handleClose}
                sx={{ p: 0.5 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )
          }
          sx={{
            mb: 1,
            px: 1.5,
            py: 1,
            borderColor: (theme) => theme.palette.error.main,
            color: (theme) => theme.palette.error.main,
            background: "#FFF6F6",
            minWidth: 0,
            "& .MuiAlert-message": {
              p: 0,
              m: 0,
            },
          }}
          role="alert"
          aria-live="assertive"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 0.5,
              gap: 1,
            }}
          >
            <AlertTitle
              sx={{
                fontWeight: 700,
                color: (theme) => theme.palette.error.main,
                typography: "caption",
                lineHeight: 1.2,
                p: 0,
                m: 0,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <WarningAmber />{" "}
                <span style={{ fontWeight: 700 }}>Medical Alert</span>
              </Box>
            </AlertTitle>
            <CustomBackButton onClick={() => navigate(-1)} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.2 }}>
            <Typography
              variant="caption"
              sx={{
                whiteSpace: "normal",
                overflowWrap: "break-word",
                fontWeight: 500,
                fontSize: 13,
              }}
            >
              {notice}
            </Typography>
            {notice2 && (
              <Typography
                variant="caption"
                sx={{
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                  fontWeight: 500,
                  fontSize: 13,
                }}
              >
                {notice2}
              </Typography>
            )}
          </Box>
        </Alert>
      </motion.div>
    </Collapse>
  );
};

export default ImportantNotice;
