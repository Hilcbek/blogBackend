import { ErrorHandler } from '../Error/error.js';
import Post from '../models/post.Modal.js'
import expressAsync from 'express-async-handler'
import User from '../models/userModel.js';
export const AddPost = expressAsync(async (req,res,next) => {
    try {
        let { title, body, postImage} = req.body;
        if( !title || !body || !postImage ) return next(ErrorHandler(500, 'All fields are required!'))
        let newPost = await Post.create({
            ...req.body,
            userName : req.user._id
        })
        res.status(200).json({ data : newPost })
    } catch (error) {
        next(error)
    }
})
export let FetchPost = expressAsync(async (req,res,next) => {
    try {
        let allPost = await Post.find({}).sort({ createdAt : -1}).populate('userName');
        res.status(200).json({ data : allPost })
    } catch (error) {
        next(error)
    }
})
export let SinglePost = expressAsync(async (req,res,next) => {
    try {
        let { id } = req.params;
        let SinglePost = await Post.findById(id).populate('userName');
        res.status(200).json({ data : SinglePost })
    } catch (error) {
        next(error)
    }
})
export let LoggedInUserRelatedPost = expressAsync(async (req,res,next) => {
    try {
        let Info = await Post.find({ userName : req?.user?._id}).populate('userName');
        res.status(200).json({ data : Info })      
    } catch (error) {
        next(error)
    }
})
export let editPost = expressAsync(async (req,res,next) => {
    try {
        let { id } = req.params;
        let EditPost = await Post.findById(id).populate('userName');
        let isUserAdmin = await User.findById(req?.user?._id)
        if((EditPost?.userName?._id == req?.user?._id) || (isUserAdmin?.isAdmin)){
            let EditiedPost = await Post.findByIdAndUpdate(id,{
                $set : {
                    ...req.body,
                    title : req.body.title,
                    body : req.body.body
                }
            }, { new : true }).populate('userName');
            res.status(200).json({ data : EditiedPost })
        }else{
            return next(ErrorHandler(500, 'owner privillage only!'))
        }
    } catch (error) {
        next(error)
    }
})
export let DeletePost = expressAsync(async (req,res,next) => {
    try {
        let { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.status(200).json({ data : 'Post delete Successfully!'})
    } catch (error) {
        next(error)
    }
})
export let RelatedUserPost = expressAsync(async (req,res,next) => {
    try {
        let { name } = req.params;
        let UserFound = await User.findOne({ username : name });
        let RelatedPosts = await Post.find({ userName : UserFound._id }).populate('userName');
        res.status(200).json({ data : RelatedPosts });
    } catch (error) {
        next(error)
    }
})