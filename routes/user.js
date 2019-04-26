const express = require('express')
const User = require('../model/user')
const UserDB = require('../model/userDB')
const router = express.Router()

const user = new User(UserDB)

router.post('/', (req, res) => {
    user.addUser(req, res)
})

router.get('/:id', (req, res) => {
    user.getFollwers(req, res)
})

router.post('/follower/:id', (req, res) => {
    user.addFollower(req, res)
})

router.delete('/follower/:id',(req,res)=>{
    user.deleteFollower(req, res)
})

module.exports = router
