import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



function createData(
  name: string,
  calories: number,
  fat: number,
  
) {
  return { name, calories, fat };


  
}


const rows   = [
  createData('Frozen yoghurt', 159, 6.0 ),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

export default function BasicTable() {
  return (
    <><div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      marginRight: '210px',
      marginLeft: '210px',
    }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300, border: '2px solid black', position: 'absolute', backgroundColor: 'lightblue' }} aria-label="simple table">
          <TableHead sx={{ minWidth: 300, border: '2px solid black', alignItems: 'center' }}>
            <TableRow sx={{ border: '2px solid black', textAlign: 'center' }}>
              <TableCell sx={{ minWidth: 300, border: '2px solid black' }} align="center">Name</TableCell>
              <TableCell sx={{ minWidth: 300, border: '2px solid black' }} align="center">Phone Number</TableCell>
              <TableCell align="center">Refraction number</TableCell>

            </TableRow>
          </TableHead>
          <TableBody sx={{ minWidth: 300, border: '2px solid black', alignItems: 'center' }}>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: '2px solid black' } }}
              >
                <TableCell sx={{ minWidth: 300, border: '2px solid black' }} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell sx={{ minWidth: 300, border: '2px solid black' }}>{row.calories}</TableCell>
                <TableCell sx={{ minWidth: 300, border: '2px solid black' }}>{row.fat}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>


      </TableContainer>


    </div><div >
        <div style={{ alignItems:'center', justifyContent:'center', paddingTop:'500px' }}>{"Testing user Login"}</div>
        <TextField sx={{ marginBottom:'30px',marginRight:'100px', marginTop:'200px'  }}
          label="Testing User Login"
          type="password"
          variant="outlined"
          style={{ marginTop:'400px', width: '945px', marginLeft:'210px'}} />
        <Button sx={{ marginTop:'10px', marginLeft:'210px', marginRight:'120px', width:'950px', backgroundColor:'gray', padding:'10px' }} variant="contained" color="primary">
          Select
        </Button>
      </div></>

  );
}

      

  
import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

interface RefractionData {
  name: string;
  mobileNumber: string;
  refractionNumber: string;
}

const data: RefractionData[] = [
  {
    name: "John Doe",
    mobileNumber: "123-456-7890",
    refractionNumber: "RF1234",
  },
  {
    name: "Jane Smith",
    mobileNumber: "987-654-3210",
    refractionNumber: "RF5678",
  },
  {
    name: "Sam Wilson",
    mobileNumber: "555-666-7777",
    refractionNumber: "RF91011",
  },
];

export default function RefractionDetails() {
  const theme = useTheme(); // Accessing MUI theme for dynamic styling

  // Determine the background color for the table header based on the current theme
  const headerBgColor =
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[200];

  return (
    <Box sx={{ padding: 2 }}>
      {/* Table Container */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflowX: "auto", // Ensures responsiveness on smaller screens
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="refraction details table">
          <TableHead>
            <TableRow sx={{ backgroundColor: headerBgColor }}>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                Mobile Number
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                Refraction Number
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.mobileNumber}</TableCell>
                <TableCell>{row.refractionNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
