import React, { Component } from 'react';



class Playlist extends Component{

  render(){

    return(
      <div>
        {this.props.playlist.name}
      </div>

    )
  }

}

export default Playlist
