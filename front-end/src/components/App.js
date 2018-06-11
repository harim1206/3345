import React, { Component } from 'react';
import Video from './Video.js'

class App extends Component {
  state={
    pagination: {},
    releases: [],
    currentTrackURL: ""
  }

  onClick = () => {
    let randomRelease = this.state.releases[Math.floor(Math.random()*this.state.releases.length)]


    
    // grab random release's url
    let randomURL = randomRelease.basic_information.resource_url


    fetch(randomURL)
    .then(res=>res.json())
    .then(data=>{
      let randomVideo = data.videos[Math.floor(Math.random()*data.videos.length)]
      this.setState({
        currentTrackURL: randomVideo.uri
      },()=>console.log(`this.state after random URL, `,this.state))
    })
  }


  componentDidMount(){
    const url = 'https://api.discogs.com/users/harim1206/collection/folders/0/releases?per_page=200&page=1&f=json'

    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({
        pagination: data.pagination,
        releases: data.releases
      }, ()=>console.log(this.state))
    })
  }

  render() {
    return (
      <div className="App">
        <Video
          onClick={this.onClick}
          currentTrackURL={this.state.currentTrackURL}
        />
      </div>
    );
  }
}

export default App;
