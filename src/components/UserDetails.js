import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import { Container, Typography, Grid, TextField, Button } from '@material-ui/core'
import { Container,Typography ,Grid, TextField, Button } from '@mui/material'

const UserDetails = ({ prevStep, nextStep, handleChange, values }) => {
  
  // for continue event listener
  const Continue = e => {
    e.preventDefault();
    nextStep();
  }
  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  return (
    <Container  component="main" maxWidth="xs">
      <div>
        <Typography  component="h1" variant="h5">
          Money Transfer
        </Typography>
        <form>
          <Grid container spacing={2}>
              {/* Account Bank */}
              <Grid item xs={12}>
                <TextField 
                  placeholder="Account Bank"
                  label="Account Bank"
                  onChange={handleChange('account_bank')}
                  defaultValue={values.account_bank}
                  // variant="outlined"
                  autoComplete="Account Bank"
                  fullWidth
                />
              </Grid>
              <br />
              {/* Account Number */}
              <Grid item xs={12}>
                <TextField 
                  placeholder="Account Number"
                  label="Account Number"
                  onChange={handleChange('account_number')}
                  defaultValue={values.account_number}
                  // variant="outlined"
                  autoComplete="Account Number"
                  fullWidth
                />
              </Grid>
              <br />
              {/* Amount */}
              <Grid item xs={12}>
                <TextField 
                  placeholder="Amount"
                  label="Amount"
                  onChange={handleChange('amount')}
                  defaultValue={values.amount}
                  // variant="outlined"
                  autoComplete="Amount"
                  fullWidth
                />
              </Grid>
              <br />
              {/* Narration */}
              <Grid item xs={12}>
                <TextField 
                  placeholder="Narration"
                  label="Narration"
                  onChange={handleChange('narration')}
                  defaultValue={values.narration}
                  // variant="outlined"
                  autoComplete="arration"
                  fullWidth
                />
              </Grid>
              <br />
              {/* Beneficiary Name */}
              <Grid item xs={12}>
                <TextField 
                  placeholder="beneficiary_name"
                  label="Beneficiary Name"
                  onChange={handleChange('beneficiary_name')}
                  defaultValue={values.beneficiary_name}
                  // variant="outlined"
                  autoComplete="Beneficiary Name"
                  fullWidth
                />
              </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
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
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default UserDetails
