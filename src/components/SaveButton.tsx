import { Button, CircularProgress } from "@mui/material";

interface SaveButton {
  btnText: string;
  loading: boolean;
}
export default function SaveButton({ btnText, loading }: SaveButton) {
  return (
    <Button type="submit" variant="contained" fullWidth disabled={loading}>
      {loading ? <CircularProgress /> : btnText}
    </Button>
  );
}
