import React, {Component} from 'react'

class ReleaseTracks extends Component{

  createColumnHeaders = (columnTitles) =>{
    return(
      columnTitles.map((title)=><td className='track-column-header'>{title}</td>
      )
    )
  }

  render(){
    // debugger

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

    // an array of table rows of youtube links
    const youtubes = this.props.currentReleaseVideos.map((video)=>{
      // debugger
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

        <tr className='track-container-row'>
          <td colSpan={5} style={{fontWeight: 'bold'}}>TRACKLIST</td>
        </tr>

        <tr className='track-container-row'>
          {this.createColumnHeaders(['','Title','Position','',''])}
        </tr>

        {tracks}

        <tr className='track-container-row'>
          <td colspan={5} style={{fontWeight: 'bold'}}>YOUTUBE LINKS</td>
        </tr>

        <tr className='track-container-row'>
          {this.createColumnHeaders(['','Title','Playlist','URL',''])}
        </tr>

        {youtubes}

      </React.Fragment>
    )
  }

}

export default ReleaseTracks
