import express from 'express'
import { Login, Logout, Register } from '../Controllers/userController.js';
export let userRouter = express.Router();
userRouter.post('/register',Register);
userRouter.post('/login',Login);
userRouter.post('/logout',Logout)