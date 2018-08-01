import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux'
import {
  fetchCollection,
  fetchPlaylists,
  onSort
} from '../actions/libraryActions.js'
import {
  onPlaylistTitlesContainerToggleClick,
  onLibraryToggleClick
} from '../actions/navActions.js'

//Components
import Video from './Video.js'
import UsernameInput from './UsernameInput.js'
import Library from './LibraryContainer/Library.js'
import PlaylistTitlesContainer from './PlaylistTitlesContainer/PlaylistTitlesContainer.js'
import PlaylistTracksContainer from './PlaylistTracksContainer/PlaylistTracksContainer.js'

class App extends Component {

  componentDidMount(){
    // this.props.fetchCollection()
    this.props.fetchPlaylists()
  }

  // Toggle playlistTitles on click
  onPlaylistTitlesContainerToggleClick = () =>{
    const toggle = !this.props.playlistTitlesContainerDisplay
    this.props.onPlaylistTitlesContainerToggleClick(toggle)
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

  // create background div element
  createBackgroundDiv = () => {
    let bgUrl
    let bgSize
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
    console.log(`app this.props:`,this.props)

    let libraryToggleButton = this.createLibraryToggleButton()
    let bgDiv = this.createBackgroundDiv()
    let logo = <div id='logo'>33/45</div>

    let mainContainer
    let playlistTitlesContainer

    if(this.props.enterUsernameDisplay){
      mainContainer = <UsernameInput/>
    }else if(!this.props.playlistTracksContainerDisplay){
      mainContainer = <Library onSort={this.onSort}/>
    }else{
      mainContainer = <PlaylistTracksContainer/>
    }

    if(this.props.playlistTitlesContainerDisplay){
      playlistTitlesContainer =  <PlaylistTitlesContainer/>
    }

    return (

      <div className="App">

        <div className="main-container--shadow">
          <Video/>

          <div className = "main-container--padding">
            <nav className="navigation-bar">
              <div onClick={this.onPlaylistTitlesContainerToggleClick}>
                PLAYLISTS
              </div>
              {libraryToggleButton}
            </nav>

            <div className={this.props.playlistTitlesContainerDisplay ? "main-container" : "main-container--playlisthidden"}>
              {playlistTitlesContainer}
              {mainContainer}
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
      currentReleaseImgUrl: state.video.currentReleaseImgUrl,
      playlistTitlesContainerDisplay: state.nav.playlistTitlesContainerDisplay,
      playlistTracksContainerDisplay: state.nav.playlistTracksContainerDisplay,
      enterUsernameDisplay: state.nav.enterUsernameDisplay
    }
  )
}

export default connect(mapStateToProps,
  {
    fetchCollection,
    fetchPlaylists,
    onSort,
    onPlaylistTitlesContainerToggleClick,
    onLibraryToggleClick
  }
)(App);
