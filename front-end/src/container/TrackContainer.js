import React, {Component} from 'react'

class TrackContainer extends Component{

  render(){

    const tracks = this.props.currentReleaseTracks.map((track)=>{
      return (
        <tr>
          <td></td>
          <td></td>
          <td>{track.title}</td>
          <td>{track.position}</td>
          <td>{track.duration}</td>
        </tr>

      )
    })
    
    const playlistSelectOptions = this.props.playlists.map((playlist)=>{
      return <option value={playlist.id}>{playlist.name}</option>
    })

    const youtubes = this.props.currentReleaseVideos.map((video)=>{
      return (
        <tr>
          <td></td>
          <td></td>
          <td>{video.title}</td>
          <td>{video.uri}</td>
          <td>{video.duration}</td>
          <td>
            <select name="text" onChange={(event)=>this.props.onReleasePlaylistChange(event)}>
              {playlistSelectOptions}
            </select>
          </td>
        </tr>

      )
    })



    const columnHeaders = ['title','position','duration'].map((cat)=>{
      return(
        <th onClick={()=>this.props.onSort(cat.toLowerCase())}>{cat}</th>
      )
    })

    return(
      <React.Fragment>
        <tr>
          <td></td>
          <td></td>
          <td>Title</td>
          <td>Position</td>
          <td>Duration</td>
        </tr>
        {tracks}
        <tr>
          <td></td>
          <td></td>
          <td>YouTube</td>
          <td>URL</td>
          <td>Duration</td>
          <td></td>
        </tr>
        {youtubes}
      </React.Fragment>
    )
  }


}

export default TrackContainer
