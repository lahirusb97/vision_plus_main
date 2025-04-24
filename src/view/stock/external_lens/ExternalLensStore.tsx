import { useMemo } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useGetExternalLenses } from "../../../hooks/useGetExternalLenses";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { ExternalLensModel } from "../../../model/ExternalLenseModel";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { formatBrandedText } from "../../../validations/formatBrandedText";
import ExternlLenseFilter from "./ExternlLenseFilter";

const ExternalLensStore = () => {
  const navigate = useNavigate();
  const { externaLenseList, externaLenseListLoading, setExternalLenseParams } =
    useGetExternalLenses();

  const columns = useMemo<MRT_ColumnDef<ExternalLensModel>[]>(
    () => [
      {
        id: "actions", // Custom column id for actions
        header: "Actions",
        size: 50,
        Cell: ({ row }) => {
          const handleEditClick = () => {
            const rowData = row.original;
            console.log("Edit clicked for row:", rowData);
            navigate(`update/${rowData.id}/`); // Navigate to the edit page with the row ID
            // You can implement edit logic here (open modal, navigate, etc.)
          };

          return (
            <IconButton color="primary" size="small" onClick={handleEditClick}>
              <Edit sx={{ fontSize: "1rem" }} />
            </IconButton>
          );
        },
      },
      {
        accessorKey: "brand_name", //access nested data with dot notation
        header: "Factory Name",
        size: 150,
      },
      {
        accessorKey: "lens_type_name", //access nested data with dot notation
        header: "Type Name",
        size: 150,
      },
      {
        accessorKey: "coating_name",
        header: "Coating Name",
        size: 150,
      },
      {
        accessorKey: "price", //normal accessorKey
        header: "Price",
        size: 120,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return <Typography>{numberWithCommas(value)}</Typography>;
        },
      },
      {
        accessorKey: "branded", //normal accessorKey
        header: "Braned",
        size: 120,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return <Typography>{formatBrandedText(value)}</Typography>;
        },
      },
    ],
    []
  );
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        External Lenses
      </Typography>

      {/* Filter Inputs */}
      <ExternlLenseFilter
        setExternalLenseParams={setExternalLenseParams}
        availableFilters={externaLenseList?.available_filters ?? null}
      />
      <MaterialReactTable
        columns={columns}
        data={externaLenseList?.results || []}
        state={{
          isLoading: externaLenseListLoading,
        }}
        initialState={{
          pagination: {
            pageIndex: 0,
            pageSize: 15,
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            height: "1rem", // Reduce row height
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            py: 0, // Reduce vertical padding
            px: 0, // Reduce horizontal padding
            fontSize: "0.875rem", // Optional: smaller font
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            py: 0,
            px: 0,
            fontSize: "0.875rem",
          },
        }}
      />
    </Box>
  );
};
export default ExternalLensStore;
