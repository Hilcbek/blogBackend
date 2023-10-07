import express from 'express'
import { VerifyLoggedInUser } from '../auth/token.js'
import { AddPost, DeletePost, FetchPost, LoggedInUserRelatedPost, RelatedUserPost, SinglePost, editPost } from '../Controllers/post.Controller.js'

export let postRouter = express.Router()
postRouter.post('/',VerifyLoggedInUser, AddPost);
postRouter.get('/', FetchPost);
postRouter.get('/:id',VerifyLoggedInUser,SinglePost)
postRouter.put('/:id',VerifyLoggedInUser, editPost)
postRouter.get('/own/posts',VerifyLoggedInUser,LoggedInUserRelatedPost)
postRouter.delete('/:id',VerifyLoggedInUser, DeletePost)
postRouter.get('/relatedUserPost/:name',VerifyLoggedInUser, RelatedUserPost)