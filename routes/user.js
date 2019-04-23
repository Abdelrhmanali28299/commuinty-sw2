const express = require('express')

const User = require('../model/user')
const PostDB = require('../model/postDB')
const UserDB = require('../model/userDB')
const router = express.Router()

const user = new User(UserDB, PostDB)

router.get('/:id', (req, res) => {
    user.getFollwers(req, res);
})

module.exports = router
