import React, {useState} from "react";
import {connect} from "react-redux";
import * as actionTypes_auth from "../../store/actions/auth_actions";
import { TextField, Button, Card} from '@material-ui/core';
import {LoginWrapper} from "./LoginComponent_style";




const NormalLoginForm = (props: any) => {

const [email, setEmail] = useState();
const [password, setPassword] = useState();

const onSubmit = () => {
    props.login(email, password);

    props.history.push("/");
  };


  let errorMessage = null;
  if (props.error){
      errorMessage = (
          <p>{props.auth.error.message}</p>
      )
    }

  return (
        <LoginWrapper>
            <div className="topContainer">
                <Card className="loginContainer">
                    {errorMessage}
                    {/* {
                    props.isLoading ?  */}

                    <h1 className="header">Login</h1>
                    <TextField label="email" variant="outlined" required onChange={(e: any) => setEmail(e.target.value)}/>
                    <TextField label="password" variant="outlined" required onChange={(e: any) => setPassword(e.target.value)}/>
                
                    <Button id="submit" type="submit" variant="contained" onClick={onSubmit}>Login</Button>
                    {/* } */}
                </Card>   
            </div>
        </LoginWrapper>
  );
};



const mapStateToProps = (state: any) => {
    return{
        isLoading: state.auth.isLoading,
        isAuthenticated: state.auth.isAuthenticated,
        error: state.auth.error
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return{
        login: (email: string, password: string) => dispatch(actionTypes_auth.login({email, password}))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);