import { Button } from "@mui/material";
import { useNavigate } from "react-router";
export default function BankDeposite() {
  const navigation = useNavigate();
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigation("create/");
        }}
      >
        Make a Deposite
      </Button>
    </div>
  );
}
