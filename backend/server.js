import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from  "./routes/messageRoutes.js";
import connectToMongoDB from "./database/connectToMongoDB.js";
import usersRoutes from  "./routes/userRoutes.js"
import { app, server, io } from "./socket/socket.js";





const PORT=process.env.PORT||5000;

dotenv.config();


app.use(express.json());
app.use(cookieParser());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users",usersRoutes);


server.listen(PORT, ()=> {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
