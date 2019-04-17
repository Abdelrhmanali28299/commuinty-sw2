const mongoose = require('mongoose')
const PostDB = require('./postDB')
const UserDB = require('./userDB')

module.exports = class Post {

    async getHomePosts(req, res) {
        UserDB
            .find({ userId: req.params.id })
            .then(user => {
                let arr = [];
                user.followers.forEach(followerId => {
                    PostDB
                        .find({ writerId: followerId})
                        .then(posts => {
                            arr.push(posts);
                        })
                });
                res.json(arr);
            })
    }

    async getPostsOfUser(req, res) {
        PostDB
            .find({ writerId: req.params.id })
            .then(posts => {
                res.json(posts)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    async getPost(req,res){
        const id = req.params.id;
        PostDB
            .findById(id)
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
        let post = new PostDB({
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
    
    async deletePost(req,res){
        const ID = req.params.id;
        PostDB
            .deleteOne({ _id: ID })
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
