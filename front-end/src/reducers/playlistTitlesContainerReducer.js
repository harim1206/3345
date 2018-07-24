const initialState = {
  currentPlaylistTracks: [],
  playlistTracksContainerDisplay: false
}


export default function(state = initialState, action){
  
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
