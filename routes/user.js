const express = require('express')
const User = require('../model/user')
const UserDB = require('../model/userDB')
const router = express.Router()

const user = new User(UserDB)

router.get('/:id', (req, res) => {
    user.getFollwers(req, res)
})

router.post('/follower/:id', (req, res) => {
    user.addFollower(req, res)
})

module.exports = router
