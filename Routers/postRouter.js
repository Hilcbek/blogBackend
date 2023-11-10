import express from 'express'
import { VerifyLoggedInUser } from '../auth/token.js'
import { AddPost, DeletePost, FetchPost, LoggedInUserRelatedPost, RelatedUserPost, SinglePost, editPost } from '../Controllers/post.Controller.js'

export let postRouter = express.Router()
postRouter.post('/', AddPost);
postRouter.get('/', FetchPost);
postRouter.get('/:id',SinglePost)
postRouter.put('/:id', editPost)
postRouter.get('/own/posts',LoggedInUserRelatedPost)
postRouter.delete('/:id', DeletePost)
postRouter.get('/relatedUserPost/:name', RelatedUserPost)