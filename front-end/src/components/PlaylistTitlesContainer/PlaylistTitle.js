import React, { Component } from 'react';

class PlaylistTitle extends Component{

  render(){
    const playlist = this.props.playlist

    return(
      <div onClick={()=>this.props.onPlaylistTitleClick(playlist)}>
        <i className="fas fa-times fa-xs" onClick={()=>this.props.onPlaylistTitleDelete(playlist)}></i>
        {"   "+playlist.name}
      </div>
    )
  }
}

export default PlaylistTitle
