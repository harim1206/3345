import React, { Component } from 'react';
import PlaylistTrack from './PlaylistTrack'

import { connect } from 'react-redux'


class PlaylistTracksContainer extends Component{


  render(){
    debugger


    const tracks = this.props.currentPlaylistTracks.map((track)=>{
      return (<PlaylistTrack track={track}/>)
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

const mapStateToProps = (state) => {
  console.log(`redux statexxx: `, state)
  // debugger
  console.log(`redux state currentPlaylistTracks: `, state.playlistTitlesContainer)
  return {
    state
    // currentPlaylistTracks: state.playlistTitlesContainer.currentPlaylistTracks
  }
}

export default (mapStateToProps)(PlaylistTracksContainer)
