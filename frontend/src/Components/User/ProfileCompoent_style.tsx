import styled from "styled-components";

export const ProfileWrapper = styled.div`

    .container{
        display: flex;
        justify-content: center;
        background-color: rgb(250,250,250);
    }
    
    .card{
        margin: 100px;
        width: 720px;
        height: auto;
    }

    .MuiAvatar-root{
        margin: auto;
        margin-top: 30px;
        height: 150px;
        width: 150px;
    }

    .MuiButtonBase-root{
        width: 150px;
        display: flex;
        justify-content: center;
        margin: auto;
        margin-bottom: 10px;
    }

    .username{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        
    }

    .description{
        display: flex;
        justify-content: center;
        padding: 20px;
    }

    .likes {
        display: flex;
        justify-content: center;
        margin: 10px;
    }

    .text{
        margin: 0px;
    }

    .posts-container{
        margin-top: 30px;
        height: 750px;
        display: grid;
        grid-template-columns: 245px 245px 245px;
        grid-template-rows: 255px 255px 255px;
    }

    // .posts{
    //     place-self: center;
    //     font-size: 50px;
    //     margin: 5px;
       
    // }

    .image{
        height: 250px;
        width: 240px;
        margin: 5px;
    }
`;