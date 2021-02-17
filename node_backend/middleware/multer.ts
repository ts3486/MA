export{}
const multer = require("multer");
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require("crypto");
const path = require("path");
const mongoURI = "mongodb+srv://Tao:Tao34@cluster1.lfte8.mongodb.net/test?retryWrites=true&w=majority"


// With GridFS     GridFS allows data storage of files over 16MB

const storage = new GridFsStorage({
    url: mongoURI,
    
    file: (req :any, file: any) => {
        return new Promise(
            (resolve, reject) => {
                
                // crypto.randomBytes(16,(err: any, buf: any) => {
                //     if(err){
                //         return reject(err);
                //     };
                    
                    // const filename = buf.toString("hex") + path.extname(file.originalname);

                    const fileInfo = {
                        filename: file.originalname,
                        
                        //bucketname should match the collection name
                        bucketName: "uploads"
                    };
    
                    resolve(fileInfo);
    
                // })
            }
        )
    }
})

const upload = multer({ storage })

module.exports = upload;




// // Set storage engine
// let storage = multer.diskStorage({
//     destination:"../public/uploads/",

//     filename: function(req: any,file: any, cb: any){
//         //ext returns the "jpg" of "image.jpg"
//         var ext = file.originalname.substr(file.originalname.lastIndexOf("."));

//         //first parameter is 
//         cb(null,file.filename + "-" + Date.now() + ext)
//     }
// })

// const upload = multer({
//     storage: storage, 
//     limits:{fileSize: 1000000}
// }).single("image");

// module.exports = upload;