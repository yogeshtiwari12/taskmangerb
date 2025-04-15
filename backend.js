import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user_routes.js";
import taskRoutes from "./routes/task_routes.js";
import cookieParser from "cookie-parser";



const app = express();

mongoose.connect("mongodb+srv://yt781703:uobYLCgmFEoBJn6f@cluster0.tlpcnsp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((error)=>{
    console.log("error connecting to the database", error.message);
})

app.use(express.json());
app.use(cookieParser())


app.use(cors({
    origin: 'https://taskmmanagerf-7kgr.vercel.app',
    credentials: true,
  }));



app.use('/api', userRoutes)
app.use('/api/task', taskRoutes)

app.listen(4000,()=>{
    console.log("Connected to MongoDB 4000");
})
