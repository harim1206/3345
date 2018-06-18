import React, {Component} from 'react'

class TrackContainer extends Component{

  columnHeaders = (columnTitles) =>{
    return(
      columnTitles.map((title)=><td className='track-column-header'>{title}</td>
      )
    )
  }

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
        <tr onClick={(event)=>this.props.onYoutubeClick(video, event)}>
          <td></td>
          <td>
            <select name="text" onChange={(event)=>this.props.onTrackPlaylistChange(video, this.props.currentRelease, event)}>
              {playlistSelectOptions}
            </select>

          </td>
          <td>{video.title}</td>
          <td><a href={video.uri}> link </a></td>
          <td>{video.duration}</td>
          <td></td>
        </tr>

      )
    })

    return(
      <React.Fragment>
        <tr>
          {this.columnHeaders(['','','Title','Position','Duration',''])}
        </tr>
        {tracks}
        <tr>
          {this.columnHeaders(['','Playlist','YouTube','URL','Duration',''])}
        </tr>
        {youtubes}
      </React.Fragment>
    )
  }

}

export default TrackContainer
