import * as actionTypes from "../actions/auth_actions"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const authReducer = (state: any = initialState, action: any) => {


    switch(action.type){
        case actionTypes.USER_LOADING:
            return{
              ...state,
              isLoading: true,
            };

        case actionTypes.USER_LOADED:
            return{
              ...state,
              isAuthenticated: true,
              isLoading: false,
              user: action.payload,
            };

        case actionTypes.LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return{
              ...state,
              //return token and user data
              ...action.payload,
              error: action.error,
              isAuthenticated: true,
              isLoading: false,
            };

        case actionTypes.REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return{
              ...state,
              //sending the entire payload (includes token and user)
              ...action.payload,
              isAuthenticated: true,
              isLoading: false,
            };
        
        case actionTypes.AUTH_ERROR:
        case actionTypes.LOGIN_FAIL:
        case actionTypes.LOGOUT_SUCCESS:
        case actionTypes.REGISTER_FAIL:
              localStorage.removeItem("token");
              return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
              };
              default:
                return state;
    } 
}


export default authReducer
