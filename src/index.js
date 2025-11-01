import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({path:"./.env"});

const DB=process.env.MONGODB_URI.replace(
    "<PASSWORD>",
    process.env.MONGODB_URI_PASSWORD
);

mongoose.connect(DB)
.then(()=>{
    console.log("DATABASE Connected................");
    const PORT=process.env.PORT || 8000;
    app.listen(PORT,()=>{
        console.log("Server is running on port",PORT)
    })
})
.catch((err)=>{
    console.log("DB connection error",err);
    process.exit(1);
})