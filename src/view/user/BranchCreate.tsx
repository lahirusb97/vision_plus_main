import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BranchFormModel, schemaBranch } from "../../validations/schemaBranch";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import toast from "react-hot-toast";
export default function BranchCreate() {
  const { postHandlerloading, postHandler } = useAxiosPost();
  const { register, handleSubmit } = useForm<BranchFormModel>({
    resolver: zodResolver(schemaBranch),
  });
  const branchCreate = async (data: BranchFormModel) => {
    try {
      await postHandler("branches/", data);
      toast.success("Branch Created Successfully");
    } catch (error) {
      extractErrorMessage(error);
    }
  };
  return (
    <Paper sx={{ p: 2, my: 4 }}>
      <Typography mb={2} variant="h5">
        Create New Branch
      </Typography>
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "300px",
          p: 1,
        }}
        onSubmit={handleSubmit(branchCreate)}
      >
        <TextField
          {...register("branch_name")}
          label="Branch Name"
          type="text"
          variant="outlined"
        />
        <TextField
          {...register("location")}
          label="Location"
          type="text"
          variant="outlined"
        />
        <Button disabled={postHandlerloading} variant="contained" type="submit">
          {postHandlerloading
            ? "New Branch is Creating..."
            : "Create New Branch"}
        </Button>
      </Box>
    </Paper>
  );
}
