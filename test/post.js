const mocha = require("mocha")
const assert = require("assert")

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
