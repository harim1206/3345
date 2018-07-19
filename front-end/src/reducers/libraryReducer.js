const initialState = {
  // items: [],
  // item: {}
  libraryReleases: [],
  currentRelease: {},
  nextRelease: {},
  currentVideo: {url: "https://www.youtube.com/watch?v=rtXIdykj2QE"}

}

export default function(state = initialState, action){
  console.log('library reducer action: ', action)
  switch(action.type){
    case 'FETCH_COLLECTION':
    console.log(`reducer`)
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}

// this.setState({
//   libraryReleases: parsedData,
//   currentRelease: parsedData[0],
//   nextRelease: parsedData[1],
//   currentVideo: {url: "https://www.youtube.com/watch?v=rtXIdykj2QE"}
// })
