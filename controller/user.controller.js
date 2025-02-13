const UserModel = require("../model/User.model.js")
const bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")



const userRegister = (req, res) => {
    const { name, email, lastname, password, mobileNumber } = req.body
    try {
        const user = UserModel.findOne({ email })

        // if (!user) {
        //     return res.json({ status: false, message: "User already exists" })
        // }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.json({ status: false, message: err.message })
            } else {
                const newUser = new UserModel({
                    name,
                    lastname,
                    email,
                    mobileNumber,
                    password: hash
                })
                newUser.save()
                return res.json({ status: true, message: "User registered successfully" })
            }
        })




    } catch (error) {
        return res.json({ status: false, message: error.message })
    }
}



const userLogin = async (req, res) => {
    console.log("898989")
    const { email, password } = req.body;
      console.log("898989")
    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ status: false, message: "User not found" });
        }

        // Compare the provided password with the stored password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ status: false, message: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h", // Set token expiration
        });

        // Set the cookie with the token
        res.cookie("authToken", token, {
            httpOnly: true, // Secure cookie (cannot be accessed via client-side scripts)
            secure: process.env.NODE_ENV === "production", // Use secure flag in production
            sameSite: "Strict", // Helps mitigate CSRF attacks
            maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
        });

        return res.json({ status: true, message: "User logged in successfully",token });
    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
};


module.exports = {
    userRegister,
    userLogin
}