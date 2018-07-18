export function fetchPosts(){
  console.log('fetching')
  return function(dispatch){
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(res => res.json())
      .then(posts => dispatch({
        type: 'FETCH_POSTS',
        payload: posts
      }))
  }
}

export function createPost(postData){
  console.log('action called')
  return function(dispatch){
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(res=>res.json())
    .then(post => dispatch({
      type: 'NEW_POST',
      payload: post
    }))
  }
}
