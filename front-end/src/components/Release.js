import React, { Component } from 'react';


class Release extends Component{
  state={
    playlist: ""
  }
  render(){
    const release = this.props.release

    const playlistSelectOptions = this.props.playlists.map((playlist)=>{
      return (
        <option
          data-playlistId={playlist.id}
          value={playlist.name}
        >
          {playlist.name}
        </option>
      )
    })

    return(
      <tr onClick={()=>this.props.onClick(release, release.id)}>
        <td>{release.id}</td>
        <td>{release.artist}</td>
        <td>{release.title}</td>
        <td>{release.label}</td>
        <td>{release.catno}</td>
        <td>
          <select name="text" onChange={(event)=>this.props.onReleasePlaylistChange(release, event)}>
            {playlistSelectOptions}
          </select>
        </td>
      </tr>
    )
  }

}

export default Release
