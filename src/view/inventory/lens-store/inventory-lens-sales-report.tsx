import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_Column,
  MRT_TableInstance,
} from "material-react-table";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  IconButton,
  Input,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import HistoryIcon from "@mui/icons-material/History";
import LoopIcon from "@mui/icons-material/Loop";
import { useNavigate } from "react-router";
import useGetLenses from "../../../hooks/lense/useGetLense";
import { useDeleteDialog } from "../../../context/DeleteDialogContext";
import { addID, cylID, sphID } from "../../../data/staticVariables";
import { LenseModel } from "../../../model/LenseModel";
import TitleText from "../../../components/TitleText";
import { Edit, PriceChange } from "@mui/icons-material";
import returnPlusSymbol from "../../../utils/returnPlusSymbol";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import StoreQtyActionDialog from "./store-qty-action-dialog";

export type LenseModelWithQuantity = LenseModel & {
  selectedQuantity: string;
};
const InventoryLensSalesReport = () => {
  const { lenses, lensesLoading, refresh } = useGetLenses({
    store_id: getUserCurentBranch()?.id ?? null,
  });
  const [selectedRows, setSelectedRows] = useState<LenseModelWithQuantity[]>(
    []
  );
  const { openDialog } = useDeleteDialog();

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    "add" | "remove" | "transfer" | null
  >(null);

  // Handler to update quantity for a specific lens
  const handleQuantityChange = (lensId: number, value: string) => {
    // If empty string, set to undefined to allow clearing the field
    console.log(lensId, value);
    setSelectedRows((prev) =>
      prev.map((lense) =>
        lense.id === lensId
          ? {
              ...lense,
              selectedQuantity: value,
            }
          : lense
      )
    );
  };

  // Handler for onBlur event: set empty value to 0
  const handleBlur = (id: number) => {
    setSelectedRows((prev) =>
      prev.map((lense) =>
        lense.id === id &&
        (!lense.selectedQuantity || lense.selectedQuantity.trim() === "")
          ? { ...lense, selectedQuantity: "0" }
          : lense
      )
    );
  };

  // Handler for onFocus event: clear field if value is 0
  const handleFocus = (id: number) => {
    const selectedLens = selectedRows.find((item) => item.id === id);
    if (selectedLens?.selectedQuantity === "0") {
      setSelectedRows((prev) =>
        prev.map((lense) =>
          lense.id === id ? { ...lense, selectedQuantity: "" } : lense
        )
      );
    }
  };

  // Handle dialog actions
  const handleDialogAction = (action: "add" | "remove" | "transfer") => {
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogAction(null);
  };

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
                onClick={() => handleUpdate(row.original.id)}
              >
                <LoopIcon sx={{ fontSize: "1.4rem" }} />
              </IconButton>
            </Tooltip>
            <Box>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows((prev) => [
                      ...prev,
                      { ...row.original, selectedQuantity: "0" },
                    ]);
                  } else {
                    setSelectedRows((prev) =>
                      prev.filter((item) => item.id !== row.original.id)
                    );
                  }
                }}
              />
              {selectedRows.some((item) => item.id === row.original.id) && (
                <Input
                  type="number"
                  value={
                    selectedRows.find((item) => item.id === row.original.id)
                      ?.selectedQuantity ?? ""
                  }
                  onChange={(e) =>
                    handleQuantityChange(row.original.id, e.target.value)
                  }
                  placeholder="Quantity"
                  onBlur={() => handleBlur(row.original.id)}
                  onFocus={() => handleFocus(row.original.id)}
                  sx={{ width: "80px" }}
                  inputProps={{ min: 0 }}
                />
              )}
            </Box>
          </Box>
        ),
      },

      {
        header: "Lense Factory",
        accessorKey: "brand_name",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        size: 130,
        Filter: ({ column }: { column: MRT_Column<LenseModel> }) => {
          const allBrands = Array.from(
            new Set(lenses.map((l) => l.brand_name))
          ).filter(Boolean);

          return (
            <Autocomplete
              size="small"
              options={allBrands}
              onChange={(_, value) => column.setFilterValue(value ?? "")}
              renderInput={(params) => (
                <TextField {...params} label="Filter" variant="standard" />
              )}
              value={column.getFilterValue() || ""}
              isOptionEqualToValue={(option, value) => option === value}
              clearOnEscape
            />
          );
        },
      },
      {
        header: "Lense Type",
        accessorKey: "type_name",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        size: 130,
        Filter: ({
          column,
          table,
        }: {
          column: MRT_Column<LenseModel>;
          table: MRT_TableInstance<LenseModel>;
        }) => {
          // Get selected brand from filters
          const brandFilter = table
            .getState()
            .columnFilters.find((f) => f.id === "brand_name");
          const selectedBrand = brandFilter?.value;
          // Show only types for selected brand
          const filteredTypes = Array.from(
            new Set(
              lenses
                .filter((l) => !selectedBrand || l.brand_name === selectedBrand)
                .map((l) => l.type_name)
            )
          ).filter(Boolean);

          return (
            <Autocomplete
              size="small"
              options={filteredTypes}
              onChange={(_, value) => column.setFilterValue(value ?? "")}
              renderInput={(params) => (
                <TextField {...params} label="Filter" variant="standard" />
              )}
              value={column.getFilterValue() || ""}
              isOptionEqualToValue={(option, value) => option === value}
              clearOnEscape
            />
          );
        },
      },
      {
        header: "Coating",
        accessorKey: "coating_name",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        size: 130,
        Filter: ({
          column,
          table,
        }: {
          column: MRT_Column<LenseModel>;
          table: MRT_TableInstance<LenseModel>;
        }) => {
          // Get selected brand & type from filters
          const brandFilter = table
            .getState()
            .columnFilters.find((f) => f.id === "brand_name");
          const selectedBrand = brandFilter?.value;
          const typeFilter = table
            .getState()
            .columnFilters.find((f) => f.id === "type_name");
          const selectedType = typeFilter?.value;

          // Show only coatings for selected brand+type
          const filteredCoatings = Array.from(
            new Set(
              lenses
                .filter(
                  (l) =>
                    (!selectedBrand || l.brand_name === selectedBrand) &&
                    (!selectedType || l.type_name === selectedType)
                )
                .map((l) => l.coating_name)
            )
          ).filter(Boolean);

          return (
            <Autocomplete
              size="small"
              options={filteredCoatings}
              onChange={(_, value) => column.setFilterValue(value ?? "")}
              renderInput={(params) => (
                <TextField {...params} label="Filter" variant="standard" />
              )}
              value={column.getFilterValue() || ""}
              isOptionEqualToValue={(option, value) => option === value}
              clearOnEscape
            />
          );
        },
      },
      {
        header: "Price",
        accessorKey: "price",
        muiTableHeadCellProps: { align: "right" as const },
        muiTableBodyCellProps: { align: "right" as const },
        size: 80,
        Cell: ({ row }: { row: { original: LenseModel } }) => (
          <Typography align="right" variant="body2">
            {numberWithCommas(row.original.price)}
          </Typography>
        ),
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
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        size: 50,
        Cell: ({ row }: { row: { original: LenseModel } }) => (
          <Typography align="center" variant="body2">
            {row.original.stock?.[0]?.qty ?? 0}
          </Typography>
        ),
      },
      {
        header: "Stock Limit",
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        accessorFn: (row: LenseModel) => row.stock?.[0]?.limit ?? 0,
        size: 50,
      },
      {
        header: "Low Stocks",
        accessorFn: (row: LenseModel) => {
          const qty = row.stock?.[0]?.qty ?? 0;
          const limit = row.stock?.[0]?.limit ?? 0;
          return qty <= limit;
        },
        enableSorting: true, // explicitly enable sorting
        size: 50,
        muiTableHeadCellProps: { align: "center" as const },
        muiTableBodyCellProps: { align: "center" as const },
        Cell: ({ row }: { row: { original: LenseModel } }) => {
          const qty = row.original.stock?.[0]?.qty ?? 0;
          const limit = row.original.stock?.[0]?.limit ?? 0;
          return (
            <Typography
              variant="body2"
              sx={{
                color: qty <= limit ? "error.main" : "success.main",
              }}
            >
              {qty <= limit ? "Low Stock" : "OK"}
            </Typography>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lenses, selectedRows]
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
        enableTopToolbar
        renderTopToolbarCustomActions={({ table }) => {
          const hasSelection = selectedRows.length > 0;

          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                onClick={() => handleDialogAction("add")}
                disabled={!hasSelection}
              >
                Add Qty
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleDialogAction("transfer")}
                disabled={!hasSelection}
              >
                Transfer Qty
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={() => handleDialogAction("remove")}
                disabled={!hasSelection}
              >
                Remove Qty
              </Button>
            </Box>
          );
        }}
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
      <StoreQtyActionDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        actionType={dialogAction}
        quantities={selectedRows}
        refresh={refresh}
      />
    </Box>
  );
};

export default InventoryLensSalesReport;
