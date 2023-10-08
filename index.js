import mongoose from "mongoose";
import express from 'express'
import dotnev from 'dotenv'
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { userRouter } from "./Routers/userRouter.js";
import { postRouter } from "./Routers/postRouter.js";
let app = express()
dotnev.config()
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin : ['https://blog-ashen-xi.vercel.app','http://localhost:5173'],
    credentials : true
}))
let MONGODB = process.env.MONGODB;
let PORT = process.env.PORT || 5000
mongoose.connect(MONGODB).then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
mongoose.connection.on('connected',() => console.log('database running now!'))
mongoose.connection.on('disconnected' ,() =>  console.log(`database stopped!`))
app.use('/api/auth',userRouter);
app.use('/api/post',postRouter);
app.use((err,req,res,next) => {
    let errorMessage = err.message || 'Something went wrong!';
    let errorStatus = err.status || 500;
    res.status(errorStatus).json({ error : errorMessage });
})