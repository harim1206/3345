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
      return {
        ...state,
        libraryReleases: action.parsedData,
        currentRelease: action.parsedData[0],
        nextRelease: action.parsedData[1],
        currentVideo: {url: "https://www.youtube.com/watch?v=rtXIdykj2QE"}
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
