import React, {Component} from 'react'

class Track extends Component{

  render(){
    const track = this.props.track
    // debugger


    return(
      <tr>
        <td>{track.title}</td>
        <td>{track.position}</td>
        <td>{track.duration}</td>
      </tr>
    )
  }


}

export default Track
