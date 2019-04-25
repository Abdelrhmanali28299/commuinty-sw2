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

}
