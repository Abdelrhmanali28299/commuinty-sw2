const mongoose = require('mongoose')

module.exports = class Post {
    constructor(pDB, uDB) {
        this.PostDB = pDB
        this.UserDB = uDB
    }

    async getPostForFollower(followerId) {
        return await this.PostDB
            .find({ writerId: followerId, type: "public" })
    }

    async getHomePosts(id) {
        return await this.UserDB
            .findOne({ userId: id })
            .then(async user => {
                var arr = []
                for (let i = 0; i < user.followers.length; i++) {
                    arr.push(...await this.getPostForFollower(user.followers[i]))
                }
                this.PostDB
                    .find()
                    .then(posts => {
                        for (let i = 0; i < posts.length; i++) {
                            let x = 0
                            for (let v = 0; v < arr.length; v++) {
                                if (posts[i].id == arr[v].id) {
                                    x = 0
                                    break
                                } else {
                                    x = 1
                                }
                            }
                            if (x == 1) {
                                arr.push(posts[i])
                            }
                        }
                        return arr
                    })
                    .catch(err => {
                        return {"error": err}
                    })
                return arr
            })
            .catch(err => {
                return {"error": err}
            })
    }

    async getPostsOfUser(id) {
        return this.PostDB
            .find({ writerId: id })
            .then(posts => {
                return posts
            })
            .catch(err => {
                return {"error": err}
            })
    }

    async getPost(id) {
        return this.PostDB
            .findById(id)
            .exec()
            .then(post => {
                return post
            }).catch(err => {
                return {"error": err}
            })
    }

    async addPost(body) {
        let post = new this.PostDB({
            writerId: body.id,
            description: body.body,
            type: body.type
        })
        return post
            .save()
            .then(newPost => {
                return newPost
            })
            .catch(err => {
                return {"error": err}
            })
    }

    async editPost(id, body) {
        return this.PostDB
            .findById(id)
            .exec()
            .then(post => {
                var newPost
                post.description = body.body
                post.type = body.type
                post.save()
                return post
            }).catch(err => {
                return {"error": err}
            })
    }

    async deletePost(id) {
        return this.PostDB
            .deleteOne({ _id: id })
            .exec()
            .then(deleted => {
                return deleted
            })
            .catch(err => {
                return {"error": err}
            })
    }

    async addComment(id, body) {
        return this.PostDB
            .findOne({ _id: id })
            .then(post => {
                let newComment = {
                    commentBody: body.commentBody,
                    commentUser: body.id
                }
                post.comments.unshift(newComment)
                post
                    .save()
                    .then(newPost => {
                        return newPost
                    })
                    .catch(err => {
                        return {"error": err}
                    })
                return post
            })
            .catch(err => {
                return {"error": err}
            })
    }

    async addUpVote(id, body) {
        return this.PostDB
            .findOne({ _id: id })
            .then(post => {
                if (post.upVote.indexOf(body.id) == -1 && post.downVote.indexOf(body.id) == -1) {
                    post.upVote.unshift(body.id)
                    post
                        .save()
                        .then(post => {
                            return post
                        })
                        .catch(err => {
                            return {"error": err}
                        })
                } else if (post.upVote.indexOf(body.id) == -1 && post.downVote.indexOf(body.id) != -1) {
                    post.downVote.splice(post.downVote.indexOf(body.id), 1)
                    post
                        .save()
                        .then(post => {
                            return post
                        })
                        .catch(err => {
                            return {"error": err}
                        })
                } else {
                    post.upVote.splice(post.upVote.indexOf(body.id), 1)
                    post
                        .save()
                        .then(post => {
                            return post
                        })
                        .catch(err => {
                            return {"error": err}
                        })
                }
                return post
            })
            .catch(err => {
                return {"error": err}
            })
    }

    async addDownVote(id, body) {
        return this.PostDB
            .findOne({ _id: id })
            .then(post => {
                if (post.downVote.indexOf(body.id) == -1 && post.upVote.indexOf(body.id) == -1) {
                    post.downVote.unshift(body.id)
                    post
                        .save()
                        .then(post => {
                            return post
                        })
                        .catch(err => {
                            return {"error": err}
                        })
                } else if (post.downVote.indexOf(body.id) == -1 && post.upVote.indexOf(body.id) != -1) {
                    post.upVote.splice(post.upVote.indexOf(body.id), 1)
                    post
                        .save()
                        .then(post => {
                            return post
                        })
                        .catch(err => {
                            return {"error": err}
                        })
                } else {
                    post.downVote.splice(post.downVote.indexOf(body.id), 1)
                    post
                        .save()
                        .then(post => {
                            return post
                        })
                        .catch(err => {
                            return {"error": err}
                        })
                }
                return post
            })
            .catch(err => {
                return {"error": err}
            })
    }

}
