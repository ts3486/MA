import React, {Component} from "react"
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from "react-redux";
import * as actionTypes_posts from "./store/actions/post_actions";
import * as actionTypes_auth from "./store/actions/auth_actions";
import * as actionTypes_user from "./store/actions/user_actions";
import PostsPageComponent from "./Components/Posts/PostsPageCompoenent";
import LoginComponent from "./Components/Login/LoginComponent";
import SignupComponent from "./Components/Login/SignupComponent";
import NavComponent from "./Components/Navbar/NavComponent";
import ProfileComponent from "./Components/User/ProfileComponent";


class App extends Component<any> {


//use "async" so that componentDidMount() is ran first. Async functions allow promise based processing (functions perfomed in order and after each task is done)          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  async componentDidMount(){

    await this.props.loadUser();
    await this.props.fetchPosts();
    await this.props.awaitData();

  };
  
  async componentDidUpdate(prevProps: any){

    if(await this.props.user !== prevProps.user) {
      this.props.countTotalLikes(this.props.user.username);
    };
  }

  render(){
      return (

        <div className="App">
          <BrowserRouter>
              <Route component={NavComponent}/>
          {/* Pages */}
            <Switch>
              <Route exact={true} path="/" component={PostsPageComponent}/> 
              <Route exact={true} path="/login" component={LoginComponent}/>
              <Route exact={true} path="/signup" component={SignupComponent}/>
              <Route exact={true} path="/profile/:username" component={ProfileComponent}/>
            </Switch>
          </BrowserRouter>
        </div> 
      );
  }
}

//directs how the state managed by redux will be mapped to state here. Makes data from store available to component
const mapStateToProps = (state: any) => {
  return {
      text: state.posts.text,
      posts: state.posts.posts,
      data: state.posts.data,
      image: state.posts.images,
      //checks if user token is null (looged in or not)   if state.auth.token is other than null, it returns true
      isAuthenticated: state.auth.token !== null,
      user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return{
      fetchPosts: () => dispatch(actionTypes_posts.fetchPosts()),
      awaitData: () => dispatch(actionTypes_posts.awaitData()),
      loadUser: () => dispatch(actionTypes_auth.loadUser()),
      countTotalLikes: (username: string) => dispatch(actionTypes_user.countTotalLikes(username)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



//Current Tasks
//1. implement the graduation system.
//2. add postsLiked to user data.  
//3. Design


//Improvement Tasks
//1. Goal: Make the object id of post and upload.file same. 
//2. Make the like button reflect fast consecutive clicks (post requests)


//Design
//1. Website Title Font
//2. Post Cards, button placement&design
//3. Profile Page