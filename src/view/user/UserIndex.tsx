import useGetUsers from "../../hooks/useGetUsers";
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
export default function UserIndex() {
  const navigate = useNavigate();
  const { users, usersLoading } = useGetUsers();
  const handleEdit = (id: number) => {
    navigate(`${id}/edit/`);
  };
  return (
    <Box>
      <TableContainer sx={{ p: 1 }} component={Paper}>
        <Typography variant="h4">Users</Typography>

        <Table size="small" sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersLoading ? (
              <TableRow>
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
              users?.map((row) => (
                <TableRow
                  key={row.user}
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
                      onClick={() => handleEdit(row.user)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {row.user_username}
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
