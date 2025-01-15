import React, { useEffect } from "react";
import { Button, Paper, Typography } from "@mui/material";
import AutocompleteInputField from "../../components/inputui/DropdownInput";
import VariationCodeCRUD from "../../components/VariationCodeCRUD";
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
  dataList: dataList[];
  brandList: brandList[];
  refresh: () => void;
}
export default function CodeCRUD({
  textName,
  Urlpath,
  dataList,
  brandList,
  refresh,
}: AddVariationCompProps) {
  const [variationCrud, setVariationCrud] = React.useState({
    open: false,
    url: "",
    dialogMode: "",
  });
  const [lenseCoating, setLenseCoating] = React.useState<
    string | number | null
  >(null);
  const [brandID, setBrandID] = React.useState<number | null>(null);
  const [avilableCodes, setAvilableCodes] = React.useState<dataList[]>([]);
  const handleClose = () => {
    setVariationCrud({
      open: false,
      url: "",
      dialogMode: "",
    });
    setLenseCoating(null);
    setBrandID(null);
    setAvilableCodes([]);
    refresh();
  };
  useEffect(() => {
    if (brandID) {
      setAvilableCodes(dataList.filter((item) => item.brand === brandID));
    } else {
      setAvilableCodes([]);
    }
  }, [brandID]);

  return (
    <div>
      <Paper
        sx={{
          padding: 2,
          width: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "10px",
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

        <AutocompleteInputField
          options={avilableCodes}
          loading={false}
          labelName="Code name "
          defaultId={undefined}
          onChange={(id) => setLenseCoating(id)}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            color="success"
            variant="outlined"
            onClick={() => {
              if (brandID) {
                setVariationCrud({
                  open: true,
                  dialogMode: "add",
                  url: Urlpath,
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
                setVariationCrud({
                  open: true,
                  dialogMode: "Edit",
                  url: `${Urlpath}${lenseCoating}/`,
                });
              }
            }}
          >
            Edit
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              if (brandID && lenseCoating) {
                setVariationCrud({
                  open: true,
                  dialogMode: "Delete",
                  url: `${Urlpath}${lenseCoating}/`,
                });
              }
            }}
          >
            Delete
          </Button>
        </div>
        {/* Dialog */}
        <VariationCodeCRUD
          variationCrud={variationCrud}
          brandID={brandID}
          handleClose={handleClose}
          refresh={refresh}
        />
      </Paper>
    </div>
  );
}
