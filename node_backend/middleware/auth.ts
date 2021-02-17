export{}
const config = require("config");
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

//just add auth to the parameters in routes you want to require authorization token