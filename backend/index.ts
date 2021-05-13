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

//Socket.io
const socketio = require("socket.io");
//functions from chat.ts
const {addUser, getUser, getUsersInRoom} = require("./routes/chat");


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
//server
const server = require("http").createServer(app);


//Serving static file (frontend) to server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "frontend", 'build')));

  app.get('*', (res: any) => {
    res.sendFile(path.join(__dirname, "frontend", "build", 'index.html'));
  });
}


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

//Socket.io Connection

//socket.io instance
const io = socketio(server, {
  //need to define options for v3 and + 
  cors: {
  origin: "http://localhost:5000",
  methods: ["GET", "POST"],
  allowedHeaders: "my-headers",
  credentials: true,
}})

//triggers at connection ( = page opened)
io.on("connection", (socket: any) => {
  console.log("New Connection!");

  socket.on("join", ({username, room}: any, callback: any) => {

    // console.log(username + " has joined " + room + "!")

    const {error, user} = addUser({id: socket.id, username, room});

    //dont put brackets on this or itll stop the process ?
    if(error) return callback(error);
    
    //sends data to specific socket. 
    io.to(user.room).emit("roomData", {room: user.room, users: getUsersInRoom(user.room)})
         
    //socket.join()   joins a user in a room. 
    socket.join(user.room);
  })

  socket.on("sendMessage", (message: string, callback: any) => {
      const user = getUser(socket.id);

      io.to(user.room).emit("message", {user: user.name, text: message});
      io.to(user.room).emit("roomData", {room: user.room, users: getUsersInRoom(user.room)})

      console.log(message, user);

      callback();
  })

  socket.on("disconnect", () => {
      console.log("User has left!")
  })

  socket.on("connect_error", (err: any) => {
    console.log(`connect_error due to ${err.message}`);
  });
})

//Routes
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);


//PORT Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("MA Server started at port " + PORT);})



