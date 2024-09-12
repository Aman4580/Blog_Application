const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const User = require('../model/user.js');

dotenv.config();

exports.signupUser = async (req, res) => {
    console.log("sinnup api run truly");
    try {
        const { name, username, password } = req.body;

        if (!name || !username || !password) {
            return res.status(403).send({
                success: false,
                message: "All fields are required",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            username,
            password: hashedPassword,
        });

        console.log(user);

        return res.status(200).json({ msg: 'Signup successful' });
    } catch (error) {
        console.error('Error details:', error);  // Log the error details
        return res.status(500).json({ msg: 'Error while signing up user' });
    }
}

//Login Api
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(403).send({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({ username });

        if (!user) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: "User is not registered with us. Please sign up to continue.",
            });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '15m' });

            user.token = token;  // Assuming you want to store the token in the user object

            return res.status(200).json({
                success: true,
                message: "User login success",
                token,  // Return the token in the response
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password does not match",
                
            });
        }
    } catch (error) {
        console.error('Error details:', error);  // Log the error details
        return res.status(500).json({
            success: false,
            message: "Error while logging in user",
        });
    }
};