import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaAddToSafe,
  AddToSafeFormModel,
} from "../../../validations/schemaAddToSafe";

import { getUserCurentBranch } from "../../../utils/authDataConver";
import { TextField } from "@mui/material";

export default function SafeIndex() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddToSafeFormModel>({
    resolver: zodResolver(schemaAddToSafe),
  });

  const onSubmit = (data: AddToSafeFormModel) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Description"
          fullWidth
          size="small"
          multiline
          rows={2}
          {...register("transaction_type")}
          error={!!errors.transaction_type}
          helperText={errors.transaction_type?.message}
        />

        <TextField
          sx={{ display: "none" }}
          inputProps={{
            min: 0,
          }}
          {...register("branch", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          label="Branch Id"
          type="number"
          fullWidth
          variant="outlined"
          error={!!errors.branch}
          helperText={errors.branch?.message}
          defaultValue={getUserCurentBranch()?.id}
        />
      </form>
    </div>
  );
}
