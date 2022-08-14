import React from 'react'
import useGeoLocation from "react-ipgeolocation";
import { Container, Typography, Grid, TextField, Button, Box, Input, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { DestinationBankDetails } from './DestinationBankDetails';

const PersonalDetails = ({ nextStep, handleChange, setAmount, setDestinationAmount, handleAmountChange, values, setDestBank }) => {
  
  const Continue = e => {
    e.preventDefault();
    if(values.phoneNumber)
      nextStep();
    else
      console.log("phonenumber required")

  }
  const _handleAmountChange = (event) => {
    console.log("hello")
    let amount = event.target.value
    console.log("Amount: " + amount)
    amount = amount ? amount.match(/\d/g).join("") : 0
    console.log(amount)
    const destination_amount = Math.floor(amount*0.95) 
    setAmount(amount)
    setDestinationAmount(parseInt(destination_amount))
  }
  const checkNumber = ({target}) => {
    // const value = [...target].filter(e => {return parseInt(e) == e})
    // return item.match(/^-?\d+$/)
    console.log(target.value)
    console.log(target.value.match(/^-?\d+$/))
  }  

  // const Previous = e => {
  //   e.preventDefault();
  //   prevStep();
  // }
  // const location = useGeoLocation();
  // console.log("Location:...")
  console.log(values)
  // console.log(location.country);

  return (
    <Container
      component="main" 
      maxWidth="xs"
      style={{
        paddingTop: 60
      }}
      >
      <Box
        boxShadow={3}
        style={{ padding: "10px 10px 20px", borderRadius:10 }}
      >
        <Typography  component="h1" variant="h5">
          Money Transfer
        </Typography>
        <Grid item xs={12} style={{marginTop:"30px"}}>
              <FormControl fullWidth>
                <InputLabel>Destination Medium</InputLabel>
                <Select
                  value={values.dest_medium}
                  label="Destination Medium"
                  onChange={handleChange('dest_medium')}
                  // defaultValue={values.dest_medium}
                >
                  <MenuItem value='momo_wallet'>Mobile Money Wallet</MenuItem>
                  <MenuItem value='bank_wallet'>Bank Wallet</MenuItem>
                  {/* <MenuItem value='EUR'>EUR</MenuItem> */}
                </Select>
              </FormControl>
        </Grid>

        {values.dest_medium == 'momo_wallet' ? 
          (<form>
            <Grid container spacing={2}>
              {/* phone number */}
              <Grid item xs={12} >
                <TextField 
                  type='tel'
                  placeholder="Recipient phone number"
                  label="Recipient phone number"
                  onChange={handleChange('phoneNumber')}
                  defaultValue={values.phoneNumber}
                  // pattern="[a-z]"
                  // inputProps={{ pattern: "[a-z]" }}
                  // onInput={() => {this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}}
                  required
                  autoComplete="PhoneNumber"
                  fullWidth
                />
              </Grid>
              {/* amount */}
              <Grid item xs={12}>
                <TextField 
                  placeholder="Amount"
                  label="Amount"
                  name='amount'
                  onChange={handleAmountChange}
                  defaultValue={values.amount}
                  autoComplete="Amount"
                  fullWidth
                />
              </Grid>
              {/* amount */}
              <Grid item xs={12}>
                <TextField 
                  placeholder="Destination amount"
                  label="Destination amount"
                  // onChange={setDestinationAmount}
                  // defaultValue={values.amount}
                  value={values.destination_amount}
                  autoComplete="Amount"
                  fullWidth
                  disabled
                />
              </Grid>
              {/* <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    // value={values.currency}
                    label="Currency"
                    onChange={handleChange('currency')}
                  >
                    <MenuItem value='RWF'>RWF</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
              
              <Grid item xs={12} sm={6}>
                <Button 
                  onClick={ Continue }
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>)
          :
          <DestinationBankDetails handleAmountChange={handleAmountChange} values={values} nextStep={nextStep} handleChange={handleChange} setDestBank={setDestBank}/>
        }
      </Box>
    </Container>
  )
}

export default PersonalDetails

