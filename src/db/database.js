import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
});
const connectDB= async ()=>{
    try{
        const connectionInstance=await mongoose.connect('mongodb+srv://harshitss311:KvqNL11sl7Pr9Akq@cluster0.pfxd2dz.mongodb.net/ApplicationTracker');
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch(error)
    {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1) 
    }
}
export default connectDB;