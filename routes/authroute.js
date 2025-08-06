import express from "express";
import {  registerController,  loginController} from "../controllers/authcontroller.js";

/* Create a authRouter */
const authRouter = express.Router()

/* Create Routes */

// REGISTER
authRouter.post('/register', registerController)

//LOGIN
authRouter.post('/login', loginController)

/* Export */
export default authRouter
