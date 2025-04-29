import { useMemo } from "react";
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
import { LenseModel } from "../../model/LenseModel";

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
        Cell: ({ row }: { row: { original: LenseModel } }) => (
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

        Cell: ({ row }: { row: { original: LenseModel } }) => {
          const sphEntry = row.original.powers.find((p) => p.power === sphID);
          return sphEntry && sphEntry.side ? sphEntry.side : "-";
        },
        size: 30,
      },
      {
        header: "SPH",
        id: "sph",

        // Cell: ({ row }: { row: { original: LenseModel } }) => {
        //   const sphEntry = row.original.powers.find((p) => p.power === sphID);
        //   return sphEntry ? sphEntry.value : "-";
        // },
        accessorFn: (row: LenseModel) => {
          const sph = row.powers.find((p) => p.power === sphID);
          return sph ? parseFloat(sph.value) : null;
        },
        size: 30,
      },
      {
        header: "CYL",
        id: "cyl",
        // Cell: ({ row }: { row: { original: LenseModel } }) => {
        //   const cylEntry = row.original.powers.find((p) => p.power === cylID);
        //   return cylEntry ? cylEntry.value : "-";
        // },
        accessorFn: (row: LenseModel) => {
          const cyl = row.powers.find((p) => p.power === cylID);
          return cyl ? parseFloat(cyl.value) : null;
        },
        size: 30,
      },
      {
        header: "ADD",
        id: "add",
        // Cell: ({ row }: { row: { original: LenseModel } }) => {
        //   const addEntry = row.original.powers.find((p) => p.power === addID);
        //   return addEntry ? addEntry.value : "-";
        // },
        accessorFn: (row: LenseModel) => {
          const add = row.powers.find((p) => p.power === addID);
          return add ? parseFloat(add.value) : null;
        },
        size: 30,
      },
      {
        header: "Quantity",
        accessorFn: (row: LenseModel) => row.stock?.[0]?.qty ?? 0,
        size: 50,
      },
      {
        header: "Stock Limit",
        accessorFn: (row: LenseModel) => row.stock?.[0]?.limit ?? 0,
        size: 50,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lenses]
  );
  const navigate = useNavigate();
  // Handlers for actions
  const handleDelete = (row: LenseModel) => {
    openDialog(
      `/lenses/${row.id}/`,
      `Lense of Type - ${row.type} & Brand - ${row.brand}`,
      refresh
    );
  };

  const handleHistory = (id: number) => {
    // Add history logic
    navigate(`history/${id}`);
  };

  const handleEdit = (id: number) => {
    // Add edit logic
    navigate(`edit/${id}`);
  };

  const handleUpdate = (id: number) => {
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
        enableColumnFilters // 👈 enables filters
        enableFilters // 👈 required for custom filter functions
        state={{
          isLoading: lensesLoading,
        }}
        initialState={{
          sorting: [
            { id: "sph", desc: false },
            { id: "cyl", desc: false },
            { id: "add", desc: false },
          ],
          showColumnFilters: true,
        }}
        columns={columns}
        data={lenses}
        enableColumnActions={false}
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
