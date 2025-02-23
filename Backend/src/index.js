//const express=require("express");

import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
import { connectDB } from "./libs/db.libs.js";

const app=express();

dotenv.config(
    {
        path:"./src/.env"
    }
);
const PORT=process.env.PORT;

app.use(express.json());//from this we can get a json data from req.body etc
app.use(cookieParser());//allow u to grap jwt from cookie;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))//this is for connected frontend to backend

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

app.listen(PORT,()=>{
    console.log("server is running on port",PORT);
    connectDB();
}) 