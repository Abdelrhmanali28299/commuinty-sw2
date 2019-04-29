const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    followers: [
        {
            type: String
        }
    ]
})

const modelClass = mongoose.model('users', userSchema)

module.exports = modelClass