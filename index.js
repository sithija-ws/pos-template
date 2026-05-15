import e from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import DB from "./config/db.js";
import cors from "cors";

const app = e();
app.use(cors());
dotenv.config();
app.use(e.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("API is running on port " + port + " 🤖❤️");
    DB();
})