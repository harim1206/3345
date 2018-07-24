const initialState = {
  libraryReleases: [],
  currentVideo: {url: "https://www.youtube.com/watch?v=rtXIdykj2QE"},
  nextVideo: {},
  currentReleaseImgUrl: "",
  currentRelease: {},
  nextRelease: {},
  currentReleaseTracks: [],
  currentReleaseVideos: [],
  currentTrack: {},
  nextTrack: {},
  playlists: []


}

export default function(state = initialState, action){
  console.log('library reducer action: ', action)
  switch(action.type){
    case 'FETCH_COLLECTION':
      return {
        ...state,
        currentVideo: {url: "https://www.youtube.com/watch?v=rtXIdykj2QE"},
        libraryReleases: action.parsedData,
        currentRelease: action.parsedData[0],
        nextRelease: action.parsedData[1]

      }
    case 'FETCH_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists
      }

    case 'ON_RELEASE_CLICK':
      return {
        ...state,
        currentRelease: action.currentRelease,
        nextRelease: action.nextRelease,
        currentReleaseTracks: action.currentReleaseTracks,
        currentReleaseVideos: action.currentReleaseVideos,
        currentReleaseImgUrl: action.currentReleaseImgUrl
      }

    case 'ON_LIBRARY_VIDEO_FINISH':
      return {
        ...state,
        currentVideo: action.newCurrentVideo,
        nextVideo: action.newNextVideo,
        currentRelease: action.newCurrentRelease,
        nextRelease: action.newNextRelease
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
