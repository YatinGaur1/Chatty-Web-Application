//const express=require("express");

import express from "express";
import authRoutes from "./routes/auth.routes.js";

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

app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log("server is running on port",PORT);
    connectDB();
}) 