export{}
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

//User Model
let User = require("../models/users.model");

//Signin
router.route("/").post((req :any, res: any) => {

    //read request body information
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then((user: any) => {
        //check if user exists
        if(!user){ return res.status(400).json("User does not exist")};
        
        //Validate user with password
        bcrypt.compare(password, user.password)
        .then((isMatch: boolean) => {
            if(!isMatch) return res.status(400).json({msg: "Invalid credentials"})

        //signing in useing jwt
            jwt.sign(
                //first parameter is the payload that gives the user id to the token
                {id: user.id},
                //second parameter is the jwt secret value
                config.get("jwtSecret"),
                {expiresIn : 3600},
                (err: any, token: any) => {
                    if(err) throw err;

                    res.json({
                        //token!
                        token,
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                    })

                }
            )
        })
          
    })
})

//Return User information by id
router.route("/user").get(auth, (req: any,res: any) => {
    User.findById(req.user.id).select("-password")
    .then((user: any) => res.json(user));
})

module.exports = router;