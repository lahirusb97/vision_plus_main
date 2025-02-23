import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const schema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  userName: yup.string().required("User Name is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  userLevel: yup
    .string()
    .oneOf(["admin", "user", "super-admin"], "Invalid user level")
    .required("User Level is required"),
});

// User Form Component
const UserForm = ({ onUserAdd }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onUserAdd(data);
    reset();
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />

        <TextField
          label="User Name"
          fullWidth
          margin="normal"
          {...register("userName")}
          error={!!errors.userName}
          helperText={errors.userName?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <FormControl fullWidth margin="normal" error={!!errors.userLevel}>
          <InputLabel>User Level</InputLabel>
          <Controller
            name="userLevel"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="super-admin">Super Admin</MenuItem>
              </Select>
            )}
          />
          <Typography color="error" variant="caption">
            {errors.userLevel?.message}
          </Typography>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: "blue" }}
        >
          Add User
        </Button>
      </form>
    </Box>
  );
};

// User Table Component
const UserTable = ({ users, onDelete }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "1000px", maxWidth: 2000, mt: 3, border: "1px solid black" }}
    >
      <Table sx={{ minwidth: 2000 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Full Name</strong>
            </TableCell>
            <TableCell>
              <strong>User Name</strong>
            </TableCell>
            <TableCell>
              <strong>User/Admin</strong>
            </TableCell>
            <TableCell>
              <strong>User Card</strong>
            </TableCell>
            <TableCell>
              <strong>
                <DeleteIcon />
              </strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.user / admin}</TableCell>
              <TableCell>{user.UserCard}</TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => onDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Main Component
const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const handleUserAdd = (user) => {
    setUsers([...users, user]);
  };

  const handleUserDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div>
      <UserForm onUserAdd={handleUserAdd} />
      <UserTable users={users} onDelete={handleUserDelete} />
    </div>
  );
};

export default UserManagement;
