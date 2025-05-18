import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import AutocompleteInputField from "../../components/inputui/DropdownInput";
import { useNavigate } from "react-router";
import { CodeModel } from "../../model/CodeModel";
import { BrandModel } from "../../model/BrandModel";
// import { useDeleteDialog } from "../../context/DeleteDialogContext";

interface AddVariationCompProps {
  textName: string;
  Urlpath: string;
  // pathroute: string;
  dataList: CodeModel[];
  brandList: BrandModel[];
  // refresh: () => void;
}
export default function CodeCRUD({
  textName,
  dataList,
  brandList,
}: // pathroute,
// refresh,
AddVariationCompProps) {
  const navigate = useNavigate();

  const [lenseCode, setLenseCode] = React.useState<number | null>(null);
  const [brandID, setBrandID] = React.useState<number | null>(null);
  const [avilableCodes, setAvilableCodes] = React.useState<CodeModel[]>([]);
  // const { openDialog } = useDeleteDialog();

  useEffect(() => {
    if (brandID) {
      const filtered = dataList.filter((item) => item.brand === brandID);
      setAvilableCodes(filtered);
      setLenseCode(null); // ✅ reset selected code
    } else {
      setAvilableCodes([]);
      setLenseCode(null); // ✅ also clear when brand is unselected
    }
  }, [brandID]);

  return (
    <div>
      <Paper
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">{textName}</Typography>
        <AutocompleteInputField
          options={brandList}
          loading={false}
          labelName="Brand name "
          defaultId={brandID}
          onChange={(id) => setBrandID(id)}
        />

        <Box sx={{ marginY: 1 }}>
          <AutocompleteInputField
            options={avilableCodes}
            loading={false}
            labelName="Code name "
            defaultId={lenseCode}
            onChange={(id) => setLenseCode(id)}
          />
        </Box>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            color="success"
            variant="outlined"
            onClick={() => {
              if (brandID) {
                navigate({
                  pathname: `frame_code`,
                  search: `?brand=${brandID}`,
                });
              }
            }}
          >
            Add
          </Button>
          <Button
            disabled={!brandID || !lenseCode}
            color="info"
            variant="outlined"
            onClick={() => {
              if (brandID && lenseCode) {
                navigate(`frame_code/${lenseCode}`);
              }
            }}
          >
            Edit
          </Button>
          {/* <Button
            color="error"
            variant="outlined"
            onClick={() => {
              if (brandID && lenseCode) {
                openDialog(`/${pathroute}/${lenseCode}/`, textName, refresh);
              }
            }}
          >
            Delete
          </Button> */}
        </div>
      </Paper>
    </div>
  );
}
