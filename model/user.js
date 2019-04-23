const mongoose = require('mongoose')

module.exports = class Post {

    constructor(uDB, pDB) {
        this.UserDB = uDB
        this.PostDB = pDB
    }

    async getFollwers(req, res) {
        
    }

}
