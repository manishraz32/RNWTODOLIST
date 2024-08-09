import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generatetoken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false, 
                message: "Password don't match" 
            });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                success: false, 
                message: "username already exists" 
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
        })
        // console.log("newuser", newUser);
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                success: true,
                message: "signup successfully",
                data: {
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    username: newUser.username,
                }
            })
        } else {
            res.status(500).json({ 
                success: false,
                message: "Internal Server Error" 
            });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            success: false, 
            message: "Internal Server Error" 
        });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");


        if (!user || !isPasswordCorrect) {
            return res.status(400).json({
                success: false, 
                message: "Invalid username or password" 
            });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            message: "login successfully",
            data: {
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
            }
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({
            success: false, 
            message: "Internal Server Error" 
        });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            success: true, 
            message: "Logged out successfully" 
        });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
}

