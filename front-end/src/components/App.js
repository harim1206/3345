import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux'
import { fetchCollection, fetchPlaylists, onReleaseClick, onLibraryVideoFinish, onPlaylistTracksVideoFinish, onVideoClick, onSort, onCurrentPlaylistTrackClick, onNewPlaylistSubmit, onPlaylistTitleDelete } from '../actions/libraryActions.js'
import { onPlaylistTitlesContainerToggleClick, onLibraryToggleClick } from '../actions/navActions.js'
import { onPlaylistTitleClick } from '../actions/playlistTitlesContainerActions.js'


//Components
import Video from './Video.js'
import Library from './LibraryContainer/Library.js'
import PlaylistTitlesContainer from './PlaylistTitlesContainer/PlaylistTitlesContainer.js'
import PlaylistTracksContainer from './PlaylistTracksContainer/PlaylistTracksContainer'

//Helper Functions
import { shuffleArr, parseJSONtoData } from '../helpers/helper.js'
require('dotenv').config()

class App extends Component {
  state={
    // Playlists
    newPlaylistInput: "",
  }





  // LIFECYCLE METHODS
  //
  //
  componentDidMount(){
    this.props.fetchCollection()
    this.props.fetchPlaylists()
  }





  // APP/VIDEO COMPONENT EVENT HANDLERS
  //
  //

  // play next video once it finishes
  onEnded = () =>{

    if(!this.props.playlistTracksContainerDisplay){
      const nextReleaseId = this.props.libraryReleases.indexOf(this.props.nextRelease)

      let arr = this.props.currentReleaseVideos
      const nextVideo = arr[arr.indexOf(this.props.currentVideo)+1]

      this.props.onLibraryVideoFinish(this.props.nextVideo, nextVideo, this.props.nextRelease, this.props.libraryReleases[nextReleaseId+1])
    }else{
      const tracks = this.props.currentPlaylistTracks
      const currentIndex = tracks.indexOf(this.props.currentTrack)
      const nextTrack = tracks[currentIndex+2]


      this.props.onPlaylistTracksVideoFinish(this.props.nextTrack, nextTrack)
    }

  }

  // Toggle library on click
  onLibraryToggleClick = () =>{
    this.props.onLibraryToggleClick()
  }

  // Toggle playlistTitles on click
  onPlaylistTitlesContainerToggleClick = () =>{
    const toggle = !this.props.playlistTitlesContainerDisplay
    this.props.onPlaylistTitlesContainerToggleClick(toggle)
  }





  // LIBRARY CONTAINER EVENT HANDLERS
  //
  //

  // fetch tracks for the release on click
  onReleaseClick = (release, id) => {
    const nextRelease = this.props.libraryReleases[id+1]
    this.props.onReleaseClick(release, nextRelease, id)
  }

  onVideoClick = (video, event) =>{
    let arr = this.props.currentReleaseVideos
    const nextVideo = arr[arr.indexOf(video)+1]

    this.props.onVideoClick(video, nextVideo)
  }

