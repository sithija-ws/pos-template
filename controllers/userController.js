import bcrypt from "bcrypt";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

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

export const loginUser = async (req,res) => {
    try {
        let {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }
        
        //check is user exisisting
        let user = await User.findOne({username: username});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password!"
            })
        }

        //check is password correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials!"
            });
        }

        //check approvel
        /*if(!existingUser.approved){
            return res.status(400).json({
                message: "Your account has not approved yet."
            })
        }*/

        //create token
        let token = jwt.sign(
            {
                id : user._id,
                role: user.role
            },
                process.env.SECRET_KEY,
            {
                expiresIn: "2d"
            }
        );

        return res.status(200).json({
            message: "login successfully ✅❤️",
            success: true,
            USER : {
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                approved: user.approved
            }
        });
    } catch (error) {
        console.log("Error occured - " + error);
        res.status(500).json({
            message: "API Error Occured! 🤖❤️"
        })
    }
}