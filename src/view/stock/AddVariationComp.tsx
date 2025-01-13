import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import VariationCRUD from "../../components/VariationCRUD";
import AutocompleteInputField from "../../components/inputui/DropdownInput";
export default function AddVariationComp({
  textName,
  Urlpath,
  dataList,
  refresh,
}) {
  const [variationCrud, setVariationCrud] = React.useState({
    open: false,
    url: "",
    dialogMode: "",
  });
  const [lenseCoating, setLenseCoating] = React.useState("");
  const handleClose = () => {
    setVariationCrud({
      open: false,
      url: "",
      dialogMode: "",
    });
  };

  return (
    <div>
      <Paper>
        <Typography variant="h6">{textName}</Typography>
        <AutocompleteInputField
          options={dataList}
          loading={false}
          labelName="Doctor name "
          defaultId={undefined}
          onChange={(id) => setLenseCoating(id)}
        />

        <Button
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
          onClick={() =>
            setVariationCrud({
              open: true,
              dialogMode: "Edit",
              url: `${Urlpath}${lenseCoating}/`,
            })
          }
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            setVariationCrud({
              open: true,
              dialogMode: "Delete",
              url: `${Urlpath}${lenseCoating}/`,
            })
          }
        >
          Delete
        </Button>
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
