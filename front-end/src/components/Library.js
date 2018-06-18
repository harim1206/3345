import React, { Component } from 'react';
import Release from './Release'
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Library extends Component{

  render(){
    // Mapping props data to Release components
    const shuffledReleases = this.props.shuffledReleases.map((release)=>{

      return (
        <Release
          id = {this.props.shuffledReleases.indexOf(release)}
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

    const columnHeaders = ['Id','Artist','Title','Label','Catno','Date Added'].map((cat)=>{
      return(
        <th onClick={()=>this.props.onSort(cat.toLowerCase())}>{cat}</th>
      )
    })

    return(
      <div className="library-wrapper">
        <table className="library-table">
          <thead>
            <tr>
              {columnHeaders}
            </tr>
          </thead>
          <tbody>
            {shuffledReleases}
          </tbody>
        </table>
      </div>
    )
  }

}



export default Library
