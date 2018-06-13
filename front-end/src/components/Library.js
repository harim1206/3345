import React, { Component } from 'react';
import Release from './Release'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Library extends Component{

  render(){
    // Mapping props data to Release components
    const shuffledReleases = this.props.shuffledReleases.map((release)=>{
      return (
        <Release
          id = {this.props.shuffledReleases.indexOf(release)}
          release = {release}
          playlists = {this.props.playlists}
          onClick = {this.props.onClick}
          onReleasePlaylistChange = {this.props.onReleasePlaylistChange}
        />
      )
    })

    const columnHeaders = ['Id','Artist','Title','Label','Catno','Playlist'].map((cat)=>{
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
