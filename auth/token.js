import jwt from 'jsonwebtoken'
import { ErrorHandler } from '../Error/error.js';

export let VerifyLoggedInUser = (req,res,next) => {
    let { token } = req.cookies;
    if(!token){
        return next(ErrorHandler(500, 'Login first!'))
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,payload) => {
        if(err) return next(ErrorHandler(500, 'token expired!'))
        req.user = payload;
        next()
    })
}
export let VerifyAdmin = (req,res,next) => {
    VerifyLoggedInUser(req,res,() => {
        if(!req.user.isAdmin) return next(ErrorHandler(500, 'Admin privillage only!'))
        next()
    })
}