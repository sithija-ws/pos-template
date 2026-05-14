import e from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import DB from "./config/db.js";

const app = e();
dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("API is running on port " + port + " 🤖❤️");
    DB();
})