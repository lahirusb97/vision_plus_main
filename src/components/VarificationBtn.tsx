import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

interface VerificationBtnProps {
  btnText: string;
  loading: boolean;
  isVerified: boolean;
}

export default function VerificationBtn({
  btnText,
  loading,
  isVerified,
}: VerificationBtnProps) {
  return (
    <Box sx={{ display: "flex", gap: 1, width: "100%", alignItems: "center" }}>
      {/* Verification Status Box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          backgroundColor: isVerified ? "#4CAF50" : "#D32F2F", // Green for verified, Red for not verified
          color: "white",
          padding: "6px 12px",
          borderRadius: "6px",
          minWidth: "130px",
          fontWeight: 500,
        }}
      >
        {isVerified ? (
          <CheckCircleIcon fontSize="small" />
        ) : (
          <ErrorIcon fontSize="small" />
        )}
        <Typography variant="body2">
          {isVerified ? "Verified" : "Not Verified"}
        </Typography>
      </Box>

      {/* Action Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          textTransform: "none",
          display: "flex",
          gap: 1,
          alignItems: "center",
          height: "40px",
        }}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : btnText}
      </Button>
    </Box>
  );
}
