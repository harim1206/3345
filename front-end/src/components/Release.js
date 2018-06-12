import React, { Component } from 'react';


class Release extends Component{

  render(){
    const release = this.props.release

    return(
      <tr onClick={()=>this.props.onClick(release, release.id)}>
        <td>{release.id}</td>
        <td>{release.artist}</td>
        <td>{release.title}</td>
        <td>{release.label}</td>
        <td>{release.catno}</td>
      </tr>
    )
  }

}

export default Release
