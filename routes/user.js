const express = require('express')
const User = require('../model/user')
const UserDB = require('../model/userDB')
const router = express.Router()

const user = new User(UserDB)

router.post('/', async (req, res) => {
    let users = await user.addUser(req.body)
    res.json(users)
})

router.get('/:id', async (req, res) => {
    let users = await user.getFollwers(req.params.id)
    res.json(users)
})

router.post('/follower/:id', async (req, res) => {
    let users = await user.addFollower(req.params.id, req.body)
    res.json(users)
})

router.delete('/follower/:id', async (req, res) => {
    let users = await user.deleteFollower(req.params.id, req.body)
    res.json(users)
})

module.exports = router
