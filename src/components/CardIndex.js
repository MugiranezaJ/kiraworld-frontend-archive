import React from "react";
import { render } from "react-dom";
import Card from "react-credit-cards";
import { connect } from 'react-redux'

import SupportedCards from "./Cards";
import { Container, Typography, Grid, TextField, Button, Alert, Box } from '@mui/material'

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils";
import styles from "./styles.css";

import "react-credit-cards/es/styles-compiled.css";
import { transferAction } from "../redux/actions/transferAction";

export class CardForm extends React.Component {
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
  Continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  Previous = e => {
    e.preventDefault();
    this.props.prevStep();
  }

  handleSubmit = e => {
    e.preventDefault();
    const {phoneNumber, destination_amount, amount, currency, tx_ref, account_number, account_bank, beneficiary_name, dest_bank, dest_medium} = this.props.values
    let expiry_month, expiry_year = ""
    const redirect_url = "https://www.google.com"
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});
      [expiry_month, expiry_year] = formData.expiry.split("/")
      const recipient_meta = {sender: "MugiranezaJ",sender_country: "RW",mobile_number: "+250780712835"}
      const momo_recipient = {account_number:phoneNumber, account_bank, beneficiary_name, amount:destination_amount, currency, meta:recipient_meta}
      const recipient = dest_medium === 'momo_wallet' ? momo_recipient : dest_bank
      this.props.setRecipient(recipient)

      const sender = {...formData, card_number:formData.number, fullname:formData.name, amount, expiry_month,expiry_year, redirect_url, currency, tx_ref}
      delete sender.name
      delete sender.number
      delete sender.expiry
      const payload = Object.assign({}, {sender: sender, recipient})
      // console.log(payload)
      this.props.makeTransfer(payload)

    this.setState({ formData });
    this.Continue()
    // this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
    console.log(this.props.values.dest_bank)
    if(this.props.money_transfer.success){
      this.props.nextStep();
    }
    // console.log(this.state)
    // console.log(this.props.money_transfer)
    console.log(this.props.values)

    return (
      <Container  
        component="main" 
        maxWidth="xs"
        style={{
          paddingTop: 60
        }}
        >
        <Box 
          key="Payment"
          boxShadow={3}
          style={{ padding: "10px 10px 20px", borderRadius:10 }}
        >
          <Typography  component="h1" variant="h5">
            Money Transfer
          </Typography>
          {/* <div className="App-payment"> */}
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />
            
            <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField 
                      type="tel"
                      name="number"
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
                <Grid item xs={12}>
                  <TextField 
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    fullWidth
                  />
                </Grid>
                 {/* last name */}
                <Grid item xs={12} sm={6}>
                  <TextField 
                    type="tel"
                    name="expiry"
                    className="form-control"
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      type="tel"
                      name="cvc"
                      className="form-control"
                      placeholder="CVC"
                      pattern="\d{3,4}"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                </Grid>
                {/* email */}
                <Grid item xs={12}>
                  <TextField 
                    placeholder="email"
                    label="email"
                    name="email"
                    defaultValue={this.props.values.email}
                    autoComplete="email"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    placeholder="Phone number"
                    label="Phone number"
                    name="phone_number"
                    autoComplete="PhoneNumber"
                    fullWidth
                  />
                </Grid>
                {this.props.money_transfer.error ? 
                  (<Grid item xs={12} >
                      <Alert severity="error">{this.props.money_transfer.error}</Alert>
                    </Grid>)
                    :
                    (<></>)
                  }
                {/* <input type="hidden" name="issuer" value={issuer} /> */}
                <Grid item xs={12} sm={6}>
                  <Button 
                    onClick={ this.Previous }
                    // type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Previous
                  </Button>
                </Grid>
                {this.props.money_transfer.success ? '':
                  (<Grid item xs={12} sm={6}>
                    <Button 
                      // onClick={ this.Continue }
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      {this.props.money_transfer.loading ? 'Loading...' : 'Charge'}
                    </Button>
                  </Grid>)}
                {this.props.money_transfer.success ? 
                  (<Grid item xs={12} sm={6}>
                    <Button 
                      onClick={ this.Continue }
                      // type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Next
                    </Button>
                  </Grid>)
                  :
                  ("")
                }
                {/* <div className="form-actions">
                  <button className="btn btn-primary btn-block">PAY</button>
                </div> */}
              </Grid>
            </form>
            
            {/* {formData && (
              <div className="App-highlight">
                {formatFormData(formData).map((d, i) => <div key={i}>{d}</div>)}
              </div>
            )} */}
          {/* </div> */}
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    ...state
  };
}
const mapDispatchToProps = (dispatch) =>{
  return {
    makeTransfer: (data) => {
      dispatch(transferAction(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
