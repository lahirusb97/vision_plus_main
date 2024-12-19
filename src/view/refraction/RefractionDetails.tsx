import { Padding } from '@mui/icons-material';
import React from 'react';

const TableComponent = () => {
  return (
    <div className="table-container" style={{ margin: '20px',}}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
 <thead>
          <tr style={{ backgroundColor: '#cce7ff', textAlign: 'center' }}>
            <th style={styles.headerCell}>Name</th>
            <th style={styles.headerCell}>Phone Number</th>
            <th style={styles.headerCell}>Refraction Number</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(12)].map((_, index) => (
            <tr
              key={index}
              style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
            >
              <td style={styles.cell}></td>
              <td style={styles.cell}></td>
              <td style={styles.cell}></td>
            </tr>
          ))}
        </tbody>
      </table>
       

       <div style={styles.loginContainer}>
         <p style={styles.loginText}>Testing user login</p>
         <input
           type="password"
           placeholder="*******"
           style={styles.inputBox}
         />
        
       </div>
  <button style={styles.button}>Select</button>
    </div>
  );
};

const styles = {
  textAlign: 'center',
  headerCell: {
    padding: '10px',
    fontWeight: 'bold',
    border: '2px solid black',
    justifyContent:'center',

  },
  rowEven: {
    backgroundColor: '#cce7ff',
    border: '2px solid black',
  },
  rowOdd: {
    backgroundColor: '#cce7ff',
    border: '2px solid black',
  },
  cell: {
    padding: '10px',
    borderBottom: '2px solidrgb(210, 224, 236)',
    border: '2px solid black',
  },
   loginContainer: {
    marginTop: '30px',
    textAlign: 'center',
    backgroundColor:'#cce7ff',
    border:'2px solid black',
    padding:'20px',
   },

 loginText: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    
  },
  inputBox: {
    padding: '10px',
    width: '1000px',
    height:'10px',
    marginBottom: '10px',
    border: '2px solid black',
    borderRadius: '2px',
    PaddingLeft:'50px',
    paddingRight: '50px',
    

  },

  button: {
    padding: '20px 20px ',
    backgroundColor: 'gray',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
    paddingTop:'1px',
    paddingBottom:'1px',
    marginTop:'30px',
    width:'1300px',
    height:'25px',
    textAlign:'center',

  },
};


export default TableComponent;
      

  