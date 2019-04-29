# commuinty-sw2
we make a community api 

## Features


## GET/ 
### http://localhost:5050/post/user/5
  ```js
    // Get all posts of user that has ID 5
  fetch(' http://localhost:5050/post/user/5')
     .then(response => response.json())
     .then(json => console.log(json))
```


## post/
### http://localhost:5050/post/
```js
//POST addPost 
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
## DELETE/
### http://localhost:5050/post/5
```js
fetch('', {
  method: 'DELETE'
})
/* 
will delete the post with id 5
*/
```
## PUT/
### http://localhost:5050/post/5

```js
fetch('http://localhost:5050/post/5', {
    method: 'PUT',
    body: JSON.stringify({
     description:'asd',
     type:'asd'
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))

/* will return
{
  id:5,
  description:'asd',
  type:'asd'
}
*/
```


