const initialState = {
  currentPlaylistTracks: [],
  playlistTracksContainerDisplay: false
}


export default function(state = initialState, action){
  console.log('playlistTitlesContainer reducer action: ', action)
  console.log('playlistTitlesContainer reducer state: ', state)
  switch(action.type){



    case 'SHOW_PLAYLIST_TRACKS_CONTAINER':
      return {
        ...state,
        currentPlaylistTracks: action.currentPlaylistTracks

      }

    case '':
      return {
        ...state,

      }

    default:
      return state
  }
}
