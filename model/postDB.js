const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    writerId:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    comments: [{
        commentBody: {
            type: String,
            required: true
        },
        commentDate: {
            type: Date,
            default: Date.now
        },
        commentUser: {
            type: String,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

const modelClass = mongoose.model('posts', postSchema)

module.exports = modelClass