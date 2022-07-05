const express= require('express')
const router= express.Router();
const User= require('../models/User')
const CryptoJS = require("crypto-js");
const jwt= require("jsonwebtoken")

//REGISTER USER
router.post("/register", async (req,res)=>{
    try {
        const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        })
        try {
            const user= await newUser.save()
            res.status(200).json(user)
        } catch (error) {
            res.json({error1: error.message})
        }
    } catch (error) {
        res.json({error2: error.message})
    }
})

//LOGIN USER
router.post("/login", async(req,res)=>{
    try {
        const newLogin={
            email:req.body.email,
            password:req.body.password
        }
        const user=await User.findOne({email:newLogin.email})
        if(!user){
            res.status(401).json("Enter correct email")
        }

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if(originalPassword!==newLogin.password){
            res.status(401).json("Enter correct password")
        }

        const accessToken= jwt.sign(
            {
                id: user._id, 
                isAdmin:user.isAdmin
            }, process.env.SECRET_KEY, {expiresIn: '5d'})
        
        const {password, ...info} =user._doc
        res.status(200).json({...info, accessToken})

    } catch (error) {
        res.json({error3: error.message})
    }
})



module.exports= router