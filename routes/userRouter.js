import { loginUser, userRegister } from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", loginUser);
export default userRouter;