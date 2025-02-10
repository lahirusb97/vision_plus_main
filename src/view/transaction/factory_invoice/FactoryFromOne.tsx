<<<<<<< HEAD
import React from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import theme from '../../../theme/theme'
import { useLocation } from 'react-router';
import HbRxInput from '../../../components/inputui/HbRxInput';

import InputLeftRight from '../../../components/inputui/InputLeftRight';
import EyeTestTable from '../../../components/EyeTestTable';
import CustomInputWithLabel from '../../../components/inputui/CustomInputWithLabel';
import CustomInput from '../../../components/inputui/CustomInput';

export default function FactoryFromOne({register,errors,handleBack,handleNext}) {
  const location = useLocation();
  const { customerName, mobileNumber ,date} = location.state || {customerName:"",mobileNumber:"",date:""};

  
  return (
    <div>
      <Box sx={{display:"flex",justifyContent:'end'}}>
      <CustomInput
          {...register("staff_code")}
          placeholder="Staff Code"
          type="text"
          error={errors?.staff_code?.message}
        />
      </Box>
      <Paper variant="outlined"  sx={{display:"flex",justifyContent:"space-between",marginY:3,p:2,backgroundColor:'skyblue',gap:2}}>
       <Paper sx={{ display: "flex", alignItems: "center", textAlign: "right", }}>
        <Typography  sx={{width:"200px",color:'white',backgroundColor: theme.palette.primary.contrastText,padding:'.4rem',borderRadius:1}}>Customer Name</Typography>
        <Typography align="left"  sx={{marginLeft:"20px",width:"200px"}}>{customerName}</Typography>
        </Paper >
        <Paper sx={{ display: "flex", alignItems: "center", textAlign: "right" }}>
        <Typography  sx={{width:"150px",color:'white',backgroundColor: theme.palette.primary.contrastText,padding:'.4rem',borderRadius:1}}>Mobile Number</Typography>
        <Typography align="left" sx={{marginLeft:"20px",width:"200px"}}>{mobileNumber}</Typography>
        </Paper >
        <Paper sx={{ display: "flex", alignItems: "center", textAlign: "right" }}>
        <Typography  sx={{width:"100px",color:'white',backgroundColor: theme.palette.primary.contrastText,padding:'.4rem',borderRadius:1}}>Date</Typography>
        <Typography align="left" sx={{marginLeft:"20px",width:"100px"}}>{date}</Typography>
        </Paper >
       </Paper>
    
        <HbRxInput register={register} errors={errors} />
        <InputLeftRight
          register={register}
          errors={errors}
          inputOneName="auto_ref_right"
          inputTwoName="auto_ref_left"
          labelName="Auto Ref"
         />
      <EyeTestTable errors={errors} register={register} />
     <div style={{width:'600px'}}>
     <CustomInputWithLabel
        error={errors?.remark?.message} 
        {...register("remark")}
        label="Remark"
        placeholder="Enter value1"
        type="text"
        fullWidth/>
     </div>
     <Box sx={{display:"flex",justifyContent:'end',gap:2}}>
     <Button onClick={handleBack} variant='contained' >Back</Button>
     <Button onClick={handleNext} variant='contained'>Next</Button>
      </Box>
    </div>
  )
=======
import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import theme from "../../../theme/theme";
import { useLocation } from "react-router";
import HbRxInput from "../../../components/inputui/HbRxInput";

import InputLeftRight from "../../../components/inputui/InputLeftRight";
import EyeTestTable from "../../../components/EyeTestTable";
import CustomInputWithLabel from "../../../components/inputui/CustomInputWithLabel";
import CustomInput from "../../../components/inputui/CustomInput";
import { useFormContext } from "react-hook-form";

export default function FactoryFromOne({ handleBack, handleNext }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const location = useLocation();
  const { customerName, mobileNumber, date } = location.state || {
    customerName: "",
    mobileNumber: "",
    date: "",
  };

  return (
    <div>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }}>
        <CustomInput
          {...register("staff_code")}
          placeholder="Staff Code"
          type="text"
          error={errors?.staff_code?.message as string}
        />
      </Box>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginY: 3,
          p: 2,
          backgroundColor: "skyblue",
          gap: 2,
        }}
      >
        <Paper
          sx={{ display: "flex", alignItems: "center", textAlign: "right" }}
        >
          <Typography
            sx={{
              width: "200px",
              color: "white",
              backgroundColor: theme.palette.primary.contrastText,
              padding: ".4rem",
              borderRadius: 1,
            }}
          >
            Customer Name
          </Typography>
          <Typography align="left" sx={{ marginLeft: "20px", width: "200px" }}>
            {customerName}
          </Typography>
        </Paper>
        <Paper
          sx={{ display: "flex", alignItems: "center", textAlign: "right" }}
        >
          <Typography
            sx={{
              width: "150px",
              color: "white",
              backgroundColor: theme.palette.primary.contrastText,
              padding: ".4rem",
              borderRadius: 1,
            }}
          >
            Mobile Number
          </Typography>
          <Typography align="left" sx={{ marginLeft: "20px", width: "200px" }}>
            {mobileNumber}
          </Typography>
        </Paper>
        <Paper
          sx={{ display: "flex", alignItems: "center", textAlign: "right" }}
        >
          <Typography
            sx={{
              width: "100px",
              color: "white",
              backgroundColor: theme.palette.primary.contrastText,
              padding: ".4rem",
              borderRadius: 1,
            }}
          >
            Date
          </Typography>
          <Typography align="left" sx={{ marginLeft: "20px", width: "100px" }}>
            {date}
          </Typography>
        </Paper>
      </Paper>

      <HbRxInput register={register} errors={errors} />
      <InputLeftRight
        register={register}
        errors={errors}
        inputOneName="auto_ref_right"
        inputTwoName="auto_ref_left"
        labelName="Auto Ref"
      />
      <EyeTestTable errors={errors} register={register} />
      <div style={{ width: "600px" }}>
        <CustomInputWithLabel
          error={errors?.remark?.message as string}
          {...register("remark")}
          label="Remark"
          placeholder="Enter value1"
          type="text"
          fullWidth
        />
      </div>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
        <Button onClick={handleBack} variant="contained">
          Back
        </Button>
        <Button onClick={handleNext} variant="contained">
          Next
        </Button>
      </Box>
    </div>
  );
>>>>>>> 4dec26e71241c34e418248b16da266c27d69a204
}
