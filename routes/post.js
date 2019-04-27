const express = require('express')
const Post = require('../model/post')
const PostDB = require('../model/postDB')
const UserDB = require('../model/userDB')
const router = express.Router()

const post = new Post(PostDB, UserDB)

router.get('/home/:id', (req, res) => {
    post.getHomePosts(req, res);
})

router.get('/user/:id', (req, res) => {
    post.getPostsOfUser(req, res)
})

router.get('/:id', (req, res) => {
    post.getPost(req, res)
})

router.post('/', (req, res) => {
    post.addPost(req, res)
})

router.put('/:id', (req, res) => {
    post.editPost(req, res)
})

router.delete('/:id', (req, res) => {
    post.deletePost(req, res)
})

router.post('/comment/:id', (req, res) => {
    post.addComment(req, res)
})

router.post('/upvote/:id', (req, res) => {
    post.addUpVote(req, res)
})

module.exports = router
