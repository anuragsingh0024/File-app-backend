import File from "../model/File.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v2 as cloudinary } from 'cloudinary';


const localFileUpload = async (req, res) => {
    try{
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

// Your code
         const file = req.files.file;

         const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`

            file.mv(path, (err) => {
                if (err) {
                    console.log(err);
                }
            });
         res.status(200).json({ 
               success: true,
               message: "File uploaded on server successfully"
         })
        } catch(err){
             res.status(404).json({
                  success: false,
                  message: err.message
             })
        }
}


//image upload;
const imageUpload = async (req ,res) => {
    try{
        const {name, email , tags} = req.body

        const file = req.files.file;
        console.log(file)
        const supportedType = ["png", "jpeg", "jpg"];
        const fileType = file.name.split('.')[1];
        console.log('file type-> ', fileType)
        const isSupported = supportedType.includes(fileType);

        if(!isSupported){
             return res.json({
                 success: false,
                 message: "File type is not supported"
             })
        }
        console.log('supperted')
      const response =   await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "anurag"
        })
        console.log(response)

        res.json({
             success: true,
             message: "Image uploaded successfully",
             imgUrl: response.secure_url
        })

        //make entry in db
        const uploadedImg = await File.create({
             name,
             email,
             tags,
             fileUrl: response.secure_url
        })
    } catch(err){
         res.json({
            success: false,
            message: 'err.message'
         })
    }
}

//video upload
const videoUpload = async (req, res) => {
        try{
            const {name, email , tags} = req.body

            
        const file = req.files.file;
        console.log(file)
        const supportedType = ["mp4", "mov"];
        const fileType = file.name.split('.')[1];
        console.log('file type-> ', fileType)
        const isSupported = supportedType.includes(fileType);

        if(!isSupported){
            return res.json({
                success: false,
                message: "File type is not supported"
            })
       }
       console.log('supperted')
     const response =   await cloudinary.uploader.upload(file.tempFilePath, {
           folder: "anurag",
           resource_type: "video"
       })
       console.log(response)


       res.json({
        success: true,
        message: "vieo uploaded successfully",
        vidoeUrl: response.secure_url
   })

    //make entry in db
    const uploadedImg = await File.create({
        name,
        email,
        tags,
        fileUrl: response.secure_url
   })

        } catch(err){
             res.json({
                 success: false,
                 message: "Something went wrong"
             })
        }
}

// imageReducer
const imageReducer = async (req, res) => {
    try{
        const {name, email , tags} = req.body

        
    const file = req.files.file;
    console.log(file)
    const supportedType = ["png", "jpeg", "jpg"];

    const fileType = file.name.split('.')[1];
    console.log('file type-> ', fileType)
    const isSupported = supportedType.includes(fileType);

    if(!isSupported){
        return res.json({
            success: false,
            message: "File type is not supported"
        })
   }
   console.log('supperted')
 const response =   await cloudinary.uploader.upload(file.tempFilePath, {
       folder: "anurag",
       quality: "auto:low"
   })
   console.log(response)


   res.json({
    success: true,
    message: "image uploaded successfully",
    vidoeUrl: response.secure_url
})

//make entry in db
const uploadedImg = await File.create({
    name,
    email,
    tags,
    fileUrl: response.secure_url
})

    } catch(err){
         res.json({
             success: false,
             message: "Something went wrong"
         })
    }
}

export {localFileUpload,imageUpload,videoUpload,imageReducer}