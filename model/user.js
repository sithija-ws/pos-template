import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type: String,
        required : true,
        lowercase: true,
        trim: true
    },
    username : {
        type: String,
        required: true
    },
    password:{
        type: String,
        required : true
    },
    role: {
        type: String,
        enum : ["Owner", "Cashier"],
        default: "Cashier"
    },
    approved: {
        type: Boolean,
        default: false
    }
})

const User = new mongoose.model("User",userSchema);
export default User;