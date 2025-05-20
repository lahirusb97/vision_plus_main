import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  useTheme,
  Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { motion } from "framer-motion";
import { useReminderDialog } from "../../context/ReminderDialogContext";

const ReminderDialog: React.FC = () => {
  const theme = useTheme();
  const { isOpen, closeReminder, closeReminderAndGoBack } = useReminderDialog();
  return (
    <Dialog
      open={isOpen}
      onClose={closeReminder}
      aria-labelledby="reminder-dialog-title"
      aria-describedby="reminder-dialog-desc"
      fullWidth
      maxWidth="xs"
      sx={{ zIndex: 2000 }}
      slotProps={{
        backdrop: {
          style: {
            background: "rgba(39, 24, 3, 0.64)",
            backdropFilter: "blur(3px)",
          },
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <DialogTitle
          id="reminder-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            fontWeight: 700,
            color: theme.palette.warning.main,
            fontSize: 18,
            pb: 0.5,
          }}
        >
          <motion.span
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ display: "inline-block" }}
          >
            <WarningAmberIcon color="warning" sx={{ fontSize: 30 }} />
          </motion.span>
          Reminder
        </DialogTitle>
        <DialogContent
          dividers={false}
          sx={{
            bgcolor: "rgba(253, 242, 242, 0.64)",
            pt: 2,
            pb: 1.5,
          }}
        >
          <Box
            sx={{
              bgcolor: "#fff7c0",
              borderRadius: 1.5,
              borderLeft: "5px solid #fbc02d",
              px: 1.5,
              py: 1,
              mb: 1.5,
              color: "#664d03",
              fontWeight: 500,
            }}
          >
            <Typography
              variant="body2"
              component="span"
              sx={{ fontWeight: 700 }}
            >
              Important:&nbsp;
            </Typography>
            <Typography variant="body2" component="span">
              If you accidentally change or delete data, please{" "}
              <strong>
                refresh the page (<kbd>F5</kbd>)
              </strong>{" "}
              to reset everything this work only if you didn't press the save
              button.
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ mt: 0.5, fontWeight: 500, color: "#664d03" }}
            >
              For best accuracy, <strong>avoid</strong>:
              <ul
                style={{ margin: "4px 0 0 18px", padding: 0, fontWeight: 400 }}
              >
                <li>
                  <strong>avoid</strong> Using your browser’s back or forward
                  buttons
                </li>
                <li>
                  <strong>avoid</strong> Navigating away and then returning to
                  this page
                </li>
              </ul>
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "#ffe1e1",
              borderRadius: 1.5,
              borderLeft: "5px solid #d32f2f",
              px: 1.5,
              py: 1,
              color: "#781a1a",
              fontWeight: 500,
              mb: 1.5,
            }}
          >
            <Typography variant="body2" sx={{ color: "#b71c1c" }}>
              <strong>Warning</strong>: Changes made in this section will affect{" "}
              <strong>patients records, invoices, and payment data</strong>.
              These edits are permanent and cannot be undone. Please review all
              details carefully before saving.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0.5, gap: 2 }}>
          <Button
            onClick={closeReminder}
            color="primary"
            variant="contained"
            sx={{
              borderRadius: 99,
              fontWeight: 700,
              minWidth: 120,
              textTransform: "none",
              fontSize: 15,
              px: 2.5,
              "&:hover": { boxShadow: "none" },
            }}
            autoFocus
          >
            Confirm and Proceed
          </Button>
          <Button
            onClick={closeReminderAndGoBack}
            color="warning"
            variant="outlined"
            sx={{
              borderRadius: 99,
              fontWeight: 600,
              minWidth: 120,
              textTransform: "none",
              fontSize: 15,
              px: 2,
              borderWidth: 2,
              borderColor: (theme) => theme.palette.warning.main,
              "&:hover": {
                borderColor: (theme) => theme.palette.warning.dark,
                background: "#fff9e6",
              },
            }}
          >
            Cancel and Go Back
          </Button>
        </DialogActions>
      </motion.div>
    </Dialog>
  );
};

export default ReminderDialog;
