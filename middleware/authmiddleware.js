import JWT from "jsonwebtoken"

const authmiddleware = async (req, res, next) => {
  try {
    // console.log(req.body)
    const token = req.headers["authorization"].split(" ")[1]
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          meassage: "Un-authourized User",
        })
      } else {
        // console.log(decode)
        // req.body.id = decode.id
        req.user = {id: decode.id}
        console.log(req.user)
        next()
      }
    })
  } catch (error) {

    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in middleware API",
      error,
    })
  }
}

export default authmiddleware
