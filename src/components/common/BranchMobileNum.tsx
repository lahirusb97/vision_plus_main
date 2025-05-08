import { Typography } from "@mui/material";
import { getUserCurentBranch } from "../../utils/authDataConver";
import {
  BRANCH_ALUTHGAMA_ID,
  BRANCH_MATHUGAMA_ID,
  BUSID,
} from "../../data/staticVariables";
export default function BranchMobileNum() {
  return (
    <div>
      <Typography variant="body2" align="center">
        {getUserCurentBranch()?.id === BRANCH_MATHUGAMA_ID &&
          `Tel: 034 2247466 / 071 7513639`}

        {getUserCurentBranch()?.id === BRANCH_ALUTHGAMA_ID &&
          `Tel: 034 2275268 / 076 0534195`}
        {getUserCurentBranch()?.id === BUSID &&
          `Tel: 034 2247466 / 071 7513639`}
      </Typography>
    </div>
  );
}
