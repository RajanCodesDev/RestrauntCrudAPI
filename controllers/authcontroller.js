import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

//  REGISTER
const registerController = async (req, res) => {
  try {

    const { username, email, password, usertype } = req.body

    if (!username || !email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please fill all the fields",
      })
    }

    const existing = await userModel.findOne({ email })

    if (existing) {
      return res.status(409).send({
        success: false,
        message: "User already exists please login",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      usertype,
    })

    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in register api",
    })
  }
}

//LOGIN

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please fill the email and password",
      })
    }

    const creds = await userModel.findOne({ email })
 
    if (!creds) {
      return res.status(409).send({
        success: false,
        message: "Email is not registered please register",
      })
    }
    const isMatch = await bcrypt.compare(password, creds.password)

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      })
    }

    const token = JWT.sign({ id: creds._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.status(201).send({
      success: true,
      message: "Login Successfull",
      token,
      creds,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in login api",
    })
  }
}


export { registerController, loginController }
