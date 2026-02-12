const UserModel = require('../models/User' );
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        console.log(req.body, "this is from backend")
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409).json({
                message:"user already exist, please login", success:false
            })
        }
        const userModel = new UserModel({ name, email, password});
        // hashing password

        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save();
        res.status(201).json({
            message: "Signup successfully", success: true, user: userModel
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", success: false
        })
    }
}

module.exports = {signup}