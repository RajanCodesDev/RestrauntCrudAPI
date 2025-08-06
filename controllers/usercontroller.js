import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"

// GetUserData
const userController = async (req, res) => {
  console.log(req.user, req.user.id)
  const id = req.user.id
  const userData = await userModel.findById(id)

  if (userData) {
    res.send({
      username: userData.username,
      usertype: userData.usertype,
    })
  } else {
    res.send({
      success: false,
      message: "User not found",
    })
  }
}

// DELETE USER
const userDelete = async (req, res) => {
  try {
    const id = req.user.id
    const doc = await userModel.findByIdAndDelete(id)
    if (doc) {
      return res.status(200).send({
        success: true,
        message: "User Deleted",
        doc,
      })
    } else {
      return res.status(401).send({
        success: false,
        message: "User not found",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in userDelete API",
    })
  }
}

// RESET PASSSWORD
const resetPassword = async (req, res) => {
  try {
    const { oPassword, nPassword } = req.body
    const id = req.user.id
    if (!oPassword || !nPassword) {
      return res.status(401).send({
        success: false,
        message: "Please fill all feilds",
      })
    }

    const hashedPassword = await bcrypt.hash(nPassword, 10)
    const user = await userModel.findById(id)
    if (!user) {
      return res.status(410).send({
        success: false,
        message: "User not found please register",
      })
    }

    const isMatch = await bcrypt.compare(oPassword, user.password)
    if (!isMatch) {
      return res.status(420).send({
        success: false,
        message: "Old password is not correct",
      })
    }

    user.password = hashedPassword
    user.save()
    res.status(201).send({
      success: true,
      message: "Password has been updated successfully",
    })


  } catch (error) {
    console.log(error)
    res.status(409).send({
      success: false,
      message: "Error in Password reset API",
      error,
    })
  }
}

export { userController, userDelete, resetPassword }
