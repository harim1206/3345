import React, { Component } from 'react';
import Release from './Release'


class Library extends Component{

  render(){
    // Mapping props data to Release components

    console.log(`this.props.currentReleaseTracks: `, this.props.currentReleaseTracks)
    console.log(`this.props.libraryReleases: `, this.props.libraryReleases)

    const libraryReleases = this.props.libraryReleases.map((release)=>{

      return (
        <Release
          id = {release.id}
          release = {release}
          currentRelease = {this.props.currentRelease}
          currentReleaseTracks = {this.props.currentRelease ? this.props.currentReleaseTracks : undefined}
          currentReleaseVideos = {this.props.currentRelease ? this.props.currentReleaseVideos : undefined}
          playlists = {this.props.playlists}
          onReleaseClick = {this.props.onReleaseClick}
          saveToPlaylist = {this.props.saveToPlaylist}
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
