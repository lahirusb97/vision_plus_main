import React from "react";
import { Typography } from "@mui/material";
import { Invoice, OrderItem } from "../model/SingleInvoiceModel";
import { CheckBox, Close } from "@mui/icons-material";
interface InvoiceProps {
  invoiceDetail: Invoice;
}
export default function OrderFormRemark({ invoiceDetail }: InvoiceProps) {
  if (!invoiceDetail) {
    return <>No Data</>;
  }

  return (
    <div>
      <Typography variant="body2">
        <strong> Details: </strong>
        {invoiceDetail?.order_details?.order_items
          ?.filter((item: OrderItem) => item.lens !== null) // Get only items with a lens
          ?.map((item: OrderItem, index: number) => (
            <span key={index}>
              {item.lens_detail?.type_name || "No Type Available"} {` / `}
              {item.lens_detail?.brand_name || "No Brand Available"} {` / `}
              {item.lens_detail?.coating_name || "No Coating Available"}
              {` / `}
            </span>
          ))}
        {/* <strong>Details:</strong> {typeName}/ Lens Coating / Lens Brand / Frame */}
        {invoiceDetail?.order_details?.order_items
          ?.filter((item: OrderItem) => item.frame !== null) // Get only items with a lens
          ?.map((item: OrderItem, index: number) => (
            <span key={index}>
              {item.frame_detail?.brand_name || "No Type Available"} {` / `}
              {item.frame_detail?.code_name || "No Brand Available"} {` / `}
              {item.frame_detail?.size || "No Coating Available"} {` / `}
            </span>
          ))}
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
      <Typography variant="body2">
        Shuger :{" "}
        {invoiceDetail.refraction_details?.shuger
          ? "Shuger Avilable "
          : "No Shuger"}
      </Typography>
      <Typography variant="body2">
        Cataract :{" "}
        {invoiceDetail.refraction_details?.cataract
          ? "Cataract Avilable "
          : "No Cataract"}
      </Typography>
    </div>
  );
}
