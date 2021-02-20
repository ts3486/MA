export{}
const config = require("config");
//jwt (json web token) for encoding and decoding token data.
const jwt = require("jsonwebtoken");

const auth = (req: any, res: any, next: any) => {
    const token = req.header("x-auth-token");

    //check for token
    if(!token){
        //401 status represents unauthorized requests
        return res.status(401).json({msg: "No token, authorization denied"});
    }

    try {
        //verify token
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        //Add user from payload 
        req.user = decoded;
        next();
    } catch(e){
        res.status(400).json({msg: "Token is not valid"});
    }
}

module.exports = auth;

//Just add auth to the parameters in routes you want to require authorization token
//This authentication processs is performed to start the request. 
//Token is red from request header, the decoded with the jwtSecret key. 
//Then the decoded token is sent to the req body. 

