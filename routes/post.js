const express = require('express')
const Post = require('../model/post')

const router = express.Router()

const post = new Post()

router.get('/home/:id', (req, res) => {
    post.getHomePosts(req, res);
})

router.get('/user/:id', (req, res) => {
    post.getPostsOfUser(req, res)
})

router.get('/:id',(req,res)=>{
    post.getPost(req,res)
})

router.post('/', (req, res) => {
    post.addPost(req, res)
})

router.delete('/:id',(req,res)=>{
    post.deletePost(req,res)
})

module.exports = router
