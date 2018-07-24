import React, { Component } from 'react';
import PlaylistTitle from './PlaylistTitle.js'

class PlaylistTitlesContainer extends Component{

  render(){

    const playlistTitles = this.props.playlists.map((playlist)=>{
      return <PlaylistTitle
        playlist={playlist}
        onPlaylistTitleClick={this.props.onPlaylistTitleClick}
        onPlaylistTitleDelete={this.props.onPlaylistTitleDelete}
      />
    })

    return(
      <div className="playlistTitlesContainer-wrapper">

        {playlistTitles}

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


export default PlaylistTitlesContainer
