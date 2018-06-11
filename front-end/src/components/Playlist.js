import React, { Component } from 'react';
import Release from './Release'


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

      <ul>
        {shuffledReleases}
      </ul>
    )
  }

}

export default Playlist
