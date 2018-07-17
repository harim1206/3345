import React, { Component } from 'react';

class PlaylistTrack extends Component{

  render(){
    // debugger

    const track = this.props.track

    return(

      <tr onClick={()=>this.props.onCurrentPlaylistTrackClick(track)}>

        <td>{track.description}</td>
        <td>{track.artist}</td>
        <td>{track.release}</td>
        <td><a href={track.url}>link</a></td>
        <td>{track.label}</td>
        <td>{track.catno}</td>

      </tr>



    )
  }
}

export default PlaylistTrack
// ['id','artist','description','release','label','catno','url']
