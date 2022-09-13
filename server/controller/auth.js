const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { createError } = require('../error');
const jwt = require('jsonwebtoken');



const signUp = async (req, res, next) => {
    try {
        // console.log(req.body);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password.toString(), salt);
        const newUser = new User({...req.body, password: hash });
        await newUser.save();  
        res.status(201).send("User has been created");
    } catch (error) {
        next(error);
    }
    // console.log(req.body);
} 

const signIn = async (req, res, next) => {
    try {
        // console.log(req.body);
        const user = await User.findOne({name: req.body.name})
        if(!user) return next(createError(404, "User is not found"));

        const comparePassword = await bcrypt.compare(req.body.password.toString(), user.password);
        if(!comparePassword) return next(createError(404, "Password is not correct"));

        const token = jwt.sign({id: user._id}, process.env.JWT);
        // console.log(token);

        // const {password, ...others} = user;
        const {password, ...others} = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others);

    } catch (error) {
        next(error);
    }
    // console.log(req.body);
} 


const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user) {
         const token = jwt.sign({id: user._id}, process.env.JWT);  
         res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(user._doc); 
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({id: savedUser._id}, process.env.JWT);  
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(savedUser._doc); 
        }
    } catch (error) {
        next(error)
    }
}

module.exports =  { signUp, signIn, googleAuth }