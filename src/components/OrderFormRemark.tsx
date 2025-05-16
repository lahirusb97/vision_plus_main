import { Typography } from "@mui/material";
import {
  ExternalLensOrderItem,
  Invoice,
  OrderItem,
} from "../model/SingleInvoiceModel";
interface InvoiceProps {
  invoiceDetail: Invoice | null;
}
export default function OrderFormRemark({ invoiceDetail }: InvoiceProps) {
  if (!invoiceDetail) {
    return <>No Data</>;
  }

  return (
    <div>
      <Typography variant="body2">
        <strong> Lens Details : </strong>
        {
          invoiceDetail?.order_details?.order_items
            ?.filter((item: OrderItem) => item.lens !== null) // Get only items with a lens
            ?.map((item: OrderItem, index: number) => (
              <span key={index}>
                {item.lens_detail?.type_name || "No Type Available"} {` / `}
                {item.lens_detail?.brand_name || "No Brand Available"} {` / `}
                {item.lens_detail?.coating_name || "No Coating Available"}
              </span>
            ))[0]
        }
        {invoiceDetail?.order_details?.order_items?.filter(
          (item: OrderItem) => item.external_lens !== null
        ).length > 0 &&
          invoiceDetail?.order_details?.order_items?.filter(
            (item: OrderItem) => item.lens !== null
          ).length > 0 &&
          " / "}
        {
          invoiceDetail?.order_details?.order_items
            ?.filter((item: OrderItem) => item.external_lens !== null) // Get only items with a lens
            ?.map((item: ExternalLensOrderItem, index: number) => (
              <span key={index}>
                {item.type_name || "No Type Available"} {` / `}
                {item.brand_name || "No Brand Available"} {` / `}
                {item.coating_name || "No Coating Available"} {` / `}
                {item.note !== null ? item.note : ""}
                {` / `}
              </span>
            ))[0] //! Show only one Lense TYPE,COADING FACTORY
        }
      </Typography>
      <Typography variant="body2">
        {invoiceDetail.order_details?.pd &&
          `PD: ${invoiceDetail.order_details?.pd} / `}
        {invoiceDetail.order_details?.left_pd &&
          `Left-PD: ${invoiceDetail.order_details?.left_pd} / `}
        {invoiceDetail.order_details?.right_pd &&
          `Right-PD: ${invoiceDetail.order_details?.right_pd} / `}
        {invoiceDetail.order_details?.height &&
          `Height: ${invoiceDetail.order_details?.height} / `}
        {invoiceDetail.order_details?.left_height &&
          `Left-H: ${invoiceDetail.order_details?.left_height} / `}
        {invoiceDetail.order_details?.right_height &&
          `Right-H: ${invoiceDetail.order_details?.right_height} / `}
      </Typography>
      <Typography sx={{ textWrap: "break-word" }} variant="body2">
        <strong>Order Remark</strong>
        {invoiceDetail?.order_details?.order_remark &&
          ` : ${invoiceDetail?.order_details?.order_remark}`}
      </Typography>
      <Typography variant="body2">
        <strong> Frame Details : </strong>

        {/* <strong>Details:</strong> {typeName}/ Lens Coating / Lens Brand / Frame */}
        {invoiceDetail?.order_details?.order_items
          ?.filter((item: OrderItem) => item.frame !== null) // Get only items with a lens
          ?.map((item: OrderItem, index: number) => (
            <span key={index}>
              {item.frame_detail?.brand_name || "No Type Available"} {` / `}
              {item.frame_detail?.code_name || "No Brand Available"} {` / `}
              {item.frame_detail?.color_name || "No Brand Available"} {` / `}
              {item.frame_detail?.species || "No Brand Available"} {` / `}
              {item.frame_detail?.size || "No Coating Available"} {` / `}
            </span>
          ))}
      </Typography>
    </div>
  );
}
