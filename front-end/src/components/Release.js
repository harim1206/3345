import React, { Component } from 'react';
// import TrackContainer from '../container/TrackContainer.js'


class Release extends Component{

  render(){
    const release = this.props.release

    const playlistSelectOptions = this.props.playlists.map((playlist)=>{
      return <option value={playlist.id}>{playlist.name}</option>
    })

    // let trackContainer
    // if(this.props.currentReleaseTracks.length > 0){
    //   trackContainer = <TrackContainer currentReleaseTracks = {this.props.currentReleaseTracks}/>
    // }


    return(
      <tr onClick={()=>this.props.onClick(release, release.id)}>
        <td>{release.id}</td>
        <td>{release.artist}</td>
        <td>{release.title}</td>
        <td>{release.label}</td>
        <td>{release.catno}</td>
        <td>
          <select name="text" onChange={(event)=>this.props.onReleasePlaylistChange(release, event)}>
            {playlistSelectOptions}
          </select>
        </td>
      </tr>
    )
  }

}


export default Release
