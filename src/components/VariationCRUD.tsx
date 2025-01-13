import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Typography } from "@mui/material";
import axiosClient from "../axiosClient";

export default function VariationCRUD({ variationCrud, handleClose, refresh }) {
  const [inputName, setInputName] = React.useState("");
  const [inputdiscription, setInputDiscription] = React.useState("");

  const handleAdd = async () => {
    try {
      await axiosClient.post(variationCrud.url, {
        name: inputName,
        description: inputdiscription,
      });
      console.log("added");
      refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async () => {
    try {
      await axiosClient.put(variationCrud.url, {
        name: inputName,
        discription: inputdiscription,
      });
      console.log("updates");
      refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      await axiosClient.delete(variationCrud.url);
      console.log("Deleted");
      refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={variationCrud.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Enter The Variation Name"}
        </DialogTitle>
        <DialogContent>
          {variationCrud.dialogMode !== "Delete" && (
            <TextField
              onChange={(e) => setInputName(e.target.value)}
              value={inputName}
              autoFocus
              fullWidth
              placeholder="Enter The Name"
            />
          )}
          {variationCrud.dialogMode == "Delete" ? (
            <Typography color="error">
              Are you sure you want to delete ?
            </Typography>
          ) : (
            ""
          )}

          {variationCrud.dialogMode === "add" && (
            <>
              <TextField
                onChange={(e) => setInputDiscription(e.target.value)}
                value={inputdiscription}
                autoFocus
                fullWidth
                type="text"
                placeholder="Discription"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={
              variationCrud.dialogMode === "Delete"
                ? handleDelete
                : variationCrud.dialogMode === "Edit"
                ? handleEdit
                : handleAdd
            }
            color="success"
            autoFocus
          >
            {variationCrud.dialogMode == "Delete" ? "Delete" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
