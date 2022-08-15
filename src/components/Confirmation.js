import React from 'react'
import { connect } from 'react-redux'
import { Container, Grid, List, ListItem, ListItemText, Button, Typography, TextField, Alert, Box, AlertTitle } from '@mui/material'
import { otpVerifyAction } from '../redux/actions/transferAction';

const Confirmation = ({ prevStep, nextStep, values, makeTransfer, money_transfer, verifyOTP, otp_verify }) => {
  console.log(values);
  const { recipient } = values
  // const payload = {
  //   account_number,
  //   account_bank,
  //   amount,
  //   narration,
  //   currency,
  //   beneficiary_name,
  //   reference,
  //   debitory_currency,
  //   meta:{
  //     first_name:firstName,
  //     last_name:lastName,
  //     email,
  //     mobile_number:phoneNumber,
  //     recipient_address:"kk 573 st, kigali, Rwanda"
  //   }
  // }
  const { data } = money_transfer.flw_response
  // const Continue = e => {
  //   e.preventDefault();
  //   // nextStep();
  //   makeTransfer(payload)
  // }

  // const Previous = e => {
  //   e.preventDefault();
  //   prevStep();
  // }
  const handleVerifySubmit = (e)=>{
    e.preventDefault()
    const formData = [...e.target.elements]
    
    .filter(d => d.name)
    .reduce((acc, d) => {
      acc[d.name] = d.value;
      return acc;
    }, {});
    formData['recipient'] = recipient
    console.log(formData)
    verifyOTP(formData)

  }
  console.log(money_transfer)
  console.log(otp_verify)
  const transaction_status = otp_verify.flw_otp_response ? otp_verify.flw_otp_response.otp.status : data.status
  const processor_response = otp_verify.flw_otp_response ? otp_verify.flw_otp_response.otp.data.processor_response : data.processor_response
  const isOTP = money_transfer.flw_response.meta.authorization.mode === 'otp' ? true : false
  const isOTPVerified = otp_verify.flw_otp_response && otp_verify.flw_otp_response.otp.status === "success" ? true : false

  return (
    <Container  
      component="main" 
      maxWidth="xs" 
      style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        // padding: "auto 0",
        // margin:'auto auto',
        minHeight: "100vh",
      }}
    >
      <Box 
        container 
        boxShadow={3}
        style={{ padding: "10px 10px 20px", borderRadius:5 }}
        >
        <Typography  component="h1" variant="h5">
          Money Transfer
        </Typography>
        <List>
          <ListItem key={'product'}>
            <ListItemText primary={data.customer.name} secondary={data.customer.email} />
            <Typography variant="body2">{data.customer.phone_number}</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="Narration" secondary={data.narration}/>
            <Typography variant="body2">{transaction_status}</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="Charged amount" secondary={data.amount}/>
            <Typography variant="body2">{data.currency}</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="Fraud status" secondary={data.tx_ref}/>
            <Typography variant="body2">{data.fraud_status}</Typography>
          </ListItem>
          <Alert variant="outlined" severity={isOTPVerified ? "success" : "warning"}>
            <AlertTitle>Processor Response</AlertTitle>
            <Typography style={{textAlign:"left"}}>{processor_response}</Typography>
          </Alert>
          <form onSubmit={handleVerifySubmit}>
            <Grid container spacing={2}>
              {/* phone number */}
              <input type='hidden' name='flw_ref' value={data.flw_ref}/>
              {isOTP ?
                (<Grid item xs={12}>
                  <TextField 
                    placeholder="otp"
                    label="OTP"
                    name='otp'
                    disabled = {isOTPVerified ? true : false}
                    // onChange={handleChange('phoneNumber')}
                    // autoComplete="PhoneNumber"
                    fullWidth
                  />
                </Grid>)
                :
                (<Grid item xs={12}>
                  <TextField 
                    placeholder="pin"
                    label="PIN"
                    name='pin'
                    // onChange={handleChange('phoneNumber')}
                    // autoComplete="PhoneNumber"
                    fullWidth
                  />
                </Grid>)
              }
              <Grid item xs={12} >
                <Button 
                  disabled = {isOTPVerified ? true : false}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  { otp_verify.loading ? "Loading..." : "Send"}
                </Button>
              </Grid>
              {/* {otp_verify.flw_otp_response ? 
                  (<Grid item xs={12} >
                    <Alert severity={isOTPVerified ? "success" : "error"}>{otp_verify.flw_otp_response.otp.message +"  -  "+  otp_verify.flw_otp_response.otp.status}</Alert>
                  </Grid>):<></>
              } */}
              {otp_verify.flw_otp_response ?
                  (<Grid item xs={12} >
                    <Alert severity={otp_verify.flw_otp_response.momo.status === 'success' ? "success" : "error"}>{otp_verify.flw_otp_response.momo.message}</Alert>
                  </Grid>):<></>
              }
            </Grid>
          </form>
          
        </List>

        <br />
        {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button 
              onClick={ Previous }
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Previous
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button 
              onClick={ Continue }
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Confirm & Continue
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
          </Grid>
        </Grid> */}
      </Box>
    </Container>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    ...state
  };
}
const mapDispatchToProps = (dispatch) =>{
  return {
    verifyOTP: (data) => {
      dispatch(otpVerifyAction(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
