const mongoose = require('mongoose')

module.exports = class Post {
    constructor(pDB, uDB) {
        this.PostDB = pDB
        this.UserDB = uDB
    }

    async getHomePosts(req, res) {
        this.UserDB
            .find({ userId: req.params.id })
            .then(user => {
                let arr = [];
                user.followers.forEach(followerId => {
                    this.PostDB
                        .find({ writerId: followerId, type: "Public"})
                        .then(posts => {
                            arr.push(posts);
                        })
                });
                res.json(arr);
            })
    }

    async getPostsOfUser(req, res) {
        this.PostDB
            .find({ writerId: req.params.id })
            .then(posts => {
                res.json(posts)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    async getPost(req, res) {
        this.PostDB
            .findById(req.params.id)
            .exec()
            .then(post=>{
                res.json(post)
            }).catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
    }

    async addPost(req, res) {
        let post = new this.PostDB({
            writerId: req.body.id,
            description: req.body.body,
            type: req.body.type
        })
        post
            .save()
            .then(data => {
                res.json(data)
            })
    }

    async editPost(req, res) {
        this.PostDB
            .findById(req.params.id)
            .exec()
            .then(post=>{
                post.description = req.body.body
                post.type = req.body.type
                post
                    .save()
                    .then((newPost) => {
                        res.json(newPost)
                    })
            }).catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
    }

    async deletePost(req, res) {
        this.PostDB
            .deleteOne({ _id: req.params.id })
            .exec().then(post=>{
                res.status(200).json(post)
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
    }

}
