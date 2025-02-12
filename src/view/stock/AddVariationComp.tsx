import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import VariationCRUD from "../../components/VariationCRUD";
import AutocompleteInputField from "../../components/inputui/DropdownInput";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

interface dataList {
  id: number;
  name: string;
  description?: string | null | undefined;
}
interface AddVariationCompProps {
  textName: string;
  Urlpath: string;
  dataList: dataList[];
}

export default function AddVariationComp({
  textName,
  Urlpath,
  dataList,
}: AddVariationCompProps) {
  const navigate = useNavigate();

  const [lenseCoating, setLenseCoating] = React.useState<number | null>(null);

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
            onClick={() => navigate(`${Urlpath}/`)}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              if (lenseCoating) {
                navigate(`${Urlpath}/${lenseCoating}`);
              } else {
                toast.error("No Item Selected");
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
                // ${Urlpath}${lenseCoating}
              }
            }}
          >
            Delete
          </Button>
        </div>
      </Paper>
    </div>
  );
}
