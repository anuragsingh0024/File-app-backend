import mongoose from "mongoose";
import 'dotenv/config'

const connectDb = () => {
    mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
    })
    .then(console.log("DB Connection Successful"))
    .catch((error) => {
        console.log("DB Connection Issues");
        console.error(error);
        process.exit(1);
    } );
}

export default connectDb