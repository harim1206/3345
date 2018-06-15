import React, { Component } from 'react';
import TrackContainer from '../container/TrackContainer.js'


class Release extends Component{

  render(){
    const release = this.props.release

    // const playlistSelectOptions = this.props.playlists.map((playlist)=>{
    //   return <option value={playlist.id}>{playlist.name}</option>
    // })

    let trackContainer
    if(this.props.currentReleaseTracks.length > 0 && this.props.release.id === this.props.currentReleaseTracks[0].id){

      trackContainer = <TrackContainer
      currentRelease = {this.props.currentRelease}
      currentReleaseTracks = {this.props.currentReleaseTracks}
      currentReleaseVideos = {this.props.currentReleaseVideos}
      playlists = {this.props.playlists}
      onTrackPlaylistChange = {this.props.onTrackPlaylistChange}
      onYoutubeClick = {this.props.onYoutubeClick}
      />
    }


    return(
      <React.Fragment>
        <tr onClick={()=>this.props.onClick(release, release.id)}>
          <td>{release.id}</td>
          <td>{release.artist}</td>
          <td>{release.title}</td>
          <td>{release.label}</td>
          <td>{release.catno}</td>
        </tr>

        {trackContainer}

      </React.Fragment>

    )
  }

}


export default Release




// <td>
// <select name="text" onChange={(event)=>this.props.onReleasePlaylistChange(release, event)}>
// {playlistSelectOptions}
// </select>
// </td>
