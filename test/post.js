const mocha = require("mocha")
const assert = require("assert")
const app = require("../app")
const Post = require('../model/post')
const PostDB = require('../model/postDB')
const UserDB = require('../model/userDB')
const post = new Post(PostDB, UserDB)

describe("Post endpoints test", () => {
    it("add post endpoint", async () => {
        let body = {
            "id": "123456",
            "body": "lolol7",
            "type": "public"
        }
        let posts = await post.addPost(body)

        assert(posts.writerId === "123456")
    })
})