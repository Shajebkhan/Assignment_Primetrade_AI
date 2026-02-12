const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(403).json({
                message:"Invalid credentials", success: false
            })
        }
        // decrypt password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(403).json({
                message:"Invalid credentials", success: false
            })
        }
        // now make a jwt token
        const jwtToken = jwt.sign(
            {email: user.email, id: user._id},
            process.env.JWT_SECRET_KEY, {expiresIn: '12h'}
        )
        res.status(200).json({
            message:"login Successfully", success:true, jwtToken,email, name:user.name
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", success: false
        })
    }
}

module.exports = {login}