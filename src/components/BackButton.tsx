import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={() => navigate(-1)}
      >
        <ArrowBack /> Back
      </Button>
    </div>
  );
}
