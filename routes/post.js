const express = require('express')
const Post = require('../model/post')

const router = express.Router()

const post = new Post()

router.get('/user/:id', (req, res) => {
    post.getPostsOfUser(req, res)
})

router.post('/add', (req, res) => {
    post.addPost(req, res)
})

module.exports = router
