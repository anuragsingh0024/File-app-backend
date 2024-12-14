import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
         name: {
             type: String,
             require: true,
         },
         fileUrl: { 
            type: String,
            require: true,
         },
         tags:{
             type: String,
         },
         email:{
             type: String,
         }
})

export default mongoose.model("File",fileSchema)