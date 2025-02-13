
const jwt = require("jsonwebtoken")
require("dotenv").config()
const auth = async (req, res,next) => {
    try {
        // console.log("hello",req.cookies.authToken)
        const token = req.headers.token

        if (token) {
            await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.json({ status: false, message: "Unauthorised" })
                } else {
                    console.log("decoded",decoded)
                    req.body.userID = decoded.userID

                    console.log("req.body_ayuth",req.body)
                    next()
                }
            })
        } else {
            return res.json({ status: false, message: "Unauthorised" })
        }
    } catch (error) {
        return res.json({ status: false, message: error.message })
    }
}



module.exports = auth