import React, { Component } from 'react'
import UserDetails from './UserDetails'
import PersonalDetails from './PersonalDetails'
import CardIndex from './CardIndex'
import Confirmation from './Confirmation'
import Success from './Success'
import { connect } from 'react-redux'
import { transferAction } from '../redux/actions/transferAction'

export class MoneyTransferForm extends Component {

  state = {
    step: 1,
    recipient: '',
    destination_amount: 0,
    email: '',
    account_number: '',
    amount: '',
    dest_medium:'momo_wallet',
    // account_number:'',
    // narration:'',
    currency:'RWF',
    account_bank:"MPS",
    dest_bank:{
      account_bank: "",
      account_number: "",
      amount: 0,
      currency: "",
      beneficiary_name: "",
      meta: {
          sender: "",
          sender_country: "",
          mobile_number: ""
      }
    },
    beneficiary_name: "M Jackson",
    tx_ref: ('KZWRLD_'+ Date.now()),
    // debitory_currency:'RWF'
  }

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }
  setRecipient = recipient => {
    this.setState({recipient})
  }
  setDestinationAmount = destination_amount => {
    this.setState({destination_amount})
  }
  setAmount = amount => {
    this.setState({amount})
  }
  handleAmountChange = (event) => {
    console.log("hello")
    let amount = event.target.value
    console.log("Amount: " + amount)
    amount = amount ? amount.match(/\d/g).join("") : 0
    console.log(amount)
    const destination_amount = Math.floor(amount*0.95*0.00092)
    this.setAmount(amount)
    this.setDestinationAmount(parseInt(destination_amount))
  }
  setDestBank = dest_bank => {
    this.setState({dest_bank})
  }

  render() {
    const { step } = this.state;
    const { firstName, lastName, email, phoneNumber, amount, account_bank, account_number, narration, currency, beneficiary_name, reference, debitory_currency, tx_ref, recipient, destination_amount, dest_medium, dest_bank} = this.state;
    // const _values = { email, username, password, firstName, lastName, country, levelOfEducation }
    const values = {firstName, lastName, email, phoneNumber, amount, account_bank, account_number, narration, currency, beneficiary_name, reference, debitory_currency, tx_ref, recipient, destination_amount, dest_medium, dest_bank}
    switch(step) {
      case 1: 
        return (
          <PersonalDetails 
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            setAmount={ this.setAmount }
            setDestinationAmount={ this.setDestinationAmount }
            handleAmountChange={ this.handleAmountChange }
            setDestBank={ this.setDestBank }
            values={ values }
          />
        )
      case 2:
        return (
          <CardIndex
          prevStep={ this.prevStep }
          nextStep={ this.nextStep }
          handleChange={ this.handleChange }
          setRecipient={ this.setRecipient }
          values={ values }
          />
        )
      // case 2: 
      //   return (
      //     <UserDetails 
      //       prevStep={ this.prevStep }
      //       nextStep={ this.nextStep }
      //       handleChange={ this.handleChange }
      //       values={ values }
      //     />
      //   )
      case 3: 
          return (
            <Confirmation 
              prevStep={ this.prevStep }
              nextStep={ this.nextStep }
              values={ values }
              makeTransfer={ this.props.makeTransfer }
            />
          )
        case 4: 
          return (
            <Success />
          )
      default: 
          // do nothing
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(MoneyTransferForm);