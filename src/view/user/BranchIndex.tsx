import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  IconButton,
  Skeleton,
  TableContainer,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router";
import useGetBranches from "../../hooks/useGetBranches";
export default function BranchIndex() {
  const navigate = useNavigate();
  const { branches, branchesLoading } = useGetBranches();
  const handleEdit = (id: number) => {
    navigate(`${id}/update/`);
  };
  return (
    <Box>
      <TableContainer sx={{ p: 1 }} component={Paper}>
        <Typography variant="h4">Branches</Typography>

        <Table size="small" sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Branch </TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branchesLoading ? (
              <TableRow>
                <TableCell>
                  {" "}
                  <Skeleton width={50} />
                </TableCell>
                <TableCell>
                  {" "}
                  <Skeleton width={50} />
                </TableCell>
                <TableCell>
                  {" "}
                  <Skeleton width={50} />
                </TableCell>
              </TableRow>
            ) : (
              branches?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {/* <IconButton
                    color="info"
                    title="History"
                    onClick={() => handleHistory(row.item.id)}
                  >
                    <History />
                  </IconButton> */}
                    <IconButton
                      size="small"
                      color="warning"
                      title="Edit"
                      onClick={() => handleEdit(row.id)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {row.branch_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.location}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
