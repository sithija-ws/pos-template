import mongoose from "mongoose";
import dotenv from "dotenv";





const DB = async ()=>{
    try {
        let url = process.env.MONGO_URL;
        await mongoose.connect(url)
        console.log("Database conncted successfully ✅🙆‍♀️")
    } catch (error) {
        console.log("Error occured: " + error.message)
    }
} 

export default DB;