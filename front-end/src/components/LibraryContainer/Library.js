import React, { Component } from 'react';
import Release from './Release'


class Library extends Component{

  render(){
    // Mapping props data to Release components
    const libraryReleases = this.props.libraryReleases.map((release)=>{

      return (
        <Release
          id = {this.props.libraryReleases.indexOf(release)}
          release = {release}
          currentRelease = {this.props.currentRelease}
          currentReleaseTracks = {this.props.currentRelease ? this.props.currentReleaseTracks : undefined}
          currentReleaseVideos = {this.props.currentRelease ? this.props.currentReleaseVideos : undefined}
          playlists = {this.props.playlists}
          onClick = {this.props.onClick}
          onTrackPlaylistChange = {this.props.onTrackPlaylistChange}
          onYoutubeClick = {this.props.onYoutubeClick}
        />
      )
    })

    const columnHeaders = ['ARTIST','TITLE','LABEL','CATNO','DATE'].map((cat)=>{
      return(
        <th onClick={()=>this.props.onSort(cat.toLowerCase())}>{cat}</th>
      )
    })


    return(
      <div className="library-wrapper--padding">
        <div className="library-wrapper">
          <table className="library__table">
            <thead >
              <tr>
                {columnHeaders}
              </tr>
            </thead>
            <tbody>
              {libraryReleases}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}



export default Library
