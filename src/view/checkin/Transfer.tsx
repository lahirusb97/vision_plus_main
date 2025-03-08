import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, Box, Typography } from '@mui/material';

const Transfer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [displayedInvoices, setDisplayedInvoices] = useState([]); // To store invoices to display after OK click

  const invoices = [
    { id: 1, factoryInvoiceNo: "INV001", status: "Issue factory" },
    { id: 2, factoryInvoiceNo: "INV002", status: "Received from factory" },
    { id: 3, factoryInvoiceNo: "INV003", status: "Issue customer" },
    { id: 4, factoryInvoiceNo: "INV004", status: "Issue factory" },
  ];

  // Handle search when Enter is pressed
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const filtered = invoices.filter((invoice) =>
        invoice.factoryInvoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInvoices(filtered);
    }
  };

  // Handle search button click
  const handleSearchButtonClick = () => {
    const filtered = invoices.filter((invoice) =>
      invoice.factoryInvoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInvoices(filtered);
  };

  // Handle status change in the dropdown
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Handle OK button click to process selected invoices
  const handleUpdateStatus = () => {
    if (selectedInvoices.length === 0) {
      alert('Please select at least one invoice.');
      return;
    }

    // Log the selected invoices
    console.log('Selected Invoices:', selectedInvoices);

    // Process selected invoices (update status)
    const updatedInvoices = invoices.map((invoice) => {
      if (selectedInvoices.includes(invoice.id)) {
        return { ...invoice, status: status }; // Update status for selected invoices
      }
      return invoice;
    });

    // Log the updated invoices (or send to an API)
    console.log('Updated Invoices:', updatedInvoices);

    // Set the displayed invoices to the selected invoices
    setDisplayedInvoices(selectedInvoices);

    // Reset selected invoices and status
    setSelectedInvoices([]);
    setStatus('');
  };

  // Handle checkbox selection for invoices
  const handleActionChange = (id) => {
    setSelectedInvoices((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((invoiceId) => invoiceId !== id)
        : [...prevSelected, id]
    );
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'factoryInvoiceNo', headerName: 'Factory Invoice No', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <Checkbox
          checked={selectedInvoices.includes(params.row.id)}
          onChange={() => handleActionChange(params.row.id)}
        />
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 2, padding: 2 }}>
      {/* Table Section */}
      <Box sx={{ flex: 1 }}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredInvoices.length > 0 ? filteredInvoices : invoices}
            columns={columns}
            checkboxSelection={false}
            disableSelectionOnClick
          />
        </div>

        {/* Back Button */}
        <Button variant="contained" color="secondary" sx={{ marginTop: 2 }}>
          Back
        </Button>
      </Box>

      {/* Search, Status, and OK Section */}
      <Box sx={{ width: '300px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Search Field and Button */}
        <TextField
          label="Search Factory Invoice No"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearch}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearchButtonClick} fullWidth>
          Search Factory Invoice
        </Button>

        {/* Status Dropdown */}
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={handleStatusChange}>
            <MenuItem value="Issue factory">Issue factory</MenuItem>
            <MenuItem value="Received from factory">Received from factory</MenuItem>
            <MenuItem value="Issue customer">Issue customer</MenuItem>
          </Select>
        </FormControl>

        {/* OK Button */}
        <Button variant="contained" color="primary" onClick={handleUpdateStatus} fullWidth>
          OK
        </Button>

        {/* Display Selected Invoices */}
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Selected Invoices:</Typography>
          {displayedInvoices.length > 0 ? (
            <ul>
              {displayedInvoices.map((id) => {
                const invoice = invoices.find((inv) => inv.id === id);
                return <li key={id}>{invoice.factoryInvoiceNo}</li>;
              })}
            </ul>
          ) : (
            <Typography variant="body2">No invoices selected.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Transfer;