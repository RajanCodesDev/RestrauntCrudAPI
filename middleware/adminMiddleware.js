import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"

const adminMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1]
    JWT.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          meassage: "Un-authourized User",
        })
      } else {
        // console.log(decode)
        // req.body.id = decode.id
        req.user = { id: decode.id }
        const userData = await userModel.findById(req.user.id)
        console.log(userData)
        if (userData.usertype !== "admin") {
          return res.status(410).send({
            success: false,
            message: "Un-authourised [ Not an admin ]",
          })
        }
        next()
      }
    })
  } catch (error) {
    console.log(error)
    res.status(501).send({
      success: false,
      message: "Error in admin API",
    })
  }
}

export { adminMiddleware }
