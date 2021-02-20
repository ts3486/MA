const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//User Model
let User = require("../models/users.model");


//GET

//Get all user`s JSON info
router.route("/").get((req :any, res: any) => {
    //Mongo command .find() looks for all collections
    User.find()
        .then((users: any) => res.json(users))
        .catch((err: any) => res.status(400).json("Error: " + err))
})
//Get one user`s JSON info
router.route("/profile/:username").get((req: any,res: any) => {

    User.findOne({username: req.params.username}).select("-password")
    .then((user: any) => res.json(user));
})


//POST

//Regsiter a new user
router.route("/add").post((req :any, res: any) => {

    //read request body information
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const description = null;

    User.findOne({email}).then((user: string) => {
        //check if user exists
        if(user){ return res.status(400).json("User already exists")};
        
        const newUser = new User({
            username,
            email,
            password,
            description
        });

        //Create salt & hash
        bcrypt.genSalt(10, (err: any, salt: any) => {
            bcrypt.hash(newUser.password, salt, (err: any, hash: any) => {
                if(err) throw err;
                newUser.password = hash;

                //save()  save to db
                newUser.save()
                .then((user: any) => {

                    //signing in useing jwt
                    jwt.sign(
                        //first parameter is the payload in the token so that it accesses the right user data 
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
                .catch((err: any) => res.status(400).json("Error: " + err))
            })
        })
    })
})


//Edit Profile
router.route("/profile/update/:username").post((req: any,res: any) => {

    const oldUsername: string = req.params.username;
    const newUsername: string = req.body.newUsername;
    const description: string = req.body.description; 
    const profilePic: string = req.body.filename;

    User.findOne({username: oldUsername}).then((user: any, err: any) => {
        // console.log(oldUsername, newUsername, description, profilePic, user)

        user.filename = profilePic;
        user.username = newUsername;
        user.description = description;

        user.save()
        .then((user: any) => res.json("User profile updated!"))
        .catch((err: any) => res.status(400).json("Error: " + err));                
;
    })
    .catch((err: any) => res.status(400).json("Error: " + err))
})

module.exports = router;