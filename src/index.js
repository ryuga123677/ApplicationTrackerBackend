import dotenv from "dotenv";
import connectDB from "./db/database.js";
import {app} from './app.js'
import { createServer } from 'http';
import { initSocket } from './websockets/chat.websockets.js';
dotenv.config({
    path:'./env'
});
const server = createServer(app);
const io=initSocket(server);
connectDB().then(()=>{
server.listen(process.env.PORT || 7000,()=>{
    console.log(`server is running at : ${process.env.PORT}`);
})
}).catch(err=>{
    console.log('connection failed',err);
});
