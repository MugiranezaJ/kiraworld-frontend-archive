import React from "react";
import { Typography, Grid, TextField, Button, Alert, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils";
import styles from "./styles.css";

import "react-credit-cards/es/styles-compiled.css";

export class DestinationBankDetails extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  // for continue event listener
  Continue = () => {
    // e.preventDefault();
    this.props.nextStep();
  }

  Previous = e => {
    e.preventDefault();
    this.props.prevStep();
  }


  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
    const { handleAmountChange, values, handleChange, setDestBank} = this.props
    const handleSubmit = e => {
        e.preventDefault();
        const {phoneNumber, destination_amount, amount, currency, tx_ref, account_number, account_bank, beneficiary_name} = this.props.values
        const formData = [...e.target.elements]
          .filter(d => d.name)
          .reduce((acc, d) => {
            acc[d.name] = d.value;
            return acc;
          }, {});
          
        formData['meta'] = {sender: "MugiranezaJ",sender_country: "RW",mobile_number: "+250780712835"}
        this.setState({ formData });
        setDestBank(formData)
    
        console.log("......starting.......")
        console.log(formData)
        console.log("hellooo!..")
        // this.props.prevStep();
        this.Continue()
        // this.form.reset();
    };
    // console.log(this.state)
    // console.log(this.props.money_transfer)

    return (
        // <Box 
        //   key="Payment"
        //   boxShadow={3}
        //   style={{ padding: "10px 10px 20px", borderRadius:10 }}
        // >
            // <Typography  component="h1" variant="h5">
            //     Money Transfer
            // </Typography>
            <form ref={c => (this.form = c)} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} style={{marginTop:"30px"}}>
                    <FormControl fullWidth>
                        <InputLabel>Destination Bank</InputLabel>
                        <Select
                            // value={values.dest_medium}
                            name="account_bank"
                            label="Destination Bank"
                            onChange={handleChange('account_bank')}
                            // defaultValue={values.dest_medium}
                        >
                        <MenuItem value='044'>Access Bank</MenuItem>
                        <MenuItem value='232'>Sterling Bank</MenuItem>
                        {/* <MenuItem value='EUR'>EUR</MenuItem> */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                      type="tel"
                      name="account_number"
                      className="form-control"
                      placeholder="Card Number"
                      pattern="[\d| ]{16,22}"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                      fullWidth
                    />
                </Grid>
                 {/* last name */}
                 <input type='hidden' name='currency' value='EUR'/>
                <Grid item xs={12}>
                  <TextField 
                    type="text"
                    name="beneficiary_name"
                    className="form-control"
                    placeholder="Name"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
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
                    // defaultValue={values.amount}
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
                {/* <Typography variant='caption'>Amount are sent in RWF and received in EUR! plus charge</Typography> */}
                {/* <Grid item xs={12}>
                  <TextField 
                    placeholder="Phone number"
                    label="Phone number"
                    name="phone_number"
                    autoComplete="PhoneNumber"
                    fullWidth
                  />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                    <Button 
                        // onClick={ this.Continue }
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
    );
  }
}
