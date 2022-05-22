import {TRANSFER_LOADING, MONEY_TRANSFER, CLOSE_SNACKBAR, CONFIRM_OTP_LOADING, CONFIRM_OTP_SUCCESS, CONFIRM_OTP_ERROR} from '../actions/transferAction';

const initialState ={
    loading: false,
    success: false,
    snackBarMessage: false,
    error: '',
}

const otpIntialState = {
    loading: false,
    success: false,
    error:''
}
export const transferReducer = (state = initialState, action) =>{
    // console.log(action)
    switch (action.type) {
        case MONEY_TRANSFER:
            if(action.error){
                return {
                    ...state,
                    loading: false,
                    success: false,
                    snackBarMessage: true,
                    error: action.error
                }
            }
            return {
                ...state,
                loading: false,
                success: true,
                flw_response: action.transfer
            }
        case TRANSFER_LOADING:
            return {
                ...state,
                loading: true,
                snackBarMessage: false
            }
        default:
            return state;
    }

}

export const verifyOTPReducer = (state = otpIntialState, action) => {
    switch(action.type){
        case CONFIRM_OTP_LOADING:
            return {
                ...state,
                loading:true,
            }
        case CONFIRM_OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                flw_otp_response: action.otp_response
            }
        case CONFIRM_OTP_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                errorr: action.error
            }
        default:
            return state
    }
}