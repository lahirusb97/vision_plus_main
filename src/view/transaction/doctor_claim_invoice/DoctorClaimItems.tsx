import { TableCell, TableRow } from "@mui/material";
import { DoctorClaimPayload } from "../../../features/invoice/doctorClaimSlice";
import { numberWithCommas } from "../../../utils/numberWithCommas";

interface DoctorClaimPayloadProps {
  invoiceDetail: DoctorClaimPayload | null;
}
export default function DoctorClaimItems({
  invoiceDetail,
}: DoctorClaimPayloadProps) {
  console.log(invoiceDetail);

  return (
    <>
      {invoiceDetail?.invoiceItems.map((item) => (
        <TableRow key={item.id}>
          <TableCell sx={{ textAlign: "left", fontSize: ".9rem" }}>
            {item.details}
          </TableCell>
          <TableCell sx={{ textAlign: "center" }}>{item.quantity}</TableCell>
          <TableCell sx={{ textAlign: "right" }}>
            {numberWithCommas(item.price_per_unit)}
          </TableCell>
          <TableCell sx={{ textAlign: "right" }}>
            {numberWithCommas(item.subtotal)}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
