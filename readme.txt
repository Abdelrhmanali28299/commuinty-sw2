# commuinty-sw2
we make a community api 
## Features

* No registration
* Zero-config
* Basic API
* "Has many" relationships
* Filters and nested resources
* Supports GET, POST, PUT, PATCH, DELETE and OPTIONS verbs
* HTTP or HTTPS
* Compatible with React, Angular,...

# GET/ 
  ### http://localhost:5050/post/user/5
  ```js
// Get all posts of user that has ID 5
fetch(' http://localhost:5050/post/user/5')
  .then(response => response.json())
  .then(json => console.log(json))
```
### Creating a resource

```js
// POST addPost 
fetch('http://localhost:5050/post/', {
    method: 'POST',
    body: JSON.stringify({
      writerId: '1',
      description: 'good',
      type: 'bar'
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))

/* will return
{
  id: ...,
  writerId: '1',
  description: 'good',
      type: 'bar'
}
*/
```



addPost

