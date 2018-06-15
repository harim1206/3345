import React, {Component} from 'react'

class TrackContainer extends Component{

  render(){

    const tracks = this.props.currentReleaseTracks[0].map((track)=>{
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

    debugger

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
      </React.Fragment>
    )
  }


}

export default TrackContainer
