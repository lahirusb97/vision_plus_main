<<<<<<< HEAD
=======
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {  Input, Box } from "@mui/material";

const EyeTestGrid: React.FC = () => {
  const columns = [
    { field: "label", headerName: "Label", width: 150 },
    { field: "rightEye", headerName: "Right Eye", width: 150 },
    { field: "leftEye", headerName: "Left Eye", width: 150 },
  ];

  const rows = [
    { id: 1, label: "SPH", rightEye: <Input />, leftEye: <Input /> },
    { id: 2, label: "Cyl", rightEye: <Input />, leftEye: <Input /> },
    { id: 3, label: "AXIS", rightEye: <Input />, leftEye: <Input /> },
    { id: 4, label: "Dist", rightEye: "", leftEye: <Input /> },
    { id: 5, label: "Near", rightEye: <Input />, leftEye: <Input /> },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        sx={{
          "& .MuiDataGrid-cell": {
            border: "1px solid black",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#D7D4E1",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid black",
          },
        }}
      />
    </Box>
  );
};

export default EyeTestGrid;
>>>>>>> 5a985de6ae60e609ff6af70d1297abdc8c114578
