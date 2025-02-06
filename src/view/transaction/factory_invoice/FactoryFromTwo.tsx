import React, { useEffect } from 'react'
import {  Input, Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  TextField,} from '@mui/material'
import { useLocation } from 'react-router';
import theme from '../../../theme/theme';
import { Padding } from '@mui/icons-material';
import { Controller } from 'react-hook-form';
import useGetBrands from '../../../hooks/lense/useGetBrand';
import DropdownInput from '../../../components/inputui/DropdownInput';
import useGetCodes from '../../../hooks/lense/useGetCode';
import useGetColors from '../../../hooks/lense/useGetColors';
interface dataList {
  id: number;
  name: string;
  brand: number;
}
export default function FactoryFromTwo({handleNext,handleBack,register,errors,control}) {
  const location = useLocation();
  const { customerName, mobileNumber ,date} = location.state || {customerName:"",mobileNumber:"",date:""};
  const { brands, brandsLoading, brandsError } = useGetBrands();
  const { codes, codesLoading, codesError } = useGetCodes();
  const { colors, colorsLoading, colorsError } = useGetColors();
  const [brandID, setBrandID] = React.useState<number | null>(null);
  const [avilableCodes, setAvilableCodes] = React.useState<dataList[]>([]);
  
    useEffect(() => {
      if (brandID) {
        setAvilableCodes(codes.filter((item) => item.brand === brandID));
      } else {
        setAvilableCodes([]);
      }
    }, [brandID]);
  
  return (
    <div>
      <Box sx={{maxWidth:"1200px",minWidth:"1000px",marginY:3,p:2}}>
       <Paper variant='outlined' sx={{ display: "flex",flexDirection:"column", alignItems: "center", textAlign: "right",gap:2 ,p:2,backgroundColor:'skyblue'}}>
        <Paper variant='outlined' sx={{display:"flex",gap:2,justifyContent:"space-between",width:"100%",p:0.5,alignItems:'center'}}>
        <Typography>Customer Name</Typography>
        <Input error={errors} sx={inputStyle} {...register("customer_name")} />
        </Paper>
        <Paper variant='outlined' sx={{display:"flex",gap:2,justifyContent:"space-between",width:"100%",p:0.5,alignItems:'center'}}>
        <Typography>Address</Typography>
        <Input error={errors} sx={inputStyle} {...register("customer_address")} />
        </Paper>
        <Paper variant='outlined' sx={{display:"flex",gap:2,justifyContent:"space-between",width:"100%",p:0.5,alignItems:'center'}}>
        <Typography>Contact No.</Typography>
        <Input error={errors} sx={inputStyle} {...register("customer_mobile")} />
        </Paper>
        <Paper variant='outlined' sx={{display:"flex",gap:2,justifyContent:"space-between",width:"100%",p:0.5,alignItems:'center'}}>
        <Typography>Age</Typography>
        <Input error={errors} sx={inputStyle} {...register("customer_age")} />
        </Paper>
      </Paper >
        
       </Box>
       <Box sx={{display:"flex",justifyContent:'end',marginY:3,gap:2}}>
       
            <DropdownInput
              options={brands}
              onChange={(id) => setBrandID(id)}
              loading={brandsLoading}
              labelName="Select Brand"
              defaultId={null}
            />

         <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <DropdownInput
              {...field}
              options={avilableCodes}
              onChange={(selectedId) => field.onChange(selectedId)}
              loading={codesLoading}
              labelName="Select Code"
              defaultId={ null}
            />
          )}
        />
        {/* Color Dropdown */}
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <DropdownInput
              {...field}
              options={colors}
              onChange={(selectedId) => field.onChange(selectedId)}
              loading={colorsLoading}
              labelName="Select Color"
              defaultId={null}

            />
          )}
        />
            <Controller
          name="size"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.size}>
              <InputLabel id="demo-simple-select-label">Shape</InputLabel>
              <Select
              
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Shape"
                value={field.value || ""}
              >
                <MenuItem value={"Half"}>Half</MenuItem>
                <MenuItem value={"Full"}>Full</MenuItem>
                <MenuItem value={"Rimless"}>Rimless</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        {/* Species Dropdown */}
        <Controller
          name="species"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.species}>
              <InputLabel id="demo-simple-select-label">Species</InputLabel>
              <Select
                {...field}
              
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="species"
                value={field.value || ""}

              >
                <MenuItem value={"Metal"}>Metal</MenuItem>
                <MenuItem value={"Plastic"}>Plastic</MenuItem>
                <MenuItem value={"Metal/Plastic"}>Metal/Plastic</MenuItem>
              </Select>
            </FormControl>
          )}
        /> 
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.price}
          helperText={errors.price?.message}
          {...register('price', {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
        />
       </Box>

       <Box sx={{display:"flex",justifyContent:'end',gap:2}}>
     <Button onClick={handleBack} variant='contained' >Back</Button>
     <Button onClick={handleNext} variant='contained'>Next</Button>
      </Box>
    </div>
  )
}
const inputStyle = {
    width: "300px",
    borderTop:'1px solid black',
    borderLeft:'1px solid black',
    borderRight:'1px solid black',
    padding:'0 0.4rem',
  };