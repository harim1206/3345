import React, { Component } from 'react';
import ReleaseTracks from './ReleaseTracks.js'


class Release extends Component{

  render(){
    const release = this.props.release
    const date = new Date(release.date_added)

    let releaseTracks

    if(this.props.currentReleaseTracks.length > 0 && this.props.release.id === this.props.currentReleaseTracks[0].id){

      releaseTracks = <ReleaseTracks
      currentRelease = {this.props.currentRelease}
      currentReleaseTracks = {this.props.currentReleaseTracks}
      currentReleaseVideos = {this.props.currentReleaseVideos}
      playlists = {this.props.playlists}
      saveToPlaylist = {this.props.saveToPlaylist}
      onYoutubeClick = {this.props.onYoutubeClick}
      />
    }

    // debugger
    return(
      <React.Fragment>
        <tr onReleaseClick={()=>this.props.onReleaseClick(release, release.id)}>
          <td>{release.artist}</td>
          <td>{release.title}</td>
          <td>{release.label}</td>
          <td>{release.catno}</td>
          <td>{date.toLocaleDateString()}</td>

        </tr>

        {releaseTracks}

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
