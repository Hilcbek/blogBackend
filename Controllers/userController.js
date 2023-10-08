import expressAsync from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { ErrorHandler } from '../Error/error.js';
import jwt from 'jsonwebtoken'
export let Register = expressAsync(async (req,res,next) => {
    try {
        let {username, email, password} = req.body;
        let genSalt = await bcrypt.genSalt(10);
        if(!username || !email || !password) return next(ErrorHandler(500, 'All fileds are required!'))
        let UserName = await User.findOne({ username : username });
        if(UserName) return next(ErrorHandler(500, 'user exist!'));
        let EmailExist = await User.findOne({ email : email }); 
        if(EmailExist) return next(ErrorHandler(500, 'email alreadt exist!'))
        let NewUser = await User.create({
            ...req.body,
            password : await bcrypt.hash(password,genSalt)
        })
        res.status(200).json({ data : NewUser})
    } catch (error) {
        next(error)
    }
})
export let Login = expressAsync(async (req,res,next) => {
    let { useEmail } = req.body;
    if(!useEmail || !req.body.password) return next(ErrorHandler(500, 'All fields are required!'));
    let UserStatus = await User.find({ $or : [{ username : useEmail }, { email : useEmail}]});
    if(!UserStatus[0]) return next(ErrorHandler(500, 'wrong username!'))
    let Password = await bcrypt.compare(req.body.password,UserStatus[0].password);
    if(!Password) return next(ErrorHandler(500, 'wrong username or password!'))
    let {password, ...UserInfo} = UserStatus[0]._doc;
    jwt.sign({ _id  : UserInfo._id, isAdmin : UserInfo.isAdmin }, process.env.JWT_SECRET, { expiresIn : '1d'}, (err,token) => {
        if(err) return next(ErrorHandler(500, 'Error while generating token!'))
        res.status(200).json({ data : UserInfo }).cookie('token',token, { httpOnly : true,secure : true });
    })
})
export let Logout = (req,res,next) => {
    try {
        res.clearCookie('token').status(200).json({ data : 'Logged out!'})
    } catch (error) {
        next(error)
    }
}