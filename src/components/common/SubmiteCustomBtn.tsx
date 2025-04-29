import { Button, CircularProgress } from "@mui/material";

interface SubmitCustomBtnProps {
  isError: boolean;
  btnText: string;
  loading: boolean;
}

export default function SubmitCustomBtn({
  btnText,
  isError,
  loading,
}: SubmitCustomBtnProps) {
  // Dynamic button text

  return (
    <Button
      fullWidth
      sx={{ my: 1 }}
      type="submit"
      variant="contained"
      color={isError ? "error" : "primary"}
      disabled={loading}
      startIcon={
        loading ? <CircularProgress color="inherit" size={20} /> : null
      }
    >
      {loading ? "saving..." : isError ? "Retry" : btnText}
    </Button>
  );
}
