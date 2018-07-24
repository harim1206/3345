const initialState = {
  playlistTitlesContainerDisplay: false,
  playlistTracksContainerDisplay: false
}


export default function(state = initialState, action){
  switch(action.type){

    case 'TOGGLE_LIBRARY':
      return {
        ...state,
        playlistTracksContainerDisplay: action.toggle
      }

    case 'TOGGLE_PLAYLIST_TITLES_CONTAINER':
      return {
        ...state,
        playlistTitlesContainerDisplay: action.toggle
      }

    default:
      return state
  }
}
