import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import { ArrowDown, ArrowRightLeft, ArrowUp } from "lucide-react";
import { FrameStockHistorySerializer } from "../../../model/Frame";

interface Props {
  records: FrameStockHistorySerializer[];
}

const getActionMeta = (action: string) => {
  switch (action) {
    case "add":
      return {
        icon: <ArrowUp size={16} className="text-green-600" />,
        label: "Added",
        color: "success",
      };
    case "remove":
      return {
        icon: <ArrowDown size={16} className="text-red-600" />,
        label: "Removed",
        color: "error",
      };
    case "transfer":
      return {
        icon: <ArrowRightLeft size={16} className="text-blue-600" />,
        label: "Transferred",
        color: "info",
      };
    default:
      return {
        icon: null,
        label: "Unknown",
        color: "default",
      };
  }
};

export default function FrameHistoryActionItem({ records }: Props) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={600}>
            Frame Inventory History
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            Audit log of inventory actions performed across branches.
          </Typography>
        }
      />
      <Divider />
      <CardContent sx={{ overflowX: "auto" }}>
        {records.length === 0 ? (
          <Box py={4} textAlign="center">
            <Typography variant="body1" color="text.secondary">
              No records found.
            </Typography>
          </Box>
        ) : (
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Frame</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>From Branch</TableCell>
                <TableCell>To Branch</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => {
                const meta = getActionMeta(record.action);
                return (
                  <TableRow key={record.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {meta.icon}
                        <Chip
                          size="small"
                          label={meta.label}
                          color={meta.color as any}
                          variant="outlined"
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {record.brand} - {record.code}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {record.color} | {record.size} | {record.species}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {record.quantity_changed}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {record.branch.branch_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {record.transfer_to?.branch_name ?? "—"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(record.timestamp).toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
