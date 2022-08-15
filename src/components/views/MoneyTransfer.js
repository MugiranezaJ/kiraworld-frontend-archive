import React from 'react'
import { Container, Typography, Grid, TextField, Button, Alert, Box } from '@mui/material'
import MoneyTransfer from '../MoneyTransfer';

const TransferBox = () => {
    const [formData, setFormData] = React.useState({});
  
    // Handle fields change
    // const handleChange = input => e => {
    //     setFormData({ [input]: e.target.value });
    // }
  return (
    <Container  component="main" maxWidth="sm" style={{paddingTop:100}}>
      <Typography fontSize={24} fontWeight={'bolder'}> Send Money </Typography>
      <Typography fontSize={18}> Send your money anytime, anywhere around the globe. </Typography>
      <MoneyTransfer/>
    </Container>
  )
}

export default TransferBox

