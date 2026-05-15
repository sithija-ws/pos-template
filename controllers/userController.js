import bcrypt from "bcrypt"
import User from "../model/user.js"

export const userRegister = async (req,res)=>{
    try {
        let {email, username, password,role} = req.body;

        if(!email || !username || !password || !role){
            return res.status(400).json({
                message: "Please fill all required fields!"
            });
        }

        let existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "User already exists!"
            });
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        let newUser = await User.create({
            email,
            username,
            password: hashedPassword,
            role
        })

        return res.status(201).json({
            message: "User Created Successfully 👤✅",
            user: newUser
        })
        
        
    } catch (error) {
        console.log("Error occured - " + error.messsage);
        res.status(500).json({
            message: "API Error Occured! 🤖❤️"
        })
    }
}