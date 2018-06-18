import React, { Component } from 'react';

class PlaylistTrack extends Component{

  render(){
    // debugger

    const track = this.props.track

    return(

      <tr onClick={()=>this.props.onCurrentPlaylistTrackClick(track)}>
        <td>{track.id}</td>
        <td>{track.description}</td>
        <td>{track.artist}</td>
        <td>{track.release}</td>
        <td>{track.label}</td>
        <td>{track.catno}</td>
        <td></td>
      </tr>



    )
  }
}

export default PlaylistTrack
// ['id','artist','description','release','label','catno','url']
