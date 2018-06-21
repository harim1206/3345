import React, { Component } from 'react';
import PlaylistTrack from '../components/PlaylistTrack'

class PlaylistDisplayContainer extends Component{

  render(){
    const tracks = this.props.currentPlaylistTracks.map((track)=>{
      return (<PlaylistTrack track={track} onCurrentPlaylistTrackClick={this.props.onCurrentPlaylistTrackClick}/>)
    })

    const columnHeaders = ['DESCRIPTION','ARTIST','RELEASE','URL','LABEL','CATNO'].map((cat)=>{
      if(cat==='DESCRIPTION'){
        return <th style={{width:"30%"}} onClick={()=>this.props.onSort(cat.toLowerCase())}>{cat}</th>
      }else if(cat==='ARTIST'){
        return <th style={{width:"20%"}} onClick={()=>this.props.onSort(cat.toLowerCase())}>{cat}</th>
      }else{
        return <th style={{width:"20%"}} onClick={()=>this.props.onSort(cat.toLowerCase())}>{cat}</th>
      }
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
