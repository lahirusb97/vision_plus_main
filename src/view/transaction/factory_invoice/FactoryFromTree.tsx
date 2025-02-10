import React from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'

export default function FactoryFromTree({handleNext,handleBack,register,errors}) {
  return (
    <div>FactoryFromTwo

       <Box sx={{display:"flex",justifyContent:'end',gap:2}}>
     <Button onClick={handleBack} variant='contained' >Back</Button>
     <Button  variant='contained'>Submite</Button>
      </Box>
    </div>
  )
}
