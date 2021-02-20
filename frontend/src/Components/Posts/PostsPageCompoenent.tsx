import React, {useState} from "react";
import Modal from "react-modal";
import PostComponent from "./PostComponent";
import FormComponent from "../Forms/FormComponent";
import {PostsPageWrapper} from "./PostsPageComponent_style";
import {connect} from "react-redux";
import {Button} from "@material-ui/core";

export const PostsPageComponent = (props: any) => {

    const [modalIsOpen, setModalState] = useState(false);

    return(
        <PostsPageWrapper>
            <div>
                <div className="container">
                    <h1 className="siteTitle">Music Accelerator</h1>
                    {props.posts.map((post: any, key: any) => {
                        return <PostComponent key={post._id} id= {post._id} username={post.username} filename={post.filename} description={post.description} likes={post.likes}/>   
                    })}      
                </div>

                {props.isAuthenticated ? 
                <div className="formContainer">
                    {/* must receive the click event first for a button onClick function */}
                    <Button variant="contained" color="primary" onClick={(e) => setModalState(true)}> Add Post </Button>
                    <Modal isOpen={modalIsOpen} onRequestClose={() => setModalState(false)} ariaHideApp={false}>
                        <FormComponent/> 
                    </Modal>
                </div>
                : null
                }
            </div>
        </PostsPageWrapper>
    )

}

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
  
  export default connect(mapStateToProps)(PostsPageComponent);