import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

import useGetOrderAuditHistory from "../hooks/useGetOrderAuditHistory";
import { formatDateTimeByType } from "../utils/formatDateTimeByType";

import { AuditFrameItem } from "./AufitFrameItem";
import { AufitLensItem } from "./AufitLensItem";
import { AufitExternalLensItem } from "./AufitExternalLensItem";
import { AuditPaymentItem } from "./AuditPaymentItem";
import { formatSqlKey } from "../utils/formatLabel";
import { numberWithCommas } from "../utils/numberWithCommas";

interface Props {
  open: boolean;
  onClose: () => void;
  orderId: number | null;
}

const convertNullEmtyString = (value: string | null) => {
  return value === null || value === "" ? " Empty " : value;
};
// Converts boolean flags to readable medical tags
const formatMedicalFlags = (field: string, value: any): string => {
  if (field === "cataract" || field === "blepharitis" || field === "shuger") {
    return value === "true" || value === true
      ? `Yes ${formatSqlKey(field)}`
      : `No ${formatSqlKey(field)}`;
  }
  return value;
};

const isCurrencyField = (field: string) =>
  ["discount", "total_price", "sub_total"].includes(field);

const isMedicalFlag = (field: string) =>
  ["cataract", "blepharitis", "shuger"].includes(field);

const isPrescriptionField = (field: string) => field === "prescription_type";

export default function OrderAuditDialog({ open, onClose, orderId }: Props) {
  const { orderAuditHistoryList, orderAuditHistoryLoading } =
    useGetOrderAuditHistory(open ? orderId : null);
  console.log(orderAuditHistoryList);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Order Audit - #{orderAuditHistoryList?.invoice_number}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {orderAuditHistoryLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">
                  Order Changes
                  {orderAuditHistoryList?.order_logs?.length ? (
                    <span>({orderAuditHistoryList?.order_logs?.length})</span>
                  ) : (
                    <span>(0)</span>
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {orderAuditHistoryList?.order_logs?.length ? (
                  orderAuditHistoryList.order_logs.map((log) => (
                    <Box
                      key={log.id}
                      sx={{
                        mb: 0.5,
                        px: 1,
                        py: 0.5,
                        borderLeft: "2px solid #1976d2",
                        backgroundColor: "#fafafa",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        {formatSqlKey(log.field_name)}:
                        <Box component="span" sx={{ ml: 0.5, color: "#888" }}>
                          {["discount", "total_price", "sub_total"].includes(
                            log.field_name
                          )
                            ? numberWithCommas(
                                convertNullEmtyString(log.old_value)
                              )
                            : convertNullEmtyString(log.old_value)}
                        </Box>
                        {" → "}
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          {["discount", "total_price", "sub_total"].includes(
                            log.field_name
                          )
                            ? numberWithCommas(
                                convertNullEmtyString(log.new_value)
                              )
                            : convertNullEmtyString(log.new_value)}
                        </Box>
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.25 }}
                      >
                        {formatDateTimeByType(log.created_at, "both")}
                        {log.admin_name && ` / Admin: ${log.admin_name}`}
                        {log.user_name && ` / User: ${log.user_name}`}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No field changes tracked.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">
                  Refraction Changes
                  {orderAuditHistoryList.refraction_logs?.length ? (
                    <span>
                      {" "}
                      ({orderAuditHistoryList.refraction_logs.length})
                    </span>
                  ) : (
                    <span> (0)</span>
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {orderAuditHistoryList.refraction_logs?.length ? (
                  orderAuditHistoryList.refraction_logs.map((log) => {
                    const oldVal = convertNullEmtyString(log.old_value);
                    const newVal = convertNullEmtyString(log.new_value);

                    const formattedOld = isCurrencyField(log.field_name)
                      ? numberWithCommas(oldVal)
                      : isMedicalFlag(log.field_name)
                      ? formatMedicalFlags(log.field_name, oldVal)
                      : isPrescriptionField(log.field_name)
                      ? formatSqlKey(oldVal)
                      : oldVal;

                    const formattedNew = isCurrencyField(log.field_name)
                      ? numberWithCommas(newVal)
                      : isMedicalFlag(log.field_name)
                      ? formatMedicalFlags(log.field_name, newVal)
                      : isPrescriptionField(log.field_name)
                      ? formatSqlKey(newVal)
                      : newVal;

                    return (
                      <Box
                        key={log.id}
                        sx={{
                          mb: 0.5,
                          px: 1,
                          py: 0.5,
                          borderLeft: "2px solid #1976d2",
                          backgroundColor: "#fafafa",
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2" fontWeight={600}>
                          {formatSqlKey(log.field_name)}:{" "}
                          <Box component="span" sx={{ color: "#888", ml: 0.5 }}>
                            {formattedOld}
                          </Box>{" "}
                          →{" "}
                          <Box component="span" sx={{ fontWeight: 700 }}>
                            {formattedNew}
                          </Box>
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 0.25 }}
                        >
                          {formatDateTimeByType(log.created_at, "both")}
                          {log.admin_name && ` / Admin: ${log.admin_name}`}
                          {log.user_name && ` / User: ${log.user_name}`}
                        </Typography>
                      </Box>
                    );
                  })
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No field changes tracked.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">
                  Order Items Changes
                  {orderAuditHistoryList?.order_items.length ? (
                    <span>({orderAuditHistoryList?.order_items.length})</span>
                  ) : (
                    <span>(0)</span>
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {orderAuditHistoryList?.order_items.length ? (
                  <>
                    <AuditFrameItem
                      order_items={orderAuditHistoryList.order_items}
                    />
                    <AufitLensItem
                      order_items={orderAuditHistoryList.order_items}
                    />
                    <AufitExternalLensItem
                      order_items={orderAuditHistoryList.order_items}
                    />
                  </>
                ) : (
                  <Typography>No deleted items.</Typography>
                )}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">
                  Payments Changes
                  {orderAuditHistoryList?.order_payments.length ? (
                    <span>
                      ({orderAuditHistoryList?.order_payments.length})
                    </span>
                  ) : (
                    <span>(0)</span>
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {orderAuditHistoryList?.order_payments.length ? (
                  orderAuditHistoryList.order_payments.map((p) => (
                    <AuditPaymentItem
                      order_payments={orderAuditHistoryList.order_payments}
                    />
                  ))
                ) : (
                  <Typography>No deleted payments.</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
