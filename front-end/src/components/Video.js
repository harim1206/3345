import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class Video extends Component {


  render(){
    return (
      <div className="video-component-wrapper">
        <ReactPlayer url={this.props.currentReleaseURL} controls={true} playing={false} onEnded={this.props.onEnded}/>
      </div>
    )
  }
}

export default Video
