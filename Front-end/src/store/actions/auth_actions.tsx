import axios from "axios";
import {returnErrors} from "./error_actions";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

interface registrationData{
    username?: String,
    email: String,
    password: String,
}

//Register User
export const registerUser = ({username,email,password}: registrationData) => (dispatch: any) => {
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    //Request body
    const body = JSON.stringify({username,email,password});

    axios.post("http://localhost:5000/users/add", body, config)
        .then((res: any) => dispatch({
            type: REGISTER_SUCCESS,
            //send user and token data
            payload: res.data,
        }))
        .catch((err: any) => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
                type: REGISTER_FAIL,
            })
        }) 
}



//Check token & load user on reload
//call dispatch to make asynchronous requests
export const loadUser = () => (dispatch: any, getState: any) => {
    //User loading
    dispatch({type: USER_LOADING});

    axios.get("http://localhost:5000/auth/user", tokenConfig(getState)).then((res: any) => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })})
        .catch((err:any) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

//Login
export const login = ({email,password}: registrationData) => (dispatch: any) => {
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    //Request body
    const body = JSON.stringify({email,password});

    axios.post("http://localhost:5000/auth", body, config)
        .then((res: any) => dispatch({
            type: LOGIN_SUCCESS,
            //send user and token data
            payload: res.data,
        }))
        .catch((err: any) => {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
            dispatch({
                type: LOGIN_FAIL,
            })
        }) 
}


//Logout 

export const logout = () => {
    return{
        type: LOGOUT_SUCCESS
    }
} 




//Setup config/headers and token (authentication process)
export const tokenConfig = (getState: any)  => {
    
    //Get token from localStorage
    const token = getState().auth.token;

    //Set Headers
    const config: any = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //If token exists, add to headers
    if(token) {
        config.headers["x-auth-token"] = token;
    }

    //return the config
    return config;
}














//Django Auth
// import axios from "axios";

// export const AUTH_START = "AUTH_START";
// export const AUTH_SUCCESS = "AUTH_SUCESS";
// export const AUTH_FAIL = "AUTH_FAIL";
// export const AUTH_LOGOUT = "AUTH_LOGOUT";


// export const authStart = () => {
//     return {
//         type: AUTH_START,
//     }
// }

// export const authSuccess = (token: any) => {
//     return {
//         type: AUTH_SUCCESS,
//         token: token,
//     }
// }

// export const authFail = (error: any) => {
//     return {
//         type: AUTH_FAIL,
//         error: error,
//     }
// }

// //logout function. Removes and resets items in local storage
// export const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("expirationDate")
// }

// //To trigger logout after a certain period of time of inactivity
// export const checkAuthTimeout = (expirationTime: number) => {
//     return (dispatch: any) => {
//         setTimeout(()=> {
//             dispatch(logout());
//         }, expirationTime * 1000)
//     }
// }

// //Signup for first-timers
// export const authSignup = (email: string, username: string, password1: string | number, password2: string | number) => {
//     return (dispatch: any) => {
//         dispatch(authStart());
//         //post new user to server
//         axios.post("http://127.0.0.1:8000/rest-auth/registration", {
//             email: email,
//             username: username,
//             password1: password1,
//             password2: password2,
//         })
//         .then(res => {
//             //create a token for the new user
//             const token = res.data.key;
//             //create a timestamp for when tehy logged in
//             const newDate = new Date();
//             const expirationDate: any = new Date(newDate.getTime() + 3600*1000);
//             //store in local storage so refresh doesnt rest login status
//             localStorage.setItem("token", token);
//             localStorage.setItem("expirationDate", expirationDate);
//             dispatch(authSuccess(token));
//             dispatch(checkAuthTimeout(3600));
//         })
//         .catch(error => {
//             //handle errors with the authFail function
//             dispatch(authFail(error))
//         })
//     }
// }

// export const authLogin = (username: string, password: string | number) => {
//     // "() => async" having this infront of (dispatch: any) caused the function to not start　
//     return (dispatch: any) => {
//         //authStart makes "loading" true
//         console.log("Authentication started")
//         dispatch(authStart());
//         axios.post("http://127.0.0.1:8000/rest-auth/login/", {
//             username: username,
//             password: password
//         })
//         .then(res => {
//             const token = res.data.key;
//             const newDate = new Date();
//             const expirationDate: any = new Date(newDate.getTime() + 3600*1000);
//             localStorage.setItem("token", token);
//             localStorage.setItem("expirationDate", expirationDate);
//             console.log(token);
//             dispatch(authSuccess(token));
//             dispatch(checkAuthTimeout(3600));
//         })
//         .catch(error => {
//             dispatch(authFail(error))
//         })
//     }
// }

// export const authLogout = () => {
//     return {
//         type: AUTH_LOGOUT,
//     }
// }

// export const authCheckState = () => {
//     return () => async(dispatch: any) => {
//         const token = localStorage.getItem("token");
//         if (token === undefined){
//             dispatch(logout());
//         }
//         else {
//             const storageDate: any = localStorage.getItem("expirationDate")
//             const expirationDate: any = new Date(storageDate);
//             if (expirationDate <= new Date()){
//                 dispatch(logout());
//             }
//             else{
//                 dispatch(authSuccess(token));
//                 dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
//             }
//         }
//     }
// }

