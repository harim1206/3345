import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class Video extends Component {


  render(){
    return (
      <div className="video-component-wrapper">
        <div className="react-player">
          <ReactPlayer url={this.props.currentVideoURL} controls={true} playing={true} onEnded={this.props.onEnded}/>
        </div>
      </div>
    )
  }
}

export default Video
