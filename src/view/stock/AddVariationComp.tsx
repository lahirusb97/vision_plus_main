import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import VariationCRUD from "../../components/VariationCRUD";
import AutocompleteInputField from "../../components/inputui/DropdownInput";

interface dataList {
  id: number;
  name: string;
  description?: string | null | undefined;
}
interface AddVariationCompProps {
  textName: string;
  Urlpath: string;
  dataList: dataList[];
  refresh: () => void;
}

export default function AddVariationComp({
  textName,
  Urlpath,
  dataList,
  refresh,
}: AddVariationCompProps) {
  const [variationCrud, setVariationCrud] = React.useState({
    open: false,
    url: "",
    dialogMode: "",
  });
  const [lenseCoating, setLenseCoating] = React.useState<number | null>(null);
  const handleClose = () => {
    setVariationCrud({
      open: false,
      url: "",
      dialogMode: "",
    });
    setLenseCoating(null);
    refresh();
  };

  return (
    <div>
      <Paper
        sx={{
          padding: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "10px",
        }}
      >
        <Typography variant="h6">{textName}</Typography>
        <AutocompleteInputField
          options={dataList}
          loading={false}
          labelName={textName}
          defaultId={undefined}
          onChange={(id) => setLenseCoating(id)}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            color="success"
            variant="outlined"
            onClick={() =>
              setVariationCrud({
                open: true,
                dialogMode: "add",
                url: Urlpath,
              })
            }
          >
            Add
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              if (lenseCoating) {
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
              if (lenseCoating) {
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
        <VariationCRUD
          variationCrud={variationCrud}
          handleClose={handleClose}
          refresh={refresh}
        />
      </Paper>
    </div>
  );
}
