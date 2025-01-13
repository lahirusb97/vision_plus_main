import React from "react";
import { Paper, Box, Button } from "@mui/material";
import AutocompleteInputField from "./inputui/DropdownInput";
export default function StockVariationCRUD({
  options,
  loading,
  labelName,
  onChange,
  defaultId,
  onClickAdd,
  onClickEdit,
  onClickDelete,
}) {
  return (
    <div>
      <Paper>
        <AutocompleteInputField
          options={[]} // Pass the options array
          loading={false} // Pass the loading state
          labelName="Choose a Doctor" // Label for the input field
          defaultId={undefined} // Optionally pass a default selected ID
          onChange={(value) => console.log(value)} // Callback function when an option is selected
        />
        <Button onClick={onClickAdd}>Add</Button>
        <Button onClick={onClickEdit}>Edit</Button>
        <Button onClick={onClickDelete}>Delete</Button>
      </Paper>
    </div>
  );
}
