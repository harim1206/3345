import React, { Component } from 'react';
import Playlist from '../components/Playlist.js'

class PlaylistContainer extends Component{

  render(){

    const playlists = this.props.playlists.map((playlist)=>{
      return <Playlist playlist={playlist} onPlaylistClick={this.props.onPlaylistClick}/>
    })

    return(
      <div>
        new playlist
        <form onSubmit={(e)=>this.props.onNewPlaylistSubmit(e)}>
          <input
            type="text"
            value={this.props.newPlaylistInput}
            onChange={(e)=>this.props.onNewPlaylistInputchange(e)}
          />
          <input type="submit"/>
        </form>

        {playlists}
      </div>
    )
  }

}

export default PlaylistContainer
