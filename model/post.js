const mongoose = require('mongoose')

module.exports = class Post {
    constructor(pDB, uDB) {
        this.PostDB = pDB
        this.UserDB = uDB
    }

    async getPostForFollower(followerId) {
        return await this.PostDB
            .find({ writerId: followerId, type: "public" });
    }

    async getHomePosts(req, res) {
        this.UserDB
            .findOne({ userId: req.params.id })
            .then(async user => {
                let arr = []
                for (let i = 0; i < user.followers.length; i++) {
                    arr.push(...await this.getPostForFollower(user.followers[i]))
                }
                this.PostDB
                    .find()
                    .then(posts => {
                        for (let i = 0; i < posts.length; i++) {
                            let x = 0
                            for (let v = 0; v < arr.length; v++) {
                                if(posts[i].id == arr[v].id) {
                                    x = 0;
                                    break
                                } else {
                                    x = 1
                                }
                            }
                            if(x == 1) {
                                arr.push(posts[i])
                            }
                        }
                        res.json(arr)
                    })
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
            .then(post => {
                res.json(post)
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
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
            .then(post => {
                post.description = req.body.body
                post.type = req.body.type
                post
                    .save()
                    .then((newPost) => {
                        res.json(newPost)
                    })
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    }

    async deletePost(req, res) {
        this.PostDB
            .deleteOne({ _id: req.params.id })
            .exec().then(post => {
                res.status(200).json(post)
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }

    async addComment(req, res) {
        this.PostDB
            .findOne({ _id: req.params.id })
            .then(post => {
                let newComment = {
                    commentBody: req.body.commentBody,
                    commentUser: req.body.id
                }
                post.comments.unshift(newComment)
                post
                    .save()
                    .then(post => {
                        res.json(post)
                    })
            })
    }

    async addUpVote(req, res) {
        this.PostDB
            .findOne({ _id: req.params.id })
            .then(post => {
                if (post.upVote.indexOf(req.body.id) == -1 && post.downVote.indexOf(req.body.id) == -1) {
                    post.upVote.unshift(req.body.id)
                    post
                        .save()
                        .then(post => {
                            res.json(post)
                        })
                } else if (post.upVote.indexOf(req.body.id) == -1 && post.downVote.indexOf(req.body.id) != -1) {
                    post.downVote.splice(post.downVote.indexOf(req.body.id), 1)
                    post
                        .save()
                        .then(post => {
                            res.json(post)
                        })
                } else {
                    post.upVote.splice(post.upVote.indexOf(req.body.id), 1)
                    post
                        .save()
                        .then(post => {
                            res.json(post)
                        })
                }
            })
    }
    
    async addDownVote(req, res) {
        this.PostDB
            .findOne({ _id: req.params.id })
            .then(post => {
                if (post.downVote.indexOf(req.body.id) == -1 && post.upVote.indexOf(req.body.id) == -1) {
                    post.downVote.unshift(req.body.id)
                    post
                        .save()
                        .then(post => {
                            res.json(post)
                        })
                } else if (post.downVote.indexOf(req.body.id) == -1 && post.upVote.indexOf(req.body.id) != -1) {
                    post.upVote.splice(post.upVote.indexOf(req.body.id), 1)
                    post
                        .save()
                        .then(post => {
                            res.json(post)
                        })
                } else {
                    post.downVote.splice(post.downVote.indexOf(req.body.id), 1)
                    post
                        .save()
                        .then(post => {
                            res.json(post)
                        })
                }
            })
    }

}
