export{}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//for image uploading
const Grid = require('gridfs-stream');
const methodOverride = require("method-override")
//u need a body parser to handle multi-part requests
const bodyParser = require("body-parser");
//routers
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
//config (to refer to keys without explicitly showing on files)
const config = require("config");
//json web token for authentication
const jwt = require("jsonwebtoken")
const path = require("path");



const app = express();

//Middleware
app.use(methodOverride("_method"));
app.use(bodyParser.json());

//allow cors
app.use(cors());
//allows us to post raw json data 
app.use(express.json());
//allow to read .env files
require("dotenv").config();



//MongoDB Connection 
// URI = Uniform Resource Identifier. Used to connect resources otgether  https://www.guru99.com/url-vs-uri-difference.html
const mongoURI = config.get("mongoURI");
// process.env.ATLAS_URI;
mongoose.connect(mongoURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).catch((err: any) => console.log(err));
//gfs init
let gfs: any; 

const connection = mongoose.createConnection(mongoURI, { useNewUrlParser: true });
connection.once("open", () => {
    gfs = Grid(connection.db, mongoose.mongo)
    gfs.collection('uploads')
    console.log("MongoDB database connection established successfully");
}).catch((err: any) => console.log(err));

//Serving static file (frontend) to server
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "frontend", 'build')));

    app.get('*', (res: any) => {
      res.sendFile(path.join(__dirname, "frontend", "build", 'index.html'));
    });
  }

//Routes
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);


//PORT Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("MA Server started at port " + PORT);})



