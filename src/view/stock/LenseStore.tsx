import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";
import { useNavigate } from "react-router";
import useGetLenses from "../../hooks/lense/useGetLense";
import { useDeleteDialog } from "../../context/DeleteDialogContext";
import { addID, cylID, sphID } from "../../data/staticVariables";
import { LenseModel } from "../../model/LenseModel";
import TitleText from "../../components/TitleText";
import { Edit, PriceChange } from "@mui/icons-material";
import returnPlusSymbol from "../../utils/returnPlusSymbol";

const LenseStore = () => {
  const { lenses, lensesLoading, refresh } = useGetLenses();

  const { openDialog } = useDeleteDialog();

  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Action",
        id: "action",
        size: 100,
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        Cell: ({ row }: { row: { original: LenseModel } }) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Deactivate Lense">
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(row.original)}
              >
                <DeleteIcon sx={{ fontSize: "1.4rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Lense Full Edit">
              <IconButton
                size="small"
                onClick={() => handleLenseFullEdit(row.original.id)}
              >
                <Edit sx={{ fontSize: "1.4rem" }} />
              </IconButton>
            </Tooltip>
            {/* <IconButton
              size="small"
              color="info"
              title="History"
              onClick={() => handleHistory(row.original.id)}
            >
              <HistoryIcon sx={{ fontSize: "1.4rem" }} />
            </IconButton> */}
            <Tooltip title="Update Lense Price">
              <IconButton
                size="small"
                color="warning"
                onClick={() => handleEdit(row.original.id)}
              >
                <PriceChange sx={{ fontSize: "1.4rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Update Lense Quantity">
              <IconButton
                size="small"
                color="warning"
                title="Update Quantity"
                onClick={() => handleUpdate(row.original.id)}
              >
                <LoopIcon sx={{ fontSize: "1.4rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },

      {
        header: "Lense Factory",
        accessorKey: "brand_name",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        size: 130,
      },
      {
        header: "Lense Type",
        accessorKey: "type_name",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        size: 130,
      },
      {
        header: "Coating",
        accessorKey: "coating_name",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        size: 130,
      },
      {
        header: "Price",
        accessorKey: "price",
        muiTableHeadCellProps: { align: "right" as const },
        muiTableBodyCellProps: { align: "right" as const },
        size: 80,
      },
      {
        header: "Side",
        id: "side",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        Cell: ({ row }: { row: { original: LenseModel } }) => {
          const sphEntry = row.original.powers.find((p) => p.power === sphID);
          return sphEntry && sphEntry.side ? sphEntry.side : "-";
        },
        size: 30,
      },
      {
        header: "SPH",
        id: "sph",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        accessorFn: (row: LenseModel) => {
          const sph = row.powers.find((p) => p.power === sphID);
          return sph
            ? `${returnPlusSymbol(sph.value)}${parseFloat(sph.value).toFixed(
                2
              )}`
            : null;
        },
        size: 30,
      },
      {
        header: "CYL",
        id: "cyl",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        accessorFn: (row: LenseModel) => {
          const cyl = row.powers.find((p) => p.power === cylID);
          return cyl
            ? `${returnPlusSymbol(cyl.value)}${parseFloat(cyl.value).toFixed(
                2
              )}`
            : null;
        },
        size: 30,
      },
      {
        header: "ADD",
        id: "add",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        accessorFn: (row: LenseModel) => {
          const add = row.powers.find((p) => p.power === addID);
          return add
            ? `${returnPlusSymbol(add.value)}${parseFloat(add.value).toFixed(
                2
              )}`
            : null;
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
      `lenses/${row.id}/`,
      `Lense of Type - ${row.type} & Brand - ${row.brand}`,
      "Your can activate this lense again using Logs section lens store",
      "Deactivate",
      refresh
    );
  };
  const handleLenseFullEdit = (id: number) => {
    navigate(`./full_edit/${id}`);
  };
  // const handleHistory = (id: number) => {
  //   // Add history logic
  //   navigate(`history/${id}`);
  // };

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
      <TitleText title="  Lenses Store" />
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
          density: "compact",
          pagination: { pageIndex: 0, pageSize: 15 },
        }}
        columns={columns}
        data={lenses}
        enableColumnActions={false}
        enableSorting
        enablePagination
        muiTableBodyCellProps={{
          sx: {
            padding: 0,
          },
        }}
      />
    </Box>
  );
};

export default LenseStore;
