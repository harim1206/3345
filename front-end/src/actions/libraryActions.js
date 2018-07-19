import { shuffleArr, parseJSONtoData } from '../helpers/helper.js'
// export function fetchPosts(){
//   console.log('fetching')
//   return function(dispatch){
//     fetch(`https://jsonplaceholder.typicode.com/posts`)
//       .then(res => res.json())
//       .then(posts => dispatch({
//         type: FETCH_POSTS,
//         payload: posts
//       }))
//   }
// }

export function fetchCollection(){
  console.log('fetching')

  const collectionUrl = 'https://api.discogs.com/users/harim1206/collection/folders/0/releases?per_page=300&page=1&f=json'

  return function(dispatch){

    fetch(collectionUrl, {mode: 'cors'})
    .then(res => res.json())
    .then(data => {
      let releases = data.releases.slice(0,500)

      releases.sort((a,b)=>{
        let keyA = new Date(a.date_added),
            keyB = new Date(b.date_added);

        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0;
      })

      const parsedData = parseJSONtoData(releases)

      return dispatch({
        type: 'FETCH_COLLECTION',
        parsedData: parsedData
      })
    })

  }
}
