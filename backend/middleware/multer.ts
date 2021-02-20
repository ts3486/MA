export{}
const multer = require("multer");
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require("crypto");
const path = require("path");
const mongoURI = "mongodb+srv://Tao:Tao34@cluster1.lfte8.mongodb.net/test?retryWrites=true&w=majority"


//GridFS allows data storage of files over 16MB. Appropriate for large files and videos.

const storage = new GridFsStorage({
    url: mongoURI,
    
    file: (req :any, file: any) => {
        return new Promise(
            (resolve, reject) => {
                
                //If you want to encode the filename.
                // crypto.randomBytes(16,(err: any, buf: any) => {
                //     if(err){
                //         return reject(err);
                //     };
                    
                    // const filename = buf.toString("hex") + path.extname(file.originalname);

                    const fileInfo = {
                        filename: file.originalname,
                        
                        //Which collection to save data on (should match collection name);
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