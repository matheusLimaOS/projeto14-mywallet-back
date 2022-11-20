import express from "express";
import { SignIn, SignUp } from '../Controllers/userController.js';
import { verifySignIn, verifySignUp } from "../Middlewares/userMiddlewares.js";
const userRouter = express.Router();

//userRouter.post('/signIn', SignIn);
userRouter.post('/signup',verifySignUp,SignUp)
userRouter.post("/signin",verifySignIn,SignIn)

export default userRouter;