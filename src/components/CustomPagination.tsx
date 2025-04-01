import {
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { SelectChangeEvent } from "@mui/material";

interface CustomerPaginationProps {
  totalCount: number; // Total number of items in given search quary
  handlePageNavigation: (page: number) => void; // page number needed for navigation
  changePageSize: (size: number) => void; // Function to handle Row count changes
  page_size: number; // The current page size (default value)
}
const CustomerPagination: React.FC<CustomerPaginationProps> = ({
  totalCount,
  handlePageNavigation,
  changePageSize,
  page_size,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(page_size);

  const handlePageChange = (_e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    handlePageNavigation(value); // Notify parent component about page change
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
    setPage(1); // Reset to the first page whenever the page size changes
    changePageSize(Number(event.target.value)); // Notify parent component about page size change
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",

        padding: 2,
      }}
    >
      <FormControl size="small" sx={{ minWidth: 50 }}>
        <InputLabel id="page-size-label">Rows</InputLabel>
        <Select
          labelId="page-size-label"
          value={pageSize}
          defaultValue={pageSize}
          label="Rows"
          onChange={handlePageSizeChange}
        >
          {[1, 2, 10, 25, 50].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Pagination
        size="small"
        count={Math.max(1, Math.ceil(totalCount / pageSize))}
        page={page}
        onChange={handlePageChange}
        shape="rounded"
        color="primary"
        sx={{ marginTop: 1 }}
      />
    </Box>
  );
};

export default CustomerPagination;
