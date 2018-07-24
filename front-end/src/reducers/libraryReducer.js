const initialState = {

  // Parsed Releases
  libraryReleases: [],
  // Current Video/Image
  currentVideo: {url: "https://www.youtube.com/watch?v=rtXIdykj2QE"},
  nextVideo: {},
  currentReleaseImgUrl: "",
  //Current Release
  currentRelease: {},
  nextRelease: {},
  currentReleaseTracks: [],
  currentReleaseVideos: [],
  //Current Track
  currentTrack: {},
  nextTrack: {},
  //Playlists
  playlists: []


}

export default function(state = initialState, action){
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

    case 'ON_PLAYLIST_TRACKS_VIDEO_FINISH':
      return {
        ...state,
        currentVideo: action.newCurrentTrack,
        nextVideo: action.newNextTrack,
        currentTrack: action.newCurrentTrack,
        nextTrack: action.newNextTrack
      }

    case 'ON_VIDEO_CLICK':
      return {
        ...state,
        currentVideo: action.newCurrentVideo,
        nextVideo: action.newNextVideo
      }

    case 'ON_SORT':
      console.log(`action.sortedData: `, action.sortedData)
      return {
        ...state,
        libraryReleases: action.sortedData
      }

    case 'ON_CURRENT_PLAYLIST_TRACK_CLICK':
      return {
        ...state,
        currentTrack: action.newCurrentTrack,
        nextTrack: action.newNextTrack,
        currentVideo: action.newCurrentTrack,
        nextVideo: action.newNextTrack,
        currentReleaseImgUrl: action.newCurrentTrack.imgurl

      }

    case 'ON_NEW_PLAYLIST_SUBMIT':
      return {
        ...state,
        playlists: [...state.playlists, action.playlist]
      }

    case 'ON_PLAYLIST_TITLE_DELETE':
      return {
        ...state,
        playlists: action.newPlaylists
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
