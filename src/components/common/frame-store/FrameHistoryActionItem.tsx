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
  Stack,
} from "@mui/material";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  ArrowUp,
  MinusCircle,
} from "lucide-react";
import { FrameStockHistorySerializer } from "../../../model/Frame";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import useGetSingleFrame from "../../../hooks/lense/useGetSingleFrame";
import { useParams } from "react-router";
import InfoChip from "../../common/InfoChip";
import {
  AddCardOutlined,
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from "@mui/icons-material";

interface Props {
  records: FrameStockHistorySerializer[];
}

const getActionMeta = (action: FrameStockHistorySerializer) => {
  switch (action.action) {
    case "add":
      return {
        icon: <AddCircleOutlineOutlined color="success" />,
        label: "Added",
        color: "success",
      };
    case "remove":
      return {
        icon: <RemoveCircleOutlineOutlined color="error" />,
        label: "Removed",
        color: "error",
      };
    case "transfer":
      const currentBranch = getUserCurentBranch();
      if (currentBranch && action.transfer_to?.id === currentBranch.id) {
        return {
          icon: <AddCircleOutlineOutlined color="success" />,
          label: "Received",
          color: "success",
        };
      }
      return {
        icon: <RemoveCircleOutlineOutlined color="warning" />,
        label: "Sent",
        color: "warning",
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
  const { id } = useParams();
  const { singleFrame, singleFrameLoading, singleFrameError } =
    useGetSingleFrame(id as string);
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardHeader
        title={
          <Typography fontWeight={600}>Frame Inventory History</Typography>
        }
        subheader={
          <Box>
            {!singleFrameLoading && singleFrame && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Audit log of inventory actions performed across branches.
                </Typography>
                <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                  {[
                    { label: "Brand", value: singleFrame?.brand_name },
                    { label: "Code", value: singleFrame?.code_name },
                    { label: "Species", value: singleFrame?.species },
                    { label: "Size", value: singleFrame?.size },
                    { label: "Color", value: singleFrame?.color_name },
                    {
                      label: "Brand Type",
                      value: singleFrame?.brand_type_display,
                    },
                    {
                      label: "Current Quantity",
                      value: singleFrame?.stock[0]?.qty,
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <InfoChip label={item.label} value={item.value} />
                    </div>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
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
                {/* <TableCell>Frame</TableCell> */}
                <TableCell>Qty</TableCell>
                <TableCell>From Branch</TableCell>
                <TableCell>To Branch</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => {
                const meta = getActionMeta(record);
                return (
                  <TableRow key={record.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {meta.icon}
                        <Chip
                          sx={{ my: 1 }}
                          size="small"
                          label={meta.label}
                          color={meta.color as any}
                          variant="outlined"
                        />
                      </Box>
                    </TableCell>
                    {/* <TableCell>
                      <Typography variant="subtitle2">
                        {record.brand} - {record.code}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {record.color} | {record.size} | {record.species}
                      </Typography>
                    </TableCell> */}
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
