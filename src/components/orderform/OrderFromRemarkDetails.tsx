import { Typography } from "@mui/material";
import { Invoice } from "../../model/SingleInvoiceModel";
interface OrderFromRemarkDetailsProps {
  invoiceDetail: Invoice | null;
}
export default function OrderFromRemarkDetails({
  invoiceDetail,
}: OrderFromRemarkDetailsProps) {
  return (
    <div>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        {invoiceDetail?.refraction_details?.refraction_remark &&
          ` Refraction Remark : ${invoiceDetail?.refraction_details.refraction_remark}`}
      </Typography>

      <Typography variant="body2" fontWeight="bold">
        {invoiceDetail?.order_details?.order_remark &&
          ` Invoice Remark : ${invoiceDetail?.order_details?.order_remark}`}
      </Typography>
      <Typography variant="body2" fontWeight="bold">
        {invoiceDetail?.refraction_details?.shuger ? "Shuger " : ""}
      </Typography>
      <Typography variant="body2" fontWeight="bold">
        {invoiceDetail?.refraction_details?.cataract ? "Cataract" : ""}
      </Typography>
    </div>
  );
}
