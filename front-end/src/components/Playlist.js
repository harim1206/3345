import React, { Component } from 'react';
import Release from './Release'
// import ReactTable from "react-table";





class Playlist extends Component{


  render(){
    const shuffledReleases = this.props.shuffledReleases.map((releaseData)=>{
      return (

        <Release
          id = {this.props.shuffledReleases.indexOf(releaseData)}
          releaseData = {releaseData}
          onClick = {this.props.onClick}
        />

      )
    })

    // debugger

    return(
      <div className="playlist-wrapper">

        <ul className="playlist">
          {shuffledReleases}
        </ul>
      </div>
    )
  }

}

export default Playlist
