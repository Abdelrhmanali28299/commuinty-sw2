module.exports = class Post {

    async getPots(req, res) {
        res.status(200).json({
            message: 'here we will show all posts'
        })
    }

    async addPost(req, res) {
        let post = new Post({
            description: req.body.body,
            user: req.user.id
        })
        post
            .save()
            .then(data => {
                res.json(data)
            })
    }
    
}