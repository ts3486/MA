import * as actionTypes from "../actions/auth_actions"

//Return Errors

export const returnErrors = (msg: string, status: any, id: any = null) => {
    return{
        type: actionTypes.GET_ERRORS,
        payload: {msg, status, id}
    }
} 

export const clearErrors = () => {
    return{
        type: actionTypes.CLEAR_ERRORS,
    }
} 