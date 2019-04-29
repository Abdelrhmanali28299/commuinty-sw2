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

