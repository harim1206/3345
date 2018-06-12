import React, { Component } from 'react';
import Video from './Video.js'
import Playlist from './Playlist.js'

class App extends Component {
  state={
    pagination: {},
    releases: [],
    shuffledReleases: [],
    currentRelease: {},
    nextRelease:{},
    currentReleaseURL: ""
  }

  componentDidMount(){
    const url = 'https://api.discogs.com/users/leon_/collection/folders/0/releases?per_page=200&page=1&f=json'

    fetch(url)
    .then(res => res.json())
    .then(data => {

      const shuffledReleases = this.shuffleArr(data.releases).slice(0,50)
      this.setState({
        pagination: data.pagination,
        releases: data.releases,
        shuffledReleases: shuffledReleases,
        currentRelease: shuffledReleases[0],
        nextRelease: shuffledReleases[1]
      } , ()=>{
        this.fetchReleaseURL(this.state.currentRelease)
      })
    })

  }

  // returns a shuffled array
  shuffleArr = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  onClick = (release, id) => {

    this.setState({
      currentRelease: release,
      nextRelease: this.state.shuffledReleases[id+1]
    },()=>console.log(`state onClick: `,this.state))

    this.fetchReleaseURL(release)
  }

  onEnded = () =>{
    const nextReleaseId = this.state.shuffledReleases.indexOf(this.state.nextRelease)

    this.setState({
      currentRelease: this.state.nextRelease,
      nextRelease: this.state.shuffledReleases[nextReleaseId+1]

    }, ()=>{
      this.fetchReleaseURL(this.state.currentRelease)
    })


  }

  fetchReleaseURL = (release) => {
    let resourceURL = release.basic_information.resource_url

    fetch(resourceURL)
    .then(res=>res.json())
    .then(data=>{
      let randomVideo = data.videos[Math.floor(Math.random()*data.videos.length)]
      this.setState({
        currentReleaseURL: randomVideo.uri
      },()=>{
        console.log(`this.state after URL fetch, `,this.state)
      })
    })

  }


  render() {
    return (
      <div className="App">
        <Video
          onClick={this.onClick}
          onEnded={this.onEnded}
          currentReleaseURL={this.state.currentReleaseURL}
        />
        <Playlist
          shuffledReleases={this.state.shuffledReleases}
          onClick={this.onClick}
        />
      </div>
    );
  }
}


export default App;
