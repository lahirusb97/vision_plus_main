import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { RefractionDetailModel } from "../../model/RefractionDetailModel";
import { planoConvert } from "../../utils/planoConvert";
interface OrderFromVisionTableProps {
  RefractionDetails: RefractionDetailModel | null | undefined;
}
export default function OrderFromVisionTable({
  RefractionDetails,
}: OrderFromVisionTableProps) {
  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "0.4cm", width: "14cm" }}
      >
        <Table size="small" sx={{ border: "1px solid black" }}>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                colSpan={3}
                sx={{
                  border: "1px solid black",

                  fontSize: "1.3em", // Right Eye border
                }}
              >
                Right Eye
              </TableCell>
              <TableCell
                align="center"
                colSpan={3}
                sx={{
                  border: "1px solid black",
                  fontSize: "1.3em", // Left Eye border
                  textAlign: "center",
                }}
              >
                Left Eye
              </TableCell>
            </TableRow>
            <TableRow>
              {/* Right Eye Columns */}
              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  textAlign: "center",
                }}
              >
                SPH
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  textAlign: "center",
                }}
              >
                CYL
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  textAlign: "center",
                }}
              >
                AXIS
              </TableCell>

              {/* Left Eye Columns */}
              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  textAlign: "center",
                }}
              >
                SPH
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  textAlign: "center",
                }}
              >
                CYL
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  textAlign: "center",
                }}
              >
                AXIS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {/* Right Eye Data */}
              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1em",
                  textAlign: "center",
                }}
              >
                {planoConvert(RefractionDetails?.right_eye_dist_sph)}{" "}
                {/* sph */}
              </TableCell>

              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1em",
                  textAlign: "center",
                }}
              >
                {planoConvert(RefractionDetails?.right_eye_dist_cyl)}{" "}
                {/* cyl */}
              </TableCell>

              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1em",
                  textAlign: "center",
                }}
              >
                {RefractionDetails?.right_eye_dist_axis}
              </TableCell>

              {/* Left Eye Data */}
              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1em",
                  textAlign: "center",
                }}
              >
                {RefractionDetails?.left_eye_dist_sph}
                {/* sph */}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1em",
                  textAlign: "center",
                }}
              >
                {RefractionDetails?.left_eye_dist_cyl} {/* cyl */}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1em",
                  textAlign: "center",
                }}
              >
                {RefractionDetails?.left_eye_dist_axis}
                {/* axis */}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1em",
                  textAlign: "center",
                }}
              >
                {RefractionDetails?.right_eye_near_sph || "\u00A0"}
              </TableCell>
              <TableCell
                colSpan={2}
                sx={{ border: "1px solid black" }}
              ></TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                  fontWeight: "bold",
                  fontSize: "1em",
                  textAlign: "center",
                }}
              >
                {RefractionDetails?.left_eye_near_sph || "\u00A0"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
