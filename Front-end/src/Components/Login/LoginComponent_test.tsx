import React from "react";
import {connect} from "react-redux"
import { LoginWrapper } from "./LoginComponent_style";

interface Props {
    id?: string;
    name?: string;
    image?: string;
    desc?: string;
    likes?: number;
}

export const LoginComponent: React.FC<Props> = (Props) => {

   

    return(
        <LoginWrapper>
            <div className="supercontainer">
                <div className="container" id={Props.id} >
                    <form>
                        <h1>Login</h1>
                        <label>Username:</label>
                        <input type="text" placeholder="username"/>
                        <label>Password:</label>
                        <input type="text" placeholder="password"/>
                    </form>
                </div>
            </div>
        </LoginWrapper>
    )
 
}

const mapStateToProps = (state: any) => {
    return{
        isAutenticated: state.token !== null,
        //!== checks if the token is null. If it`S null, isAutenticated becomes false
    }
}

export default connect(mapStateToProps)(LoginComponent);
