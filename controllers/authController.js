const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
    register: async (req, res)=>{
        try{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = await new User({
                username : req.body.username,
                email : req.body.email,
                fullname : req.body.fullname,
                password : hashed
            });
             
            const user = await newUser.save();
            res.status(200).json(user);
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
    },

    login: async (req, res)=>{
        try{
            const user = await User.findOne({username:req.body.username});

            if(user){
                const validPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if(!validPassword){
                    res.status(404).json("Wrong user!");
                    return;
                }
            }
            else{
                res.status(404).json("Wrong user!");
                return;
            }
            const accessToken = jwt.sign(
                {
                    id:user._id,
                    admin: user.admin
                },
                process.env.JWT_ACCESS_KEY,
                {
                    expiresIn: "3600s"
                }
            )
            const {password, ...other} = user._doc;
            res.status(200).json({...other, accessToken});
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
    },

    userLogout: async (req, res) => {

    }
}

module.exports = authController;