import React, { Component } from 'react';
import Video from './Video.js'
import Library from './Library.js'
import PlaylistContainer from '../container/PlaylistContainer.js'
import PlaylistDisplayContainer from '../container/PlaylistDisplayContainer'

import { shuffleArr, parseJSONtoData } from '../helpers/helper.js'
require('dotenv').config()

class App extends Component {
  state={
    // All Releases
    pagination: {},
    releases: [],
    shuffledReleases: [],
    // Current Release
    currentVideoURL: "",
    currentRelease: {},
    nextRelease:{},
    currentReleaseTracks: [],
    currentReleaseVideos:[],
    currentReleaseImgUrl:"",
    // Current Track
    currentTrack: {},
    nextTrack: {},
    // Playlists
    newPlaylistInput: "",
    playlists: [],
    // Playlist Display
    currentPlaylistTracks: [],
    // toggle
    playlistDisplay: false,
    playlistContainerDisplay: false
  }



  componentDidMount(){
    const collectionUrl = 'https://api.discogs.com/users/harim1206/collection/folders/0/releases?per_page=300&page=1&f=json'

    fetch(collectionUrl, {mode: 'cors'})
    .then(res => res.json())
    .then(data => {
      let releases = data.releases.slice(0,500)

      let releasesSortedByDateAdded = releases.sort((a,b)=>{
        let keyA = new Date(a.date_added),
            keyB = new Date(b.date_added);

        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0;
      })

      const parsedData = parseJSONtoData(releases)

      this.setState({
        pagination: data.pagination,
        releases: data.releases,
        shuffledReleases: parsedData,
        currentRelease: parsedData[0],
        nextRelease: parsedData[1]
      } , ()=>{
        console.log(`this.state:`, this.state)
        this.fetchReleaseURL(this.state.currentRelease)
      })
    })

    // fetch playlists from server
    const playlistUrl = '//localhost:3000/api/v1/playlists'

    fetch(playlistUrl)
    .then(res => res.json())
    .then(data => {

      const playlists = data.data.map((obj)=>{
        return {id: obj.id, name: obj.attributes.name}
      })

      this.setState({
        playlists: playlists
      },()=>console.log(`this.state.playlists after playlist fetch`, this.state.playlists))
    })

  }

  // Play video on click of the release
  onClick = (release, id) => {

    let tracks = []
    let videos = []

    const token = process.env.REACT_APP_API_TOKEN;
    const url = release.resource_url + `?token=${token}`

    fetch(url)
    .then(res => res.json())
    .then(data => {

      let randomVideo = {uri:""}
      if(data.videos){
        randomVideo = data.videos[Math.floor(Math.random()*data.videos.length)]
      }

      let tracksData = data.tracklist.map((track)=>{
        return ({
          id: id,
          duration: track.duration,
          position: track.position,
          title: track.title
        })
      })
      tracks = tracksData

      if(data.videos){
        let videosData = data.videos.map((video)=>{
          return({
            description: video.description,
            title: video.title,
            uri: video.uri,
            duration: video.duration
          })
        })

        videos = videosData
      }

      this.setState({
        currentRelease: release,
        nextRelease: this.state.shuffledReleases[id+1],
        currentReleaseTracks: tracks,
        currentReleaseVideos: videos,
        currentVideoURL: randomVideo.uri,
        currentReleaseImgUrl: data.images[0].uri,
      },()=>console.log(`state onClick: `,this.state))
    })


  }

  onCurrentPlaylistTrackClick = (track) =>{
    console.log(`this.state.currentPlaylistTracks`,this.state.currentPlaylistTracks)

    const tracks = this.state.currentPlaylistTracks
    const currentIndex = tracks.indexOf(track)
    const nextTrack = tracks[currentIndex+1]


    this.setState({
      currentTrack: track,
      nextTrack: nextTrack,
      currentVideoURL: track.url,
      currentReleaseImgUrl: track.imgurl
    },()=>console.log(`on track click state`, this.state))
  }

  onYoutubeClick = (video, event) =>{
    this.setState({
      currentVideoURL: video.uri
    })
  }

  // on table column header sort
  onSort = (sortKey) =>{
    let data = this.state.shuffledReleases
    console.log(`sortKey: `,sortKey)

    if(sortKey === 'id'){
      data.sort((a,b) => a[sortKey] - b[sortKey])
    }else if(sortKey=== 'date added'){
      data.sort((a,b)=>{
        let keyA = new Date(a['date_added']),
            keyB = new Date(b['date_added']);

        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0;
      })

    }else{
      data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
    }



    this.setState({shuffledReleases: data})

  }

  // play next video once it finishes
  onEnded = () =>{

    if(!this.state.playlistDisplay){
      const nextReleaseId = this.state.shuffledReleases.indexOf(this.state.nextRelease)

      this.setState({
        currentRelease: this.state.nextRelease,
        nextRelease: this.state.shuffledReleases[nextReleaseId+1]

      }, ()=>{
        this.fetchReleaseURL(this.state.currentRelease)
      })

    }else{
      const tracks = this.state.currentPlaylistTracks
      const currentIndex = tracks.indexOf(this.state.currentTrack)
      const nextTrack = tracks[currentIndex+2]

      this.setState({
        currentVideoURL: this.state.nextTrack.url,
        currentTrack: this.state.nextTrack,
        nextTrack: nextTrack

      },()=>console.log(`this.state onEnded`,this.state))

    }



  }

  fetchReleaseURL = (release) => {

    fetch(release.resource_url)
    .then(res=>res.json())
    .then(data=>{

      let randomVideo = {uri:""}
      if(data.videos){
        randomVideo = data.videos[Math.floor(Math.random()*data.videos.length)]
      }

      this.setState({
          currentVideoURL: randomVideo.uri
        },()=>{
          // console.log(`this.state after URL fetch, `,this.state)
      })

    })

  }

