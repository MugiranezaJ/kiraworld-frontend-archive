import { combineReducers } from 'redux'
import { transferReducer, verifyOTPReducer } from './transferReducer'


const reducers = combineReducers({
    money_transfer: transferReducer,
    otp_verify: verifyOTPReducer
})

export default reducers