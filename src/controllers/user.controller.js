const express =require("express")
const User = require("../models/user.model")

const register = async(req,res)=>{
    try {
        let user = await User.findOne({email : req.body.email})

        if(user){
            return res.status(200).send("Email already exists")
        }

        user = await User.create(req.body)

        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
}

const login = async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})

        if(!user){
            return res.status(401).send("Invalid Email or Password")
        }

        const match = user.checkPassword(req.body.password)

        if(!match){
            return res.status(401).send("Invalid Email or Password")
        }

        return res.status(200).send(user);

    } catch (error) {
        return res.status(500).send({message:error.message})
    }
}

module.exports = {register,login}
