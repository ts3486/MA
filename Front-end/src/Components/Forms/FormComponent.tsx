import React, {useState} from "react"
import {connect} from "react-redux";
import {FormWrapper} from "./FormComponent_style"
import axios from "axios";
import { TextField, Button } from '@material-ui/core';

interface Props{

}

export const FormComponent: React.FC<Props> = (props: any) => {

    const [filename, setFilename] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDesc] = useState("");

    const postHandler = (e: any) => {
        e.preventDefault();

        const postData = {
            username: props.user.username,
            filename: filename,
            description: description,
            likes: "",
            date: new Date(),
        }

        //form data can only be called once in one form?
        const imageData: any = new FormData();


        imageData.append("image", image)
          
        axios.post("http://localhost:5000/posts/add", postData).then(response => {
          console.log(response, "Post added!"); 
          }).catch(error => console.log(error))

        axios.post("http://localhost:5000/posts/add/image", imageData).then(response => {
            console.log(imageData);
            console.log(response, "Image added!");
        }).catch( error => console.log(error))
        .then(() => window.location.reload())
      }

    return(
    
    <FormWrapper>
            <form className="postForm" action="/upload">

                <div className="container">

                    <h1 className="formTitle">Post your content!</h1>
                    
                    <Button>
                        <input
                        type="file"
                        name="image"
                        id="input"
                        formEncType="multipart/form-data"
                        onChange={(e: any) => {setImage(e.target.files[0]); setFilename(e.target.files[0].name); }}
                        required
                        />
                    </Button>    
                    <br /><br />
                    <TextField id="standared-basic" label="Description" variant="outlined" fullWidth multiline rows={6}>
                        <input
                        type="text"
                        name="description"
                        id="input"
                        value={description}
                        onChange={(e)=> setDesc(e.target.value)}
                        required/>
                    </TextField>
                    <br/><br/>
                    
                    {/* don`t call the function at the spot, because you won`t get the e and it become asynchronous. onClick passes 
                    the click event to postHandler using the reference. Also dont use onSubmit on a button, it`s for a form, 
                    Just use a callback (reference) to refer to the function defined.   */}
                    <Button id="submit" type="submit" variant="contained" onClick={postHandler}>Submit</Button>
                </div>    
            </form>
    </FormWrapper>
    )
}

const mapStateToProps = (state: any) => {
    return{
        user: state.auth.user,
        loggedIn: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps)(FormComponent);

