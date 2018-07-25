import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux'
import {
  fetchCollection,
  fetchPlaylists,
  onReleaseClick,
  onLibraryVideoFinish,
  onVideoClick,
  onSort} from '../actions/libraryActions.js'
import {
  onPlaylistTitlesContainerToggleClick,
  onLibraryToggleClick } from '../actions/navActions.js'
import {
  onPlaylistTitleClick,
  onNewPlaylistInputChange,
  onNewPlaylistSubmit,
  onPlaylistTitleDelete } from '../actions/playlistTitlesContainerActions.js'
import{
  onPlaylistTracksVideoFinish,
  onCurrentPlaylistTrackClick
} from '../actions/playlistTracksContainerActions.js'

//Components
import Video from './Video.js'
import Library from './LibraryContainer/Library.js'
import PlaylistTitlesContainer from './PlaylistTitlesContainer/PlaylistTitlesContainer.js'
import PlaylistTracksContainer from './PlaylistTracksContainer/PlaylistTracksContainer'

//Helper Functions
import { shuffleArr, parseJSONtoData } from '../helpers/helper.js'
require('dotenv').config()

class App extends Component {

  //
  // LIFECYCLE METHODS
  //
  componentDidMount(){
    this.props.fetchCollection()
    this.props.fetchPlaylists()
  }


  //
  // APP/VIDEO COMPONENT EVENT HANDLERS
  //

  // play next video on finish
  // onEnded = () =>{
  //
  //   if(!this.props.playlistTracksContainerDisplay){
  //
  //     const newCurrentVideo = this.props.nextVideo
  //     let currVideos = this.props.currentReleaseVideos
  //     const newNextVideo = currVideos[currVideos.indexOf(this.props.currentVideo)+1]
  //
  //     const newCurrentRelease = this.props.nextRelease
  //     const newNextRelease = this.props.libraryReleases[this.props.nextRelease.id+1]
  //
  //     this.props.onLibraryVideoFinish(newCurrentVideo, newNextVideo, newCurrentRelease, newNextRelease)
  //   }else{
  //     const currTracks = this.props.currentPlaylistTracks
  //
  //     const newNextTrack = currTracks[currTracks.indexOf(this.props.nextTrack)+1]
  //
  //     this.props.onPlaylistTracksVideoFinish(this.props.nextTrack, newNextTrack)
  //   }
  //
  // }

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
    let input = e.target.value
    this.props.onNewPlaylistInputChange(input)

  }

  // on new playlist submit
  onNewPlaylistSubmit = () =>{
    let postData = {
      name: this.props.newPlaylistInput
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
  }


  //
  // ELEMENT CREATORS
  //

  // create background div element
  createBackgroundDiv = () => {
    let bgUrl
    let bgSize
    let bgTop
    let bgLeft
    let bgRepeat

    if(this.props.currentReleaseImgUrl){
      bgUrl = this.props.currentReleaseImgUrl
      bgSize = '450px 450px'
      bgRepeat = 'repeat'
    }else{
      bgUrl = 'https://78.media.tumblr.com/a7f02d7176d50f610b7f544b28c92e5a/tumblr_ohtrc8hT9n1sm5cgbo1_640.jpg'

    }

    let bgStyle = {
      backgroundImage: `url('${bgUrl}')`,
      backgroundSize: bgSize,
      width: '2500px',
      height: '2000px',
      backgroundRepeat: bgRepeat,
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '-5'
    }

    return <div style={bgStyle}></div>
  }

  // create a button for toggling library
  createLibraryToggleButton = () => {
    if(this.props.playlistTracksContainerDisplay===true){
      return <div onClick={this.props.onLibraryToggleClick}>LIBRARY</div>
    }
  }


  render() {

    let library
    let playlistTitlesContainer

    let libraryToggleButton = this.createLibraryToggleButton()
    let bgDiv = this.createBackgroundDiv()
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
        newPlaylistInput = {this.props.newPlaylistInput}
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
      //library
      libraryReleases: state.library.libraryReleases,
      //video
      currentVideo: state.video.currentVideo,
      nextVideo: state.video.nextVideo,
      currentReleaseImgUrl: state.video.currentReleaseImgUrl,
      //library
      currentRelease: state.library.currentRelease,
      nextRelease: state.library.nextRelease,
      currentReleaseTracks: state.library.currentReleaseTracks,
      currentReleaseVideos: state.library.currentReleaseVideos,
      playlists: state.library.playlists,
      //playlist tracks container
      currentTrack: state.playlistTracksContainer.currentTrack,
      nextTrack: state.playlistTracksContainer.nextTrack,
      //playlist titles container
      currentPlaylistTracks: state.playlistTitlesContainer.currentPlaylistTracks,
      newPlaylistInput: state.playlistTitlesContainer.newPlaylistInput,
      // navigation bar
      playlistTitlesContainerDisplay: state.nav.playlistTitlesContainerDisplay,
      playlistTracksContainerDisplay: state.nav.playlistTracksContainerDisplay

    }
  )
}



export default connect(mapStateToProps,
  {
    fetchCollection,
    fetchPlaylists,
    onReleaseClick,
    onLibraryVideoFinish,
    onPlaylistTracksVideoFinish,
    onVideoClick,
    onSort,
    onCurrentPlaylistTrackClick,
    onNewPlaylistSubmit,
    onPlaylistTitleDelete,
    onPlaylistTitlesContainerToggleClick,
    onLibraryToggleClick,
    onPlaylistTitleClick,
    onNewPlaylistInputChange
  }
)(App);
