import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";

import { CheckinInvoiceModel } from "../../model/CheckinInvoiceModel";
import { progressStatus } from "../../utils/progressState";
interface SelectableTableProps {
  data: CheckinInvoiceModel[];
  loading: boolean;
  selectedIds: number[];
  onSelectionChange: (selectedIds: number[]) => void;
}

interface SelectableTableProps {
  data: CheckinInvoiceModel[];
  loading: boolean;
  selectedIds: number[];
  onSelectionChange: (selectedIds: number[]) => void;
}

const SelectableTable = ({
  data,
  loading,
  selectedIds,
  onSelectionChange,
}: SelectableTableProps) => {
  // Track all selected items across pages
  const [globalSelections, setGlobalSelections] =
    useState<number[]>(selectedIds);
  // Track checkbox refs for efficient updates
  const checkboxRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // Sync with parent component's selections
  useEffect(() => {
    setGlobalSelections(selectedIds);
  }, [selectedIds]);

  const handleSelectItem = (id: number) => {
    const newSelections = globalSelections.includes(id)
      ? globalSelections.filter((itemId) => itemId !== id)
      : [...globalSelections, id];

    setGlobalSelections(newSelections);
    onSelectionChange(newSelections);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentPageIds = data.map((item) => item.id);
    const newSelections = event.target.checked
      ? Array.from(new Set([...globalSelections, ...currentPageIds]))
      : globalSelections.filter((id) => !currentPageIds.includes(id));

    setGlobalSelections(newSelections);
    onSelectionChange(newSelections);
  };

  // Update DOM checkboxes directly for instant feedback
  useEffect(() => {
    data.forEach((item) => {
      const checkbox = checkboxRefs.current[item.id];
      if (checkbox) {
        checkbox.checked = globalSelections.includes(item.id);
      }
    });
  }, [data, globalSelections]);

  const isAllSelected =
    data.length > 0 && data.every((item) => globalSelections.includes(item.id));
  const isIndeterminate =
    data.some((item) => globalSelections.includes(item.id)) && !isAllSelected;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                sx={{ m: 0, p: 0 }}
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell>Invoice</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={4}>Loading...</TableCell>
            </TableRow>
          )}
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ m: 0, p: 0 }}>
                <Checkbox
                  sx={{ m: 0, p: 0, scale: 0.8 }}
                  inputRef={(el) => (checkboxRefs.current[item.id] = el)}
                  checked={globalSelections.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </TableCell>
              <TableCell sx={{ m: 0, p: 0 }}>{item.invoice_number}</TableCell>
              <TableCell sx={{ m: 0, p: 0 }}>{item.invoice_date}</TableCell>
              <TableCell sx={{ m: 0, p: 0 }}>
                {progressStatus(item.progress_status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default SelectableTable;
