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
        <TextField sx={{ marginBottom:'30px' }}
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

      

  