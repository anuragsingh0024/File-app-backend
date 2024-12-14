import express from 'express'
import fileUpload from 'express-fileupload';
import connectDb from './config/db.js';
import cloudinaryConnect from './config/cloudenry.js';
import router from './routes/fileUpload.js';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//connection
connectDb();
cloudinaryConnect();

//mount the route
app.use('/api/v1', router)

//Listen the app
app.listen(PORT, ()=> {
     console.log(`Server is started on port ${PORT}`)
})

