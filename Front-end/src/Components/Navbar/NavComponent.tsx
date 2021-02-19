import React from "react";
// , useState, useEffect
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {connect} from "react-redux";
import * as actionTypes_auth from "../../store/actions/auth_actions";


export const NavComponent: React.FC = (props: any) => {

    return(

 
        <Navbar id="nav" bg="light" expand="lg">
            <Navbar.Brand href="#home">MA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                {/* {isAuthenticated ? authLinks : guestLinks} */}
                {props.isAuthenticated ?
                <Button id="login" onClick={props.logout} href="/login">Logout</Button>
                :
                <Button id="login" href="/login">Login</Button>
                }
            </Form>
            </Navbar.Collapse>
        </Navbar>

    )

}

//directs how the state managed by redux will be mapped to state here. Makes data from store available to component
const mapStateToProps = (state: any) => {
    return {
        //checks if user token is null (looged in or not)   if state.auth.token is other than null, it returns true
        isAuthenticated: state.auth.isAuthenticated
    };
  };
  
  const mapDispatchToProps = (dispatch: any) => {
    return{
        logout: () => dispatch(actionTypes_auth.logout()),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NavComponent);


  //Reason why I couldn`t get the login/logout button to switch was because I was calling the logout() funtion in the button.
  //This caused the function to be called while render, and every time it rendered, 
  //causing the "Cannot update a component (`xxx`) while rendering a different component (`xxx`)"
  //Basically, what was happening was that while navComponent was rendering it called a function to update App.tsx. 
  //By just referring to the component, a function is not called while rendering and will not update App.