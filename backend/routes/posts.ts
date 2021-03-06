export{}
const router = require("express").Router();
const upload = require("../middleware/multer");
let Post = require("../models/posts.model");
const mongoose = require("mongoose");
//for image uploading
const Grid = require('gridfs-stream');
const methodOverride = require("method-override");

const mongoURI = "mongodb+srv://Tao:Tao34@cluster1.lfte8.mongodb.net/test?retryWrites=true&w=majority"

//Gfs connection for image uploading
let gfs: any; 

const connection = mongoose.createConnection(mongoURI, { useNewUrlParser: true });
connection.once("open", () => {
    gfs = Grid(connection.db, mongoose.mongo)
    gfs.collection('uploads')
})



// GET

//get all posts

router.route("/").get((req: any,res: any) => {

    Post.find().then((posts: any) => res.json(posts))
    .catch((err: any) => res.status(400).json("Error: " + err));

 });

//get post by id

router.route("/:id").get((req: any,res: any) => {
 if(req.params.id !== " "){
     Post.findById(req.params.id).then((post: any) => res.json(post))
     .catch((err: any) => res.status(400).json("Error: " + err));
 }
});

//get image by id
 router.route("/images/:filename").get((req: any,res: any) => {

     gfs.files.findOne({filename: req.params.filename},(err: any, file: any) => {
         if(!file || file.length === 0){
             return res.status(404).json({err: "No file exists"})
         }

         if(file.contentType === "image/jpeg" || file.contentType === "img/png" || file.contentType === "image/png" || file.contentType === "video/quicktime"){
             //Read stream output to browser
             const readstream = gfs.createReadStream(file.filename);
             readstream.pipe(res);
         } else {
             res.status(404).json({
                 err: "Not an image"
             })
         }

     })
 })



//POST

//Add post string data
router.route("/add").post((req :any, res: any) => {

    const username: String = req.body.username;
    const filename: String = req.body.filename;
    const description: String = req.body.description;
    const likes: Number  = Number(req.body.likes);
    const date = Date.parse(req.body.date);

    const newPost = new Post({
        username,
        filename,
        description,
        likes,
        date,
    });
    
    //save()  save to db
    newPost.save()
        .then((users: any) => res.json("Post added!"))
        .catch((err: any) => res.status(400).json("Error: " + err))
})

// post image action
    router.route("/add/image").post(upload.single("image"), (req: any, res: any) => {
        if(!req.file || req.file.length === 0){
            return res.status(404).json({err: "No file exists"})
        }
        else{
        res.json({file: req.file});    
        }
    })


//Update post username
router.route("/update/username/:username").post((req: any,res: any) => {

    const newUsername: string = req.body.newUsername;

    if(req.params.username !== ` `){

        Post.updateMany({username: req.params.username}, {username: newUsername}).then((result: any) => {
            return result;
        }).catch((err: any) => res.status(400).json("Error: " + err))

//     Post.find({username: req.params.username})
//         .then((post: any) => {
//             post.username = newUsername;
            
//             post.save()
//             .then((users: any) => res.json("Post username updated!"))
//             .catch((err: any) => res.status(400).json("Error: " + err))                

//         })
//         .catch((err: any) => res.status(400).json("Error: " + err))
    }
})


//Update postby id
    router.route("/update/:id").get((req: any,res: any) => {
        if(req.params.id !== ` `){
        Post.findById(req.params.id)
            .then((post: any) => {
                post.username = req.body.username;
                // post.description = req.body.description;
                


                post.save()
                .then((users: any) => res.json("Post updated!"))
                .catch((err: any) => res.status(400).json("Error: " + err))                

            })
            .catch((err: any) => res.status(400).json("Error: " + err))
        }
    })

 
//Add Like
router.route("/like").post((req: any, res:any) => {  
        
        Post.findById(req.body.id)
            .then((post: any) => {
                post.likes = Number(req.body.likes);

                let likedBy = req.body.likedBy;

                if(post.likedBy.includes(likedBy) === false){
                    post.likedBy.push(likedBy)
                    //Why didn't  post.likedBy =  post.likedBy.push(likedBy) work?   
                    // left: refers to document element array defined in model. right: (document element empty array --> push "Tao".) = ["Tao"] 
                    // Hypothesis: When you set an array equal to an array, 
                    // If the array schema is defined, you don`t set the array equal to an array. You push. (can replace with modified array)
                }
                else if (post.likedBy.includes(likedBy) === true){

                    const checkUser = (username: string) => {
                        return username = likedBy
                    }

                    let index = post.likedBy.findIndex(checkUser);
                    post.likedBy.splice(index, 1)
                }

                console.log(likedBy, post.likedBy);
    
                post.save()
                .catch((err: any) => res.status(400).json("Error: " + err))       
            })
})


//Delete post by id
router.route("/delete/:id").delete((req: any,res: any) => {
    if(req.params.id !== ` `){
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json("Post deleted"))
        .catch((err: any) => res.status(400).json("Error: " + err))
    }
})

//Delete image by id
router.route("/image/delete/:filename").delete((req: any,res: any) => {
gfs.deleteOne({filename: req.params.filename, root: "uploads"}, (err: any) => {
     if(err){
         return res.status(400).json({err: err});
     }

     res.redirect("/")
})
})


module.exports = router;












//display all files in json
// router.route("/files").get((req: any,res: any) => {

//     gfs.files.find().toArray((err: any, files: any) => {
//         if(!files || files.length === 0){
//             return res.status(404).json({err: "No files exist"})
//         }

//         return res.json(files);
//     })
// })


//display a single file in json
// router.route("/files/:filename").get((req: any,res: any) => {

//     gfs.files.findOne({filename: req.params.filename},(err: any, file: any) => {
//         if(!file || file.length === 0){
//             return res.status(404).json({err: "No file exists"})
//         }

//         return res.json(file);
//     })
// })


//get all images
 // router.route("/images").get((req: any,res: any) => {

 //     gfs.files.find().toArray((err: any, files: any) => {
 //         if(!files || files.length === 0){
 //             return res.status(404).json({err: "No files exist"})
 //         }

 //         if(files.contentType === "image/jpeg" || files.contentType === "img/png" || files.contentType === "image/png"){
 //             //Read stream output to browser
 //             const readstream = gfs.createReadStream(files);
 //             readstream.pipe(res);
 //         } else {
 //             res.status(404).json({
 //                 err: "Not image"
 //             })
 //         }

 //     })
 // })