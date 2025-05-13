import { useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import useGetLenses from "../../hooks/lense/useGetLense";
import { addID, cylID, sphID } from "../../data/staticVariables";
import { LenseModel } from "../../model/LenseModel";
import TitleText from "../../components/TitleText";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { useMutationDialog } from "../../context/MutationDialogContext";
import { RestoreFromTrash } from "@mui/icons-material";
import axiosClient from "../../axiosClient";
import toast from "react-hot-toast";

const LensLog = () => {
  const { lenses, lensesLoading, refresh, setLenseParamsData } = useGetLenses();
  const { openMutationDialog } = useMutationDialog();

  useEffect(() => {
    setLenseParamsData({ status: "inactive" });
  }, []);
  // Define columns
  const columns = useMemo(
    () => [
      {
        header: "Action",
        size: 10,
        Cell: ({ row }: { row: { original: LenseModel } }) => (
          <Box>
            <Tooltip title="Activate deactivated Lens">
              <IconButton
                size="small"
                color="success"
                onClick={() => handleactivation(row.original)}
              >
                <RestoreFromTrash sx={{ fontSize: "1.4rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
      {
        header: "Lense Factory",
        accessorKey: "brand_name",
        size: 130,
      },
      {
        header: "Lense Type",
        accessorKey: "type_name",
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

  // Handlers for actions
  const handleactivation = async (row: LenseModel) => {
    openMutationDialog(
      `Lense of Brand - ${row.brand_name} & Type - ${row.type_name}`,
      "put",
      async () => {
        try {
          await axiosClient.put(`lenses/${row.id}/`, {
            lens: {
              brand: row.brand,
              is_active: true,
            },
          });
          toast.success("lense Activated successfully");
          refresh();
        } catch (error) {
          extractErrorMessage(error);
        }
      }
    );
  };

  return (
    <Box sx={{ padding: 2, maxWidth: "1200px" }}>
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

export default LensLog;
