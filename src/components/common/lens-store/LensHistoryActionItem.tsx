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
import { LensStockHistorySerializer } from "../../../model/Lens";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import { useParams } from "react-router";
import InfoChip from "../InfoChip";
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from "@mui/icons-material";
import useGetSingleLense from "../../../hooks/lense/useGetSingleLense";

interface Props {
  records: LensStockHistorySerializer[];
}

const getActionMeta = (action: LensStockHistorySerializer) => {
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

export default function LensHistoryActionItem({ records }: Props) {
  const { id } = useParams();
  const { singleLense, singleLenseError, singleLenseLoading } =
    useGetSingleLense(id as string);
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardHeader
        title={<Typography fontWeight={600}>Lens Inventory History</Typography>}
        subheader={
          <Box>
            {!singleLenseLoading && singleLense && (
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
                    { label: "Brand", value: singleLense?.brand_name },
                    { label: "Type", value: singleLense?.type_name },
                    { label: "Coating", value: singleLense?.coating_name },
                    { label: "Price", value: singleLense?.price },
                    
                   
                  ].map((item) => (
                    <div key={item.label}>
                      <InfoChip label={item.label} value={item.value} />
                    </div>
                  ))}
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                  Powers
                </Typography>
                <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                  {singleLense?.powers.map((item) => (
                    <div key={item.id}>
                      <InfoChip label={item.power_name} value={item.value} />
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
