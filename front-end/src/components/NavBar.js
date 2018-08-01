import React, { Component } from 'react';
import { connect } from 'react-redux'

import { onPlaylistTitlesContainerToggleClick, onLibraryToggleClick } from '../actions/navActions.js'

import SearchInput from './SearchInput.js'


class NavBar extends Component{

  // create a button for toggling library
  createLibraryToggleButton = () => {
    if(this.props.playlistTracksContainerDisplay === true){
      return <div onClick={this.props.onLibraryToggleClick}>LIBRARY</div>
    }
  }

  onPlaylistTitlesContainerToggleClick = () =>{
    const toggle = !this.props.playlistTitlesContainerDisplay
    this.props.onPlaylistTitlesContainerToggleClick(toggle)
  }

  render(){
    let libraryToggleButton = this.createLibraryToggleButton()
    return(
      <nav className="navigation-bar">
        <div onClick={this.onPlaylistTitlesContainerToggleClick}>
          PLAYLISTS
        </div>
        {libraryToggleButton}

        <SearchInput/>
      </nav>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    playlistTracksContainerDisplay: state.nav.playlistTracksContainerDisplay,
    playlistTitlesContainerDisplay: state.nav.playlistTitlesContainerDisplay
  }
}

export default connect(mapStateToProps, { onPlaylistTitlesContainerToggleClick, onLibraryToggleClick })(NavBar)
