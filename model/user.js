const mongoose = require('mongoose')

module.exports = class Post {

    constructor(uDB, pDB) {
        this.UserDB = uDB
        this.PostDB = pDB
    }

    async getFollwers(req, res) {
        this.UserDB
            .findOne({userId: req.params.id})
            .then((user => {
                res.json(user.followers)
            }))
    }

}
