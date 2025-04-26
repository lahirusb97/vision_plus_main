import { Button, Typography, Paper } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const DataLoadingError = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "40vh",
        minWidth: "50vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" color="error" gutterBottom>
        Failed to load data.
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Something went wrong while loading the data. Please try again.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<RefreshIcon />}
        onClick={handleRetry}
      >
        Try Again
      </Button>
    </Paper>
  );
};

export default DataLoadingError;
