import React, { Component } from 'react';
import Playlist from '../components/Playlist.js'

class PlaylistContainer extends Component{

  render(){

    const playlists = this.props.playlists.map((playlist)=>{
      return <Playlist playlist={playlist} onPlaylistClick={this.props.onPlaylistClick}/>
    })

    return(
      <div className="playlistContainer-wrapper">

        {playlists}

        <div className="new-playlist-wrapper">
          <input
            type="text"
            value={this.props.newPlaylistInput}
            placeholder="new playlist"
            onChange={(e)=>this.props.onNewPlaylistInputchange(e)}
          />

          <i className="fas fa-plus" onClick={this.props.onNewPlaylistSubmit}></i>

        </div>


      </div>
    )
  }

}

// <form onSubmit={(e)=>this.props.onNewPlaylistSubmit(e)}>
//   <input
//     type="text"
//     value={this.props.newPlaylistInput}
//     onChange={(e)=>this.props.onNewPlaylistInputchange(e)}
//   />
//   <input type="submit"/>
//
//
//
// </form>


export default PlaylistContainer
