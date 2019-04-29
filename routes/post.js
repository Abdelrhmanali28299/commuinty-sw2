const express = require('express')
const Post = require('../model/post')
const PostDB = require('../model/postDB')
const UserDB = require('../model/userDB')

const router = express.Router()

const post = new Post(PostDB, UserDB)

router.get('/home/:id', async (req, res) => {
    let posts = await post.getHomePosts(req.params.id)
    res.json(posts)
})

router.get('/user/:id', async (req, res) => {
    let posts = await post.getPostsOfUser(req.params.id)
    res.json(posts)
})

router.get('/:id', async (req, res) => {
    let posts = await post.getPost(req.params.id)
    res.json(posts)
})

router.post('/', async (req, res) => {
    let posts = await post.addPost(req.body)
    res.json(posts)
})

router.put('/:id', async (req, res) => {
    let posts = await post.editPost(req.params.id, req.body)
    res.json(posts)
})

router.delete('/:id', async (req, res) => {
    let posts = await post.deletePost(req.params.id)
    res.json(posts)
})

router.post('/comment/:id', async (req, res) => {
    let posts = await post.addComment(req.params.id, req.body)
    res.json(posts)
})

router.post('/upvote/:id', async (req, res) => {
    let posts = await post.addUpVote(req.params.id, req.body)
    res.json(posts)
})

router.post('/downvote/:id', async (req, res) => {
    let posts = await post.addDownVote(req.params.id, req.body)
    res.json(posts)
})

module.exports = router
