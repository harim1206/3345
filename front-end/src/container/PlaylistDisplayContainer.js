import React, { Component } from 'react';
import PlaylistTrack from '../components/PlaylistTrack'

class PlaylistDisplayContainer extends Component{

  render(){
    const tracks = this.props.currentPlaylistTracks.map((track)=>{
      return (<PlaylistTrack track={track} onCurrentPlaylistTrackClick={this.props.onCurrentPlaylistTrackClick}/>)
    })

    const columnHeaders = ['id','description','artist','release','label','catno','url'].map((cat)=>{
      return(
        <th onClick={()=>this.props.onSort(cat.toLowerCase())}>{cat}</th>
      )
    })

    return(
      <div className="playlistDisplay-wrapper">
        <table className="playlistDisplay-table">
          <thead>
            <tr>
              {columnHeaders}
            </tr>
          </thead>
          <tbody>
            {tracks}
          </tbody>
        </table>
      </div>

    )
  }
}

export default PlaylistDisplayContainer
// artist, description, release, label, catno, url
//
// artist
// :
// "Mass Production"
// catno
// :
// "SD 9910"
// description
// :
// "Mass Production - Magic"
// label
// :
// "Cotillion"
// release
// :
// "Welcome To Our World"
// url
// :
// "https://www.youtube.com/watch?v=TZv26FljO9U"
