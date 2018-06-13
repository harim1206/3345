import React, { Component } from 'react';
// import Playlist from '../components/Playlist.js'

class PlaylistContainer extends Component{

  render(){
    return(
      <div>
        playlist container
        <form onSubmit={(e)=>this.props.onNewPlaylistSubmit(e)}>
          <input
            type="text"
            value={this.props.newPlaylistInput}
            onChange={(e)=>this.props.onNewPlaylistInputchange(e)}
          />
          <input type="submit"/>
        </form>

      </div>
    )
  }

}

export default PlaylistContainer
