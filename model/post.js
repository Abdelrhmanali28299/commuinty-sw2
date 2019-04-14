const mongoose = require('mongoose')
const PostDB = require('./postDB')

module.exports = class Post {

    async getPostsOfUser(req, res) {
        PostDB
            .find({writerId: req.parse.id})
            .then((posts) => {
                res.json(posts)
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

}