  // on new playlist submit
  onNewPlaylistSubmit = () =>{
    // e.preventDefault()

    let postData = {
      name: this.state.newPlaylistInput
    }

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

      this.setState({
        playlists: [...this.state.playlists, playlist]
      },()=>{
        console.log(`this.state after new playlist submission: `,this.state.playlists)
      })
    })


  }

  // new playlist input change
  onNewPlaylistInputchange = (e) =>{
    this.setState({
      newPlaylistInput: e.target.value
    })

  }

  // Toggle playlist on click
  onPlaylistClick = (playlist) => {

    const url = `//localhost:3000/api/v1/playlists/${playlist.id}`

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      const tracks = data.data.attributes.tracks

      this.setState({
        playlistDisplay: true,
        currentPlaylistTracks: tracks

      }/*, ()=>{console.log(`currentPlaylistTracks`,this.state.currentPlaylistTracks)}*/)
    })

  }

  // Delete playlist
  onPlaylistDelete = (playlist) => {


    const url = `//localhost:3000/api/v1/playlists/${playlist.id}`

    fetch(url,{
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

        const playlists = data.data.map((obj)=>{
          return {id: obj.id, name: obj.attributes.name}
        })

        this.setState({
          playlists: playlists
        },()=>console.log(`this.state.playlists after playlist fetch`, this.state.playlists))
      })

    })


  }

  // Toggle library on click
  onLibraryToggleClick = () =>{


    this.setState({
      playlistDisplay: false,
    })

  }

  onPlaylistToggleClick = () =>{
    // debugger
    const toggle = !this.state.playlistContainerDisplay
    this.setState({
      playlistContainerDisplay: toggle
    })
  }

  // on playlist select menu change, add track to playlist
  onTrackPlaylistChange = (video, release, event) =>{

    console.log(`this.state.currentReleaseImgUrl: `, this.state.currentReleaseImgUrl)

    let postData = {
      artist: release.artist,
      release: release.title,
      label: release.label,
      catno: release.catno,
      resource_url: release.resource_url,
      library_id: release.id,
      title: "",
      url: video.uri,
      description: video.description,
      duration: video.duration,
      imgurl: this.state.currentReleaseImgUrl,
      playlist_id: event.target.value
    }


    fetch('http://localhost:3000/api/v1/tracks', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(res =>res.json())
    .then(data =>{

    })

  }

  render() {
    let library
    let playlist
    let bgUrl
    let bgSize
    let bgTop
    let bgLeft
    let bgRepeat

    let libraryToggleButton

    if(this.state.playlistDisplay===true){
      libraryToggleButton = <div onClick={this.onLibraryToggleClick}>
        LIBRARY
      </div>
    }


    if(this.state.currentReleaseImgUrl){
      bgUrl = this.state.currentReleaseImgUrl
      bgSize = '450px 450px'
      bgTop = '0'
      bgLeft = '0'
      bgRepeat = 'repeat'
    }else{
      bgUrl = 'https://78.media.tumblr.com/a7f02d7176d50f610b7f544b28c92e5a/tumblr_ohtrc8hT9n1sm5cgbo1_640.jpg'
      bgTop = '0'
      bgLeft = '0'
    }

    let bgStyle = {
      backgroundImage: `url('${bgUrl}')`,
      backgroundSize: bgSize,
      width: '2500px',
      height: '2000px',
      backgroundRepeat: bgRepeat,
      position: 'fixed',
      top: bgTop,
      left: bgLeft,
      zIndex: '-5'
    }

    let  bgDiv = <div style={bgStyle}></div>


    let logo = <div id='logo'>33/45</div>


    if(!this.state.playlistDisplay){
      library = <Library
        shuffledReleases={this.state.shuffledReleases}
        currentRelease={this.state.currentRelease}
        currentReleaseTracks={this.state.currentReleaseTracks}
        currentReleaseVideos={this.state.currentReleaseVideos}
        playlists={this.state.playlists}
        onClick={this.onClick}
        onSort={this.onSort}
        onTrackPlaylistChange={this.onTrackPlaylistChange}
        onYoutubeClick={this.onYoutubeClick}
      />
    }else{
      library = <PlaylistDisplayContainer
        currentPlaylistTracks={this.state.currentPlaylistTracks}
        onCurrentPlaylistTrackClick={this.onCurrentPlaylistTrackClick}
      />
    }

    if(this.state.playlistContainerDisplay){
      playlist =  <PlaylistContainer
        onNewPlaylistSubmit = {this.onNewPlaylistSubmit}
        onNewPlaylistInputchange = {this.onNewPlaylistInputchange}
        onPlaylistClick = {this.onPlaylistClick}
        onPlaylistDelete = {this.onPlaylistDelete}
        newPlaylistInput = {this.state.newPlaylistInput}
        playlists = {this.state.playlists}
        onLibraryToggleClick = {this.onLibraryToggleClick}
      />
    }

    return (
      <div className="App">

        <div className="main-container-shadow">
          <Video
            onEnded={this.onEnded}
            currentVideoURL={this.state.currentVideoURL}
            currentReleaseImageURL={this.state.currentReleaseImgUrl}
          />

          <div className = "main-container-padding">
          <div className="playlist-toggle-div">
            <div onClick={this.onPlaylistToggleClick}>
              PLAYLISTS
            </div>
            {libraryToggleButton}
          </div>

          <div className={this.state.playlistContainerDisplay ? "main-container" : "main-container-playlisthidden"}>
            {playlist}
            {library}
          </div>
        </div>
        </div>


        {logo}
        {bgDiv}

      </div>
    );
  }
}



export default App;
