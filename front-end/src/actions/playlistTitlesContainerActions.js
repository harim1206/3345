


export function onPlaylistTitleClick(playlist){

  const url = `//localhost:3000/api/v1/playlists/${playlist.id}`

  return function(dispatch){

    dispatch({
      type: 'TOGGLE_LIBRARY',
      toggle: true,
    })

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      const tracks = data.data.attributes.tracks
      dispatch({
        type: 'SHOW_PLAYLIST_TRACKS_CONTAINER',
        currentPlaylistTracks: tracks
      })
    })



  }



}
