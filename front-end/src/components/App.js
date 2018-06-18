import React, { Component } from 'react';
import Video from './Video.js'
import Library from './Library.js'
import PlaylistContainer from '../container/PlaylistContainer.js'

import { shuffleArr, parseJSONtoData } from '../helpers/helper.js'

class App extends Component {
  state={
    // All Releases
    pagination: {},
    releases: [],
    shuffledReleases: [],
    // Current Release
    currentRelease: {},
    nextRelease:{},
    currentReleaseURL: "",
    currentReleaseTracks: [],
    currentReleaseVideos:[],
    // Playlists
    newPlaylistInput: "",
    playlists: []
  }



  componentDidMount(){
    const collectionUrl = 'https://api.discogs.com/users/harim1206/collection/folders/0/releases?per_page=300&page=1&f=json'

    fetch(collectionUrl, {mode: 'cors'})
    .then(res => res.json())
    .then(data => {
      let shuffledReleases = shuffleArr(data.releases).slice(0,50)

      const parsedData = parseJSONtoData(shuffledReleases)

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

    // fetch playlists from server
    const playlistUrl = '//localhost:3000/api/v1/playlists'
    fetch(playlistUrl)
    .then(res => res.json())
    .then(data => {

      const playlists = data.data.map((obj)=>{
        return {id: obj.id, name: obj.attributes.name}
      })

      this.setState({
        playlists: playlists
      },()=>console.log(`this.state.playlists after playlist fetch`, this.state.playlists))
    })

  }

  // Play video on click of the release
  onClick = (release, id) => {

    let tracks = []
    let videos = []

    fetch(release.resource_url)
    .then(res => res.json())
    .then(data => {

      let randomVideo = {uri:""}
      if(data.videos){
        randomVideo = data.videos[Math.floor(Math.random()*data.videos.length)]
      }

      let tracksData = data.tracklist.map((track)=>{
        return ({
          id: id,
          duration: track.duration,
          position: track.position,
          title: track.title
        })
      })
      tracks = tracksData

      if(data.videos){
        let videosData = data.videos.map((video)=>{
          return({
            description: video.description,
            title: video.title,
            uri: video.uri,
            duration: video.duration
          })
        })

        videos = videosData
      }


      this.setState({
        currentRelease: release,
        nextRelease: this.state.shuffledReleases[id+1],
        currentReleaseTracks: tracks,
        currentReleaseVideos: videos,
        currentReleaseURL: randomVideo.uri
      },()=>console.log(`state onClick: `,this.state))
    })
  }

  onYoutubeClick = (video, event) =>{
    this.setState({
      currentReleaseURL: video.uri
    })
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
      if(data.videos){
        randomVideo = data.videos[Math.floor(Math.random()*data.videos.length)]
      }

      this.setState({
          currentReleaseURL: randomVideo.uri
        },()=>{
          // console.log(`this.state after URL fetch, `,this.state)
      })

    })

  }

  // on new playlist submit
  onNewPlaylistSubmit = (e) =>{
    e.preventDefault()

    let postData = {
      name: this.state.newPlaylistInput
    }

    fetch('http://localhost:3000/api/v1/playlists', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(res =>res.json())
    .then(data =>{
      const playlist = {id: data.data.id, name: data.data.attributes.name}

      this.setState({
        playlists: [...this.state.playlists, playlist]
      },()=>{
        console.log(`this.state after new playlist submission: `,this.state.playlists)
      })
    })


  }

  // new playlist input change
  onNewPlaylistInputchange = (e) =>{
    this.setState({
      newPlaylistInput: e.target.value
    })

  }

  // Toggle playlist on click
  onPlaylistClick = (playlist) => {
    debugger

    const url = `//localhost:3000/api/v1/playlists/${playlist.id}`

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      debugger
    })

  }

  // on playlist select menu change, add track to playlist
  onTrackPlaylistChange = (video, release, event) =>{

    let postData = {
      artist: release.artist,
      release: release.title,
      label: release.label,
      catno: release.catno,
      resource_url: release.resource_url,
      library_id: release.id,
      title: "",
      url: video.uri,
      description: video.description,
      duration: video.duration,
      playlist_id: event.target.value
    }


    fetch('http://localhost:3000/api/v1/tracks', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(res =>res.json())
    .then(data =>{

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
        <div className="main-container">
          <PlaylistContainer
            onNewPlaylistSubmit = {this.onNewPlaylistSubmit}
            onNewPlaylistInputchange = {this.onNewPlaylistInputchange}
            onPlaylistClick = {this.onPlaylistClick}
            newPlaylistInput = {this.state.newPlaylistInput}
            playlists = {this.state.playlists}
          />
          <Library
            shuffledReleases={this.state.shuffledReleases}
            currentRelease={this.state.currentRelease}
            currentReleaseTracks={this.state.currentReleaseTracks}
            currentReleaseVideos={this.state.currentReleaseVideos}
            playlists={this.state.playlists}
            onClick={this.onClick}
            onSort={this.onSort}
            onTrackPlaylistChange={this.onTrackPlaylistChange}
            onYoutubeClick={this.onYoutubeClick}
          />
        </div>
      </div>
    );
  }
}


export default App;
