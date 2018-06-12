import React, { Component } from 'react';


class Release extends Component{

  render(){
    const { basic_information } = this.props.releaseData
    const artist = basic_information.artists[0].name
    const title = basic_information.title
    const label = basic_information.labels[0].name
    const catno = basic_information.labels[0].catno
    const display = `${artist} - ${title} - ${label} - ${catno}`



    // debugger
    return(
      <tr>
        <td>{artist}</td>
        <td>{title}</td>
        <td>{label}</td>
        <td>{catno}</td>
      </tr>
    )
  }

}

export default Release


// <li onClick = {()=>this.props.onClick(this.props.releaseData, this.props.id)}>
// {display}
// </li>
