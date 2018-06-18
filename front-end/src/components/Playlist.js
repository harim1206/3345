import React, { Component } from 'react';



class Playlist extends Component{


  render(){


    return(
      <div onClick={()=>this.props.onPlaylistClick(this.props.playlist)}>
        {this.props.playlist.name}
      </div>

    )
  }

}

export default Playlist
