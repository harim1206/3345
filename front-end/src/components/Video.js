import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class Video extends Component {

  render(){
    return (
      <div class="video-component-wrapper">
        <button onClick={this.props.onClick}> click </button>
        <ReactPlayer url={this.props.currentTrackURL} controls="true" playing="true"/>
      </div>
    )
  }
}

export default Video
