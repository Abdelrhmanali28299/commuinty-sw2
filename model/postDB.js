const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    writerId:{
        type: Schema.Types.ObjectId,
        ref: 'user'
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
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

const modelClass = mongoose.model('posts', storySchema)

module.exports = modelClass