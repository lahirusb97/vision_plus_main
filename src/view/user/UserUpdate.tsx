import { zodResolver } from "@hookform/resolvers/zod";
import { schemaUser, UserFormModel } from "../../validations/schemaUser";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useGetBranch } from "../../hooks/useGetBranch";

import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import { useState } from "react";
import { useParams } from "react-router";
import SaveButton from "../../components/SaveButton";
import { useAxiosPut } from "../../hooks/useAxiosPut";

export default function UserUpdate() {
  const { user_id } = useParams();
  const { putHandler, putHandlerloading } = useAxiosPut();
  const [userRole, setUserRole] = useState("");

  const {
    register,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormModel>({
    resolver: zodResolver(schemaUser),
  });
  const { brancheData } = useGetBranch();

  const onSubmit = async (data: UserFormModel) => {
    console.log(data);

    try {
      await putHandler(`users/update/${user_id}/`, data);

      toast.success(`Employee ${data.first_name} updated successfully`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          minWidth: 500,
          mx: "auto",
          p: 1,
          boxShadow: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Update Employee Profile
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Acess Level</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userRole}
            label="Acess Level"
            onChange={(e) => {
              setUserRole(e.target.value);
              if (e.target.value === "admin") {
                if (brancheData) {
                  setValue("branch_ids", [brancheData[0].id]);
                }
              } else {
                setValue("branch_ids", []);
              }
            }}
          >
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"admin"}>Manager</MenuItem>
          </Select>
        </FormControl>
        <TextField
          size="small"
          label="First Name"
          fullWidth
          {...register("first_name")}
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
        />

        <TextField
          size="small"
          label="Last Name"
          fullWidth
          {...register("last_name")}
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
        />
        <TextField
          size="small"
          label="Username"
          fullWidth
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          size="small"
          label="Email"
          fullWidth
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          size="small"
          label="Password"
          type="password"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          size="small"
          label="User Code"
          fullWidth
          {...register("user_code")}
        />

        <TextField
          size="small"
          label="Mobile"
          fullWidth
          {...register("mobile")}
          error={!!errors.mobile}
          helperText={errors.mobile?.message}
        />

        <Typography m={0} variant="h6" gutterBottom>
          {userRole === "user" && "Branch Acess Permission"}
        </Typography>
        <Box>
          {userRole === "user" &&
            brancheData?.map((branch) => (
              <Controller
                key={branch.id}
                name="branch_ids"
                control={control}
                render={() => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={watch("branch_ids", []).includes(branch.id)}
                        onChange={(e) =>
                          setValue(
                            "branch_ids",
                            e.target.checked
                              ? [...watch("branch_ids", []), branch.id]
                              : watch("branch_ids", []).filter(
                                  (id) => id !== branch.id
                                )
                          )
                        }
                      />
                    }
                    label={branch.branch_name}
                  />
                )}
              />
            ))}
        </Box>
        <Typography color="error" variant="body2" gutterBottom>
          {errors.branch_ids && errors.branch_ids?.message}
        </Typography>
        <SaveButton btnText="Save" loading={putHandlerloading} />
      </Box>
    </div>
  );
}
