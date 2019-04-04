const express = require('express')

const router = express.Router()

router.post('/add', (req, res) => {

    let post = new Post({
        description: req.body.body,
        user: req.user.id
    })
    post
        .save()
        .then(data => {
            res.json(data)
        })

})

module.exports = router