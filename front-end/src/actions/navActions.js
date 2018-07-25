export function onLibraryToggleClick(){

  return {
    type: 'TOGGLE_LIBRARY',
    toggle: false
  }
}

export function onPlaylistTitlesContainerToggleClick(toggle){

  return {
    type: 'TOGGLE_PLAYLIST_TITLES_CONTAINER',
    toggle: toggle
  }

}
