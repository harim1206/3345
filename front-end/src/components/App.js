import React, { Component } from 'react';
import Video from './Video.js'
import Library from './Library.js'
import PlaylistContainer from '../container/PlaylistContainer.js'

class App extends Component {
  state={
    pagination: {},
    releases: [],
    shuffledReleases: [],
    currentRelease: {},
    nextRelease:{},
    currentReleaseURL: "",
    newPlaylistInput: ""
  }

  // takes in raw fetch json data and returns clean data for state
  parseJSONtoData = (releases) => {
    return releases.map((release)=>{
      let data = release.basic_information
      return(
        {
          id: releases.indexOf(release),
          artist : data.artists[0].name,
          title : data.title,
          label : data.labels[0].name,
          catno : data.labels[0].catno,
          resource_url: data.resource_url
        }
      )
    })
  }

  componentDidMount(){
    const url = 'https://api.discogs.com/users/harim1206/collection/folders/0/releases?per_page=200&page=1&f=json'
    // const url = 'http://localhost:3000/api/v1/collection'

    fetch(url, {mode: 'cors'})
    .then(res => res.json())
    .then(data => {
      // debugger

      let shuffledReleases = this.shuffleArr(data.releases).slice(0,50)
      const parsedData = this.parseJSONtoData(shuffledReleases)

      this.setState({
        pagination: data.pagination,
        releases: data.releases,
        shuffledReleases: parsedData,
        currentRelease: parsedData[0],
        nextRelease: parsedData[1]
      } , ()=>{
        console.log(`this.state:`, this.state)
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

  // Play video on click of the release
  onClick = (release, id) => {
    this.setState({
      currentRelease: release,
      nextRelease: this.state.shuffledReleases[id+1]
    },()=>console.log(`state onClick: `,this.state))

    this.fetchReleaseURL(release)
  }

  // on table column header sort
  onSort = (sortKey) =>{
    let data = this.state.shuffledReleases

    sortKey === 'id' ? data.sort((a,b) => a[sortKey] - b[sortKey]) : data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))

    this.setState({shuffledReleases: data})

  }

  // play next video once it finishes
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

    fetch(release.resource_url)
    .then(res=>res.json())
    .then(data=>{

      let randomVideo = {uri:""}
      if(data.videos.length>0){
        randomVideo = data.videos[Math.floor(Math.random()*data.videos.length)]
      }

      this.setState({
          currentReleaseURL: randomVideo.uri
        },()=>{
          console.log(`this.state after URL fetch, `,this.state)
      })

    })

  }

  // on new playlist submit
  onNewPlaylistSubmit = (e) =>{
    e.preventDefault()
    console.log(`hello: `,this.state.newPlaylistInput)

    debugger
  }

  onNewPlaylistInputchange = (e) =>{
    this.setState({
      newPlaylistInput: e.target.value
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
        <PlaylistContainer
          onNewPlaylistSubmit = {this.onNewPlaylistSubmit}
          onNewPlaylistInputchange = {this.onNewPlaylistInputchange}
          newPlaylistInput = {this.state.newPlaylistInput}
        />
        <Library
          shuffledReleases={this.state.shuffledReleases}
          onClick={this.onClick}
          onSort={this.onSort}
        />
      </div>
    );
  }
}


export default App;
