import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";
import { useNavigate } from "react-router";
import useGetLenses from "../../hooks/lense/useGetLense";
import { useDeleteDialog } from "../../context/DeleteDialogContext";
import { addID, cylID, sphID } from "../../data/staticVariables";

const LenseStore = () => {
  const { lenses, lensesLoading, refresh } = useGetLenses();

  const { openDialog } = useDeleteDialog();
  console.log(lenses);

  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Action",
        id: "action",
        Cell: ({ row }) => (
          <Box>
            <IconButton
              size="small"
              color="error"
              title="Delete"
              onClick={() => handleDelete(row.original)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              size="small"
              color="info"
              title="History"
              onClick={() => handleHistory(row.original.id)}
            >
              <HistoryIcon />
            </IconButton>
            <IconButton
              size="small"
              color="warning"
              title="Edit"
              onClick={() => handleEdit(row.original.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="warning"
              title="Update Quantity"
              onClick={() => handleUpdate(row.original.id)}
            >
              <LoopIcon />
            </IconButton>
          </Box>
        ),
      },
      {
        header: "Lense Type",
        accessorKey: "type_name",
        size: 130,
      },
      {
        header: "Lense Factory",
        accessorKey: "brand_name",
        size: 130,
      },
      {
        header: "Coating",
        accessorKey: "coating_name",
        size: 130,
      },
      {
        header: "Price",
        accessorKey: "price",
        size: 80,
      },
      {
        header: "Side",
        id: "side",
        Cell: ({ row }) => {
          const sphEntry = row.original.powers.find((p) => p.power === sphID);
          return sphEntry && sphEntry.side ? sphEntry.side : "-";
        },
        size: 30,
      },
      {
        header: "SPH",
        id: "sph",
        Cell: ({ row }) => {
          const sphEntry = row.original.powers.find((p) => p.power === sphID);
          return sphEntry ? sphEntry.value : "-";
        },
        size: 30,
      },
      {
        header: "CYL",
        id: "cyl",
        Cell: ({ row }) => {
          const cylEntry = row.original.powers.find((p) => p.power === cylID);
          return cylEntry ? cylEntry.value : "-";
        },
        size: 30,
      },
      {
        header: "ADD",
        id: "add",
        Cell: ({ row }) => {
          const addEntry = row.original.powers.find((p) => p.power === addID);
          return addEntry ? addEntry.value : "-";
        },
        size: 30,
      },
      {
        header: "Quantity",
        accessorFn: (row) => row.stock?.[0]?.qty ?? 0,
        size: 50,
      },
      {
        header: "Stock Limit",
        accessorFn: (row) => row.stock?.[0]?.limit ?? 0,
        size: 50,
      },
    ],
    []
  );
  const navigate = useNavigate();
  // Handlers for actions
  const handleDelete = (row) => {
    openDialog(
      `/lenses/${row.id}/`,
      `Lense of Type - ${row.type} & Brand - ${row.brand}`,
      refresh
    );
  };

  const handleHistory = (id) => {
    // Add history logic
    navigate(`history/${id}`);
  };

  const handleEdit = (id) => {
    // Add edit logic
    navigate(`edit/${id}`);
  };

  const handleUpdate = (id) => {
    // Add update logic
    navigate(`update/${id}`);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "1200px" }}>
      <Typography
        sx={{ marginBottom: 2, fontWeight: "bold" }}
        variant="h4"
        gutterBottom
      >
        Lenses Store
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={lenses}
        enableColumnActions={false}
        enableColumnFilters={false}
        enableSorting
        enablePagination
        muiTableProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      />
    </Box>
  );
};

export default LenseStore;
