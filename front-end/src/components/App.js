import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux'
import { fetchCollection } from '../actions/libraryActions.js'




//Components
import Video from './Video.js'
import Library from './LibraryContainer/Library.js'
import PlaylistsTitlesContainer from './PlaylistTitlesContainer/PlaylistsTitlesContainer.js'
import PlaylistTracksContainer from './PlaylistTracksContainer/PlaylistTracksContainer'

//Helper Functions
import { shuffleArr, parseJSONtoData } from '../helpers/helper.js'
require('dotenv').config()

class App extends Component {
  state={
    // Parsed Releases
    libraryReleases: [],
    // Current Video/Image
    currentVideo: "",
    nextVideo: "",
    currentReleaseImgUrl:"",
    // Current Release
    currentRelease: {},
    nextRelease:{},
    currentReleaseTracks: [],
    currentReleaseVideos:[],
    // Current Track
    currentTrack: {},
    nextTrack: {},
    // Playlists
    newPlaylistInput: "",
    playlists: [],
    // Playlist Display
    currentPlaylistTracks: [],
    // toggle
    playlistTracksContainerDisplay: false,
    playlistsTitlesContainerDisplay: false
  }





  // LIFECYCLE METHODS
  //
  //
  componentDidMount(){

    this.props.fetchCollection()

    // const collectionUrl = 'https://api.discogs.com/users/harim1206/collection/folders/0/releases?per_page=300&page=1&f=json'
    //
    // fetch(collectionUrl, {mode: 'cors'})
    // .then(res => res.json())
    // .then(data => {
    //   let releases = data.releases.slice(0,500)
    //
    //   releases.sort((a,b)=>{
    //     let keyA = new Date(a.date_added),
    //         keyB = new Date(b.date_added);
    //
    //     if(keyA < keyB) return 1;
    //     if(keyA > keyB) return -1;
    //     return 0;
    //   })
    //
    //   const parsedData = parseJSONtoData(releases)
    //
    //   this.setState({
    //     libraryReleases: parsedData,
    //     currentRelease: parsedData[0],
    //     nextRelease: parsedData[1],
    //     currentVideo: {url: "https://www.youtube.com/watch?v=rtXIdykj2QE"}
    //   })
    // })

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
      })
    })

  }





  // APP/VIDEO COMPONENT EVENT HANDLERS
  //
  //

  // play next video once it finishes
  onEnded = () =>{

    if(!this.state.playlistTracksContainerDisplay){
      const nextReleaseId = this.state.libraryReleases.indexOf(this.state.nextRelease)


      let arr = this.state.currentReleaseVideos

      const nextVideo = arr[arr.indexOf(this.state.currentVideo)+1]

      this.setState({
        currentVideo: this.state.nextVideo,
        nextVideo: nextVideo,

        currentRelease: this.state.nextRelease,
        nextRelease: this.state.libraryReleases[nextReleaseId+1]

      })

    }else{
      const tracks = this.state.currentPlaylistTracks
      const currentIndex = tracks.indexOf(this.state.currentTrack)
      const nextTrack = tracks[currentIndex+2]

      this.setState({
        currentVideo: this.state.nextTrack,
        nextVideo: nextTrack,
        currentTrack: this.state.nextTrack,
        nextTrack: nextTrack

      },()=>console.log(`this.state onEnded`,this.state))

    }

  }

  // Toggle library on click
  onLibraryToggleClick = () =>{


    this.setState({
      playlistTracksContainerDisplay: false,
    })

  }

  // Toggle playlistTitles on click
  onPlaylistToggleClick = () =>{
    // debugger
    const toggle = !this.state.playlistsTitlesContainerDisplay
    this.setState({
      playlistsTitlesContainerDisplay: toggle
    })
  }





  // LIBRARY CONTAINER EVENT HANDLERS
  //
  //

  // fetch tracks for the release on click
  onReleaseClick = (release, id) => {

    let tracks = []
    let videos = []

    const token = process.env.REACT_APP_API_TOKEN;
    const url = release.resource_url + `?token=${token}`

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


      this.setState({
        currentRelease: release,
        nextRelease: this.state.libraryReleases[id+1],
        currentReleaseTracks: tracks,
        currentReleaseVideos: videos,
        currentReleaseImgUrl: data.images[0].uri,
      },()=>{
        console.log(`this.state on Release Click:`, this.state)
      })

    })
  }

  onYoutubeClick = (video, event) =>{

    console.log(`this.state: `, this.state)
    console.log(`this.state.currentReleaseVideos: `, this.state.currentReleaseVideos)

    let arr = this.state.currentReleaseVideos

    const nextVideo = arr[arr.indexOf(video)+1]

    console.log(`nextVideo: `, nextVideo)

    this.setState({
      currentVideo: video,
      nextVideo: nextVideo
    })
  }

  // on table column header sort
  onSort = (sortKey) =>{
    let data = this.state.libraryReleases
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
    this.setState({libraryReleases: data})

  }

  // on playlist select menu change, add track to playlist
  saveToPlaylist = (video, release, event) =>{

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




  // PLAYLIST TITLE CONTAINER EVENT HANDLERS
  //
  //

  // new playlist input change
  onNewPlaylistInputchange = (e) =>{
    this.setState({
      newPlaylistInput: e.target.value
    })

  }

  // Toggle playlist on click
  onPlaylistTitleClick = (playlist) => {

    const url = `//localhost:3000/api/v1/playlists/${playlist.id}`

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      const tracks = data.data.attributes.tracks

      this.setState({
        playlistTracksContainerDisplay: true,
        currentPlaylistTracks: tracks
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

  // Delete playlist
  onPlaylistTitleDelete = (playlist) => {

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




  // PLAYLIST TRACKS CONTAINER EVENT HANDLERS
  //
  //

  // play video on playlist track click
  onCurrentPlaylistTrackClick = (track) =>{

    const tracks = this.state.currentPlaylistTracks
    const currentIndex = tracks.indexOf(track)
    const nextTrack = tracks[currentIndex+1]

    this.setState({
      currentTrack: track,
      nextTrack: nextTrack,
      currentVideo: track,
      nextVideo: nextTrack,
      currentReleaseImgUrl: track.imgurl
    },()=>console.log(`on track click state`, this.state))
  }





  render() {
    console.log(`this.props.currentRelease: `, this.props.currentRelease)
    console.log(`this.props.nextRelease: `, this.props.nextRelease)
    console.log(`this.props.currentVideo: `, this.props.currentVideo)

    let library
    let playlistsTitlesContainer
    let bgUrl
    let bgSize
    let bgTop
    let bgLeft
    let bgRepeat

    let libraryToggleButton

    if(this.state.playlistTracksContainerDisplay===true){
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


    if(!this.state.playlistTracksContainerDisplay){
      library = <Library
        libraryReleases={this.props.libraryReleases}
        currentRelease={this.props.currentRelease}
        // libraryReleases={this.state.libraryReleases}
        // currentRelease={this.state.currentRelease}
        currentReleaseTracks={this.state.currentReleaseTracks}
        currentReleaseVideos={this.state.currentReleaseVideos}
        playlists={this.state.playlists}


        onReleaseClick={this.onReleaseClick}
        onSort={this.onSort}
        saveToPlaylist={this.saveToPlaylist}
        onYoutubeClick={this.onYoutubeClick}
      />
    }else{
      library = <PlaylistTracksContainer
        currentPlaylistTracks={this.state.currentPlaylistTracks}
        onCurrentPlaylistTrackClick={this.onCurrentPlaylistTrackClick}
      />
    }

    if(this.state.playlistsTitlesContainerDisplay){
      playlistsTitlesContainer =  <PlaylistsTitlesContainer
        newPlaylistInput = {this.state.newPlaylistInput}
        playlists = {this.state.playlists}

        onNewPlaylistSubmit = {this.onNewPlaylistSubmit}
        onNewPlaylistInputchange = {this.onNewPlaylistInputchange}
        onPlaylistTitleClick = {this.onPlaylistTitleClick}
        onPlaylistTitleDelete = {this.onPlaylistTitleDelete}
        onLibraryToggleClick = {this.onLibraryToggleClick}
      />
    }

    return (

      <div className="App">

        <div className="main-container--shadow">
          <Video
            onEnded={this.onEnded}
            currentVideo={this.props.currentVideo}
            // currentVideo={this.state.currentVideo}
            currentReleaseImageURL={this.state.currentReleaseImgUrl}
          />

          <div className = "main-container--padding">
            <nav className="navigation-bar">
              <div onClick={this.onPlaylistToggleClick}>
                PLAYLISTS
              </div>
              {libraryToggleButton}
            </nav>

            <div className={this.state.playlistsTitlesContainerDisplay ? "main-container" : "main-container--playlisthidden"}>
              {playlistsTitlesContainer}
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

const mapStateToProps = (state) => {
  return (
    {
      libraryReleases: state.library.libraryReleases,
      currentRelease: state.library.currentRelease,
      nextRelease: state.library.nextRelease,
      currentVideo: state.library.currentVideo
    }
  )
}



export default connect(mapStateToProps, { fetchCollection })(App);
