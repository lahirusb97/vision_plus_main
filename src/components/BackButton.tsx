import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router"; // use react-router-dom for best practice

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      size="small"
      variant="outlined"
      color="primary"
      onClick={() => navigate(-1)}
      startIcon={<ArrowBack />}
      aria-label="Go back"
      sx={{
        textTransform: "none",
        fontWeight: 500,
        borderRadius: 2,
        px: 2,
        py: 0.5,
        boxShadow: "none",
        ":hover": {
          backgroundColor: "#f0f4f8",
        },
      }}
    >
      Back
    </Button>
  );
}