  // on table column header sort
  onSort = (sortKey) =>{
    let data = this.props.libraryReleases
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


    this.props.onSort(data)
    // *** not working
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
      imgurl: this.props.currentReleaseImgUrl,
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

  // Toggle playlist on click
  onPlaylistTitleClick = (playlist) => {
    this.props.onPlaylistTitleClick(playlist)
  }

  // new playlist input change
  onNewPlaylistInputchange = (e) =>{
    this.setState({
      newPlaylistInput: e.target.value
    })
  }

  // on new playlist submit
  onNewPlaylistSubmit = () =>{
    // e.preventDefault()

    let postData = {
      name: this.state.newPlaylistInput
    }

    this.props.onNewPlaylistSubmit(postData)
  }

  // Delete playlist
  onPlaylistTitleDelete = (playlist) => {

    const playlistUrl = `//localhost:3000/api/v1/playlists/${playlist.id}`

    this.props.onPlaylistTitleDelete(playlistUrl)
  }




  // PLAYLIST TRACKS CONTAINER EVENT HANDLERS
  //
  //

  // play video on playlist track click
  onCurrentPlaylistTrackClick = (track) =>{

    const tracks = this.props.currentPlaylistTracks
    const currentIndex = tracks.indexOf(track)
    const nextTrack = tracks[currentIndex+1]

    this.props.onCurrentPlaylistTrackClick(track, nextTrack)

    // this.setState({
    //   currentTrack: track,
    //   nextTrack: nextTrack,
    //   currentVideo: track,
    //   nextVideo: nextTrack,
    //   currentReleaseImgUrl: track.imgurl
    // },()=>console.log(`on track click state`, this.state))
  }




  //function for creating a bg div element
  createBackgroundDiv = () => {
    let bgUrl
    let bgSize
    let bgTop
    let bgLeft
    let bgRepeat

    if(this.props.currentReleaseImgUrl){
      bgUrl = this.props.currentReleaseImgUrl
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

    return bgDiv




  }


  render() {

    let library
    let playlistTitlesContainer
    // let bgUrl
    // let bgSize
    // let bgTop
    // let bgLeft
    // let bgRepeat

    let libraryToggleButton

    if(this.props.playlistTracksContainerDisplay===true){

      libraryToggleButton = <div onClick={this.props.onLibraryToggleClick}>
        LIBRARY
      </div>
    }


    // if(this.props.currentReleaseImgUrl){
    //   bgUrl = this.props.currentReleaseImgUrl
    //   bgSize = '450px 450px'
    //   bgTop = '0'
    //   bgLeft = '0'
    //   bgRepeat = 'repeat'
    // }else{
    //   bgUrl = 'https://78.media.tumblr.com/a7f02d7176d50f610b7f544b28c92e5a/tumblr_ohtrc8hT9n1sm5cgbo1_640.jpg'
    //   bgTop = '0'
    //   bgLeft = '0'
    // }
    //
    // let bgStyle = {
    //   backgroundImage: `url('${bgUrl}')`,
    //   backgroundSize: bgSize,
    //   width: '2500px',
    //   height: '2000px',
    //   backgroundRepeat: bgRepeat,
    //   position: 'fixed',
    //   top: bgTop,
    //   left: bgLeft,
    //   zIndex: '-5'
    // }

    let bgDiv = this.createBackgroundDiv()
    console.log(`bgDiv: `, bgDiv)
    // let  bgDiv = <div style={bgStyle}></div>
    let logo = <div id='logo'>33/45</div>


    if(!this.props.playlistTracksContainerDisplay){

      library = <Library
        libraryReleases={this.props.libraryReleases}
        currentRelease={this.props.currentRelease}
        currentReleaseTracks={this.props.currentReleaseTracks}
        currentReleaseVideos={this.props.currentReleaseVideos}
        playlists={this.props.playlists}



        onReleaseClick={this.onReleaseClick}
        onSort={this.onSort}
        saveToPlaylist={this.saveToPlaylist}
        onVideoClick={this.onVideoClick}
      />
    }else{

      library = <PlaylistTracksContainer
        currentPlaylistTracks={this.props.currentPlaylistTracks}
        onCurrentPlaylistTrackClick={this.onCurrentPlaylistTrackClick}
      />
    }

    if(this.props.playlistTitlesContainerDisplay){
      playlistTitlesContainer =  <PlaylistTitlesContainer
        newPlaylistInput = {this.state.newPlaylistInput}
        playlists = {this.props.playlists}

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
            currentReleaseImageURL={this.props.currentReleaseImgUrl}
          />

          <div className = "main-container--padding">
            <nav className="navigation-bar">
              <div onClick={this.onPlaylistTitlesContainerToggleClick}>
                PLAYLISTS
              </div>
              {libraryToggleButton}
            </nav>

            <div className={this.props.playlistTitlesContainerDisplay ? "main-container" : "main-container--playlisthidden"}>
              {playlistTitlesContainer}
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
  console.log(`redux state: `,state)

  return (
    {

      libraryReleases: state.library.libraryReleases,

      currentVideo: state.library.currentVideo,
      nextVideo: state.library.nextVideo,
      currentReleaseImgUrl: state.library.currentReleaseImgUrl,

      currentRelease: state.library.currentRelease,
      nextRelease: state.library.nextRelease,
      currentReleaseTracks: state.library.currentReleaseTracks,
      currentReleaseVideos: state.library.currentReleaseVideos,

      currentTrack: state.library.currentTrack,
      nextTrack: state.library.nextTrack,

      playlists: state.library.playlists,

      currentPlaylistTracks: state.playlistTitlesContainer.currentPlaylistTracks,
      playlistTitlesContainerDisplay: state.nav.playlistTitlesContainerDisplay,
      playlistTracksContainerDisplay: state.nav.playlistTracksContainerDisplay

    }
  )
}



export default connect(mapStateToProps, { fetchCollection, fetchPlaylists, onReleaseClick, onLibraryVideoFinish, onPlaylistTracksVideoFinish, onVideoClick, onSort, onCurrentPlaylistTrackClick, onNewPlaylistSubmit, onPlaylistTitleDelete, onPlaylistTitlesContainerToggleClick, onLibraryToggleClick, onPlaylistTitleClick})(App);
