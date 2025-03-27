import { zodResolver } from "@hookform/resolvers/zod";
import { schemaUser, UserFormModel } from "../../validations/schemaUser";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  // InputLabel,
  // Select,
  // MenuItem,
  // FormControl,
} from "@mui/material";

import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useParams } from "react-router";
import SaveButton from "../../components/SaveButton";
import { useAxiosPut } from "../../hooks/useAxiosPut";
import LoadingAnimation from "../../components/LoadingAnimation";
import useGetSingleBranch from "../../hooks/useGetSingleBranch";
import { schemaBranch } from "../../validations/schemaBranch";
import { BranchModel } from "../../model/BranchModel";

export default function UserUpdate() {
  const { branch_id } = useParams();
  const { putHandler, putHandlerloading } = useAxiosPut();
  // const [userRole, setUserRole] = useState("");
  const { singleBranch, singleBranchLoading } = useGetSingleBranch(branch_id);

  const {
    register,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BranchModel>({
    resolver: zodResolver(schemaBranch),
  });

  const onSubmit = async (data: BranchModel) => {
    console.log(data);

    try {
      await putHandler(`branches/update/${branch_id}/`, data);

      toast.success(`Employee ${data.branch_name} updated successfully`);
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  useEffect(() => {
    if (singleBranch) {
      Object.entries(singleBranch).forEach(([key, value]) => {
        if (schemaBranch.shape[key as keyof BranchModel]) {
          setValue(key as keyof BranchModel, value);
        }
      });
    }
  }, [singleBranch, setValue]); // Runs when singleuser changes

  if (singleBranchLoading) {
    return <LoadingAnimation loadingMsg="Loading Branch Data" />;
  }
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
          Update Branch
        </Typography>
        {/* <FormControl fullWidth>
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
        </FormControl> */}
        <TextField
          size="small"
          label="First Name"
          fullWidth
          {...register("branch_name")}
          error={!!errors.branch_name}
          helperText={errors.branch_name?.message}
          InputLabelProps={{
            shrink: Boolean(watch("branch_name")),
          }}
        />

        <TextField
          size="small"
          label="Last Name"
          fullWidth
          {...register("location")}
          error={!!errors.location}
          helperText={errors.location?.message}
          InputLabelProps={{
            shrink: Boolean(watch("location")),
          }}
        />

        <SaveButton btnText="Save" loading={putHandlerloading} />
      </Box>
    </div>
  );
}
