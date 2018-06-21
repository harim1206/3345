import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class Video extends Component {


  render(){
    // let img = <img src={this.props.currentReleaseImageURL ? this.props.currentReleaseImageURL : "https://static.tumblr.com/6450ef762c1ebcc4b87153c2795bd1a9/qn00bwe/xucn1d6mk/tumblr_static_banner.jpg"} alt="no image"/>
    // <div className="image-wrapper">
    // {img}
    // </div>

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
