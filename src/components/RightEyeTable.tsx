import { Box, TextField, Typography } from "@mui/material";
const widthInput = 100;
import { grey } from "@mui/material/colors";

import { RefractionDetailModel } from "../model/RefractionDetailModel";
interface RightEyeTableProps {
  refractionDetail: Pick<
    RefractionDetailModel,
    | "hb_rx_right_dist"
    | "hb_rx_right_near"
    | "auto_ref_right"
    | "right_eye_dist_sph"
    | "right_eye_dist_cyl"
    | "right_eye_dist_axis"
    | "right_eye_near_sph"
  > | null;
}
export default function RightEyeTable({
  refractionDetail,
}: RightEyeTableProps) {
  if (!refractionDetail) {
    return <p>No refraction details available</p>;
  }
  const showDashEmptyVisionValues = (
    visionValue: string | null | undefined
  ) => {
    if (visionValue) {
      return visionValue;
    } else {
      return "__";
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          // backgroundColor: "#f5f5f5" /* chalani- backgroundcolor change*/,
          p: 1,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              border: "1px solid black",
            }}
          >
            <SowValue
              value={showDashEmptyVisionValues(
                refractionDetail?.hb_rx_right_dist
              )}
              text="Hb Rx Distance"
            />
            <SowValue
              value={showDashEmptyVisionValues(
                refractionDetail?.hb_rx_right_near
              )}
              text="Hb Rx Near"
            />

            <SowValue
              value={showDashEmptyVisionValues(
                refractionDetail?.auto_ref_right
              )}
              text="Auto Ref"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <TextField
              disabled
              inputProps={{ step: 0.25 }}
              type="text"
              value={showDashEmptyVisionValues(
                refractionDetail?.right_eye_dist_sph
              )}
              placeholder=" sph"
              size="small"
              label="sph"
              sx={disabledTextFieldStyles}
            />

            <TextField
              disabled
              type="text"
              value={showDashEmptyVisionValues(
                refractionDetail?.right_eye_dist_cyl
              )}
              placeholder=" cyl"
              size="small"
              label="cyl"
              sx={disabledTextFieldStyles}
            />

            <TextField
              disabled
              inputProps={{ step: 0.25 }}
              type="text"
              value={showDashEmptyVisionValues(
                refractionDetail?.right_eye_dist_axis
              )}
              placeholder=" axis"
              size="small"
              label="axis"
              sx={disabledTextFieldStyles}
            />
          </Box>
        </Box>

        {/* show this below */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <TextField
            disabled
            inputProps={{ step: 0.25 }}
            type="text"
            value={showDashEmptyVisionValues(
              refractionDetail?.right_eye_near_sph
            )}
            placeholder=" near"
            size="small"
            label="near"
            sx={disabledTextFieldStyles}
          />
          <Box
            sx={{
              flexGrow: 2,
              px: 1,
              bgcolor: grey[800],
              ml: 1,
              color: "white",
            }}
          >
            <Typography>Right Side</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

interface SowValueProps {
  value: string;
  text: string;
}

function SowValue({ value, text }: SowValueProps) {
  return (
    <div>
      {" "}
      <Box sx={{ display: "flex", justifyContent: "space-between", mx: 2 }}>
        <Typography>{text} </Typography>
        <Typography>
          {/* {showDashEmptyVisionValues(refractionDetail.auto_ref_right)} */}
          {value}
        </Typography>
      </Box>
    </div>
  );
}
const disabledTextFieldStyles = {
  width: widthInput,
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "black",
    color: "black",
  },
  "& .MuiOutlinedInput-root.Mui-disabled": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: "black !important",
  },
  padding: "0", // Remove extra padding
  "& .MuiInputBase-input": {
    padding: "4px", // Reduce padding inside the input for a smaller appearance
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px", // Adjust the border radius if you want it to look sharper
  },
};
