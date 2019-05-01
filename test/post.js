const mocha = require("mocha")
const assert = require("assert")
var should = require('chai').should();
const app = require("../app")
const Post = require('../model/post')
const user = require('../model/user')
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

describe("GET endpoints test", () => {
    it("get post endpoint", async () => {
        let id = "5cc9c0018f7b173110c3009d"
        let posts = await post.getPost(id)
        assert(posts.id === "5cc9c0018f7b173110c3009d")
    })

})

describe("GET by id endpoints test", () => {
    it("get post endpoint", async () => {
        let id = "5"
        let posts = await post.getPostsOfUser(id)
        assert(posts[0].writerId === "5")
    })

})

describe("put endpoints test", () => {
    it("edit post endpoint", async () => {
        let id = "5cc9c0018f7b173110c3009d"
        let body = {
            "id": "123456",
            "body": "lolol7",
            "type": "public"
        }
        let posts = await post.editPost(id, body)
        assert(posts.id === "5cc9c0018f7b173110c3009d")
    })

})

describe("add upVote  endpoints test", () => {
    it("upvote post endpoint", async () => {
        let id = "5cc9c0018f7b173110c3009d"
        let body = {
            "id": "1"
        }
        let posts = await post.addUpVote(id, body)
        assert(posts.id === "5cc9c0018f7b173110c3009d")
    })

})
