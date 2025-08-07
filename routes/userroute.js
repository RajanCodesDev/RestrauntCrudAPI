import express from "express"
import { userController, userDelete, resetPassword } from "../controllers/usercontroller.js"
import authmiddleware from "../middleware/authmiddleware.js"

//Router
const userRouter = express.Router()

//Routes
userRouter.get("/getuser", authmiddleware, userController)
userRouter.delete("/deluser", authmiddleware, userDelete)
userRouter.post('/resetpassword', authmiddleware, resetPassword)

//export module
export default userRouter