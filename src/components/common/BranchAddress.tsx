import { Typography } from "@mui/material";
import { getUserCurentBranch } from "../../utils/authDataConver";
import {
  BRANCH_ALUTHGAMA_ID,
  BRANCH_MATHUGAMA_ID,
  BUSID,
} from "../../data/staticVariables";
export default function BranchAddress() {
  return (
    <div>
      {getUserCurentBranch()?.id === BRANCH_MATHUGAMA_ID && (
        <>
          <Typography variant="body2">No: 34, Aluthgama Road</Typography>
          <Typography variant="body2">Mathugama</Typography>
        </>
      )}
      {getUserCurentBranch()?.id === BRANCH_ALUTHGAMA_ID && (
        <>
          <Typography variant="body2">
            No.268/B, Jayasooriya Building,
          </Typography>
          <Typography variant="body2"> Galle Road, Aluthgama</Typography>
        </>
      )}
      {getUserCurentBranch()?.id === BUSID && (
        <>
          <Typography variant="body2">
            No.268/B, Jayasooriya Building,
          </Typography>
          <Typography variant="body2"> Galle Road, Aluthgama</Typography>
        </>
      )}
    </div>
  );
}
