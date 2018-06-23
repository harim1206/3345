import React, { Component } from 'react';



class Playlist extends Component{


  render(){
    const playlist = this.props.playlist


    return(
      <div onClick={()=>this.props.onPlaylistClick(playlist)}>
        <i className="fas fa-times fa-xs" onClick={()=>this.props.onPlaylistDelete(playlist)}></i>
        {"   "+playlist.name}




      </div>

    )
  }

}

export default Playlist
