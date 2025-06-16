import { IconButton } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function InvoicePreviewBtn({
  invoice_number,
}: {
  invoice_number: string;
}) {
  return (
    <div>
      <a
        href={`/transaction/invoice/view/${invoice_number}/?invoice_number=${invoice_number}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }} // Optional: keep icon color
      >
        <IconButton size="small" sx={{ p: 0 }} color="inherit">
          <AssignmentIcon fontSize="small" />
        </IconButton>
      </a>
    </div>
  );
}
