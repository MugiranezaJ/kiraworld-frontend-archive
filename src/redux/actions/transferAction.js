import Axios from './AxiosConfig'
export const MONEY_TRANSFER = 'MONEY_TRANSFER';
export const TRANSFER_LOADING = 'TRANSFER_LOADING';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const CONFIRM_OTP_SUCCESS = 'CONFIRM_OTP_SUCCESS'
export const CONFIRM_OTP_LOADING = 'CONFIRM_OTP_LOADING'
export const CONFIRM_OTP_ERROR = 'CONFIRM_OTP_ERROR'

export const CONFIRM_PIN_SUCCESS = 'CONFIRM_PIN_SUCCESS'
export const CONFIRM_PIN_LOADING = 'CONFIRM_PIN_LOADING'
export const CONFIRM_PIN_ERROR = 'CONFIRM_PIN_ERROR'

export const transferAction = (transferData) => dispatch => {
    dispatch({ type: TRANSFER_LOADING });
    return Axios.post('/charge_card', transferData)
    .then((res) => {
        // localStorage.setItem('mechat_access_token',res.data.token);
        // console.log(res)
        if(typeof res.data == "string"){
            dispatch({
                type:MONEY_TRANSFER,
                error:res.data.otp
            })
        }else{
            dispatch({
                type: MONEY_TRANSFER,
                transfer: res.data
            })
        }
    })
    .catch(err=>{
        // console.log(err)
        if(err.message === 'Network Error'){
            dispatch({
                type: MONEY_TRANSFER,
                error: err.message
            })
        }
        if(err.response){
            dispatch({
                type: MONEY_TRANSFER,
                error: err.response.data.error
            })
        }
    });
}

export const otpVerifyAction = (payload) => dispatch => {
    console.log(payload)
    dispatch({ type: CONFIRM_OTP_LOADING });
    console.log("Loading OTP verify")
    return Axios.post('/validate_otp', payload)
    .then((res) => {
        console.log("Inside otp verify")
        // localStorage.setItem('mechat_access_token',res.data.token);
        // console.log(res)
        if(typeof res.data == "string"){
            dispatch({
                type:CONFIRM_OTP_ERROR,
                error:res.data
            })
        }else{
            dispatch({
                type: CONFIRM_OTP_SUCCESS,
                otp_response: res.data
            })
        }
    })
    .catch(err=>{
        console.log("inside otp veirfy error")
        console.log(err)
        if(err.message === 'Network Error'){
            dispatch({
                type: CONFIRM_OTP_ERROR,
                error: err.message
            })
        }
        if(err.response){
            dispatch({
                type: CONFIRM_OTP_ERROR,
                error: err.response.data.error
            })
        }
    });
}

export const pinVerifyAction = (payload) => dispatch => {
    dispatch({ type: CONFIRM_PIN_LOADING });
    return Axios.post('/validate_pin', payload)
    .then((res) => {
        // localStorage.setItem('mechat_access_token',res.data.token);
        // console.log(res)
        dispatch({
            type: CONFIRM_PIN_SUCCESS,
            transfer: res.data
        })
    })
    .catch(err=>{
        // console.log(err)
        if(err.message === 'Network Error'){
            dispatch({
                type: CONFIRM_PIN_ERROR,
                error: err.message
            })
        }
        if(err.response){
            dispatch({
                type: CONFIRM_PIN_ERROR,
                error: err.response.data.error
            })
        }
    });
}