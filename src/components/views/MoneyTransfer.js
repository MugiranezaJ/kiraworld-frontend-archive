import React from 'react'
import { Container, Typography, Grid, TextField, Button } from '@material-ui/core'

const PersonalDetails = () => {
    const [formData, setFormData] = React.useState({});
  
    // Handle fields change
    const handleChange = input => e => {
        setFormData({ [input]: e.target.value });
    }
  return (
    <Container  component="main" maxWidth="xs">
      <div>
        <Typography  component="h1" variant="h5">
          Send Money
        </Typography>
        <form>
          <Grid container spacing={2}>

            {/* first name */}
            <Grid item xs={12} sm={6}>
              <TextField 
                placeholder="First Name"
                label="First Name"
                onChange={handleChange('firstName')}
                defaultValue={formData.firstName}
              />
            </Grid>
            {/* last name */}
            <Grid item xs={12} sm={6}>
              <TextField 
                placeholder="Last Name"
                label="Last Name"
                onChange={handleChange('lastName')}
                defaultValue={formData.lastName}
              />
            </Grid>

            {/* email */}
            <Grid item xs={12}>
              <TextField 
                placeholder="email"
                label="email"
                onChange={handleChange('email')}
                defaultValue={formData.email}
                autoComplete="email"
                fullWidth
              />
            </Grid>

            {/* phone number */}
            <Grid item xs={12}>
              <TextField 
                placeholder="Phone number"
                label="Phone number"
                onChange={handleChange('phoneNumber')}
                defaultValue={formData.phoneNumber}
                autoComplete="PhoneNumber"
                fullWidth
              />
            </Grid>
            {/* amount */}
            <Grid item xs={12}>
              <TextField 
                placeholder="Amount"
                label="Amount"
                onChange={handleChange('amount')}
                defaultValue={formData.amount}
                autoComplete="Amount"
                fullWidth
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <Button 
                onClick={ Previous }
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Previous
              </Button>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <Button 
                // onClick={ Continue }
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

export default PersonalDetails

