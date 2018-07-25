import { shuffleArr, parseJSONtoData } from '../helpers/helper.js'
require('dotenv').config()

export function fetchCollection(){

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

export function fetchPlaylists(){

  const playlistUrl = '//localhost:3000/api/v1/playlists'

  return function(dispatch){
    fetch(playlistUrl)
    .then(res => res.json())
    .then(data => {

      const playlists = data.data.map((obj)=>{
        return {id: obj.id, name: obj.attributes.name}
      })

      return dispatch({
        type: 'FETCH_PLAYLISTS',
        playlists: playlists
      })
    })
  }

}

export function onReleaseClick(release, nextRelease, id){
  console.log(`onReleaseClick() id: `, id)
  let tracks = []
  let videos = []

  const token = process.env.REACT_APP_API_TOKEN;
  const url = release.resource_url + `?token=${token}`

  return function (dispatch){

    fetch(url)
    .then(res => res.json())
    .then(data => {

      tracks = data.tracklist.map((track)=>{
        return ({
          id: id,
          duration: track.duration,
          position: track.position,
          title: track.title
        })
      })

      if(data.videos){

        videos = data.videos.map((video)=>{
          return({
            description: video.description,
            title: video.title,
            uri: video.uri,
            duration: video.duration
          })
        })
      }

      return dispatch({
        type: 'ON_RELEASE_CLICK',
        currentRelease: release,
        nextRelease: nextRelease,
        currentReleaseTracks: tracks,
        currentReleaseVideos: videos,
        currentReleaseImgUrl: data.images[0].uri,

      })

    })
  }


}

export function onLibraryVideoFinish(newCurrentVideo, newNextVideo, newCurrentRelease, newNextRelease){

  return {
    type: 'ON_LIBRARY_VIDEO_FINISH',
    newCurrentVideo: newCurrentVideo,
    newNextVideo: newNextVideo,
    newCurrentRelease: newCurrentRelease,
    newNextRelease: newNextRelease
  }

}

export function onPlaylistTracksVideoFinish(newCurrentTrack, newNextTrack){

  return {
    type: 'ON_PLAYLIST_TRACKS_VIDEO_FINISH',
    newCurrentTrack: newCurrentTrack,
    newNextTrack: newNextTrack
  }

}

export function onVideoClick(newCurrentVideo, newNextVideo){

  return {
    type: 'ON_VIDEO_CLICK',
    newCurrentVideo: newCurrentVideo,
    newNextVideo: newNextVideo
  }

}

export function onSort(sortedData){

  return {
    type: 'ON_SORT',
    sortedData: sortedData
  }

}

export function onCurrentPlaylistTrackClick(newCurrentTrack, newNextTrack){

  return {
    type: 'ON_CURRENT_PLAYLIST_TRACK_CLICK',
    newCurrentTrack: newCurrentTrack,
    newNextTrack: newNextTrack
  }

}

export function onNewPlaylistSubmit(postData){

  return function(dispatch){

    fetch('http://localhost:3000/api/v1/playlists', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(res =>res.json())
    .then(data =>{
      const playlist = {id: data.data.id, name: data.data.attributes.name}

      return dispatch({
        type: 'ON_NEW_PLAYLIST_SUBMIT',
        playlist: playlist
      })
    })

  }

}

export function onPlaylistTitleDelete(playlistUrl){

  return function(dispatch){

    fetch(playlistUrl,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res=>{
      const playlistUrl = '//localhost:3000/api/v1/playlists'

      fetch(playlistUrl)
      .then(res => res.json())
      .then(data => {

        const newPlaylists = data.data.map((obj)=>{
          return {id: obj.id, name: obj.attributes.name}
        })

        return dispatch({
          type: 'ON_PLAYLIST_TITLE_DELETE',
          newPlaylists: newPlaylists
        })
      })
    })

  }
}
