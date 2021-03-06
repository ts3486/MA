import styled from "styled-components";

export const PostWrapper = styled.div`

    .post_container {
        display:flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        align-content: center;
        width: 605px;
        height: 1100px;
        margin-bottom: 40px;
    }

    h1 {
        margin: 10px;
    }

    .username {
        font-weight: bold;
    }

    .image {
        width: 600px;
        height: 800px;
    }

    div {
        margin: 10px;
    }

    .MuiCardHeader-root {
        height: 80px;
        width: 600px;
    }

    .MuiCardHeader-action{
    }

    .MuiButtonBase-root{
        margin: 0px;
        padding: 0px;

    }  

    .MuiAvatar-img {
        
    }  

    .MuiTypography-root {
        font-weight: bold;
        font-size: 15px;
        float: left;
    }

    .MuiCardActions-root {
        position: relative;
        left: -250px;
        margin: 0px;
        padding: 0px;
    }

   .MuiCardContent-root {
      margin: 20px;
   }

    .button {
        display: flex; 
        margin-bottom: 30px;
    }

    .cardImage{
        height: 10px;
    }

   .likes{
       display: inline-block;
   }

   .likeNumber{
       display: inline-block;
   }
`;



