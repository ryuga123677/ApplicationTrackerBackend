import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from 'path';
const app = express();

app.use(cors({
origin:process.env.CORS_ORIGIN,
credentials: true,
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
//app.use(express.static("public"));
app.use(express.static(path.join(process.cwd(), 'public'))); 
app.use(cookieParser());


import userRouter from './routes/user.routes.js';
import applicationRouter from './routes/application.routes.js';
import detailsRouter from './routes/userinfo.routes.js';
import providerRouter from './routes/provider.routes.js';
app.use("/user",userRouter);
app.use("/provider",providerRouter);
app.use("/api",applicationRouter);
app.use("/api",detailsRouter);

export {app};