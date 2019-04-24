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

}
