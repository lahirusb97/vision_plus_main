import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import AutocompleteInputField from "../../components/inputui/DropdownInput";
import { useNavigate } from "react-router";
// import { useDeleteDialog } from "../../context/DeleteDialogContext";

interface dataList {
  id: number;
  name: string;
  brand: number;
}
interface brandList {
  id: number;
  name: string;
}
interface AddVariationCompProps {
  textName: string;
  Urlpath: string;
  // pathroute: string;
  dataList: dataList[];
  brandList: brandList[];
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

  const [lenseCoating, setLenseCoating] = React.useState<
    string | number | null
  >(null);
  const [brandID, setBrandID] = React.useState<number | null>(null);
  const [avilableCodes, setAvilableCodes] = React.useState<dataList[]>([]);
  // const { openDialog } = useDeleteDialog();

  useEffect(() => {
    if (brandID) {
      setAvilableCodes(dataList.filter((item) => item.brand === brandID));
    } else {
      setAvilableCodes([]);
    }
  }, [brandID, dataList.length]);

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
            defaultId={undefined}
            onChange={(id) => setLenseCoating(id)}
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
            variant="outlined"
            onClick={() => {
              if (brandID && lenseCoating) {
                navigate(`frame_code/${lenseCoating}`);
              }
            }}
          >
            Edit
          </Button>
          {/* <Button
            color="error"
            variant="outlined"
            onClick={() => {
              if (brandID && lenseCoating) {
                openDialog(`/${pathroute}/${lenseCoating}/`, textName, refresh);
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
