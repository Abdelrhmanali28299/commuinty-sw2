const mongoose = require('mongoose')

module.exports = class User {

    constructor(uDB) {
        this.UserDB = uDB
    }

    async getFollwers(req, res) {
        this.UserDB
            .findOne({userId: req.params.id})
            .then((user => {
                res.json(user.followers)
            }))
    }

    async addFollower(req, res) {
        this.UserDB
            .findOne({ userId: req.params.id })
            .then(user => {
                user.followers.push(req.body.followerId)
                user
                    .save()
                    .then(user => {
                        res.json(user)
                    })
            })
    }
    
    async deleteFollower(req, res){
        this.UserDB
        .findOne({ userId: req.params.id })
        .then(user => {
            user.followers.pull(req.body.followerId)
            user
                .save()
                .then(user => {
                    res.json(user)
                })
        })
    }

    async addUser(req, res) {
        let user = new this.UserDB({
            userId: req.body.id,
            followers: []
        })
        user
            .save()
            .then(user => {
                res.json(user)
            })
    }

}
