import * as actionTypes from "../actions/auth_actions"

const initialState = {
  msg: {},
  status: null,
  id: null,
};

const errorReducer = (state: any = initialState, action: any) => {


    switch(action.type){
        case actionTypes.GET_ERRORS:
            return{
              msg: action.payload.msg,
              status: action.payload.status,
              id: action.payload.id
            };

        case actionTypes.CLEAR_ERRORS:
            return{
                msg: {},
                status: null,
                id: null
            };
        default:
            return state;
    } 
}


export default errorReducer
