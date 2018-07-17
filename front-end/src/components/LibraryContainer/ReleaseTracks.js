import React, {Component} from 'react'

class ReleaseTracks extends Component{

  createColumnHeaders = (columnTitles) =>{
    return(
      columnTitles.map((title)=><td className='track-column-header'>{title}</td>
      )
    )
  }

  render(){

    // an array of table rows
    const tracks = this.props.currentReleaseTracks.map((track)=>{
      return (
        <tr className='track-container-row'>
          <td></td>
          <td>{track.title}</td>
          <td>{track.position}</td>
          <td>{track.duration}</td>
          <td></td>
        </tr>

      )
    })

    // an array of select options
    const playlistSelectOptions = this.props.playlists.map((playlist)=>{
      return <option value={playlist.id}>{playlist.name}</option>
    })

    // an array of table rows
    const youtubes = this.props.currentReleaseVideos.map((video)=>{
      return (
        <tr className='track-container-row' onClick={(event)=>this.props.onYoutubeClick(video, event)}>
          <td></td>
          <td>{video.title}</td>
          <td>
            <select name="text" onChange={(event)=>this.props.saveToPlaylist(video, this.props.currentRelease, event)}>
              {playlistSelectOptions}
            </select>
          </td>
          <td><a href={video.uri}> link </a></td>
          <td></td>
        </tr>
      )
    })

    return(
      <React.Fragment>

        // Title row
        <tr className='track-container-row'>
          <td colspan={5} style={{fontWeight: 'bold'}}>TRACKLIST</td>
        </tr>

        // Column headers row
        <tr className='track-container-row'>
          {this.createColumnHeaders(['','Title','Position','',''])}
        </tr>

        // Track information rows
        {tracks}

        // Title row
        <tr className='track-container-row'>
          <td colspan={5} style={{fontWeight: 'bold'}}>YOUTUBE LINKS</td>
        </tr>

        // Column headers row
        <tr className='track-container-row'>
          {this.createColumnHeaders(['','Title','Playlist','URL',''])}
        </tr>

        // Youtube link rows
        {youtubes}

      </React.Fragment>
    )
  }

}

export default ReleaseTracks
