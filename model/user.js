const mongoose = require('mongoose')

module.exports = class User {

    constructor(uDB) {
        this.UserDB = uDB
    }

    async addUser(body) {
        let user = new this.UserDB({
            userId: body.id,
            followers: []
        })
        return user
            .save()
            .then(user => {
                return user
            })
            .catch(err => {
                return {"error": err}
            })
    }

    async getFollwers(id) {
        return this.UserDB
            .findOne({ userId: id })
            .then((user => {
                return user
            }))
            .catch(err => {
                return {"error": err}
            })
    }

    async addFollower(id, body) {
        return this.UserDB
            .findOne({ userId: id })
            .then(user => {
                user.followers.push(body.followerId)
                return user
                    .save()
                    .then(user => {
                        return user
                    })
                    .catch(err => {
                        return {"error": err}
                    })
            })
            .catch(err => {
                return {"error": err}
            })
    }

    async deleteFollower(id, body) {
        return this.UserDB
            .findOne({userId: id})
            .then(user => {
                user.followers.pull(body.followerId)
                return user
                    .save()
                    .then(user => {
                        return user
                    })
                    .catch(err => {
                        return {"error": err}
                    })
            })
            .catch(err => {
                return {"error": err}
            })
    }

}
