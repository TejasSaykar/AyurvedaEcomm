const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.register = async (req, res) => {
    try {
        const isExists = await userModel.findOne({ email: req.body.email });
        if (isExists) {
            return res.status(401).json({
                success: false,
                message: "User with this email is already present. Try new one!"
            })
        }

        const hashPass = await bcrypt.hash(req.body.password, 10);

        const newUser = await new userModel({ ...req.body, password: hashPass }).save();
        return res.status(201).json({
            success: true,
            message: "User registered",
            newUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while registration",
            error
        })
    }
}

exports.login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Wrong credentials"
            })
        }

        const checkPass = await bcrypt.compare(req.body.password, user.password);
        if (!checkPass) {
            return res.status(404).json({
                success: false,
                message: "Wrong credentials"
            })
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "njkhtuihtuhwt34853", { expiresIn: "5h" });

        const { password, ...others } = user._doc;
        return res.status(200).json({
            success: true,
            message: "Login successful",
            others,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while login",
            error
        })
    }
}
