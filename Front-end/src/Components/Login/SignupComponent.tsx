import React, {useState} from 'react';
import {connect} from "react-redux";
import * as actionTypes_auth from "../../store/actions/auth_actions";
import {TextField, Button, Card} from '@material-ui/core';
import {SignupWrapper} from "./SignupComponent_style";




const RegistrationForm = (props: any) => {


  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  //Submit registration data
  const onSubmit = () => {

    props.registerUser(username, email, password);

    props.history.push("/");
  };


 
  return (
    <SignupWrapper>
        <div className="topContainer">
          <Card className="signupContainer">
              <h1 className="header">Sign Up</h1>
              <TextField label="email" variant="outlined" required onChange={(e: any) => setUsername(e.target.value)}/>
              <TextField label="password" variant="outlined" required onChange={(e: any) => setPassword(e.target.value)}/>
              <TextField label="email" variant="outlined" required onChange={(e: any) => setEmail(e.target.value)}/>
          
              <Button id="submit" type="submit" variant="contained" onClick={onSubmit}>Login</Button>
          </Card>
        </div>
    </SignupWrapper>
  );
};

const mapStateToProps = (state: any) => {
    return{
        loading: state.auth.loading,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return{
      registerUser: (username:any, email:any, password:any) => dispatch(actionTypes_auth.registerUser({username, email, password}))
      // onAuth: (username: string, email: string, password1: any, password2: any) => dispatch(actionTypes_auth.authSignup(username, email, password1, password2)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

